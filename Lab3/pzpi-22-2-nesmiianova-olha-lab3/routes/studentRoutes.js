const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentSubjects,
  getStudentGrades
} = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Отримати список всіх студентів
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Список студентів
 *       500:
 *         description: Помилка сервера
 */
router.get('/', protect, getStudents);

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
router.get('/:id', protect, getStudent);

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
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               group:
 *                 type: string
 *                 description: ID групи
 *               subjects:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Масив ID предметів
 *     responses:
 *       201:
 *         description: Студента створено
 *       400:
 *         description: Неправильні дані
 */
router.post('/', createStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Оновити дані студента
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Дані оновлено
 *       404:
 *         description: Студента не знайдено
 */
router.put('/:id', protect, updateStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Видалити студента
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Студента видалено
 *       404:
 *         description: Студента не знайдено
 */
router.delete('/:id', protect, deleteStudent);

/**
 * @swagger
 * /api/students/{id}/subjects:
 *   get:
 *     summary: Отримати предмети студента
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Список предметів студента
 *       404:
 *         description: Студента не знайдено
 */
router.get('/:id/subjects', protect, getStudentSubjects);

/**
 * @swagger
 * /api/students/{id}/grades:
 *   get:
 *     summary: Get student's grades
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of student's grades
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Student not found
 */
router.get('/:id/grades', protect, getStudentGrades);

module.exports = router; 