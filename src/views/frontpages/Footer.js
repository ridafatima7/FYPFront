import "assets/front-css/animate.css"
import "assets/front-css/owl.carousel.min.css"
import "assets/front-css/owl.theme.default.min.css"
import "assets/front-css/style.scss"

// IMAGES
import image_1 from "assets/front-images/image_1.jpg"
import image_2 from "assets/front-images/image_2.jpg"

const Footer = () => {
    
    return (
        <div className="main-parent-class"> 
            <footer className="ftco-footer ftco-section img">
    	<div className="overlay"></div>
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-3">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">About Us</h2>
              <p>DIC manage complete spectrum of disasters by adopting a disaster impact reduction perspective in development planning at all levels, and through enhancing institutional capacities for disaster preparedness, response and recovery.</p>
              {/* <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                <li className="ftco-animate"><a href="#"><span className="icon-twitter"></span></a></li>
                <li className="ftco-animate"><a href="#"><span className="icon-facebook"></span></a></li>
                <li className="ftco-animate"><a href="#"><span className="icon-instagram"></span></a></li>
              </ul> */}
            </div>
          </div>
          <div className="col-md-4">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Recent Blog</h2>
              <div className="block-21 mb-4 d-flex">
                <a className="blog-img mr-4" style={{backgroundImage: "url('" + image_1 + "')"}}></a>
                <div className="text">
                  <h3 className="heading"><a href="#">Even the all-powerful Pointing has no control about</a></h3>
                  <div className="meta">
                    <div><a href="#"><span className="icon-calendar"></span> July 12, 2022</a></div>
                    <div><a href="#"><span className="icon-person"></span> Admin</a></div>
                    <div><a href="#"><span className="icon-chat"></span> 19</a></div>
                  </div>
                </div>
              </div>
              <div className="block-21 mb-4 d-flex">
                <a className="blog-img mr-4" style={{backgroundImage: "url('" + image_2 + "')"}}></a>
                <div className="text">
                  <h3 className="heading"><a href="#">Even the all-powerful Pointing has no control about</a></h3>
                  <div className="meta">
                    <div><a href="#"><span className="icon-calendar"></span> July 12, 2022</a></div>
                    <div><a href="#"><span className="icon-person"></span> Admin</a></div>
                    <div><a href="#"><span className="icon-chat"></span> 19</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2">
             <div className="ftco-footer-widget mb-4 ml-md-4">
              <h2 className="ftco-heading-2">Site Links</h2>
              <ul className="list-unstyled">
                <li><a href="#" className="py-2 d-block">Home</a></li>
                <li><a href="#" className="py-2 d-block">About</a></li>
                <li><a href="#" className="py-2 d-block">Donate</a></li>
                <li><a href="#" className="py-2 d-block">Causes</a></li>
                <li><a href="#" className="py-2 d-block">Event</a></li>
                <li><a href="#" className="py-2 d-block">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-3">
            <div className="ftco-footer-widget mb-4">
            	<h2 className="ftco-heading-2">Have a Questions?</h2>
            	<div className="block-23 mb-3">
	              <ul>
	                <li><span className="icon icon-map-marker"></span><span className="text">Constitution Avenue, Islamabad.</span></li>
	                <li><a href="#"><span className="icon icon-phone"></span><span className="text">+923056396692</span></a></li>
	                <li><a href="#"><span className="icon icon-envelope"></span><span className="text">disasterinformationcell@gmail.com</span></a></li>
	              </ul>
	            </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <p>Disaster Information Cell Copyright  &copy;<script>document.write(new Date().getFullYear());</script> 2023. All rights reserved.<i className="icon-heart" aria-hidden="true"></i>
             </p>
          </div>
        </div>
      </div>
    </footer> 

        </div>
    )
}

export default Footer