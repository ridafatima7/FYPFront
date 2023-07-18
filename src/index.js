/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import Home from "views/frontpages/Home";
import About from "views/frontpages/About";
import ContactUs from "views/frontpages/ContactUs";
import Donate from "views/frontpages/Donate";
import Donation from "views/examples/DonationData.js";
import Disasters from "views/frontpages/Disasters.js";
import ReliefActivities from "views/frontpages/ReliefActivities.js";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      {/* <Redirect from="/" to="/admin/index" /> */}
      <Route exact path="/" render={(props) => <Home {...props} />} />
      <Route path="/about-us" render={(props) => <About {...props} />} />
      <Route path="/contact-us" render={(props) => <ContactUs {...props} />} />
      <Route path="/donate" render={(props) => <Donate {...props} />} />
      <Route path="/disasters" render={(props) => <Disasters {...props} />} />
      <Route path="/relief_Activities" render={(props) => <ReliefActivities {...props} />} />
      <Route path="/donations" render={(props) => <Donation {...props} />} />

    </Switch>
  </BrowserRouter>
);
