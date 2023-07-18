import Header from "./Header"
import Footer from "./Footer"

import "assets/front-css/animate.css"
import "assets/front-css/owl.carousel.min.css"
import "assets/front-css/owl.theme.default.min.css"
import "assets/front-css/style.scss"

// Images
import bg_6 from "assets/front-images/bg_6.jpg"
import bg_3 from "assets/front-images/bg_3.jpg"
import bg_4 from "assets/front-images/bg_4.jpg"
import person_1 from "assets/front-images/person_1.jpg"
import person_2 from "assets/front-images/person_2.jpg"
import person_3 from "assets/front-images/person_3.jpg"
import person_4 from "assets/front-images/person_4.jpg"
import person_5 from "assets/front-images/person_5.jpg"
import person_6 from "assets/front-images/person_6.jpg"
import person_7 from "assets/front-images/person_7.jpg"
import person_8 from "assets/front-images/person_8.jpg"
import person_9 from "assets/front-images/person_9.jpg"
import  donation from "assets/front-images/donation1.avif"
import  rida from "assets/front-images/ridi.jpeg"
import  isha from "assets/front-images/isha1.png"
import  umaira from "assets/front-images/umaira1.png"
import  waseem from "assets/front-images/waseem.png"
import  abu from "assets/front-images/abu.jpg"
import  imran from "assets/front-images/imran.jpg"
const Donate = () => {

    return (
        <div className="main-parent-class">
        <Header />
        <div className="hero-wrap" style={{backgroundImage: "url('" + donation + "')"}} data-stellar-background-ratio="0.5">
      <div className="overlay"></div>
      <div className="container">
        <div className="row no-gutters slider-text align-items-center justify-content-center" data-scrollax-parent="true">
          <div className="col-md-7 ftco-animate text-center" data-scrollax=" properties: { translateY: '70%' }">
             {/* <p className="breadcrumbs" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"><span className="mr-2"><a href="index.html">Home</a></span> <span>Donate</span></p> */}
            <h1 className="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"style={{ backgroundColor: 'black' }}>Donations</h1>
			<p><a href="/donations" className="btn btn-primary py-3 px-5  mt-2 text-center" >Donate Now</a></p>
          </div>
        </div>
      </div>
    </div>
    <section className="ftco-section bg-light">
      <div className="container">
        <div className="row">
        	<div className="col-lg-4 d-flex mb-sm-4 ftco-animate">
        		<div className="staff">
        			<div className="d-flex mb-4">
        				<div className="img" style={{backgroundImage: "url('" + rida + "')"}}></div>
        				<div className="info ml-4">
        					<h3><a href="teacher-single.html">Rida fatima</a></h3>
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
        				<div className="img" style={{backgroundImage: "url('" + isha + "')"}}></div>
        				<div className="info ml-4">
        					<h3><a href="teacher-single.html">Isha Tariq</a></h3>
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
        				<div className="img" style={{backgroundImage: "url('" + umaira + "')"}}></div>
        				<div className="info ml-4">
        					<h3><a href="teacher-single.html">Umaira shaheen</a></h3>
        					<span className="position">Donated Just now</span>
        					<div className="text">
		        				<p>Donated <span>$250</span> for <a href="#">Children Needs Food</a></p>
		        			</div>
        				</div>
        			</div>
        		</div>
        	</div>
        	<div className="col-lg-4 d-flex mb-sm-4 ftco-animate">
        		<div className="staff">
        			<div className="d-flex mb-4">
        				<div className="img" style={{backgroundImage: "url('" + waseem + "')"}}></div>
        				<div className="info ml-4">
        					<h3><a href="teacher-single.html">Mahir khan</a></h3>
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
        				<div className="img" style={{backgroundImage: "url('" + abu + "')"}}></div>
        				<div className="info ml-4">
        					<h3><a href="teacher-single.html">shah nawaz</a></h3>
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
        				<div className="img" style={{backgroundImage: "url('" + imran + "')"}}></div>
        				<div className="info ml-4">
        					<h3><a href="teacher-single.html">Imran khan</a></h3>
        					<span className="position">Donated Just now</span>
        					<div className="text">
		        				<p>Donated <span>$250</span> for <a href="#">Children Needs Food</a></p>
		        			</div>
        				</div>
        			</div>
        		</div>
        	</div>
        	<div className="col-lg-4 d-flex mb-sm-4 ftco-animate">
        		<div className="staff">
        			<div className="d-flex mb-4">
        				<div className="img" style={{backgroundImage: "url('" + person_7 + "')"}}></div>
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
        				<div className="img" style={{backgroundImage: "url('" + person_8 + "')"}}></div>
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
        				<div className="img" style={{backgroundImage: "url('" + person_9 + "')"}}></div>
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
        <div className="row mt-5">
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
        </div>
      </div>
    </section>

    <section className="ftco-section-3 img" style={{backgroundImage: "url('" + bg_3 + "')"}}>
    	<div className="overlay"></div>
    	<div className="container">
    		<div className="row d-md-flex">
    		<div className="col-md-6 d-flex ftco-animate">
    			<div className="img img-2 align-self-stretch" style={{backgroundImage: "url('" + bg_4 + "')"}}></div>
    		</div>
    		<div className="col-md-6 volunteer pl-md-5 ftco-animate">
    			<h3 className="mb-3">Be a volunteer</h3>
    			<form action="#" className="volunter-form">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Your Name" />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Your Email" />
            </div>
            <div className="form-group">
              <textarea name="" id="" cols="30" rows="3" className="form-control" placeholder="Message"></textarea>
            </div>
            <div className="form-group">
              <input type="submit" value="Send Message" className="btn btn-white py-3 px-5" />
            </div>
          </form>
    		</div>    			
    		</div>
    	</div>
    </section>
		
        <Footer />
    
        </div> )
}


export default Donate