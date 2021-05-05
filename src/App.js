import React from "react";
import {Link, Route, Switch, Router } from "react-router-dom";
import './css/bootstrap.min.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Modify from "./components/modify";
import View from "./components/view";


export default function App() {

  	return (
		<div>
			<Navbar expand="lg" className="navbar">
				<Navbar.Brand> Health Tracker</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav"/>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav>
                        <Link to="/" className="nav-link">View</Link>
                        &nbsp; &nbsp; &nbsp;
                        <Link to="/modify" className="nav-link">Modify</Link>
                        &nbsp; &nbsp; &nbsp;
					</Nav>
				</Navbar.Collapse>
            </Navbar>

			<Switch>
				<Route exact path="/"><View /></Route>
				<Route path="/modify"><Modify /></Route>
			</Switch>			
		</div>
  	);
}




















// import React from 'react';
// import './App.css';
// import Button from 'react-bootstrap/Button';
// import Navbar from 'react-bootstrap/NavBar';
// import Nav from 'react-bootstrap/Nav';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
// import './css/bootstrap.min.css';
// import { Link, Switch, Route, Router } from "react-router-dom";
// import Modify from "./components/modify";

// class App extends React.Component {
//     render() {
//         return (
//         <div className="App">
//             <Navbar bg="light" variant="light">
//                 <Navbar.Brand>Health Tracker</Navbar.Brand>
//                 <Nav className="mr-auto">
//                     <Nav.Link href="#view">View</Nav.Link>
//                     <Nav.Link href="#update">Update</Nav.Link>
//                 </Nav>
//                 <Form inline>
//                     <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//                     <Button variant="outline-primary">Search</Button>
//                 </Form>
//             </Navbar>
//         </div>
//         );
//     }
// }

// export default App;
