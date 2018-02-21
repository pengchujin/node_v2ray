const router = require('koa-router')();
const one = require('../controller/getJson')
// const router = new Router();


router.get('/',one.getJson);
router.get('/QR',one.getVQRCode);
router.get('/RocketQR',one.getV2rayRocketQR);

module.exports = router