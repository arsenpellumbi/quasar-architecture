import { RouteRecordRaw } from 'vue-router';
import Projects from './projects.vue';
import ProjectList from './project-list/project-list.vue';
import ProjectDetail from './project-detail/project-detail.vue';
import TaskEdit from './task-edit/task-edit.vue';
import TaskDetail from './task-detail/task-detail.vue';
import TaskList from './task-list/task-list.vue';

const route: RouteRecordRaw = {
  path: '/projects',
  name: 'Projects',
  component: Projects,
  meta: {
    requireAuthentication: true,
    title: 'Project manager',
    noCache: true,
    layout: 'main-layout',
  },
  children: [
    {
      path: '',
      name: 'ProjectList',
      component: ProjectList,
    },

    {
      path: ':projectId',
      name: 'ProjectDetail',
      component: ProjectDetail,
      redirect: { name: 'TaskList' },
      children: [
        {
          path: 'tasks',
          name: 'TaskList',
          component: TaskList,
          children: [
            {
              path: ':taskId',
              name: 'TaskDetail',
              component: TaskDetail,
            },
            {
              path: 'new',
              name: 'TaskNew',
              component: TaskEdit,
            },
            {
              path: ':taskId/edit',
              name: 'TaskEdit',
              component: TaskEdit,
            },
          ],
        },
      ],
    },
  ],
};

export default route;
