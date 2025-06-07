const express = require('express');
const router = express.Router();
const {
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher
} = require('../controllers/teacherController');

/**
 * @swagger
 * /api/teachers:
 *   post:
 *     summary: Створити нового викладача
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Повне ім'я викладача
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email викладача
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Пароль викладача
 *     responses:
 *       201:
 *         description: Викладача успішно створено
 *       400:
 *         description: Неправильні дані
 *       409:
 *         description: Викладач з таким email вже існує
 * 
 *   get:
 *     summary: Отримати список всіх викладачів
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: Список викладачів
 */
router.get('/', getTeachers);

/**
 * @swagger
 * /api/teachers/{id}:
 *   get:
 *     summary: Отримати викладача за ID
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID викладача
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Дані викладача
 *       404:
 *         description: Викладача не знайдено
 */
router.get('/:id', getTeacher);
router.post('/', createTeacher);
router.put('/:id', updateTeacher);
router.delete('/:id', deleteTeacher);

module.exports = router; 