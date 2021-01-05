import projectStore, { ProjectStoreModule } from './project-store';
import taskStore, { TaskStoreModule } from './task-store';

export * from './project-store/storage';
export * from './task-store/storage';

interface StoreModules {
  projectStore: ProjectStoreModule;
  taskStore: TaskStoreModule;
}

const storeModules: StoreModules = {
  projectStore: projectStore,
  taskStore: taskStore
};

export default storeModules;
