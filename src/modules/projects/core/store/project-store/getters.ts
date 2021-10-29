import { GetterTree } from 'vuex';
import { AppStoreState } from '~/store/app.store';
import { ProjectList } from '../../models/project.model';
import { ProjectStoreState } from './state';

export const useGetters = (): GetterTree<ProjectStoreState, AppStoreState> => ({
  projectList(state: ProjectStoreState): ProjectList {
    return state.projectList;
  },
});
