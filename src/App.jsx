import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import HomePage from './pages/HomePage'
import CheckoutPage from './pages/CheckoutPage'
import ConfirmationPage from './pages/ConfirmationPage'

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <CartDrawer />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/"             element={<HomePage />} />
            <Route path="/checkout"     element={<CheckoutPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  )
}
