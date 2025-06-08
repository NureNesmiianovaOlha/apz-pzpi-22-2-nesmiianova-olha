const express = require('express');
const router = express.Router();
const {
  getAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/admins:
 *   post:
 *     summary: Створити нового адміністратора
 *     tags: [Admins]
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
 *                 description: Повне ім'я адміністратора
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email адміністратора
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Пароль адміністратора
 *     responses:
 *       201:
 *         description: Адміністратора успішно створено
 *       400:
 *         description: Неправильні дані
 * 
 *   get:
 *     summary: Отримати список всіх адміністраторів
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список адміністраторів
 *       401:
 *         description: Не авторизовано
 *       403:
 *         description: Немає прав для перегляду адміністраторів
 */
// Тимчасово прибираємо захист для створення першого адміністратора
router.post('/', createAdmin);
router.get('/', protect, adminOnly, getAdmins);

/**
 * @swagger
 * /api/admins/{id}:
 *   get:
 *     summary: Отримати адміністратора за ID
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID адміністратора
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Дані адміністратора
 *       401:
 *         description: Не авторизовано
 *       403:
 *         description: Немає прав для перегляду адміністратора
 *       404:
 *         description: Адміністратора не знайдено
 */
router.get('/:id', protect, adminOnly, getAdmin);
router.put('/:id', protect, adminOnly, updateAdmin);
router.delete('/:id', protect, adminOnly, deleteAdmin);

module.exports = router; 