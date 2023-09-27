import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  OrderDetailsPage,
  TrackOrderPage,
  UserInbox,
} from "./routes/Route";
import "react-toastify/dist/ReactToastify.css";
import {
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopPreviewPage,
  ShopAllOrders,
  ShopOrderDetails,
  ShopAllRefunds,
  ShopSettingsPage,
  ShopWithdrawMoneyPage,
  ShopProfilePage,
} from "./routes/ShopRoute";
import { ToastContainer } from "react-toastify";
import { loadSeller, loadUser } from "./redux/actions/user";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ShopHomePage } from "./ShopRoutes";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import Singup from "./components/Signup/Signup";
import { useDispatch } from "react-redux";
import { getAllProducts } from "./redux/productSlice";
import { getAllEvents } from "./redux/actions/event";
// import { getUser } from "./redux/reducers/authSlice";
import axios from "axios";
import { payment } from "./server";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getUsers } from "./redux/features/auth/AuthSlice";

const App = () => {
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(`${payment}/stripeApiKey`);
    setStripeApiKey(data.stripeApiKey);
  }

  // console.log(stripeApiKey);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(loadSeller());
    dispatch(getAllProducts());
    dispatch(getAllEvents());
    getStripeApiKey();
  }, []);
  
  return (
    <BrowserRouter>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<Singup />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />

        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:name" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/order/success" element={<OrderSuccessPage />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />

        {/* SHOP ROUTE */}
        <Route path="/shopCreate" element={<ShopCreatePage />} />
        <Route path="/shopLogin" element={<ShopLoginPage />} />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute

            >
            <ShopHomePage />
              </SellerProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <SellerProtectedRoute

            >
            <ShopSettingsPage />
              </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
            <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-profile"
          element={
            <SellerProtectedRoute>
            <ShopProfilePage />
             </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-createProducts"
          element={
            <SellerProtectedRoute>
            <ShopCreateProduct />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoute>
            <ShopAllProducts />
             </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-orders"
          element={
            <SellerProtectedRoute>
            <ShopAllOrders />
             </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-refunds"
          element={
            <SellerProtectedRoute>
            <ShopAllRefunds />
             </SellerProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute>
            <ShopOrderDetails />
             </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-createEvent"
          element={
            <SellerProtectedRoute>
            <ShopCreateEvents />
              </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-events"
          element={
            <SellerProtectedRoute>
            <ShopAllEvents />
              </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-withdraw-money"
          element={
            <SellerProtectedRoute>
            <ShopWithdrawMoneyPage />
              </SellerProtectedRoute>
          }
        />

        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
    </BrowserRouter>
  );
};

export default App;
