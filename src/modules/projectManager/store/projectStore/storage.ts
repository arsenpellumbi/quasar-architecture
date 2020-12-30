import { Store } from 'vuex';
import {
  CreateProjectPayload,
  DeleteProjectPayload,
  GetProjectByIdPayload,
  GetProjectsPayload,
  Project,
  SearchProjectsPayload,
  UpdateProjectPayload
} from '../../entities/project';
import usePaginatedStorage, { PaginatedStorage } from 'src/store/base/paginatedStore/storage';
import { computed, ComputedRef } from '@vue/composition-api';
import { AppStoreState } from 'src/store';

export interface ProjectStorage extends PaginatedStorage {
  readonly currentProjects: ComputedRef<Project[]>;
  fetchProjects(payload: GetProjectsPayload): Promise<void>;
  searchProjects(payload: SearchProjectsPayload): Promise<void>;
  createProject(payload: CreateProjectPayload): Promise<void>;
  updateProject(payload: UpdateProjectPayload): Promise<void>;
  deleteProject(payload: DeleteProjectPayload): Promise<void>;
  getProjectById(payload: GetProjectByIdPayload): Promise<Project>;
  reset(): void;
}

export const useProjectStore = function(store: Store<AppStoreState>): ProjectStorage {
  const paginatedStorage = usePaginatedStorage(store, 'projectStore');
  return {
    ...paginatedStorage,
    currentProjects: computed(() => (store.getters as { [key: string]: Project[] })['projectStore/currentProjects']),
    fetchProjects: async (payload: GetProjectsPayload): Promise<void> =>
      (await store.dispatch('projectStore/fetchProjects', payload)) as Promise<void>,
    searchProjects: async (payload: SearchProjectsPayload): Promise<void> =>
      (await store.dispatch('projectStore/searchProjects', payload)) as Promise<void>,
    createProject: async (payload: CreateProjectPayload): Promise<void> =>
      (await store.dispatch('projectStore/createProject', payload)) as Promise<void>,
    updateProject: async (payload: UpdateProjectPayload): Promise<void> =>
      (await store.dispatch('projectStore/updateProject', payload)) as Promise<void>,
    deleteProject: async (payload: DeleteProjectPayload): Promise<void> =>
      (await store.dispatch('projectStore/deleteProject', payload)) as Promise<void>,
    getProjectById: async (payload: GetProjectByIdPayload): Promise<Project> =>
      (await store.dispatch('projectStore/getProjectById', payload)) as Promise<Project>,
    reset: async (): Promise<void> => (await store.dispatch('projectStore/reset')) as Promise<void>
  };
};
