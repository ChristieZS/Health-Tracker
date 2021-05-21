import React from "react";
import '../css/bootstrap.min.css';
import axios from 'axios';
import { Form, Button } from "react-bootstrap";

class Modify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            surname: "",
            animal: "",
            owner: "",
            address: "",
            contactnumber: "",
            examination: "",
            description: "",
            medication: "",
        };
    }

    onChangeForm = (e) => {
        var idName = e.target.id
        this.setState({
            [idName]: e.target.value,
        });
    }

    formSubmit = (e) => {
        e.preventDefault();
        const data = {
            firstname: this.state.firstname,
            surname: this.state.surname,
            animal: this.state.animal,
            owner: this.state.owner,
            address: this.state.address,
            contactnumber: this.state.contactnumber,
            examination: this.state.examination,
            description: this.state.description,
            medication: this.state.medication
        };

        console.log(data)
        const instance = axios.create({
            baseURL: 'http://localhost:8081',
            timeout: 1000
        });

          instance
        .post('/add', data)
        .then((response) => {
            console.log(response.data)
        })
        //.then(clearStates)
        .catch(err => {
            console.log("Error in creating record!");
            console.log(err)
        })
    }

    clearStates = () => {
        var stateVariables = ["firstname", "surname", "animal", "owner", "address", "contactnumber", "examination", "description", "medication"]
        for(var i=0; i<stateVariables; i++) {
            this.setState({
                [stateVariables[i]]: "",
            });
        } 
    }

    render() {
        return (
            <div className="container">
                <h1>Add Records</h1>
                <br/>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Label>Patient's first name: </Form.Label>
                        <Form.Control type="text" id="firstname" className="form-control" value={this.state.firstname} onChange={this.onChangeForm} isValid/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Patient's Surname: </Form.Label>
                        <Form.Control type="text" id="surname" className="form-control" value={this.state.surname} onChange={this.onChangeForm} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Animal: </Form.Label>
                        <Form.Control type="text" id="animal" className="form-control" value={this.state.animal} onChange={this.onChangeForm} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Owner: </Form.Label>
                        <Form.Control type="text" id="owner" className="form-control" value={this.state.owner} onChange={this.onChangeForm} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Address: </Form.Label>
                        <Form.Control type="text" id="address" className="form-control" value={this.state.address} onChange={this.onChangeForm} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contact Number: </Form.Label>
                        <Form.Control type="text" id="contactnumber" className="form-control" value={this.state.contactnumber} onChange={this.onChangeForm} />
                    </Form.Group>
                    <h3>Enter examination record: </h3>
                    <Form.Group>
                        <Form.Label>Examination: </Form.Label>
                        <Form.Control type="text" id="examination" className="form-control" value={this.state.examination} onChange={this.onChangeForm} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description: </Form.Label>
                        <Form.Control type="text" id="description" className="form-control" value={this.state.description} onChange={this.onChangeForm} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Medication: </Form.Label>
                        <Form.Control type="text" id="medication" className="form-control" value={this.state.medication} onChange={this.onChangeForm} />
                    </Form.Group>
                       <Button type="submit" value="Create Record" className="btn btn-primary" onClick={this.formSubmit}> Create Record </Button>
                </Form>
            </div>
        );
    }
}

export default Modify;