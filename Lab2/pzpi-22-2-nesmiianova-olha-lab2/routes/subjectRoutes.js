const express = require('express');
const router = express.Router();
const {
  getSubjects,
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject
} = require('../controllers/subjectController');

/**
 * @swagger
 * /api/subjects:
 *   post:
 *     summary: Створити новий предмет
 *     tags: [Subjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - teacherId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Назва предмету
 *               teacherId:
 *                 type: string
 *                 description: ID викладача, який веде предмет
 *     responses:
 *       201:
 *         description: Предмет успішно створено
 *       400:
 *         description: Неправильні дані
 *       404:
 *         description: Викладача не знайдено
 * 
 *   get:
 *     summary: Отримати список всіх предметів
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: Список предметів
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   teacherId:
 *                     type: string
 */
router.get('/', getSubjects);

/**
 * @swagger
 * /api/subjects/{id}:
 *   get:
 *     summary: Отримати предмет за ID
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID предмету
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Дані предмету
 *       404:
 *         description: Предмет не знайдено
 *   
 *   put:
 *     summary: Оновити предмет
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID предмету
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Нова назва предмету
 *               teacherId:
 *                 type: string
 *                 description: Новий ID викладача
 *     responses:
 *       200:
 *         description: Предмет успішно оновлено
 *       400:
 *         description: Неправильні дані
 *       404:
 *         description: Предмет не знайдено
 *
 *   delete:
 *     summary: Видалити предмет
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID предмету
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Предмет успішно видалено
 *       404:
 *         description: Предмет не знайдено
 */
router.get('/:id', getSubject);
router.post('/', createSubject);
router.put('/:id', updateSubject);
router.delete('/:id', deleteSubject);

module.exports = router; 