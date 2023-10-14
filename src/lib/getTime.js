import timezones from "$lib/data/timezones.json";
export default function getTime(city){
    const date = new Date();
    const localOffset = (-1) * (date.getTimezoneOffset()/60);
    const timeOffset = timezones.europe[city];
    date.setHours(date.getHours()-localOffset+timeOffset);
    return date;
}