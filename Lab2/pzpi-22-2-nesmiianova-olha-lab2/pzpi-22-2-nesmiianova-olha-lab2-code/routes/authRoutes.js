const express = require('express');
const router = express.Router();
const { loginStudent, loginTeacher, loginAdmin } = require('../controllers/authController');

/**
 * @swagger
 * /api/auth/student/login:
 *   post:
 *     summary: Вхід для студента
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email студента
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Пароль студента
 *     responses:
 *       200:
 *         description: Успішний вхід
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 fullName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Неправильний email або пароль
 */
router.post('/student/login', loginStudent);

/**
 * @swagger
 * /api/auth/teacher/login:
 *   post:
 *     summary: Вхід для викладача
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email викладача
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Пароль викладача
 *     responses:
 *       200:
 *         description: Успішний вхід
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 fullName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Неправильний email або пароль
 */
router.post('/teacher/login', loginTeacher);

/**
 * @swagger
 * /api/auth/admin/login:
 *   post:
 *     summary: Вхід для адміністратора
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email адміністратора
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Пароль адміністратора
 *     responses:
 *       200:
 *         description: Успішний вхід
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 fullName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Неправильний email або пароль
 */
router.post('/admin/login', loginAdmin);

module.exports = router; 