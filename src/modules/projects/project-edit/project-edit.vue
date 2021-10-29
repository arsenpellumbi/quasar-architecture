<template>
  <q-dialog :model-value="visible" @update:model-value="onUpdateModelValue">
    <q-card style="width: 700px; max-width: 80vw">
      <q-form class="q-gutter-md" @submit="saveProject">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ mutableProject.id ? 'Edit project' : 'Create project' }}</div>
          <q-space></q-space>
          <q-btn icon="mdi-close" flat="flat" round="round" dense="dense" v-close-popup></q-btn>
        </q-card-section>
        <q-card-section class="scroll q-pa-md" style="max-height: 50vh">
          <q-input
            v-model="mutableProject.title"
            outlined="outlined"
            label="Title"
            lazy-rules="lazy-rules"
            :rules="[(val) => (val && val.length > 0) || `Please type something`]"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-text"></q-icon>
            </template>
          </q-input>
          <q-input
            v-model="mutableProject.description"
            outlined="outlined"
            autogrow="autogrow"
            label="Description"
            lazy-rules="lazy-rules"
            :rules="[(val) => (val && val.length > 0) || `Please type something`]"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-text-subject"></q-icon>
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn dense="dense" flat="flat" type="reset" label="Cancel" icon="mdi-close" v-close-popup></q-btn>
          <q-btn dense="dense" flat="flat" type="submit" label="Save" color="primary" icon="mdi-check"></q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script src="./project-edit"></script>
