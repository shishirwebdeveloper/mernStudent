const router = require('express').Router();
const { createUser, viewUser, viewUserById, updateUser, deleteUser } = require('../controllers/userController');
const {body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 400, message: 'Validation failed', errors: errors.array() });
    }
    next();
};

const validateBody = [
    body('name').isLength({ min: 6 }).notEmpty().withMessage('Name is required'),
    body('email').notEmpty().isEmail().withMessage('Valid email is required'),
    body('address').notEmpty().withMessage('Address is required')
];

router.post('/create',validateBody,validate,createUser);
router.get('/list', viewUser);
router.get('/single/:id', viewUserById); 
router.put('/update/:id',validateBody,validate,updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;