import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./components/cart/cartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";
import Home from "./Page/Home/index.jsx";
import About from "./Page/About/about.jsx";
import Contact from "./Page/Contact/contact.jsx";
import Listing from "./components/listing/listing.jsx";
import NotFound from "./components/Not found/notFound.jsx";
import Register from "./Page/Account/Register/register.jsx";
import Login from "./Page/Account/login/login.jsx";
import DashBoard from "./components/DashBoard/dashboard.jsx";
import Deals from "./components/deals/deals.jsx";
import UserAccount from "./Page/Account/userAccount/user.jsx";
import Cart from "./components/cart/cart.jsx";
import PaymentPage from "./components/paymentPage/PaymentPage.jsx";
import Address from "./components/address/address.jsx";
import OrderPage from "./components/orderTracking/order.jsx";
import ProductDetail from "./Page/Detail/detail.jsx";
import Shop from "./components/Shop/shop.jsx";
import TermsConditions from "./Page/Terms&Condition/T&C.jsx";
import Privacy from "./Page/PrivacyPolicy/Privacy.jsx";

// ✅ Layout logic inside a wrapper
import { Fragment } from "react";
import Success from "./components/cart/Success.jsx";
import MyOrders from "./components/cart/MyOrders.jsx";

function LayoutWrapper() {
  const location = useLocation();
  const hideHeaderFooter = ["/login", "/register"].includes(location.pathname);

  return (
    <Fragment>
      {!hideHeaderFooter && <Header />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="/shop/:categoryName" element={<Shop />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/deals" element={<Deals />} />
        {/* <Route path="/userAccount" element={<UserAccount />} /> */}
        {/* <Route path="/payment" element={<PaymentPage />} /> */}
        {/* <Route path="/address" element={<Address />} /> */}
        {/* <Route path="/order-tracking" element={<OrderPage />} /> */}
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/term&conditions" element={<TermsConditions />} />
        <Route path="/privacy_policy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <PaymentPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/userAccount"
          element={
            <PrivateRoute>
              <UserAccount />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/address"
          element={
            <PrivateRoute>
              <Address />
            </PrivateRoute>
          }
        />

        <Route
          path="/order-tracking"
          element={
            <PrivateRoute>
              <OrderPage />
            </PrivateRoute>
          }
        />

<Route
          path="/success"
          element={
            <PrivateRoute>
              <Success />
            </PrivateRoute>
          }
        />

<Route
          path="/myorders"
          element={
            <PrivateRoute>
              <MyOrders />
            </PrivateRoute>
          }
        />


      </Routes>

      {!hideHeaderFooter && <Footer />}
      <ToastContainer position="top-right" autoClose={2000} />
    </Fragment>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <LayoutWrapper />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
