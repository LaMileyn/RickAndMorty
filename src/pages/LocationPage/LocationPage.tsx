import React, {FC, useEffect} from 'react';
import {Col, Container, Image, Placeholder, Row} from "react-bootstrap";
import {getLocation} from "../../effector/effects/effects";
import {useParams} from "react-router-dom";
import {useStore} from "effector-react";
import {$currentLocationCharacters, $location} from "../../effector/stores/stores";
import DataInfoLine from "../../components/DataInfoLine/DataInfoLine";
import CharacterCard from "../../components/CharacterCard/CharacterCard";

const LocationPage: FC = (props) => {

    const location = useStore($location)
    const loading = useStore(getLocation.pending)
    const {locationId} = useParams()
    const currentLocationCharacters = useStore($currentLocationCharacters)
    useEffect(() => {
        getLocation(locationId)
    }, [])

    return (
        <Container>
            <Row className="pb-5">
                {loading
                    ? <Placeholder xs={6} bg="dark" style={{height: "15px"}} animation='wave'/>
                    : <h1 className="text-white">Локация {location?.name}</h1>
                }
            </Row>
            <Container className="p-lg-5 bg-white rounded-3">
                <Row>
                    <Col lg={4} md={12}>
                        <Image className="w-100 rounded-3"
                               src="https://phonoteka.org/uploads/posts/2021-04/1619154220_10-phonoteka_org-p-rik-i-morti-fon-11.jpg"/>
                    </Col>
                    <Col md={12} lg={8}>
                        {
                            loading
                                ? (
                                    <>
                                        <Placeholder className="mb-3" xs={6} bg="dark" style={{height: "30px"}}
                                                     animation='wave'/>
                                        <Placeholder xs={6} bg="dark" style={{height: "15px"}} animation='wave'/>
                                        <Placeholder xs={6} bg="dark" style={{height: "15px"}} animation='wave'/>
                                        <Placeholder xs={6} bg="dark" style={{height: "15px"}} animation='wave'/>
                                    </>
                                )
                                : (
                                    <>
                                        <h3 className="pb-2">{location?.name}</h3>
                                        <DataInfoLine headline={"id"} headlineData={location?.id}/>
                                        <DataInfoLine headline={"Измерение"} headlineData={location?.dimension}/>
                                        <DataInfoLine headline={"Тип"} headlineData={location?.type}/>
                                    </>

                                )
                        }

                    </Col>
                </Row>
            {/*     ВЫВОД ПЕРСОНАЖЕЙ*/}
                <Row className="mt-lg-5">
                    <h2 className="mb-3">Резиденты</h2>
                    {
                        currentLocationCharacters?.map( character => ( <CharacterCard character={character}/> ) )
                    }
                </Row>
            </Container>
        </Container>
    );
}

export default LocationPage;