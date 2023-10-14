import timezones from "$lib/data/timezones.json";
export default function getTime(city){
    const date = new Date();
    const timeOffset = timezones[city];
    date.setHours(date.getHours()+timeOffset);
    return date;
}