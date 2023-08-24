import { useState, useEffect } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import DEOs from "views/examples/Users.js/DEO.js";

import {
    Button,
    InputGroup,

    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    InputGroupAddon,
    InputGroupText,
    Input,
    Container,
    Row,
    Alert,
    Badge,
    Col,
    Label,
    Table,
    ModalHeader,
    ModalFooter,
    Modal,
    ModalBody

} from "reactstrap";
import NewHeader from "components/Headers/NewHeader.js";
import { NewLineKind } from 'typescript';
import DEO from './DEO';

const NGOs = (args) => {
    const edittoggle1 = (event) => {
        setEditModal(!editmodal);
    };
    const editModalClose = () => {
        setEditModal(!editmodal);
    }
    const [rerender, setRerender] = useState(false);
    const onDismisseditSuccess = () => seteditSuccess(false);
    const [editsuccess, seteditSuccess] = useState(false);
    const [editmodal, setEditModal] = useState(false);
    const [usertable, setUsertable] = useState()
    const [InformationTable, setInformationTable] = useState(false);
    const storedUser = localStorage.getItem('user');
    const user_info = JSON.parse(storedUser);
    const [deletesuccess, setdeleteSuccess] = useState(false);
    const [tempId, setTempId] = useState('');
    const [deletemodal, setdeleteModal] = useState(false);
    const [error, setError] = useState(false);
    const onDismissdeleteSuccess = () => setdeleteSuccess(false);
    const [tempName, setTempName] = useState('');
    const DeletetoggleClose = () => {
        setdeleteModal(!deletemodal);
    }
    const [errorMessage, setErrorMessage] = useState("");
    const Deletetoggle = (event) => {
        setTempId(event.target.attributes.getNamedItem('data-id').value);
        setTempName(event.target.attributes.getNamedItem('data-name').value);
        setdeleteModal(!deletemodal);
    };
    const [id, setInformationid] = useState(null);
    const [ngoname, setName] = useState(null);
    const [Email, setEmail] = useState(null);
    const [Description, setDescription] = useState(null);
    const [Address, setAddress] = useState(null);
    const [Phoneno, setPhoneno] = useState(null);
    const [Password, setPassword] = useState(null);
    const [Accountno, setAccountno] = useState(null);
    const [Username, setUsername] = useState(null);
    const [filtered_users, setFilteredUsers] = useState('');
    const [currentUser, setCurrentUser] = useState("No NGO Selected Yet")

    const handleUserChange = (e) => {
        const filteredUsers = InformationTable.filter(
            (user) => user.username === e.target.value
        );
        setFilteredUsers(filteredUsers);
        setCurrentUser(e.target.value)
    };
    const handleStatusChange = (e) => {
        const status = e.target.value;
        setCurrentUser(status);
        if (status === "No Role Selected Yet") {
            setFilteredUsers(InformationTable);
          } else {
            const filteredUsers = InformationTable.filter((user) => user.Status === status);
            setFilteredUsers(filteredUsers);
          }
    };
    function FindInformation(id) {
        axios({
            withCredentials: true,
            method: 'get',
            url: "http://localhost:8000/auth/FindUser?temp_id=" + id
        })
            .then(res => {
                if (res.data) {
                    setInformationid(res.data._id);
                    setName(res.data.name);
                    setEmail(res.data.email);
                    setPassword(res.data.password);
                    setDescription(res.data.description);
                    setAddress(res.data.address);
                    setPhoneno(res.data.phone_no);
                    setAccountno(res.data.account_no);
                    setUsername(res.data.username);
                    setEditModal(!editmodal);
                }

            })
            .catch(error => {

                console.log(error);
                setError(true);
                setEditModal(!editmodal);
            })
    };
    function GetInformation(e) {
        axios({
            withCredentials: true,
            method: 'get',
            url: "http://localhost:8000/auth/get_user",
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
        axios({
            withCredentials: true,
            method: 'get',
            url: 'http://localhost:8000/auth/get_user'
        })
            //.then((response) => response.json())
            .then((response) => {
                console.log(response)
                setInformationTable(response.data)
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);
    function DeleteNGO() {
        axios({
            withCredentials: true,
            method: 'get',
            url: "http://localhost:8000/auth/deleteUser?temp_id=" + tempId
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
    function EditInformation(e) {
        e.preventDefault();
        const role = "NGO";
        const name = e.target.name.value;
        const email = e.target.email.value;
        const username = e.target.username.value;
        const password = e.target.password.value;
        const confirm_password = e.target.confirm_password.value;
        const phone_no = e.target.phone_no.value;
        const address = e.target.address.value;
        const accountno = parseInt(e.target.accountno.value);
        const description = e.target.description.value;
        const Status = e.target.Status.value;
        axios({
            withCredentials: true,
            method: 'post',
            url: "http://localhost:8000/auth/EditUser",
            data: {
                id: id, name: name, email: email, username: username, password: password, phone_no: phone_no, address: address, accountno: accountno
                , description: description, role: role, Status: Status
            },
        })
            .then(res => {
                if (res.data == "success") {
                    seteditSuccess(true);
                    GetInformation();
                    setRerender(!rerender);
                }
                else {
                    setErrorMessage(res.data);
                    setError(true);
                }
                setEditModal(!editmodal);

            })
            .catch(error => {

                setErrorMessage("Failed to connect to backend");
                setError(true);
                console.log(error);

            })
    };
    return (
        <>
            <NewHeader />
            <Container className="mt--9" fluid>
                <Alert color="success" isOpen={editsuccess} toggle={onDismisseditSuccess}>
                    <strong> Information Updated successfully! </strong>
                </Alert>
                <Row>
                    <div className="col">
                        <Card className="bg-default shadow">
                            <CardHeader className="bg-transparent border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="text-white mb-0"><b>NGOs</b></h3>
                                    </div>
                                    <Row>
                                        <div className="col text-right">
                                            <div className="d-flex align-items-center">
                                                <div style={{ width: '200px',marginRight:'10px' }}>
                                                    <Input
                                                        className='mt-3'
                                                        id="status"
                                                        name="status"
                                                        type="select"
                                                        onChange={handleStatusChange}
                                                    >
                                                        <option value="No Status Selected Yet">No Status Selected Yet</option>
                                                        <option value="Active">Active</option>
                                                        <option value="Pending">Pending</option>
                                                    </Input>
                                                    <Label for="status" style={{ textAlign: 'left',marginRight: '70px'}}> Search By Status</Label>
                                                </div>

                                                <div  style={{  width: '200px',marginRight:'10px' }}>
                                                    <Input
                                                        id="user"
                                                        className='mt-3'
                                                        name="user"
                                                        type="select"
                                                        onChange={handleUserChange}
                                                    >
                                                        <option value="No NGO Selected Yet">No NGO Selected Yet</option>
                                                        {InformationTable && InformationTable.length > 0 ? (
                                                            [...new Set(InformationTable.filter(row => row.role === 'NGO').map(row => row.username))].map((username, index) => (
                                                                <option key={index} value={username}>
                                                                    {username}
                                                                </option>
                                                            ))
                                                        ) : (
                                                            <option disabled>No NGO Registered yet!</option>
                                                        )}
                                                    </Input>
                                                    <Label for="user" style={{ textAlign: 'left' }}> Search NGO By Username</Label>
                                                </div>
                                                <div style={{marginRight: '10px',marginTop:'-10px' }}>
                                                    <Button color="primary"><Link
                                                        to="./DEO"
                                                        style={{ color: 'white' }}
                                                        size="md"
                                                    >
                                                        DEOs
                                                    </Link></Button>
                                                </div>
                                                <div style={{marginTop:'-10px'}}>
                                                    <Button color="primary"><Link
                                                        to="./Users"
                                                        style={{ color: 'white' }}
                                                        size="md"
                                                    >
                                                        All Users
                                                    </Link></Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                </Row>
                            </CardHeader>
                            <Modal isOpen={editmodal} toggle={edittoggle1} {...args} size='md'>
                                <Form role="form" onSubmit={EditInformation}>
                                    <ModalHeader style={{ marginTop: '25px' }} toggle={edittoggle1}><b style={{ fontSize: '18px', marginLeft: '140px', marginTop: '48px' }}>Update Inforamtion</b></ModalHeader>
                                    <ModalBody>
                                        <FormGroup>
                                            <Label for="NGO">NGO</Label>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-hat-3" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    name="name"
                                                    placeholder="NGO_Name"
                                                    type="text"
                                                    defaultValue={ngoname}
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
                                                    placeholder="User_name"
                                                    type="text"
                                                    defaultValue={Username}
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
                                                    placeholder="Email"
                                                    type="email"
                                                    defaultValue={Email}
                                                    autoComplete="email"

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
                                                    placeholder="Password"
                                                    type="password"
                                                    defaultValue={Password}
                                                    autoComplete="password"

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
                                                    defaultValue={Password}
                                                    autoComplete="password"

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
                                                    defaultValue={Phoneno}
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
                                                    defaultValue={Address}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="username">Account No</Label>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-hat-3" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    name="accountno"
                                                    placeholder="Account Number (UAN30070000)"
                                                    type="text"
                                                    defaultValue={Accountno}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="username">Description</Label>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-hat-3" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    name="description"
                                                    placeholder="Description"
                                                    defaultValue={Description}
                                                    type="text"
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="username">Status</Label>
                                            <InputGroup className="input-group-alternative mb-6">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-hat-3" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    name="Status"
                                                    placeholder="Description"
                                                    // defaultValue={Description}
                                                    type="select"
                                                >
                                                    <option value={"Reject"}>Reject</option>
                                                    <option value={"Active"}>Approve</option>
                                                </Input>
                                            </InputGroup>
                                        </FormGroup>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" type="submit" >
                                            Update
                                        </Button>{' '}
                                        <Button color="secondary" onClick={editModalClose}>
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </Form>
                            </Modal>
                            <Modal isOpen={deletemodal} toggle={DeletetoggleClose} size='sm'>
                                <ModalHeader toggle={DeletetoggleClose} onClick={DeleteNGO}>Delete Information</ModalHeader>
                                <ModalBody>
                                    Are you sure you want to remove this NGO?
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" onClick={DeleteNGO}>
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
                                        <th scope="col" >NGO Name</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>Username</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>Email</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>Phone_No</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>Status</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>Action</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered_users.length > 0 ?
                                        filtered_users.map((row, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">
                                                        <i className="ni ni-book-bookmark text-blue" />
                                                        <span className="mb-0 text-sm">
                                                            <td>{row.name}</td>
                                                        </span>
                                                    </th>
                                                    <td style={{ textAlign: 'center' }}>{row.username}</td>
                                                    <td style={{ textAlign: 'center' }}>{row.email}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Badge color="" className="badge-dot">
                                                            <i className="bg-info" />
                                                            {row.phone_no}
                                                        </Badge>
                                                    </td>
                                                    <td>
                                                        {row.Status}
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Button color="primary" onClick={() => { FindInformation(row._id) }}>
                                                            <i className="ni ni-active-40"></i>
                                                        </Button>
                                                        <Button data-id={row._id} data-name={row.name} color="danger" onClick={Deletetoggle}>
                                                            <i className="ni ni-fat-remove"></i>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        InformationTable && InformationTable.length > 0 && (currentUser == "No NGO Selected Yet" || currentUser == "No Status Selected Yet") ? (
                                            InformationTable.filter(row => row.role === 'NGO').map((row, index) => (
                                                <tr key={index}>
                                                    <th scope="row">
                                                        <i className="ni ni-book-bookmark text-blue" />
                                                        <span className="mb-0 text-sm">
                                                            <td>{row.name}</td>
                                                        </span>
                                                    </th>
                                                    <td style={{ textAlign: 'center' }}>{row.username}</td>
                                                    <td style={{ textAlign: 'center' }}>{row.email}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Badge color="" className="badge-dot">
                                                            <i className="bg-info" />
                                                            {row.phone_no}
                                                        </Badge>
                                                    </td>
                                                    <td>
                                                        {row.Status}
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Button color="primary" onClick={() => { FindInformation(row._id) }}>
                                                            <i className="ni ni-active-40"></i>
                                                        </Button>
                                                        <Button data-id={row._id} data-name={row.name} color="danger" onClick={Deletetoggle}>
                                                            <i className="ni ni-fat-remove"></i>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) :

                                            <tr>
                                                <td span="5">No NGO has sent Registeration Request !</td>
                                            </tr>
                                    }
                                </tbody>
                            </Table>
                        </Card>
                    </div>
                </Row>
            </Container>

        </>
    )
}
export default NGOs;