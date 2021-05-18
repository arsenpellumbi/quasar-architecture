import { IProjectService, useProjectService } from './project-service';
import { ITaskService, useTaskService } from './task-service';
import Configurations from 'src/core/configurations';

interface ServiceProvider {
  projectService: IProjectService;
  taskService: ITaskService;
}

const serviceProvider: ServiceProvider = {
  projectService: useProjectService(Configurations.endpoints.projectManagerApi.baseUrl),
  taskService: useTaskService(Configurations.endpoints.projectManagerApi.baseUrl)
};

export default serviceProvider;
