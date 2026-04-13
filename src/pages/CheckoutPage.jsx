import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Field({ name, label, placeholder, type = 'text', value, onChange, error }) {
  return (
    <div className="checkout__field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={error ? 'error' : ''}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        autoComplete={type === 'email' ? 'email' : 'on'}
      />
      {error && (
        <p id={`${name}-error`} className="checkout__field-error">
          ⚠️ {error}
        </p>
      )}
    </div>
  )
}

export default function CheckoutPage() {
  const { items, total, clearCart, setLastOrder } = useCart()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    address1: '', city: '', county: '', eircode: '',
  })
  const [errors, setErrors] = useState({})

  // Empty cart guard
  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <p style={{ fontSize: '22px', marginBottom: '24px' }}>Your cart is empty!</p>
        <button className="btn btn--primary" onClick={() => navigate('/')}>
          Go Shopping
        </button>
      </div>
    )
  }

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Please enter your first name'
    if (!form.lastName.trim())  e.lastName  = 'Please enter your last name'
    if (!form.email.trim())     e.email     = 'Please enter your email address'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                e.email     = 'Please enter a valid email address'
    if (!form.address1.trim())  e.address1  = 'Please enter your address'
    if (!form.city.trim())      e.city      = 'Please enter your town or city'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }

    setSubmitting(true)
    const orderNumber = 'DS' + Math.floor(Math.random() * 900000 + 100000)

    // Optional EmailJS — only runs if env vars are configured
    const svcId  = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const tplId  = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const pubKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (svcId && tplId && pubKey && svcId !== 'your_service_id') {
      try {
        const emailjs = await import('@emailjs/browser')
        const orderItemsText = items
          .map(i => `${i.emoji} ${i.name} ×${i.qty} – €${(i.price * i.qty).toFixed(2)}`)
          .join('\n')
        await emailjs.send(svcId, tplId, {
          to_email: form.email,
          to_name:  form.firstName,
          order_number: orderNumber,
          order_total:  `€${total.toFixed(2)}`,
          order_items:  orderItemsText,
        }, pubKey)
      } catch (err) {
        // Email failure shouldn't block the order
        console.warn('EmailJS error:', err)
      }
    }

    setLastOrder({
      number: orderNumber,
      items:  [...items],
      total,
      name:  `${form.firstName} ${form.lastName}`,
      email: form.email,
    })
    clearCart()
    setSubmitting(false)
    navigate('/confirmation')
  }

  return (
    <div className="checkout">
      <button className="checkout__back-link" onClick={() => navigate('/')}>
        ← Back to Shop
      </button>

      <h1 className="checkout__title">Practice Checkout</h1>
      <p className="checkout__subtitle">
        Fill in the form below to practise completing an online order.
      </p>

      <div className="checkout__practice-banner">
        <span className="checkout__practice-banner-icon">🛡️</span>
        <p>
          This is practice only. No real order will be placed and no money will be charged.
          You can use any details you like!
        </p>
      </div>

      <div className="checkout__layout">
        {/* Form */}
        <form className="checkout__form" onSubmit={handleSubmit} noValidate>
          <div className="checkout__form-section">
            <h3>Your Details</h3>
            <div className="checkout__row">
              <Field name="firstName" label="First Name"     placeholder="e.g. Mary"              value={form.firstName} onChange={handleChange} error={errors.firstName} />
              <Field name="lastName"  label="Last Name"      placeholder="e.g. Murphy"            value={form.lastName}  onChange={handleChange} error={errors.lastName} />
            </div>
            <Field name="email" label="Email Address" placeholder="e.g. mary@example.com" type="email" value={form.email} onChange={handleChange} error={errors.email} />
          </div>

          <div className="checkout__form-section">
            <h3>Delivery Address</h3>
            <Field name="address1" label="Address Line 1"      placeholder="e.g. 12 Main Street" value={form.address1} onChange={handleChange} error={errors.address1} />
            <div className="checkout__row">
              <Field name="city"   label="Town / City"         placeholder="e.g. Dublin"         value={form.city}   onChange={handleChange} error={errors.city} />
              <Field name="county" label="County (optional)"   placeholder="e.g. Dublin"         value={form.county} onChange={handleChange} error={errors.county} />
            </div>
            <Field name="eircode" label="Eircode (optional)"   placeholder="e.g. D01 AB12"       value={form.eircode} onChange={handleChange} error={errors.eircode} />
          </div>

          <button
            type="submit"
            className="btn btn--primary btn--full btn--lg"
            disabled={submitting}
          >
            {submitting ? '⏳ Placing Order...' : '✓ Place Practice Order'}
          </button>
        </form>

        {/* Order summary */}
        <div className="checkout__summary">
          <h3>Order Summary</h3>
          <div className="checkout__summary-items">
            {items.map(item => (
              <div key={item.id} className="checkout__summary-item">
                <span className="name">
                  <span aria-hidden="true">{item.emoji}</span>
                  <span>{item.name} × {item.qty}</span>
                </span>
                <span className="price">€{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="checkout__summary-total">
            <span>Total</span>
            <span>€{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
