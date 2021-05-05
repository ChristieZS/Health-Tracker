import React from "react";
import '../css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationsJohto: []
        };
    }

    componentDidMount() {
        const apiUrl = 'https://pokeapi.co/api/v2/region/2/';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => this.setState({locationsJohto: data.locations}))
    }

    render() {
        return (
            <div className="container">
                <h1>View</h1>
                <br/>
            </div>
        );
    }
}

export default View;