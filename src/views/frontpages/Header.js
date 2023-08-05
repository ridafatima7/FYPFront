// CSS FILES
import "assets/front-css/animate.css"
import "assets/front-css/owl.carousel.min.css"
import "assets/front-css/owl.theme.default.min.css"
import "assets/front-css/style.scss"
import { BrowserRouter, Link ,useHistory } from "react-router-dom"
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios'
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Form,
	Input,
	Container,
	Row,
	Alert,
	Col,
	Label,
	Table,
	ModalHeader,
	ModalFooter,
	Modal,
	ModalBody
} from "reactstrap";
import "./Front.scss"
// IMAGES

const Header = () => {
   
    const location = useLocation();
    const history = useHistory();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const storedUser = localStorage.getItem('user');
    const user_info = JSON.parse(storedUser);
    const [error, setError] = useState(false);
    const [addsuccess, setaddSuccess] = useState(false);
    const onDismissaddSuccess = () => setaddSuccess(false);
    function handleSubmit(e) {
      e.preventDefault();
    
      axios.post("http://localhost:8000/auth/logout")
        .then(res => {
          if (res.data === "success") {
            localStorage.clear(); 
            setaddSuccess(true)
            // <Redirect to="/auth/login" />; 
            setaddSuccess(true)
            history.push('/auth/login?Message=LoggedOutSuccessfully');
            

          } else {
            setError(true);
          }
        })
        .catch(error => {
          setError(true);
        });
    }
    return (
        <div className="main-parent-class">
            <div className="my-front-css-custom">
                <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                    <div className="container">
                    <Link to="/" className="nav-link">
                            <img
                                alt="..."
                                src={require("../../assets/img/brand/LOGO2.png")}
                                style={{ width: '60px', height: '60px' }}
                            />
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="oi oi-menu"></span> Menu
                        </button>
                        <div className="collapse navbar-collapse" id="ftco-nav">
                            <ul className="navbar-nav ml-auto">
                                <li className={splitLocation[1] === "" ? "nav-item active" : "nav-item"}><Link to="/" className="nav-link">Home</Link></li>
                                <li className={splitLocation[1] === "about-us" ? "nav-item active" : "nav-item"}><Link to="/about-us" className="nav-link">About</Link></li>
                                <li className={splitLocation[1] === "contact-us" ? "nav-item active" : "nav-item"}><Link to="/contact-us" className="nav-link">Contact Us</Link></li>
                                <li className={splitLocation[1] === "donate" ? "nav-item active" : "nav-item"}><Link to="/donate" className="nav-link">Donate</Link></li>
                                <li className={splitLocation[1] === "disasters" ? "nav-item active" : "nav-item"}><Link to="/disasters" className="nav-link">Disasters</Link></li>
                                <li className={splitLocation[1] === "relief_activities" ? "nav-item active" : "nav-item"}><Link to="/relief_activities" className="nav-link">Relief Operations</Link></li>
                                { user_info ?
                                <li style={{ display: 'flex', alignItems: 'center' }}>
                                    <Link to={"/admin/index"} style={{ height: '40px',marginRight: '10px' }} className="btn btn-primary py-2 px-4 d-none d-sm-block">Dashboard</Link>
                                    <Button onClick={handleSubmit} style={{ height: '40px',background:'#f86f2d'}} className="btn btn-primary py-2 px-4 d-none d-lg-block">LogOut</Button>
                                </li>
                                :
                                <li style={{ display: 'flex', alignItems: 'center' }}>
                                    <Link to={"/auth/login"} style={{ height: '40px' ,marginRight: '10px'}} className="btn btn-primary py-2 px-4 d-none d-sm-block">Login</Link>
                                    <Link to={"/auth/register"} style={{ height: '40px' }} className="btn btn-primary py-2 px-4 d-none d-lg-block">Register</Link>
                                </li>
                                }
                                
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>

    )
}

export default Header