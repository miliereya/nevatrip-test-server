const cityController = require('../controllers/city-controller')
const ticketController = require('../controllers/ticket-controller')
const userController = require('../controllers/user-controller')
const voyageController = require('../controllers/voyage-controller')
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')
const adminMiddleware = require('../middlewares/admin-middleware')

const Router = require('express').Router
const router = new Router

//cities
router.get('/cities/get', cityController.getCities)
router.post('/cities/add', adminMiddleware, cityController.addCity)


//voyages
router.get('/voyages/get', voyageController.getVoyages)
router.post('/voyages/add', adminMiddleware, voyageController.addVoyage)

//tickets
router.post('/tickets/add', authMiddleware, ticketController.addTicket)

//users
router.post('/user/registration', 
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 24 }),
userController.registration)
router.post('/user/cart/get', authMiddleware, ticketController.getTickets)
router.post('/user/login', userController.login)
router.post('/user/logout', userController.logout)
router.post('/user/refresh', userController.refresh)
router.post('/user/cart/add', authMiddleware, userController.addToCart)
router.post('/user/cart/delete', authMiddleware, userController.deleteFromCart)


module.exports = router