const router = require('express').Router();
const { createAd,listAd } = require('../controllers/adController');
const authMiddleware = require('../middleware/auth');

router.post('/createad',authMiddleware,createAd);
router.post('/list',listAd);
// router.get('/view/:id', viewAdById); 
// router.put('/update/:id',updateAd);
// router.delete('/delete/:id', deleteAd);

module.exports = router;