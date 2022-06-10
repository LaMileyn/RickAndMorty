import {createStore} from "effector";
import {
    getAllEpisodes,
    getCharacter,
    getCharacterEpisodes,
    getCurrentEpisodeCharacters,
    getCurrentLocationCharacters, getLocation
} from "../effects/effects";
import {IEpisodeType} from "../../types/episodes/episodes";
import {ICharacter} from "../../types/characters/characters";
import {ILocation} from "../../types/locations/locations";



//////---------------------------- хранения данные связанных с сезонами / эпизодами
//  массив всех эпизодов и сезонов
export const $allTheEpisodesData = createStore<Array<IEpisodeType>>([])
    .on(getAllEpisodes.doneData, (state, data) =>  [...state, ...data] )
// массив эпизодов где поле персонажей - их колличество в текущем эпизоде
export const $allTheEpisodesDataWithLengthCharacters = $allTheEpisodesData.map( data => data.map( element => ({...element, characters: element.characters.length}) ))
// общее колличество сезонов сериала
export const $seasonsCount = $allTheEpisodesData.map( (state,lastState) => {
    return state.length > 0 ? Number(state[state.length - 1].episode.split("E")[0].split("S")[1]) : 0
})
// данные персонажей текущего эпизода
export const $currentEpisodeCharacters = createStore<Array<ICharacter>>([])
    .on( getCurrentEpisodeCharacters.doneData, (_, data) => data)

//////---------------------------- хранения данные связанных с сезонами / эпизодами

//////---------------------------- хранения данные связанных с персонажами
// данные конкретного персонажа
export const $currentCharacter = createStore<ICharacter | null>(null)
    .on( getCharacter.doneData, (state,data) => data)
// массив эпизодов конкретного персонажа
export const $currentCharacterEpisodes = createStore<Array<IEpisodeType>>([])
    .on( getCharacterEpisodes.doneData, (_, data) => data)

//////---------------------------- хранения данные связанных с персонажами

//////---------------------------- хранения данные связанных с локациями
// информация о текущей локации
export const $location = createStore<ILocation | null>(null)
    .on( getLocation.doneData, ( _, data) => data)
// информация о персонажах на текущей локации
export const $currentLocationCharacters = createStore<Array<ICharacter>>([])
    .on( getCurrentLocationCharacters.doneData, ( _, data) => data)

//////---------------------------- хранения данные связанных с локациями

