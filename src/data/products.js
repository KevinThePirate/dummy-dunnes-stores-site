export const products = [
  {
    id: 1, name: 'Sliced Pan Bread', category: 'Bakery', price: 1.49,
    emoji: '🍞', description: 'Soft white sliced pan, perfect for toast and sandwiches.',
  },
  {
    id: 2, name: 'Fresh Milk (2L)', category: 'Dairy', price: 1.99,
    emoji: '🥛', description: 'Fresh full-fat Irish milk, 2 litre bottle.',
  },
  {
    id: 3, name: 'Free Range Eggs (6)', category: 'Dairy', price: 2.49,
    emoji: '🥚', description: '6 free range eggs from Irish hens.',
  },
  {
    id: 4, name: 'Irish Butter (250g)', category: 'Dairy', price: 2.29,
    emoji: '🧈', description: 'Creamy Irish salted butter, 250g block.',
  },
  {
    id: 5, name: "Barry's Tea (80 bags)", category: 'Drinks', price: 4.49,
    emoji: '🍵', description: 'Classic blend teabags, 80 pack.',
  },
  {
    id: 6, name: 'Nescafé Gold (200g)', category: 'Drinks', price: 5.99,
    emoji: '☕', description: 'Rich, smooth instant coffee, 200g jar.',
  },
  {
    id: 7, name: 'Cheddar Cheese (400g)', category: 'Dairy', price: 3.79,
    emoji: '🧀', description: 'Mature Irish cheddar cheese, 400g block.',
  },
  {
    id: 8, name: 'Pink Lady Apples (4pk)', category: 'Fruit & Veg', price: 2.49,
    emoji: '🍎', description: 'Sweet and crisp Pink Lady apples, pack of 4.',
  },
  {
    id: 9, name: 'Bananas (bunch)', category: 'Fruit & Veg', price: 1.49,
    emoji: '🍌', description: 'Fresh ripe bananas, sold by the bunch.',
  },
  {
    id: 10, name: 'Rooster Potatoes (2kg)', category: 'Fruit & Veg', price: 2.99,
    emoji: '🥔', description: 'Irish Rooster potatoes, great for mashing and roasting.',
  },
  {
    id: 11, name: 'Chicken Fillets (500g)', category: 'Meat & Fish', price: 5.49,
    emoji: '🍗', description: 'Fresh skinless chicken breast fillets, 500g pack.',
  },
  {
    id: 12, name: 'Back Rashers (200g)', category: 'Meat & Fish', price: 3.49,
    emoji: '🥓', description: 'Traditional Irish back rashers, 200g pack.',
  },
  {
    id: 13, name: 'Spaghetti (500g)', category: 'Cupboard', price: 1.29,
    emoji: '🍝', description: 'Classic dried spaghetti pasta, 500g pack.',
  },
  {
    id: 14, name: 'Tomato Soup (400g)', category: 'Cupboard', price: 1.19,
    emoji: '🥣', description: 'Classic creamy tomato soup, 400g tin.',
  },
  {
    id: 15, name: 'Orange Juice (1L)', category: 'Drinks', price: 2.79,
    emoji: '🍊', description: 'Pure squeezed orange juice, not from concentrate.',
  },
  {
    id: 16, name: 'Greek Yogurt (500g)', category: 'Dairy', price: 2.49,
    emoji: '🫙', description: 'Thick and creamy Greek-style natural yogurt, 500g.',
  },
]

export const categories = ['All', ...new Set(products.map(p => p.category))]
