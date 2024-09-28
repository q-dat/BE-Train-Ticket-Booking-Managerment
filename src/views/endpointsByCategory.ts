import Vehicle from "~/models/vehicleModel";

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
  ],
  Vehicle:[
    {method: 'get', url: '/api/vehicles', description:'Get all vehicles'},
    {method: 'get', url: '/api/vehicles/:id', description:'Get a vehicle by id'},
    { method: 'post', url: '/api/vehicles', description:'Create a new vehicle'},
    { method: 'put', url: '/api/vehicles/:id', description:'Update a vehicle by id'},
    { method: 'delete', url: '/api/vehicles/:id', description:'Delete a vehicle by id'}
  ]
  ,
  Seat: [
    { method: 'get', url: '/api/seats', description: 'Get all seats' },
    { method: 'get', url: '/api/seats/:id', description: 'Get a seat by id' },
    { method: 'post', url: '/api/seats', description: 'Create a new seat' },
    { method: 'put', url: '/api/seats/:id', description: 'Update a seat by id' },
    { method: 'delete', url: '/api/seats/:id', description: 'Delete a seat by id' }
  ],
  SeatCatalog: [
    { method: 'get', url: '/api/seat-catalogs', description: 'Get all seat catalogs' },
    { method: 'get', url: '/api/seat-catalogs/:id', description: 'Get a seat catalog by id' },
    { method: 'post', url: '/api/seat-catalogs', description: 'Create a new seat catalog' },
    { method: 'put', url: '/api/seat-catalogs/:id', description: 'Update a seat catalog' },
    { method: 'delete', url: '/api/seat-catalogs/:id', description: ' Delete a seat catalog' }
  ],
  Post: [
    { method: 'get', url: '/api/posts', description: 'Get all seats' },
    { method: 'get', url: '/api/posts/:id', description: 'Get a seat by id' },
    { method: 'post', url: '/api/posts', description: 'Create a new seat' },
    { method: 'put', url: '/api/posts/:id', description: 'Update a seat by id' },
    { method: 'delete', url: '/api/posts/:id', description: 'Delete a seat by id' }
  ],
  PostCatalog: [
    { method: 'get', url: '/api/post-catalogs', description: 'Get all ticket catalogs' },
    { method: 'get', url: '/api/post-catalogs/:id', description: 'Get a ticket catalog by id' },
    { method: 'post', url: '/api/post-catalogs', description: 'Create a new ticket catalog' },
    { method: 'put', url: '/api/post-catalogs/:id', description: 'Update a ticket catalog by id' },
    { method: 'delete', url: '/api/post-catalogs/:id', description: 'Delete a ticket catalog by id' }
  ],
  Age: [
    { method: 'get', url: '/api/ages', description: 'Get all age' },
    { method: 'get', url: '/api/ages/:id', description: 'Get a age by id' },
    { method: 'post', url: '/api/ages', description: 'Create a new age' },
    { method: 'put', url: '/api/ages/:id', description: 'Update a age by id' },
    { method: 'delete', url: '/api/ages/:id', description: 'Delete a age by id' }
  ],
  TicketCatalog: [
    { method: 'get', url: '/api/ticket-catalogs', description: 'Get all ticket catalogs' },
    { method: 'get', url: '/api/ticket-catalogs/:id', description: 'Get a ticket catalog by id' },
    { method: 'post', url: '/api/ticket-catalogs', description: 'Create a new ticket catalog' },
    { method: 'put', url: '/api/ticket-catalogs/:id', description: 'Update a ticket catalog by id' },
    { method: 'delete', url: '/api/ticket-catalogs/:id', description: 'Delete a ticket catalog by id' }
  ],
  Cloudinary: [{ method: 'post', url: '/api/uploads', description: 'Upload a new file' }]
}
