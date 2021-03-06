import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/general/ProtectedRoute.js";
import CircularProgress from "@material-ui/core/CircularProgress";

//App Components
import Navbar from "./components/general/Navbar.js";
import Footer from "./components/general/Footer.js";
import { Container } from "react-bootstrap";

//Pages
import ProductsPage from "./components/pages/ProductsPage.js";
import ProductPage from "./components/pages/ProductPage.js";
import HomePage from "./components/pages/HomePage.js";
import SignUpPage from "./components/pages/SignUpPage.js";
import LogInComponent from "./components/general/LogInComponent.js";
import ShoppingCartPage from "./components/pages/ShoppingCartPage.js";
import ShippingPage from "./components/pages/ShippingPage.js";
import BillingPage from "./components/pages/BillingPage.js";
import ProfilePage from "./components/pages/ProfilePage";

//Legal Pages
import PrivacyPolicy from "./components/pages/PrivacyPolicy.js";
import ReturnPolicy from "./components/pages/ReturnPolicy.js";
import TermsOfUse from "./components/pages/TermsOfUse.js";

// Additional Pages
import PageNotFound from "./components/pages/PageNotFound.js";

import store from "./redux/index.js";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { getUserProfile } from "./redux/actions/profile.js";

function App() {
  var [loading, setLoading] = React.useState(true);

  const subscription = store.subscribe(appStart);

  async function appStart() {
    if (isLoaded(store.getState().firebase.auth)) {
      if (isEmpty(store.getState().firebase.auth)) {
        subscription();
        setLoading(false);
      } else {
        subscription();
        await store.dispatch(getUserProfile());
        setLoading(false);
      }
    }
  }

  return (
    <>
      {loading ? (
        <div
          style={{
            height: "100vh",
            width: "100%",
            textAlign: "center",
            marginTop: "30vh",
            color: "#007bff",
          }}
        >
          <p
            className="logo-banner"
            style={{ marginBottom: "40px", fontSize: "60px" }}
          >
            SIZZASNEAKS
          </p>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <Router>
          <Navbar />
          <Container fluid="xl" style={{ padding: "0" }}>
            <Switch>
              <Route exact path="/privacy-policy">
                <PrivacyPolicy />
              </Route>
              <Route exact path="/return-policy">
                <ReturnPolicy />
              </Route>
              <Route exact path="/terms-of-use">
                <TermsOfUse />
              </Route>

              <ProtectedRoute exact path="/shipping" mustBeLoggedIn={true} component={ShippingPage} />
              <ProtectedRoute exact path="/billing" mustBeLoggedIn={true} component={BillingPage} />
              <ProtectedRoute exact path="/profile" mustBeLoggedIn={true}  component={ProfilePage} />
              <Route exact path="/cart">
                <ShoppingCartPage />
              </Route>
              <Route exact path="/products/:id">
                <ProductPage />
              </Route>
              <Route exact path="/products/:searchBy/:category">
                <ProductsPage />
              </Route>
              {/* <Route exact path="/log-in">
                <LogInComponent />
              </Route> */}
              <Route exact path="/sign-up">
                <SignUpPage />
              </Route>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="*" exact={true} component={PageNotFound} />
            </Switch>
          </Container>
          <Footer />
        </Router>
      )}
    </>
  );
}

export default App;
