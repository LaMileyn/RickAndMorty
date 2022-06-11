import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useStore} from "effector-react";
import {$currentEpisodeCharacters, $currentEpisodeData} from "../../effector/stores/stores";
import {getEpisodeData} from "../../effector/effects/effects";
import {Card, Col, Container, Image, Placeholder, Row} from "react-bootstrap";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import GoBack from "../../components/GoBack/GoBack";
import Loader from "../../components/Loader/Loader";

const EpisodeDetailPage: FC = (props) => {

    const {episodeId} = useParams()
    const currentEpisode = useStore($currentEpisodeData)
    const loading = useStore(getEpisodeData.pending)
    const currentEpisodeCharacters = useStore($currentEpisodeCharacters)

    useEffect(() => {
        getEpisodeData(episodeId)
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
                <h1 className="mb-0 text-white">Эпизод {currentEpisode?.name}</h1>
            </Row>
            <Row>
                <Col xl={12}>
                    <Image
                        className="w-100"
                        // height={450}
                        rounded={true}
                        src={"https://mediaproxy.salon.com/width/1200/https://media.salon.com/2020/05/rick-and-morty-vat-of-acid.png"}/>
                </Col>
            </Row>
            <Row className="pb-3 pt-5 align-items-center">
                <Col md={2}>
                    <h3 className="mb-0 text-white">Дата выхода:</h3>
                </Col>
                <Col md={3} className='text-secondary fs-3'>{currentEpisode?.air_date}</Col>
            </Row>

            <Row className="pb-5 pt-5 align-items-center">
                <Col className="col-w160 w-auto">
                    <h3 className="mb-0 text-white">Персонажи Эпизода:</h3>
                </Col>
            </Row>
            <Row>
                {
                    currentEpisodeCharacters?.map(character => (<CharacterCard key={character.id} character={character}/>))
                }
            </Row>
        </Container>
    );
}

export default EpisodeDetailPage;