import React, { useState,useEffect } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';
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
const DisasterInfoManagement =(args)=>{


const [modal, setModal] = useState(false);
const toggle = () => setModal(!modal);
const closeModal = () => setModal(false);
const [errorMessage, setErrorMessage] = useState("");
const [error, setError] = useState(false);
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
  const [disasterType, setDisasterType] = useState(null);
  const [Title, setTitle]=useState(null);
  const [Description, setDescription]=useState(null);
  const[Area,setArea]=useState(null);
  const[xcoordinates, setCoordinatesX]=useState(null);
  const[ycoordinates, setCoordinatesY]=useState(null);
  const[Population,setPopulation]=useState(null);
  const[survivors,setSurvivors]=useState(null);
  const[deaths,setDeaths]=useState(null);
  const[date,setDate]=useState(null);
  const[shelters,setShelters]=useState(null);
  const[food,setFood]=useState(null);
  const[medicine,setMedicine]=useState(null);
  const[gallery,setGallery]=useState(null);
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
    
function GetInformation(e)
{
  axios({ 
    withCredentials:true,
    method:'get',
    url:"http://localhost:8000/Information/GetInformation",
  })
  .then(res=>{
    if(res.data)
    {
      setInformationTable(res.data);
    }
  })
  .catch(error=>{
    console.log(error);
  })
}

useEffect(() => {
GetInformation();
}, []);
  function FindInformation(id)
  {
    axios({     //FindOneInformation on the base of id API Calling
      withCredentials: true,
      method:'get',
      url:"http://localhost:8000/Information/FindInformation?temp_id="+id
    })
    .then(res=>{
      if(res.data)
      {
        setInformationid(res.data._id);
        setDisasterType(res.data.dis_type);
        setTitle(res.data.dis_title);
        setDescription(res.data.description);
        setArea(res.data. dis_area);
        setCoordinatesX(res.data.dis_coordinatesX);
        setCoordinatesY(res.data.dis_coordinatesY);
        setPopulation(res.data.population);
        setSurvivors(res.data.survivors);
        setDeaths(res.data.deaths);
        setDate(res.data.date);
        setShelters(res.data.shelters);
        setFood(res.data.food);
        setMedicine(res.data.medicine);
        setGallery(res.data.gallery);
        setEditModal(!editmodal);
      }
        
    })
    .catch(error=>{
      
      console.log(error);
      setError(true);
      setEditModal(!editmodal); 
    })
  };
  function EditInformation(e)
  {
    const disasterType=e.target.DisasterType.value;
    const title=e.target.Title.value;
    const Description=e.target.Description.value;
    const area=e.target.area.value;
    const xcoordinates=e.target.xcoordinates.value;
    const ycoordinates=e.target.ycoordinates.value;
    const population=e.target.Population.value;
    const survivors=e.target.survivors.value;
    const deaths=e.target.deaths.value;
    const date=e.target.date.value;
    const shelters=e.target.shelters.value;
    const food=e.target.food.value;
    const medicine=e.target.medicine.value;
    const gallery=e.target.gallery.value;
    e.preventDefault();
    axios({     // edit Information on the base of id API Calling
      withCredentials: true,
      method:'post',
      url:"http://localhost:8000/Information/EditInformation",
      data:{id:id,disasterType:disasterType, title:title ,Description:Description, area:area, xcoordinates:xcoordinates,ycoordinates:ycoordinates,population:population
        ,survivors:survivors,deaths:deaths,date:date,shelters:shelters,food:food,medicine:medicine,gallery:gallery},
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
    axios({     //DeleteCourse API Calling
       withCredentials: true,
      method:'get',
      url:"http://localhost:8000/Information/DeleteInformation?temp_id="+tempId
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
    // console.log(e.target.category.value)
    const disasterType=e.target.disasterType.value;
    const title=e.target.title.value;
    const Description=e.target.Description.value;
    const area=e.target.area.value;
    const xcoordinates=e.target.xcoordinates.value;
    const ycoordinates=e.target.ycoordinates.value;
    const population=e.target.population.value;
    const survivors=e.target.survivors.value;
    const deaths=e.target.deaths.value;
    const date=e.target.date.value;
    const shelters=e.target.shelters.value;
    const food=e.target.food.value;
    const medicine=e.target.medicine.value;
     const gallery=e.target.gallery.value;
     if(survivors>population || deaths>population || shelters>population )
     {
         if(survivors>population){
          setErrorMessage("Survivors should not be greater than population !");
          setError(true);
         }
         else if(deaths>population ){
          setErrorMessage("Deaths should not be greater than population !");
          setError(true);
         }
         else 
         {
          setErrorMessage("Shelters should not be greater than population !");
          setError(true);
         }

     }
    
    axios({    //AddInformation API Calling
      method:'post',
       withCredentials: true,
      url:"http://localhost:8000/Information/AddInformation",
      data:{disasterType:disasterType, title:title ,Description:Description, area:area, xcoordinates:xcoordinates,ycoordinates:ycoordinates, population:population
      ,survivors:survivors,deaths:deaths,date:date,shelters:shelters,food:food,medicine:medicine,gallery:gallery},
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
  
   
return (
    <>
     <NewHeader />
     <Container className="mt--7" fluid>
    <Alert color="danger" isOpen={deletesuccess} toggle={onDismissdeleteSuccess}>
           <strong> Information Deleted! </strong> 
   </Alert>
     <Alert color="success" isOpen={addsuccess} toggle={onDismissaddSuccess}>
          <strong> Information added! </strong> 
    </Alert>
    <Alert color="success" isOpen={editsuccess} toggle={onDismisseditSuccess}>
          <strong> Information Updated successfully! </strong> 
    </Alert>
    <Alert color="danger" isOpen={error} toggle={onDismissError}>
           <strong> {errorMessage}</strong> 
   </Alert>
    <Modal isOpen={editmodal} toggle={edittoggle1} {...args} size='lg'>
        <Form  role="form" onSubmit={EditInformation} >
          <ModalHeader toggle={edittoggle1}>Update Inforamtion</ModalHeader>
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
                    <Label for="DisasterType">
                      Disaster Type
                    </Label>
                    {/* <Input
                      id="DisasterType"
                      name="DisasterType"
                      placeholder="Update DisasterType"
                      type="text"
                     defaultValue={disasterType}
                    /> */}
                    <Input type="select" name="DisasterType" id="disasterType"  placeholder="Enter Disaster type">
                      <option value="">{disasterType}</option>
                      <option value="Provincial">Provincial</option>
                      <option value="Local">Local</option>
                      <option value="National">National</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="DisasterTitle">
                      Title
                    </Label>
                    <Input
                      id="Title"
                      name="Title"
                      placeholder="Enter Title"
                      type="text"
                      defaultValue={Title}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="area">
                      Area
                    </Label>
                    {/* <Input
                      id="Area"
                      name="area"
                      placeholder="Enter area"
                      type="text"
                      defaultValue={Area}
                    /> */}
                    <Input type="select" name="area" id="area" defaultValue={Area} > 
                    {/* <option value="">{Area}</option> */}
                    <option value="Lahore">Lahore</option>
                     <option value="sargodha">Sargodha</option>
                     <option value="Multan">Multan</option>
                     <option value="Swaat">Swaat</option>
                     <option value="Krachi">Krachi</option>
                     <option value="Kalaam">Kalaam</option>
                     <option value="Murree">Murree</option>
                     <option value="Islamabad">Islamabad</option>
                     <option value="Faislbbad">Faislbbad</option>
                     <option value="Gujranwala">Gujranwala</option>
                     <option value="Sakkhar">Sakkhar</option>
                     <option value="Hiadrabad">Hiadrabad</option>
                     <option value="Haripur">Haripur</option>
                     <option value="Abbotabad">Abbotabad</option>
                      <option value="Rawlpindi">Rawlpindi</option>
                     </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Area XCoordinates">
                     Description
                    </Label>
                    <Input
                      id="Description"
                      name="Description"
                      placeholder="Enter Description"
                      type="text"
                      defaultValue={Description}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
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
                </Col>
                <Col md={6}>
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
                </Col>
              </Row>
              <Row>
                <Col md={6}>
              <FormGroup>
                <Label for="description">
                  Population
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
              <Col md={6}>
              <FormGroup>
                <Label for="Survivors">
                Total survivors
                </Label>
                <Input
                  id="survivors"
                  name="survivors"
                  placeholder="Enter Estimated survivors"
                  type='number'
                  defaultValue={survivors}
                />
              </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                <Label for="Deaths">
                Total deaths
                </Label>
                <Input
                  id="deaths"
                  name="deaths"
                  placeholder="Enter Estimated deaths"
                  type='number'
                  defaultValue={deaths}
                />
              </FormGroup>
              </Col>
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
                Shelters Required*
                </Label>
                <Input
                  id="shelters"
                  name="shelters"
                  placeholder="Enter Estimated shelters( for familes)"
                  type='number'
                  defaultValue={shelters}
                />
              </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                <Label for="Food">
                Food Required
                </Label>
                <Input
                  id="food"
                  name="food"
                  placeholder="Enter Required food ( for individuals)"
                  type='number'
                  defaultValue={food}
                />
              </FormGroup>
              </Col>
             
              <Col md={6}>
              <FormGroup>
                <Label for="Medicine">
                Medicine Required
                </Label>
                <Input
                  id="medicine"
                  name="medicine"
                  placeholder="Enter Required medicine ( for individuals)"
                  type='number'
                  defaultValue={medicine}
                />
              </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                <Label for="Gallery">
                Gallery
                </Label>
                <Input
                  id="gallery"
                  name="gallery"
                  placeholder="Upload Disaster Pictures(If Any)"
                  type='text'
                  defaultValue={gallery}
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
          <ModalHeader toggle={DeletetoggleClose} >Delete Course</ModalHeader>
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
          <ModalHeader  className="text-center" toggle={toggle}><b>Add new Disaster Information</b></ModalHeader>
          <ModalBody>
              <Row >
                <Col md={6}>
                  <FormGroup>
                    <Label for="Disaster Type">
                      Disaster Type*
                    </Label>
                    {/* <Input
                      id="disasterType"
                      name="disasterType"
                      placeholder="Enter Disaster type"
                      type="text"
                    />  */}
                     <Input type="select" name="DisasterType" id="disasterType"  placeholder="Enter Disaster type" required >
                      <option value="">Enter Disaster type</option>
                      <option value="Provincial">Provincial</option>
                      <option value="Local">Local</option>
                      <option value="National">National</option>
                    </Input>
                  </FormGroup> 
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Disaster Title">
                      Disaster Title*
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
                    <Label for="Disaster Area">
                      Disaster Area*
                    </Label>
                    {/* <Input
                      id="area"
                      name="area"
                      placeholder="Enter Disaster area"
                      type="text"
                    /> */}
                    <Input type="select" name="area" id="area"  placeholder="Enter Disaster Area" required>
                    <option value="">Enter Disaster Area</option>
                    <option value="Lahore">Lahore</option>
                     <option value="sargodha">Sargodha</option>
                     <option value="Multan">Multan</option>
                     <option value="Swaat">Swaat</option>
                     <option value="Krachi">Karachi</option>
                     <option value="Kalaam">Kalaam</option>
                     <option value="Murree">Murree</option>
                     <option value="Islamabad">Islamabad</option>
                     <option value="Chitral">Chitral</option>
                     <option value="Faislbbad">Faislbbad</option>
                     <option value="Gujranwala">Gujranwala</option>
                     <option value="Sakkhar">Sakkhar</option>
                     <option value="Hiadrabad">Haidrabad</option>
                     <option value="Haripur">Haripur</option>
                     <option value="Abbotabad">Abbotabad</option>
                      <option value="Rawlpindi">Rawlpindi</option>
                     </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Area XCoordinates">
                    Description
                    </Label>
                    <Input
                      id="Description"
                      name="Description"
                      placeholder="Enter Disaster Description "
                      type="text"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Area XCoordinates">
                     X Coordinates
                    </Label>
                    <Input
                      id="xcoordinates"
                      name="xcoordinates"
                      placeholder="Enter Area Co-ordinates(X)"
                      type="text"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Area YCoordinates">
                    Y Coordinates
                    </Label>
                    <Input
                      id="ycoordinates"
                      name="ycoordinates"
                      placeholder="Enter Area Co-ordinates(Y)"
                      type="text"
                      required
                    />
                  </FormGroup>
                </Col>
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
                  required
                  min="0"
                  max="10000000"
                />
              </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                <Label for="Survivors">
                Total survivors
                </Label>
                <Input
                  id="survivors"
                  name="survivors"
                  placeholder="Enter Estimated survivors"
                  type='number'
                  min="0"
                  max="10000000"

                />
              </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                <Label for="Deaths">
                Total deaths
                </Label>
                <Input
                  id="deaths"
                  name="deaths"
                  placeholder="Enter Estimated deaths"
                  type='number'
                  min="0"
                  max="1000000"
                
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
                  required
                  min="2023-01-01" 
                  max="2023-12-31"
                />
              </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                <Label for="Shelters">
                Shelters Required*
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
                Food Required*
                </Label>
                <Input
                  id="food"
                  name="food"
                  placeholder="Enter Required food ( for individuals)"
                  type='number'
                  min="0"
                  max="1000000"
                  required
                />
              </FormGroup>
              </Col>
             
              <Col md={6}>
              <FormGroup>
                <Label for="Medicine">
                Medicine Required*
                </Label>
                <Input
                  id="medicine"
                  name="medicine"
                  placeholder="Enter Required medicine ( for individuals)"
                  type='number'
                  min="0"
                  max="1000000"
                  required
                />
              </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                <Label for="Gallery">
                Gallery
                </Label>
                <Input
                  id="gallery"
                  name="gallery"
                  placeholder="Upload Disaster Pictures(If Any)"
                  type='text'
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
                  </Input>
                </FormGroup>
              </Col>
              </Row> */}

            
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Add Disaster
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
                  <h3 className="text-white mb-0">Disaster Information</h3>
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
                    <th scope="col">Disaster Type</th>
                    <th scope="col">Disaster Title</th>
                    {/* <th scope="col">Description</th> */}
                    <th scope="col">Disaster Area</th>
                    <th scope="col">Area XCoordinates</th>
                    <th scope="col">Area YCoordinates</th>
                    <th scope="col">Population</th>
                    <th scope="col">Survivors</th>
                    <th scope="col">Deaths</th>
                    <th scope="col">Date</th>
                    <th scope="col">Shelters</th>
                    <th scope="col">Food</th>
                    <th scope="col">Medicines</th>
                    <th scope="col">Gallery</th>
                    <th scope="col">Action</th>
                    <th scope="col" />
                  </tr>
                </thead>

                <tbody>
                { InformationTable ?
                  InformationTable.map((row, index) => {
                  return(
                  <tr key={index}>
                    <th scope="row">
                      {/* <i className="ni ni-book-bookmark text-blue"/> */}
                      <span className="mb-0 text-sm">
                      {row.dis_type}
                      </span>
                    </th>
                    <td>{row.dis_title}</td>
                    {/* <td>{row.description}</td> */}
                    <td>
                      {/* <Badge color="" className="badge-dot">
                        <i className="bg-info" /> */}
                       {row.dis_area}
                      
                      {/* </Badge> */}
                    </td>
                    <td>
                      {/* <Badge color="" className="badge-dot">
                        <i className="bg-info" /> */}
                       {row.dis_coordinatesX}
                      {/* </Badge> */}
                    </td> 
                    <td>{row.dis_coordinatesY}</td>
                    <td>{row.population}</td>
                    <td>{row.survivors}</td>
                    <td>{row.deaths}</td>
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
export default DisasterInfoManagement;