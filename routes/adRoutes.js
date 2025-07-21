const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { createAd, viewAd, viewAdById, updateAd, deleteAd, loginAd } = require('../controllers/adController');
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
    body('email').notEmpty().isEmail().withMessage('Valid email is required')
];

const validateLogin = [
    body('email').notEmpty().isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Valid password is required')
];


const upload = multer({ storage: multer.diskStorage({
    destination: (req, file, cb) => {   
        cb(null, 'uploads/images');
    } ,
    filename: (req, file, cb) => {          
        cb(null, Date.now() + path.extname(file.originalname));
    }   
}) });

router.post('/create',validateBody,validate,createAd);
router.post('/login',validateLogin,validate,loginAd);
router.get('/list', viewAd);
router.get('/single/:id', viewAdById); 
router.put('/update/:id',validateBody,validate,updateAd);
router.delete('/delete/:id', deleteAd);

module.exports = router;