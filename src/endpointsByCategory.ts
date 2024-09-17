export const endpointsByCategory = {
  'Auths': [
    { name: 'Register User', url: '/api/auth/register', type: 'create' },
    { name: 'Login User', url: '/api/auth/login', type: 'create' },
    { name: 'Logout User', url: '/api/auth/logout', type: 'create' },
    { name: 'Get User', url: '/api/auth/users', type: 'read' },
    { name: 'Delete User', url: '/api/auth/users/:id', type: 'delete' },
    { name: 'Update User', url: '/api/auth/users/:id', type: 'update' },
  ]
};

