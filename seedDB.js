// seedDB.js — Run with: node seedDB.js
require('dotenv').config();
const connectDB = require('./config/db');
const Product   = require('./models/Product');
const User      = require('./models/User');

// ── Image pools per category ─────────────
const imgs = {
  Electronics: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600',
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600',
    'https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=600',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600',
    'https://images.unsplash.com/photo-1560472355-536de3962603?w=600',
  ],
  Clothing: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
    'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600',
    'https://images.unsplash.com/photo-1556306535-38febf6cdbe4?w=600',
    'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600',
    'https://images.unsplash.com/photo-1594938298603-c8148c4b1c14?w=600',
    'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600',
    'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600',
  ],
  Books: [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600',
    'https://images.unsplash.com/photo-1589998059171-988d887df646?w=600',
    'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600',
    'https://images.unsplash.com/photo-1533327325824-76851d8e5a5?w=600',
  ],
  'Home & Living': [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
    'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
    'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600',
    'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600',
  ],
  Sports: [
    'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600',
    'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
    'https://images.unsplash.com/photo-1576435728678-68d0fbf94946?w=600',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600',
  ],
  Beauty: [
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600',
    'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600',
  ],
  Toys: [
    'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600',
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600',
    'https://images.unsplash.com/photo-1535572290543-960a8046f5af?w=600',
  ],
  Other: [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600',
  ],
};

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rand = (min, max) => Math.round((Math.random() * (max - min) + min) * 100) / 100;
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ── 1000 Product templates by category ──
const templates = {
  Electronics: [
    'Wireless Noise-Cancelling Headphones','Bluetooth Earbuds Pro','Smart Watch Series','4K Ultra HD Monitor','Gaming Mechanical Keyboard','RGB Gaming Mouse','USB-C Hub 7-in-1','Portable Bluetooth Speaker','Webcam 1080p HD','LED Ring Light 18"','Laptop Stand Adjustable','Wireless Charging Pad','Smart Home Speaker','Action Camera 4K','Mirrorless Camera Kit','Drone with GPS','Portable Power Bank 20000mAh','Fast Charger 65W','HDMI Cable 4K 2m','SSD External 1TB','RAM DDR4 16GB Kit','CPU Cooler RGB','PC Case ATX Mid-Tower','Mechanical Numpad','Curved Gaming Monitor 27"','Smart Plug WiFi 4-Pack','Security Camera Outdoor','Smart Doorbell','NAS Storage Drive','VR Headset Standalone','Streaming Microphone','Audio Interface USB','MIDI Keyboard 25-Key','Drawing Tablet','Thermal Printer Mini','Label Maker','Laser Pointer Presenter','Smart Scale WiFi','Robot Vacuum Cleaner','Air Purifier HEPA',
  ],
  Clothing: [
    'Classic Oxford Button-Down Shirt','Slim Fit Chino Trousers','Premium Leather Belt','Wool Blend Overcoat','Running Shorts 7"','Compression Training Leggings','Graphic Print Hoodie','Vintage Denim Jacket','Linen Summer Dress','Pleated A-Line Skirt','Chunky Knit Beanie','Leather Gloves Winter','Athletic Crew Socks 6-Pack','UV Protection Sunglasses','Canvas Tote Bag','Minimalist Leather Watch','Silk Scarf 90x90cm','Rain Jacket Waterproof','Thermal Base Layer Set','Slim Fit Blazer','Cargo Shorts','Fleece Quarter-Zip Pullover','Polo Shirt Piqué','Swim Trunks Quick-Dry','Sports Bra High-Impact','Jogger Sweatpants','Windbreaker Jacket','Ankle Boots Chelsea','White Sneakers Classic','Platform Sandals','Crossbody Leather Bag','Backpack 25L','Laptop Bag 15.6"','Cap Adjustable Snapback','Fingerless Cycling Gloves','Compression Knee Sleeve','Hiking Boots Waterproof','Slip-On Loafers','Dress Shoes Oxford','Formal Tie Silk',
  ],
  Books: [
    'Atomic Habits — James Clear','The Psychology of Money','Deep Work — Cal Newport','Thinking Fast and Slow','The Lean Startup','Zero to One — Peter Thiel','Rich Dad Poor Dad','The 4-Hour Workweek','Sapiens — Yuval Noah Harari','Homo Deus','21 Lessons for the 21st Century','The Art of War','Meditations — Marcus Aurelius','Stoicism and the Art of Happiness','The Power of Now','Cant Hurt Me — David Goggins','Extreme Ownership','Leaders Eat Last','Start with Why — Simon Sinek','The Innovators Dilemma','Clean Code','The Pragmatic Programmer','Design Patterns','You Dont Know JS','JavaScript The Good Parts','Python Crash Course','Automate the Boring Stuff','The Hitchhikers Guide to the Galaxy','1984 — George Orwell','Brave New World','Fahrenheit 451','The Alchemist','To Kill a Mockingbird','Of Mice and Men','The Great Gatsby','Harry Potter and the Sorcerers Stone','Lord of the Rings: Fellowship','Dune — Frank Herbert','Enders Game','The Martian — Andy Weir',
  ],
  'Home & Living': [
    'Non-Stick Cookware Set 10pc','Cast Iron Skillet 12"','Bamboo Cutting Board Set','French Press Coffee Maker','Pour-Over Coffee Set','Electric Kettle 1.7L','Air Fryer 5.5L','Instant Pot 7-in-1','Stand Mixer 5Qt','Blender High-Speed','Food Processor 12-Cup','Toaster Oven Digital','Knife Set 15-Piece','Wine Glasses Set of 6','Ceramic Dinner Set 12pc','Bed Sheets 1000TC Cotton','Duvet Insert All-Season','Memory Foam Pillow','Weighted Blanket 15lb','Blackout Curtains 2-Pack','LED Floor Lamp','Table Lamp Minimalist','Scented Soy Candles Set','Essential Oil Diffuser','Indoor Plant Pot Set','Wall Art Canvas Print','Photo Frame Set','Floating Shelves Set','Storage Ottoman','Bathroom Towels 6-Set','Shower Curtain Liner','Bathroom Organizer','Kitchen Utensil Set','Herb Garden Kit Indoor','Smart Thermostat','Robot Mop','Vacuum Sealer','Compost Bin Kitchen','Fire Pit Portable','Patio String Lights',
  ],
  Sports: [
    'Yoga Mat Premium 6mm','Resistance Bands Set 5','Pull-Up Bar Doorway','Adjustable Dumbbells Set','Kettlebell 16kg','Foam Roller Deep Tissue','Jump Rope Speed','Ab Wheel Roller','Push-Up Handles','Gym Gloves Padded','Lifting Straps','Weight Lifting Belt','Protein Shaker Bottle','Hydration Pack 2L','Cycling Helmet MIPS','Bike Lock U-Type','Cycling Gloves Padded','Running Shoes Trail','GPS Running Watch','Heart Rate Monitor','Swim Goggles Anti-Fog','Swim Cap Silicone','Badminton Set','Table Tennis Set','Basketball Official Size','Soccer Ball Size 5','Tennis Racket Pro','Golf Putter','Hiking Poles Telescopic','Sleeping Bag -10°C','Tent 2-Person Ultralight','Camping Stove Portable','Headlamp LED 400 Lumen','Climbing Harness','Ski Goggles UV400','Snowboard Gloves','Paddle Board Inflatable','Kayak Paddle Fiberglass','Fishing Rod Combo','Archery Target Set',
  ],
  Beauty: [
    'Vitamin C Face Serum','Retinol Night Cream','Hyaluronic Acid Moisturiser','SPF50 Sunscreen Fluid','Rose Water Toner','Niacinamide 10% Serum','Collagen Eye Cream','AHA/BHA Exfoliant','Micellar Cleansing Water','Gentle Foaming Cleanser','Clay Purifying Mask','Sheet Mask Bundle 10pc','Lip Plumping Gloss','Long-Wear Foundation','Contour Palette Pro','Eyeshadow Palette 18 Shades','Mascara Volumising','Gel Eyeliner','Setting Spray 24hr','Makeup Brushes Set 15pc','Jade Roller & Gua Sha','Electric Face Massager','Hair Mask Keratin','Argan Oil Hair Treatment','Scalp Serum','Wide-Tooth Comb','Boar Bristle Brush','Hair Diffuser Attachment','Nail Polish Set 12 Colors','Cuticle Oil Pen','Beard Balm Natural','Shaving Cream Sensitive','Cologne Eau de Parfum','Body Scrub Sugar','Body Lotion Shea Butter','Perfume Roll-On Set','Bath Salts Himalayan','Lip Balm SPF Set','Bronzer & Highlighter Duo','Brow Gel Clear',
  ],
  Toys: [
    'LEGO Architecture Set','RC Car Off-Road 4WD','Drone Mini Kids','Building Blocks 500pc','Magnetic Tiles 60pc','Play-Doh Mega Set','Watercolor Paint Kit','Slime Making Kit','Science Experiment Kit','Telescope Kids 70mm','Microscope Starter','Puzzle 1000 Piece','Chess Set Wooden','Monopoly Classic','Uno Card Game','Jenga Giant Outdoor','Nerf Blaster Elite','Water Gun Super Soaker','Frisbee Ultimate','Yo-Yo Professional','Rubiks Cube 3x3','Speed Cube Set','Board Game Catan','Dungeons & Dragons Starter','Tabletop RPG Dice Set','Stuffed Animal Bear 50cm','Action Figure Deluxe','Doll House Wooden','Kitchen Play Set','Doctor Kit Play','Tool Belt Kids','Dinosaur Figure Set 12pc','Solar System Mobile','Constellation Map','Coding Robot Kids','Drawing Robot','3D Pen Filament Set','Origami Paper Kit','Finger Puppet Set','Sticker Book Mega',
  ],
  Other: [
    'Reusable Water Bottle 1L','Stainless Steel Straw Set','Beeswax Wraps 3-Pack','Bamboo Toothbrush 4-Pack','Organic Cotton Tote','Solar Charger Panel','Seed Starter Kit','Bird Feeder Hanging','Wind Chimes Bamboo','Dream Catcher Handmade','Scrapbook Kit Deluxe','Journaling Starter Kit','Calligraphy Pen Set','Washi Tape Bundle','Postcard Set 50pc','Vinyl Record Storage','Cable Management Kit','Desk Organiser Set','Monitor Riser Bamboo','Laptop Sleeve 14"','Mouse Pad XXL','Phone Stand Adjustable','Wallet Card Holder Slim','Travel Adapter Universal','Luggage Tags Set','Packing Cubes 6-Set','Travel Pillow Memory Foam','Noise-Isolating Earplugs','Sleep Mask Silk','Meditation Cushion',
  ],
};

