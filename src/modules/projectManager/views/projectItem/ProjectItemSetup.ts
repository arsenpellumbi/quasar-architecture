import { ref, Ref, computed, onMounted, SetupContext, watch } from '@vue/composition-api';
import { Task } from '../../entities/task';
import { date } from 'quasar';
import { TaskType } from '../../enums';
import { Project } from '../../entities/project';
import { useProjectStore, useTaskStore } from '../../store';

export default function ProjectItemSetup(context: SetupContext) {
  const taskStore = useTaskStore(context.root.$store);
  const projectStore = useProjectStore(context.root.$store);

  const project: Ref<Project> = ref({ id: null, title: '', description: '' });
  const createTaskForm = ref(false);
  const editTaskForm = ref(false);
  const taskToEdit: Ref<Task> = ref({
    id: null,
    projectId: null,
    title: '',
    description: '',
    type: TaskType.ToDo
  });
  const showAsGrid = ref(false);
  const filter = ref('');
  const columns = [
    {
      name: 'title',
      align: 'left',
      label: 'Title',
      field: 'title',
      sortable: true
    },
    {
      name: 'description',
      align: 'left',
      label: 'Description',
      field: 'description',
      sortable: true
    },
    {
      name: 'date',
      align: 'left',
      label: 'Date',
      field: 'date',
      sortable: true,
      format: (val: Date) => date.formatDate(val, 'DD MMMM YYYY HH:mm:ss')
    },
    {
      name: 'type',
      align: 'left',
      label: 'Type',
      field: 'type',
      sortable: true
    },
    { name: 'actions', align: 'center', label: 'Actions' }
  ];

  const currentTasks = taskStore.currentTasks;
  const currentPagination = taskStore.currentPagination;

  const tablePagination = computed(() => {
    return {
      rowsPerPage: currentPagination.value.pageSize
    };
  });

  function openTask(task: Task) {
    editTask(task);
  }

  function editTask(task: Task) {
    taskToEdit.value = { ...task };
    editTaskForm.value = true;
  }

  async function deleteTask(task: Task) {
    await taskStore.deleteTask({ id: task.id });
  }

  async function changeTasksPageSize(pageSize: number) {
    if (pageSize != currentPagination.value.pageSize) {
      await taskStore.searchTasks({
        projectId: project.value.id,
        pageIndex: 0,
        pageSize: pageSize,
        value: filter.value
      });
    }
  }

  async function changeTasksPage(pageIndex: number) {
    if (pageIndex != currentPagination.value.pageIndex) {
      await taskStore.searchTasks({
        pageIndex: pageIndex,
        pageSize: currentPagination.value.pageSize,
        projectId: project.value.id,
        value: filter.value
      });
    }
  }

  onMounted(async () => {
    project.value = await projectStore.getProjectById({
      id: context.root.$route.params.projectId as Guid
    });

    await taskStore.fetchTasks({
      projectId: project.value.id,
      pageIndex: 0,
      pageSize: currentPagination.value.pageSize
    });
  });

  watch(filter, async (value: string) => {
    await taskStore.searchTasks({
      pageIndex: 0,
      pageSize: currentPagination.value.pageSize,
      projectId: project.value.id,
      value: value
    });
  });

  return {
    project,
    currentPagination,
    tablePagination,
    currentTasks,
    createTaskForm,
    editTaskForm,
    taskToEdit,
    showAsGrid,
    filter,
    columns,
    openTask,
    editTask,
    deleteTask,
    changeTasksPageSize,
    changeTasksPage
  };
}
