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
    Label,
    Modal, ModalHeader, ModalBody, ModalFooter, Alert,
    Col,
    Badge
} from "reactstrap";

import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

// core components
import NewHeader from "components/Headers/NewHeader.js";
const storedUser = localStorage.getItem('user');
const user_info = JSON.parse(storedUser);

const Messages = () => {

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
    const [filtered_users, setFilteredUsers] = useState('');
    const [currentUser, setCurrentUser] = useState("No Email Selected Yet")

    const handleUserChange = (e) => {
        const email = e.target.value;
        setCurrentUser(email);
        if (email === "No Email Selected Yet") {
            setFilteredUsers(InformationTable);
          } else {
            const filteredUsers = InformationTable.filter((user) => user.email === email);
            setFilteredUsers(filteredUsers);
          }
    };
    function GetInformation(e) {
        axios({
            method: 'get',
            url: "http://localhost:8000/ContactUs/GetMessages",
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
    function FindInformation(id) {

        axios({     //FindOneInformation on the base of id API Calling
            withCredentials: true,
            method: 'get',
            url: "http://localhost:8000/ContactUs/FindMessages?temp_id=" + id
        })
            .then(res => {
                if (res.data) {
                    setInformationid(res.data._id);
                    setName(res.data.name);
                    setEmail(res.data.email);
                    setSubject(res.data.subject);
                    setMessage(res.data.message);
                }
            })
            .catch(error => {

                console.log(error);
                //   setError(true);
                //   setEditModal(!editmodal); 
            })
    };
    function DeleteMessages() {
        axios({     // DeleteMessage API Calling
            withCredentials: true,
            method: 'get',
            url: "http://localhost:8000/ContactUs/deleteMessages?temp_id=" + tempId
        })
            .then(res => {
                if (res.data.indicator == "success") {
                    setdeleteSuccess(true);
                    GetInformation();
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
                <Alert color="success" isOpen={deletesuccess} toggle={onDismissdeleteSuccess}>
                    <strong> Feedback has Deleted! </strong>
                </Alert>
                <Row>
                    <div className="col">
                        <Card className="bg-default shadow">
                            <CardHeader className="bg-transparent border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="text-white mb-0"><b>Feedback</b></h3>
                                    </div>
                                    <Row>
                                        <div className="col text-right">
                                            <div className="col">
                                                <Input
                                                    id="user"
                                                    name="user"
                                                    type="select"
                                                    onChange={handleUserChange}
                                                    value={currentUser}
                                                >
                                                    <option value="No Email Selected Yet">No Email Selected Yet</option>
                                                    {InformationTable && InformationTable.length > 0 ? (
                                                        [...new Set(InformationTable.map(row => row.email))].map((email, index) => (
                                                            <option key={index} value={email}>
                                                                {email}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <option disabled>No feeback has given yet!</option>
                                                    )}
                                                </Input>
                                                <Label for="user" style={{marginRight:'36px'}}> Search Feedback by Email</Label>
                                            </div>
                                        </div>
                                    </Row>


                                </Row>
                            </CardHeader>

                            <Modal isOpen={deletemodal} toggle={DeletetoggleClose} size='sm'>
                                <ModalHeader toggle={DeletetoggleClose} onClick={DeleteMessages}>Delete Information</ModalHeader>
                                <ModalBody>
                                    Are you sure you want to delete this information ?
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" onClick={DeleteMessages}>
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
                                        <th scope="col" style={{ textAlign: 'center' }}>Name</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>Email</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>Subject</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>Message</th>
                                        <th scope="col">Action</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                {filtered_users.length > 0 ?
                                                filtered_users.map((row, index) => {
                                                return (
                                            // const uniqueId = `dis_${index + 1}`;
                                                // <tr key={uniqueId}>
                                                <tr key={index}>
                                                    {/* <td>
                                                <i className="ni ni-book-bookmark text-blue"/>
                                                    <span className="mb-0 text-sm">
                                                    {uniqueId}
                                                    </span>
                                                </td> */}
                                                    <th scope="row">
                                                        <i className="ni ni-book-bookmark text-blue" />
                                                        <span className="mb-0 text-sm">

                                                            <td>{row.name}</td>
                                                        </span>
                                                    </th>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Badge color="" className="badge-dot">
                                                            <i className="bg-info" />
                                                            {row.email}
                                                        </Badge>
                                                    </td>
                                                    <td>
                                                        {row.subject}
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Badge color="" className="badge-dot">
                                                            <i className="bg-info" />
                                                            {row.message}
                                                        </Badge>
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        {/* <Button color="primary" onClick={() => { FindInformation(row._id) }}>
                                                            <i className="ni ni-active-40"></i>
                                                        </Button> */}
                                                        <Button data-id={row._id} data-name={row.name} color="danger" onClick={Deletetoggle}>
                                                            <i className="ni ni-fat-remove"></i>
                                                        </Button>
                                                    </td>
                                                </tr>
                                                  )
                                                })
                                                :
                                                InformationTable && InformationTable .length > 0 && currentUser == "No Email Selected Yet" ? (
                                                    InformationTable .map((row, index) => (
                                                        <tr key={index}>
                                                        {/* <td>
                                                    <i className="ni ni-book-bookmark text-blue"/>
                                                        <span className="mb-0 text-sm">
                                                        {uniqueId}
                                                        </span>
                                                    </td> */}
                                                        <th scope="row">
                                                            <i className="ni ni-book-bookmark text-blue" />
                                                            <span className="mb-0 text-sm">
    
                                                                <td>{row.name}</td>
                                                            </span>
                                                        </th>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <Badge color="" className="badge-dot">
                                                                <i className="bg-info" />
                                                                {row.email}
                                                            </Badge>
                                                        </td>
                                                        <td>
                                                            {row.subject}
                                                        </td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <Badge color="" className="badge-dot">
                                                                <i className="bg-info" />
                                                                {row.message}
                                                            </Badge>
                                                        </td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            {/* <Button color="primary" onClick={() => { FindInformation(row._id) }}>
                                                                <i className="ni ni-active-40"></i>
                                                            </Button> */}
                                                            <Button data-id={row._id} data-name={row.name} color="danger" onClick={Deletetoggle}>
                                                                <i className="ni ni-fat-remove"></i>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                    ))
                                                    ) :
                                
                                                      <tr>
                                                        <td span="5">No Feedback has given yet!</td>
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

export default Messages;