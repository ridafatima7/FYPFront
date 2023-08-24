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

const NgoReport = () => {
    const [modal, setModal] = useState(false);
const toggle = () => setModal(!modal);
const closeModal = () => setModal(false);
const [usertable, setUsertable] = useState()
	const [Error, setError] = useState("");
	const history = useHistory();
useEffect(() => {
    axios({
        withCredentials: true,
        method: 'get',
        url: 'http://localhost:8000/auth/get_user'
    })
        //.then((response) => response.json())
        .then((response) => {
            console.log(response)
            setUsertable(response.data)
        })
        .catch((error) => console.error('Error fetching data:', error));
}, []);
    return (
        <>
            <Modal isOpen={modal} toggle={toggle} size='lg'>
                <Form role="form"  >
                    <ModalHeader style={{ marginTop: '25px' }} className="text-center mx-auto" toggle={toggle}><b style={{ fontSize: '18px', marginLeft: '311px', marginTop: '48px' }} > Donate to NGO</b></ModalHeader>
                    <ModalBody>
                        <Row >
                            <Col md={6}>
                                <FormGroup>
                                <Label for="Ngo Name">
											NGO *
								</Label>
								<Input
											id="Ngo"
											name="ngo"
											type="select"
                                            required
								>
											<option disabled value=""> Please select NGO Name</option>
                                            <option value="All NGOs">All NGOs</option> 
											{usertable ?
											usertable

											.filter(row => row.role === 'NGO')
											.map((row, index) => {
											return (
											  
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
                            <Col md={6}>
              <FormGroup>
                <Label for="StartDate">
                Date
                </Label>
                <Input
                  id="startdate"
                  name="startdate"
                  type='date'
                  required
                  placeholder='Choose date '
                />
              </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                <Label for="EndDate">
                Date
                </Label>
                <Input
                  id="enddate"
                  name="enddate"
                  type='enddate'
                  required
                  placeholder='Choose date'
                />
              </FormGroup>
              </Col>
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
        </>
    )
}


export default NgoReport