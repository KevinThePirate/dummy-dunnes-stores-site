import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

function CartItem({ item }) {
  const { updateQty, removeItem } = useCart()
  return (
    <div className="cart-item">
      <span className="cart-item__emoji" aria-hidden="true">{item.emoji}</span>

      <div className="cart-item__info">
        <div className="cart-item__name">{item.name}</div>
        <div className="cart-item__price">€{(item.price * item.qty).toFixed(2)}</div>
      </div>

      <div className="cart-item__controls">
        <button
          className="cart-item__qty-btn"
          onClick={() => updateQty(item.id, item.qty - 1)}
          aria-label={`Remove one ${item.name}`}
        >
          −
        </button>
        <span className="cart-item__qty" aria-label={`${item.qty} in cart`}>{item.qty}</span>
        <button
          className="cart-item__qty-btn"
          onClick={() => updateQty(item.id, item.qty + 1)}
          aria-label={`Add one more ${item.name}`}
        >
          +
        </button>
      </div>

      <button
        className="cart-item__remove"
        onClick={() => removeItem(item.id)}
        aria-label={`Remove ${item.name} from cart`}
      >
        ✕
      </button>
    </div>
  )
}

export default function CartDrawer() {
  const { items, total, isOpen, setIsOpen } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    setIsOpen(false)
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <motion.div
            className="cart-drawer"
            role="dialog"
            aria-label="Shopping cart"
            aria-modal="true"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28 }}
          >
            <div className="cart-drawer__header">
              <h2>🛒 My Shopping Cart</h2>
              <button
                className="cart-drawer__close"
                onClick={() => setIsOpen(false)}
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            {items.length === 0 ? (
              <div className="cart-drawer__empty">
                <div className="cart-drawer__empty-icon">🛒</div>
                <p>Your cart is empty.</p>
                <p>Add some items from the shop!</p>
                <button className="btn btn--primary" onClick={() => setIsOpen(false)}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-drawer__items">
                  {items.map(item => <CartItem key={item.id} item={item} />)}
                </div>

                <div className="cart-drawer__footer">
                  <div className="cart-drawer__total">
                    <span>Total:</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                  <button
                    className="btn btn--primary btn--full btn--lg"
                    onClick={handleCheckout}
                  >
                    Go to Checkout →
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
