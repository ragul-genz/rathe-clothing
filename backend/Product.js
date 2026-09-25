const { DataTypes } = require('sequelize');
const sequelize = require('./database');

// 1. Define Product Model
const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    subCategory: { type: DataTypes.STRING },
    price: { type: DataTypes.FLOAT, allowNull: false }, // Base Price
    discountPrice: { type: DataTypes.FLOAT },
    
    image: { type: DataTypes.TEXT('long'), allowNull: false }, 
    
    images: { 
        type: DataTypes.JSON, 
        defaultValue: [] 
    },
    description: { type: DataTypes.TEXT('long') },
    material: { type: DataTypes.STRING },
    rating: { type: DataTypes.FLOAT, defaultValue: 4.5 },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 }, // Total Stock (Sum)
    
    // Detailed Stock per Size
    sizeStock: {
        type: DataTypes.JSON, // Stores { "S": 10, "M": 5, "L": 0 }
        defaultValue: {}
    },

    // NEW: Detailed Price per Size
    sizePrices: {
        type: DataTypes.JSON, // Stores { "S": 1000, "M": 1200, "L": 1500 }
        defaultValue: {}
    },
    
    // NEW: Toggle to show/hide free size
    showFreeSize: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

// SEED DATA FOR DEMO / LOCAL STARTUP
const INITIAL_PRODUCTS = [
  {
    name: "Kanchipuram Silk Saree - Royal Gold & Magenta",
    category: "Saree",
    subCategory: "Silk Saree",
    price: 4999,
    discountPrice: 3999,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Pure zari woven authentic Kanchipuram silk saree with vibrant color combinations and rich pallu work.",
    material: "Pure Silk",
    rating: 4.9,
    stock: 15,
    sizeStock: { "Free Size": 15 },
    sizePrices: { "Free Size": 3999 },
    showFreeSize: true
  },
  {
    name: "Embroidered Nyra Cut Kurti Set",
    category: "Kurtis Collections",
    subCategory: "Nyra Cut Kurti",
    price: 1899,
    discountPrice: 1499,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Graceful Nyra cut kurti set with intricate thread embroidery and soft viscose dupatta.",
    material: "Viscose Rayon",
    rating: 4.7,
    stock: 25,
    sizeStock: { "S": 5, "M": 10, "L": 8, "XL": 2 },
    sizePrices: { "S": 1499, "M": 1499, "L": 1499, "XL": 1499 },
    showFreeSize: false
  },
  {
    name: "Premium Cotton Ankle Length Leggings",
    category: "Bottom Wear",
    subCategory: "Ankle Length",
    price: 499,
    discountPrice: 399,
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80"
    ],
    description: "4-way stretch bio-washed combed cotton leggings for all-day comfort and perfect fit.",
    material: "95% Cotton, 5% Spandex",
    rating: 4.8,
    stock: 50,
    sizeStock: { "Free Size": 50 },
    sizePrices: { "Free Size": 399 },
    showFreeSize: true
  },
  {
    name: "Handloom Organic Linen Cotton Saree",
    category: "Saree",
    subCategory: "Cotton Saree",
    price: 2299,
    discountPrice: 1799,
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Breathable handloom linen cotton saree featuring hand-block prints and tassel detailing.",
    material: "Linen Cotton",
    rating: 4.6,
    stock: 20,
    sizeStock: { "Free Size": 20 },
    sizePrices: { "Free Size": 1799 },
    showFreeSize: true
  },
  {
    name: "Royal Anarkali 3-Piece Kurti Set",
    category: "Kurtis Collections",
    subCategory: "Three piece set",
    price: 2999,
    discountPrice: 2299,
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Full flair flared Anarkali with pant and heavy organza dupatta, perfect for festive occasions.",
    material: "Chanderi Silk Blend",
    rating: 4.9,
    stock: 12,
    sizeStock: { "M": 4, "L": 5, "XL": 3 },
    sizePrices: { "M": 2299, "L": 2299, "XL": 2299 },
    showFreeSize: false
  },
  {
    name: "Bandhani Printed Pure Cotton Dupatta",
    category: "Dupatta",
    subCategory: "Printed Cotton Dupatta",
    price: 399,
    discountPrice: 299,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Vibrant ethnic Bandhani tie-dye printed dupatta with latkan border.",
    material: "100% Cotton",
    rating: 4.5,
    stock: 35,
    sizeStock: { "Free Size": 35 },
    sizePrices: { "Free Size": 299 },
    showFreeSize: true
  }
];

const seedProducts = async () => {
    try {
        await Product.sync({ force: false }); 
        
        // Check if manual column addition is needed for TiDB/MySQL strict mode
        try {
            const [results] = await sequelize.query(
                "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Products' AND COLUMN_NAME = 'sizePrices' AND TABLE_SCHEMA = DATABASE()"
            );
            if (results.length === 0) {
                console.log('⚙️ Adding missing "sizePrices" column...');
                await sequelize.query("ALTER TABLE Products ADD COLUMN sizePrices JSON");
            }
            
            const [fsResult] = await sequelize.query(
                "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Products' AND COLUMN_NAME = 'showFreeSize' AND TABLE_SCHEMA = DATABASE()"
            );
            if (fsResult.length === 0) {
                console.log('⚙️ Adding missing "showFreeSize" column...');
                await sequelize.query("ALTER TABLE Products ADD COLUMN showFreeSize BOOLEAN DEFAULT true");
            }
        } catch (e) { console.log('ℹ️ Table check passed.'); }

        const count = await Product.count();
        if (count === 0 && INITIAL_PRODUCTS.length > 0) {
            await Product.bulkCreate(INITIAL_PRODUCTS);
            console.log('✅ Initial Products Seeded!');
        } else {
            console.log('✅ Products Table Ready');
        }
    } catch (error) {
        console.error('❌ Error seeding products:', error);
    }
};

module.exports = { Product, seedProducts };
