import {createStore} from "effector";
import {getAllEpisodes} from "../effects/effects";
import {IEpisodeType} from "../../types/episodes/episodes";



//////---------------------------- хранения данные связанных с сезонами / эпизодами
export const $allTheEpisodesData = createStore<Array<IEpisodeType>>([])
    .on(getAllEpisodes.doneData, (state, data) =>  [...state, ...data] )

export const $seasonsCount = $allTheEpisodesData.map( (state,lastState) => {
    return state.length > 0 ? Number(state[state.length - 1].episode.split("E")[0].split("S")[1]) : 0
})
