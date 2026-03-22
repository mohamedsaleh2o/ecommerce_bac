const mongoose = require('mongoose');
const Product = require('./src/models/Product.model');
require('dotenv').config();

const hardcodedProducts = [
  // Phones
  {
    id: 1,
    title: "iPhone 17 Pro Max 512GB",
    price: 1399.99,
    description: "The ultimate iPhone with a titanium body, A19 Pro chip, and the most advanced camera system ever.",
    category: "smartphones",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.9, count: 2540 }
  },
  {
    id: 2,
    title: "Samsung Galaxy S25 Ultra",
    price: 1299.99,
    description: "Unleash new possibilities with the Galaxy AI, an integrated S Pen, and a massive 200MP camera.",
    category: "smartphones",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.8, count: 1890 }
  },
  {
    id: 3,
    title: "Google Pixel 9 Pro",
    price: 999.00,
    description: "The most powerful Pixel yet, featuring the Tensor G4 chip and industry-leading computational photography.",
    category: "smartphones",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.7, count: 1200 }
  },
  {
    id: 4,
    title: "OnePlus 12",
    price: 799.99,
    description: "Fast and smooth performance with Hasselblad camera system and 100W fast charging.",
    category: "smartphones",
    image: "https://images.unsplash.com/photo-1573148195900-7845dcb9b127?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.6, count: 950 }
  },
  {
    id: 5,
    title: "Nothing Phone (3)",
    price: 649.00,
    description: "Unique transparent design with Glyph Interface and premium mid-range performance.",
    category: "smartphones",
    image: "https://images.unsplash.com/photo-1662947036664-9118501258fa?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.5, count: 620 }
  },
  
  // Smart Watches
  {
    id: 6,
    title: "Apple Watch Ultra 3",
    price: 799.00,
    description: "Rugged and capable, designed for extreme environments, elevation, and endurance.",
    category: "smartwatches",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.9, count: 1420 }
  },
  {
    id: 7,
    title: "Samsung Galaxy Watch 7 Classic",
    price: 399.99,
    description: "Timeless design with a rotating bezel and advanced health tracking features.",
    category: "smartwatches",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.7, count: 980 }
  },
  {
    id: 8,
    title: "Garmin Fenix 8",
    price: 699.99,
    description: "Premium multisport GPS watch with solar charging capabilities and built-in flashlight.",
    category: "smartwatches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.8, count: 540 }
  },
  {
    id: 9,
    title: "Fitbit Epix Pro (Gen 2)",
    price: 899.00,
    description: "High-performance active smartwatch with a stunning AMOLED display and 24/7 health monitoring.",
    category: "smartwatches",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.6, count: 410 }
  },
  {
    id: 10,
    title: "Google Pixel Watch 3",
    price: 349.00,
    description: "Sleek circular design with the best of Google and Fitbit integrated.",
    category: "smartwatches",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.4, count: 670 }
  },

  // Men's Clothing
  {
    id: 11,
    title: "Classic White Oxford Shirt",
    price: 45.99,
    description: "A versatile wardrobe staple made from 100% breathable cotton.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.5, count: 320 }
  },
  {
    id: 12,
    title: "Slim Fit Navy Chinos",
    price: 55.00,
    description: "Comfortable and stylish chinos perfect for both office and casual wear.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.3, count: 210 }
  },
  {
    id: 13,
    title: "Vintage Denim Jacket",
    price: 89.95,
    description: "Rugged and timeless denim jacket with a classic fit.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0efa?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.7, count: 180 }
  },
  {
    id: 14,
    title: "Merino Wool Crewneck Sweater",
    price: 75.00,
    description: "Soft, lightweight, and warm merino wool sweater for layering.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.6, count: 150 }
  },
  {
    id: 15,
    title: "Athletic Running Shorts",
    price: 35.00,
    description: "Moisture-wicking fabric with a comfortable elastic waistband.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.4, count: 430 }
  },

  // Women's Clothing
  {
    id: 16,
    title: "Floral Summer Wrap Dress",
    price: 65.99,
    description: "Lightweight and flowy wrap dress with a beautiful floral print.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.8, count: 520 }
  },
  {
    id: 17,
    title: "High-Waisted Wide Leg Jeans",
    price: 59.50,
    description: "Trendy wide-leg fit with a flattering high waist and vintage wash.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.5, count: 340 }
  },
  {
    id: 18,
    title: "Oversized Knit Cardigan",
    price: 49.99,
    description: "Cozy and chunky knit cardigan perfect for chilly evenings.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1434389678369-182cb0be3c41?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.6, count: 280 }
  },
  {
    id: 19,
    title: "Silk Camisole Blouse",
    price: 79.00,
    description: "Elegant silk camisole that transitions effortlessly from day to night.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.7, count: 190 }
  },
  {
    id: 20,
    title: "Pleated Midi Skirt",
    price: 54.00,
    description: "Classic pleated midi skirt with a flowy silhouette.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1583496661160-c588c443c982?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.4, count: 250 }
  },

  // Electronics (Laptops/Audio)
  {
    id: 21,
    title: "MacBook Pro 16-inch (M3 Max)",
    price: 2499.00,
    description: "Mind-blowing performance for pro workflows with a stunning Liquid Retina XDR display.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.9, count: 1850 }
  },
  {
    id: 22,
    title: "Sony WH-1000XM5 Wireless Headphones",
    price: 398.00,
    description: "Industry-leading noise cancellation with magnificent sound and comfort.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.8, count: 3200 }
  },
  {
    id: 23,
    title: "Dell XPS 15",
    price: 1799.00,
    description: "A perfect balance of power and portability with an InfinityEdge display.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.6, count: 890 }
  },
  {
    id: 24,
    title: "iPad Pro 13-inch (M4)",
    price: 1299.00,
    description: "Impossibly thin design with the incredibly powerful M4 chip and Ultra Retina XDR display.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.9, count: 2100 }
  },
  {
    id: 25,
    title: "Bose QuietComfort Earbuds II",
    price: 299.00,
    description: "Customized noise cancellation and sound performance tailored to your ears.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.7, count: 1540 }
  },
  
  // Jewelery
  {
    id: 26,
    title: "14k Gold Chain Necklace",
    price: 250.00,
    description: "A delicate and timeless 14k solid gold rope chain, perfect for everyday wear.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1599643478524-fb524fa0a198?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.6, count: 420 }
  },
  {
    id: 27,
    title: "Diamond Stud Earrings (1/2 ct tw)",
    price: 599.00,
    description: "Brilliant round-cut diamonds set in classic 14k white gold prong settings.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.8, count: 310 }
  },
  {
    id: 28,
    title: "Sterling Silver Tennis Bracelet",
    price: 125.00,
    description: "Elegant cubic zirconia tennis bracelet crafted in high-quality sterling silver.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.5, count: 180 }
  },
  {
    id: 29,
    title: "Vintage Opal Ring",
    price: 180.00,
    description: "A stunning lab-created opal set in an intricate vintage-inspired setting.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1605100804763-247f66120ee4?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.7, count: 250 }
  },
  {
    id: 30,
    title: "Rose Gold Pendant Necklace",
    price: 85.00,
    description: "Minimalist circular pendant suspended on a fine rose gold-plated chain.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.4, count: 390 }
  }
];

