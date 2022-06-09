// React-Router Config
import { Routes, Route } from "react-router-dom";

// Pages
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { ProductPage } from "../pages/ProductPage";
import { AddAd } from "../pages/AddAd";
import { NotFound } from "../pages/NotFound";
import { ListAds } from "../pages/ListAds";
import { SellerPage} from "../pages/Seller";
import { EditP } from '../pages/EditP'
import { Profile } from "../pages/Profile";

// Helpers (Verify Private Page)
import { PrivateRoute } from "../helpers/PrivateRoute";

export const MainRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/ad/:id" element={<ProductPage/>}/>
            <Route path="/post-on-ad" element={<PrivateRoute><AddAd/></PrivateRoute>}/>
            <Route path="/ads" element={<ListAds/>}/>
            <Route path="/user/ads" element={<PrivateRoute><SellerPage/></PrivateRoute>}/>
            <Route path="/user/edit/ads/:id" element={<PrivateRoute><EditP/></PrivateRoute>}/>
            <Route path="/user/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    )
}