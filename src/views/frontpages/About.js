import Footer from "./Footer"
import Header from "./Header"

import "assets/front-css/animate.css"
import "assets/front-css/owl.carousel.min.css"
import "assets/front-css/owl.theme.default.min.css"
import "assets/front-css/style.scss"

// IMAGES
import bg_7 from "assets/front-images/bg_7.jpg"
import aboutus from "assets/front-images/2.webp"
import bg_3 from "assets/front-images/bg_3.jpg"
import person_1 from "assets/front-images/person_1.jpg"
import person_2 from "assets/front-images/person_2.jpg"
import person_3 from "assets/front-images/person_3.jpg"
import image_1 from "assets/front-images/image_1.jpg"
import image_2 from "assets/front-images/image_2.jpg"


const About = () => {
    return (
        <div className="main-parent-class">
        <Header />
        <div className="hero-wrap" style={{backgroundImage: "url('" + aboutus + "')"}}>
        <div className="container">
            <div className="row no-gutters slider-text align-items-center justify-content-center">
            <div className="col-md-7 text-center">
                <h1 className="mb-3 bread" style={{ backgroundColor: 'black' }}>About Us</h1>
            </div>
            </div>
        </div>
        </div>
    
    <section className="ftco-section">
    	<div className="container">
    		<div className="row d-flex">
    			<div className="col-md-6 d-flex ftco-animate">
    				<div className="img img-about align-self-stretch" style={{backgroundImage: "url('" + aboutus + "')"}}></div>
    			</div>
    			<div className="col-md-6 pl-md-5 ftco-animate">
    				<h2 className="mb-4">Welcome to <b>Disaster Information Cell</b> Established Since 2010</h2>
					<p>Disaster Information Cell is the lead agency at the Federal level to deal with the whole spectrum of Disaster Management activities.</p>
					<p>It is the executive arm of the National Disaster Management Commission (NDMC) which has been established under the Chairmanship of the Prime Minister as the apex policy making body in the field of Disaster Management. In the event of a disaster, all stakeholders including Government Ministries/Departments/Organizations, Armed Forces, INGOs, NGOs, UN Agencies work through and form part of the NDMA to conduct one window operations. </p>
					<p>DIC manages the whole Disaster Management Cycle (DMC) which includes Preparedness, Mitigation, Risk Reduction, Relief and Rehabilitation. A National Disaster Management Plan (NDMP) is prepared and is followed towards provision of better services to the affected ones.</p>
    			</div>
    		</div>
    	</div>
    </section>

     <section className="ftco-counter ftco-intro ftco-intro-2" id="section-counter">
    	<div className="container">
    		<div className="row no-gutters">
    			<div className="col-md-5 d-flex justify-content-center counter-wrap ftco-animate">
            <div className="block-18 color-1 align-items-stretch">
              <div className="text">
              	<span>Served Over</span>
                <strong className="number" data-number="1432805">0</strong>
                <span>Children in 190 countries in the world</span>
              </div>
            </div>
          </div>
          <div className="col-md d-flex justify-content-center counter-wrap ftco-animate">
            <div className="block-18 color-2 align-items-stretch">
              <div className="text">
              	<h3 className="mb-4">Donate Money</h3>
              	<p>Even the all-powerful Pointing has no control about the blind texts.</p>
              	<p><a href="#" className="btn btn-white px-3 py-2 mt-2">Donate Now</a></p>
              </div>
            </div>
          </div>
          <div className="col-md d-flex justify-content-center counter-wrap ftco-animate">
            <div className="block-18 color-3 align-items-stretch">
              <div className="text">
              	<h3 className="mb-4">Be a Volunteer</h3>
              	<p>Even the all-powerful Pointing has no control about the blind texts.</p>
              	<p><a href="#" className="btn btn-white px-3 py-2 mt-2">Be A Volunteer</a></p>
              </div>
            </div>
          </div>
    		</div>
    	</div>
    </section>

    {/* <section className="ftco-section bg-light">
      <div className="container">
      	<div className="row justify-content-center mb-5 pb-3">
          <div className="col-md-7 heading-section ftco-animate text-center">
            <h2 className="mb-4">Latest Donations</h2>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </div>
        </div>
        <div className="row">
        	<div className="col-lg-4 d-flex mb-sm-4 ftco-animate">
        		<div className="staff">
        			<div className="d-flex mb-4">
        				<div className="img" style={{backgroundImage: "url('" + person_1 + "')"}}></div>
        				<div className="info ml-4">
        					<h3><a href="teacher-single.html">Ivan Jacobson</a></h3>
        					<span className="position">Donated Just now</span>
        					<div className="text">
		        				<p>Donated <span>$300</span> for <a href="#">Children Needs Food</a></p>
		        			</div>
        				</div>
        			</div>
        		</div>
        	</div>
        	<div className="col-lg-4 d-flex mb-sm-4 ftco-animate">
        		<div className="staff">
        			<div className="d-flex mb-4">
        				<div className="img" style={{backgroundImage: "url('" + person_2 + "')"}}></div>
        				<div className="info ml-4">
        					<h3><a href="teacher-single.html">Ivan Jacobson</a></h3>
        					<span className="position">Donated Just now</span>
        					<div className="text">
		        				<p>Donated <span>$150</span> for <a href="#">Children Needs Food</a></p>
		        			</div>
        				</div>
        			</div>
        		</div>
        	</div>
        	<div className="col-lg-4 d-flex mb-sm-4 ftco-animate">
        		<div className="staff">
        			<div className="d-flex mb-4">
        				<div className="img" style={{backgroundImage: "url('" + person_3 + "')"}}></div>
        				<div className="info ml-4">
        					<h3><a href="teacher-single.html">Ivan Jacobson</a></h3>
        					<span className="position">Donated Just now</span>
        					<div className="text">
		        				<p>Donated <span>$250</span> for <a href="#">Children Needs Food</a></p>
		        			</div>
        				</div>
        			</div>
        		</div>
        	</div>
        </div>
      </div>
    </section> */}
		
    <Footer />
    
        </div> )
}

export default About