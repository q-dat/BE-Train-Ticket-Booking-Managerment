export const endpointsByCategory = {
  Auth: [
    { method: 'post', url: '/api/auth/register', description: 'Register a new user' },
    { method: 'post', url: '/api/auth/login', description: 'Login a user' },
    { method: 'post', url: '/api/auth/logout', description: 'Logout a user' }
  ],
  Location: [
    { method: 'get', url: '/api/locations', description: 'Get all locations' },
    { method: 'get', url: '/api/locations/:id', description: 'Get a location by id' },
    { method: 'post', url: '/api/locations', description: 'Create a new location' },
    { method: 'put', url: '/api/locations/:id', description: 'Update a location by id' },
    { method: 'delete', url: '/api/locations/:id', description: 'Delete a location by id' }
  ],
  Trip: [
    { method: 'get', url: '/api/trips', description: 'Get all trips' },
    { method: 'get', url: '/api/trips/search', description: 'Search for trips' },
    { method: 'get', url: '/api/trips/:id', description: 'Get trip by id' },
    { method: 'post', url: '/api/trips', description: 'Create a new trip' },
    { method: 'put', url: '/api/trips/:id', description: 'Update a trip by id' },
    { method: 'delete', url: '/api/trips/:id', description: 'Delete a trip by id' }
  ]
}