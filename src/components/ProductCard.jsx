import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="product-card__emoji-wrap" aria-hidden="true">
        {product.emoji}
      </div>

      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.description}</p>

        <div className="product-card__footer">
          <span className="product-card__price">€{product.price.toFixed(2)}</span>
          <button
            className={`product-card__add-btn${added ? ' product-card__add-btn--added' : ''}`}
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? '✓ Added!' : '+ Add'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
