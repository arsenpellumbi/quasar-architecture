import { GetterTree } from 'vuex';
import { Project, ProjectData } from '../../entities/project';
import { ProjectStoreState } from './state';
import paginatedGetters from 'src/store/base/paginated-store/getters';
import { AppStoreState } from 'src/store';

const getters: GetterTree<ProjectStoreState, AppStoreState> = {
  ...paginatedGetters,
  currentProjects(state: ProjectStoreState): Project[] {
    return state.projects.map((project: ProjectData) => new Project(project));
  }
};

export default getters;
