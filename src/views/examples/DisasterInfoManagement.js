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
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
const DisasterInfoManagement =(args)=>{

  const formData = new FormData();
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
  const[selectedFiles,setSelectedFiles]=useState(null);
  const[date,setDate]=useState(null);
  const[shelters,setShelters]=useState(null);
  const[food,setFood]=useState(null);
  const[medicine,setMedicine]=useState(null);
  const[gallery,setGallery]=useState(null);
  const[editmodal, setEditModal]=useState(false);
  const onDismisseditSuccess = () => seteditSuccess(false);
  const [editsuccess, seteditSuccess] = useState(false);
  const [customError, setCustomError] = useState('')
  const [isCustomError, setIsCustomError] = useState(false)
  const [filtered_Information, setFilteredInformation] = useState('');
  const [currentInformation, setCurrentinformation] = useState("No Information Selected Yet")

  const handleInformationChange = (e) => {
    const filteredUsers = InformationTable.filter(
      (Information) => Information.dis_title === e.target.value
    );
    setFilteredInformation(filteredUsers);
    setCurrentinformation(e.target.value)
  };

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
        setDescription(res.data.Description);
        setArea(res.data. dis_area);
        // setCoordinatesX(res.data.dis_coordinatesX);
        // setCoordinatesY(res.data.dis_coordinatesY);
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
    e.preventDefault();
    const disasterType=e.target.DisasterType.value;
    const title=e.target.Title.value;
    const Description=e.target.Description.value;
    const area=e.target.area.value;
    // const xcoordinates=e.target.xcoordinates.value;
    // const ycoordinates=e.target.ycoordinates.value;
    const population=parseInt(e.target.Population.value);
    const survivors=parseInt(e.target.survivors.value);
    const deaths=parseInt(e.target.deaths.value);
    const date=e.target.date.value;
    const shelters=parseInt(e.target.shelters.value);
    const food=parseInt(e.target.food.value);
    const medicine=parseInt(e.target.medicine.value);
    // const gallery=e.target.gallery.value;
    if( (survivors + deaths) > population || shelters>population )
     {
         if((survivors+population)> population){
           setIsCustomError(true);
          setErrorMessage("Survivors/deaths should not be greater than population !");
          setError(true);
          console.log("Survivors should not be greater than population !")
         }
        //  else if(deaths>population ){
        //   setIsCustomError(true);
        //   setErrorMessage("Deaths should not be greater than population !");
        //   setError(true);
        //  }
         else if(shelters>population)
         {
          setIsCustomError(true);
          setErrorMessage("Shelters should not be greater than population !");
          setError(true);
         }
        return;
     }
     
    if(selectedFiles){
      selectedFiles.forEach((file) => {
      formData.append('files', file);
      });
    }
    else
    {
      formData.append('files', []);
    }
    formData.append('disasterType', disasterType);
    // formData.append('xcoordinates',xcoordinates );
    // formData.append('ycoordinates',ycoordinates );
    formData.append('Description',Description);
    formData.append('population',population);
    formData.append('title',title);
    formData.append('id',id);
    formData.append('area',area);
    formData.append('date',date);
    formData.append('survivors',survivors);
    formData.append('deaths',deaths);
    formData.append('shelters',shelters);
    formData.append('food',food);
    formData.append('medicine',medicine);
    axios({     
      withCredentials: true,
      method:'post',
      url:"http://localhost:8000/Information/EditInformation",
      // data:{id:id,disasterType:disasterType, title:title ,Description:Description, area:area, xcoordinates:xcoordinates,ycoordinates:ycoordinates,population:population
      //   ,survivors:survivors,deaths:deaths,date:date,shelters:shelters,food:food,medicine:medicine,gallery:gallery},
      data:formData,
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
    axios({     
       withCredentials: true,
      method:'get',
      url:"http://localhost:8000/Information/DeleteInformation?temp_id="+tempId
    })
    .then(res=>{
      if(res.data.indicator=="success")
      {
        setdeleteSuccess(true);
        GetInformation();
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
    // const xcoordinates=e.target.xcoordinates.value;
    // const ycoordinates=e.target.ycoordinates.value;
    const population=parseInt(e.target.population.value);
    const survivors=parseInt(e.target.survivors.value);
    const deaths=parseInt(e.target.deaths.value);
    const date=e.target.date.value;
    const shelters=parseInt(e.target.shelters.value);
    const food=parseInt(e.target.food.value);
    const medicine=parseInt(e.target.medicine.value);
    //  const gallery=e.target.gallery.value;
     if( (survivors + deaths) > population || shelters>population )
     {
         if((survivors + deaths)>population){
           setIsCustomError(true);
          setErrorMessage("Survivors & Deaths should not be greater than population !");
          setError(true);
         }
        //  else if(deaths>population ){
        //   setIsCustomError(true);
        //   setErrorMessage("Deaths should not be greater than population !");
        //   setError(true);
        //  }
         else if(shelters>population)
         {
          setIsCustomError(true);
          setErrorMessage("Shelters should not be greater than population !");
          setError(true);
         }
       return;
     }
     selectedFiles.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('disasterType', disasterType);
    // formData.append('xcoordinates',xcoordinates );
    // formData.append('ycoordinates',ycoordinates );
    formData.append('Description',Description);
    formData.append('population',population);
    formData.append('title',title);
    formData.append('area',area);
    formData.append('date',date);
    formData.append('survivors',survivors);
    formData.append('deaths',deaths);
    formData.append('shelters',shelters);
    formData.append('food',food);
    formData.append('medicine',medicine);
    axios({    
      method:'post',
       withCredentials: true,
      url:"http://localhost:8000/Information/AddInformation",
    //   data:{disasterType:disasterType, title:title ,Description:Description, area:area, xcoordinates:xcoordinates,ycoordinates:ycoordinates, population:population
    //   ,survivors:survivors,deaths:deaths,date:date,shelters:shelters,food:food,medicine:medicine,gallery:gallery},
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
  const handleFileInputChange = (event) => {
    const newFiles = [...event.target.files]
    
    console.log(newFiles)
    
    if (newFiles.length < 4 || newFiles.length > 4)
     {
      setIsCustomError(true);
      setErrorMessage("You must have to add 4 images !");
      setError(true);
      return;
     }
     else{
      setSelectedFiles(newFiles)
     }
  };
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let day = currentDate.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    const formattedDate = `${year}-${month}-${day}`;
return (
    <>
     <NewHeader />
     <Container className="mt--9" fluid>
    <Alert color="success" isOpen={deletesuccess} toggle={onDismissdeleteSuccess}>
           <strong> Information Deleted! </strong> 
   </Alert>
     <Alert color="success" isOpen={addsuccess} toggle={onDismissaddSuccess}>
          <strong> Information added! </strong> 
    </Alert>
    <Alert color="success" isOpen={editsuccess} toggle={onDismisseditSuccess}>
          <strong> Information Updated successfully! </strong> 
    </Alert>
    {/* <Alert color="danger" isOpen={error} toggle={onDismissError}>
           <strong> {errorMessage}</strong> 
   </Alert> */}
    <Modal isOpen={editmodal} toggle={edittoggle1} {...args} size='lg'>
        <Form  role="form" onSubmit={EditInformation} >
          <ModalHeader style={{ marginTop:'25px' }} toggle={edittoggle1}><b style={{ fontSize: '18px',marginLeft:'296px',marginTop:'48px' }}>Update Inforamtion</b></ModalHeader>
          <ModalBody>  
          {error ? 
           <Alert color="danger" isOpen={error} toggle={onDismissError}>
           <strong> {errorMessage}</strong> 
           </Alert>
          
          : 
          <></>
          //  <h4 style={{color: 'red'}}></h4> 
        }      
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
                    <Input
                      id="DisasterType"
                      name="DisasterType"
                      placeholder="Update DisasterType"
                      type="text"
                      readOnly
                      
                     defaultValue={disasterType}
                    />
                    {/* <Input type="select" name="DisasterType" id="disasterType"  placeholder="Enter Disaster type">
                      <option value="">{disasterType}</option>
                      <option value="Provincial">Provincial</option>
                      <option value="Local">Local</option>
                      <option value="National">National</option>
                    </Input> */}
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
                      maxLength="50"
                      minLength="30"
                      defaultValue={Title}

                      style={{ color: 'black' }}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="area">
                      Area
                    </Label>
                    <Input
                      id="Area"
                      name="area"
                      placeholder="Enter area"
                      type="text"
                      readOnly
                      defaultValue={Area}
                    />
                    {/* <Input type="select" name="area" id="area" defaultValue={Area} > 
                  
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
                     </Input> */}
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
                      minLength="50"
                      defaultValue={Description}
                      style={{ color: 'black' }}
                    />
                  </FormGroup>
                </Col>
                {/* <Col md={6}>
                  <FormGroup>
                    <Label for="Area XCoordinates">
                     X Coordinates
                    </Label>
                    <Input
                      id="xcoordinates"
                      name="xcoordinates"
                      type="number"
                      step="any" 
                      defaultValue={xcoordinates}
                      style={{ color: 'black' }}
                    />
                  </FormGroup>
                </Col> */}
                {/* <Col md={6}>
                  <FormGroup>
                    <Label for="Area YCoordinates">
                    Y Coordinates
                    </Label>
                    <Input
                      id="ycoordinates"
                      name="ycoordinates"
                      type="number"
                      step="any" 
                      defaultValue={ycoordinates}
                      style={{ color: 'black' }}
                    />
                  </FormGroup>
                </Col> */}
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
                  min="0"
                  max="1000000"
                  defaultValue={Population}
                  style={{ color: 'black' }}
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
                  max="1000000"
                  defaultValue={survivors}
                  style={{ color: 'black' }}
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
                  defaultValue={deaths}
                  style={{ color: 'black' }}
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
                  type='date'
                  readOnly
                  defaultValue={formattedDate}

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
                  placeholder="Enter Estimated shelters"
                  type='number'
                  min="0"
                  max="1000000"
                  defaultValue={shelters}
                  style={{ color: 'black' }}
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
                  placeholder="Enter Required food "
                  type='number'
                  min="0"
                  max="1000000"
                  defaultValue={food}
                  style={{ color: 'black' }}
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
                  placeholder="Enter Required medicine "
                  type='number'
                  min="0"
                  max="1000000"
                  defaultValue={medicine}
                  style={{ color: 'black' }}
                />
              </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                <Label for="Gallery">
                Gallery
                </Label>
                <Input
                  onChange={handleFileInputChange}
                  id="files"
                  name="files"
                  type='file'
                  multiple
                  accept=".png, .jpg, .jpeg"
                />
                <span>First image will be taken as Thumbanil</span>
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
            Are you sure you want to delete this information ?
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
          <ModalHeader  style={{ marginTop:'25px' }} className="text-center" toggle={toggle}><b style={{ fontSize: '18px',marginLeft:'235px',marginTop:'48px' }}>Add new Disaster Information</b></ModalHeader>
          <ModalBody>
          {error ? 
           <Alert color="danger" isOpen={error} toggle={onDismissError}>
           <strong> {errorMessage}</strong> 
           </Alert>
          : 
          <></>
          //  <h4 style={{color: 'red'}}></h4> 
        }
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
                     <Input type="select" name="DisasterType" id="disasterType"  placeholder="Enter Disaster type" required   style={{ color: 'black' }}>
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
                      maxLength="50"
                      minLength="30"
                      required
                      style={{ color: 'black' }}
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
                    <Input type="select" name="area" id="area"  placeholder="Enter Disaster Area"  style={{ color: 'black' }} required>
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
                    Description*
                    </Label>
                    <Input
                      id="Description"
                      name="Description"
                      placeholder="Enter Disaster Description "
                      type="text"
                      required
                      minLength="50"
                      style={{ color: 'black' }}
                    />
                  </FormGroup>
                </Col>
                {/* <Col md={6}>
                  <FormGroup>
                    <Label for="Area XCoordinates">
                     X Coordinates
                    </Label>
                    <Input
                      id="xcoordinates"
                      name="xcoordinates"
                      placeholder="Enter Area Co-ordinates(X)"
                      type="number"
                      step="any" 
                      required
                      style={{ color: 'black' }}
                    />
                  </FormGroup>
                </Col> */}
                {/* <Col md={6}>
                  <FormGroup>
                    <Label for="Area YCoordinates">
                    Y Coordinates
                    </Label>
                    <Input
                      id="ycoordinates"
                      name="ycoordinates"
                      placeholder="Enter Area Co-ordinates(Y)"
                      type="number"
                      step="any" 
                      required
                      style={{ color: 'black' }}
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
                  required
                  min="0"
                  max="10000000"
                  style={{ color: 'black' }}
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
                  style={{ color: 'black' }}

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
                  style={{ color: 'black' }}
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
                  type='date'
                  required
                  readOnly
                  defaultValue={formattedDate}
                  style={{ color: 'black' }}
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
                  placeholder="Enter Estimated shelters"
                  type='number'
                  min="0"
                  max="1000000"
                  style={{ color: 'black' }}
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
                  placeholder="Enter Required food "
                  type='number'
                  min="0"
                  max="1000000"
                  required
                  style={{ color: 'black' }}
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
                  placeholder="Enter Required medicine "
                  type='number'
                  min="0"
                  max="1000000"
                  required
                  style={{ color: 'black' }}
                />
              </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                <Label for="Gallery">
                Gallery*
                </Label>
                <Input
                onChange={handleFileInputChange}
                  id="files"
                  name="files"
                  placeholder="Upload Disaster Pictures(If Any)"
                  type='file'
                  required
                  multiple
                  accept=".png, .jpg, .jpeg"
                />
                 <span>First image will be taken as thumbnail</span>
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
          Are you sure you want to delete this information ?
            {/* Are you sure you want to delete <b>{tempName}</b>? */}
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
                  <Row>
                  <div className="col" style={{marginLeft:"10px"}}>
                    <Input
                      id="user"
                      name="user"
                      type="select"
                      onChange={handleInformationChange}
                      value={currentInformation}
                    >
                      <option  value="No Information Selected Yet">No Information  Selected Yet</option>
                      {InformationTable && InformationTable.length > 0 ? (
                        [...new Set(InformationTable.map(row => row.dis_title))].map((dis_title, index) => (
                          <option key={index} value={dis_title}>
                            {dis_title}
                          </option>
                        ))
                      ) : (
                        <option disabled>No Information Added yet!</option>
                      )}
                    </Input>
                    <Label for="user"> Search Disaster By title</Label>
                  </div>
                    <div className="col "> 
                    <Button 
                      color="primary"
                      onClick={toggle}
                      size="md"
                    >
                      Add new Information
                    </Button>
                  </div>
                  </Row>
                </Row>
              </CardHeader>
              {/* <CardHeader className="border-0">
                <h3 className="mb-0">Courses</h3>
              </CardHeader> */}
              <Table className=" table align-items-center table-dark table-flush" id="table-to-xls" responsive>
               {/* AllCourses.map(function(item, i){
                  return <li key={i}>Test</li>
                }) */}               
                <thead className="thead-dark">
                  <tr>
                    <th scope="col" style={{ textAlign: 'center' }}>Disaster Type</th>
                    <th scope="col">Disaster Title</th>
                    {/* <th scope="col">Description</th> */}
                    <th scope="col">Disaster Area</th>
                    <th scope="col" style={{ textAlign: 'center' }}>Date</th>
                    {/* <th scope="col">Area XCoordinates</th>
                    <th scope="col">Area YCoordinates</th> */}
                    <th scope="col">Population</th>
                    <th scope="col">Survivors</th>
                    <th scope="col">Deaths</th>
                    <th scope="col">Shelters Required</th>
                    <th scope="col">Food Required</th>
                    <th scope="col">Medicines Required</th>
                    {/* <th scope="col">Gallery</th> */}
                    <th scope="col" style={{ textAlign: 'center' }}>Action</th>
                    <th scope="col" />
                  </tr>
                </thead>

                <tbody>
                {/* { InformationTable ?
                  InformationTable.map((row, index) => {
                  return( */}
                  {filtered_Information.length > 0 ?
                    filtered_Information.map((row, index) => {
                      return (
                  <tr key={index}>
                    <th scope="row">
                      <i className="ni ni-book-bookmark text-blue"/>
                      <span className="mb-0 text-sm">
                         {/* {row.dis_type} */}
                      <td>{row.dis_type}</td>
                      </span>
                    </th>
                    <td>{row.dis_title}</td>
                    {/* <td>{row.description}</td> */}
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                       {row.dis_area}
                      </Badge>
                    </td>
                    <td>
                    <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                      {row.date}
                      </Badge>
                      </td>
                    {/* <td>
                       {row.dis_coordinatesX}
                    </td> 
                    <td>{row.dis_coordinatesY}</td> */}
                    <td style={{ textAlign: 'center' }}>  
                      {row.population}
                    </td>
                    <td style={{ textAlign: 'center' }}>{row.survivors}</td>
                    <td style={{ textAlign: 'center' }}>{row.deaths}</td>
                    <td style={{ textAlign: 'center' }}>
                      <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                        {row.shelters}
                        </Badge>
                      </td>
                    <td style={{ textAlign: 'center' }}>{row.food}</td>
                    <td style={{ textAlign: 'center' }}>{row.medicine}</td>
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
                      InformationTable && InformationTable.length > 0 && currentInformation == "No Information Selected Yet" ? (
                        InformationTable.map((row, index) => (
                          <tr key={index}>
                    <th scope="row">
                      <i className="ni ni-book-bookmark text-blue"/>
                      <span className="mb-0 text-sm">
                         {/* {row.dis_type} */}
                      <td>{row.dis_type}</td>
                      </span>
                    </th>
                    <td>{row.dis_title}</td>
                    {/* <td>{row.description}</td> */}
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                       {row.dis_area}
                      </Badge>
                    </td>
                    <td>
                    <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                      {row.date}
                      </Badge>
                      </td>
                    {/* <td>
                       {row.dis_coordinatesX}
                    </td> 
                    <td>{row.dis_coordinatesY}</td> */}
                    <td style={{ textAlign: 'center' }}>  
                      {row.population}
                    </td>
                    <td style={{ textAlign: 'center' }}>{row.survivors}</td>
                    <td style={{ textAlign: 'center' }}>{row.deaths}</td>
                    <td style={{ textAlign: 'center' }}>
                      <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                        {row.shelters}
                        </Badge>
                      </td>
                    <td style={{ textAlign: 'center' }}>{row.food}</td>
                    <td style={{ textAlign: 'center' }}>{row.medicine}</td>
                    <td>
                      <Button color="primary" onClick={() => {FindInformation(row._id)}}>
                      <i className="ni ni-active-40"></i>
                      </Button>
                      <Button data-id={row._id} data-name={row.dis_title}color="danger" onClick={Deletetoggle}> 
                        <i className="ni ni-fat-remove"></i>
                      </Button>
                    </td>

                  </tr> 
                  ))
                  ) :

                    <tr>
                      <td span="5">No Disaster Information added yet !</td>
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