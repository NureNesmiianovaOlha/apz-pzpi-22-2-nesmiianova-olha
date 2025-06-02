const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Створити нового студента
 *     tags: [Students]
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
 *                 description: Повне ім'я студента
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email студента
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Пароль студента
 *               group:
 *                 type: string
 *                 description: ID групи (опціонально)
 *     responses:
 *       201:
 *         description: Студента успішно створено
 *       400:
 *         description: Неправильні дані
 *       409:
 *         description: Студент з таким email вже існує
 * 
 *   get:
 *     summary: Отримати список всіх студентів
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Список студентів
 */
router.get('/', getStudents);

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Отримати студента за ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID студента
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Дані студента
 *       404:
 *         description: Студента не знайдено
 */
router.get('/:id', getStudent);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router; 