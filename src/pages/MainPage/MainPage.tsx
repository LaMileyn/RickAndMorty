import React, {FC, useEffect} from 'react';
import {useStore} from "effector-react";
import { getAllEpisodes } from "../../effector/effects/effects";
import {$allTheEpisodesData, $seasonsCount} from "../../effector/stores/stores";
import {Container, Row} from "react-bootstrap";
import Season from "../../components/Season/Season";

const MainPage : FC = (props) => {

    const loading = useStore(getAllEpisodes.pending)
    const data = useStore($allTheEpisodesData)
    const seasonsCount = useStore($seasonsCount)


    useEffect( () => {
        getAllEpisodes('f')
    },[])


    return (
        <Container>
            <Row className="pb-5">
                <h1 className="text-white">Список эпизодов сериала «Рик и Морти»</h1>
            </Row>
            {/* preloader */}
            {loading && (
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
            )}
            {/* preloader */}
            {!loading && Array(seasonsCount).fill(0).map((el, index) => {
                const filteredData = data.filter(element => Number(element.episode.split("E")[0].split("S")[1]) === index + 1)
                return (
                    <Season key={index} data={filteredData} currentSeason={index + 1}/>
                )
            })}
        </Container>
    );
}

export default MainPage;