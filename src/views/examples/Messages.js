// import { useState, useEffect } from 'react';
// import {
//     Button,
//     Card,
//     CardHeader,
//     CardBody,
//     FormGroup,
//     Form,
//     Table,
//     Input,
//     Container,
//     Row,
//     Modal, ModalHeader, ModalBody, ModalFooter,Alert,
//     Col
// } from "reactstrap";

// import axios from 'axios'

// // core components
// import NewHeader from "components/Headers/NewHeader.js";
// const storedUser = localStorage.getItem('user');
//     const user_info = JSON.parse(storedUser);

// const Messages = () => {
    
//     const [InformationTable, setInformationTable] = useState(false);
//     const [name, setName] = useState(null);
//     const [email, setEmail] = useState(null);
//     const [subject, setSubject] = useState(null);
//     const [message, setMessage] = useState(null);
//     const [id, setInformationid] = useState(null);
//     const [errorMessage, setErrorMessage] = useState("");
//     const [deletesuccess, setdeleteSuccess] = useState(false);
//     const [tempId, setTempId] = useState('');
//     const [tempName, setTempName] = useState('');
//     const [deletemodal, setdeleteModal] = useState(false);
//     const [error, setError] = useState(false);
//     const onDismissdeleteSuccess = () => setdeleteSuccess(false);
//     const DeletetoggleClose = () => {
//         setdeleteModal(!deletemodal); 
//     }
//     const Deletetoggle = (event) => {
//         setTempId(event.target.attributes.getNamedItem('data-id').value);
//         setTempName(event.target.attributes.getNamedItem('data-name').value);
//         setdeleteModal(!deletemodal);
//     };

//     function GetInformation(e) {
//         axios({
//             method: 'get',
//             url: "http://localhost:8000/CotactUs/GetMessages",
//         })
//             .then(res => {
//                 if (res.data) {
//                     setInformationTable(res.data);
//                 }
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//  }
//     useEffect(() => {
//         GetInformation();
//     }, []);
//     function FindInformation(id) {

//         axios({     //FindOneInformation on the base of id API Calling
//             withCredentials: true,
//             method: 'get',
//             url: "http://localhost:8000/ContactUs/FindMessages?temp_id=" + id
//         })
//             .then(res => {
//                 if (res.data) {
//                     setInformationid(res.data._id);
//                     setName(res.data.name);
//                     setEmail(res.data.email);
//                     setSubject(res.data.subject);
//                     setMessage(res.data.message);
//                 }
//             })
//             .catch(error => {

//                 console.log(error);
//                 //   setError(true);
//                 //   setEditModal(!editmodal); 
//             })
//     };
//     function DeleteMessages() {
//         axios({     // DeleteMessage API Calling
//             withCredentials: true,
//             method: 'get',
//             url: "http://localhost:8000/ContactUs/DeleteMessages?temp_id=" + tempId
//         })
//             .then(res => {
//                 if (res.data.indicator == "success") {
//                     setdeleteSuccess(true);
//                 }
//                 else {
//                     setError(true);
//                     setErrorMessage(res.data.messege.message);
//                 }
//                 setdeleteModal(!deletemodal);
//             })
//             .catch(error => {
//                 console.log(error);
//                 setErrorMessage("Network Error!");
//                 setError(true);
//                 setdeleteModal(!deletemodal);
//             })
//     };
//     return (
//         <>
//             <NewHeader />
//             <Container className="mt--7" fluid>
//             <Alert color="danger" isOpen={deletesuccess} toggle={onDismissdeleteSuccess}>
//             <strong> Information Deleted! </strong> 
//             </Alert>
//                 <Row>
//                     <div className="col">
//                         <Card className="bg-default shadow">
//                             <CardHeader className="bg-transparent border-0">
//                                 <Row className="align-items-center">
//                                     <div className="col">
//                                         <h3 className="text-white mb-0"><b>Messages</b></h3>
//                                     </div>
//                                 </Row>
//                             </CardHeader>
//                             <Modal isOpen={deletemodal} toggle={DeletetoggleClose} {...args} size='sm'>
//                                 <ModalHeader toggle={DeletetoggleClose} >Delete Information</ModalHeader>
//                                 <ModalBody>
//                                       Are you sure you want to delete <b>{tempName}</b>?
//                                 </ModalBody>
//                                 <ModalFooter>
//                                     <Button color="danger" onClick={() => { DeleteMessages() }}>
//                                         Delete
//                                     </Button>{' '}
//                                     <Button color="secondary" onClick={DeletetoggleClose}>
//                                         Cancel
//                                     </Button>
//                                 </ModalFooter>

//                             </Modal>
//                             <Table className="align-items-center table-dark table-flush" responsive>
//                                 <thead className="thead-dark">
//                                     <tr>
//                                         <th scope="col">Name</th>
//                                         <th scope="col">Email</th>
//                                         <th scope="col">Subject</th>
//                                         <th scope="col">Message</th>
//                                         <th scope="col">Actions</th>
//                                         <th scope="col" />
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {InformationTable ?
//                                         InformationTable.map((row, index) => {
//                                             return (
//                                                 <tr key={index}>
//                                                     <th scope="row">
//                                                         <span className="mb-0 text-sm">
//                                                             {row.name}
//                                                         </span>
//                                                     </th>
//                                                     <td>{row.email}</td>
//                                                     <td>
//                                                         {row.subject}
//                                                     </td>
//                                                     <td>
//                                                         {row.message}
//                                                     </td>
//                                                     <td>
//                                                         <Button color="primary" onClick={() => { FindInformation(row._id) }}>
//                                                             <i className="ni ni-active-40"></i>
//                                                         </Button>
//                                                         <Button data-id={row._id} data-name={row.name} color="danger" onClick={Deletetoggle}>
//                                                             <i className="ni ni-fat-remove"></i>
//                                                         </Button>
//                                                     </td>
//                                                 </tr>)
//                                         })
//                                         :
//                                         <tr>
//                                             <td span="5">No Information found!</td>
//                                         </tr>
//                                     }
//                                 </tbody>
//                             </Table>
//                         </Card>
//                     </div>
//                 </Row>
//             </Container>
//         </>
//     );
// };

// export default Messages;