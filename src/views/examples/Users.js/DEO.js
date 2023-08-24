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
    Badge,
    Col,
    Label,
    Table,
    ModalHeader,
    ModalFooter,
    Modal,
    ModalBody,
    InputGroup,
    InputGroupAddon,
    InputGroupText

} from "reactstrap";
import NewHeader from "components/Headers/NewHeader.js";

const DEO = (args) => {
    const edittoggle1 = (event) => {
        setEditModal(!editmodal);
    };
    const editModalClose = () => {
        setEditModal(!editmodal);
    }
    const onDismissaddSuccess = () => setaddSuccess(false);
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
    const onDismissdeleteSuccess = () => setdeleteSuccess(false);
    const [tempName, setTempName] = useState('');
    const onDismissError = () => setError(false);
    const DeletetoggleClose = () => {
        setdeleteModal(!deletemodal);
    }
    const [errorMessage, setErrorMessage] = useState("");
    const Deletetoggle = (event) => {
        setTempId(event.target.attributes.getNamedItem('data-id').value);
        setTempName(event.target.attributes.getNamedItem('data-name').value);
        setdeleteModal(!deletemodal);
    };
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const closeModal = () => setModal(false);
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
    const [currentUser, setCurrentUser] = useState("No DEO Selected Yet")
    const handleUserChange = (e) => {
        const filteredUsers = InformationTable.filter(
          (user) => user.username === e.target.value
        );
        setFilteredUsers(filteredUsers);
        setCurrentUser(e.target.value)
      };
    function GetInformation(e) {
        axios({

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
    function AddDEO(e) {
        e.preventDefault();
        const role = "DEO";
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
                    description: description, role: role
                },
            })
                .then(res => {
                    if (res.data == "success") {
                        setaddSuccess(true);
                        GetInformation();
                        setRerender(!rerender);
                    }
                    else if (res.data == "Already have an account") {
                        setErrorMessage("Email already exists!");
                        setError(true);
                    }
                    else if (res.data == "Username already exists!") {
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

                    closeModal();
                })
        }
        else {
            console.log("Please Retype Same Passwords !")
            setErrorMessage("Password does'nt matches!");
            setError(true);
        }

    }
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
        const role = "DEO";
        const name = e.target.name.value;
        const email = e.target.email.value;
        const username = e.target.username.value;
        const password = e.target.password.value;
        const confirm_password = e.target.confirm_password.value;
        const phone_no = e.target.phone_no.value;
        const address = e.target.address.value;
        const description = e.target.description.value;
        axios({
            withCredentials: true,
            method: 'post',
            url: "http://localhost:8000/auth/EditUser",
            data: {
                id: id, name: name, email: email, username: username, password: password, phone_no: phone_no, address: address,
                description: description, role: role
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
    function GetInformation(e) {
        e.preventDefault();
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

    return (
        <>
            <NewHeader />
            <Container className="mt--9" fluid>
                <Alert color="danger" isOpen={deletesuccess} toggle={onDismissdeleteSuccess}>
                    <strong> Information Deleted! </strong>
                </Alert>
                <Alert color="success" isOpen={addsuccess} toggle={onDismissaddSuccess}>
                    <strong> Information added! </strong>
                </Alert>
                <Alert color="success" isOpen={editsuccess} toggle={onDismisseditSuccess}>
                    <strong> Information Updated successfully! </strong>
                </Alert>
                <Row>
                    <div className="col">
                        <Card className="bg-default shadow">
                            <CardHeader className="bg-transparent border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="text-white mb-0"><b>DEOs</b></h3>
                                    </div>
                                    <div className="col text-right">
                                    <div className="d-flex align-items-center">
                                        <div className="col" style={{marginLeft:'10px',width:'300px',marginRight:'1px',marginTop:'10px'}}>
                                        <Input
                                            id="user"
                                            name="user"
                                            type="select"
                                            onChange={handleUserChange}
                                        >
                                            <option value="No DEO Selected Yet">No DEO Selected Yet</option>
                                            {InformationTable && InformationTable .length > 0 ? (
                                                [...new Set(InformationTable.filter(row => row.role === 'DEO').map(row => row.username))].map((username, index) => (
                                                    <option key={index} value={username}>
                                                        {username}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No DEO Registered yet!</option>
                                            )}
                                        </Input>
                                        <Label for="user" style={{ textAlign: 'left',marginRight:'20px'}}> Search DEO By Username</Label>
                                        </div>
                                        <div style={{marginRight:'10px',marginTop:'-20px'}}>
                                        <Button color="primary"><Link
                                            to="./NGOs"
                                            style={{ color: 'white' }}
                                            // onClick={toggle}
                                            size="md"
                                        >
                                            NGOs
                                        </Link></Button>
                                        </div>
                                        <div style={{marginRight:'10px',marginTop:'-20px'}}>
                                        <Button color="primary"><Link
                                            to="./Users"
                                            style={{ color: 'white' }}
                                            // onClick={toggle}
                                            size="md"
                                        >
                                            All Users
                                        </Link></Button>
                                        </div>
                                        <div style={{marginTop:'-20px'}}>
                                        <Button
                                            color="primary"
                                            onClick={toggle}
                                            size="md"
                                        >
                                            Add DEO
                                        </Button>
                                        </div>
                                        </div>
                                    </div>
                                </Row>
                            </CardHeader>
                            <Modal isOpen={modal} toggle={toggle} {...args} size='md'>
                                <Form role="form" onSubmit={AddDEO}>
                                    <ModalHeader style={{ marginTop: '25px' }} toggle={toggle}><b style={{ fontSize: '18px', marginLeft: '140px', marginTop: '48px' }}>Add DEO</b></ModalHeader>
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
                                            <Label for="DEO">DEO</Label>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-hat-3" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    name="name"
                                                    placeholder="DEO_Name"
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
                                                    placeholder="User_name"
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
                                                    placeholder="Email"
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
                                                    placeholder="Password"
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
                                                //  required
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
                                                />
                                            </InputGroup>
                                        </FormGroup>
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
                                                    placeholder="Description"
                                                    type="text"
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" type="submit" >
                                            Add DEO
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
                                        <FormGroup>
                                            <Label for="DEO">DEO</Label>
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
                                            <Label for="username">Description</Label>
                                            <InputGroup className="input-group-alternative mb-6">
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
                                    Are you sure you want to this DEO ?
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
                                        <th scope="col" style={{ textAlign: 'center' }}>NGO</th>
                                        <th scope="col">Username</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>Email</th>
                                        <th scope="col">Phone_No</th>
                                        <th scope="col">Password</th>
                                        <th scope="col">Action</th>
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
                                                        <td>
                                                            <Badge color="" className="badge-dot">
                                                                <i className="bg-info" />
                                                                {row.username}
                                                            </Badge></td>
                                                        <td>
                                                            {row.email}
                                                        </td>
                                                        <td>
                                                            <Badge color="" className="badge-dot">
                                                                <i className="bg-info" />
                                                                {row.phone_no}
                                                            </Badge>
                                                        </td>
                                                        <td>
                                                            {row.password}
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
                                                InformationTable && InformationTable.length > 0 && currentUser == "No DEO Selected Yet" ? (
                                                    InformationTable.filter(row => row.role === 'DEO').map((row, index) => (
                                                        <tr key={index}>
                                                        <th scope="row">
                                                            <i className="ni ni-book-bookmark text-blue" />
                                                            <span className="mb-0 text-sm">
                                                                <td>{row.name}</td>
                                                            </span>
                                                        </th>
                                                        <td>
                                                            <Badge color="" className="badge-dot">
                                                                <i className="bg-info" />
                                                                {row.username}
                                                            </Badge></td>
                                                        <td>
                                                            {row.email}
                                                        </td>
                                                        <td>
                                                            <Badge color="" className="badge-dot">
                                                                <i className="bg-info" />
                                                                {row.phone_no}
                                                            </Badge>
                                                        </td>
                                                        <td>
                                                            {row.password}
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
                                                        <td span="5">No DEO Registered yet!</td>
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
export default DEO;