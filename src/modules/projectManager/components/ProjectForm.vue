<template>
  <q-dialog
    square
    :value="value"
    @input="
      value => {
        updateValue(value);
      }
    "
  >
    <q-card style="width: 700px; max-width: 80vw;">
      <q-form @submit="saveProject" class="q-gutter-md">
        <q-card-section class="row items-center">
          <div class="text-h6">
            {{ newProject.id ? 'Edit project' : 'Create project' }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section style="max-height: 50vh" class="scroll q-pa-md">
          <q-input
            v-model="newProject.title"
            outlined
            label="Title"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-text" />
            </template>
          </q-input>
          <q-input
            v-model="newProject.description"
            outlined
            autogrow
            label="Description"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-text-subject" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn dense flat type="reset" label="Cancel" icon="mdi-close" v-close-popup />
          <q-btn dense flat type="submit" label="Save" color="primary" icon="mdi-check" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef, Ref, SetupContext } from '@vue/composition-api';
import { EditableProject } from '../entities/project';
import { useProjectStore } from '../store';

function useProjectForm(project: Ref<EditableProject>, context: SetupContext) {
  const projectStore = useProjectStore(context.root.$store);
  const newProject: Ref<EditableProject> = project;

  function updateValue(value: boolean): void {
    clearProjectForm();
    context.emit('input', value);
  }

  function closeDialog(): void {
    updateValue(false);
  }

  function clearProjectForm() {
    newProject.value.id = null;
    newProject.value.title = '';
    newProject.value.description = '';
  }

  async function createProject() {
    await projectStore
      .createProject({
        title: newProject.value.title,
        description: newProject.value.description
      })
      .then(() => {
        context.root.$toast.success('Project created successfully!');
        closeDialog();
      });
  }

  async function updateProject() {
    await projectStore
      .updateProject({
        id: newProject.value.id,
        title: newProject.value.title,
        description: newProject.value.description
      })
      .then(() => {
        context.root.$toast.success('Project updated successfully!');
        closeDialog();
      });
  }

  async function saveProject() {
    if (newProject.value.id) await updateProject();
    else await createProject();
  }

  return {
    updateValue,
    newProject,
    clearProjectForm,
    saveProject
  };
}

export default defineComponent({
  name: 'ProjectForm',
  props: {
    project: {
      type: (Object as unknown) as PropType<EditableProject>,
      default: () => ({ title: '', description: '' })
    },
    value: {
      type: Boolean,
      require: true
    }
  },
  template: 'a',
  setup(props, context) {
    return {
      ...useProjectForm(toRef(props, 'project'), context)
    };
  }
});
</script>
