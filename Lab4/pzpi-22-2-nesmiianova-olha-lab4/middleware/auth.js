const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Захист маршрутів
exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        message: 'Не авторизований доступ'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } catch (err) {
      return res.status(401).json({
        message: 'Не авторизований доступ'
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: 'Не авторизований доступ'
    });
  }
};

// Перевірка ролей
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Немає прав для доступу до цього ресурсу'
      });
    }
    next();
  };
}; 