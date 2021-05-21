import React from "react";
import '../css/bootstrap.min.css';
import { Button } from "react-bootstrap";

class Home extends React.Component {
    render() {
        return (
            <div className="container">
                <Button href="/view" className="btn-lg">View Records</Button>
                &nbsp; &nbsp; &nbsp; 
                <Button href="/modify" className="btn-lg">Add Record</Button>
            </div>
        );
    }
}

export default Home;
