import { date } from 'quasar';
import { Vue, Options } from 'vue-class-component';
import { lazyInject } from '~/inversify.config';

import { Task } from '../core/models/task.model';
import { PROJECT_STORE, ProjectStore } from '../core/store/project-store';
import { TASK_STORE, TaskStore } from '../core/store/task-store';

@Options({
  watch: {
    async filter(value: string) {
      const _this = this as TaskList;
      await _this._taskStore.searchTasks({
        pageIndex: 0,
        pageSize: _this.taskList.pagination.pageSize,
        projectId: _this.projectId,
        value: value,
      });
    },
  },
})
export default class TaskList extends Vue {
  @lazyInject(PROJECT_STORE)
  private readonly _projectStore!: ProjectStore;

  @lazyInject(TASK_STORE)
  private readonly _taskStore!: TaskStore;

  projectId: Guid;
  showAsGrid = false;
  filter = '';
  columns = [
    {
      name: 'title',
      align: 'left',
      label: 'Title',
      field: 'title',
      sortable: true,
    },
    {
      name: 'description',
      align: 'left',
      label: 'Description',
      field: 'description',
      sortable: true,
    },
    {
      name: 'date',
      align: 'left',
      label: 'Date',
      field: 'date',
      sortable: true,
      format: (val: Date) => date.formatDate(val, 'DD MMMM YYYY HH:mm:ss'),
    },
    {
      name: 'type',
      align: 'left',
      label: 'Type',
      field: 'type',
      sortable: true,
    },
    { name: 'actions', align: 'center', label: 'Actions' },
  ];

  get taskList() {
    return this._taskStore.taskList;
  }

  async openTask(task: Task) {
    await this.$router.push({
      name: 'TaskDetail',
      params: { taskId: task.id },
    });
  }

  async editTask(task: Task) {
    await this.$router.push({ name: 'TaskEdit', params: { taskId: task.id } });
  }

  async createTask() {
    await this.$router.push({ name: 'TaskNew' });
  }

  async deleteTask(task: Task) {
    await this._taskStore.deleteTask({ id: task.id });
  }

  async changeTasksPageSize(pageSize: number) {
    if (pageSize != this.taskList.pagination.pageSize) {
      await this._taskStore.searchTasks({
        projectId: this.projectId,
        pageIndex: 0,
        pageSize: pageSize,
        value: this.filter,
      });
    }
  }

  async changeTasksPage(pageIndex: number) {
    if (pageIndex != this.taskList.pagination.pageIndex) {
      await this._taskStore.searchTasks({
        pageIndex: pageIndex,
        pageSize: this.taskList.pagination.pageSize,
        projectId: this.projectId,
        value: this.filter,
      });
    }
  }

  async beforeMounted() {
    await this._taskStore.reset();
  }

  async mounted() {
    this.projectId = this.$route.params.projectId as Guid;

    await this._taskStore.fetchTasks({
      projectId: this.projectId,
      pageIndex: 0,
      pageSize: this.taskList.pagination.pageSize,
    });
  }
}
