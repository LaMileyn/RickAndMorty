import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useStore} from "effector-react";
import {$currentCharacter, $currentCharacterEpisodes} from "../../effector/stores/stores";

const CharacterPage : FC = (props) => {

    const {characterId} = useParams()
    const character = useStore($currentCharacter)
    const characterEpisodes = useStore($currentCharacterEpisodes)
    useEffect( () => {

    } ,[])

    return (
        <div></div>
    );
}

export default CharacterPage;