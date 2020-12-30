<template>
  <q-page class="q-pa-md items-center justify-evenly q-gutter-md">
    <q-card class="my-card q-mb-mb" square>
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="row col">
            <div class="text-h6 q-mr-sm">Project:</div>
            <div class="text-h6 text-weight-regular">{{ project.title }}</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-table
      square
      title="Tasks"
      :data="currentTasks"
      :columns="columns"
      row-key="name"
      :grid="showAsGrid"
      :pagination="tablePagination"
      hide-pagination
      @row-click="(evt, row) => editTask(row)"
    >
      <template v-slot:top>
        <span class="text-h5 q-mr-md">Tasks</span>
        <q-btn
          square
          v-if="$q.screen.gt.xs"
          color="primary"
          icon="mdi-folder-plus"
          label="Create"
          @click="createTaskForm = true"
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

      <template v-slot:body-cell-type="props">
        <q-td :props="props">
          <q-chip v-if="props.row.type == 2" color="teal" text-color="white">
            Completed
          </q-chip>
          <q-chip v-else-if="props.row.type == 1" color="orange" text-color="white">
            In progress
          </q-chip>
          <q-chip v-else color="primary" text-color="white">
            To do
          </q-chip>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn-group dense flat>
            <q-btn dense flat color="primary" icon="mdi-pencil" @click.stop="editTask(props.row)">
              <q-tooltip>Edit</q-tooltip>
            </q-btn>
            <q-btn dense flat color="primary" icon="mdi-delete" @click.stop="deleteTask(props.row)">
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
              <q-icon v-if="props.row.type == 2" color="teal" name="mdi-file-check" />
              <q-icon v-else-if="props.row.type == 1" color="orange" name="mdi-file-clock" />
              <q-icon v-else name="mdi-file" color="primary" />
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
                        <q-item clickable @click="openTask(props.row)">
                          <q-item-section avatar>
                            <q-icon name="mdi-eye" />
                          </q-item-section>
                          <q-item-section>View</q-item-section>
                        </q-item>
                        <q-item clickable @click="editTask(props.row)">
                          <q-item-section avatar>
                            <q-icon name="mdi-pencil" />
                          </q-item-section>
                          <q-item-section>Edit</q-item-section>
                        </q-item>
                        <q-item clickable @click="deleteTask(props.row)">
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
          @page-change="changeTasksPage"
          @items-per-page-change="changeTasksPageSize"
        />
      </template>
    </q-table>
    <q-page-sticky v-if="$q.screen.lt.sm" position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="createTaskForm = true" />
    </q-page-sticky>

    <task-form v-model="createTaskForm" :project-id="project.id" />
    <task-form v-model="editTaskForm" :project-id="project.id" :task="taskToEdit" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ProjectItemSetup from './ProjectItemSetup';
import TaskForm from '../../components/TaskForm.vue';
import appComponents from 'src/components';

export default defineComponent({
  name: 'ProjectItem',
  components: {
    TaskForm,
    ...appComponents
  },
  setup(props, context) {
    return ProjectItemSetup(context);
  }
});
</script>
