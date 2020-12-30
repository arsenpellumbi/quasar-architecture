import { ProjectService, ProjectServiceInstance } from './projectService';
import { TaskService, TaskServiceInstance } from './taskService';
import Configurations from 'src/core/configs';

interface ServiceProvider {
  projectService: ProjectService;
  taskService: TaskService;
}

const serviceProvider: ServiceProvider = {
  projectService: new ProjectServiceInstance(Configurations.endpoints.projectManagerApi.baseUrl),
  taskService: new TaskServiceInstance(Configurations.endpoints.projectManagerApi.baseUrl)
};

export default serviceProvider;
