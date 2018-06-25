
/*Supporting Interfraces*/
import {Currency} from './currency';
import {Language} from './language'
import { Translations } from './translation';
import { RegionalBlocs } from './regional-blocs';


/*Interfrace for type checking the country objects*/

/*This interface could not be used as the observable's subscribe returns type object which is not
 type compatible with this interface and so this is just left here for any future purpose*/
export interface Country{
    name:string;
    topLevelDomain:string[];
    alpha2Code:string;
    alpha3Code:string,
    callingCodes:number[],
    capital:string,
    altSpellings:string[],
    region:string;
    subregion:string;
    population:number;
    latlng:number[];
    demonym:string;
    area:number;
    gini:number;
    timezones:string[];
    borders:string[],
    nativeName:string,
    numericCode:string,
    currencies:Currency[];
    languages:Language[];
    translations:Translations;
    flag:string;
    regionalBlocs:RegionalBlocs[];
    cioc:string;
}