import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { count, setIsOpen } = useCart()
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="header__inner">
        <button
          className="header__logo"
          onClick={() => navigate('/')}
          aria-label="Go to home page"
        >
          <span className="header__logo-text">Dunnes Stores</span>
          <span className="header__logo-sub">Practice Shop</span>
        </button>

        <div className="header__practice-badge">
          🛡️ Safe Practice Mode – No real money is spent
        </div>

        <button
          className="header__cart-btn"
          onClick={() => setIsOpen(true)}
          aria-label={`Open shopping cart, ${count} item${count !== 1 ? 's' : ''}`}
        >
          🛒 My Cart
          {count > 0 && (
            <span className="header__cart-count" aria-hidden="true">{count}</span>
          )}
        </button>
      </div>
    </header>
  )
}
