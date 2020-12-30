import { Module } from 'vuex';
import state, { TaskStoreState } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { AppStoreState } from 'src/store';

const exampleModule: Module<TaskStoreState, AppStoreState> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export type TaskStoreModule = Module<TaskStoreState, AppStoreState>;
export default exampleModule;
