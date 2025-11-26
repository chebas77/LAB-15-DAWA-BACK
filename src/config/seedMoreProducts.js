const sequelize = require('./database');
const { Product, Category } = require('../models');

const seedMoreProducts = async () => {
  try {
    // Obtener categorías
    const categories = await Category.findAll();
    const laptops = categories.find(c => c.nombre === 'Laptops');
    const perifericos = categories.find(c => c.nombre === 'Periféricos');
    const monitores = categories.find(c => c.nombre === 'Monitores');
    const audio = categories.find(c => c.nombre === 'Audio');
    
    // Insertar más productos
    await Product.bulkCreate([
      // Laptops
      { 
        nombre: 'MacBook Air M2', 
        precio: 4999.00, 
        descripcion: 'Laptop Apple con chip M2, 13 pulgadas', 
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
        categoryId: laptops?.id
      },
      { 
        nombre: 'Dell XPS 15', 
        precio: 5499.00, 
        descripcion: 'Laptop premium con pantalla 4K OLED', 
        imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45',
        categoryId: laptops?.id
      },
      { 
        nombre: 'HP Pavilion Gaming', 
        precio: 3299.00, 
        descripcion: 'Laptop gaming con RTX 3050', 
        imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302',
        categoryId: laptops?.id
      },
      { 
        nombre: 'ASUS ROG Strix', 
        precio: 6799.00, 
        descripcion: 'Laptop gaming de alto rendimiento', 
        imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302',
        categoryId: laptops?.id
      },
      { 
        nombre: 'Acer Aspire 5', 
        precio: 2199.00, 
        descripcion: 'Laptop económica para estudiantes', 
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
        categoryId: laptops?.id
      },
      
      // Periféricos - Teclados
      { 
        nombre: 'Logitech MX Keys', 
        precio: 449.00, 
        descripcion: 'Teclado inalámbrico profesional', 
        imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
        categoryId: perifericos?.id
      },
      { 
        nombre: 'Corsair K95 RGB', 
        precio: 899.00, 
        descripcion: 'Teclado mecánico gaming premium', 
        imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae',
        categoryId: perifericos?.id
      },
      { 
        nombre: 'Razer BlackWidow V3', 
        precio: 649.00, 
        descripcion: 'Teclado mecánico con switches verdes', 
        imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212',
        categoryId: perifericos?.id
      },
      
      // Periféricos - Mouse
      { 
        nombre: 'Logitech MX Master 3', 
        precio: 399.00, 
        descripcion: 'Mouse ergonómico para profesionales', 
        imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db',
        categoryId: perifericos?.id
      },
      { 
        nombre: 'Razer DeathAdder V2', 
        precio: 289.00, 
        descripcion: 'Mouse gaming de alto rendimiento', 
        imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7',
        categoryId: perifericos?.id
      },
      { 
        nombre: 'Logitech G502 Hero', 
        precio: 349.00, 
        descripcion: 'Mouse gaming con 11 botones programables', 
        imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db',
        categoryId: perifericos?.id
      },
      { 
        nombre: 'HyperX Pulsefire Haste', 
        precio: 199.00, 
        descripcion: 'Mouse gaming ultraligero 59g', 
        imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7',
        categoryId: perifericos?.id
      },
      
      // Periféricos - Otros
      { 
        nombre: 'Logitech C920 Webcam', 
        precio: 329.00, 
        descripcion: 'Webcam Full HD 1080p', 
        imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04',
        categoryId: perifericos?.id
      },
      { 
        nombre: 'Blue Yeti Micrófono', 
        precio: 599.00, 
        descripcion: 'Micrófono USB profesional', 
        imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc',
        categoryId: perifericos?.id
      },
      
      // Monitores
      { 
        nombre: 'LG UltraGear 27" 144Hz', 
        precio: 1899.00, 
        descripcion: 'Monitor gaming QHD con 144Hz', 
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf',
        categoryId: monitores?.id
      },
      { 
        nombre: 'Dell UltraSharp 32" 4K', 
        precio: 2799.00, 
        descripcion: 'Monitor profesional 4K IPS', 
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf',
        categoryId: monitores?.id
      },
      { 
        nombre: 'ASUS ROG Swift 27" 240Hz', 
        precio: 3499.00, 
        descripcion: 'Monitor gaming de alta frecuencia', 
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf',
        categoryId: monitores?.id
      },
      { 
        nombre: 'BenQ 24" Eye Care', 
        precio: 899.00, 
        descripcion: 'Monitor con tecnología de cuidado ocular', 
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf',
        categoryId: monitores?.id
      },
      { 
        nombre: 'AOC 34" Ultrawide', 
        precio: 2299.00, 
        descripcion: 'Monitor ultrawide curvo para productividad', 
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf',
        categoryId: monitores?.id
      },
      
      // Audio - Audífonos
      { 
        nombre: 'Sony WH-1000XM5', 
        precio: 1499.00, 
        descripcion: 'Audífonos premium con cancelación de ruido', 
        imageUrl: 'https://images.unsplash.com/photo-1545127398-14699f92334b',
        categoryId: audio?.id
      },
      { 
        nombre: 'Apple AirPods Pro 2', 
        precio: 1299.00, 
        descripcion: 'Audífonos inalámbricos con ANC', 
        imageUrl: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7',
        categoryId: audio?.id
      },
      { 
        nombre: 'Bose QuietComfort 45', 
        precio: 1399.00, 
        descripcion: 'Audífonos con excelente cancelación de ruido', 
        imageUrl: 'https://images.unsplash.com/photo-1545127398-14699f92334b',
        categoryId: audio?.id
      },
      { 
        nombre: 'HyperX Cloud II', 
        precio: 449.00, 
        descripcion: 'Audífonos gaming con sonido 7.1', 
        imageUrl: 'https://images.unsplash.com/photo-1599669454699-248893623440',
        categoryId: audio?.id
      },
      { 
        nombre: 'SteelSeries Arctis 7', 
        precio: 799.00, 
        descripcion: 'Headset gaming inalámbrico', 
        imageUrl: 'https://images.unsplash.com/photo-1599669454699-248893623440',
        categoryId: audio?.id
      },
      { 
        nombre: 'JBL Tune 510BT', 
        precio: 199.00, 
        descripcion: 'Audífonos bluetooth económicos', 
        imageUrl: 'https://images.unsplash.com/photo-1545127398-14699f92334b',
        categoryId: audio?.id
      },
      
      // Audio - Altavoces
      { 
        nombre: 'Logitech Z623', 
        precio: 649.00, 
        descripcion: 'Sistema de altavoces 2.1 con subwoofer', 
        imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1',
        categoryId: audio?.id
      },
      { 
        nombre: 'Razer Nommo Chroma', 
        precio: 899.00, 
        descripcion: 'Altavoces gaming con iluminación RGB', 
        imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1',
        categoryId: audio?.id
      },
      { 
        nombre: 'Bose SoundLink Mini', 
        precio: 899.00, 
        descripcion: 'Altavoz bluetooth portátil premium', 
        imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1',
        categoryId: audio?.id
      },
      { 
        nombre: 'JBL Flip 6', 
        precio: 549.00, 
        descripcion: 'Altavoz bluetooth resistente al agua', 
        imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1',
        categoryId: audio?.id
      }
    ]);
    
    console.log('✅ Se insertaron 30 productos adicionales exitosamente');
    
    // Mostrar resumen
    const totalProducts = await Product.count();
    console.log(`📦 Total de productos en la base de datos: ${totalProducts}`);
    
    const productsByCategory = await sequelize.query(`
      SELECT c.nombre as categoria, COUNT(p.id) as total
      FROM categories c
      LEFT JOIN products p ON c.id = p.categoryId
      GROUP BY c.id, c.nombre
      ORDER BY total DESC
    `);
    
    console.log('\n📊 Productos por categoría:');
    productsByCategory[0].forEach(cat => {
      console.log(`   ${cat.categoria}: ${cat.total} productos`);
    });
    
  } catch (error) {
    console.error('❌ Error insertando productos:', error);
  } finally {
    await sequelize.close();
  }
};

seedMoreProducts();
