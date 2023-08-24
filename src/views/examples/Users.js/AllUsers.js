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
import InputMask from 'react-input-mask';

const AllUsers = (args) => {
    const edittoggle1 = (event) => {
        setEditModal(!editmodal);
    };
    const editModalClose = () => {
        setEditModal(!editmodal);
    }
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const closeModal = () => setModal(false);
    const [addsuccess, setaddSuccess] = useState(false);
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
    const onDismissError = () => setError(false);
    const onDismissdeleteSuccess = () => setdeleteSuccess(false);
    const onDismissaddSuccess = () => setaddSuccess(false);
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
    const [UserRole, setRole] = useState(null);
    const [Username, setUsername] = useState(null);
    const [AccountType, setAccountType] = useState(null);
    const [status, setStatus] = useState(null);
    const [filtered_users, setFilteredUsers] = useState('');

    const [currentUser, setCurrentUser] = useState("No User Selected Yet")
    const handleRoleChange = (e) => {
        const filteredUsers = InformationTable.filter(
            (user) => user.role === e.target.value
        );
        setFilteredUsers(filteredUsers);
        setCurrentUser(e.target.value)
    };
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
        if (status === "No Status Selected Yet") {
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
                    setUsername(res.data.username);
                    setStatus(res.data.Status);
                    setAccountno(res.data.account_no);
                    setAccountType(res.data.Account_Type);
                    setRole(res.data.role);
                    setEditModal(!editmodal);
                }
            })
            .catch(error => {

                console.log(error);
                setError(true);
                setEditModal(!editmodal);
            })
    };
    function EditInformation(e) {
        e.preventDefault();
        // const role = "DEO";
        const name = e.target.name.value;
        const email = e.target.email.value;
        const username = e.target.username.value;
        const password = e.target.password.value;
        const confirm_password = e.target.confirm_password.value;
        const phone_no = e.target.phone_no.value;
        const address = e.target.address.value;
        let accountno = ""
        let Status = ""
        let account_Type = ""
        if(e.target.elements.accountno)
        {
            accountno=e.target.elements.accountno.value;
        }
        if(e.target.elements.accountType)
        {
            account_Type=e.target.elements.accountType.value;
        }
        if(e.target.elements.Status)
        {
             Status=e.target.elements.Status.value;
        }

        const description = e.target.description.value;
        if ((password && !confirm_password) || (!password && confirm_password)) {
            setError(true);
            setErrorMessage("Please enter both password and confirm password.");
            return;
        }
        else if (password !== confirm_password) {
            setError(true);
            setErrorMessage("Password and confirm password do not match.");
            return;
        }
        else {
            axios({
                withCredentials: true,
                method: 'post',
                url: "http://localhost:8000/auth/EditUser",
                data: {
                    id: id, name: name, email: email, username: username, password: password, phone_no: phone_no, address: address, accountno: accountno,
                    account_Type:account_Type,description: description, Status: Status
                },
            })
                .then(res => {
                    if (res.data == "success") {
                        seteditSuccess(true);
                        GetInformation();
                        setRerender(!rerender);
                    }
                    // not working ?????? Same goes for Login 
                    else if (res.data === "Email already exists.") {
                        setError(true);
                        setErrorMessage("Email already exists.");
                    }
                    else if (res.data === "Username already exists.") {
                        setError(true);
                        setErrorMessage("Username already exists.");
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
        }

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
    function DeleteDEO() {
        axios({
            withCredentials: true,
            method: 'get',
            url: "http://localhost:8000/auth/deleteUser?temp_id=" + tempId
        })
            .then(res => {
                if (res.data.indicator == "success") {
                    setdeleteSuccess(true);
                    GetInformation();
                    setRerender(!rerender);
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
    function AddUser(e) {
        e.preventDefault();
        const status = 'Active';
        const role = e.target.Role.value;
        const name = e.target.name.value;
        const email = e.target.email.value;
        const username = e.target.username.value;
        const password = e.target.password.value;
        const confirm_password = e.target.confirm_password.value;
        const phone_no = e.target.phone_no.value;
        const address = e.target.address.value;
        const description = e.target.description.value;
        if (password === confirm_password) {
            axios({
                method: 'post',
                withCredentials: true,
                url: "http://localhost:8000/auth/register",
                data: {
                    id: id, name: name, email: email, username: username, password: password, phone_no: phone_no, address: address,
                    description: description, role: role, Status: status
                },
            })
                .then(res => {
                    if (res.data.indicator === "success") {
                        setaddSuccess(true);
                        GetInformation();
                        closeModal();
                        setRerender(!rerender);
                    }
                    else if (res.data === "Already have an account") {
                        setErrorMessage("Email already exists!");
                        setError(true);
                    }
                    else if (res.data === "Username already exists!") {
                        setErrorMessage("Username already exists!");
                        setError(true);
                    }
                    else {
                        setErrorMessage(res.data);
                        setError(true);
                    }
                    closeModal();
                })
                .catch(error => {
                    if (error.response.data == "Forbidden") {
                        setErrorMessage("not alowed to access")
                        setError(true);
                    }
                    else {
                        setErrorMessage("Failed to connect to backend")
                        setError(true);
                    }


                })
        }
        else {
            console.log("Please Retype Same Passwords !")
            setErrorMessage("Password does'nt matches!");
            setError(true);
        }

    }
    return (
        <>
            <NewHeader />
            <Container className="mt--9" fluid>
                <Alert color="success" isOpen={editsuccess} toggle={onDismisseditSuccess}>
                    <strong> Account Updated successfully! </strong>
                </Alert>
                <Alert color="success" isOpen={deletesuccess} toggle={onDismissdeleteSuccess}>
                    <strong> Account Deleted Succesfully! </strong>
                </Alert>
                <Alert color="success" isOpen={addsuccess} toggle={onDismissaddSuccess}>
                    <strong> Account Created Successfully! </strong>
                </Alert>
                <Row>
                    <div className="col">
                        <Card className="bg-default shadow">
                            <CardHeader className="bg-transparent border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="text-white mb-0"><b>Users</b></h3>
                                    </div>
                                    <Row>
                                        <div className="col text-right">
                                            <div className="d-flex align-items-center">
                                                <div style={{ width: '150px', marginRight: '-10px', marginTop: '-1px', marginleft: '30px' }}>
                                                    <Input
                                                        className='mt-2'
                                                        id="status"
                                                        name="status"
                                                        type="select"
                                                        style={{ maxWidth: '140px' }}
                                                        onChange={handleStatusChange}
                                                    >
                                                        <option value="No Status Selected Yet">No Status Selected</option>
                                                        <option value="Active">Active</option>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Rejected">Rejected</option>
                                                    </Input>
                                                    <Label for="status" style={{ textAlign: 'left', marginRight: '20px' }}> Search by Status</Label>
                                                </div>
                                                <div className="col" style={{ marginLeft: 0, width: '180px', marginRight: '-170px' }}>
                                                    <Input
                                                        className='mt-2'
                                                        id="role"
                                                        name="role"
                                                        type="select"
                                                        style={{ maxWidth: '140px' }}
                                                        onChange={handleRoleChange}
                                                    >
                                                        <option value="All Users">All Users</option>
                                                        <option value="DEO">DEO</option>
                                                        <option value="NGO">NGO</option>
                                                        <option value="admin">Admin</option>
                                                    </Input>
                                                    <Label for="role" style={{ marginRight: '110px' }}> Search Role</Label>
                                                </div>
                                                <div className="col" style={{ marginLeft: '90px', width: '290px', marginRight: '-35px' }}>
                                                    <Input
                                                        className='mt-2'
                                                        id="user"
                                                        name="user"
                                                        type="select"
                                                        onChange={handleUserChange}
                                                        style={{ maxWidth: '170px' }}

                                                    >
                                                        <option value="No User Selected Yet">No User Selected Yet</option>
                                                        {InformationTable && InformationTable.length > 0 ? (
                                                            [...new Set(InformationTable.map(row => row.username))].map((username, index) => (
                                                                <option key={index} value={username}>
                                                                    {username}
                                                                </option>
                                                            ))
                                                        ) : (
                                                            <option disabled>No User Registered yet!</option>
                                                        )}
                                                    </Input>
                                                    <Label for="user" style={{ marginRight: '40px' }}> Search by Username</Label>
                                                </div>
                                                {/* <div style={{marginRight:'10px',marginTop:'-20px'}}>
                                            <Button color="primary"><Link
                                                to="./DEO"
                                                style={{ color: 'white' }}
                                                // onClick={toggle}
                                                size="md"
                                            >
                                                DEOs
                                            </Link></Button>
                                            </div> */}
                                                <div style={{ marginTop: '-20px' }}>
                                                    <Button color="primary"

                                                        style={{ color: 'white' }}
                                                        onClick={toggle}
                                                        size="md"
                                                    >
                                                        Add User
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                </Row>
                            </CardHeader>
                            <Modal isOpen={modal} toggle={toggle} {...args} size='md'>
                                <Form role="form" onSubmit={AddUser}>
                                    <ModalHeader style={{ marginTop: '25px' }} toggle={toggle}><b style={{ fontSize: '18px', marginLeft: '190px', marginTop: '48px' }}>Add User</b></ModalHeader>
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
                                                <InputMask
                                                           style={{
                                                            border: 'none',
                                                            boxShadow: 'none',
                                                            // padding: '0.375rem 0.75rem',
                                                            height: '45px',
                                                            borderRadius: '8px',
                                                            fontSize: '14px'
                                                          }}
                                                            mask="0399-9999999"
                                                            maskChar="_"
                                                            id="accountno"
                                                            name="phone_no"
                                                            placeholder="Enter Phone Number"
                                                            type="text"
                                                            required
                                                        />
                                                {/* <Input
                                                    name="phone_no"
                                                    placeholder="Enter Phone Number"
                                                    type="Number"
                                                // required
                                                /> */}
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
                                            <Label for="UserRole">Role*</Label>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-hat-3" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    name="Role"
                                                    placeholder="Select userRole"
                                                    type="select"
                                                    required
                                                >
                                                    <option value="">Select User Role</option>
                                                    <option value="NGO">NGO</option>
                                                    <option value="DEO">DEO</option>
                                                    <option value="admin">Admin</option>
                                                </Input>
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
                                    <ModalFooter>
                                        <Button color="primary" type="submit" >
                                            Add User
                                        </Button>{' '}
                                        <Button color="secondary" onClick={toggle}>
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </Form>
                            </Modal>
                            <Modal isOpen={editmodal} toggle={edittoggle1} {...args} size='md'>
                                <Form role="form" onSubmit={EditInformation}>
                                    <ModalHeader style={{ marginTop: '25px' }} toggle={edittoggle1}><b style={{ fontSize: '18px', marginLeft: '140px', marginTop: '48px' }}>Update Inforamtion</b></ModalHeader>
                                    <ModalBody>
                                        {error ?
                                            <Alert color="danger" isOpen={error} toggle={onDismissError}>
                                                <strong> {errorMessage}</strong>
                                            </Alert>
                                            :
                                            <></>
                                        }
                                        <FormGroup>
                                            <Label for="User">User</Label>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-hat-3" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    name="name"
                                                    type="text"
                                                    defaultValue={ngoname}
                                                    style={{ color: 'black' }}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="username">Username</Label>
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
                                                    style={{ color: 'black' }}

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
                                                    style={{ color: 'black' }}
                                                // autoComplete="email"
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
                                                    style={{ color: 'black' }}
                                                // autoComplete="password"
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
                                                    style={{ color: 'black' }}
                                                // autoComplete="password"
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
                                                <InputMask
                                                           style={{
                                                            border: 'none',
                                                            boxShadow: 'none',
                                                            // padding: '0.375rem 0.75rem',
                                                            height: '45px',
                                                            borderRadius: '8px',
                                                            fontSize: '14px'
                                                          }}
                                                            mask="0399-9999999"
                                                            maskChar="_"
                                                            id="accountno"
                                                            name="phone_no"
                                                            defaultValue={Phoneno}
                                                            type="text"
                                                        />
                                                {/* <Input
                                                    name="phone_no"
                                                    placeholder="Enter Phone Number"
                                                    type="Number"
                                                    defaultValue={Phoneno}
                                                    style={{ color: 'black' }}
                                                /> */}
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
                                                    style={{ color: 'black' }}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        {UserRole === "NGO" && (
                                            <>
                                                <FormGroup>
                                                    <Label for="Accountno">Account No</Label>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="ni ni-hat-3" />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <InputMask
                                                           style={{
                                                            border: 'none',
                                                            boxShadow: 'none',
                                                            // padding: '0.375rem 0.75rem',
                                                            height: '45px',
                                                            borderRadius: '8px',
                                                            fontSize: '14px'
                                                          }}
                                                            mask="0399-9999999"
                                                            maskChar="_"
                                                            id="accountno"
                                                            name="accountno"
                                                            defaultValue={Accountno}
                                                            type="text"
                                                        />
                                                        {/* <Input
                                                            name="accountno"
                                                            placeholder="Account No"
                                                            defaultValue={Accountno}
                                                            type="Number"
                                                            style={{ color: 'black' }}
                                                        /> */}
                                                    </InputGroup>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="Accountno">Account Type</Label>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="ni ni-hat-3" />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            name="accountType"
                                                            defaultValue={AccountType}
                                                            style={{ color: 'black' }}
                                                            type="select"
                                                             >
                                                            <option value="Not Specified">Please Select Account Type</option>
                                                            <option value="Jazzcash">Jazzcash</option>
                                                            <option value="Easypesa">Easypesa</option>
                                                        </Input>
                                                    </InputGroup>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="username">Registration Status</Label>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="ni ni-hat-3" />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            name="Status"
                                                            defaultValue={status}
                                                            style={{ color: 'black' }}
                                                            type="select"
                                                        >
                                                            <option value={"Rejected"}>Reject</option>
                                                            <option value={"Active"}>Approve</option>
                                                            <option value={"Pending"}>Pending</option>
                                                        </Input>
                                                    </InputGroup>
                                                </FormGroup>
                                            </>
                                        )}
                                        <FormGroup>
                                            <Label for="username">Description</Label>
                                            <InputGroup className="input-group-alternative mb-6">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-hat-3" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    name="description"
                                                    placeholder="Enter Description"
                                                    defaultValue={Description}
                                                    style={{ color: 'black' }}
                                                    type="text"
                                                />
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
                                <ModalHeader toggle={DeletetoggleClose} onClick={DeleteDEO}>Delete Information</ModalHeader>
                                <ModalBody>
                                    Are you sure you want to this User ?
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" onClick={DeleteDEO}>
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
                                        <th scope="col" style={{ textAlign: 'center' }}>User</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>Username</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>Email</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>Phone_No</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>Role</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>Action</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered_users.length > 0 ?
                                        filtered_users.map((row, index) => {
                                            return (

                                                <tr key={index}>
                                                    <th scope="row" >
                                                        <i className="ni ni-book-bookmark text-blue" />
                                                        <span className="mb-0 text-sm">
                                                            <td>{row.name}</td>
                                                        </span>
                                                    </th>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Badge color="" className="badge-dot">
                                                            <i className="bg-info" />
                                                            {row.username}
                                                        </Badge>
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>{row.email}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Badge color="" className="badge-dot">
                                                            <i className="bg-info" />
                                                            {row.phone_no}
                                                        </Badge>
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        {row.role}
                                                    </td>
                                                    <td>
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
                                        InformationTable && InformationTable.length > 0 && (currentUser == "No User Selected Yet" || currentUser == "All Users") ? (
                                            InformationTable.map((row, index) => (
                                                <tr key={index}>
                                                    <th scope="row" >
                                                        <i className="ni ni-book-bookmark text-blue" />
                                                        <span className="mb-0 text-sm">
                                                            <td>{row.name}</td>
                                                        </span>
                                                    </th>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Badge color="" className="badge-dot">
                                                            <i className="bg-info" />
                                                            {row.username}
                                                        </Badge>
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>{row.email}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Badge color="" className="badge-dot">
                                                            <i className="bg-info" />
                                                            {row.phone_no}
                                                        </Badge>
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        {row.role}
                                                    </td>
                                                    <td>
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
                                                <td span="5">No User Record found!</td>
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
export default AllUsers;