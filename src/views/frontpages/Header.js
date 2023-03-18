// CSS FILES
import "assets/front-css/animate.css"
import "assets/front-css/owl.carousel.min.css"
import "assets/front-css/owl.theme.default.min.css"
import "assets/front-css/style.css"
import { BrowserRouter, Link } from "react-router-dom"
import { useLocation } from "react-router-dom";

// IMAGES

const Header = () => {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    return (
        <> 
            <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                <div className="container">
                <a className="navbar-brand" href="index.html">Welfare</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="oi oi-menu"></span> Menu
                </button>
                <div className="collapse navbar-collapse" id="ftco-nav">
                    <ul className="navbar-nav ml-auto">
                        <li className={splitLocation[1] === "" ? "nav-item active" : "nav-item"}><Link to="/" className="nav-link">Home</Link></li>
                        <li className={splitLocation[1] === "about-us" ? "nav-item active" : "nav-item"}><Link to="/about-us" className="nav-link">About</Link></li>
                    </ul>
                </div>
                </div>
            </nav>
        </>
    )
}

export default Header