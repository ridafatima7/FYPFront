import Header from "./Header"
import Footer from "./Footer"
import React, { useState, useEffect } from 'react';

import "assets/front-css/animate.css"
import "assets/front-css/owl.carousel.min.css"
import "assets/front-css/owl.theme.default.min.css"
import "assets/front-css/style.scss"
// IMAGES
import bg_7 from "assets/front-images/bg_7.jpg"
import bg_1 from "assets/front-images/bg_1.jpg"
import bg_2 from "assets/front-images/bg_2.jpg"
import bg_3 from "assets/front-images/bg_3.jpg"
import bg_4 from "assets/front-images/bg_4.jpg"
import cause_1 from "assets/front-images/cause_1.jpg"
import cause_2 from "assets/front-images/cause_2.jpg"
import cause_3 from "assets/front-images/cause_3.jpg"
import cause_4 from "assets/front-images/cause_4.jpg"
import cause_5 from "assets/front-images/cause_5.jpg"
import cause_6 from "assets/front-images/cause_6.jpg"
import person_1 from "assets/front-images/person_1.jpg"
import person_2 from "assets/front-images/person_2.jpg"
import person_3 from "assets/front-images/person_3.jpg"
import person_4 from "assets/front-images/person_4.jpg"
import person_5 from "assets/front-images/person_5.jpg"
import person_6 from "assets/front-images/person_6.jpg"
import person_7 from "assets/front-images/person_7.jpg"
import person_8 from "assets/front-images/person_8.jpg"
import person_9 from "assets/front-images/person_9.jpg"
import image_1 from "assets/front-images/image_1.jpg"
import image_2 from "assets/front-images/image_2.jpg"
import image_3 from "assets/front-images/image_3.jpg"
import image_4 from "assets/front-images/image_4.jpg"
import image_5 from "assets/front-images/image_5.jpg"
import image_6 from "assets/front-images/image_6.jpg"
import event_1 from "assets/front-images/event_1.jpg"
import event_2 from "assets/front-images/event_2.jpg"
import event_3 from "assets/front-images/event_3.jpg"
import fourth from "assets/front-images/disaster1.jpg"
import  rida from "assets/front-images/ridi.jpeg"
import  isha from "assets/front-images/isha1.png"
import  umaira from "assets/front-images/umaira1.png"
import { Link } from "react-router-dom"
import axios from 'axios'

import {
  Container,
  Col,
  Card,
  CardHeader,
  CardFooter,
  Table,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Badge,
  Button,
  Alert,
  UncontrolledDropdown,
  UncontrolledTooltip,
  Progress,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal, ModalHeader, ModalBody, ModalFooter,
  FormGroup,
  Form,
  Row,
  Input,
  Label
} from "reactstrap";

