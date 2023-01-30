const { body } = require('express-validator');
const validate = require('../config/validator');
const userController = require('../controllers/userController');
const auth = require('../config/Authorization');
const user = require('../models/user');
const upload = require('../config/helper');
module.exports = (Router) => {
    Router.post('/createUser', validate([body('userName').not().isEmpty().withMessage('userName is required').bail().isEmail().withMessage('please enter email as userName'),
    body('password').not().isEmpty().withMessage('please enter password').isLength({ min: 8, max: 20 }).withMessage('allowed length of password is min 8 charactors and max 20 charactors').bail().isStrongPassword({
        minUppercase: 1,
        minSymbols: 1
    }).withMessage('password should contain at least one uppercase letter and one special charactor ')]), userController.createUser);

    Router.post('/signIn', validate([body('userName').not().isEmpty().withMessage('userName is required').bail().isEmail().withMessage('please enter email as userName'),
    body('password').not().isEmpty().withMessage('please enter password').isLength({ min: 8, max: 20 }).withMessage('allowed length of password is min 8 charactors and max 10 charactors').bail().isStrongPassword({
        minUppercase: 0,
        minSymbols: 0
    }).withMessage('password should contain at least one uppercase letter and one special charactor ')]), userController.signIn);

    Router.post('/createProfile/:userId', auth

        //, validate([body('firstName').isEmpty().withMessage('this felid is required').bail().isLength({min:2,max:20}).withMessage('length is of name is min 2 charactor and max 20 charactor ').isAlpha().withMessage('name should contain only alphabates'),

        // body('lastName').isEmpty().withMessage('this felid is required').bail().isLength({min:2,max:20}).withMessage('length is of name is min 2 charactor and max 20 charactor ').isAlpha().withMessage('name should contain only alphabates')
        // ])

        , upload.single('image'), userController.createProfile);


    Router.put('/changePassword', auth
        , validate([body('userName').not().isEmpty().withMessage('userName is required').bail().isEmail().withMessage('please enter email as userName'),
        body('password').not().isEmpty().withMessage('please enter password').isLength({ min: 8, max: 20 }).withMessage('allowed length of password is min 8 charactors and max 10 charactors').bail().isStrongPassword({
            minUppercase: 1,
            minSymbols: 1
        }).withMessage('password should contain at least one uppercase letter and one special charactor')]), userController.changePassword);


    Router.post('/forgotPassword', auth, validate([body('userName').not().isEmpty().withMessage('userName is required').bail().isEmail().withMessage('please enter email as userName')]), userController.forgotPassword);
    Router.get('/delete/userAccount/:userId', auth, userController.deleteAccount);
    Router.get('/signout', auth, userController.signOut);
}