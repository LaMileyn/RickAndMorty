import {createEffect} from "effector/compat";
import axios, {AxiosResponse} from "axios";
import {IEpisodeType, IGetCurrentPortionEpisodes} from "../../types/episodes/episodes";
import {ICharacter} from "../../types/characters/characters";
import {ILocation} from "../../types/locations/locations";

/// основые данные по запросу
const baseURL = 'https://rickandmortyapi.com/api/'
/// основые данные по запросу


/////------------------------- Запросы связанные с Персонажами
// данные про конкретного персонажа
export const getCharacter = createEffect<string | undefined,ICharacter,Error>( async (id) =>{
    let  { data }  = await axios.get<ICharacter>(baseURL+`character/${id}`);
    await getCharacterEpisodes( data.episode )
    return data
})
// получение списка персонажей текущего эпизода
export const getCurrentEpisodeCharacters = createEffect<Array<string>, Array<ICharacter> ,Error>( async ( urlsList : Array<string> ) => {
    let data = await Promise.all(urlsList.map( url => axios.get(url)))
    return data.map( el => el.data)
})
// получение списка персонажей текущей локации
export const getCurrentLocationCharacters = createEffect<Array<string>, Array<ICharacter> ,Error>( async ( urlsList : Array<string> ) => {
    let data = await Promise.all(urlsList.map( url => axios.get(url)))
    return data.map( el => el.data)
})
/////------------------------- Запросы связанные с Персонажами


/////------------------------- Запросы связанные с Локациями
// получение данных о текущей локации
export const getLocation = createEffect<string | undefined,ILocation,Error>( async (id) => {
    let { data } = await axios.get(`https://rickandmortyapi.com/api/location/${id}`)
    await getCurrentLocationCharacters(data.residents)
    return data
})
/////------------------------- Запросы связанные с Локациями

/////------------------------- Запросы связанные с Эпизодами

// запрос на получения всех серий и сезонов
export const getAllEpisodes= createEffect(async () => {
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

// получение данных о конкретном эпизоде

export const getEpisodeData = createEffect<string | undefined,IEpisodeType,Error>( async (urlId) =>{
    let { data } = await axios.get(`https://rickandmortyapi.com/api/episode/${urlId}`);
    await getCurrentEpisodeCharacters(data.characters)
    return data
})

// запрос на получение эпизодов у конкретного персонажа
export const getCharacterEpisodes = createEffect<Array<string>, Array<IEpisodeType> ,Error>( async ( urlsList ) => {
    let data = await Promise.all(urlsList.map( url => axios.get<IEpisodeType>(url)))
    let episodesArray : Array<IEpisodeType> = data.map( el => el.data)
    return episodesArray
})

/////------------------------- Запросы связанные с Эпизодами