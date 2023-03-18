import Header from "./Header"

// IMAGES
import bg_7 from "assets/front-images/bg_7.jpg"

const Home = () => {
    return (
        <>
        <Header />
        <div className="hero-wrap" style={{backgroundImage: "url('" + bg_7 + "')"}}>
            <div className="container">
                <div className="row no-gutters slider-text align-items-center justify-content-center">
                <div className="col-md-7 text-center">
                    <h1 className="mb-4">Doing Nothing is Not An Option of Our Life</h1>
                    <p className="mb-5">Created by <a href="#">Colorlib.com</a></p>
                    <p><a href="https://vimeo.com/45830194" className="btn btn-white btn-outline-white px-4 py-3 popup-vimeo"><span className="icon-play mr-2"></span>Watch Video</a></p>
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
        </>
    )
}

export default Home