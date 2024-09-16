export const endpointsByCategory = {
  'Auths': [
    { name: 'Register User', url: '/api/auth/register', type: 'create' },
    { name: 'Login User', url: '/api/auth/login', type: 'create' },
    { name: 'Logout User', url: '/products', type: 'create' },
    { name: 'Get User', url: '/api/auth/users', type: 'read' },
    { name: 'Delete Product', url: '/products/{id}', type: 'delete' },
    { name: 'Get Products by Catalog', url: '/products/catalog/:id_catalog', type: 'read' },
    { name: 'Search Products by Name', url: '/products/search/:name', type: 'read' },
    { name: 'Get Products on Sale', url: '/sale', type: 'read' }
  ],
  'Catalogs': [
    { name: 'Get Catalogs', url: '/catalog', type: 'read' },
    { name: 'Get Catalog by ID', url: '/catalog/{id}', type: 'read' },
    { name: 'Create Catalog', url: '/catalog', type: 'create' },
    { name: 'Update Catalog', url: '/catalog/{id}', type: 'update' },
    { name: 'Delete Catalog', url: '/catalog/{id}', type: 'delete' }
  ],
  'Orders': [
    { name: 'Create Order', url: '/orders', type: 'create' },
    { name: 'Get Orders', url: '/orders', type: 'read' },
    { name: 'Get Order by ID', url: '/orders/{id}', type: 'read' },
    { name: 'Update Order', url: '/orders/{id}', type: 'update' },
    { name: 'Delete Order', url: '/orders/{id}', type: 'delete' }
  ]
};

