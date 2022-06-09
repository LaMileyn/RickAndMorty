// character
interface ICharacterOrigin {
    name : string,
    url : string
}
interface ICharacterLocation {
    name : string,
    url : string
}
export interface ICharacter {
    [ key : string] : any,
    id : number,
    name : string,
    status : string,
    species : string,
    type : string,
    gender : string,
    origin : ICharacterOrigin,
    location : ICharacterLocation,
    image : string,
    episodes : Array<string>
}
// character
