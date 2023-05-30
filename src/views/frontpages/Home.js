import Header from "./Header"
import Footer from "./Footer"

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
  import fourth from "assets/front-images/fourth.jpg"



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
	return (
		
        <div className="main-parent-class">
        <Header />
        <div className="hero-wrap" style={{backgroundImage: "url('" + fourth + "')"}}>
            <div className="container">
                <div className="row no-gutters slider-text align-items-center justify-content-center">
                <div className="col-md-7 text-center">
                    <h1 className="mb-4">Doing Nothing is Not An Option of Our Life</h1>
                    <p className="mb-5">Created by <a href="#">Colorlib.com</a></p>
                    <p><a href="https: vimeo.com/45830194" className="btn btn-white btn-outline-white px-4 py-3 popup-vimeo"><span className="icon-play mr-2"></span>Watch Video </a></p>
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
                    <span>Served Over</span>
                    <strong className="number">1,432,805</strong>
                    <span>Children in 190 countries in the world</span>
                </div>
                </div>
            </div>
            <div className="col-md d-flex justify-content-center counter-wrap">
                <div className="block-18 color-2 align-items-stretch">
                <div className="text">
                    <h3 className="mb-4">Donate Money</h3>
                    <p>Even the all-powerful Pointing has no control about the blind texts.</p>
                    <p><a href="#" className="btn btn-white px-3 py-2 mt-2">Donate Now</a></p>
                </div>
                </div>
            </div>
            <div className="col-md d-flex justify-content-center counter-wrap">
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

        <section className="ftco-section bg-light">
    	<div className="container-fluid">
    		<div className="row justify-content-center mb-5 pb-3">
          <div className="col-md-5 heading-section   text-center">
            <h2 className="mb-4">Our Causes</h2>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </div>
        </div>
    		<div className="row">
    			<div className="col-md-12  ">
    				<div className="row">
	    				<div className="item col-md-3">
	    					<div className="cause-entry">
		    					{/* <a href="#" className="img" style="background-image: url('" + cause_1 + "');"></a> */}
                                <a href="#" className="img" style={{backgroundImage: "url('" + cause_1 + "')"}} ></a>

		    					<div className="text p-3 p-md-4">
		    						<h3><a href="#">Clean water for the urban area</a></h3>
		    						<p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life</p>
		    						<span className="donation-time mb-3 d-block">Last donation 1w ago</span>
		                <div className="progress custom-progress-success">
		                  <div className="progress-bar bg-primary" role="progressbar" style={{width: "28%" }}aria-valuenow="28" aria-valuemin="0" aria-valuemax="100"></div>
		                </div>
		                <span className="fund-raised d-block">$12,000 raised of $30,000</span>
		    					</div>
		    				</div>
	    				</div>
	    				<div className="item col-md-3">
	    					<div className="cause-entry">
		    					{/* <a href="#" className="img" style="background-image: url(images/cause_2.jpg);"></a> */}
                                <a href="#" className="img" style={{backgroundImage: "url('" + cause_2 + "')"}}></a>

		    					<div className="text p-3 p-md-4">
		    						<h3><a href="#">Clean water for the urban area</a></h3>
		    						<p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life</p>
		    						<span className="donation-time mb-3 d-block">Last donation 1w ago</span>
		                <div className="progress custom-progress-success">
		                  <div className="progress-bar bg-primary" role="progressbar" style={{width:" 28%" }} aria-valuenow="28" aria-valuemin="0" aria-valuemax="100"></div>
		                </div>
		                <span className="fund-raised d-block">$12,000 raised of $30,000</span>
		    					</div>
		    				</div>
	    				</div>
	    				<div className="item col-md-3">
	    					<div className="cause-entry">
		    					<a href="#" className="img" style={{backgroundImage: "url('" + cause_3 + "')"}}></a>
		    					<div className="text p-3 p-md-4">
		    						<h3><a href="#">Clean water for the urban area</a></h3>
		    						<p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life</p>
		    						<span className="donation-time mb-3 d-block">Last donation 1w ago</span>
		                <div className="progress custom-progress-success">
		                  <div className="progress-bar bg-primary" role="progressbar" style={{width:" 28%" }} aria-valuenow="28" aria-valuemin="0" aria-valuemax="100"></div>
		                </div>
		                <span className="fund-raised d-block">$12,000 raised of $30,000</span>
		    					</div>
		    				</div>
	    				</div>
	    				<div className="item col-md-3">
	    					<div className="cause-entry">
		    					<a href="#" className="img" style={{backgroundImage: "url('" + cause_4 + "')"}}></a>
		    					<div className="text p-3 p-md-4">
		    						<h3><a href="#">Clean water for the urban area</a></h3>
		    						<p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life</p>
		    						<span className="donation-time mb-3 d-block">Last donation 1w ago</span>
		                <div className="progress custom-progress-success">
		                  <div className="progress-bar bg-primary" role="progressbar" style={{width:" 28%" }} aria-valuenow="28" aria-valuemin="0" aria-valuemax="100"></div>
		                </div>
		                <span className="fund-raised d-block">$12,000 raised of $30,000</span>
		    					</div>
		    				</div>
	    				</div>
	    				 <div className="item col-md-3">
	    					<div className="cause-entry">
		    					<a href="#" className="img" style={{backgroundImage: "url('" + cause_5 + "')"}}></a>
		    					<div className="text p-3 p-md-4">
		    						<h3><a href="#">Clean water for the urban area</a></h3>
		    						<p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life</p>
		    						<span className="donation-time mb-3 d-block">Last donation 1w ago</span>
		                <div className="progress custom-progress-success">
		                  <div className="progress-bar bg-primary" role="progressbar" style={{width:" 28%" }} aria-valuenow="28" aria-valuemin="0" aria-valuemax="100"></div>
		                </div>
		                <span className="fund-raised d-block">$12,000 raised of $30,000</span>
		    					</div>
		    				</div>
	    				</div>
	    				<div className="item col-md-3">
	    					<div className="cause-entry">
		    					<a href="#" className="img" style={{backgroundImage: "url('" + cause_6 + "')"}}></a>
		    					<div className="text p-3 p-md-4">
		    						<h3><a href="#">Clean water for the urban area</a></h3>
		    						<p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life</p>
		    						<span className="donation-time mb-3 d-block">Last donation 1w ago</span>
		                <div className="progress custom-progress-success">
		                  <div className="progress-bar bg-primary" role="progressbar" style={{width:" 28%" }} aria-valuenow="28" aria-valuemin="0" aria-valuemax="100"></div>
		                </div>
		                <span className="fund-raised d-block">$12,000 raised of $30,000</span>
		    					</div>
		    				</div>
	    				</div>
    				</div>
    			</div>
    		</div>
    	</div>
    </section>

    <section className="ftco-section">
      <div className="container">
      	<div className="row justify-content-center mb-5 pb-3">
          <div className="col-md-7 heading-section   text-center">
            <h2 className="mb-4">Latest Donations</h2>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </div>
        </div>
        <div className="row">
        	<div className="col-lg-4 d-flex mb-sm-4  ">
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
        	<div className="col-lg-4 d-flex mb-sm-4  ">
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
        	<div className="col-lg-4 d-flex mb-sm-4  ">
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
    </section>

	<section className="ftco-gallery">
    	<div className="d-md-flex">
	    	<a href="images/cause-2.jpg" className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate" style={{backgroundImage: "url('" + cause_2 + "')"}}>
	    		<div className="icon d-flex justify-content-center align-items-center">
	     			<span className="icon-search"></span>
	     		</div>
	    	</a>
	     	<a href="images/cause-3.jpg" className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate" style={{backgroundImage: "url('" + cause_3 + "')"}} >
	    		<div className="icon d-flex justify-content-center align-items-center">
	     			<span className="icon-search"></span>
	    		</div>
	   	</a>
	    	<a href="images/cause-4.jpg" className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate" style={{backgroundImage: "url('" + cause_4 + "')"}}>
	    		<div className="icon d-flex justify-content-center align-items-center">
	    			<span className="icon-search"></span>
	     		</div>
	     	</a>
	      	<a href="images/cause-5.jpg" className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate" style={{backgroundImage: "url('" + cause_5 + "')"}}>
	      		<div className="icon d-flex justify-content-center align-items-center">
	      			<span className="icon-search"></span>
	      		</div>
	      	</a>
      	</div>
      	<div className="d-md-flex">
	      	<a href="images/cause-6.jpg" className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate" style={{backgroundImage: "url('" + cause_6 + "')"}}>
	      		<div className="icon d-flex justify-content-center align-items-center">
	      			<span className="icon-search"></span>
	      		</div>
	      	</a>
	      	<a href="images/image_3.jpg" className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate" style={{backgroundImage: "url('" + image_3 + "')"}}>
	      		<div className="icon d-flex justify-content-center align-items-center">
	      			<span className="icon-search"></span>
	      		</div>
	      	</a>
	      	<a href="images/image_1.jpg" className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate" style={{backgroundImage: "url('" + image_1 + "')"}}>
	      		<div className="icon d-flex justify-content-center align-items-center">
	      			<span className="icon-search"></span>
	      		</div>
	      	</a>
	      	<a href="images/image_2.jpg" className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate" style={{backgroundImage: "url('" + image_2 + "')"}}>
	      		<div className="icon d-flex justify-content-center align-items-center">
	      			<span className="icon-search"></span>
	      		</div>
	      	</a>
	      </div>
      </section>

      <section className="ftco-section">
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
                <a href="blog-single.html" className="block-20" style={{backgroundImage: "url('" + image_1 + "')"}}>
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
                <a href="blog-single.html" className="block-20" style={{backgroundImage: "url('" + image_2 + "')"}}>
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
                <a href="blog-single.html" className="block-20" style={{backgroundImage: "url('" + image_3 + "')"}}>
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
      </section>

      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-3">
            <div className="col-md-7 heading-section ftco-animate text-center">
              <h2 className="mb-4">Our Latest Events</h2>
            </div>
          </div>
          <div className="row">
          	<div className="col-md-4 d-flex ftco-animate">
            	<div className="blog-entry align-self-stretch">
                <a href="blog-single.html" className="block-20" style={{backgroundImage: "url('" + event_1 + "')"}}>
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
            </div>
            <div className="col-md-4 d-flex ftco-animate">
            	<div className="blog-entry align-self-stretch">
                <a href="blog-single.html" className="block-20" style={{backgroundImage: "url('" + event_2 + "')"}}>
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
            </div>
            <div className="col-md-4 d-flex ftco-animate">
            	<div className="blog-entry align-self-stretch">
                <a href="blog-single.html" className="block-20" style={{backgroundImage: "url('" + event_3 + "')"}}>
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
    </div>
		
    )
}

export default Home;