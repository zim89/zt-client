export const apiRoutes = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    logoutAll: '/auth/logout-all',
    refresh: '/auth/refresh',
    profile: '/auth/profile',
  },
  project: {
    findMany: '/projects',
    findNames: '/projects/names',
    findById: (id: string) => `/projects/${id}`,
    findBySlug: (slug: string) => `/projects/slug/${slug}`,

    create: '/projects',
    update: (id: string) => `/projects/${id}`,
    delete: (id: string) => `/projects/${id}`,
    addMember: (id: string) => `/projects/${id}/members`,
    removeMember: (id: string, memberId: string) =>
      `/projects/${id}/members/${memberId}`,
    updateMemberRole: (id: string, memberId: string) =>
      `/projects/${id}/members/${memberId}/role`,
  },
  category: {
    findMany: '/categories',
    findNames: '/categories/names',
    findById: (id: string) => `/categories/${id}`,
    findBySlug: (slug: string) => `/categories/slug/${slug}`,
    create: '/categories',
    update: (id: string) => `/categories/${id}`,
    delete: (id: string) => `/categories/${id}`,
  },
  marker: {
    findMany: '/markers',
    findNames: '/markers/names',
    findById: (id: string) => `/markers/${id}`,
    findBySlug: (slug: string) => `/markers/slug/${slug}`,
    create: '/markers',
    update: (id: string) => `/markers/${id}`,
    delete: (id: string) => `/markers/${id}`,
  },
  task: {
    findMany: '/tasks',
    findById: (id: string) => `/tasks/${id}`,
    create: '/tasks',
    update: (id: string) => `/tasks/${id}`,
    delete: (id: string) => `/tasks/${id}`,
    updateStatus: (id: string) => `/tasks/${id}/status`,
    assign: (id: string) => `/tasks/${id}/assign`,
    addMarker: (id: string, markerId: string) =>
      `/tasks/${id}/markers/${markerId}`,
    removeMarker: (id: string, markerId: string) =>
      `/tasks/${id}/markers/${markerId}`,
  },
  statistic: {
    overview: '/statistics/overview',
  },
} as const
