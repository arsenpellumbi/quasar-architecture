<template>
  <q-page class="q-pa-md items-center justify-evenly">
    <q-table
      square
      title="Projects"
      :data="currentProjects"
      :columns="columns"
      row-key="name"
      :grid="showAsGrid"
      :pagination="tablePagination"
      hide-pagination
      @row-click="(evt, row) => openProject(row)"
    >
      <template v-slot:top>
        <span class="text-h5 q-mr-md">Projects</span>
        <q-btn
          square
          v-if="$q.screen.gt.xs"
          color="primary"
          icon="mdi-folder-plus"
          label="Create"
          @click="createProjectForm = true"
        />
        <q-space />
        <q-input outlined dense square debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn-toggle
          class="q-ml-md"
          v-model="showAsGrid"
          flat
          dense
          :options="[
            { icon: 'mdi-view-list', value: false },
            { icon: 'mdi-view-grid', value: true }
          ]"
        />
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn-group dense flat>
            <q-btn dense flat color="primary" icon="mdi-pencil" @click.stop="editProject(props.row)">
              <q-tooltip>Edit</q-tooltip>
            </q-btn>
            <q-btn dense flat color="primary" icon="mdi-delete" @click.stop="deleteProject(props.row)">
              <q-tooltip>Delete</q-tooltip>
            </q-btn>
          </q-btn-group>
        </q-td>
      </template>

      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card class="my-card" square>
            <div class="row items-center justify-evenly text-grey" style="font-size: 12em">
              <q-icon name="mdi-folder-open" />
            </div>

            <q-card-section>
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-h6">{{ props.row.title }}</div>
                </div>

                <div class="col-auto">
                  <q-btn square color="grey-7" round flat icon="more_vert">
                    <q-menu square cover auto-close>
                      <q-list>
                        <q-item clickable @click="openProject(props.row)">
                          <q-item-section avatar>
                            <q-icon name="mdi-eye" />
                          </q-item-section>
                          <q-item-section>View</q-item-section>
                        </q-item>
                        <q-item clickable @click="editProject(props.row)">
                          <q-item-section avatar>
                            <q-icon name="mdi-pencil" />
                          </q-item-section>
                          <q-item-section>Edit</q-item-section>
                        </q-item>
                        <q-item clickable @click="deleteProject(props.row)">
                          <q-item-section avatar>
                            <q-icon name="mdi-delete" />
                          </q-item-section>
                          <q-item-section>Delete</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              {{ props.row.description }}
            </q-card-section>
          </q-card>
        </div>
      </template>

      <template v-slot:bottom>
        <app-paginator
          :pagination="currentPagination"
          @page-change="changeProjectsPage"
          @items-per-page-change="changeProjectsPageSize"
        />
      </template>
    </q-table>
    <q-page-sticky v-if="$q.screen.lt.sm" position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="createProjectForm = true" />
    </q-page-sticky>

    <project-form v-model="createProjectForm" />
    <project-form v-model="editProjectForm" :project="projectToEdit" />
  </q-page>
</template>

<script lang="ts">
import ProjectListSetup from './ProjectListSetup';
import ProjectForm from '../../components/ProjectForm.vue';
import { defineComponent } from '@vue/composition-api';

import appComponents from 'src/components';

export default defineComponent({
  name: 'ProjectList',
  components: {
    ProjectForm,
    ...appComponents
  },
  setup(props, context) {
    return ProjectListSetup(context);
  }
});
</script>
