import { CONFIGURATIONS, Configurations } from '~/core/configurations/configurations';
import axios, { AxiosResponse } from 'axios';
import { inject, interfaces } from 'inversify';
import { provide } from '~/inversify.config';
import { ProjectList, Project } from '../models/project.model';
import { ProjectPayloads } from '../payloads';

interface GetProjectByIdPayloadResult {
  readonly id: Guid;
  readonly createdDate: Date;
  readonly modifiedDate: Date;
  readonly title: string;
  readonly description: string;
}

interface GetProjectsPayloadResult {
  readonly totalPages: number;
  readonly count: number;
  readonly data: {
    readonly id: Guid;
    readonly createdDate: Date;
    readonly modifiedDate: Date;
    readonly title: string;
    readonly description: string;
  }[];
}

interface SearchProjectsPayloadResult {
  readonly totalPages: number;
  readonly count: number;
  readonly data: {
    readonly id: Guid;
    readonly createdDate: Date;
    readonly modifiedDate: Date;
    readonly title: string;
    readonly description: string;
  }[];
}

export const PROJECT_SERVICE: interfaces.ServiceIdentifier<ProjectService> = 'PROJECT_SERVICE';

@provide<ProjectService>(PROJECT_SERVICE)
export class ProjectService {
  private readonly _baseUrl: string;

  constructor(@inject(CONFIGURATIONS) configurations: Configurations) {
    this._baseUrl = configurations.endpoints.projectManagerApi.baseUrl;
  }

  public async getProjects(payload: ProjectPayloads.GetProjectsPayload): Promise<ProjectList> {
    return await axios.get(`${this._baseUrl}/projects`, { params: payload }).then(
      (response: AxiosResponse<GetProjectsPayloadResult>) =>
        new ProjectList(
          payload.pageIndex,
          payload.pageSize,
          response.data.totalPages,
          response.data.count,
          response.data.data.map(
            (item) => new Project(item.id, item.modifiedDate || item.createdDate, item.title, item.description)
          )
        )
    );
  }

  public async searchProjects(payload: ProjectPayloads.SearchProjectsPayload): Promise<ProjectList> {
    return await axios.get(`${this._baseUrl}/projects/search`, { params: payload }).then(
      (response: AxiosResponse<SearchProjectsPayloadResult>) =>
        new ProjectList(
          payload.pageIndex,
          payload.pageSize,
          response.data.totalPages,
          response.data.count,
          response.data.data.map(
            (item) => new Project(item.id, item.modifiedDate || item.createdDate, item.title, item.description)
          )
        )
    );
  }

  public async getProject(payload: ProjectPayloads.GetProjectByIdPayload): Promise<Project> {
    const id = payload.id ? payload.id.toString() : '';

    return await axios
      .get(`${this._baseUrl}/projects/${id}`)
      .then(
        (response: AxiosResponse<GetProjectByIdPayloadResult>) =>
          new Project(
            response.data.id,
            response.data.modifiedDate || response.data.createdDate,
            response.data.title,
            response.data.description
          )
      );
  }

  public async createProject(payload: ProjectPayloads.CreateProjectPayload): Promise<Guid> {
    return await axios
      .post(`${this._baseUrl}/projects`, payload)
      .then((response: AxiosResponse<Guid>) => response.data);
  }

  public async updateProject(payload: ProjectPayloads.UpdateProjectPayload): Promise<void> {
    return await axios.put(`${this._baseUrl}/projects`, payload).then((response: AxiosResponse<void>) => response.data);
  }

  public async deleteProject(payload: ProjectPayloads.DeleteProjectPayload): Promise<void> {
    const id = payload.id ? payload.id.toString() : '';
    return await axios.delete(`${this._baseUrl}/projects/${id}`).then((response: AxiosResponse<void>) => response.data);
  }
}
