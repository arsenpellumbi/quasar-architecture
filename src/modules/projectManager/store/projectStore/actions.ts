import { ActionTree, ActionContext } from 'vuex';
import {
  CreateProjectPayload,
  DeleteProjectPayload,
  GetProjectByIdPayload,
  GetProjectsPayload,
  Project,
  ProjectData,
  ProjectInstance,
  SearchProjectsPayload,
  UpdateProjectPayload
} from '../../entities/project';
import { ProjectStoreState } from './state';
import serviceProvider from '../../services';
import { AppStoreState } from 'src/store';

const actions: ActionTree<ProjectStoreState, AppStoreState> = {
  async fetchProjects(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: GetProjectsPayload
  ): Promise<void> {
    context.commit('setFetching', true);
    const result = await serviceProvider.projectService.getProjects(payload);
    context.commit('setProjects', result.data);
    context.commit('setPagination', {
      pageIndex: payload.pageIndex,
      pageSize: payload.pageSize,
      totalCount: result.count,
      totalPages: result.totalPages
    });
    context.commit('setFetching', false);
  },

  async searchProjects(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: SearchProjectsPayload
  ): Promise<void> {
    context.commit('setFetching', true);
    const result = await serviceProvider.projectService.searchProjects(payload);
    context.commit('setProjects', result.data);
    context.commit('setPagination', {
      pageIndex: payload.pageIndex,
      pageSize: payload.pageSize,
      totalCount: result.count,
      totalPages: result.totalPages
    });
    context.commit('setFetching', false);
  },

  async getProjectById(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: GetProjectByIdPayload
  ): Promise<Project> {
    const project: ProjectData = context.state.projects.filter((project: ProjectData) => project.id == payload.id)[0];

    if (project) {
      return new ProjectInstance(project);
    }

    return await serviceProvider.projectService.getProject(payload);
  },

  async createProject(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: CreateProjectPayload
  ): Promise<void> {
    const id = await serviceProvider.projectService.createProject(payload);

    context.commit('addProject', {
      id: id,
      date: new Date(),
      title: payload.title,
      description: payload.description
    });

    context.commit('addPaginationItems', 1);
  },

  async updateProject(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: UpdateProjectPayload
  ): Promise<void> {
    await serviceProvider.projectService.updateProject(payload);

    const project = context.state.projects.filter((project: ProjectData) => project.id == payload.id)[0];

    if (project)
      context.commit('updateProject', {
        id: project.id,
        date: new Date(),
        title: payload.title,
        description: payload.description
      });
  },

  async deleteProject(
    context: ActionContext<ProjectStoreState, AppStoreState>,
    payload: DeleteProjectPayload
  ): Promise<void> {
    await serviceProvider.projectService.deleteProject(payload);
    context.commit('deleteProject', payload.id);
    context.commit('removePaginationItems', 1);
  },

  reset(context: ActionContext<ProjectStoreState, AppStoreState>): void {
    context.commit('setProjects', []);
  }
};

export default actions;
