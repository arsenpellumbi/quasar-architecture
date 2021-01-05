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
      <q-form @submit="saveTask" class="q-gutter-md">
        <q-card-section class="row items-center">
          <div class="text-h6">
            {{ newTask.id ? 'Edit task' : 'Create task' }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section style="max-height: 50vh" class="scroll q-pa-md">
          <q-input
            v-model="newTask.title"
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
            v-model="newTask.description"
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

          <q-option-group v-model="newTask.type" :options="taskTypeOptions" color="primary" />
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
import { EditableTask } from '../entities/task';
import { TaskType } from '../enums';
import { useTaskStore } from '../store';

function useTaskForm(task: Ref<EditableTask>, projectId: Ref<Guid>, context: SetupContext) {
  const taskStore = useTaskStore(context.root.$store);

  const newTask: Ref<EditableTask> = task;
  const taskTypeOptions = [
    {
      label: 'To do',
      value: TaskType.ToDo
    },
    {
      label: 'In progress',
      value: TaskType.InProgress
    },
    {
      label: 'Completed',
      value: TaskType.Completed
    }
  ];

  function updateValue(value: boolean): void {
    clearTaskForm();
    context.emit('input', value);
  }

  function closeDialog(): void {
    updateValue(false);
  }

  function clearTaskForm() {
    newTask.value.id = null;
    newTask.value.title = '';
    newTask.value.description = '';
    newTask.value.type = TaskType.ToDo;
  }

  async function createTask() {
    await taskStore
      .createTask({
        projectId: projectId.value,
        title: newTask.value.title,
        description: newTask.value.description,
        type: newTask.value.type
      })
      .then(() => {
        context.root.$toast.success('Task created successfully!');
        closeDialog();
      });
  }

  async function updateTask() {
    await taskStore
      .updateTask({
        id: newTask.value.id,
        title: newTask.value.title,
        description: newTask.value.description,
        type: newTask.value.type
      })
      .then(() => {
        context.root.$toast.success('Task updated successfully!');
        closeDialog();
      });
  }

  async function saveTask() {
    if (newTask.value.id) await updateTask();
    else await createTask();
  }

  return {
    taskTypeOptions,
    updateValue,
    newTask,
    clearTaskForm,
    saveTask
  };
}

export default defineComponent({
  name: 'TaskForm',
  props: {
    projectId: {
      type: (String as unknown) as PropType<Guid>,
      default: () => '' as Guid
    },
    task: {
      type: (Object as unknown) as PropType<EditableTask>,
      default: () => ({
        title: '',
        description: '',
        projectId: null,
        type: TaskType.ToDo
      })
    },
    value: {
      type: Boolean,
      require: true
    }
  },
  setup(props, context) {
    return {
      ...useTaskForm(toRef(props, 'task'), toRef(props, 'projectId'), context)
    };
  }
});
</script>
