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
  const[gallery,setGallery1]=useState(null);
   const temp_img= "";
   const search = window.location.search;
	const params = new URLSearchParams(search);
	const id = params.get('id');
  useEffect(() => {
    
    fetch('http://localhost:8000/Information/GetInformationDetail') 
      .then((response) => response.json())
      .then((data) => {
       setDisasters(data);
      //  const temp_img1 = data[0].gallery[0].replace('public/', '')
	   	// setGallery1('http://localhost:8000/' + temp_img1);
  })
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
             
              {disasters.map((disaster) => (
              <div key={disaster._id} className="col-md-4 d-flex ftco-animate">
                <div className="blog-entry align-self-stretch" style={{width: "100%"}}>
                {/* { disasters.gallery  && disasters.gallery.length > 0 ?  */}
                  <Link to={"/disasterdetail?id=" + disaster._id } className="block-20" ><img src={'http://localhost:8000/'+disaster.gallery[0].replace('public/', '')} alt="" style={{width: '400px',height: '260px',objectFit: 'cover' }} />
                  </Link>
                   {/* :
                 <Link to={"/disasterdetail?id=" + disaster._id } className="block-20" ><img src={cause_5} alt="" style={{width: '400px',height: '260px',objectFit: 'cover' }} />
                 </Link>
                }  */}
                  <div className="text p-4 d-block">
                    <div className="meta mb-3">
                      <div>{disaster.date}</div>
                     
                      {/* <div>Admin</div>
                      <div><span className="icon-chat"></span> 3</div> */}
                    </div>
                    <h3 className="heading mb-4 "> <Link to={"/disasterdetail?id=" + disaster._id } >{disaster.dis_title}</Link></h3>
                    <p className="time-loc"><span className="mr-2"><i className="icon-clock-o"></i> </span> {disaster.dis_area}<span style={{ paddingLeft: "4px" }} ><i className="icon-map-o"></i>{disaster.dis_type} </span></p>
                     <p>{disaster.Description ? disaster.Description.substring(0,100): disaster.Description}</p> 
                    <p><Link to={"/disasterdetail?id=" + disaster._id }>Read More <i className="ion-ios-arrow-forward"></i></Link></p>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>      
  )
}

export default Disasters

