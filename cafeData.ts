/**
 * Concept demo data for Hers Cafe - Karachi
 * Features the complete 22-item visual menu across all 5 requested categories.
 * Every item includes a dedicated, authentic high-fidelity photograph and sample PKR pricing.
 * Clearly marked as unconfirmed sample placeholders for presentation purposes.
 */

// Import dedicated food and beverage photography
import heroDessertImg from '../assets/images/hers_cafe_enhanced_dessert_1791985341070.jpg';

// Waffles
import belgianWaffleImg from '../assets/images/menu_belgian_waffles_1791902067191.jpg';
import chocolateOverloadWaffleImg from '../assets/images/chocolate_overload_waffle_1791909820650.jpg';
import strawberryWaffleImg from '../assets/images/bright_waffles_cream_1791903453208.jpg';
import lotusWaffleImg from '../assets/images/lotus_biscoff_waffles_1791909690186.jpg';

// Pancakes
import classicPancakeImg from '../assets/images/menu_fluffy_pancakes_1791904775249.jpg';
import chocolatePancakeImg from '../assets/images/chocolate_pancakes_stack_1791909692671.jpg';
import strawberryPancakeImg from '../assets/images/strawberry_pancakes_fresh_1791909841250.jpg';
import lotusPancakeImg from '../assets/images/lotus_biscoff_pancakes_1791909861478.jpg';

// Brownies & Cakes
import fudgeBrownieImg from '../assets/images/menu_fudge_brownie_1791904776071.jpg';
import brownieWithIcecreamImg from '../assets/images/brownie_with_icecream_1791909885401.jpg';
import lavaCakeImg from '../assets/images/chocolate_lava_cake_molten_1791909691649.jpg';
import cheesecakeImg from '../assets/images/menu_basque_cheesecake_1791904777123.jpg';

// Ice Cream & Sundaes
import vanillaScoopImg from '../assets/images/menu_artisan_icecream_1791904776664.jpg';
import chocolateScoopImg from '../assets/images/rich_chocolate_icecream_1791909980290.jpg';
import brownieSundaeImg from '../assets/images/brownie_sundae_cup_1791910017316.jpg';
import fudgeSundaeImg from '../assets/images/chocolate_fudge_sundae_1791909914779.jpg';

// Coffee & Drinks
import cappuccinoImg from '../assets/images/menu_signature_coffee_1791902067773.jpg';
import cafeLatteImg from '../assets/images/cafe_latte_cup_1791909945465.jpg';
import icedLatteImg from '../assets/images/menu_iced_coffee_layers_1791904777172.jpg';
import chocolateMilkshakeImg from '../assets/images/menu_lotus_milkshake_1791904899932.jpg';
import strawberryMilkshakeImg from '../assets/images/strawberry_milkshake_glass_1791909691217.jpg';
import lemonadeImg from '../assets/images/menu_refreshing_drinks_1791902068784.jpg';

// Cafe Interiors & Ambience
import brightInteriorImg from '../assets/images/bright_cafe_interior_1791903451805.jpg';
import moodyLoungeImg from '../assets/images/gallery_cafe_interior_1791902070017.jpg';

