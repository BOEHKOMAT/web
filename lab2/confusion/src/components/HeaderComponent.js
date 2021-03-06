import React, { Component } from 'react';
import { Navbar, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
   constructor(props) {
      super(props);
      
      this.state = {
         isNavOpen: false,
      };
      
      this.toggleNav = this.toggleNav.bind(this);
   }
   
   toggleNav() {
      this.setState({isNavOpen: !this.state.isNavOpen });
   }

   
   render() {
      return (
         <React.Fragment>
            <Navbar dark expand="md">
               <div className="container">
                  <NavbarToggler onClick={this.toggleNav} />
                  <Collapse isOpen={this.state.isNavOpen} navbar>
                     <Nav navbar>
                        <NavItem>
                           <NavLink className="nav-link" to="/menu">
                              <span className="fa fa-list fa-lg"></span> Menu
                           </NavLink>
                        </NavItem>
                        <NavItem>
                           <NavLink className="nav-link" to="/contactus">
                              <span className="fa fa-address-card fa-lg"></span> Contact Us
                           </NavLink>
                        </NavItem>
                     </Nav>
                  </Collapse>
               </div>
            </Navbar>
         </React.Fragment>
      );
   }
}

export default Header;