import { ApiService } from 'src/core/api/ApiService';
import { RequestMethod } from 'src/core/enums';
import { PaginatedData } from 'src/core/types';
import { AxiosResponse } from 'axios';
import {
  GetProjectsPayload,
  ProjectData,
  SearchProjectsPayload,
  GetProjectByIdPayload,
  CreateProjectPayload,
  UpdateProjectPayload,
  DeleteProjectPayload
} from '../../entities/project';
import { ProjectService } from './ProjectService.types';

export class ProjectServiceInstance extends ApiService implements ProjectService {
  public async getProjects(payload: GetProjectsPayload): Promise<PaginatedData<ProjectData>> {
    return await this.request({
      method: RequestMethod.Get,
      url: '/projects',
      params: payload,
      loading: true
    }).then((response: AxiosResponse<PaginatedData<ProjectData>>) => response.data);
  }

  public async searchProjects(payload: SearchProjectsPayload): Promise<PaginatedData<ProjectData>> {
    return await this.request({
      method: RequestMethod.Get,
      url: '/projects/search',
      params: payload
    }).then((response: AxiosResponse<PaginatedData<ProjectData>>) => response.data);
  }

  public async getProject(payload: GetProjectByIdPayload): Promise<ProjectData> {
    const id = payload.id ? payload.id.toString() : '';
    // const project = await indexDbService.getObject<ProjectData>('Projects', id);
    // return project;

    return await this.request({
      method: RequestMethod.Get,
      url: `/projects/${id}`,
      loading: true
    }).then((response: AxiosResponse<ProjectData>) => response.data);
  }

  public async createProject(payload: CreateProjectPayload): Promise<Guid> {
    return await this.request({
      method: RequestMethod.Post,
      url: '/projects',
      data: payload,
      loading: false
    }).then((response: AxiosResponse<Guid>) => response.data);
  }

  public async updateProject(payload: UpdateProjectPayload): Promise<void> {
    return await this.request({
      method: RequestMethod.Put,
      url: '/projects',
      data: payload,
      loading: false
    }).then((response: AxiosResponse<void>) => response.data);
  }

  public async deleteProject(payload: DeleteProjectPayload): Promise<void> {
    const id = payload.id ? payload.id.toString() : '';
    return await this.request({
      method: RequestMethod.Delete,
      url: `/projects/${id}`,
      loading: false
    }).then((response: AxiosResponse<void>) => response.data);
  }
}
