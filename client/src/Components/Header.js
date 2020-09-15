import React from 'react';
import styled from 'styled-components';
import 'bootswatch/dist/lux/bootstrap.min.css';

const ContainerHeader = styled.div`
    
`


function Header() {
    return(
        <ContainerHeader>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="/">Survey App</a>
            </nav>
        </ContainerHeader>
    );
}

export default Header;