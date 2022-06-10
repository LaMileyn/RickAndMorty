import React, {FC, useState} from 'react';
import {IEpisodeType} from "../../types/episodes/episodes";
import {Col, Container, Form, Image, Row} from "react-bootstrap";
import SeasonTableData from "./SeasonTableData";


interface IProps {
    data : IEpisodeType[],
    currentSeason : number
}

const Season : FC<IProps> = ({ data, currentSeason}) => {
    // текст по которому сортируеются данные в таблице
    const [filterText,setFilterText] = useState("");
    return (
        <Container className="p-4 bg-white border-bottom border-1">
            {/* Информация про сезон и поиск эпизода */}
            <Row className="mb-4 align-items-center" lg={12}>
                <Col lg={5} md={12} className='d-flex align-items-center'>
                    <Image
                        width={50}
                        height={71}
                        rounded={true}
                        className='me-2'
                        src={'https://i.pinimg.com/originals/de/5e/5a/de5e5a88baf51634d4ac6bae9b571f7b.jpg'}>
                    </Image>
                    <p className="fs-5 fw-bold m-0">«Сезон {currentSeason}»</p>
                </Col>
                <Col lg={7} md={12}>
                    <Form>
                        <Form.Control onChange = { (e) => setFilterText(e.target.value)} value={filterText} size="sm" type="text" placeholder="Введите название эпизода.."/>
                    </Form>

                </Col>
            </Row>
            {/* Информация про сезон и поиск эпизода */}
            {/*    Таблица */}
            <SeasonTableData data={data} filterText={filterText}/>
            {/*    Таблица */}

        </Container>
    );
}

export default Season;