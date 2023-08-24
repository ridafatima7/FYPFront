import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
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
  CardBody,
  Modal, ModalHeader, ModalBody, ModalFooter,
  FormGroup,
  Form,
  Row,
  Input,
  Label
} from "reactstrap";
import NewHeader from "components/Headers/NewHeader.js";
import report from "assets/front-images/report6.jpg"

const AllReports = (args) => {
  const [Disastermodal, setDisasterModal] = useState(false);
  const Disastertoggle = () => setDisasterModal(!modal);
  const [NGOmodal, setNGOModal] = useState(false);
  const NGOtoggle = () => setNGOModal(!modal);
  const [DonationReportmodal, setDonationReportModal] = useState(false);
  const DonationReporttoggle = () => setDonationReportModal(!DonationReportmodal);
  const NGOcloseModal = () => setNGOModal(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedNGO, setSelectedNGO] = useState('');
  const [DisasterType, setDisasterType] = useState('');
  const [InformationTable, setInformationTable] = useState('');
  const [ngoList, setNGOList] = useState([]);
  const [Casualities, setCasualities] = useState('');
  const onDismissError = () => setError(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const[editmodal, setEditModal]=useState(false);
  const onDismisseditSuccess = () => seteditSuccess(false);
  const [editsuccess, seteditSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [IsReport, setIsReport] = useState(false);

  
  const closeModal = () => setModal(false);
  const [usertable, setUsertable] = useState()
  const [Error, setError] = useState("");
  const [donationModel, setDonationModal] = useState(false);
  const donationtoggle = () => setDonationModal(!donationModel);
  const [filteredReports, setFilteredReports] = useState([]);
  const [NGOSet, setNGOSet] = useState([]);
  const [DonorReports, setDonorReports] = useState([]);
  const edittoggle1=(event)=>
  {
    setEditModal(!editmodal);
  };
  const editModalClose=()=>
  {
    setEditModal(!editmodal); 
  }
 const  NGOReportModalClose=()=>{
  setNGOModal(!NGOmodal); 
  }
  const  DisasterReportModalClose=()=>{
  setDisasterModal(!Disastermodal); 
  }
  const  DonationReportModalClose=()=>{
    setDonationReportModal(!DonationReportmodal); 
    }
  const [id, setInformationid] = useState(null);

  const storedUser = localStorage.getItem('user');
  const user_info = JSON.parse(storedUser);
  useEffect(() => {
    axios({
      withCredentials: true,
      method: 'get',
      url: 'http://localhost:8000/auth/get_user'
    })
      //.then((response) => response.json())
      .then((response) => {
        console.log(response);
        const ngos = response.data.filter(user => user.role === 'NGO');
       
        setInformationTable(ngos);

      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  // useEffect(() => {
    const fetchNGOs = async (event) => {
      event.preventDefault()
      if (new Date(startDate) > new Date(endDate)) {
        console.log("Start date cannot be greater than end date");
        setErrorMessage("Start date cannot be greater than end date !");
        setError(true);
        return; 
      }
      try {
        const response = await axios.get('http://localhost:8000/auth/get_user', {
          withCredentials: true,
          params: {
            startDate,
            endDate,
          },
        });
        const ngos = response.data.filter(user => user.role === 'NGO');
        setModal(false)
        setNGOModal(true)
        setUsertable(ngos);
        // setIsReport(true);
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
  //   fetchNGOs();
  // }, [startDate, endDate]);

  // const NGOs =fetchNGOs;
  const ClearData = (event) => {
    event.preventDefault()
    setUsertable([]); 
    setIsReport(false);
  };
  
  const DonationReport = async (e) => {
    e.preventDefault();
    if (new Date(startDate) > new Date(endDate)) {
      console.log("Start date cannot be greater than end date");
      setErrorMessage("Start date cannot be greater than end date !");
      setError(true);
      return; 
    }
    try {
        const response = await axios.post('http://localhost:8000/donations/DonationReport', 
        {
        ngo: NGOSet,
        startDate,
        endDate,
       
       });

      setDonorReports(response.data);
      setIsReport(true);
      setDonationModal(false);
      setDonationReportModal(true);
    } 
    catch (error) 
    {
    console.error(error);
    }
};
const DisasterReport = async (e) => {
  e.preventDefault();
  if (new Date(startDate) > new Date(endDate)) {
    console.log("Start date cannot be greater than end date");
    setErrorMessage("Start date cannot be greater than end date !");
    setError(true);
    return; 
  }
  try {
      const response = await axios.post('http://localhost:8000/information/DisasterReport',
      {
        disasterType: DisasterType,
        startDate,
       endDate,
     
     });

    setFilteredReports(response.data);
    setIsReport(true);
    editModalClose();
    setDisasterModal(true);
  } 
  catch (error) 
  {
  console.error(error);
  }
};
  return (
    <>
      <NewHeader />
      <Container className="mt--9" fluid>
      <Modal isOpen={NGOmodal} toggle={NGOtoggle} {...args} size='lg' style={{ maxWidth: '1000px' }} >
          <Form role="form">
            <ModalHeader toggle={NGOReportModalClose}>NGO Registration Report</ModalHeader>
            <ModalBody>
              <h2 className="display-8" style={{ textAlign: 'center' }}>NGO Registration Report</h2>
              <Table className=" table align-items-center table-dark table-flush" id="table-to-xls" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    {/* <th scope="col">Registered</th> */}
                    <th scope="col">Phone No</th>
                  </tr>
                </thead>
                {/* {IsReport && ( */}
                <tbody>
                {usertable && usertable.length > 0 ? (
                   usertable.map((row, index) => (
                // {usertable.map((row, index) => (
                //  return(
                  
                  <tr key={index}>
                    <th scope="row">
                      <i className="ni ni-book-bookmark text-blue"/>
                      <span className="mb-0 text-sm">
                         {/* {row.dis_type} */}
                      <td>{row.name}</td>
                      </span>
                    </th>
                    <td>{row.email}</td>
                    {/* <td>{row.description}</td> */}
                    {/* <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                       {row.dis_area}
                      </Badge>
                    </td> */}
                    <td>
                    <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                      {row.phone_no}
                      </Badge>
                      </td>
                    {/* <td>
                       {row.dis_coordinatesX}
                    </td> 
                    <td>{row.dis_coordinatesY}</td> */}
                  
                    {/* <td>
                      <Button color="primary" onClick={() => {FindInformation(row._id)}}>
                      <i className="ni ni-active-40"></i>
                      </Button>
                      <Button data-id={row._id} data-name={row.dis_title}color="danger" onClick={Deletetoggle}> 
                        <i className="ni ni-fat-remove"></i>
                      </Button>
                    </td> */}

                  </tr> 
                  // )
                  //     })
                  //     :
                  //     <tr>
                  //       <td span="5">No Information found!</td>
                  //     </tr>
                  //   }
                  // ))}
                  ))
                  ) : (
                    <tr>
                      <td colSpan="3">No Information found!</td>
                    </tr>
                  )}
                </tbody>
                {/* )} */}
              </Table>

            </ModalBody>
            <ModalFooter>
              {/* <Button color="primary" type="submit" >
                Download in Excel
              </Button>{' '} */}
               <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      // style={{ marginLeft: '639px'}}
                      className="download-table-xls-button btn btn-success mb-2"
                      table="table-to-xls"
                      filename="tablexls"
                      sheet="tablexls"
                      buttonText="Export Data to Excel Sheet"/>
              {/* <Button color="secondary" onClick={NGOReportModalClose}> */}
              <Button color="secondary" onClick={NGOReportModalClose}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Modal isOpen={Disastermodal} toggle={Disastertoggle} {...args} size='lg' style={{ maxWidth: '1000px' }} >
          <Form role="form">
            <ModalHeader toggle={DisasterReportModalClose}>Disasters Report</ModalHeader>
            <ModalBody>
              <h2 className="display-8" style={{ textAlign: 'center' }}>Disaster Report</h2>
              <Table className=" table align-items-center table-dark table-flush" id="table-to-xls" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Disaster Type</th>
                    <th scope="col">Disaster Title</th>
                    {/* <th scope="col">Registered</th> */}
                    <th scope="col">Population</th>
                    <th scope="col">Casualities</th>
                    <th scope="col">Survivors</th>
                    <th scope="col">Date</th>

                  </tr>
                </thead>
                {/* {IsReport && ( */}
                <tbody>
                {filteredReports && filteredReports.length > 0 ? (
                filteredReports.map((row, index) => (
                //  return(
                  
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
                    {/* <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                       {row.dis_area}
                      </Badge>
                    </td> */}
                    <td>
                    <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                      {row.population}
                      </Badge>
                      </td>
                    <td>
                       {row.survivors}
                    </td> 
                    <td>{row.deaths}</td>
                    <td>
                    <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                      {row.date}
                      </Badge>
                      </td>
                  </tr> 
                  // )
                  //     })
                  //     :
                  //     <tr>
                  //       <td span="5">No Information found!</td>
                  //     </tr>
                  //   }
                  // ))}
                  ))
                  ) : (
                    <tr>
                      <td colSpan="3">No Information found!</td>
                    </tr>
                  )}
                </tbody>
                {/* )} */}
              </Table>
            </ModalBody>
            <ModalFooter>
              {/* <Button color="primary" type="submit" >
                Download in Excel
              </Button>{' '} */}
               <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      // style={{ marginLeft: '639px'}}
                      className="download-table-xls-button btn btn-success mb-2"
                      table="table-to-xls"
                      filename="tablexls"
                      sheet="tablexls"
                      buttonText="Export Data to Excel Sheet"/>
              {/* <Button color="secondary" onClick={NGOReportModalClose}> */}
              <Button color="secondary" onClick={DisasterReportModalClose}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      <Modal isOpen={editmodal} toggle={edittoggle1} {...args} size='lg'>
        <Form  role="form"  onSubmit={DisasterReport}>
          <ModalHeader style={{ marginTop:'25px' }} toggle={edittoggle1}><b style={{ fontSize: '18px',marginLeft:'296px',marginTop:'48px' }}>Disaster Reports</b></ModalHeader>
          <ModalBody>  
          {Error ? 
           <Alert color="danger" isOpen={Error} toggle={onDismissError}>
           <strong> {errorMessage}</strong> 
           </Alert>
          : 
          <></>
          }      
              <Row>
              <Col md={12} className='text-center'>
                <FormGroup>
                <span>View Disasters on Yearly or Monthly Basis !</span></FormGroup>
                </Col>
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
                    <Input type="select" name="DisasterType" id="disasterType"  placeholder="Select Disaster type"  value={DisasterType}
                      onChange={(e) => setDisasterType(e.target.value)}>
                      <option value="Provincial">Provincial</option>
                      <option value="Local">Local</option>
                      <option value="National">National</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="DisasterTitle">
                     Start Date
                    </Label>
                    <Input
                      id="Title"
                      name="startDate"
                      placeholder="Enter Title"
                      type="date"
                      required
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="area">
                     End Date
                    </Label>
                    <Input
                      id="Area"
                      name="enddate"
                      placeholder="Enter EndDate"
                      type="date"
                      required
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                    
                  </FormGroup>
                </Col>
                {/* <Col md={6}>
                  <FormGroup>
                    <Label for="Area XCoordinates">
                     No of Casualties
                    </Label>
                    <Input
                      id="casualties"
                      name="casualties"
                      type="select"
                      value={Casualities}
                      onChange={(e) => setCasualities(e.target.value)}
                    >
                      <option value="Any">Any</option>
                      <option value="Upto 1000">Upto 1000</option>
                      <option value="More than 1000 but Less than 2000">More than 1000 but Less than 2000</option>
                      <option value="Upto 2000">Upto 2000</option>
                    </Input>
                  </FormGroup>
                </Col> */}
              </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" >
              Generate Report
            </Button>{' '}
            <Button color="secondary" onClick={editModalClose}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
        </Modal>
        <Modal isOpen={DonationReportmodal} toggle={DonationReporttoggle} {...args} size='lg' style={{ maxWidth: '1000px' }} >
          <Form role="form">
            <ModalHeader toggle={DonationReportModalClose}>Donation Report</ModalHeader>
            <ModalBody>
              <h2 className="display-8" style={{ textAlign: 'center' }}>Donation Report</h2>
              <Table className=" table align-items-center table-dark table-flush" id="table-to-xls" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    {/* <th scope="col">Registered</th> */}
                    <th scope="col">Donation</th>
                    <th scope="col">Date</th>

                  </tr>
                </thead>
                {/* {IsReport && ( */}
                <tbody>
                { DonorReports && DonorReports.length > 0 ? (
                   DonorReports.map((row, index) => (
                // {usertable.map((row, index) => (
                //  return(
                  
                  <tr key={index}>
                    <th scope="row">
                      <i className="ni ni-book-bookmark text-blue"/>
                      <span className="mb-0 text-sm">
                         {/* {row.dis_type} */}
                      <td>{row.name}</td>
                      </span>
                    </th>
                    <td>{row.email}</td>
                    {/* <td>{row.description}</td> */}
                    {/* <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                       {row.dis_area}
                      </Badge>
                    </td> */}
                    <td>
                    <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                      {row.NGO}
                      </Badge>
                      </td>
                      <td>{row.Amount}</td>
                    {/* <td>
                       {row.dis_coordinatesX}
                    </td> 
                    <td>{row.dis_coordinatesY}</td> */}
                  
                    {/* <td>
                      <Button color="primary" onClick={() => {FindInformation(row._id)}}>
                      <i className="ni ni-active-40"></i>
                      </Button>
                      <Button data-id={row._id} data-name={row.dis_title}color="danger" onClick={Deletetoggle}> 
                        <i className="ni ni-fat-remove"></i>
                      </Button>
                    </td> */}

                  </tr> 
                  // )
                  //     })
                  //     :
                  //     <tr>
                  //       <td span="5">No Information found!</td>
                  //     </tr>
                  //   }
                  // ))}
                  ))
                  ) : (
                    <tr>
                      <td colSpan="3">No Information found!</td>
                    </tr>
                  )}
                </tbody>
                {/* )} */}
              </Table>

            </ModalBody>
            <ModalFooter>
              {/* <Button color="primary" type="submit" >
                Download in Excel
              </Button>{' '} */}
               <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      // style={{ marginLeft: '639px'}}
                      className="download-table-xls-button btn btn-success mb-2"
                      table="table-to-xls"
                      filename="tablexls"
                      sheet="tablexls"
                      buttonText="Export Data to Excel Sheet"/>
              {/* <Button color="secondary" onClick={NGOReportModalClose}> */}
              <Button color="secondary" onClick={DonationReportModalClose}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Modal isOpen={modal} toggle={toggle} size='lg'>
          <Form role="form"  onSubmit={fetchNGOs}>
            <ModalHeader style={{ marginTop: '25px' }} className="text-center mx-auto" toggle={toggle}><b style={{ fontSize: '18px', marginLeft: '311px', marginTop: '48px' }} > NGO Reports</b></ModalHeader>
            <ModalBody>
            {Error ? 
               <Alert color="danger" isOpen={Error} toggle={onDismissError}>
                 <strong> {errorMessage}</strong> 
               </Alert>
             : 
            <></>
            }      
              <Row >
                <Col md={12} className='text-center'>
                <FormGroup>
                <span>Enter a Start and End date to know how many NGOs has registered so far !</span></FormGroup>
                </Col>
                {/* <Col md={6}>
                  <FormGroup>
                    <Label for="Ngo Name">
                      NGO *
                    </Label>
                    <Input
                      id="Ngo"
                      name="ngo"
                      type="select"
                      required
                    >
                      <option value=""> Please select NGO Name</option>
                      <option value="All NGOs">All NGOs</option>
                      {usertable ?
                        usertable
                          .filter(row => row.role === 'NGO')
                          .map((row, index) => {
                            return (

                              <option key={index} value={row.name}>
                                {row.name}
                              </option>
                            )
                          })
                        :
                        <h1>No NGO Exists</h1>
                      }
                    </Input>

                  </FormGroup>
                </Col> */}
                <Col md={6}>
                  <FormGroup>
                    <Label for="StartDate">
                      Start Date
                    </Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type='date'
                      required
                      placeholder='Choose date '
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="EndDate">
                      End Date
                    </Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type='date'
                      required
                      placeholder='Choose date'
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" onClick={NGOtoggle}>
                Generate Report
              </Button>{' '}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Modal isOpen={donationModel} toggle={donationtoggle} size='lg'>
          <Form role="form"  onSubmit={DonationReport}>
            <ModalHeader style={{ marginTop: '25px' }} className="text-center mx-auto" toggle={donationtoggle}><b style={{ fontSize: '18px', marginLeft: '311px', marginTop: '48px' }} > Donation Reports</b></ModalHeader>
            <ModalBody>
            {Error ? 
               <Alert color="danger" isOpen={Error} toggle={onDismissError}>
                 <strong> {errorMessage}</strong> 
               </Alert>
             : 
            <></>
            }      
              <Row >
              <Col md={12} className='text-center'>
                <FormGroup>
                <span>Enter a Start and End date and select an NGO  to about  NGOs donations records !</span></FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Ngo Name">
                      NGO *
                    </Label>
                    <Input
                      id="Ngo"
                      name="ngo"
                      type="select"
                      required
                      value={NGOSet}
                      onChange={(e) => {
                        e.preventDefault();
                        setNGOSet(e.target.value);
                      }}
                    >
                      {/* <option value="All NGOs">All NGOs</option> */}
                      {InformationTable ?
                        InformationTable
                          .filter(row => row.role === 'NGO')
                          .map((row, index) => {
                            return (

                              <option key={index} value={row.name}>
                                {row.name}
                              </option>
                            )
                          })
                        :
                        <h1>No NGO Exists</h1>
                      }
                    </Input>

                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="StartDate">
                      Start Date
                    </Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type='date'
                      placeholder='Choose date '
                      value={startDate}
                      required
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="EndDate">
                      End Date
                    </Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type='date'
                      placeholder='Choose date'
                      value={endDate}
                      required
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" onClick={DonationReporttoggle}>
                Generate Report
              </Button>{' '}
              <Button color="secondary" onClick={donationtoggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Row>
        <Col md="12">
        <Card className="bg-default shadow">
        <CardBody>
                <Row>
                  <Col md="4" style={{ textAlign: 'right'}}  >
                    <h1 style={{ color: 'white',marginTop: '60px'}} ><b>Generate Reports</b></h1>
                    <Button color="info" size="md"  onClick={toggle} className="mb-2 fixed-width-button" >
                      NGO Reports
                    </Button>
                    <Button color="info" size="md"   onClick={edittoggle1} className="mb-2 fixed-width-button">
                      Disaster Reports
                    </Button>
                    <Button color="info" size="md"  onClick={donationtoggle} className="mb-2" style={{ marginRight: '9px'}}>
                      Donation Reports
                      </Button>
                  </Col>
                  <Col md="8" style={{ marginTop: '20px',marginBottom: '20px'}}>
                    <img
                      src={report}
                      alt="Image"
                      className="img-fluid"
                    />
                  </Col>
                </Row>
                {/* Table */}
                <Row>
               
               
                </Row>
              </CardBody>
          </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default AllReports;