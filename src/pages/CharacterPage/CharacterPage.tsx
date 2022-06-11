import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useStore} from "effector-react";
import {$currentCharacter, $currentCharacterEpisodes} from "../../effector/stores/stores";
import {getCharacter} from "../../effector/effects/effects";
import {Col, Container, Image, Row} from "react-bootstrap";
import DataInfoLine from "../../components/DataInfoLine/DataInfoLine";
import EpisodeCard from "../../components/EpisodeCard/EpisodeCard";
import GoBack from "../../components/GoBack/GoBack";
import Loader from "../../components/Loader/Loader";

const CharacterPage : FC = (props) => {

    const {characterId} = useParams()
    const character = useStore($currentCharacter)
    const loading = useStore(getCharacter.pending)
    const characterEpisodes = useStore($currentCharacterEpisodes)

    useEffect( () => {
        getCharacter(characterId)
    } ,[])

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
            <Row><GoBack /></Row>
            <Row className="pb-5">
                <h1 className="text-white">Персонаж {character?.name}</h1>
            </Row>
            <Container className="p-lg-5 bg-white rounded-3">
                <Row>
                    <Col md={4}><Image src={character?.image} className="rounded-3"/></Col>
                    <Col md={8}>
                        <h3 className="pb-2">{character?.name}</h3>
                        <DataInfoLine headline={"id"} headlineData={character?.id}/>
                        <DataInfoLine headline={"Cтатус"} headlineData={character?.status}/>
                        <DataInfoLine headline={"Гендер"} headlineData={character?.gender}/>
                        <DataInfoLine headline={"Сущность"} headlineData={character?.species}/>
                        <DataInfoLine headline={"Локация"} headlineData={character?.location.name}
                                      url={character?.location.url[character?.location.url.length - 1]}/>
                        <DataInfoLine headline={"Тип"} headlineData={character?.type ? character.type : "Отсутствует"}/>
                    </Col>
                </Row>
                <Row className="pt-5">
                    <h2 className="mb-lg-5">Эпизоды:</h2>
                    {
                        loading
                            ? ( <div>loading</div>)
                            : characterEpisodes.map( episode => (
                                <EpisodeCard key={episode.id} episode={episode}/>
                            ))
                    }
                </Row>
            </Container>
        </Container>
    );
}

export default CharacterPage;