// episode
export interface IEpisodeType {
    [ key : string] : any,
    id : number,
    name: string,
    air_date: string,
    episode: string,
    characters: Array<string> ,
    url: string,
    created: string
}
// episode
// запрос на все эпизоды с пагинацией  возвращает поля results ( наши нужные данные ) и инфо ( след. страница)
export interface IGetCurrentPortionEpisodes {
    info: {
        next : string | null
    }
    results: Array<IEpisodeType>
}