const express = require('express');
const router = express.Router();
const {
  getGrades,
  getGrade,
  createGrade,
  updateGrade,
  deleteGrade
} = require('../controllers/gradeController');
const { protect, teacherOnly } = require('../middleware/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Grade:
 *       type: object
 *       required:
 *         - studentId
 *         - subjectId
 *         - gradeValue
 *       properties:
 *         studentId:
 *           type: string
 *           description: ID студента
 *         subjectId:
 *           type: string
 *           description: ID предмета
 *         gradeValue:
 *           type: number
 *           description: Значення оцінки
 *         date:
 *           type: string
 *           format: date-time
 *           description: Дата виставлення оцінки
 */

/**
 * @swagger
 * /api/grades:
 *   get:
 *     summary: Отримати всі оцінки
 *     tags: [Grades]
 *     responses:
 *       200:
 *         description: Список всіх оцінок
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grade'
 */
router.get('/', getGrades);

/**
 * @swagger
 * /api/grades/{id}:
 *   get:
 *     summary: Отримати оцінку за ID
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID оцінки
 *     responses:
 *       200:
 *         description: Оцінка знайдена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 *       404:
 *         description: Оцінку не знайдено
 */
router.get('/:id', getGrade);

/**
 * @swagger
 * /api/grades:
 *   post:
 *     summary: Створити нову оцінку
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Grade'
 *     responses:
 *       201:
 *         description: Оцінку створено
 *       401:
 *         description: Не авторизовано
 *       403:
 *         description: Немає прав для створення оцінки
 */
router.post('/', protect, teacherOnly, createGrade);

/**
 * @swagger
 * /api/grades/{id}:
 *   put:
 *     summary: Оновити оцінку
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID оцінки
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Grade'
 *     responses:
 *       200:
 *         description: Оцінку оновлено
 *       401:
 *         description: Не авторизовано
 *       403:
 *         description: Немає прав для оновлення оцінки
 *       404:
 *         description: Оцінку не знайдено
 */
router.put('/:id', protect, teacherOnly, updateGrade);

/**
 * @swagger
 * /api/grades/{id}:
 *   delete:
 *     summary: Видалити оцінку
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID оцінки
 *     responses:
 *       200:
 *         description: Оцінку видалено
 *       401:
 *         description: Не авторизовано
 *       403:
 *         description: Немає прав для видалення оцінки
 *       404:
 *         description: Оцінку не знайдено
 */
router.delete('/:id', protect, teacherOnly, deleteGrade);

module.exports = router; 