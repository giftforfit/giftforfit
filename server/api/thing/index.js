'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.get('/join', controller.join);
router.get('/join2', controller.join2);
router.post('/activity-subscription', controller.activitySubscription);

module.exports = router;