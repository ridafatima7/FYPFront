import { Redirect,Link,useHistory} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  ModalFooter,
  Label,
  Alert,
  ModalHeader,
  ModalBody
} from "reactstrap";

const DEORegistration = () => {
  const [isregistered, setRegister]=useState(false);
  const toggle = () => setModal(!modal);
  const [id, setInformationid] = useState(null);
  const onDismissError = () => setError(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  function AddDEO(e) {
    e.preventDefault();
    const status = 'Active';
    const role = 'Donor';
    const name=e.target.elements.name.value;
    const email=e.target.elements.email.value;
    const password=e.target.elements.password.value;
    const confirm_password=e.target.elements.confirm_password.value;
    const phone_no=e.target.elements.phone_no.value;
    const username = e.target.username.value;
    const address = e.target.address.value;
    const description = e.target.description.value;
    if (password === confirm_password) {
      axios({
        method:'post',
        url:'http://localhost:8000/auth/register',
        data:{ id: id, name: name, email: email, username: username, password: password, phone_no: phone_no, address: address,
          description: description, role: role, Status: status}
      })
      .then(res=>{
        console.log(res);
        if(res.data.indicator==="success")
        {
          setRegister(true);
        }
        else if (res.data === "Already have an account") {
          setErrorMessage("Email already exists!");
          setError(true);
        }
        else if (res.data === "Username already exists!") {
          setErrorMessage("Username already exists!");
          setError(true);
       }
        else
        {
          setErrorMessage(res.data);
          setError(true);
        }
        console.log(res);
      })
      .catch(error=>{
        console.log(error);
      })
      
    }
    else {
      console.log("Please Retype Same Passwords !")
      setErrorMessage("Password does'nt matches!");
      setError(true);
  }
  if(isregistered)
      {
       history.push('/auth/login?Message=AccountRegisteredSuccessfully'); 
     }
    
 }
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody >
            
            <Form role="form" onSubmit={AddDEO}>
            <ModalHeader style={{ marginTop: '25px' }}><b style={{ fontSize: '24px', marginLeft: '170px', marginTop: '48px' }}>Register</b></ModalHeader>
                  <ModalBody>
                        {error ?
                          <Alert color="danger" isOpen={error} toggle={onDismissError}>
                                <strong> {errorMessage}</strong>
                          </Alert>
                                  :
                                  <></>
                                            //  <h4 style={{color: 'red'}}></h4> 
                                        }
                                        <FormGroup>
                                            <Label for="User">Name</Label>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-hat-3" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    name="name"
                                                    placeholder="Enter Name"
                                                    type="text"
                                                    required
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="username">User Name</Label>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-hat-3" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    name="username"
                                                    placeholder="Enter Username"
                                                    type="text"
                                                    required
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="username">Email</Label>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-email-83" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    name="email"
                                                    placeholder="Enter Email"
                                                    type="email"
                                                    required
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="username">Password</Label>

                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-lock-circle-open" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    name="password"
                                                    placeholder="Enter Password"
                                                    type="password"
                                                    required

                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="username">Confirm Password</Label>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-lock-circle-open" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    name="confirm_password"
                                                    placeholder="Confirm Password"
                                                    type="password"
                                                    required

                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="username">Phone No</Label>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-hat-3" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    name="phone_no"
                                                    placeholder="Enter Phone Number"
                                                    type="Number"
                                                // required
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="username">Address</Label>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-hat-3" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    name="address"
                                                    placeholder="Address"
                                                    type="text"
                                                    required
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="username">Description</Label>
                                            <InputGroup className="input-group-alternative mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-hat-3" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    name="description"
                                                    placeholder="Description"
                                                    type="text"
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </ModalBody>
                                    <ModalFooter className="text-center">
                                        <Button color="primary" type="submit" >
                                            Register
                                        </Button>{' '}
                                        {/* <Button color="secondary" onClick={toggle}>
                                            Cancel
                                        </Button> */}
                                    </ModalFooter>
                                </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default DEORegistration;