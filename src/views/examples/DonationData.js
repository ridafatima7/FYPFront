import { useState,useEffect } from 'react';
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
  Col,
  Label,
  Table,
  ModalHeader,
  ModalFooter,
  Modal,
  ModalBody
} from "reactstrap";

// core components
import UserHeader from "components/Headers/UserHeader.js";
import Header from "views/frontpages/Header.js"
const storedUser = localStorage.getItem('user');
const user_info = JSON.parse(storedUser);



const DonationData = () => {
  const [InformationTable, setInformationTable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const [addsuccess, setaddSuccess] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [deletesuccess, setdeleteSuccess] = useState(false);
    const [tempId, setTempId] = useState('');
    const [tempName, setTempName] = useState('');
    const [deletemodal, setdeleteModal] = useState(false);
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

  const storedUser = localStorage.getItem('user');
  const user_info = JSON.parse(storedUser);

  return (
    <>
      <Header />
      <UserHeader />

      <Container className="mt--9" fluid >
        <Row>
          
        </Row>
      </Container>

    </>
  );
};

export default DonationData;


