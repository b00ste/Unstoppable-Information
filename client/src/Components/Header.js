import React from 'react';
import styled from 'styled-components';
import 'bootswatch/dist/lux/bootstrap.min.css';
import {
    Link
} from 'react-router-dom';

const ContainerHeader = styled.div`
    
`


function Header() {
    return(
        <ContainerHeader>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Link className="navbar-brand" to="/">Survey App</Link>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/home"> Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/startSurveys"> Start a Survey <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/participateSurveys"> Participate at Surveys <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/aboutUs"> About Us <span className="sr-only">(current)</span></Link>
                    </li>
                </ul>
            </nav>
        </ContainerHeader>
    );
}

export default Header;