import { GetterTree } from 'vuex';
import { AppStoreState } from '~/store/app.store';
import { TaskList } from '../../models/task.model';
import { TaskStoreState } from './state';

export const useGetters = (): GetterTree<TaskStoreState, AppStoreState> => ({
  taskList(state: TaskStoreState): TaskList {
    return state.taskList;
  },
});
