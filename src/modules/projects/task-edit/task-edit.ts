import { Vue, Options } from 'vue-class-component';
import { lazyInject } from '~/inversify.config';
import { ToastService, TOAST_SERVICE } from '~/core/services/toast-service';
import { TaskType } from '../core/enums/task-type.enum';
import { Task } from '../core/models/task.model';
import { TaskStore, TASK_STORE } from '../core/store/task-store';

@Options({
  watch: {
    async $route() {
      const _this = this as TaskEdit;
      await _this.loadData();
    },
  },
})
export default class TaskEdit extends Vue {
  @lazyInject(TASK_STORE)
  private readonly _taskStore!: TaskStore;

  @lazyInject(TOAST_SERVICE)
  readonly _toast!: ToastService;

  projectId: Guid;
  mutableTask: Task = new Task();

  get taskTypeOptions() {
    return [
      {
        label: 'To do',
        value: TaskType.ToDo,
      },
      {
        label: 'In progress',
        value: TaskType.InProgress,
      },
      {
        label: 'Completed',
        value: TaskType.Completed,
      },
    ];
  }

  async createTask() {
    if (!this._taskStore) return;
    await this._taskStore
      .createTask({
        projectId: this.projectId,
        title: this.mutableTask.title,
        description: this.mutableTask.description,
        type: this.mutableTask.type,
      })
      .then(() => {
        this._toast.success('Task created successfully!');
      });
  }

  async updateTask() {
    await this._taskStore
      .updateTask({
        id: this.mutableTask.id,
        title: this.mutableTask.title,
        description: this.mutableTask.description,
        type: this.mutableTask.type,
      })
      .then(() => {
        this._toast.success('Task updated successfully!');
      });
  }

  async saveTask() {
    if (this.mutableTask.id) await this.updateTask();
    else await this.createTask();
  }

  async loadData() {
    this.projectId = this.$route.params.projectId as Guid;
    if (this.$route.params.taskId) {
      const taskId = this.$route.params.taskId as Guid;
      const task = await this._taskStore.getTaskById({ id: taskId });
      this.mutableTask = task.clone();
    } else {
      this.mutableTask = new Task();
    }
  }

  async cancel() {
    if (this.mutableTask.id) {
      await this.$router.push({ name: 'TaskDetail' });
    } else {
      await this.$router.push({ name: 'TaskList' });
    }
  }

  async mounted() {
    await this.loadData();
  }
}
