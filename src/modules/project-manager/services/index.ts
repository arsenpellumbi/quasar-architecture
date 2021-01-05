import { ProjectService, ProjectServiceInstance } from './project-service';
import { TaskService, TaskServiceInstance } from './task-service';
import Configurations from 'src/core/configurations';

interface ServiceProvider {
  projectService: ProjectService;
  taskService: TaskService;
}

const serviceProvider: ServiceProvider = {
  projectService: new ProjectServiceInstance(Configurations.endpoints.projectManagerApi.baseUrl),
  taskService: new TaskServiceInstance(Configurations.endpoints.projectManagerApi.baseUrl)
};

export default serviceProvider;
