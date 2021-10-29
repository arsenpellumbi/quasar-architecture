import { Vue, Options } from 'vue-class-component';

import { lazyInject } from '~/inversify.config';

import { Project } from '../core/models/project.model';
import { ProjectStore, PROJECT_STORE } from '../core/store/project-store';

import ProjectEdit from '../project-edit/project-edit.vue';

@Options({
  components: {
    ProjectEdit,
  },
})
export default class ProjectDetail extends Vue {
  @lazyInject(PROJECT_STORE)
  private readonly _projectStore!: ProjectStore;

  project: Project = new Project();
  editProjectForm = false;

  editProject() {
    this.editProjectForm = true;
  }

  async mounted() {
    this.project = await this._projectStore.getProjectById({
      id: this.$route.params.projectId as Guid,
    });
  }
}
