const router = require('express').Router();
const multer = require('multer');
const path = require('path');
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


const upload = multer({ storage: multer.diskStorage({
    destination: (req, file, cb) => {   
        cb(null, 'uploads/images');
    } ,
    filename: (req, file, cb) => {          
        cb(null, Date.now() + path.extname(file.originalname));
    }   
}) });

router.post('/create',upload.single('photo'),validateBody,validate,createUser);
router.get('/list', viewUser);
router.get('/single/:id', viewUserById); 
router.put('/update/:id',validateBody,validate,updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;