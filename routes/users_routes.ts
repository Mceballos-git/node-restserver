// import { Router } from 'express';
const Router = require( 'express' );
export {}

const { usersGet, 
        usersPost, 
        usersPut, 
        usersPatch, 
        usersDelete } = require( '../controllers/users_controller' )


const router = Router();

router.get( '/', usersGet );
router.post( '/', usersPost );
router.put( '/:id', usersPut );
router.patch( '/', usersPatch );
router.delete( '/', usersDelete );


module.exports = router;


