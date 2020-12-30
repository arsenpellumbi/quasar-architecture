import projectStore, { ProjectStoreModule } from './projectStore';
import taskStore, { TaskStoreModule } from './taskStore';

export * from './projectStore/storage';
export * from './taskStore/storage';

interface StoreModules {
  projectStore: ProjectStoreModule;
  taskStore: TaskStoreModule;
}

const storeModules: StoreModules = {
  projectStore: projectStore,
  taskStore: taskStore
};

export default storeModules;
