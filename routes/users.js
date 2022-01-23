var express = require('express');
var router = express.Router();
const stopProcess = require('../routes/stop_process')
const runningProcess = require('../routes/running_process')

/* GET users listing. */
router.get('/startedService', runningProcess.runningService);
router.get('/stoppedService',stopProcess.stoppedService);



module.exports = router;
