import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {
  Container,
  Col,
  Card,
  CardHeader,
  CardFooter,
  Table,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Badge,
  Button,
  Alert,
  UncontrolledDropdown,
  UncontrolledTooltip,
  Progress,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal, ModalHeader, ModalBody, ModalFooter,
  FormGroup,
  Form,
  Row,
  Input,
  Label
} from "reactstrap";
import NewHeader from "components/Headers/NewHeader.js";
import { post } from 'jquery';

const DisasterReliefManagement =(args)=>{
  const formData = new FormData();
const storedUser = localStorage.getItem('user');
const user_info = JSON.parse(storedUser);
const [role, setRole] = useState(user_info.role);
const[usertable, setUsertable] =useState()
const [modal, setModal] = useState(false);
const toggle = () => setModal(!modal);
const closeModal = () => setModal(false);
const [errorMessage, setErrorMessage] = useState("");
const [Error, setError] = useState(false);
const onDismissError = () => setError(false);
const [InformationTable,setInformationTable]=useState(false);
const [deletesuccess, setdeleteSuccess] = useState(false);
const [tempId, setTempId] = useState('');
const [tempName, setTempName] = useState('');
const [deletemodal, setdeleteModal] = useState(false);
const[rerender,setRerender]=useState(false);
const onDismissdeleteSuccess = () => setdeleteSuccess(false);
const onDismissaddSuccess = () => setaddSuccess(false);
const [addsuccess, setaddSuccess] = useState(false);
const Deletetoggle = (event) => { 
  setTempId(event.target.attributes.getNamedItem('data-id').value); 
  setTempName(event.target.attributes.getNamedItem('data-name').value);
  setdeleteModal(!deletemodal); 
};
const edittoggle1=(event)=>
{
    setEditModal(!editmodal);
};
const editModalClose=()=>
{
    setEditModal(!editmodal); 
}
const [id, setInformationid] = useState(null);
const [NGO, setNgoname] = useState(null);
const [disasterType, setDisasterType] = useState(null);
const [Title, setTitle]=useState(null);
const[Population,setPopulation]=useState(null);
const[date,setDate]=useState(null);
const[description,setDescription]=useState(null);
const[shelters,setShelters]=useState(null);
const[food,setFood]=useState(null);
const[medicine,setMedicine]=useState(null);
const [options, setOptions] = useState([]);
const[selectedFiles,setSelectedFiles]=useState(null);
const[editmodal, setEditModal]=useState(false);
const onDismisseditSuccess = () => seteditSuccess(false);
const [editsuccess, seteditSuccess] = useState(false);
// const editModalClose=()=>
// {
//   setEditModal(!editmodal); 
// }
const DeletetoggleClose = () => {
  setdeleteModal(!deletemodal); 
}
useEffect(() => {
  
   GetInformation();
   axios({     
    withCredentials: true,
    method:'get',
    url:"http://localhost:8000/Information/GetInformation"
  })
  //  .then((response) => response.json())
    .then((res) => {
      setOptions(res.data);
    })
    .catch((error) => console.error('Error fetching data:', error));
    axios({     
       withCredentials: true,
      method:'get',
       url:'http://localhost:8000/auth/get_user'
      })
     //.then((response) => response.json())
    .then((response) => {
    setUsertable(response.data)
  })
  .catch((error) => console.error('Error fetching data:', error));

}, []);
function GetInformation(e)
{
  axios({ 
    withCredentials: true,
    method:'get',
    url:"http://localhost:8000/Relief_Information/GetInformation",
  })
  .then(res=>{
    // console.log('get',res);
    // console.log(res)
    if(res.data)
    {
      // console.log(res.data)
      setInformationTable(res.data);
      // setUsertable(res.data);
      
    }
  })
  .catch(error=>{
    console.log(error);
  })
}
  function FindInformation(id)
  {
    axios({ 
      withCredentials: true,
      method:'get',
      url:"http://localhost:8000/Relief_Information/FindInformation?temp_id="+id
    })
    .then(res=>{
      if(res.data)
      {
        setInformationid(res.data._id);
        setNgoname(res.data.Ngo_Name);
        setDisasterType(res.data.dis_type);
        setTitle(res.data.dis_title);
        setDescription(res.data.description);
        setPopulation(res.data.population);
        setDate(res.data.date);
        setShelters(res.data.shelters);
        setFood(res.data.food);
        setMedicine(res.data.medicine);
        setSelectedFiles(res.data.gallery);
        setEditModal(!editmodal);
      }
        
    })
    .catch(error=>{
      console.log(error);
      setError(true);
      setEditModal(!editmodal); 
    })
  };
  const handleFileInputChange = (event) => {
    const newFiles = [...event.target.files]
    console.log(newFiles)
    setSelectedFiles(newFiles)
    
  };

  function EditInformation(e)
  {
     // alert('here')
    const disasterType=e.target.DisasterType.value;
    const title=e.target.title.value;
    const Description=e.target.Description.value;
    const population=e.target.Population.value;
    const date=e.target.date.value;
    const shelters=e.target.shelters.value;
    const food=e.target.food.value;
    const medicine=e.target.medicine.value;
    const gallery=e.target.gallery.value;
    const ngoname=e.target.ngoname.value;
    e.preventDefault();
    axios({     // edit Information on the base of id API Calling
      withCredentials: true,
      method:'post',
      url:"http://localhost:8000/Relief_Information/EditInformation",
      data:{id:id,ngoname:ngoname,disasterType:disasterType, title:title ,Description:Description,population:population
        ,date:date,shelters:shelters,food:food,medicine:medicine,gallery:gallery},
    })
    .then(res=>{
      if(res.data == "success")
      {
        seteditSuccess(true); 
        GetInformation();
        setRerender(!rerender);
      }
      else
      {
        setErrorMessage(res.data);
        setError(true);
        console.log("Failed to connect to backend")
      }
      setEditModal(!editmodal); 
    })
    .catch(error=>{

      setErrorMessage("Failed to connect to backend");
      setError(true);
      console.log(error);
    })
  };
  function DeleteInformation()
  {
    axios({     // DeleteCourse API Calling
       withCredentials: true,
      method:'get',
      url:"http://localhost:8000/Relief_Information/DeleteInformation?temp_id="+tempId
    })
    .then(res=>{
      if(res.data.indicator=="success")
      {
        setdeleteSuccess(true);
      }
      else{
        setError(true);
        setErrorMessage(res.data.messege.message);
      }
      setdeleteModal(!deletemodal); 
      
    })
    .catch(error=>{
      console.log(error);
      setErrorMessage("Network Error!");
      setError(true);
      setdeleteModal(!deletemodal); 
    })
  };
function AddInformation(e)
  {
    
    
    e.preventDefault();
    console.log(selectedFiles)
    // return
    // console.log(e.target.category.value)
    const disasterType=e.target.disasterType.value;
    const title=e.target.title.value;
    const Description=e.target.Description.value;
    const population=parseInt(e.target.population.value);
    const date=e.target.date.value;
    const shelters=parseInt(e.target.shelters.value);
    const food=parseInt(e.target.food.value);
    const medicine=parseInt(e.target.medicine.value);
    // const gallery=e.target.gallery.value;
    const thumbnail=e.target.thumbnail.value;
    const ngoname=e.target.ngoname.value;
    // const files = selectedFiles
    // console.log(shelters);
    // console.log(population);
    if(shelters > population)
    {
      setError(true);
      setErrorMessage("Shelters cannot be greater than the popuation!")
      console.log("Shelters cannot be greater than the popuation!")
      // return;
    }
    //AddInformation API Calling
    else
    {
        // formData = new formData()
        selectedFiles.forEach((file) => {
          formData.append('files', file);
        });
        // formData.append('files',selectedFiles );
        formData.append('ngoname',ngoname );
        formData.append('disasterType', disasterType);
        formData.append('Description',Description);
        formData.append('population',population);
        formData.append('title',title);
        formData.append('date',date);
        formData.append('shelters',shelters);
        formData.append('food',food);
        formData.append('medicine',medicine);
        axios({    
         method:'post',
         withCredentials: true,
         url:"http://localhost:8000/Relief_Information/AddInformation",
         data:formData,
         })
        .then(res=>{
         if(res.data == "success")
         {
           setaddSuccess(true);
           GetInformation();
           setRerender(!rerender);
         }
         else
         {
            setErrorMessage(res.data);
            setError(true);
         }
         closeModal();
       })
      .catch(error=>{
       if(error.response.data=="Forbidden"){
        setErrorMessage("not alowed to access")
        setError(true);
        }
        else
        {
         setErrorMessage("Failed to connect to backend")
         setError(true);
       }
        closeModal();
     })
  }
}
return (
    <>
     <NewHeader />
     <Container className="mt--9" fluid>
    <Alert color="danger" isOpen={deletesuccess} toggle={onDismissdeleteSuccess}>
           <strong> Information Deleted! </strong> 
   </Alert>
   <Alert color="danger" isOpen={Error} toggle={onDismissError}>
           <strong> {errorMessage} </strong> 
   </Alert>
  
     <Alert color="success" isOpen={addsuccess} toggle={onDismissaddSuccess}>
          <strong> Information added! </strong> 
    </Alert>
    <Alert color="success" isOpen={editsuccess} toggle={onDismisseditSuccess}>
          <strong> Information Updated successfully! </strong> 
        </Alert>
   
    <Modal isOpen={editmodal} toggle={edittoggle1} {...args} size='lg'>
        <Form  role="form" onSubmit={EditInformation} >
          <ModalHeader toggle={edittoggle1}>Update Inforamtion</ModalHeader>
          <Alert color="danger" isOpen={Error} toggle={onDismissError}>
           <strong> {errorMessage} </strong> 
          </Alert>
          <ModalBody>        
              <Row>
                <Col md={6}>
                  <FormGroup>
                  <Label
                    for="id"
                    hidden
                  >
                    ID
                  </Label>
                  <Input
                    id="id"
                    name="id"
                    placeholder="info id"
                    type="hidden"
                    value={id}
                  />
                    <Label for="DisasterTitle">
                      NGO
                    </Label>
                    <Input
                      id="ngoname"
                      name="ngoname"
                      // placeholder="Enter Title"
                      type="text"
                      defaultValue={NGO}
                      readOnly
                    />
                  </FormGroup>
                  </Col>
                  <Col md={6}>
                  <FormGroup>
                    <Label for="DisasterType">
                      Disaster 
                    </Label>
                    <Input
                      id="DisasterType"
                      name="DisasterType"
                      //placeholder="Update DisasterType"
                      type="text"
                      defaultValue={disasterType}
                      disabled
                    />
                  </FormGroup>
                 </Col>
                {/* <Col md={6}>
                  <FormGroup>
                    <Label for="DisasterTitle">
                      NGO Name
                    </Label>
                    <Input
                      id="ngoname"
                      name="ngoname"
                      placeholder="Enter Title"
                      type="select"
                      defaultValue={Title}
                    />
                  </FormGroup>
                </Col> */}
      
                <Col md={6}>
                  <FormGroup>
                    <Label for="DisasterTitle">
                      Information Title
                    </Label>
                    <Input
                      id="Title"
                      name="title"
                      placeholder="Enter Title"
                      type="text"
                      defaultValue={Title}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Disaster Title">
                      Description*
                    </Label>
                    <Input
                      id="Description"
                      name="Description"
                      placeholder="Enter Disaster title"
                      type="text"
                      defaultValue={description}
                    />
                  </FormGroup>
                </Col>
                {/* <Col md={6}>
                  <FormGroup>
                    <Label for="startdate">
                      Disaster Area
                    </Label>
                    <Input
                      id="Area"
                      name="area"
                      placeholder="Enter area"
                      type="text"
                      defaultValue={Area}
                    />
                  </FormGroup>
                </Col> */}
                {/* <Col md={6}>
                  <FormGroup>
                    <Label for="Area XCoordinates">
                     X Coordinates
                    </Label>
                    <Input
                      id="xcoordinates"
                      name="xcoordinates"
                      placeholder="Enter Area Co-ordinates(X)"
                      type="text"
                      defaultValue={xcoordinates}
                    />
                  </FormGroup>
                </Col> */}
                {/* <Col md={12}>
                  <FormGroup>
                    <Label for="Area YCoordinates">
                    Y Coordinates
                    </Label>
                    <Input
                      id="ycoordinates"
                      name="ycoordinates"
                      placeholder="Enter Area Co-ordinates(Y)"
                      type="text"
                      defaultValue={ycoordinates}
                    />
                  </FormGroup>
                </Col> */}
              </Row>
              <Row>
                <Col md={6}>
              <FormGroup>
                <Label for="description">
                  Total Population
                </Label>
                <Input
                  id="Population"
                  name="Population"
                  placeholder="Total Population"
                  type='number'
                  defaultValue={Population}
                />
              </FormGroup>
              </Col>
              {/* <Col md={6}>
              <FormGroup>
                <Label for="Survivors">
                Families Surved
                </Label>
                <Input
                  id="survivors"
                  name="survivors"
                  placeholder="Enter Estimated survivors"
                  type='text'
                  defaultValue={survivors}
                />
              </FormGroup>
              </Col> */}
              {/* <Col md={6}>
              <FormGroup>
                <Label for="Deaths">
                Individual Surved
                </Label>
                <Input
                  id="deaths"
                  name="deaths"
                  placeholder="Enter Estimated deaths"
                  type='text'
                  defaultValue={deaths}
                />
              </FormGroup>
              </Col> */}
              <Col md={6}>
              <FormGroup>
                <Label for="Date">
                Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  placeholder="Choose date"
                  type='date'
                  defaultValue={date}
                />
              </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                <Label for="Shelters">
                Shelters provided
                </Label>
                <Input
                  id="shelters"
                  name="shelters"
                  placeholder="Enter Estimated shelters( for familes)"
                  type='text'
                  defaultValue={shelters}
                />
              </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                <Label for="Food">
                Food Provided
                </Label>
                <Input
                  id="food"
                  name="food"
                  placeholder="Enter Required food ( for individuals)"
                  type='text'
                  defaultValue={food}
                />
              </FormGroup>
              </Col>
             
              <Col md={6}>
              <FormGroup>
                <Label for="Medicine">
                Medicine Provided
                </Label>
                <Input
                  id="medicine"
                  name="medicine"
                  placeholder="Enter Required medicine ( for individuals)"
                  type='text'
                  defaultValue={medicine}
                />
              </FormGroup>
              </Col>
              {/* <Col md={6}>
              <FormGroup>
                <Label for="thumbnail">
                Thumbnail
                </Label>
                <Input
                  id="thumbnail"
                  name="thumbnail"
                  placeholder="Upload Thumbnail"
                  type='text'
                  defaultValue={Thumbnail}
                />
              </FormGroup>
              </Col> */}
              <Col md={6}>
              <FormGroup>
                <Label for="Gallery">
                Gallery
                </Label>
                <Input
                  id="gallery"
                  name="gallery"
                  placeholder="Upload Disaster Pictures(If Any)"
                  type='file'
                  multiple
                />
              </FormGroup>
              </Col>
              </Row>
              {/* <Row>
                <Col md={12}>
                <FormGroup>
                  <Label for="category">
                    Course Category
                  </Label>
                  <Input
                    id="category"
                    name="category"
                    type="select"
                    defaultValue={category}
                  >  
                    <option value="English">
                      English
                    </option>
                    <option value="Science">
                      Science
                    </option>
                    <option value="Technology">
                      Technology
                    </option>
                    <option value="Visa">
                      Visa 
                    </option>
                    <option value="Mathematics">
                      Mathematics
                    </option>
                    <option value="Computer">
                      Computer
                    </option>
                  </Input>
                </FormGroup>
              </Col>
              </Row>
            */}
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
        {/* Delete modal */}
 
        <Modal isOpen={deletemodal} toggle={DeletetoggleClose} {...args} size='sm'>
          <ModalHeader toggle={DeletetoggleClose} >Delete Information</ModalHeader>
          <ModalBody>
            Are you sure you want to delete <b>{tempName}</b>?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => {DeleteInformation()}}>
              Delete
            </Button>{' '}
            <Button color="secondary" onClick={DeletetoggleClose}>
              Cancel
            </Button>
          </ModalFooter>

          </Modal>
    <Modal isOpen={modal} toggle={toggle} {...args} size='lg'>
        <Form  role="form" onSubmit={AddInformation}>
          <ModalHeader  className="text-center" toggle={toggle}><b>Add Relied Activities Information</b></ModalHeader>

          <ModalBody>
          {/* <Alert color="danger" isOpen={Error} toggle={onDismissError}>
           <strong> {errorMessage} </strong> 
          </Alert>
   */}
              <Row >
              {role === 'NGO' ? (
              <Col md={6}>
                  <FormGroup>
                    <Label for="Disaster Type">
                      NGO_Name*
                    </Label>
                    <Input
                      id="NgoName"
                      name="ngoname"
                      readOnly
                      disabled
                      // placeholder="Enter information type"
                      type="select"
                    >
                    {/* <option value=""> </option> */}
                    {/* {usertable ?
                        usertable
                          
                          .map((row, index) => {
                            return ( */}
                              <option key={user_info._id} value={user_info.name}>
                                {user_info.name}
                              </option>
                            {/* )
                          })
                        :
                        <h1>No information Selected Yet</h1>
                      }  */}

                  {/* {options.map((option) => (
                  <option key={option._id} value={option._id} style={{  color: '#333'}}>
                  {option.dis_title}
                  </option>
                  ))} */}
                     </Input>
                  </FormGroup>
                </Col>
                 ) : (
                <Col md={6}>
                  <FormGroup>
                    <Label for="Disaster Type">
                      NGO Name*
                    </Label>
                    <Input
                      id="NgoName"
                      name="ngoname"
                      // placeholder="Enter information type"
                      type="select"
                    >
                    {/* <option value="Please select NGO Name"> </option> */}
                  {/* {options.map((option) => (
                  <option key={option._id} value={option._id} >
                  {option.dis_title}
                  </option>
                  ))} */}
                  <option value=""> Please select NGO Name</option>
                  {usertable ?
                        usertable
                          
                        .filter(row => row.role === 'NGO')
                          .map((row, index) => {
                            return (
                              // <option value="Please select NGO Name"></option> 
                              <option key={index} value={row.name}>
                                {row.name}
                              </option>
                            )
                          })
                        :
                        <h1>No information Selected Yet</h1>
                      }
                     </Input>
                  </FormGroup>
                </Col>
                 )}
                <Col md={6}>
                  <FormGroup>
                    
                    <Label for="Disaster Type">
                      Disaster Name*
                    </Label>
                    <Input
                      id="disasterType"
                      name="disasterType"
                      placeholder="Enter information type"
                      type="select"
                    >
                      
                      {/* {usertable ?
                        usertable
                          
                          .filter(row => row.Role === 'NGO')
                          .map((row, index) => {
                            return (
                              <option key={index} value={row._id}>
                                {row.dis_type}
                              </option>
                            )
                          })
                        :
                        <h1>No information Selected Yet</h1>
                      } */}
                    {/* <Input type="select" name="disasterType" id="disasterType"  placeholder="Enter Information type" > */}
                    <option value="">Enter Disaster Name</option>
                  {options.map((options) => (
                  <option key={options._id} value={options.dis_title} style={{  color: '#333'}}>
                  {options.dis_title}
                  </option>
                  ))}
                     </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Disaster Title">
                      Information Title*
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter Disaster title"
                      type="text"
                      required 
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Disaster Title">
                      Description*
                    </Label>
                    <Input
                      id="Description"
                      name="Description"
                      placeholder="Enter Disaster Description"
                      type="text"
                      required 
                    />
                  </FormGroup>
                </Col>
                {/* <Col md={6}>
                  <FormGroup>
                    <Label for="Disaster Area">
                      Disaster Area*
                    </Label> */}
                    {/* <Input
                      id="area"
                      name="area"
                      placeholder="Enter Disaster area"
                      type="text"
                    /> */}
                    {/* <Input type="select" name="area" id="area"    placeholder="Enter Disaster Area" required >
                    <option value="">Enter Disaster Area</option>
                    <option value="option1">Lahore</option>
                     <option value="option2">Sargodha</option>
                     <option value="option3">Multan</option>
                     <option value="option3">Swaat</option>
                     <option value="option3">Krachi</option>
                     <option value="option3">Kalaam</option>
                     <option value="option3">Murree</option>
                     <option value="option3">Islamabad</option>
                     <option value="option3">Faislbbad</option>
                     <option value="option3">Gujranwala</option>
                     <option value="option3">Sakkhar</option>
                     <option value="option3">Hiadrabad</option>
                     <option value="option3">Haripur</option>
                     <option value="option3">Abbotabad</option>
                     </Input>
                  </FormGroup>
                </Col> */}
                {/* <Col md={6}>
                  <FormGroup>
                    <Label for="Area XCoordinates">
                     X Coordinates*
                    </Label>
                    <Input
                      id="xcoordinates"
                      name="xcoordinates"
                      placeholder="Enter Area Co-ordinates(X)"
                      type="text"
                      required
                    />
                  </FormGroup>
                </Col> */}
                {/* <Col md={12}>
                  <FormGroup>
                    <Label for="Area YCoordinates">
                    Y Coordinates*
                    </Label>
                    <Input
                      id="ycoordinates"
                      name="ycoordinates"
                      placeholder="Enter Area Co-ordinates(Y)"
                      type="text"
                      required
                    />
                  </FormGroup>
                </Col> */}
              </Row>
              <Row>
                <Col md={6}>
              <FormGroup>
                <Label for="population">
                Total Population*
                </Label>
                <Input
                  id="population"
                  name="population"
                  placeholder="Enter Estimated Population"
                  type='number'
                  min="0"
                  max="10000000"
                  required
                />
              </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                <Label for="Date">
                Date*
                </Label>
                <Input
                  id="date"
                  name="date"
                  placeholder="Choose date"
                  type='date'
                  min="2023-01-01" // Add the minimum date allowed here
                  max="2023-12-31"
                  required
                />
              </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                <Label for="Shelters">
                Shelters Provided*
                </Label>
                <Input
                  id="shelters"
                  name="shelters"
                  placeholder="Enter Estimated shelters( for familes)"
                  type='number'
                  min="0"
                  max="1000000"
                  required
                />
              </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                <Label for="Food">
                Food Provided*
                </Label>
                <Input
                  id="food"
                  name="food"
                  placeholder="Enter Required food ( for individuals)"
                  type='number'
                  min="0"
                  max="10000000"
                  required
                />
              </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                <Label for="Medicine">
                Medicine Provided*
                </Label>
                <Input
                  id="medicine"
                  name="medicine"
                  placeholder="Enter Required medicine ( for individuals)"
                  type='number'
                  min="0"
                  max="10000000"
                  required
                />
              </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                <Label for="thumbnail">
                Thumbnail
                </Label>
                <Input
                  id="thumbnail"
                  name="thumbnail"
                  placeholder="Upload Thumbnail"
                  type='file'
                />
              </FormGroup>
              </Col>
              <Col md={12}>
              <FormGroup>
                <Label for="files">
                Gallery
                </Label>
                <Input
                  onChange={handleFileInputChange}
                  id="files"
                  name="files"
                  placeholder="Upload Disaster Pictures(If Any)"
                  type='file'
                  multiple
                />
              </FormGroup>
              </Col>
              </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" >
              Add Information
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
        </Modal>
        <Modal isOpen={deletemodal} toggle={DeletetoggleClose} {...args} size='sm'>
          <ModalHeader toggle={DeletetoggleClose} onClick={DeleteInformation}>Delete Information</ModalHeader>
          <ModalBody>
            Are you sure you want to delete <b>{tempName}</b>?
          </ModalBody>
          <ModalFooter>
            <Button color="danger"  onClick={DeleteInformation}>
              Delete
            </Button>{' '}
            <Button color="secondary" onClick={DeletetoggleClose}>
              Cancel
            </Button>
          </ModalFooter>
          </Modal>
    
    <Row>
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <Row className="align-items-center">
                  <div className="col">
                  <h3 className="text-white mb-0"><b>Relief Information</b></h3>
                  </div>
                  <div className="col text-right">
                    <Button 
                      color="primary"
                       onClick={toggle}
                      size="md"
                    >
                      Add new Information
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              {/* <CardHeader className="border-0">
                <h3 className="mb-0">Courses</h3>
              </CardHeader> */}
              <Table className="align-items-center table-dark table-flush" responsive>
               {/* AllCourses.map(function(item, i){
                  console.log('test');
                  return <li key={i}>Test</li>
                }) */}
                <thead className="thead-dark">
                  <tr>
                   <th scope="col">NGO Name</th>
                    <th scope="col">Disaster</th>
                    <th scope="col">Information Title</th>
                    {/* <th scope="col">Description</th> */}
                    {/* <th scope="col">Information Area</th>
                    <th scope="col">Area XCoordinates</th>
                    <th scope="col">Area YCoordinates</th> */}
                    <th scope="col">Population</th>
                    {/* <th scope="col">Individual Surved</th>
                    <th scope="col">Families surved</th> */}
                    <th scope="col">Date</th>
                    <th scope="col">Shelters Provided</th>
                    <th scope="col">Food Provided</th>
                    <th scope="col">Medicines Provided</th>
                    <th scope="col">Gallery</th>
                    <th scope="col">Action</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                { InformationTable ?
                  InformationTable
                  .map((row, index) => {
                  return(
                  <tr key={index}>
                    <th scope="row">
                      {/* <i className="ni ni-book-bookmark text-blue"/> */}
                      {/* <span className="mb-0 text-sm"> */}
                      {/* {row.dis_type} */}
                      <td>{row.Ngo_Name}</td>
                      {/* </span> */}
                    </th>
                    <td scope="row">
                      {/* <i className="ni ni-book-bookmark text-blue"/> */}
                      {/* <span className="mb-0 text-sm"> */}
                      {row.dis_type}
                      
                      {/* </span> */}
                    </td>
                    <td>{row.dis_title}</td>
                    {/* <td>{row.description}</td> */}
                    {/* <td> */}
                      {/* <Badge color="" className="badge-dot">
                        <i className="bg-info" /> */}
                       {/* {row.dis_area} */}
                      {/* </Badge> */}
                    {/* </td>
                    <td> */}
                      {/* <Badge color="" className="badge-dot">
                        <i className="bg-info" /> */}
                       {/* {row.dis_coordinatesX} */}
                      {/* </Badge> */}
                    {/* </td>  */}
                    {/* <td>{row.dis_coordinatesY}</td> */}
                    <td>{row.population}</td>
                    {/* <td>{row.survivors}</td>
                    <td>{row.deaths}</td> */}
                    <td>{row.date}</td>
                    <td>{row.shelters}</td>
                    <td>{row.food}</td>
                    <td>{row.medicine}</td>
                    <td>{row.gallery}</td>
                    <td>
                      <Button color="primary" onClick={() => {FindInformation(row._id)}}>
                      <i className="ni ni-active-40"></i>
                      </Button>
                      <Button data-id={row._id} data-name={row.dis_title}color="danger" onClick={Deletetoggle}> 
                        <i className="ni ni-fat-remove"></i>
                      </Button>
                    </td>

                  </tr> )
                      })
                      :
                      <tr>
                        <td span="5">No Information found!</td>
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
export default DisasterReliefManagement;