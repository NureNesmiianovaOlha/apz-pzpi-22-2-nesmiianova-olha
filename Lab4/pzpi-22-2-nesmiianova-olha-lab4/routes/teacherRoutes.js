const express = require('express');
const router = express.Router();
const {
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherSubjects,
  getSubjectStudents,
  updateGrade,
  addGrade
} = require('../controllers/teacherController');
const { protect, teacherOnly } = require('../middleware/authMiddleware');

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

/**
 * @swagger
 * /api/teachers/{id}/subjects:
 *   get:
 *     summary: Отримати предмети викладача
 *     tags: [Teachers]
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
 *         description: Список предметів викладача
 *       401:
 *         description: Не авторизовано
 *       403:
 *         description: Немає прав доступу
 */
router.get('/:id/subjects', protect, teacherOnly, getTeacherSubjects);

/**
 * @swagger
 * /api/teachers/subjects/{subjectId}/students:
 *   get:
 *     summary: Отримати студентів предмету
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Список студентів з їх оцінками
 *       401:
 *         description: Не авторизовано
 *       403:
 *         description: Немає прав доступу
 */
router.get('/subjects/:subjectId/students', protect, teacherOnly, getSubjectStudents);

/**
 * @swagger
 * /api/teachers/grades/{gradeId}:
 *   put:
 *     summary: Оновити оцінку студента
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - grade
 *             properties:
 *               grade:
 *                 type: number
 *     responses:
 *       200:
 *         description: Оцінку оновлено
 *       401:
 *         description: Не авторизовано
 *       403:
 *         description: Немає прав доступу
 */
router.put('/grades/:gradeId', protect, teacherOnly, updateGrade);

/**
 * @swagger
 * /api/teachers/grades:
 *   post:
 *     summary: Додати нову оцінку
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - subjectId
 *               - grade
 *             properties:
 *               studentId:
 *                 type: string
 *               subjectId:
 *                 type: string
 *               grade:
 *                 type: number
 *     responses:
 *       201:
 *         description: Оцінку додано
 *       401:
 *         description: Не авторизовано
 *       403:
 *         description: Немає прав доступу
 */
router.post('/grades', protect, teacherOnly, addGrade);

module.exports = router; 