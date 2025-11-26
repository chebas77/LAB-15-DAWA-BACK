const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { JWT_SECRET } = require('../middlewares/auth.middleware');

exports.register = async (req, res) => {
  try {
    console.log('📝 Datos recibidos en registro:', req.body);
    
    const { nombre, email, password, rol } = req.body;
    
    // Validar campos requeridos
    if (!nombre || !email || !password) {
      console.log('❌ Campos faltantes:', { nombre: !!nombre, email: !!email, password: !!password });
      return res.status(400).json({
        success: false,
        message: 'Nombre, email y password son requeridos',
        fields: {
          nombre: !nombre ? 'requerido' : 'ok',
          email: !email ? 'requerido' : 'ok',
          password: !password ? 'requerido' : 'ok'
        }
      });
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'El formato del email no es válido'
      });
    }
    
    // Validar longitud de password
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña debe tener al menos 6 caracteres'
      });
    }
    
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log('❌ Email ya registrado:', email);
      return res.status(400).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }
    
    // Hashear password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      nombre,
      email,
      password: hashedPassword,
      rol: rol || 'user'
    });
    
    console.log('✅ Usuario registrado exitosamente:', user.email);
    
    const userResponse = user.toJSON();
    delete userResponse.password;
    
    res.status(201).json({
      success: true,
      message: 'Usuario registrado correctamente',
      data: userResponse
    });
  } catch (error) {
    console.error('❌ Error al registrar usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al registrar usuario',
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y password son requeridos'
      });
    }
    
    // Buscar usuario
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }
    
    // Verificar password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }
    
    // Verificar si el usuario está activo
    if (!user.activo) {
      return res.status(403).json({
        success: false,
        message: 'Usuario inactivo'
      });
    }
    
    // Generar token
    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    const userResponse = user.toJSON();
    delete userResponse.password;
    
    res.json({
      success: true,
      message: 'Login exitoso',
      data: {
        user: userResponse,
        token
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error en el login',
      error: error.message
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener perfil'
    });
  }
};
