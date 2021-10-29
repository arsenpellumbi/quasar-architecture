<template>
  <q-card square>
    <q-form class="q-gutter-md" @submit="saveTask" @reset="cancel">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ mutableTask.id ? 'Edit task' : 'Create task' }}</div>
      </q-card-section>
      <q-card-section class="scroll q-pa-md" style="max-height: 50vh">
        <q-input
          v-model="mutableTask.title"
          outlined="outlined"
          label="Title"
          lazy-rules="lazy-rules"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-text"></q-icon>
          </template>
        </q-input>
        <q-input
          v-model="mutableTask.description"
          outlined="outlined"
          autogrow="autogrow"
          label="Description"
          lazy-rules="lazy-rules"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-text-subject"></q-icon>
          </template>
        </q-input>
        <q-option-group v-model="mutableTask.type" :options="taskTypeOptions" color="primary"></q-option-group>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn dense="dense" flat="flat" type="reset" label="Cancel" icon="mdi-close"></q-btn>
        <q-btn dense="dense" flat="flat" type="submit" label="Save" color="primary" icon="mdi-check"></q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script src="./task-edit"></script>
