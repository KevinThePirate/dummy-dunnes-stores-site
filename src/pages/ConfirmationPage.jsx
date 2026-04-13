import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ConfirmationPage() {
  const { lastOrder, setLastOrder } = useCart()
  const navigate = useNavigate()

  if (!lastOrder) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <p style={{ fontSize: '22px', marginBottom: '24px' }}>No order found.</p>
        <button className="btn btn--primary" onClick={() => navigate('/')}>
          Go to Shop
        </button>
      </div>
    )
  }

  const firstName = lastOrder.name.split(' ')[0]

  const handleShopAgain = () => {
    setLastOrder(null)
    navigate('/')
  }

  return (
    <div className="confirmation">
      <div className="confirmation__icon" aria-hidden="true">🎉</div>

      <div className="confirmation__card">
        <h1 className="confirmation__title">Practice Order Complete!</h1>
        <p className="confirmation__subtitle">
          Well done, {firstName}! You've successfully completed a practice order.
          You did brilliantly!
        </p>

        <div className="confirmation__order-number">
          <p>Your Practice Order Number</p>
          <p>{lastOrder.number}</p>
        </div>

        <div className="confirmation__message">
          ✅ In a real shop, a confirmation email would be sent to{' '}
          <strong>{lastOrder.email}</strong>. Remember — this was just practice,
          so nothing has been charged.
        </div>

        <div className="confirmation__items">
          <h3>Items in Your Practice Order</h3>
          {lastOrder.items.map(item => (
            <div key={item.id} className="confirmation__item">
              <span className="name">
                <span aria-hidden="true">{item.emoji}</span>
                <span>{item.name} × {item.qty}</span>
              </span>
              <span className="price">€{(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="confirmation__total">
            <span>Total</span>
            <span>€{lastOrder.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="confirmation__actions">
          <button className="btn btn--primary btn--full" onClick={handleShopAgain}>
            🛒 Practise Shopping Again
          </button>
        </div>
      </div>
    </div>
  )
}
