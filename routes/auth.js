/*
 Users routes
 host = /api/auth
 */

const {Router} = require('express')
const { check } = require('express-validator')
const { filedValid } = require('../middlewares/fields-valid')
const {createUser,login,revalToken} = require('../controller/auth')
const router = Router()
const { valjwt } = require('../middlewares/valid-jwt')

router.post(
    '/new',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('password', 'The password is required').isLength({min:6}),
        filedValid

    ],
    createUser)

router.post('/',[
        check('email', 'The email is required').isEmail(),
        check('password', 'The password is required').isLength({min:6}),
        filedValid
],login )

router.get('/renew',valjwt,revalToken)

module.exports = router;