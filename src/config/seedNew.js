const sequelize = require('./database');
const { User, Category, Product } = require('../models');

const seedDatabase = async () => {
  try {
    // Sincronizar modelos (crear tablas)
    await sequelize.sync({ alter: true });
    console.log('✅ Tablas sincronizadas');
    
    // Crear categorías
    const categories = await Category.bulkCreate([
      { nombre: 'Laptops', descripcion: 'Computadoras portátiles' },
      { nombre: 'Periféricos', descripcion: 'Teclados, ratones, etc.' },
      { nombre: 'Monitores', descripcion: 'Pantallas y monitores' },
      { nombre: 'Audio', descripcion: 'Audífonos y altavoces' }
    ]);
    console.log('✅ Categorías creadas');
    
    // Actualizar productos existentes con categorías
    await sequelize.query(`
      UPDATE products 
      SET categoryId = CASE 
        WHEN nombre LIKE '%Laptop%' THEN ${categories[0].id}
        WHEN nombre LIKE '%Mouse%' OR nombre LIKE '%Teclado%' THEN ${categories[1].id}
        WHEN nombre LIKE '%Monitor%' THEN ${categories[2].id}
        WHEN nombre LIKE '%Audífono%' THEN ${categories[3].id}
        ELSE NULL
      END
      WHERE categoryId IS NULL
    `);
    console.log('✅ Productos actualizados con categorías');
    
    // Crear usuario admin
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await User.create({
      nombre: 'Administrador',
      email: 'admin@ecommerce.com',
      password: hashedPassword,
      rol: 'admin'
    });
    console.log('✅ Usuario admin creado (email: admin@ecommerce.com, password: admin123)');
    
    // Crear usuario normal
    const hashedUserPassword = await bcrypt.hash('user123', 10);
    await User.create({
      nombre: 'Usuario Demo',
      email: 'user@ecommerce.com',
      password: hashedUserPassword,
      rol: 'user'
    });
    console.log('✅ Usuario demo creado (email: user@ecommerce.com, password: user123)');
    
    console.log('\n🎉 Base de datos inicializada correctamente');
    
  } catch (error) {
    console.error('❌ Error en seed:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
