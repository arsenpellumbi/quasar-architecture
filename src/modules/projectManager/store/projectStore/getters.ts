import { GetterTree } from 'vuex';
import { Project, ProjectData, ProjectInstance } from '../../entities/project';
import { ProjectStoreState } from './state';
import paginatedGetters from 'src/store/base/paginatedStore/getters';
import { AppStoreState } from 'src/store';

const getters: GetterTree<ProjectStoreState, AppStoreState> = {
  ...paginatedGetters,
  currentProjects(state: ProjectStoreState): Project[] {
    return state.projects.map((project: ProjectData) => new ProjectInstance(project));
  }
};

export default getters;
