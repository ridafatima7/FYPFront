import Header from "./Header"
import Footer from "./Footer"
import axios from 'axios'
import contact from "assets/front-images/contact.avif"
import "assets/front-css/animate.css"
import "assets/front-css/owl.carousel.min.css"
import "assets/front-css/owl.theme.default.min.css"
import fourth from "assets/front-images/disaster6.jpg"
import  three from "assets/front-images/disaster3.jpg"
import  two from "assets/front-images/disaster2.jpeg"
import  seven from "assets/front-images/disaster7.jpeg"
import "assets/front-css/style.scss"
// import "assets/front-css/main.css"
// import "assets/front-css/all.min.css"
import React, { useState, useEffect } from 'react';

const DisasterDetail = () => {
    const [disasterDetail, setDisasterDetail] = useState([]);
	const [Title, setTitle]=useState(null);
	const[date,setDate]=useState(null);
	const[gallery,setGallery]=useState(null);
    const[Description,setDescription]=useState(null);
	
  useEffect(() => {
    const search = window.location.search;
	const params = new URLSearchParams(search);
	const id = params.get('id');
    fetch('http://localhost:8000/Information/GetDisaster?id=' +id) 
       .then((response) => response.json())
	//.then(res=>{
   .then((data) => {
	if(data){
		console.log('res.data=')
	    console.log(data[0]._id)
		setTitle(data[0].dis_title);
		setDate(data[0].date);
		setGallery(data[0].gallery);

		setDescription(data[0].description)
		// setInformationid(data._id);
        // setDisasterType(res.data.dis_type);
        // setArea(res.data. dis_area);
        // setPopulation(res.data.population);
        // setSurvivors(res.data.survivors);
        // setDeaths(res.data.deaths);
        // setShelters(res.data.shelters);
        // setFood(res.data.food);
        // setMedicine(res.data.medicine);
        
	}
	  })
      .catch((error) => console.error('Error fetching data:', error));

  }, []);
    return (
        <>      
		{/* <h1>{Title}</h1> */}
        <div className="main-parent-class">
        <Header />
        
           <div className="hero-wrap" style={{backgroundImage: "url('" + fourth + "')"}} data-stellar-background-ratio="0.5">

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
    
    <div className="breadcrumb-section breadcrumb-bg">
		<div className="container">
			<div className="row">
            {/* {disasterDetail
            .filter(row => row._id === id)
            .map((row,index) => ( */}
				<div className="col-lg-8 offset-lg-2 text-center">
					<div className="breadcrumb-text">
						<h1> {Title}</h1>
					</div>
				</div>
            {/* ))} */}
			</div>
		</div>
	</div>
    {/* {disasterDetail
    .filter(row => row._id === id)
    .map((row) => ( */}
    <div className="mt-150 mb-150">
		<div className="container">
			<div className="row">
             
				<div className="col-lg-8">
					<div className="single-article-section">
						<div className="single-article-text" >
                       
                        <div className="overlay " style={{backgroundImage: "url('" + seven + "')", height: "500px",width: "1100px",backgroundSize: "cover"}}></div>
							<div className="single-artcile-bg" ></div>
                            
							<p className="blog-meta"style={{ paddingTop: "10px" }} >
								{/* <span className="author" ><i className="fas fa-user"></i> Admin</span> */}
								<span className="date"><i className="fas fa-calendar"></i> {date}</span>
                                {/* <p>Read the Details</p> */}

							</p>
                            <div style={{ paddingTop: "1px" }}>
							<h2 >{Title}</h2>
                            <p>{gallery}</p>
							<p> {Description}</p>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint soluta, similique quidem fuga vel voluptates amet doloremque corrupti. Perferendis totam voluptates eius error fuga cupiditate dolorum? Adipisci mollitia quod labore aut natus nobis. Rerum perferendis, nobis hic adipisci vel inventore facilis rem illo, tenetur ipsa voluptate dolorem, cupiditate temporibus laudantium quidem recusandae expedita dicta cum eum. Quae laborum repellat a ut, voluptatum ipsa eum. Culpa fugiat minus laborum quia nam!</p>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, praesentium, dicta. Dolorum inventore molestias velit possimus, dolore labore aliquam aperiam architecto quo reprehenderit excepturi ipsum ipsam accusantium nobis ducimus laudantium.</p>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum est aperiam voluptatum id cupiditate quae corporis ex. Molestias modi mollitia neque magni voluptatum, omnis repudiandae aliquam quae veniam error! Eligendi distinctio, ab eius iure atque ducimus id deleniti, vel alias sint similique perspiciatis saepe necessitatibus non eveniet, quo nisi soluta.</p>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt beatae nemo quaerat, doloribus obcaecati odio!</p>
                            <div style={{ paddingTop: "30px" }}>
                            </div> 
                           <div>

						   </div>
                        </div>   
                        </div>
					</div>
				</div>
				<div className="col-lg-4">
					<div className="sidebar-section" style={{ paddingTop: "630px" }}>
						<div className="recent-posts">
							<h4>Disaster Pictures 1</h4>
                            <div className="overlay" style={{backgroundImage: "url('" + three + "')",backgroundSize: "cover", height: "150px",width: "340px"}}></div>

							{/* <ul>
								<li><a href="single-news.html">You will vainly look for fruit on it in autumn.</a></li>
								<li><a href="single-news.html">A man's worth has its season, like tomato.</a></li>
								<li><a href="single-news.html">Good thoughts bear good fresh juicy fruit.</a></li>
								<li><a href="single-news.html">Fall in love with the fresh orange</a></li>
								<li><a href="single-news.html">Why the berries always look delecious</a></li>
							</ul> */}
						</div>
						<div className="archive-posts">
							<h4>Disaster Pictures 2</h4>
                            <div className="overlay" style={{backgroundImage: "url('" + two + "')",backgroundSize: "cover", height: "150px",width: "340px"}}></div>

							{/* <ul>
								<li><a href="single-news.html">JAN 2019 (5)</a></li>
								<li><a href="single-news.html">FEB 2019 (3)</a></li>
								<li><a href="single-news.html">MAY 2019 (4)</a></li>
								<li><a href="single-news.html">SEP 2019 (4)</a></li>
								<li><a href="single-news.html">DEC 2019 (3)</a></li>
							</ul> */}
						</div>
						<div className="tag-section">
							{/* <h4>Tags</h4> */}
                            {/* <div className="overlay" style={{backgroundImage: "url('" + contact + "')", height: "550px",width: "380px"}}></div> */}

							{/* <ul>
								<li><a href="single-news.html">Apple</a></li>
								<li><a href="single-news.html">Strawberry</a></li>
								<li><a href="single-news.html">BErry</a></li>
								<li><a href="single-news.html">Orange</a></li>
								<li><a href="single-news.html">Lemon</a></li>
								<li><a href="single-news.html">Banana</a></li>
							</ul> */}
						</div>
					</div>
				</div>
                 
			</div>
           
		</div>
	</div>
   {/* ))} */}
	
	{/* <div className="logo-carousel-section">
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<div className="logo-carousel-inner">
						<div className="single-logo-item">
							<img src="assets/img/company-logos/1.png" alt="">
						</div>
						<div className="single-logo-item">
							<img src="assets/img/company-logos/2.png" alt="">
						</div>
						<div className="single-logo-item">
							<img src="assets/img/company-logos/3.png" alt="">
						</div>
						<div className="single-logo-item">
							<img src="assets/img/company-logos/4.png" alt="">
						</div>
						<div className="single-logo-item">
							<img src="assets/img/company-logos/5.png" alt="">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div> */}
		
        <Footer />
    
        </div> 
        </>     
        )
         
  }
  
  
  export default DisasterDetail