let express = require('express');
let router = express.Router();

let homeController = require('../controllers/homeController');
let adminController = require('../controllers/adminController');

/* GET home page. */
router.get('/', homeController.index);

router.post('/contato', homeController.contato);

router.get('/newsletter', homeController.newsletter);

router.get('/admin', adminController.admin);

module.exports = router;