export interface MenuItem {
  id: string;
  name: string;
  category: 'waffles' | 'pancakes' | 'brownies_cakes' | 'ice_cream' | 'coffee_drinks';
  categoryLabel: string;
  subtitle: string;
  description: string;
  price: number;
  priceFormatted: string;
  tag?: string;
  image: string;
  flavorNotes: string[];
  isBestseller?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  comment: string;
  rating: number;
  favoriteItem: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const CAFE_DETAILS = {
  name: 'Hers Cafe',
  city: 'Karachi, Pakistan',
  headline: 'A Little Sweetness, A Lot of Happiness',
  subtitle: 'Discover your favourite desserts, waffles, and refreshing drinks at Hers Cafe.',
  addressDisplay: 'Shop 2/1, Plot 79/1-1-3, Bano Plaza, Main Lasbela Road, Garden East, Soldier Bazaar, Karachi',
  addressNote: 'Main Lasbela Road, Garden East, Karachi',
  phoneDisplay: '+92 309 2262881',
  phoneRaw: '03092262881',
  whatsappRaw: '923092262881',
  hoursDisplay: 'Mon – Sun: 12:00 PM – 1:00 AM',
  hoursNote: 'Dine-in, Takeaway & Foodpanda Delivery',
  mapUrl: 'https://maps.google.com/?q=Bano+Plaza+Main+Lasbela+Road+Garden+East+Karachi',
  foodpandaUrl: 'https://www.foodpanda.pk/',
  instagram: '@herscafe.official',
  heroImage: heroDessertImg,
  disclaimer:
    'Unofficial presentation demo for Hers Cafe. Menu items and prices are concept placeholders.',
};

export const MENU_CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'waffles', label: 'Waffles' },
  { id: 'pancakes', label: 'Pancakes' },
  { id: 'brownies_cakes', label: 'Brownies & Cakes' },
  { id: 'ice_cream', label: 'Ice Cream & Sundaes' },
  { id: 'coffee_drinks', label: 'Coffee & Drinks' },
];

