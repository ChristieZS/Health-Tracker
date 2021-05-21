import React from "react";
import '../css/bootstrap.min.css';
import axios from 'axios';
import { Card, Button, Accordion } from "react-bootstrap";

class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
        };
    }

    async componentDidMount() {
         const instance = axios.create({
             baseURL: 'http://localhost:8081',
             timeout: 1000
         });

        await instance
        .get('/view')
        .then(console.log("into the view"))
        .then(response => this.setState({ patients: response.data }));
    }

    calculateYear = (dob) => {
        var diff_ms = Date.now() - new Date(dob).getTime();
        var age_dt = new Date(diff_ms); 

        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }

    calculateMonth = (dob) => {
        var diff_ms = Date.now() - new Date(dob).getTime();
        var monthCalc = Math.ceil(diff_ms / (1000 * 3600 * 24 * 30)) % 12

        return monthCalc;
    }

    render() {
        return (
            <div className="container">
                <h1>View Records</h1>
                <br/>
                {(this.state.patients ? 
                this.state.patients.map((patient) => {
                    return (
                        <div key={patient._id}>
                        <Card>
                            <Card.Body style={{textTransform: 'capitalize'}}>
                                Patient: {patient.firstname} {patient.surname}
                                <br/>
                                Animal: {patient.animal}
                                <br/>
                                Birth Date: {new Date(patient.birthdate).toLocaleDateString()} ({this.calculateYear(patient.birthdate)} years and {this.calculateMonth(patient.birthdate)} months)
                                <br/>
                                Owner: {patient.owner}
                                <br/>
                                Address: {patient.address}
                                <br/>
                                Contact Number: {patient.contactnumber}
                                <br/>
                                Records:
                                {patient.records ?
                                    patient.records.map(record => {
                                    return (
                                        <div>

                                            <Accordion>
                                                <Card>
                                                    <Card.Header>
                                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                            {record.examination} ({record.date})
                                                        </Accordion.Toggle>
                                                    </Card.Header>
                                                    <Accordion.Collapse eventKey="0">
                                                        <Card.Body>
                                                            <p>Description: {record.description}</p>
                                                            <p>Medication: {record.medication}</p>
                                                            <p>Vet: {record.vet}</p>
                                                        </Card.Body>
                                                    </Accordion.Collapse>
                                                </Card>
                                            </Accordion>
                                            
                                        </div>
                                    ) 
                                    })
                                :
                                    <p>No records available</p>
                                }

                            </Card.Body>
                        </Card>
                        <br/>
                        </div>
                    )
                })
                :
                    <p>loading patient data</p>
                )}

            </div>
        );
    }
}

export default View;