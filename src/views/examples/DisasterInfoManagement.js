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
const DisasterInfoManagement =(args)=>{
const [modal, setModal] = useState(false);
const toggle = () => setModal(!modal);
const closeModal = () => setModal(false);
const [errorMessage, setErrorMessage] = useState("");
const [error, setError] = useState(false);
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
  const[Area,setArea]=useState(null);
  const[Coordinates, setCoordinates]=useState(null);
  const[Population,setPopulation]=useState(null);
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
      method:'get',
      url:"http://localhost:8000/Information/FindInformation?temp_id="+id
    })
    .then(res=>{
      if(res.data)
      {
        setInformationid(res.data._id);
        setDisasterType(res.data.dis_type);
        setTitle(res.data.dis_title);
        setArea(res.data. dis_area);
        setCoordinates(res.data.dis_coordinates);
        setPopulation(res.data.population);
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
    const area=e.target.area.value;
    const coordinates=e.target.Coordinates.value;
    const population=e.target.Population.value;
    e.preventDefault();
    axios({     // edit Course on the base of id API Calling
      method:'post',
      url:"http://localhost:8000/Information/EditInformation",
      data:{id:id,disasterType:disasterType, title:title , area:area, coordinates:coordinates, population:population},

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
    const area=e.target.area.value;
    const coordinates=e.target.coordinates.value;
    const population=e.target.population.value;
    
    axios({    //AddInformation API Calling
      method:'post',
      url:"http://localhost:8000/Information/AddInformation",
      data:{disasterType:disasterType, title:title , area:area, coordinates:coordinates, population:population},
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
      setErrorMessage("Failed to connect to backend")
      setError(true);
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
          <strong> Course Updated successfully! </strong> 
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
                    placeholder="course id"
                    type="hidden"
                    value={id}
                  />
                    <Label for="Coursename">
                      Disaster Type
                    </Label>
                    <Input
                      id="DisasterType"
                      name="DisasterType"
                      placeholder="Enter DisasterType"
                      type="text"
                     defaultValue={disasterType}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Coursecode">
                      Title
                    </Label>
                    <Input
                      id="Title"
                      name="Title"
                      placeholder="Enter Title"
                      type="coursecode"
                      defaultValue={Title}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="startdate">
                      Area
                    </Label>
                    <Input
                      id="Area"
                      name="area"
                      placeholder="Enter area"
                      type="text"
                      defaultValue={Area}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="enddate">
                     Coordinates
                    </Label>
                    <Input
                      id="Coordinates"
                      name="Coordinates"
                      placeholder="Enter Coordinates "
                      type="text"
                      defaultValue={Coordinates}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
              <FormGroup>
                <Label for="description">
                  Population
                </Label>
                <Input
                  id="Population"
                  name="Population"
                  placeholder="Course Population"
                  type='text'
                  defaultValue={Population}
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
          <ModalHeader toggle={toggle}>Add new Disaster Information</ModalHeader>
          <ModalBody>
              <Row >
                <Col md={6}>
                  <FormGroup>
                    <Label for="Disaster Type">
                      Disaster Type
                    </Label>
                    <Input
                      id="disasterType"
                      name="disasterType"
                      placeholder="Enter Disaster type"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Disaster Title">
                      Disaster Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter Disaster title"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Disaster Area">
                      Disaster Area
                    </Label>
                    <Input
                      id="area"
                      name="area"
                      placeholder="Enter Disaster area"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Area Coordinates">
                     Area Coordinates
                    </Label>
                    <Input
                      id="coordinates"
                      name="coordinates"
                      placeholder="Enter Area Co-ordinates"
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
              <FormGroup>
                <Label for="population">
                Population
                </Label>
                <Input
                  id="population"
                  name="population"
                  placeholder="Enter Estimated Population"
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
            <Button color="primary" type="submit" onClick={toggle}>
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
                    <th scope="col">Disaster Area</th>
                    <th scope="col">Area Coordinates</th>
                    <th scope="col">Population</th>
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
                    

                    <td>
                      {/* <Badge color="" className="badge-dot">
                        <i className="bg-info" /> */}
                       {row.dis_area}
                      
                      {/* </Badge> */}
                    </td>
                    <td>
                      {/* <Badge color="" className="badge-dot">
                        <i className="bg-info" /> */}
                       {row.dis_coordinates}
                      {/* </Badge> */}
                    </td> 
                    <td>{row.population}</td>
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