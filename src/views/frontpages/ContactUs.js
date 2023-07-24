import Header from "./Header"
import Footer from "./Footer"
import { useState } from 'react';
import axios from 'axios'
import "assets/front-css/animate.css"
import "assets/front-css/owl.carousel.min.css"
import "assets/front-css/owl.theme.default.min.css"
import "assets/front-css/style.scss"
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Alert

} from "reactstrap";
// Images
import bg_2 from "assets/front-images/bg_2.jpg"
import contact from "assets/front-images/contact.avif"
const ContactUs = () => {
  const [error, setError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const subject = e.target.elements.subject.value;
    const message = e.target.elements.message.value;

    // axios.post('http://localhost:8000/auth/get_data?name=rida').then(res =>{console.log(res)})
    axios({
      method: 'post',
      // withCredentials: true,
      url: 'http://localhost:8000/ContactUs/Contact_Us',
      data: { name:name,email: email, subject:subject,message:message}
    })
      .then(res => {
        console.log(res);
        // localStorage.setItem("user", JSON.stringify(res.data))
        // setlogin(true)
      })
      .catch(error => {
        console.log(error);
        setError(true)
      })
  }

    return (
        <div className="main-parent-class">
        <Header />
        <div className="hero-wrap" style={{backgroundImage: "url('" + contact + "')"}} data-stellar-background-ratio="0.5">
      <div className="overlay"></div>
      <div className="container">
        <div className="row no-gutters slider-text align-items-center justify-content-center" data-scrollax-parent="true">
          <div className="col-md-7 ftco-animate text-center" data-scrollax=" properties: { translateY: '70%' }">
             {/* <p className="breadcrumbs" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"><span className="mr-2"><a href="index.html">Home</a></span> <span>Contact</span></p> */}
              <div> 
              {/* <div style={{ paddingTop: '30%' }}> */}
            <h1 className="mb-3 bread " data-scrollax="properties: { translateY: '30%', opacity: 1.6 ]}" style={{ backgroundColor: 'black' }}>Contact Us</h1>
            {/* </div> */}
             </div>
          </div>
        </div>
      </div>
    </div>

    <section className="ftco-section contact-section ftco-degree-bg">
      <div className="container">
        <div className="row d-flex mb-5 contact-info">
          <div className="col-md-12 mb-4">
            <h2 className="h4">Contact Information</h2>
          </div>
          <div className="w-100"></div>
          <div className="col-md-3">
            <p><span>Address:</span> Constitutional Avenue, Islamabad.</p>
          </div>
          <div className="col-md-3">
            <p><span>Phone:</span> <a href="tel://1234567920">+923056787654</a></p>
          </div>
          <div className="col-md-3">
            <p><span>Email:</span> <a href="mailto:info@yoursite.com">disaster@gmail.com</a></p>
          </div>
          <div className="col-md-3">
            <p><span>Website</span> <a href="#">yoursite.com</a></p>
          </div>
        </div>
        <div className="row block-9">
          <div className="col-md-6 pr-md-5">
          	<h4 className="mb-4">Do you have any questions?</h4>
            <Form role="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input name="name" id="name" type="text" className="form-control" placeholder="Your Name" />
              </div>
              <div className="form-group">
                <input name="email" id="email" type="text" className="form-control" placeholder="Your Email" />
              </div>
              <div className="form-group">
                <input name="subject" id="subject" type="text" className="form-control" placeholder="Subject" />
              </div>
              <div className="form-group">
                <textarea name="message" id="message" cols="30" rows="7" className="form-control" placeholder="Message"></textarea>
              </div>
              <div className="form-group">
                <input type="submit" value="Send Message" className="btn btn-primary py-3 px-5" />
              </div>
            </Form>
          
          </div>

          <div className="col-md-6" id="map"></div>
        </div>
      </div>
    </section> 
		
        <Footer />
    
        </div> )
}


export default ContactUs