export const ALL_MENU_ITEMS: MenuItem[] = [
  // ==========================================
  // WAFFLES (4 items)
  // ==========================================
  {
    id: 'w1',
    name: 'Classic Belgian Waffle',
    category: 'waffles',
    categoryLabel: 'Waffles',
    subtitle: 'Golden caramelized crunch with pure maple drizzle',
    description:
      'Crisp-on-the-outside, melt-in-the-mouth Belgian waffle crafted fresh to order, lightly dusted with confectioners sugar and served with churned artisan butter and warm maple syrup.',
    price: 650,
    priceFormatted: 'Rs. 650',
    tag: 'Classic',
    image: belgianWaffleImg,
    flavorNotes: ['Caramelized Crisp', 'Pure Maple', 'Powdered Sugar'],
    isBestseller: true,
  },
  {
    id: 'w2',
    name: 'Chocolate Overload Waffle',
    category: 'waffles',
    categoryLabel: 'Waffles',
    subtitle: 'Smothered in Belgian milk & dark chocolate ganache',
    description:
      'Freshly pressed warm Belgian waffle loaded with luxurious melted Belgian chocolate, crisp chocolate pearls, delicate chocolate shavings, and hot fudge.',
    price: 850,
    priceFormatted: 'Rs. 850',
    tag: 'Decadent',
    image: chocolateOverloadWaffleImg,
    flavorNotes: ['Belgian Cocoa', 'Chocolate Crisps', 'Warm Ganache'],
    isBestseller: true,
  },
  {
    id: 'w3',
    name: 'Strawberry & Cream Waffle',
    category: 'waffles',
    categoryLabel: 'Waffles',
    subtitle: 'Fresh garden strawberries & house whipped chantilly',
    description:
      'Light golden waffle crowned with freshly sliced ripe strawberries, pillowy clouds of vanilla chantilly cream, and sweet strawberry coulis reduction.',
    price: 800,
    priceFormatted: 'Rs. 800',
    tag: 'Fruity & Light',
    image: strawberryWaffleImg,
    flavorNotes: ['Sweet Strawberries', 'Chantilly Cream', 'Berry Glaze'],
    isBestseller: false,
  },
  {
    id: 'w4',
    name: 'Lotus Biscoff Waffle',
    category: 'waffles',
    categoryLabel: 'Waffles',
    subtitle: 'Melted speculoos cookie butter & crunchy crumbs',
    description:
      'Signature waffle generously drenched in melted Lotus Biscoff cookie spread, crushed speculoos biscuits, and a delicate ribbon of salted caramel.',
    price: 950,
    priceFormatted: 'Rs. 950',
    tag: 'Bestseller',
    image: lotusWaffleImg,
    flavorNotes: ['Lotus Biscoff', 'Crunchy Biscuit', 'Salted Caramel'],
    isBestseller: true,
  },

  // ==========================================
  // PANCAKES (4 items)
  // ==========================================
  {
    id: 'p1',
    name: 'Classic Pancake Stack',
    category: 'pancakes',
    categoryLabel: 'Pancakes',
    subtitle: 'Fluffy buttermilk stack with churned butter & syrup',
    description:
      'A golden triple-stack of airy buttermilk pancakes prepared to order, served steaming hot with churned butter and grade-A maple syrup.',
    price: 650,
    priceFormatted: 'Rs. 650',
    tag: 'Morning Ritual',
    image: classicPancakeImg,
    flavorNotes: ['Airy & Fluffy', 'Organic Butter', 'Grade-A Maple'],
    isBestseller: false,
  },
  {
    id: 'p2',
    name: 'Chocolate Pancakes',
    category: 'pancakes',
    categoryLabel: 'Pancakes',
    subtitle: 'Dutch cocoa layers with molten chocolate ganache',
    description:
      'Decadent cocoa-infused pancake stack layered with molten chocolate ganache, semi-sweet chocolate morsels, and light whipped cream.',
    price: 750,
    priceFormatted: 'Rs. 750',
    tag: 'Rich & Chocolaty',
    image: chocolatePancakeImg,
    flavorNotes: ['Dark Cocoa', 'Melted Ganache', 'Whipped Cream'],
    isBestseller: false,
  },
  {
    id: 'p3',
    name: 'Strawberry Pancakes',
    category: 'pancakes',
    categoryLabel: 'Pancakes',
    subtitle: 'Fresh strawberries, strawberry glaze & whipped cream',
    description:
      'Tall stack of fluffy buttermilk pancakes adorned with fresh cut strawberries, glossy strawberry reduction drizzle, and vanilla whipped cream.',
    price: 800,
    priceFormatted: 'Rs. 800',
    tag: 'Fresh & Sweet',
    image: strawberryPancakeImg,
    flavorNotes: ['Fresh Strawberries', 'Berry Glaze', 'Velvet Cream'],
    isBestseller: true,
  },
  {
    id: 'p4',
    name: 'Lotus Biscoff Pancakes',
    category: 'pancakes',
    categoryLabel: 'Pancakes',
    subtitle: 'Warm speculoos drizzle & Biscoff biscuit crumb',
    description:
      'Our most indulgent pancake stack smothered with warm melted Biscoff cookie spread, crushed speculoos biscuits, and caramel sweetness.',
    price: 900,
    priceFormatted: 'Rs. 900',
    tag: 'Top Pick',
    image: lotusPancakeImg,
    flavorNotes: ['Speculoos Spread', 'Cookie Crunch', 'Warm Amber Drip'],
    isBestseller: true,
  },

  // ==========================================
  // BROWNIES & CAKES (4 items)
  // ==========================================
  {
    id: 'b1',
    name: 'Chocolate Fudge Brownie',
    category: 'brownies_cakes',
    categoryLabel: 'Brownies & Cakes',
    subtitle: 'Dense fudgy dark chocolate with crackly top crust',
    description:
      'Warm square of intensely rich fudge brownie baked with premium dark cocoa, featuring a shiny crackly crust and an ultra-fudgy center.',
    price: 450,
    priceFormatted: 'Rs. 450',
    tag: 'All-Time Favorite',
    image: fudgeBrownieImg,
    flavorNotes: ['Dark Cocoa', 'Fudge Center', 'Crackly Crust'],
    isBestseller: true,
  },
  {
    id: 'b2',
    name: 'Brownie with Ice Cream',
    category: 'brownies_cakes',
    categoryLabel: 'Brownies & Cakes',
    subtitle: 'Hot fudge brownie crowned with Madagascar vanilla gelato',
    description:
      'Warm freshly heated chocolate fudge brownie paired with a generous scoop of artisanal vanilla bean ice cream and hot chocolate sauce pour.',
    price: 650,
    priceFormatted: 'Rs. 650',
    tag: 'Heavenly Combo',
    image: brownieWithIcecreamImg,
    flavorNotes: ['Hot & Cold Harmony', 'Vanilla Bean', 'Hot Fudge'],
    isBestseller: true,
  },
  {
    id: 'b3',
    name: 'Chocolate Lava Cake',
    category: 'brownies_cakes',
    categoryLabel: 'Brownies & Cakes',
    subtitle: 'Warm molten chocolate center that flows upon first spoon',
    description:
      'Individual baked chocolate gateau with a luscious molten ganache core that flows effortlessly, dusted with cocoa and edible gold accents.',
    price: 600,
    priceFormatted: 'Rs. 600',
    tag: 'Signature Dessert',
    image: lavaCakeImg,
    flavorNotes: ['Molten Ganache', '70% Dark Chocolate', 'Warm Melt'],
    isBestseller: true,
  },
  {
    id: 'b4',
    name: 'Cheesecake Slice',
    category: 'brownies_cakes',
    categoryLabel: 'Brownies & Cakes',
    subtitle: 'Velvety caramelized Basque cheesecake with creamy center',
    description:
      'Slow-baked caramelized cheesecake slice featuring a deeply toasted amber top and an ultra-creamy, silky cream cheese center.',
    price: 650,
    priceFormatted: 'Rs. 650',
    tag: 'Artisanal',
    image: cheesecakeImg,
    flavorNotes: ['Toasted Caramel Top', 'Silky Cream Cheese', 'Subtle Vanilla'],
    isBestseller: false,
  },

  // ==========================================
  // ICE CREAM & SUNDAES (4 items)
  // ==========================================
  {
    id: 'i1',
    name: 'Vanilla Scoop',
    category: 'ice_cream',
    categoryLabel: 'Ice Cream & Sundaes',
    subtitle: 'Slow-churned Madagascar bourbon vanilla bean',
    description:
      'A generous artisanal scoop of silky churned ice cream infused with real Madagascar vanilla bean specks, pure cream, and natural milk sweetness.',
    price: 250,
    priceFormatted: 'Rs. 250',
    tag: 'Pure & Creamy',
    image: vanillaScoopImg,
    flavorNotes: ['Madagascar Vanilla', 'Velvet Cream', 'Real Specks'],
    isBestseller: false,
  },
  {
    id: 'i2',
    name: 'Chocolate Scoop',
    category: 'ice_cream',
    categoryLabel: 'Ice Cream & Sundaes',
    subtitle: 'Double Dutch chocolate with cocoa curls garnish',
    description:
      'Ultra-rich, velvety dark Belgian chocolate ice cream scoop garnished with delicate chocolate curls and cocoa dust.',
    price: 280,
    priceFormatted: 'Rs. 280',
    tag: 'Intense Cocoa',
    image: chocolateScoopImg,
    flavorNotes: ['Belgian Dark Cocoa', 'Chocolate Shavings', 'Rich Texture'],
    isBestseller: false,
  },
  {
    id: 'i3',
    name: 'Brownie Sundae',
    category: 'ice_cream',
    categoryLabel: 'Ice Cream & Sundaes',
    subtitle: 'Fudge brownie bites, vanilla ice cream & hot chocolate drizzle',
    description:
      'Layered dessert bowl packed with bite-sized warm fudge brownies, vanilla bean ice cream, hot chocolate ganache, toasted walnuts, and whipped cream.',
    price: 600,
    priceFormatted: 'Rs. 600',
    tag: 'Crowd Favorite',
    image: brownieSundaeImg,
    flavorNotes: ['Brownie Chunks', 'Warm Hot Fudge', 'Toasted Walnuts'],
    isBestseller: true,
  },
  {
    id: 'i4',
    name: 'Chocolate Fudge Sundae',
    category: 'ice_cream',
    categoryLabel: 'Ice Cream & Sundaes',
    subtitle: 'Classic tall sundae with layers of chocolate, fudge & almonds',
    description:
      'Served in a vintage tall crystal sundae glass with alternating layers of chocolate & vanilla gelato, dripping hot fudge, toasted sliced almonds, whipped cream, and a maraschino cherry.',
    price: 650,
    priceFormatted: 'Rs. 650',
    tag: 'Signature Sundae',
    image: fudgeSundaeImg,
    flavorNotes: ['Layered Gelato', 'Toasted Almonds', 'Sundae Cherry'],
    isBestseller: true,
  },

  // ==========================================
  // COFFEE & DRINKS (6 items)
  // ==========================================
  {
    id: 'd1',
    name: 'Cappuccino',
    category: 'coffee_drinks',
    categoryLabel: 'Coffee & Drinks',
    subtitle: 'Double espresso shot with thick velvety microfoam',
    description:
      'Freshly pulled double shot of specialty espresso balanced with equal parts steamed milk and dense silky foam, finished with a dust of cocoa.',
    price: 450,
    priceFormatted: 'Rs. 450',
    tag: 'Specialty Brew',
    image: cappuccinoImg,
    flavorNotes: ['Double Espresso', 'Velvety Microfoam', 'Cocoa Dust'],
    isBestseller: true,
  },
  {
    id: 'd2',
    name: 'Café Latte',
    category: 'coffee_drinks',
    categoryLabel: 'Coffee & Drinks',
    subtitle: 'Rich espresso poured into silky steamed milk with latte art',
    description:
      'Gentle and comforting blend of smooth espresso with steamed whole milk and delicate pour art, served hot in a warm cup.',
    price: 450,
    priceFormatted: 'Rs. 450',
    tag: 'Warm & Silky',
    image: cafeLatteImg,
    flavorNotes: ['Smooth Roast', 'Steamed Milk', 'Latte Art'],
    isBestseller: false,
  },
  {
    id: 'd3',
    name: 'Iced Latte',
    category: 'coffee_drinks',
    categoryLabel: 'Coffee & Drinks',
    subtitle: 'Chilled espresso poured over fresh milk and clear crystal ice',
    description:
      'Cool layered coffee sensation of robust espresso floating over cold milk and clear ice cubes. Perfect for sunny afternoons.',
    price: 500,
    priceFormatted: 'Rs. 500',
    tag: 'Chilled Favorite',
    image: icedLatteImg,
    flavorNotes: ['Layered Espresso', 'Cold Whole Milk', 'Crisp Chill'],
    isBestseller: true,
  },
  {
    id: 'd4',
    name: 'Chocolate Milkshake',
    category: 'coffee_drinks',
    categoryLabel: 'Coffee & Drinks',
    subtitle: 'Thick creamy milkshake with melted chocolate & whipped cream',
    description:
      'Luxuriously thick hand-spun milkshake blended with whole dairy ice cream and rich Belgian chocolate sauce, topped with whipped cream swirls.',
    price: 550,
    priceFormatted: 'Rs. 550',
    tag: 'Rich & Creamy',
    image: chocolateMilkshakeImg,
    flavorNotes: ['Hand-spun Ice Cream', 'Chocolate Ganache', 'Whipped Cream'],
    isBestseller: false,
  },
  {
    id: 'd5',
    name: 'Strawberry Milkshake',
    category: 'coffee_drinks',
    categoryLabel: 'Coffee & Drinks',
    subtitle: 'Fresh strawberries blended with creamy dairy ice cream',
    description:
      'Sweet and refreshing milkshake crafted with real ripe strawberries, churned cream, topped with pink swirls and a strawberry garnish.',
    price: 550,
    priceFormatted: 'Rs. 550',
    tag: 'Fresh Blend',
    image: strawberryMilkshakeImg,
    flavorNotes: ['Real Strawberries', 'Creamy Milk', 'Berry Swirls'],
    isBestseller: true,
  },
  {
    id: 'd6',
    name: 'Classic Lemonade',
    category: 'coffee_drinks',
    categoryLabel: 'Coffee & Drinks',
    subtitle: 'Hand-squeezed lemons with sparkling soda & fresh mint',
    description:
      'Invigorating blend of freshly squeezed Karachi lemons, crushed garden mint, light cane sugar syrup, and crisp sparkling soda over ice.',
    price: 350,
    priceFormatted: 'Rs. 350',
    tag: 'Crisp & Refreshing',
    image: lemonadeImg,
    flavorNotes: ['Zesty Citrus', 'Fresh Garden Mint', 'Sparkling Fizz'],
    isBestseller: false,
  },
];

