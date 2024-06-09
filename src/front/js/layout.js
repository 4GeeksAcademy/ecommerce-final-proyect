import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { AboutUs } from "./pages/aboutUs";
import { SingleArticle } from "./pages/single";
import injectContext, { Context } from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import CreateAccount from "./pages/createUser";
import { Cart } from "./pages/cart";
import { Confirmation } from "./pages/confirmation";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    const {store,actions}= useContext(Context)
    useEffect(()=>{
        if(!store.session && localStorage.getItem("session")){
            actions.setSession(JSON.parse(localStorage.getItem("session")))
            return
        }
        if(store.session && store.token){
            localStorage.setItem("session", JSON.stringify(store.session))
            return
        }
    }, [store.token])
    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Cart />} path="/cart" />
                        <Route element={<Confirmation />} path="/confirmation" />
                        <Route element={<AboutUs />} path="/aboutUs" />
                        <Route element={<CreateAccount />} path="/createUser" />
                        <Route element={<SingleArticle />} path="/single/:id" />
                        {/* <Route element={<SingleArticle />} path="/single/:theid" /> */}
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
