import React, {FC, useEffect} from 'react';
import {Col, Container, Image, Placeholder, Row} from "react-bootstrap";
import {getLocation} from "../../effector/effects/effects";
import {useParams} from "react-router-dom";
import {useStore} from "effector-react";
import {$currentLocationCharacters, $location} from "../../effector/stores/stores";
import DataInfoLine from "../../components/DataInfoLine/DataInfoLine";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import GoBack from "../../components/GoBack/GoBack";
import Loader from "../../components/Loader/Loader";

const LocationPage: FC = (props) => {

    const location = useStore($location)
    const loading = useStore(getLocation.pending)
    const {locationId} = useParams()
    const currentLocationCharacters = useStore($currentLocationCharacters)
    useEffect(() => {
        getLocation(locationId)
    }, [])

    if (loading) {
        return (
            <Container className="bg-transparent">
                <Row style = {{ width : '70px', height : '70px'}}>
                    <Loader/>
                </Row>
            </Container>
        )
    }
    return (
        <Container>
            <Row><GoBack/></Row>
            <Row className="pb-5">
                {loading
                    ? <Placeholder xs={6} bg="dark" style={{height: "15px"}} animation='wave'/>
                    : <h1 className="text-white">Локация {location?.name}</h1>
                }
            </Row>
            <Container className="p-lg-5 bg-white rounded-3">
                <Row className="row-top-block">
                    <Col md={12} lg={4}>
                        <Image className="w-100 rounded-3 large-image-margin"
                               src="https://get.wallhere.com/photo/illustration-planet-space-sky-Earth-atmosphere-Rick-and-Morty-universe-screenshot-computer-wallpaper-outer-space-astronomical-object-104692.jpg"/>
                    </Col>
                    <Col md={{ span: 12, offset: 0 }} lg={8}>
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
                <Row className="mt-5">
                    <h2 className="mb-3">Резиденты</h2>
                    {
                        currentLocationCharacters?.map( character => ( <CharacterCard key={character.id} character={character}/> ) )
                    }
                </Row>
            </Container>
        </Container>
    );
}

export default LocationPage;