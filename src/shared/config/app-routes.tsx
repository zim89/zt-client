export const appRoutes = {
  public: {
    index: '/',
    about: '/#about',
    features: '/#features',
  },
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  app: {
    index: '/app',
    tasks: {
      index: '/app/tasks',
      byCategory: (slug: string) => `/app/tasks/categories/${slug}`,
      byProject: (slug: string) => `/app/tasks/projects/${slug}`,
    },
    projects: '/app/projects',
  },
}
