<template>
  <q-page class="q-pa-md items-center justify-evenly q-gutter-md">
    <q-card class="my-card q-mb-mb" square>
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="row col">
            <div class="text-h6 q-mr-sm">Project:</div>
            <div class="text-h6 text-weight-regular">{{ project.title }}</div>
            <q-space></q-space>
            <q-btn square color="primary" icon="mdi-pencil" label="Edit" @click="editProject" />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <router-view></router-view>
  </q-page>
  <project-edit v-model:visible="editProjectForm" v-model:project="project" />
</template>

<script src="./project-detail"></script>