const Home = () => {
  const [reliefActivities, setReliefActivities] = useState([]);
  const [disasters, setDisasters] = useState([]);
  const [Error, setError] = useState(false);
  const [alertMessage, setAlert] = useState(false);
  const onDismissAlert = () => setAlert(false);
  const [Message, setMessage] = useState(false);
  const onDismisserror = () => setError(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const subject = e.target.elements.subject.value;
    const message = e.target.elements.message.value;
    
      axios({
        method: 'post',
        // withCredentials: true,
        url: 'http://localhost:8000/ContactUs/Contact_Us',
        data: { name:name,email: email, subject:subject,message:message}
      })
        .then(res => {
          console.log(res);
          setAlert(true);
          e.target.elements.name.value = '';
          e.target.elements.email.value = '';
          e.target.elements.subject.value = '';
          e.target.elements.message.value = '';
          setMessage('Feedback Sent successfully')
         
        })
        .catch(error => {
          console.log(error);
          setError(true)
          setMessage('Server Failed to connect')
          
        })
  }

  useEffect(() => {
    fetch('http://localhost:8000/Relief_Information/GetInformationHome') 
      .then((response) => response.json())
      .then((data) => setReliefActivities(data))
      .catch((error) => console.error('Error fetching data:', error));

      fetch('http://localhost:8000/Information/GetInformationHome') 
      .then((response) => response.json())
      .then((data) => setDisasters(data))
      .catch((error) => console.error('Error fetching data:', error));

  }, []);
 
  return (

    <div className="main-parent-class">
      <Header />
      <div className="hero-wrap opacity-8 mask " style={{ backgroundImage: "url('" + fourth + "')" }}>
        <div className="container">
         
          <div className="row no-gutters slider-text align-items-center justify-content-center">
            <div className="col-md-7 text-center">
                <h1 className="mb-4" style={{ backgroundColor: 'black' }}>Doing Nothing is Not An Option of Our Life</h1>
              {/* <h1 className="mb-4">Doing Nothing is Not An Option of Our Life</h1> */}
              {/* <p className="mb-5">Created by <a href="#">Colorlib.com</a></p> */}
              <p><Link to="/auth/register" className="btn btn-white btn-outline-white px-4 py-3 popup-vimeo"><span className="icon-play mr-2"></span>Register as NGO</Link></p>
            </div>
          </div>
        </div>
      </div>
      <section className="ftco-counter ftco-intro" id="section-counter">
        <div className="container">
          <div className="row no-gutters">
            <div className="col-md-5 d-flex justify-content-center counter-wrap">
              <div className="block-18 color-1 align-items-stretch">
                <div className="text">
                  <p>We cannot stop natural disasters but we can arm ourselves with knowledge: </p>
                  {/* <strong className="number">1,432,805</strong> */}
                  <span>so many lives wouldn't have to be lost if there was enough disaster preparedness.
                </span>
                </div>
              </div>
            </div>
            <div className="col-md d-flex justify-content-center counter-wrap">
              <div className="block-18 color-2 align-items-stretch">
                <div className="text">
                  <h3 className="mb-4">Donate Money</h3>
                  <p>Your generosity can change someone's life. Please donate now and make a positive impact.</p>
                  <p><Link to="/donations" className="btn btn-white px-3 py-2 mt-2">Donate Now</Link></p>
                </div>
              </div>
            </div>
            <div className="col-md d-flex justify-content-center counter-wrap">
              <div className="block-18 color-3 align-items-stretch">
                <div className="text">
                  <h3 className="mb-4">Register as NGO</h3>
                  <p>We has responsibility to reach out to help our brothers and sisters affected by disasters.</p>
                  <p><Link to="/auth/register" className="btn btn-white px-3 py-2 mt-2">Register Now</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section bg-light">
        <div className="container-fluid">
          <div className="row justify-content-center mb-5 pb-3">
            <div className="col-md-5 heading-section   text-center">
              <h2 className="mb-4">DISASTERS</h2>
              <p>We cannot stop natural disasters but we can arm ourselves with knowledge: so many lives wouldn't have to be lost if there was enough disaster preparedness.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12  ">
              <div className="row">
              {disasters.map((disaster) => (
              <div key={disaster._id} className="col-md-4 d-flex ftco-animate">
                <div className="blog-entry align-self-stretch" style={{width: "100%"}}>
                  {/* <Link to={"/disasterdetail?id=" + disaster._id } className="block-20" style={{ backgroundImage: "url('" + cause_1 + "')" }}>
                  </Link> */}
                  <Link to={"/disasterdetail?id=" + disaster._id } className="block-20" ><img src={'http://localhost:8000/'+disaster.gallery[0].replace('public/', '')} alt="" style={{width: '424px',height: '260px',objectFit: 'cover' }}/>
                  </Link>
                  <div className="text p-4 d-block">
                    <div className="meta mb-3">
                      <div>{disaster.date}</div>
                      {/* <div>Admin</div>
                      <div><span className="icon-chat"></span> 3</div> */}
                    </div>
                    <h3 className="heading mb-4 "> <Link to={"/disasterdetail?id=" + disaster._id } >{disaster.dis_title}</Link></h3>
                    <p className="time-loc"><span className="mr-2"><i className="icon-clock-o"></i> </span> {disaster.dis_area}<span  style={{ paddingLeft: "6px" }}><i className="icon-map-o"></i>{disaster.dis_type} </span></p>
                    {/* <p>{disaster.gallery.substring(0, 100)}</p> */}
                    <p>{disaster.Description ? disaster.Description.substring(0,100): disaster.Description}</p>
                    <p><Link to={"/disasterdetail?id=" + disaster._id }>Read More <i className="ion-ios-arrow-forward"></i></Link></p>
                  </div>
                </div>
              </div>
              ))}
              
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="d-flex justify-content-center align-items-center" style={{marginTop:'-90px'}}>
      <Link to="/disasters">
        <Button className="btn btn-primary py-3 px-5 mt-2 text-center">View Now</Button>
      </Link></div>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-3">
            <div className="col-md-7 heading-section   text-center">
              <h2 className="mb-4">Latest Donations</h2>
              <p>Making a donation is the ultimate sign of solidarity. Actions speak louder than words.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 d-flex mb-sm-4  ">
              <div className="staff">
                <div className="d-flex mb-4">
                  <div className="img" style={{ backgroundImage: "url('" + rida + "')" }}></div>
                  <div className="info ml-4">
                    <h3><a href="teacher-single.html">Rida Fatima</a></h3>
                    <span className="position">Donated Just now</span>
                    <div className="text">
                      <p>Donated <span>Rs.300</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 d-flex mb-sm-4  ">
              <div className="staff">
                <div className="d-flex mb-4">
                  <div className="img" style={{ backgroundImage: "url('" + isha + "')" }}></div>
                  <div className="info ml-4">
                    <h3><a href="teacher-single.html">Isha Tariq</a></h3>
                    <span className="position">Donated Just now</span>
                    <div className="text">
                      <p>Donated <span>Rs.150</span> </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 d-flex mb-sm-4  ">
              <div className="staff">
                <div className="d-flex mb-4">
                  <div className="img" style={{ backgroundImage: "url('" + umaira + "')" }}></div>
                  <div className="info ml-4">
                    <h3><a href="teacher-single.html">Umaira Shaheen</a></h3>
                    <span className="position">Donated Just now</span>
                    <div className="text">
                      <p>Donated <span>Rs.250</span> </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="d-flex justify-content-center align-items-center " style={{marginTop:'-90px'}}>
      <Link to="/">
        <Button className="btn btn-primary py-3 px-5 mt-2 text-center">View Now</Button>
      </Link></div>
      {/* <section className="ftco-gallery">
        <div className="d-md-flex">
          <a href="images/cause-2.jpg" className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate" style={{ backgroundImage: "url('" + cause_2 + "')" }}>
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search"></span>
            </div>
          </a>
          <a href="images/cause-3.jpg" className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate" style={{ backgroundImage: "url('" + cause_3 + "')" }} >
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search"></span>
            </div>
          </a>
          <a href="images/cause-4.jpg" className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate" style={{ backgroundImage: "url('" + cause_4 + "')" }}>
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search"></span>
            </div>
          </a>
          <a href="images/cause-5.jpg" className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate" style={{ backgroundImage: "url('" + cause_5 + "')" }}>
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search"></span>
            </div>
          </a>
        </div>
        <div className="d-md-flex">
          <a href="images/cause-6.jpg" className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate" style={{ backgroundImage: "url('" + cause_6 + "')" }}>
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search"></span>
            </div>
          </a>
          <a href="images/image_3.jpg" className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate" style={{ backgroundImage: "url('" + image_3 + "')" }}>
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search"></span>
            </div>
          </a>
          <a href="images/image_1.jpg" className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate" style={{ backgroundImage: "url('" + image_1 + "')" }}>
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search"></span>
            </div>
          </a>
          <a href="images/image_2.jpg" className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate" style={{ backgroundImage: "url('" + image_2 + "')" }}>
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search"></span>
            </div>
          </a>
        </div>
      </section> */}

      {/* <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-3">
            <div className="col-md-7 heading-section ftco-animate text-center">
              <h2 className="mb-4">Recent from blog</h2>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            </div>
          </div>
          <div className="row d-flex">
            <div className="col-md-4 d-flex ftco-animate">
              <div className="blog-entry align-self-stretch">
                <a href="blog-single.html" className="block-20" style={{ backgroundImage: "url('" + image_1 + "')" }}>
                </a>
                <div className="text p-4 d-block">
                  <div className="meta mb-3">
                    <div><a href="#">Sept 10, 2018</a></div>
                    <div><a href="#">Admin</a></div>
                    <div><a href="#" className="meta-chat"><span className="icon-chat"></span> 3</a></div>
                  </div>
                  <h3 className="heading mt-3"><a href="#">Hurricane Irma has devastated Florida</a></h3>
                  <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex ftco-animate">
              <div className="blog-entry align-self-stretch">
                <a href="blog-single.html" className="block-20" style={{ backgroundImage: "url('" + image_2 + "')" }}>
                </a>
                <div className="text p-4 d-block">
                  <div className="meta mb-3">
                    <div><a href="#">Sept 10, 2018</a></div>
                    <div><a href="#">Admin</a></div>
                    <div><a href="#" className="meta-chat"><span className="icon-chat"></span> 3</a></div>
                  </div>
                  <h3 className="heading mt-3"><a href="#">Hurricane Irma has devastated Florida</a></h3>
                  <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex ftco-animate">
              <div className="blog-entry align-self-stretch">
                <a href="blog-single.html" className="block-20" style={{ backgroundImage: "url('" + image_3 + "')" }}>
                </a>
                <div className="text p-4 d-block">
                  <div className="meta mb-3">
                    <div><a href="#">Sept 10, 2018</a></div>
                    <div><a href="#">Admin</a></div>
                    <div><a href="#" className="meta-chat"><span className="icon-chat"></span> 3</a></div>
                  </div>
                  <h3 className="heading mt-3"><a href="#">Hurricane Irma has devastated Florida</a></h3>
                  <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row justify-content-center mb-3 pb-3">
            <div className="col-md-7 heading-section ftco-animate text-center">
              <h2 className="mb-4">Relief Operation</h2>
              <p>The best preparation for good work tomorrow is to do good work today !</p>
            </div>
          </div>
          <div className="row">
          {reliefActivities.map((reliefActivity) => (
              <div  key={reliefActivity._id} className="col-md-4 d-flex ftco-animate">
                <div className="blog-entry align-self-stretch" style={{width: "100%"}}>
                { reliefActivity.gallery[0] ? 
                   <Link to={"/reliefActivitydetail?id=" + reliefActivity._id } className="block-20" ><img src={'http://localhost:8000/'+reliefActivity.gallery[0].replace('public/', '')} alt="" style={{width: '400px',height: '260px',objectFit: 'cover' }} /></Link>
                   :
                <Link to={"/reliefActivitydetail?id=" + reliefActivity._id } className="block-20" style={{ backgroundImage: "url('" + event_1 + "')" }} >
                  </Link>
                 }
                  <div className="text p-4 d-block">
                    <div className="meta mb-3">
                      <div>{reliefActivity.Ngo_Name}</div>
                      {/* <div>Admin</div>
                      <div><span className="icon-chat"></span> 3</div> */}
                    </div>
                    <h3 className="heading mb-4"><Link to={"/reliefActivitydetail?id=" + reliefActivity._id }>{reliefActivity.dis_title}</Link></h3>
                    <p className="time-loc"><span className="mr-2"><i className="icon-clock-o"></i> {reliefActivity.dis_type}</span> <span><i className="icon-map-o"></i> {reliefActivity.date}</span></p>
                     <p>{reliefActivity.description.substring(0, 100)}</p> 
                    <p><Link to={"/reliefActivitydetail?id=" + reliefActivity._id }>Learn More <i className="ion-ios-arrow-forward"></i></Link></p>
                    
                  </div>
                </div>
              </div>
               ))}
          </div>
        </div>
      </section>
      <div className="d-flex justify-content-center align-items-center mb-6" style={{marginTop:'-90px'}}>
      <Link to="/relief_Activities">
        <Button className="btn btn-primary py-3 px-5 mt-2 text-center">View Now</Button>
      </Link></div>
      <section className="ftco-section-3 img" style={{ backgroundImage: "url('" + bg_3 + "')" }}>
        <div className="overlay"></div>
        <div className="container">
        <Alert color="success" isOpen={Error} toggle={onDismisserror}>
           <strong> {Message} </strong> 
       </Alert>
       <Alert color="success" isOpen={alertMessage} toggle={onDismissAlert}>
           <strong> {Message} </strong> 
       </Alert>
          <div className="row d-md-flex">
            <div className="col-md-6 d-flex ftco-animate">
              <div className="img img-2 align-self-stretch" style={{ backgroundImage: "url('" + bg_4 + "')" }}></div>
            </div>

            <div className="col-md-6 volunteer pl-md-5 ftco-animate">
              <h3 className="mb-3">Send Your Feedback</h3>
              <Form role="form" onSubmit={handleSubmit} className="volunter-form">
                <div className="form-group">
                  <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="text" name="email" className="form-control" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <input type="text" name="subject" className="form-control" placeholder="Subject" required />
                </div>
                <div className="form-group">
                  <textarea name="message" id="messsage" cols="30" rows="3" className="form-control" placeholder="Message" required></textarea>
                </div>
                <div className="form-group">
                  <input type="submit" value="Send Message" className="btn btn-white py-3 px-5" />
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>



      <Footer />
    </div>

  )
}

export default Home;