const startSeed = async () => {
    try {
        let uri = process.env.MONGODB_URI;
        if (!uri || uri === 'mongo') {
            console.error('ERROR: You must define a real MONGODB_URI in your .env file to run this on your production database.');
            process.exit(1);
        }

        await mongoose.connect(uri);
        console.log('Connected to Database. Deleting old/duplicate products...');
        
        // Wipe everything to guarantee a clean slate with zero duplicates
        await Product.deleteMany({});
        console.log('All previous products deleted.');
        
        console.log('Fetching 70 unique products from public API to prevent duplicate images...');
        // We fetch from DummyJSON to get completely distinct real items with unique thumbnail images
        const response = await fetch('https://dummyjson.com/products?limit=70&skip=10');
        const data = await response.json();
        
        const generatedProducts = data.products.map((item, index) => {
            return {
                id: 31 + index, // Ensure IDs continue after our hardcoded 30
                title: item.title,
                price: item.price,
                description: item.description,
                category: item.category,
                image: item.thumbnail, // Unique image from DummyJSON
                rating: {
                    rate: item.rating,
                    count: Math.floor(Math.random() * 800) + 20
                }
            }
        });

        // Combine the 30 hardcoded + 70 dynamically fetched unique items
        const allProducts = [...hardcodedProducts, ...generatedProducts];

        console.log(`Inserting ${allProducts.length} completely unique products...`);
        await Product.insertMany(allProducts);
        
        console.log('✅ Database seeded successfully with NO DUPLICATE IMAGES!');
        process.exit(0);
    } catch(err) {
        console.error('Failed to seed database:', err);
        process.exit(1);
    }
}

startSeed();
