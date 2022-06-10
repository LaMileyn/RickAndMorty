import React, {FC} from 'react';
import {ICharacter} from "../../types/characters/characters";
import {Button, Card, Col, ListGroup} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import DataInfoLine from "../DataInfoLine/DataInfoLine";


interface IProps {
    character : ICharacter
}

const CharacterCard : FC<IProps> = ({  character}) => {

    const {image, name, gender, location, species, status, type, id} = character;

    return (
        <Col lg={4} md={6} key={character.id} className='mb-4 align-content-start'>
            <Card className='h-100'>
                <Card.Img
                    variant="top" src={image}/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <ListGroup variant="flush">
                        <DataInfoLine headline={'id'} headlineData={id}/>
                        <DataInfoLine headline={'Cтатус'} headlineData={status}/>
                        <DataInfoLine headline={'Гендер'} headlineData={gender}/>
                        <DataInfoLine headline={'Сущность'} headlineData={species}/>
                        <DataInfoLine headline={'Локация'} headlineData={location.name} url={location.url[location.url.length - 1]}/>
                        <DataInfoLine headline={'Тип'} headlineData={type ? type : "Отсутствует"}/>
                    </ListGroup>
                    <Button className="mt-4" variant="primary">
                        <NavLink
                            className="text-white text-decoration-none"
                            to={`/character-info/${id}`}>Подробнее</NavLink>
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default CharacterCard;