import React, {FC, useEffect} from 'react';
import {useStore} from "effector-react";
import {getAllEpisodes} from "../../effector/effects/effects";
import {$allTheEpisodesData, $seasonsCount} from "../../effector/stores/stores";
import {Container, Row} from "react-bootstrap";
import Season from "../../components/Season/Season";
import Loader from "../../components/Loader/Loader";

const MainPage: FC = (props) => {

    const loading = useStore(getAllEpisodes.pending)
    const data = useStore($allTheEpisodesData)
    const seasonsCount = useStore($seasonsCount)


    useEffect(() => {
        if (data.length === 0) getAllEpisodes()
    }, [])


    return (
        <Container>
            <Row className="pb-5">
                <h1 className="text-white">Список эпизодов сериала «Рик и Морти»</h1>
            </Row>
            {loading && (
                <Row style ={{ width : "100px", height : "100px"}}>
                    <Loader/>
                </Row>
            )}
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