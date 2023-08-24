import React, { useRef } from 'react';
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
  Col,
  Alert
} from "reactstrap";
import { useState,useEffect} from 'react';
import { Redirect,Link,useHistory} from 'react-router-dom';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import InputMask from 'react-input-mask';

// core components
import UserHeader from "components/Headers/UserHeader.js";
import { isVariableStatement } from 'typescript';

const Profile = () => {
  const fileInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const [success, seteditSuccess] = useState("");
  const [rerender, setRerender] = useState("false");
  const [addsuccess, setaddSuccess] = useState(false);
  const onDismissaddSuccess = () => setaddSuccess(false);
  const [Success, setSuccess] = useState(false);
  const onDismissSuccess = () => setSuccess(false);
  const [SuccessMessage ,setSuccessMessage]=useState("")
  const location = useLocation();
  const onDismiss = () => setError(false);
  const history = useHistory();
  if(!localStorage.getItem("user"))
  {
      history.push("/auth")
  }

  const storedUser = localStorage.getItem('user');
  const user_info = JSON.parse(storedUser);
  var user_image = ""
  if(user_info.User_img)
  {
    user_image = user_info.User_img.replace('public/', '')
  }
  else{
    user_image = "/uploads/OIP.jpeg"
  }
  function EditPicture(e)
  {
    const id = user_info._id;
    const formData = new FormData();
    if(profile_pic)
    {
      formData.append('file', profile_pic);
    }
    e.preventDefault();
    axios({     
      method: 'post',
      withCredentials: true,
      sameSite: 'none',
      url: "http://localhost:8000/auth/EditPicture",
      data: formData,
     })
     .then(res => {
      if (res.data.indicator == "success") {
        setaddSuccess(true);

        if(profile_pic)
        {
          user_info.User_img=res.data.path;
          localStorage.setItem('user', JSON.stringify(user_info));
        }

        setRerender(!rerender);
      }
      else {
        setErrorMessage(res.data.messege);          
        setError(true);
      }
    })
      .catch(error => {
        console.log(error)
        if (error.response.data == "Not logged in") {
          localStorage.clear(); 
          history.push('/auth/login');
        }
        setErrorMessage("Failed to connect to backend");
        setError(true);
        console.log(error);
      })
  }
  function EditProfile(e) {
    
    e.preventDefault();
    const id = user_info._id;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const address = e.target.address.value;
    const phone_no = e.target.phone_no.value;
    const username = e.target.username.value;
    const description = e.target.description.value;
    const formData = new FormData();
    if(profile_pic)
    {
      formData.append('file', profile_pic);
    }
    formData.append('name', name);
    // formData.append('email', email);
    formData.append('address', address);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('phone_no', phone_no);
    formData.append('description', description);
    formData.append('id', id);
    e.preventDefault();
    axios({     
      method: 'post',
      withCredentials: true,
      sameSite: 'none',
      url: "http://localhost:8000/auth/EditProfile",
      data: formData,
     })
      .then(res => {
        if (res.data.indicator === "success") 
        {
          setaddSuccess(true);

          if(profile_pic)
          {
            user_info.User_img=res.data.path;
            localStorage.setItem('user', JSON.stringify(user_info));
          }
          user_info.name = name
          user_info.phone_no = phone_no
          user_info.username = username
          user_info.address = address
          user_info.email = email
          user_info.description = description
          localStorage.setItem("user", JSON.stringify(user_info))
          setRerender(!rerender);
        }
        else if (res.data.message === "Email already exists.") {
          setError(true);
          setErrorMessage("Email already exists.");
        } 
        else if (res.data.message === "Username already exists.") {
          setError(true);
          setErrorMessage("Username already exists.");
        }
        else
         {
          setErrorMessage(res.data.messege);          
          setError(true);
        }
      })
      .catch(error => {
        console.log(error)
        if (error.response.data == "Not logged in") {
          localStorage.clear(); 
          history.push('/auth/login');
        }
        setErrorMessage("Failed to connect to backend"); // same isues as in login etc
        setError(true);
        console.log(error);
      })
  };
       const[profile_pic, setProfile_Pic]=useState();
       const handleFileInputChange = (event) => {
       const file_1 = event.target.files[0];
       setProfile_Pic(file_1);
        EditProfile();
      // EditPicture();
 };
 useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get('Message');
  if (message) {
    setSuccess(true);
    setSuccessMessage('LoggedIn Successfully')
  }
}, [location.search]);
  
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--9" fluid>
     
      <Alert color="success" isOpen={addsuccess} toggle={onDismissaddSuccess}>
          <strong> Profile Updated Successfully! </strong> 
      </Alert>
      <Alert color="danger" isOpen={error} toggle={onDismiss}>
          <strong>Error! </strong> {errorMessage}
        </Alert>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Alert color="success" isOpen={Success} toggle={onDismissSuccess} style={{ width: '300px', height: '60px' }}>
              <strong>!- </strong>{SuccessMessage}
       </Alert>
      </div>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        //  src={require("../../assets/img/theme/team-4-800x800.jpg")}
                        src={`http://localhost:8000/${user_image}`}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                <Button
                      className="float-right"
                      color="default"
                      size="sm"
                      onClick={() => fileInputRef.current.click()}
                    >
                      Edit Image
                    </Button>
                    <input
                      id="fileInput"
                      name="file"
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      accept=".png, .jpg, .jpeg"
                      onChange={handleFileInputChange}
                    />
                  {/* <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Remove Picture
                  </Button> */}
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      {/* <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div> */}
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {user_info.name}
                    <span className="font-weight-light">, @{user_info.username} </span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {user_info.email}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {user_info.phone_no}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {user_info.address}
                  </div>
                  <hr className="my-4" />
                  <p defaultValue={" "}>
                    {user_info.description}
                  </p>

                  {/* <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a> */}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  {/* <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Settings
                    </Button>
                  </Col> */}
                </Row>
              </CardHeader>
              <CardBody>
                <Form role="form" onSubmit={EditProfile} >
                  <h6 className="heading-small text-muted mb-4">
                    Account information
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
                            defaultValue={user_info.name}
                            id="name"
                            name="name"
                            type="text"
                            style={{ color: 'black' }}
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
                            defaultValue={user_info.email}
                            type="email"
                            style={{ color: 'black' }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={user_info.username}
                            id="username"
                            name="username"
                            style={{ color: 'black' }}
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
                          <InputMask
                         style={{
                          border: 'none',
                          boxShadow: 'none',
                          padding: '0.375rem 0.75rem',
                          height: '40px',
                          width: '285px',
                          borderRadius: '8px',
                        
                         }}
                         className="form-control-alternative"
                       mask="0399-9999999" 
                       maskChar="_"
                       id="phone_no"
                       name="phone_no"
                       placeholder="Enter phone No"
                       type="text"
                      defaultValue={user_info.phone_no}
                      />
                          {/* <Input
                            className="form-control-alternative"
                            defaultValue={user_info.phone_no}
                            id="input-last-name"
                            name="phone_no"
                            placeholder={user_info.phone_no}
                            style={{ color: 'black' }}
                            type="text"
                          /> */}
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                    {user_info.role === "NGO" && (
                    <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="accountno"
                          >
                            Account No
                          </label>
                          <InputMask
                         style={{
                          border: 'none',
                          boxShadow: 'none',
                          padding: '0.375rem 0.75rem',
                          height: '40px',
                          width: '560px',
                          borderRadius: '8px', 
                          // border: '1px solid #ccc'
                         }}
                         className="form-control-alternative"
                       mask="0399-9999999" 
                       maskChar="_"
                       id="accountno"
                       name="accountno"
                       placeholder="Enter Account No"
                       type="text"
                      defaultValue={user_info.account_no}
                 
                      
                      />
                          {/* <Input
                            className="form-control-alternative"
                            defaultValue={user_info.account_no}
                            id="accountno"
                            name="accountno"
                            style={{ color: 'black' }}
                            type="text"
                          /> */}
                        </FormGroup>
                      </Col>
                    )}
                    <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={user_info.address}
                            id="input-first-name"
                            name="address"
                            placeholder={user_info.address}
                            type="text"
                            style={{ color: 'black' }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Description
                          </label>
                          <textarea
                            className="form-control-alternative"
                            id="description"
                            style={{ width: '600px',height: '89px'}} 
                            name="description"
                            placeholder="Enter Your  Bio"
                            type="text"
                            defaultValue={user_info.description}
                          />
                        </FormGroup>
                      </Col>
                      {/* <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Profile Photo
                          </label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue={user_info.address}
                            id="picture"
                            name="picture"
                            // placeholder={user_info.address}
                            type="text"
                          />
                        </FormGroup>
                      </Col> */}
                    </Row>
                  </div>
                  <div style={{ paddingLeft:'260px', justifyContent: 'center',width:'120px' }}>
                  <Button
                            
                            color="info"
                            // backgroung="#f86f2d"
                            // onClick={(e) => e.preventDefault()}
                            // onClick={EditProfile}
                            type="submit"
                          >
                            Save
                          </Button>
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
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