export const CAFE_GALLERY_IMAGES = [
  {
    id: 'g1',
    title: 'Signature Belgian Waffle & Artisan Gelato',
    category: 'Desserts',
    src: heroDessertImg,
    caption: 'Crisp golden Belgian waffle crowned with fresh strawberries, melting vanilla bean gelato, and warm Belgian chocolate ganache.',
  },
  {
    id: 'g2',
    title: 'Warm Belgian Liege & Berries',
    category: 'Waffles',
    src: belgianWaffleImg,
    caption: 'Scratch-baked Belgian waffle topped with fresh wild berries and dusted sugar.',
  },
  {
    id: 'g3',
    title: 'Specialty Espresso Calibration',
    category: 'Coffee',
    src: cappuccinoImg,
    caption: 'Freshly roasted beans calibrated daily for rich crema and velvety mouthfeel.',
  },
  {
    id: 'g4',
    title: 'Warm Sanctuary & Sunlit Seating',
    category: 'Ambience',
    src: brightInteriorImg,
    caption: 'Cozy ivory and warm oak interiors designed for slow conversation and dessert lovers.',
  },
  {
    id: 'g5',
    title: 'Lotus Biscoff Dream',
    category: 'Waffles',
    src: lotusWaffleImg,
    caption: 'Crisp waffle loaded with warm Biscoff spread and biscuit crumb.',
  },
  {
    id: 'g6',
    title: 'Decadent Sundaes & Floats',
    category: 'Desserts',
    src: fudgeSundaeImg,
    caption: 'Layered crystal sundae with artisan ice cream, hot fudge, and toasted almonds.',
  },
];

