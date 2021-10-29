import { date } from 'quasar';

import { Vue, Options } from 'vue-class-component';
import { lazyInject } from '~/inversify.config';

import { Project } from '../core/models/project.model';
import { ProjectStore, PROJECT_STORE } from '../core/store/project-store';

import ProjectEdit from '../project-edit/project-edit.vue';

@Options({
  components: {
    ProjectEdit,
  },
  watch: {
    async filter(value: string) {
      const _this = this as ProjectList;
      await _this._projectStore.searchProjects({
        pageIndex: 0,
        pageSize: _this.projectList.pagination.pageSize,
        value: value,
      });
    },
  },
})
export default class ProjectList extends Vue {
  @lazyInject(PROJECT_STORE)
  private readonly _projectStore!: ProjectStore;

  editProjectForm = false;
  projectToEdit: Project = new Project();

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
    { name: 'actions', align: 'center', label: 'Actions' },
  ];

  get projectList() {
    return this._projectStore.projectList;
  }

  async openProject(project: Project) {
    await this.$router.push({
      name: 'ProjectDetail',
      params: { projectId: project.id },
    });
  }

  createProject() {
    this.projectToEdit = new Project();
    this.editProjectForm = true;
  }

  editProject(project: Project) {
    this.projectToEdit = project;
    this.editProjectForm = true;
  }

  async deleteProject(project: Project) {
    await this._projectStore.deleteProject({ id: project.id });
  }

  async changeProjectsPageSize(pageSize: number) {
    if (pageSize != this.projectList.pagination.pageSize) {
      await this._projectStore.searchProjects({
        pageIndex: 0,
        pageSize: pageSize,
        value: this.filter,
      });
    }
  }

  async changeProjectsPage(pageIndex: number) {
    if (pageIndex != this.projectList.pagination.pageIndex) {
      await this._projectStore.searchProjects({
        pageIndex: pageIndex,
        pageSize: this.projectList.pagination.pageSize,
        value: this.filter,
      });
    }
  }

  async beforeMounted() {
    await this._projectStore.reset();
  }

  async mounted() {
    await this._projectStore.fetchProjects({
      pageIndex: 0,
      pageSize: this.projectList.pagination.pageSize,
    });
  }
}
