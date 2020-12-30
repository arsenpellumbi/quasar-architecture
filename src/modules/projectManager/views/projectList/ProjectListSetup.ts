import { ref, Ref, computed, onMounted, SetupContext, watch } from '@vue/composition-api';
import { Project } from '../../entities/project';
import { date } from 'quasar';
import { useProjectStore } from '../../store/projectStore/storage';

export default function ProjectListSetup(context: SetupContext) {
  const projectStore = useProjectStore(context.root.$store);
  const createProjectForm = ref(false);
  const editProjectForm = ref(false);
  const projectToEdit: Ref<Project> = ref({
    id: null,
    title: '',
    description: ''
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
    { name: 'actions', align: 'center', label: 'Actions' }
  ];

  const currentProjects = projectStore.currentProjects;

  const currentPagination = projectStore.currentPagination;

  const tablePagination = computed(() => {
    return {
      rowsPerPage: currentPagination.value.pageSize
    };
  });

  async function openProject(project: Project) {
    await context.root.$router.push({
      name: 'ProjectItem',
      params: { projectId: project.id as string }
    });
  }

  function editProject(project: Project) {
    projectToEdit.value = { ...project };
    editProjectForm.value = true;
  }

  async function deleteProject(project: Project) {
    await projectStore.deleteProject({ id: project.id });
  }

  async function changeProjectsPageSize(pageSize: number) {
    if (pageSize != currentPagination.value.pageSize) {
      await projectStore.searchProjects({
        pageIndex: 0,
        pageSize: pageSize,
        value: filter.value
      });
    }
  }

  async function changeProjectsPage(pageIndex: number) {
    if (pageIndex != currentPagination.value.pageIndex) {
      await projectStore.searchProjects({
        pageIndex: pageIndex,
        pageSize: currentPagination.value.pageSize,
        value: filter.value
      });
    }
  }

  onMounted(async () => {
    await projectStore.fetchProjects({
      pageIndex: 0,
      pageSize: currentPagination.value.pageSize
    });
  });

  watch(filter, async (value: string) => {
    await projectStore.searchProjects({
      pageIndex: 0,
      pageSize: currentPagination.value.pageSize,
      value: value
    });
  });

  return {
    currentPagination,
    tablePagination,
    currentProjects,
    createProjectForm,
    editProjectForm,
    projectToEdit,
    showAsGrid,
    filter,
    columns,
    openProject,
    editProject,
    deleteProject,
    changeProjectsPageSize,
    changeProjectsPage
  };
}
