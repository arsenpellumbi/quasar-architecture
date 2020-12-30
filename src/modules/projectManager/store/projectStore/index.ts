import { Module } from 'vuex';
import state, { ProjectStoreState } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { AppStoreState } from 'src/store';

const exampleModule: Module<ProjectStoreState, AppStoreState> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export type ProjectStoreModule = Module<ProjectStoreState, AppStoreState>;
export default exampleModule;
