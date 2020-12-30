import { MutationTree } from 'vuex';
import { ProjectData } from '../../entities/project';
import { ProjectStoreState } from './state';
import paginatedMutations from 'src/store/base/paginatedStore/mutations';

const mutation: MutationTree<ProjectStoreState> = {
  ...paginatedMutations,
  setProjects(state: ProjectStoreState, projects: ProjectData[]): void {
    state.projects = projects;
  },

  addProject(state: ProjectStoreState, project: ProjectData): void {
    state.projects.unshift(project);
  },

  updateProject(state: ProjectStoreState, project: ProjectData): void {
    const index = state.projects.indexOf(
      state.projects.filter((_project: ProjectData) => _project.id === project.id)[0]
    );
    state.projects = Object.assign([], state.projects, { [index]: project });
  },

  deleteProject(state: ProjectStoreState, id: Guid): void {
    state.projects = state.projects.filter((_project: ProjectData) => _project.id !== id);
  }
};

export default mutation;
