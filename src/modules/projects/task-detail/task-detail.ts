import { Vue, Options } from 'vue-class-component';
import { lazyInject } from '~/inversify.config';
import { Task } from '../core/models/task.model';
import { TaskStore, TASK_STORE } from '../core/store/task-store';

@Options({
  watch: {
    async $route() {
      const _this = this as TaskDetail;
      await _this.loadData();
    },
  },
})
export default class TaskDetail extends Vue {
  @lazyInject(TASK_STORE)
  private readonly _taskStore!: TaskStore;

  task: Task = new Task();

  async loadData() {
    const taskId = this.$route.params.taskId as Guid;
    this.task = await this._taskStore.getTaskById({ id: taskId });
  }

  async editTask() {
    await this.$router.push({ name: 'TaskEdit' });
  }

  async mounted() {
    await this.loadData();
  }
}
