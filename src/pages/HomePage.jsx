import { useState } from 'react'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <div className="home">
      {/* Hero Banner */}
      <div className="home__banner">
        <h1>Welcome to the Practice Shop</h1>
        <p>
          This is a safe space to learn online shopping. Browse products, add them to your
          cart, and go through the checkout — nothing is real and no money is ever charged.
        </p>
        <div className="home__safe-notice">
          <span className="home__safe-notice-icon">✅</span>
          <p className="home__safe-notice-text">
            You cannot spend any real money here. This is completely safe to practise with.
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="home__main">
        <div className="home__filters">
          <h2>Our Products</h2>
          <div className="home__filters-row">
            {categories.map(cat => (
              <button
                key={cat}
                className={`home__filter-btn${activeCategory === cat ? ' home__filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="home__grid">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
