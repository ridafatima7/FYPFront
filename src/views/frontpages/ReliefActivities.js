import Header from "./Header"
import Footer from "./Footer"
import React, { useState, useEffect } from 'react';
import event_1 from "assets/front-images/event_1.jpg"
import bg_5 from "assets/front-images/disaster5.jpg"
import { Link } from "react-router-dom"

const ReliefActivities = () => {
  const [reliefActivities, setReliefActivities] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/Relief_Information/GetInformationDetail') 
      .then((response) => response.json())
      .then((data) => setReliefActivities(data))
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
                <h1 className="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }" style={{ backgroundColor: 'black' }}>Relief operations</h1>
              </div>
            </div>
          </div>
        </div>

        <section className="ftco-section">
          <div className="container">
            <div className="row">
             {reliefActivities.map((reliefActivity) => (
              <div  key={reliefActivity._id} className="col-md-4 d-flex ftco-animate">
                <div className="blog-entry align-self-stretch" style={{width: "100%"}}>
                {/* <Link to={"/reliefActivitydetail?id=" + reliefActivity._id } className="block-20" style={{ backgroundImage: "url('" + event_1 + "')" }} >
                  </Link> */}
                  { reliefActivity.gallery[0] ? 
                   <Link to={"/reliefActivitydetail?id=" + reliefActivity._id } className="block-20" ><img src={'http://localhost:8000/'+reliefActivity.gallery[0].replace('public/', '')} alt="" style={{width: '400px',height: '260px',objectFit: 'cover' }} /></Link> :
                   <Link to={"/reliefActivitydetail?id=" + reliefActivity._id } className="block-20" ><img src={event_1} alt="" style={{width: '400px',height: '260px',objectFit: 'cover' }} /></Link>
                  }
                  <div className="text p-4 d-block">
                    <div className="meta mb-3">
                      <div>{reliefActivity.Ngo_Name}</div>
                      {/* <div>Admin</div>
                      <div><span className="icon-chat"></span> 3</div> */}
                    </div>
                    <h3 className="heading mb-4"><Link to={"/reliefActivitydetail?id=" + reliefActivity._id }>{reliefActivity.dis_title}</Link></h3>
                    <p className="time-loc"><span className="mr-2">{reliefActivity.dis_type}</span> <span style={{ paddingLeft: "1px" }} > {reliefActivity.date}</span></p>
                    <p>{reliefActivity.description.substring(0, 100)}</p>
                    <p><Link to={"/reliefActivitydetail?id=" + reliefActivity._id }>Learn More <i className="ion-ios-arrow-forward"></i></Link></p>
                   
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

export default ReliefActivities;