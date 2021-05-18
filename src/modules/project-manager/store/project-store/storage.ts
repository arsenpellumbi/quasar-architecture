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
import { IPaginatedStorage, PaginatedStorage } from 'src/store/base/paginated-store/storage';
import { AppStoreState } from 'src/store';

export interface IProjectStorage extends IPaginatedStorage {
  readonly currentProjects: Project[];
  fetchProjects(payload: GetProjectsPayload): Promise<void>;
  searchProjects(payload: SearchProjectsPayload): Promise<void>;
  createProject(payload: CreateProjectPayload): Promise<void>;
  updateProject(payload: UpdateProjectPayload): Promise<void>;
  deleteProject(payload: DeleteProjectPayload): Promise<void>;
  getProjectById(payload: GetProjectByIdPayload): Promise<Project>;
  reset(): void;
}

export class ProjectStorage extends PaginatedStorage<AppStoreState> implements IProjectStorage {
  private static _instance: IProjectStorage;

  get currentProjects(): Project[] {
    return (this._store.getters as { [key: string]: Project[] })[`${this._namespace}/currentProjects`];
  }

  constructor(store: Store<AppStoreState>, namespace: string) {
    super(store, namespace);
  }

  async fetchProjects(payload: GetProjectsPayload): Promise<void> {
    await this._store.dispatch(`${this._namespace}/fetchProjects`, payload);
  }

  async searchProjects(payload: SearchProjectsPayload): Promise<void> {
    await this._store.dispatch(`${this._namespace}/searchProjects`, payload);
  }

  async createProject(payload: CreateProjectPayload): Promise<void> {
    await this._store.dispatch(`${this._namespace}/createProject`, payload);
  }

  async updateProject(payload: UpdateProjectPayload): Promise<void> {
    await this._store.dispatch(`${this._namespace}/updateProject`, payload);
  }

  async deleteProject(payload: DeleteProjectPayload): Promise<void> {
    await this._store.dispatch(`${this._namespace}/deleteProject`, payload);
  }

  async getProjectById(payload: GetProjectByIdPayload): Promise<Project> {
    return (await this._store.dispatch(`${this._namespace}/getProjectById`, payload)) as Promise<Project>;
  }

  async reset(): Promise<void> {
    await this._store.dispatch(`${this._namespace}/reset`);
  }

  public static initialize(store: Store<AppStoreState>, namespace: string) {
    this._instance = new this(store, namespace);
  }

  public static get Instance(): IProjectStorage {
    return this._instance;
  }
}

export function useProjectStorage(store: Store<AppStoreState>, namespace: string): IProjectStorage {
  if (!ProjectStorage.Instance) {
    ProjectStorage.initialize(store, namespace);
  }

  return ProjectStorage.Instance;
}
