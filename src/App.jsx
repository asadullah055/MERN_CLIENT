import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import CreateAccount from "./assets/component/Account/CreateAccount";
import Login from "./assets/component/Account/Login";
import Otp from "./assets/component/Account/Otp";
import Profile from "./assets/component/Account/Profile";
import Home from "./assets/component/Home/Home";
import Footer from "./assets/component/MainLayout/Footer";
import MainNav from "./assets/component/MainLayout/MainNav";
import AddProduct from "./assets/component/Product/AddProduct";
import Product from "./assets/component/Product/Product";
import ProductByBrand from "./assets/component/Product/ProductByBrand";
import ProductByCategory from "./assets/component/Product/ProductByCategory";
import SearchByName from "./assets/component/Product/SearchByName";
import UserStore from "./assets/store/userStore";

function App() {
  const PrivateRoute = ({ children }) => {
    const { isLogin } = UserStore();
    const location = useLocation();

    if (isLogin()) {
      return children;
    } else {
      return <Navigate state={location.pathname} to="/login"></Navigate>;
    }
  };
  return (
    <>
      <BrowserRouter>
        <MainNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/product"
            element={
              <PrivateRoute>
                <Product />
              </PrivateRoute>
            }
          />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/by-brand/:id" element={<ProductByBrand />} />
          <Route path="/by-category/:id" element={<ProductByCategory />} />
          <Route path="/by-search/:name" element={<SearchByName />} />
          <Route path="/otp" element={<Otp />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
