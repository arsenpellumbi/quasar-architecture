import { inject, interfaces } from 'inversify';
import { provide } from '~/inversify.config';
import { useState } from './state';
import { useActions } from './actions';
import { useGetters } from './getters';
import { useMutations } from './mutations';
import { AppStore, APP_STORE } from '~/store/app.store';
import { ProjectList, Project } from '../../models/project.model';
import { ProjectPayloads } from '../../payloads';
import { ProjectService, PROJECT_SERVICE } from '../../services/project-service';

export const PROJECT_STORE: interfaces.ServiceIdentifier<ProjectStore> = 'PROJECT_STORE';

@provide<ProjectStore>(PROJECT_STORE)
export class ProjectStore {
  private readonly _namespace: string;
  private readonly _appStore: AppStore;

  constructor(@inject(APP_STORE) appStore: AppStore, @inject(PROJECT_SERVICE) projectService: ProjectService) {
    this._namespace = 'projects/project-store';
    this._appStore = appStore;

    if (!this._appStore.store.hasModule(this._namespace)) {
      this._appStore.store.registerModule(this._namespace, {
        namespaced: true,
        actions: useActions(projectService),
        getters: useGetters(),
        mutations: useMutations(),
        state: useState(),
      });
    }
  }

  get projectList(): ProjectList {
    return (this._appStore.store.getters as { [key: string]: ProjectList })[`${this._namespace}/projectList`];
  }

  async fetchProjects(payload: ProjectPayloads.GetProjectsPayload): Promise<void> {
    await this._appStore.store.dispatch(`${this._namespace}/fetchProjects`, payload);
  }

  async searchProjects(payload: ProjectPayloads.SearchProjectsPayload): Promise<void> {
    await this._appStore.store.dispatch(`${this._namespace}/searchProjects`, payload);
  }

  async createProject(payload: ProjectPayloads.CreateProjectPayload): Promise<void> {
    await this._appStore.store.dispatch(`${this._namespace}/createProject`, payload);
  }

  async updateProject(payload: ProjectPayloads.UpdateProjectPayload): Promise<void> {
    await this._appStore.store.dispatch(`${this._namespace}/updateProject`, payload);
  }

  async deleteProject(payload: ProjectPayloads.DeleteProjectPayload): Promise<void> {
    await this._appStore.store.dispatch(`${this._namespace}/deleteProject`, payload);
  }

  async getProjectById(payload: ProjectPayloads.GetProjectByIdPayload): Promise<Project> {
    return (await this._appStore.store.dispatch(`${this._namespace}/getProjectById`, payload)) as Promise<Project>;
  }

  async reset(): Promise<void> {
    await this._appStore.store.dispatch(`${this._namespace}/reset`);
  }
}
