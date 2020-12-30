import { PaginatedData } from 'src/core/types';
import {
  GetProjectsPayload,
  ProjectData,
  SearchProjectsPayload,
  GetProjectByIdPayload,
  CreateProjectPayload,
  UpdateProjectPayload,
  DeleteProjectPayload
} from '../../entities/project';

export interface ProjectService {
  getProjects(payload: GetProjectsPayload): Promise<PaginatedData<ProjectData>>;
  searchProjects(payload: SearchProjectsPayload): Promise<PaginatedData<ProjectData>>;
  getProject(payload: GetProjectByIdPayload): Promise<ProjectData>;
  createProject(payload: CreateProjectPayload): Promise<Guid>;
  updateProject(payload: UpdateProjectPayload): Promise<void>;
  deleteProject(payload: DeleteProjectPayload): Promise<void>;
}
