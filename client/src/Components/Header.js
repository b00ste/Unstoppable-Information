import React from 'react';
import styled from 'styled-components';
import {
    Link
} from 'react-router-dom';

const Bar = styled.div`
    width: 100%;
`


function Header() {
    return(
        <>
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
            <div className="progress">
                <Bar className="progress-bar progress-bar-striped progress-bar-animated"></Bar>
            </div>
            <div className="progress">
                <Bar className="progress-bar"></Bar>
            </div>
        </>
    );
}

export default Header;