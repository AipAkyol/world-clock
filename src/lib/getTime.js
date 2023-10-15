import timezones from "$lib/data/timezones.json";
export default function getTime(continent, city){
    const date = new Date();
    const localOffset = (-1) * (date.getTimezoneOffset()/60);
    console.log(timezones[continent][city].rawOffset)
    const timeOffset = timezones[continent][city].rawOffset;
    date.setHours(date.getHours()-localOffset+timeOffset);
    return date;
}