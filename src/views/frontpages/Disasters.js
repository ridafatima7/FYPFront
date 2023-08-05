import cause_1 from "assets/front-images/cause_1.jpg"
import cause_2 from "assets/front-images/cause_2.jpg"
import cause_3 from "assets/front-images/cause_3.jpg"
import cause_4 from "assets/front-images/cause_4.jpg"
import cause_5 from "assets/front-images/cause_5.jpg"
import cause_6 from "assets/front-images/cause_6.jpg"
import bg_5 from "assets/front-images/3.jpeg"
import bg_3 from "assets/front-images/bg_3.jpg"
import bg_4 from "assets/front-images/bg_4.jpg"

import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

const Disasters = () => {
  const [disasters, setDisasters] = useState([]);
  useEffect(() => {
    
    fetch('http://localhost:8000/Information/GetInformationHome') 
      .then((response) => response.json())
      .then((data) => setDisasters(data))
      .catch((error) => console.error('Error fetching data:', error));

      
  }, []);
  return (
        
    <>     
      <div className="main-parent-class">
        <Header />

        <div className="hero-wrap" style={{ backgroundImage: "url('" + bg_5 + "')" }} data-stellar-background-ratio="0.5">
          <div className="overlay"></div>
          <div className="container">
            <div className="row no-gutters slider-text align-items-center justify-content-center" data-scrollax-parent="true">
              <div className="col-md-7 ftco-animate text-center" data-scrollax=" properties: { translateY: '70%' }">
                {/* <p className="breadcrumbs" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"><span className="mr-2"><a href="index.html">Home</a></span> <span>Event</span></p> */}
                <h1 className="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }" style={{ backgroundColor: 'black' }}>Disasters</h1>
              </div>
            </div>
          </div>
        </div>


        <section className="ftco-section">
          <div className="container">
            <div className="row">
              {/* <div className="col-md-4 d-flex ftco-animate">
                <div className="blog-entry align-self-stretch">
                  <a href="blog-single.html" className="block-20" style={{ backgroundImage: "url('" + cause_1 + "')" }} >
                  </a>
                  <div className="text p-4 d-block">
                    <div className="meta mb-3">
                      <div><a href="#">Sep. 10, 2018</a></div>
                      <div><a href="#">Admin</a></div>
                      <div><a href="#" className="meta-chat"><span className="icon-chat"></span> 3</a></div>
                    </div>
                    <h3 className="heading mb-4"><a href="#">World Wide Donation</a></h3>
                    <p className="time-loc"><span className="mr-2"><i className="icon-clock-o"></i> 10:30AM-03:30PM</span> <span><i className="icon-map-o"></i> Venue Main Campus</span></p>
                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                    <p><a href="event.html">Join Event <i className="ion-ios-arrow-forward"></i></a></p>
                  </div>
                </div>
              </div> */}
              {/* <div className="col-md-4 d-flex ftco-animate">
                <div className="blog-entry align-self-stretch">
                  <a href="blog-single.html" className="block-20" style={{ backgroundImage: "url('" + cause_2 + "')" }}>
                  </a>
                  <div className="text p-4 d-block">
                    <div className="meta mb-3">
                      <div><a href="#">Sep. 10, 2018</a></div>
                      <div><a href="#">Admin</a></div>
                      <div><a href="#" className="meta-chat"><span className="icon-chat"></span> 3</a></div>
                    </div>
                    <h3 className="heading mb-4"><a href="#">World Wide Donation</a></h3>
                    <p className="time-loc"><span className="mr-2"><i className="icon-clock-o"></i> 10:30AM-03:30PM</span> <span><i className="icon-map-o"></i> Venue Main Campus</span></p>
                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                    <p><a href="event.html">Join Event <i className="ion-ios-arrow-forward"></i></a></p>
                  </div>
                </div>
              </div> */}
              {/* <div className="col-md-4 d-flex ftco-animate">
                <div className="blog-entry align-self-stretch">
                  <a href="blog-single.html" className="block-20" style={{ backgroundImage: "url('" + cause_3 + "')" }}>
                  </a>
                  <div className="text p-4 d-block">
                    <div className="meta mb-3">
                      <div><a href="#">Sep. 10, 2018</a></div>
                      <div><a href="#">Admin</a></div>
                      <div><a href="#" className="meta-chat"><span className="icon-chat"></span> 3</a></div>
                    </div>
                    <h3 className="heading mb-4"><a href="#">World Wide Donation</a></h3>
                    <p className="time-loc"><span className="mr-2"><i className="icon-clock-o"></i> 10:30AM-03:30PM</span> <span><i className="icon-map-o"></i> Venue Main Campus</span></p>
                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                    <p><a href="event.html">Join Event <i className="ion-ios-arrow-forward"></i></a></p>
                  </div>
                </div>
              </div> */}
              {/* <div className="col-md-4 d-flex ftco-animate">
                <div className="blog-entry align-self-stretch">
                  <a href="blog-single.html" className="block-20" style={{ backgroundImage: "url('" + cause_4 + "')" }}>
                  </a>
                  <div className="text p-4 d-block">
                    <div className="meta mb-3">
                      <div><a href="#">Sep. 10, 2018</a></div>
                      <div><a href="#">Admin</a></div>
                      <div><a href="#" className="meta-chat"><span className="icon-chat"></span> 3</a></div>
                    </div>
                    <h3 className="heading mb-4"><a href="#">World Wide Donation</a></h3>
                    <p className="time-loc"><span className="mr-2"><i className="icon-clock-o"></i> 10:30AM-03:30PM</span> <span><i className="icon-map-o"></i> Venue Main Campus</span></p>
                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                    <p><a href="event.html">Join Event <i className="ion-ios-arrow-forward"></i></a></p>
                  </div>
                </div>
              </div> */}
              {/* <div className="col-md-4 d-flex ftco-animate">
                <div className="blog-entry align-self-stretch">
                  <a href="blog-single.html" className="block-20" style={{ backgroundImage: "url('" + cause_5 + "')" }}>
                  </a>
                  <div className="text p-4 d-block">
                    <div className="meta mb-3">
                      <div><a href="#">Sep. 10, 2018</a></div>
                      <div><a href="#">Admin</a></div>
                      <div><a href="#" className="meta-chat"><span className="icon-chat"></span> 3</a></div>
                    </div>
                    <h3 className="heading mb-4"><a href="#">World Wide Donation</a></h3>
                    <p className="time-loc"><span className="mr-2"><i className="icon-clock-o"></i> 10:30AM-03:30PM</span> <span><i className="icon-map-o"></i> Venue Main Campus</span></p>
                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                    <p><a href="event.html">Join Event <i className="ion-ios-arrow-forward"></i></a></p>
                  </div>
                </div>
              </div> */}
              {disasters.map((disaster) => (
              <div key={disaster._id} className="col-md-4 d-flex ftco-animate">
                <div className="blog-entry align-self-stretch" style={{width: "100%"}}>
                  <Link to={"/disasterdetail?id=" + disaster._id } className="block-20" style={{ backgroundImage: "url('" + cause_1 + "')" }}>
                  </Link>
                  <div className="text p-4 d-block">
                    <div className="meta mb-3">
                      <div>{disaster.date}</div>
                     
                      {/* <div>Admin</div>
                      <div><span className="icon-chat"></span> 3</div> */}
                    </div>
                    <h3 className="heading mb-4 "> <Link to={"/disasterdetail?id=" + disaster._id } >{disaster.dis_title}</Link></h3>
                    <p className="time-loc"><span className="mr-2"><i className="icon-clock-o"></i> </span> {disaster.dis_area}<span style={{ paddingLeft: "4px" }} ><i className="icon-map-o"></i>{disaster.dis_type} </span></p>
                    {/* <p>{disaster.Description.substring(0, 100)}</p> */}
                    <p><Link to={"/disasterdetail?id=" + disaster._id }>Read More <i className="ion-ios-arrow-forward"></i></Link></p>
                  </div>
                </div>
              </div>
              ))}
            </div>
            {/* <div className="row mt-5">
              <div className="col text-center">
                <div className="block-27">
                  <ul>
                    <li><a href="#">&lt;</a></li>
                    <li className="active"><span>1</span></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                    <li><a href="#">&gt;</a></li>
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
        </section>
        <Footer />
      </div>
    </>      
  )
}

export default Disasters

