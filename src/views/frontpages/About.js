import Header from "./Header"

// IMAGES
import bg_7 from "assets/front-images/bg_7.jpg"

const About = () => {
    return (
        <>
        <Header />
        <div className="hero-wrap" style={{backgroundImage: "url('" + bg_7 + "')"}}>
        <div className="container">
            <div className="row no-gutters slider-text align-items-center justify-content-center">
            <div className="col-md-7 text-center">
                <h1 className="mb-3 bread">About Us</h1>
            </div>
            </div>
        </div>
        </div>
        </> )
}

export default About