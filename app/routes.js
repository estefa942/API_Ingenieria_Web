/**
 * Router import
 */
const { Router } = require('express');

const router = new Router();

/**
 * References to the other routers of each resource
 */
const students = require('./components/student/route');

/**
 * Paths defined to each resource
 */
router.use('/students', students);

module.exports = router;
