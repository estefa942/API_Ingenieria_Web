const { Router } = require('express');
const controller = require('./controller');

const router = new Router();

  router.route('/')
  .get((req, res) => controller.getStudents(req, res));

  router.route('/:id')
  .get((req, res) => controller.getStudentById(req, res));

  router.route('/')
  .post((req, res) => controller.createStudent(req, res));

  router.route('/:id')
  .put((req, res) => controller.updateStudent(req, res));

  router.route('/:id')
  .delete((req, res) => controller.deleteStudent(req, res));

  router.route('/average')
  .post((req, res) => controller.getAverage(req, res));

  router.route('/updateNote')
  .post((req, res) => controller.updateNote(req, res));

module.exports = router;
