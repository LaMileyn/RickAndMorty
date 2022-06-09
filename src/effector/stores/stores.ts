import {createStore} from "effector";
import {getAllEpisodes, getCharacterEpisodes} from "../effects/effects";
import {IEpisodeType} from "../../types/episodes/episodes";



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
// массив эпизодов конкретного персонажа
export const $currentCharacterEpisodes = createStore<Array<IEpisodeType>>([])
    .on( getCharacterEpisodes.doneData, (_, data) => data)
//////---------------------------- хранения данные связанных с сезонами / эпизодами