export const DEMO_REVIEWS: ReviewItem[] = [
  {
    id: 'r1',
    author: 'Ayesha K.',
    role: 'Karachi Foodie · DHA Phase 6',
    comment:
      'Hers Cafe has that rare cozy warmth that makes you instantly exhale. The Lotus Biscoff Waffle and Cappuccino are an unmatched pairing on a quiet Sunday afternoon.',
    rating: 5,
    favoriteItem: 'Lotus Biscoff Waffle',
  },
  {
    id: 'r2',
    author: 'Hamza S.',
    role: 'Dessert Enthusiast',
    comment:
      'The Chocolate Lava Cake was phenomenal — warm, deeply chocolaty, and decadent without being overly sweet. Easily one of the most delightful dessert spots in Karachi.',
    rating: 5,
    favoriteItem: 'Chocolate Lava Cake',
  },
  {
    id: 'r3',
    author: 'Mahnoor T.',
    role: 'Weekend Coffee Regular',
    comment:
      'The Strawberry & Cream Waffle was so fresh and crisp. The aesthetic of the cafe with warm cream tones and gentle lighting makes it our favorite hangout spot.',
    rating: 5,
    favoriteItem: 'Strawberry & Cream Waffle',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How do I place an order for takeaway or dine-in?',
    answer:
      'You can easily add your favorite desserts, waffles, and drinks to your order tray right here on the website, click “Order on WhatsApp”, and your pre-formatted order details will open directly in WhatsApp for quick confirmation with our team.',
  },
  {
    question: 'Are these sample prices and menu items official?',
    answer:
      'This website is an interactive concept presentation demo. All listed PKR prices, menu items, and opening hours are sample representations for preview purposes until confirmed by Hers Cafe management.',
  },
  {
    question: 'Do you offer custom birthday or celebration desserts?',
    answer:
      'Yes, Hers Cafe prepares special dessert platters and custom waffle cakes upon advance request. Simply connect with us on WhatsApp to discuss your celebration.',
  },
  {
    question: 'Where is Hers Cafe located in Karachi?',
    answer:
      'Hers Cafe is located at Shop 2/1, Plot 79/1-1-3, Bano Plaza, Main Lasbela Road, Garden East, Soldier Bazaar, Karachi. You can visit us for dine-in and takeaway, or order online via Foodpanda!',
  },
  {
    question: 'Are waffles made fresh to order?',
    answer:
      'Every single waffle and pancake stack is pressed and flipped fresh on our custom iron griddles only after you place your order, ensuring maximum crispness and warmth.',
  },
];
