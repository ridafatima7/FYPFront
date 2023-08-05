import { useState, useEffect } from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Table,
    Input,
    Container,
    Row,
    Modal, ModalHeader, ModalBody, ModalFooter, Alert,
    Col
} from "reactstrap";

import axios from 'axios'

// core components
import NewHeader from "components/Headers/NewHeader.js";
const storedUser = localStorage.getItem('user');
const user_info = JSON.parse(storedUser);

const DonationAdmin= () => {

    const [InformationTable, setInformationTable] = useState(false);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [subject, setSubject] = useState(null);
    const [message, setMessage] = useState(null);
    const [id, setInformationid] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [deletesuccess, setdeleteSuccess] = useState(false);
    const [tempId, setTempId] = useState('');
    const [tempName, setTempName] = useState('');
    const [deletemodal, setdeleteModal] = useState(false);
    const [error, setError] = useState(false);
    const onDismissdeleteSuccess = () => setdeleteSuccess(false);
    const DeletetoggleClose = () => {
        setdeleteModal(!deletemodal);
    }
    const Deletetoggle = (event) => {
        setTempId(event.target.attributes.getNamedItem('data-id').value);
        setTempName(event.target.attributes.getNamedItem('data-name').value);
        setdeleteModal(!deletemodal);
    };

    function GetInformation(e) {
        axios({
            // withCredentials : true,
            method: 'get',
            url: "http://localhost:8000/donations/getDonation",
        })
            .then(res => {
                if (res.data) {
                    console.log('error')
                    setInformationTable(res.data);
                }
            })
            .catch(error => {
                console.log('success')
                console.log(error);
            })
    }
    useEffect(() => {
        GetInformation();
    }, []);
    function DeleteDonation() {
        axios({     // DeleteMessage API Calling
            withCredentials: true,
            method: 'get',
            url: "http://localhost:8000/donations/deleteDonation?temp_id=" + tempId
        })
            .then(res => {
                if (res.data.indicator == "success") {
                    setdeleteSuccess(true);
                }
                else {
                    setError(true);
                    setErrorMessage(res.data.messege.message);
                }
                setdeleteModal(!deletemodal);
            })
            .catch(error => {
                console.log(error);
                setErrorMessage("Network Error!");
                setError(true);
                setdeleteModal(!deletemodal);
            })
    };
    return (
        <>
            <NewHeader />
            <Container className="mt--9" fluid>
                <Alert color="danger" isOpen={deletesuccess} toggle={onDismissdeleteSuccess}>
                    <strong> Donation record Deleted! </strong>
                </Alert>
                <Row>
                    <div className="col">
                        <Card className="bg-default shadow">
                            <CardHeader className="bg-transparent border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="text-white mb-0"><b>Donations</b></h3>
                                    </div>
                                </Row>
                            </CardHeader>

                            <Modal isOpen={deletemodal} toggle={DeletetoggleClose} size='sm'>
                                <ModalHeader toggle={DeletetoggleClose} onClick={DeleteDonation}>Delete Information</ModalHeader>
                                <ModalBody>
                                    Are you sure you want to delete <b>{tempName}</b>?
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" onClick={DeleteDonation}>
                                        Delete
                                    </Button>{' '}
                                    <Button color="secondary" onClick={DeletetoggleClose}>
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </Modal>


                            <Table className="align-items-center table-dark table-flush" responsive>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Phone No</th>
                                        <th scope="col">Action</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {InformationTable ?
                                        InformationTable.map((row, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">
                                                        <span className="mb-0 text-sm">
                                                            {row.name}
                                                        </span>
                                                    </th>
                                                    <td>{row.email}</td>
                                                    <td>
                                                        {row.address}
                                                    </td>
                                                    <td>
                                                        {row.username}
                                                    </td>
                                                    <td>
                                                        {row.phone_no}
                                                    </td>
                                                    <td>
                                                        {/* <Button color="primary" onClick={() => { FindInformation(row._id) }}>
                                                            <i className="ni ni-active-40"></i>
                                                        </Button> */}
                                                        <Button data-id={row._id} data-name={row.name} color="danger" onClick={Deletetoggle}>
                                                            <i className="ni ni-fat-remove"></i>
                                                        </Button>
                                                    </td>
                                                </tr>)
                                        })
                                        :
                                        <tr>
                                            <td span="5">No Donation record found!</td>
                                        </tr>
                                    }
                                </tbody>
                            </Table>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default DonationAdmin;