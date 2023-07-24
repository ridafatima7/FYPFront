import { useState} from 'react';
import { Redirect,Link, useHistory} from 'react-router-dom';
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
  Col
} from "reactstrap";

// core components
import UserHeader from "components/Headers/UserHeader.js";
import Header from "views/frontpages/Header.js"
const storedUser = localStorage.getItem('user');
const user_info = JSON.parse(storedUser);



const DonationData = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const [addsuccess, setaddSuccess] = useState(false);

  function EditProfile(e) {
    
    e.preventDefault();
    const id = user_info._id;
    const name = e.target.name.value;
     const email = e.target.email.value;
    const address = e.target.address.value;
    const phone_no = e.target.phone_no.value;
    const username = e.target.username.value;
    
    e.preventDefault();
    axios({     //edit profile on the base of id API Calling
      method: 'post',
      withCredentials: true,
      sameSite: 'none',
      url: "http://localhost:8000/donations/Donations",
      data: { name:name,email: email,address:address,phone_no:phone_no,username:username }
  
     })
      .then(res => {
        if (res.data.indicator == "success") {
          setaddSuccess(true);
        }
        else {
          setErrorMessage(res.data.messege);          
          setError(true);
        }
      })
      .catch(error => {
        console.log(error)
        if (error.response.data == "Not logged in") {
          localStorage.clear(); // Clear local storage
          history.push('/auth/login');
        }
        setErrorMessage("Failed to connect to backend");
        setError(true);
        console.log(error);
      })
  };

  const storedUser = localStorage.getItem('user');
  const user_info = JSON.parse(storedUser);

  return (
    <>
      <Header />
      <UserHeader />
     
      <Container  className="mt--7" fluid >
      <Row>
          <Col   className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader  className="bg-white border-0">
                <Row  className="align-items-center">
                  <Col xs="8" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '1px', paddingLeft: '240px' }}>
                    <h3 className="mb-0">Donate</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    {/* <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Settings
                    </Button> */}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form role="form" onSubmit={EditProfile} >
                  <h6 className="heading-small text-muted mb-4">
                    Donor information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Full Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Enter Full Name"
                            id="name"
                            name="name"
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="email"
                            name="email"
                            placeholder="Enter Email"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            UserName
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Enter Username"
                            id="input-first-name"
                            name="username"
                            placeholder="Enter Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Phone No
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Enter Phone number"
                            id="input-last-name"
                            name="phone_no"
                            placeholder="Enter Phone number"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      
                        
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Account information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Enter Address"
                            id="input-address"
                            name="address"
                            placeholder="Enter Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  {/* <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="New York"
                            id="input-city"
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="United States"
                            id="input-country"
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Postal code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            placeholder="Postal code"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div> */}
                  {/* <hr className="my-4" /> */}
                  {/* Description */}
                  {/* <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>About Me</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                        Open Source."
                        type="textarea"
                      />
                    </FormGroup>
                  </div> */}
                  <Button
                    style={{ background: '#f86f2d',display: 'flex', justifyContent: 'center' }}
                    // color="info"
                    // href="#pablo"
                    // backgroung="#f86f2d"
                    type='submit'
                    // onClick={(e) => e.preventDefault()}
                  >
                   Submit
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      
    </>
  );
};

export default DonationData;