// ── Descriptions pool ────────────────────
const descs = {
  Electronics: 'Premium build quality with cutting-edge technology. Designed for performance and durability. Perfect for professionals and enthusiasts who demand the best.',
  Clothing: 'Crafted from high-quality materials for all-day comfort and style. Versatile design transitions seamlessly from casual to smart. Built to last season after season.',
  Books: 'A must-read for anyone looking to grow, learn, and level up. Packed with practical insights, research-backed strategies, and real-world examples that deliver real results.',
  'Home & Living': 'Elevate your living space with this thoughtfully designed piece. Combining functionality with aesthetics, it brings both beauty and practicality to your home.',
  Sports: 'Engineered for performance at every level. Whether you\'re a beginner or a pro, this gear is built to help you push your limits and reach your goals.',
  Beauty: 'Formulated with premium, skin-friendly ingredients. Dermatologist-tested and proven effective. Give your skin the care it deserves with this professional-grade formula.',
  Toys: 'Designed to spark imagination and creativity while being safe and durable. Hours of fun guaranteed. Suitable for the recommended age range with educational benefits.',
  Other: 'A versatile and practical product designed to make everyday life easier and more enjoyable. Great quality, great value.',
};

// ── Generate 1000 products ───────────────
function generateProducts() {
  const products = [];
  const categories = Object.keys(templates);
  let id = 0;

  // First, add exactly 125 from each of 8 categories = 1000
  categories.forEach(cat => {
    const names = templates[cat];
    const imgPool = imgs[cat];
    for (let i = 0; i < 125; i++) {
      const baseName = names[i % names.length];
      const variant  = i < names.length ? '' : ` ${['Pro','Plus','Elite','Max','Ultra','Mini','Lite','Premium','Essential','Standard'][Math.floor(i/names.length) % 10]} v${Math.floor(i/names.length)+1}`;
      const price    = rand(4.99, 599.99);
      const hasDisc  = Math.random() > 0.45;
      const origPrice= hasDisc ? Math.round(price * rand(1.15, 1.6) * 100) / 100 : null;
      const rating   = rand(3.5, 5.0);
      products.push({
        name:          baseName + variant,
        price,
        originalPrice: origPrice,
        category:      cat,
        description:   descs[cat],
        image:         pick(imgPool),
        stock:         randInt(0, 250),
        rating:        Math.round(rating * 10) / 10,
        numReviews:    randInt(0, 5000),
        featured:      id < 16,  // first 16 are featured
        tags:          [cat.toLowerCase()],
      });
      id++;
    }
  });

  return products;
}

// ── Seed ─────────────────────────────────
const seedDB = async () => {
  try {
    await connectDB();

    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🗑  Cleared existing data');

    const products = generateProducts();
    await Product.insertMany(products);
    console.log(`✅ Inserted ${products.length} products`);

    await User.create({ name:'Admin User', email:'admin@shopverse.com', password:'admin123', role:'admin' });
    await User.create({ name:'Test User',  email:'user@shopverse.com',  password:'user123',  role:'user'  });

    console.log('\n✅ Admin:  admin@shopverse.com / admin123');
    console.log('✅ User:   user@shopverse.com  / user123');
    console.log(`\n🎉 Done! ${products.length} products seeded.`);
    console.log('   Run: npm run dev → http://localhost:3000\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
};

seedDB();
