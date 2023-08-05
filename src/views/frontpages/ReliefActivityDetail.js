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
    const [gallery, setGallery] = useState(null);


    //   useEffect(() => {
    //     const search = window.location.search;
    // 	const params = new URLSearchParams(search);
    // 	const id = params.get('id');
    //     fetch('http://localhost:8000/Relief_Information/Reliefactivity?id=' +id) 
    //   .then((response) => response.json())
    // .then(res=>{
    //   .then((data) => {
    // if(res.data){
    //     console.log(res.data)
    //     setTitle(res.data.dis_title);
    //     setDate(res.data.date);
    // 	console.log(res.data.dis_title)
    //     setGallery(res.data.gallery);
    // setInformationid(data._id);
    // setDisasterType(res.data.dis_type);

    // setArea(res.data. dis_area);
    // setPopulation(res.data.population);
    // setSurvivors(res.data.survivors);
    // setDeaths(res.data.deaths);
    // setShelters(res.data.shelters);
    // setFood(res.data.food);
    // setMedicine(res.data.medicine);
    // 	}
    // 	  })
    //       .catch((error) => console.error('Error fetching data:', error));

    //   }, []);
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
                                                    <h2 style={{ textAlign:"center"}}>SANAMA SAEED NGO</h2>
                                                    <div className="for-style">
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi </p>
                                                    </div>
                                                    <div className="overlay" style={{ backgroundImage: "url('" + three + "')",  paddingTop:"60px",height: "500px",width: "1050px",backgroundSize: "cover" }} data-stellar-background-ratio="0.5"></div>
                                                    
                                                    <p style={{  paddingTop:"40px"}} >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                                    <h3><i className="fa fa-quote-left" aria-hidden="true"></i>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labo<i className="fa fa-quote-right" aria-hidden="true"></i></h3>
                                                    <div className="row" >
                                                        <div className="col-md-6" style={{  paddingTop:"25px", paddingRight:"300px", paddingLeft:"110px"}}>
                                                            <div className="image-one">
                                                            <div className="overlay" style={{ backgroundImage: "url('" + two + "')" , height: "300px",width: "400px",backgroundSize: "cover"}} data-stellar-background-ratio="0.5"></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6" style={{  paddingTop:"25px"}}>
                                                            <div className="image-two"  >
                                                            <div className="overlay" style={{ backgroundImage: "url('" + seven + "')" , height: "300px",width: "400px",backgroundSize: "cover"}} data-stellar-background-ratio="0.5"></div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p style={{  paddingTop:"40px"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui <a href="#">officia deserunt mollit</a> anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium </p>
                                                   
                                                </div>
                                                <div className="ads-area" style={{  paddingBottom:"25px"}}>
                                                    {/* <div style={{ backgroundImage: "url('" + fourth + "')" }} ></div>
                                                    <p>Your Ad Banner Goes Here</p> */}
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