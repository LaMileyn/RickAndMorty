import {createEffect} from "effector/compat";
import axios, {AxiosResponse} from "axios";
import {IEpisodeType, IGetCurrentPortionEpisodes} from "../../types/episodes/episodes";

/// основые данные по запросу
const baseURL = 'https://rickandmortyapi.com/api/'
/// основые данные по запросу


/////------------------------- Запросы связанные с Персонажами

/////------------------------- Запросы связанные с Локациями

/////------------------------- Запросы связанные с Эпизодами

// запрос на получения всех серий и сезонов
export const getAllEpisodes= createEffect<string,Array<IEpisodeType>,Error>(async () => {
    let result : IEpisodeType[] = []
    const getTheData = async (url : string) => {
        // данная фунцкия вызываеться и принимает в свой параметр url адрес для получения эпизодов
        const data = await axios.get<IGetCurrentPortionEpisodes>(url);
        result = [...result,...data.data.results]
        if (data.data.info.next !== null){
            await getTheData(data.data.info.next)
        }
    }
    await getTheData(baseURL + "episode")
    return result
})
// запрос на получение эпизодов у конкретного персонажа
export const getCharacterEpisodes = createEffect<Array<string>, Array<IEpisodeType> ,Error>( async ( urlsList ) => {
    let data = await Promise.all(urlsList.map( url => axios.get<IEpisodeType>(url)))
    let episodesArray : Array<IEpisodeType> = data.map( el => el.data)
    return episodesArray
})
