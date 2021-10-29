<template>
  <q-card square>
    <q-card-section class="row items-center">
      <div class="text-h6">{{ 'Details' }}</div>
      <q-space></q-space>
      <q-btn square color="primary" icon="mdi-pencil" label="Edit" @click="editTask" />
    </q-card-section>
    <q-card-section class="scroll q-pa-md" style="max-height: 50vh">
      <p>Title: {{ task.title }}</p>
      <p>Description: {{ task.description }}</p>
      <p>Type: {{ task.type }}</p>
    </q-card-section>
  </q-card>
</template>

<script src="./task-detail"></script>
