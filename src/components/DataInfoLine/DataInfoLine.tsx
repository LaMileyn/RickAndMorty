import React, {FC} from 'react';
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

interface IProps {
    url? : string,
    headline : string,
    headlineData : any
}

const DataInfoLine : FC<IProps> = ( { url, headline, headlineData}) => {
    return (
        <ListGroup.Item className="ps-0 border-0 border-bottom">
            <Row>
                <Container>
                    <Row>
                        <Col className="fw-bold ">{headline}:</Col>
                        { url
                            ? (
                                <Col className="d-flex justify-content-end text-end">
                                    <Link to={`/location-info/${url}`}>{headlineData}</Link>
                                </Col>
                            )
                            : <Col className="d-flex justify-content-end text-end">{headlineData}</Col>
                        }
                    </Row>
                </Container>
            </Row>
        </ListGroup.Item>
    );
}

export default DataInfoLine;