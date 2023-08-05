/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Rida Fatima

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useState } from 'react';
import { Link,useHistory,Redirect} from "react-router-dom";
import axios from 'axios'
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
  Alert
} from "reactstrap";

const AdminNavbar = (props) => {
  const history=useHistory();
  if(!localStorage.getItem("user"))
  {
      history.push("/auth")
  }
  const storedUser = localStorage.getItem('user');
  const user_info = JSON.parse(storedUser);
  var user_image = ""
if(user_info.User_img ) // && user_info.User_img.lenght > 0
{
  user_image = user_info.User_img.replace('public/', '')
}
else{
  user_image = "/uploads/OIP.jpeg"
}
    //const [isloggedout, setloggedOut]=useState(false);
    const [error, setError] = useState(false);
    const [addsuccess, setaddSuccess] = useState(false);
    const onDismissaddSuccess = () => setaddSuccess(false);

    function handleSubmit(e) {
      e.preventDefault();
    
      axios.post("http://localhost:8000/auth/logout")
        .then(res => {
          if (res.data === "success") {
            localStorage.clear(); 
            setaddSuccess(true)
            // <Redirect to="/auth/login" />; 
            setaddSuccess(true)
            history.push('/auth/login?Message=LoggedOutSuccessfully');
            

          } else {
            setError(true);
          }
        })
        .catch(error => {
          setError(true);
        });
    }
    
  return (
    <>

      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
        <Alert color="success" isOpen={addsuccess} toggle={onDismissaddSuccess}>
          <strong> Logged out successfully! </strong> 
       </Alert>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form> */}
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      // src={require("../../assets/img/theme/girl.jpeg")}
                      src={`http://localhost:8000/${user_image}`}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                    {user_info.name} 
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem> */}
                {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem> */}
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={handleSubmit}>
                  <i className="ni ni-user-run" />
                  <span >Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
