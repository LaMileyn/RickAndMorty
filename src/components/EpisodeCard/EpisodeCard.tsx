import React, {FC, useEffect} from 'react';
import {getCharacterEpisodes} from "../../effector/effects/effects";
import {Col, Image, Row} from "react-bootstrap";
import photoEpisode from '../../files/photos/cat.jpg'
import watchIcon from './../../files/icons/watch.png'
import {IEpisodeType} from "../../types/episodes/episodes";
import {useNavigate} from "react-router-dom";

interface IProps{
    episode : IEpisodeType
}
const EpisodeCard: FC<IProps> = ({ episode}) => {

    const navigate = useNavigate()

    return (
        <Row className="py-3 align-items-center">
            <Col md="3">
                <Image src={photoEpisode} className="rounded-3"/>
            </Col>
            <Col md="8">
                <h4>{episode.name}</h4>
                <p>Сезон {episode.episode.split("E")[0].split("S")[1]} / Серия {episode.episode.split("E")[1]}</p>
                <p>{episode.air_date}</p>
            </Col>
            <Col md="1" className="justify-content-end d-flex">
                <Image onClick={ () => navigate(`/episode-info/${episode.id}`)} src={watchIcon} style={{ cursor : "pointer"}}  width={20} height={20}/>
            </Col>
        </Row>

    );
}

export default EpisodeCard;