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
        <Row className="py-3 align-items-center" onClick={ () => navigate(`/episode-info/${episode.id}`)}
             style={ { cursor : "pointer"}} >
            <Col xl="3" lg={4} md ={5} sm={12}>
                <Image src={photoEpisode} className="rounded-3 w-100 image-margin"/>
            </Col>
            <Col xl="9" lg={8} md ={7} sm={12}>
                <h4>{episode.name}</h4>
                <p>Сезон {episode.episode.split("E")[0].split("S")[1]} / Серия {episode.episode.split("E")[1]}</p>
                <p>{episode.air_date}</p>
            </Col>
            {/*<Col xl="1" lg={1} md ={1} sm ={12} className="justif-start justify-content-end d-flex">*/}
            {/*    <Image   src={watchIcon} style={{ cursor : "pointer"}}  width={20} height={20}/>*/}
            {/*</Col>*/}
        </Row>

    );
}

export default EpisodeCard;