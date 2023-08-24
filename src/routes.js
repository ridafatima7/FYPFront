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
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import DisasterInfoManagement from "views/examples/DisasterInfoManagement";
import DisasterReliefManagement from "views/examples/DisasterReliefManagement";
import RegisterasNGO from "views/examples/RegisterasNGO.js";
import Tables from "views/examples/Tables.js";
import Home from "views/frontpages/Home.js";
import Messages from "views/examples/Messages.js";
import Donation from "views/examples/DonationAdmin.js";
import DonationReports from "views/Reports/DonationReport.js";
import NGOReports from "views/Reports/NgoReport.js";
import DisasterReports from "views/Reports/DisasterReport";
import Icons from "views/examples/Icons.js";
import AllReports from "views/Reports/AllReports";
import NGOs from "views/examples/Users.js/NGOs";
import DEO from "views/examples/Users.js/DEO";
import AllUsers from "views/examples/Users.js/AllUsers";
import DEORegistration from "views/examples/DEORegistration";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin"
  // },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin"
  // },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  },
  {
    path: "/deoRegister",
    name: "deoRegister",
    icon: "ni ni-circle-08 text-pink",
    component:DEORegistration,
    layout: "/auth"
  },
  {
    path: "/DisasterInfoManagement",
    name: "Disaster Information Management",
    icon: "ni ni-tv-2 text-primary",
    component: DisasterInfoManagement,
    layout: "/admin"
  },
  {
    path: "/DisasterReliefManagement",
    name: "Disaster Relief  Management",
    icon: "ni ni-tv-2 text-primary",
    component: DisasterReliefManagement,
    layout: "/admin"
  },
  // {
  //   path: "/RegisterasNGO",
  //   name: "Register as NGO",
  //   icon: "ni ni-tv-2 text-primary",
  //   component:RegisterasNGO ,
  //   layout: "/admin"
  // },
  {
    path:"/Feedback",
    name:"Feedback",
    // icon: "ni ni-tv-2 text-primary",
    icon: "ni ni-email-83 text-pink",
    component: Messages,
    layout: "/admin"
  },
  {
    path:"/Donations",
    name:"Donations",
    // icon: "ni ni-tv-2 text-primary",
    icon: "ni ni-tv-2 text-primary",
    component: Donation ,
    layout: "/admin"
  },
  // {
  //   path:"/",
  //   name:"Go to Website",
  //   // icon: "ni ni-tv-2 text-primary",
  //   icon: "ni ni-planet text-primary",
  //   component: Donation,
  //   //  layout: "/auth"
  // },
  {
    path:"/reports",
    name:"Reports",
    // icon: "ni ni-tv-2 text-primary",
    icon: "ni ni-book-bookmark text-primary",
    component: AllReports,
      layout: "/admin"
  },
  {
    path:"/users",
    name:"Users",
    icon: "ni ni-single-02 text-yellow",
    component: AllUsers,
      layout: "/admin"
  },
  {
    path:"/DEO",
    name:"DEO",
    icon: "ni ni-book-bookmark text-primary",
    component: DEO,
      layout: "/admin"
  },
  {
    path:"/ngos",
    name:"NGOs",
    icon: "ni ni-book-bookmark text-primary",
    component: NGOs,
      layout: "/admin"
  }
];
export default routes;
