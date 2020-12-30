import { ProjectData } from '../../entities/project';
import paginatedStoreState, { PaginatedStoreState } from 'src/store/base/paginatedStore/state';

export interface ProjectStoreState extends PaginatedStoreState {
  projects: ProjectData[];
}

const state: ProjectStoreState = {
  ...paginatedStoreState,
  projects: []
};

export default state;
