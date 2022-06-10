import React, {FC} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, Outlet} from "react-router-dom";

export const MainLayout: FC = () => {
    return (
        <Container>
            <Container className="mb-5">
                <Navbar style={{marginTop: "-45px"}} variant="light">
                    <NavLink
                        className=" fst-italic fs-4 text-secondary"
                        to={'/'}>Главная</NavLink>
                </Navbar>
            </Container>
            <Outlet/>
        </Container>
    )
}

export default MainLayout;