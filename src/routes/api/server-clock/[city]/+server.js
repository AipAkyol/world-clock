import { json } from "@sveltejs/kit";
import timezones from "$lib/data/timezones.json";
export async function GET({params}){
    const city = makeUpperCaseStart(params.city);
    const continent = findContinent(city);
    const time = getTimeforServer(continent,city);
    return json({city,time});
}

function findContinent(city){
    for (let tempContinent in timezones){
        for (let tempCity in timezones[tempContinent]){
            if (tempCity === city){
                return tempContinent;
            }
        }
    }
}

function capitalizeString(input) {
    // Split the input string into an array of words
    const words = input.split('/');

    const _continent = makeUpperCaseStart(words[0]);
    const _secondpart = makeUpperCaseCities(words[1]);
    let capitalizedString = _continent + "/" + _secondpart;
    if (words[2]){
        _thirdpart = makeUpperCaseCities(words[2]);
        capitalizedString += "/" +_thirdpart;
    }
    return capitalizedString;
}

function makeUpperCaseStart(str) {
    const newStr = str.slice(0,1).toUpperCase() + str.slice(1);
    return newStr;
}

function makeUpperCaseCities(str) {
    const list = str.split("_");
    let newStr = "";
    for (let elem in list) {
        newStr += makeUpperCaseStart(list[elem]) + "_"
    }
    newStr = newStr.slice(0,-1);
    return newStr
}

function getTimeforServer(continent, city){
    const date = new Date();
    const timeOffsetMilliseconds = timezones[continent][city].rawOffset * 60 * 60 * 1000;
    date.setTime(date.getTime() + timeOffsetMilliseconds);
    return date;
}