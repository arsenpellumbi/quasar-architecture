import { Vue, prop, Options } from 'vue-class-component';
import { lazyInject } from '~/inversify.config';
import { ToastService, TOAST_SERVICE } from '~/core/services/toast-service';
import { Project } from '../core/models/project.model';
import { ProjectStore, PROJECT_STORE } from '../core/store/project-store';

class Props {
  readonly project = prop<Project>({
    default: () => new Project(),
  });

  readonly visible = prop<boolean>({
    default: () => false,
    required: true,
  });
}

@Options({
  watch: {
    project(value: Project) {
      const _this = this as ProjectEdit;
      _this.mutableProject = value.clone();
    },
  },
  emits: ['update:visible', 'update:project'],
})
export default class ProjectEdit extends Vue.with(Props) {
  @lazyInject(PROJECT_STORE)
  private readonly _projectStore!: ProjectStore;

  @lazyInject(TOAST_SERVICE)
  private readonly _toast!: ToastService;

  mutableProject: Project = new Project();

  onUpdateModelValue(value: boolean) {
    this.$emit('update:visible', value);
  }

  closeDialog(): void {
    this.$emit('update:visible', false);
  }

  async createProject() {
    await this._projectStore
      .createProject({
        title: this.mutableProject.title,
        description: this.mutableProject.description,
      })
      .then(() => {
        this._toast.success('Project created successfully!');
        this.$emit('update:project', new Project());
        this.closeDialog();
      });
  }

  async updateProject() {
    await this._projectStore
      .updateProject({
        id: this.mutableProject.id,
        title: this.mutableProject.title,
        description: this.mutableProject.description,
      })
      .then(() => {
        this._toast.success('Project updated successfully!');
        this.$emit('update:project', this.mutableProject);
        this.closeDialog();
      });
  }

  async saveProject() {
    if (this.mutableProject.id) await this.updateProject();
    else await this.createProject();
  }
}
