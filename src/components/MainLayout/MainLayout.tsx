import React, {FC} from 'react';
import {Container} from "react-bootstrap";
import { Outlet } from "react-router-dom";

export const MainLayout: FC = () => {
    return (
        <Container>
            <Outlet />
        </Container>
    )
}

export default MainLayout;