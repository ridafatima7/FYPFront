import Header from "./Header"
import Footer from "./Footer"
import axios from 'axios'
import contact from "assets/front-images/contact.avif"
import "assets/front-css/animate.css"
import "assets/front-css/owl.carousel.min.css"
import "assets/front-css/owl.theme.default.min.css"
import fourth from "assets/front-images/disaster6.jpg"
import three from "assets/front-images/disaster3.jpg"
import two from "assets/front-images/disaster2.jpeg"
import seven from "assets/front-images/disaster7.jpeg"
import "assets/front-css/style.scss"
// import "assets/front-css/main.css"
// import "assets/front-css/all.min.css"
import React, { useState, useEffect } from 'react';

const ReliefActivityDetail = () => {
    const [disasterDetail, setDisasterDetail] = useState([]);
    const [Title, setTitle] = useState(null);
    const [date, setDate] = useState(null);
    const [Description, setDescription] = useState(null);
    const [NGO, setNGO] = useState(null);
    const [gallery, setGallery] = useState(null);
    const[shelters,setShelters]=useState(null);
    const[food,setFood]=useState(null);
    const[medicine,setMedicine]=useState(null);
    const[disaster,setDisaster]=useState(null);
    const[usertable, setUsertable] =useState();
    const[gallery2,setGallery2]=useState(null);
	const[gallery3,setGallery3]=useState(null);
	const[gallery4,setGallery4]=useState(null);
    const ngo='';
      useEffect(() => {
        const search = window.location.search;
    	const params = new URLSearchParams(search);
    	const id = params.get('id');
        fetch('http://localhost:8000/Relief_Information/Reliefactivity?id=' +id) 
        .then((response) => response.json())
    // .then(res=>{
       .then((data) => {
       if(data){
        console.log(data)
        setTitle(data[0].dis_title);
        setDate(data[0].date);
        setNGO(data[0].Ngo_Name);
        setDescription(data[0].description)
        setShelters(data[0].shelters);
        setFood(data[0].food);
        setMedicine(data[0].medicine);
        setDisaster(data[0].dis_type)
        fetchNGOData(data[0].Ngo_Name);
        const temp_img2 = data[0].gallery[1].replace('public/', '')
		setGallery2('http://localhost:8000/' + temp_img2);
		const temp_img3= data[0].gallery[2].replace('public/', '')
		setGallery3('http://localhost:8000/' + temp_img3);
        const temp_img4 = data[0].gallery[3].replace('public/', '')
		setGallery4('http://localhost:8000/' + temp_img4);
    	}
    	  })
          .catch((error) => console.error('Error fetching data:', error));
      }, []);
      const fetchNGOData = (ngo) => {
        axios({
          withCredentials: true,
          method: 'get',
          url: 'http://localhost:8000/auth/get_user?NGO=' + ngo,
        })
          .then((response) => {
            setUsertable(response.data);
            console.log(response);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      };
    return (
        <>

            <div className="main-parent-class">
                <Header />
                <div className="hero-wrap" style={{ backgroundImage: "url('" + fourth + "')" }} data-stellar-background-ratio="0.5">
                    <div className="overlay"></div>
                    <div className="container">
                        <div className="row no-gutters slider-text align-items-center justify-content-center" data-scrollax-parent="true">
                            <div className="col-md-7 ftco-animate text-center" data-scrollax=" properties: { translateY: '70%' }">
                                {/* <p className="breadcrumbs" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"><span className="mr-2"><a href="index.html">Home</a></span> <span>Contact</span></p> */}
                                <div>
                                    {/* <div style={{ paddingTop: '30%' }}> */}
                                    {/* <h1 className="mb-3 bread " data-scrollax="properties: { translateY: '30%', opacity: 1.6 ]}" >Contact Us</h1> */}
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <section className="single-blog-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="border-top">
                                        <div className="col-md-12">
                                            <div className="blog-area">
                                                <div className="blog-area-part" style={{  paddingTop:"40px"}}>
                                                    {/* <h2 style={{ textAlign:"center"}}>{NGO}</h2> */}
                                                    <div style={{  paddingTop:0}} className="text-center">
                                                    <h3><i className="fa fa-quote-left" aria-hidden="true"></i> {Title}<i className="fa fa-quote-right" aria-hidden="true"></i></h3>
                                                    </div>
                                                    <div className="for-style">
                                                    {/* {usertable ? 
                                                    <p>{usertable.description}</p>
                                                    : 
                                                    <></>
                                                    }       */}
                                                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi </p> */}
                                                    </div>
                                                    {/* <div className="overlay" style={{ backgroundImage: "url('" + three + "')",  paddingTop:"60px",height: "500px",width: "1050px",backgroundSize: "cover" }} data-stellar-background-ratio="0.5"></div>    */}
                                                    {gallery2 ?
                                                    <div style={{paddingTop:"20px"}}>
                                                        <img style={{height: "500px",width: "1050px",backgroundSize: "cover"}} src={gallery2} />
                                                    </div>
                                                    :
                                                    <div style={{paddingTop:"20px"}}>
                                                        <img style={{height: "500px",width: "1050px",backgroundSize: "cover"}} src={seven} />
                                                    </div>
                                                    }
                                                    {/* <p style={{  paddingTop:"40px"}} >{Description}</p> */}
                                                    <div style={{  paddingTop:"20px"}} >
                                                    {/* <h3><i className="fa fa-quote-left" aria-hidden="true"></i> {Title}<i className="fa fa-quote-right" aria-hidden="true"></i></h3> */}
                                                    <p style={{  paddingTop:"20px"}} >{Description}</p>
                                                    </div>
                                                  
                                                    <div className="row"  >
                                                        <div className="col-md-4" style={{  paddingTop:"105px", paddingRight:"50px", paddingLeft:"50px"}}>
                                                          <h3>Relief work Detail</h3>  
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
							                                <h6 style={{ margin: 0, marginRight: '15px' }}>Disaster:</h6>
							                                 <p style={{ margin: 0 }}>{disaster}</p>
                                                        </div>
							                            <div style={{ display: 'flex', alignItems: 'center' }}>
							                                 <h6 style={{ margin: 0, marginRight: '15px' }}>Shelters Provided:</h6>
							                                  <p style={{ margin: 0 }}>{shelters}</p>
							                             </div>
							                             <div style={{ display: 'flex', alignItems: 'center' }}>
							                                 <h6 style={{ margin: 0, marginRight: '15px' }}>Food Provided(Items):</h6>
							                                 <p style={{ margin: 0 }}>{food}</p>
							                             </div>
							                            <div style={{ display: 'flex', alignItems: 'center' }}>
							                                <h6 style={{ margin: 0, marginRight: '15px' }}>Medicines Provided(Items):</h6>
							                                <p style={{ margin: 0 }}>{medicine}</p>
							                           
                                                            {/* <div className="overlay" style={{ backgroundImage: "url('" + two + "')" , height: "300px",width: "400px",backgroundSize: "cover"}} data-stellar-background-ratio="0.5"></div> */}
                                                        </div>
                                                        </div>
                                                        <div className="col-md-4" style={{  paddingTop:"25px", paddingRight:"50px", paddingLeft:"50px"}}>
                                                            <div className="image-one">	
                                                            { gallery3 ? 						                              
                                                            <div>
                                                              <img style={{height: "300px",width: "300px",backgroundSize: "cover"}} src={gallery3} />
                                                           </div>
                                                           :
                                                           <div>
                                                             <img style={{height: "300px",width: "300px",backgroundSize: "cover"}} src={three} />
                                                          </div>
                                                            }
                                                             {/* <div className="overlay" style={{ backgroundImage: "url('" + two + "')" , height: "300px",width: "300px",backgroundSize: "cover"}} data-stellar-background-ratio="0.5"></div>  */}
                                                             </div>
                                                        </div>
                                                        <div className="col-md-4" style={{  paddingTop:"25px"}}>
                                                            <div className="image-two"  >
                                                            { gallery4 ? 
                                                            <div>
                                                               <img style={{height: "300px",width: "300px",backgroundSize: "cover"}} src={gallery4} />
                                                           </div>
                                                           :
                                                           <div>
                                                             <img style={{height: "300px",width: "300px",backgroundSize: "cover"}} src={two} />
                                                          </div>
                                                            }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <p style={{  paddingTop:"40px"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui <a href="#">officia deserunt mollit</a> anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium </p>     */}
                                                </div>
                                                <div className="ads-area pb-4" style={{  paddingBottom:"70px"}}>
                                                    {/* <div style={{ backgroundImage: "url('" + fourth + "')" }} ></div>
                                                    <p>Your Ad Banner Goes Here</p> */}
                                                    <div>
                                                    <p></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                <Footer />
            </div>
        </>
    )

}


export default ReliefActivityDetail