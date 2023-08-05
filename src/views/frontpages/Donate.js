import Header from "./Header"
import Footer from "./Footer"
import { useState, useEffect } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Form,
	Input,
	Container,
	Row,
	Alert,
	Col,
	Label,
	Table,
	ModalHeader,
	ModalFooter,
	Modal,
	ModalBody
} from "reactstrap";
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
import donation from "assets/front-images/donation1.avif"
import rida from "assets/front-images/ridi.jpeg"
import isha from "assets/front-images/isha1.png"
import umaira from "assets/front-images/umaira1.png"
import waseem from "assets/front-images/waseem.png"
import abu from "assets/front-images/abu.jpg"
import imran from "assets/front-images/imran.jpg"
const storedUser = localStorage.getItem('user');
const user_info = JSON.parse(storedUser);
const Donate = () => {
	const [InformationTable, setInformationTable] = useState(false);
	const [ErrorMessage, setErrorMessage] = useState("");
	const[usertable, setUsertable] =useState()
	const [Error, setError] = useState("");
	const history = useHistory();
	const [donated, setDonated] = useState(false);
	const [MessageAlert, setMessage] = useState("");
	const onDismissDonate = () => setDonated(false);
	const onDismissError = () => setError(false)
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);
	const closeModal = () => setModal(false);
	useEffect(() => {
        axios({     
			withCredentials: true,
		   method:'get',
	       url:'http://localhost:8000/auth/get_user'
		})
	   //.then((response) => response.json())
	   .then((response) => {
		console.log(response)
		setUsertable(response.data)
	   })
	   .catch((error) => console.error('Error fetching data:', error));
	 }, []);
	function AddDonation(e) {

		e.preventDefault();
		const id = user_info._id;
		const name = e.target.name.value;
		const email = e.target.email.value;
		const amount = e.target.amount.value;
		const ngo = e.target.ngo.value;
		const phone_no = e.target.phone_no.value;
		e.preventDefault();
		axios({
			method: 'post',
			withCredentials: true,
			sameSite: 'none',
			url: "http://localhost:8000/donations/Donations",
			data: { name: name, email: email, amount: amount, ngo: ngo, phone_no: phone_no }

		})
			.then(res => {
				if (res.data.indicator == "success") {
					setDonated(true);
					setMessage("Donated successfully!")
				}
				else {
					setErrorMessage(res.data.messege);
					setError(true);
				}
				closeModal();
			})

			.catch(error => {
				console.log(error)
				if (error.response.data == "Not logged in") {
					localStorage.clear();
					history.push('/auth/login?Message=PleaseLoginFirst');
				}
				setErrorMessage("Failed to connect to backend");
				setError(true);
				console.log(error);
				closeModal();
			})
	};
	return (
		<div className="main-parent-class">
			<Header />
			<div className="hero-wrap" style={{ backgroundImage: "url('" + donation + "')" }} data-stellar-background-ratio="0.5">
				<div className="overlay"></div>
				<div className="container">

					<Alert color="danger" isOpen={Error} toggle={onDismissError}>
						<strong> {ErrorMessage} </strong>
					</Alert>
					<div className="row no-gutters slider-text align-items-center justify-content-center" data-scrollax-parent="true">
						<div className="col-md-7 ftco-animate text-center" data-scrollax=" properties: { translateY: '70%' }">
							{/* <p className="breadcrumbs" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"><span className="mr-2"><a href="index.html">Home</a></span> <span>Donate</span></p> */}
							
							<h1 className="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }" style={{ backgroundColor: 'black' }}>Donations</h1>
							<p><Button className="btn btn-primary py-3 px-5  mt-2 text-center" onClick={toggle}>Donate Now</Button></p>
						</div>
					</div>
					<Alert color="success" isOpen={donated} toggle={onDismissDonate}>
						<strong> {MessageAlert} </strong>
					</Alert>
					<Modal isOpen={modal} toggle={toggle} size='lg'>
						<Form role="form" onSubmit={AddDonation} >
							<ModalHeader className="text-center" toggle={toggle}><b>Donate to NGO</b></ModalHeader>
							<ModalBody>
								<Row >
									<Col md={6}>
										<FormGroup>
											<Label for="Disaster Type">
												Name
											</Label>
											<Input
												id="disasterType"
												name="name"
												placeholder="Enter Your Name"
												type="text"
											/>

										</FormGroup>
									</Col>
									<Col md={6}>
										<FormGroup>
											<Label for="Disaster Title">
												Email*
											</Label>
											<Input
												id="title"
												name="email"
												placeholder="Enter Your Email"
												type="text"
												required
											/>
										</FormGroup>
									</Col>


									<Col md={6}>
										<FormGroup>
											<Label for="Area XCoordinates">
												Phone No
											</Label>
											<Input
												id="Description"
												name="phone_no"
												placeholder="Enter Your phone No"
												type="text"
												required
											/>
										</FormGroup>
									</Col>
									<Col md={6}>
										<FormGroup>
											<Label for="Area XCoordinates">
												Donation Amount
											</Label>
											<Input
												id="xcoordinates"
												name="amount"
												placeholder="Enter Donation Amount"
												type="text"
												required
											/>
										</FormGroup>
									</Col>
									{/* <Col md={6}>
                  <FormGroup>
                    <Label for="Area YCoordinates">
                   Account No
                    </Label>
                    <Input
                      id="ycoordinates"
                      name="account_no"
                      placeholder="Enter Area Co-ordinates(Y)"
                      type="text"
                      required
                    />
                  </FormGroup>
                </Col> */}
								</Row>
								<Row>
									<Col md={6}>
										<FormGroup>
											<Label for="Ngo Name">
												NGO Name*
											</Label>
											<Input
												id="Ngo"
												name="ngo"
												type="select"
											>
												<option value=""> Please select NGO Name</option>
												{usertable ?
													usertable

														.filter(row => row.role === 'NGO')
														.map((row, index) => {
															return (
																//  <option value="Please select NGO Name"></option> 
															
																<option key={index} value={row.name}>
																	{row.name}
																</option>
															)
														})
													:
													<h1>No NGO Exists</h1>
												}
											</Input>
										</FormGroup>
									</Col>

									{/* <Col md={6}>
										<FormGroup>
											<Label for="population">
												NGO to Donate*
											</Label>
											<Input
												id="population"
												name="ngo"
												placeholder="Select NGo"
												type='text'
												required
											/>
										</FormGroup>
									</Col> */}
								</Row>

							</ModalBody>
							<ModalFooter>
								<Button color="primary" type="submit">
									Donate
								</Button>{' '}
								<Button color="secondary" onClick={toggle}>
									Cancel
								</Button>
							</ModalFooter>
						</Form>
					</Modal>
				</div>
			</div>
			<section className="ftco-section bg-light">
				<div className="container">
					{/* <div style={{ padddingTop:"1px"}}><h2 style={{ textAlign:"center"}}>Donors</h2></div> */}
					<div className="row">

						<div className="col-lg-4 d-flex mb-sm-4 ftco-animate">
							<div className="staff">
								<div className="d-flex mb-4">
									<div className="img" style={{ backgroundImage: "url('" + rida + "')" }}></div>
									<div className="info ml-4">
										<h3><a href="teacher-single.html">Rida fatima</a></h3>
										<span className="position">Donated Just now</span>
										<div className="text">
											<p>Donated <span>Rs.10000</span> for <a href="#">Children Needs Food</a></p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 d-flex mb-sm-4 ftco-animate">
							<div className="staff">
								<div className="d-flex mb-4">
									<div className="img" style={{ backgroundImage: "url('" + isha + "')" }}></div>
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
									<div className="img" style={{ backgroundImage: "url('" + umaira + "')" }}></div>
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
									<div className="img" style={{ backgroundImage: "url('" + waseem + "')" }}></div>
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
									<div className="img" style={{ backgroundImage: "url('" + abu + "')" }}></div>
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
									<div className="img" style={{ backgroundImage: "url('" + imran + "')" }}></div>
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
									<div className="img" style={{ backgroundImage: "url('" + person_7 + "')" }}></div>
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
									<div className="img" style={{ backgroundImage: "url('" + person_8 + "')" }}></div>
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
									<div className="img" style={{ backgroundImage: "url('" + person_9 + "')" }}></div>
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

			{/* <section className="ftco-section-3 img" style={{ backgroundImage: "url('" + bg_3 + "')" }}>
				<div className="overlay"></div>
				<div className="container">
					<div className="row d-md-flex">
						<div className="col-md-6 d-flex ftco-animate">
							<div className="img img-2 align-self-stretch" style={{ backgroundImage: "url('" + bg_4 + "')" }}></div>
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
			</section> */}

			<Footer />

		</div>)
}


export default Donate