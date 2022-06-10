import React, {FC} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, Outlet} from "react-router-dom";

export const MainLayout: FC = () => {
    return (
        <Container>
            <Outlet/>
        </Container>
    )
}

export default MainLayout;