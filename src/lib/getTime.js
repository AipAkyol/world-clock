import timezones from "$lib/data/timezones.json";

export default function getTime(continent, city) {
    const date = new Date();
    const localOffsetMilliseconds = (-1) * (date.getTimezoneOffset()) * 60 * 1000;
    const timeOffsetMilliseconds = timezones[continent][city].rawOffset * 60 * 60 * 1000;
    date.setTime(date.getTime() - localOffsetMilliseconds + timeOffsetMilliseconds);
    return date;
} 