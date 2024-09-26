import express from 'express'
import {
    getAllPostCatalogs,
    createPostCatalog,
    deletePostCatalog,
    updatePostCatalog,
    getPostCatalogById
} from '~/controllers/postCatalogController'

const postCatalogRoutes = express.Router()
postCatalogRoutes.get('/post-catalogs', getAllPostCatalogs)
postCatalogRoutes.post('/post-catalogs', createPostCatalog)
postCatalogRoutes.get('/post-catalogs/:id', getPostCatalogById)
postCatalogRoutes.put('/post-catalogs/:id', updatePostCatalog)
postCatalogRoutes.delete('/post-catalogs/:id', deletePostCatalog)

export default postCatalogRoutes
