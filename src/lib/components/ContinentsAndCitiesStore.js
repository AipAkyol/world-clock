import { writable } from 'svelte/store';
import { browser } from '$app/environment';

let initialArrayData = [];

if (browser){
    initialArrayData = JSON.parse(localStorage.getItem('storedContinentsAndCities')) || [];
}

export const continentsAndCities = writable(initialArrayData);

if(browser){
continentsAndCities.subscribe(($storedContinentsAndCities) => {
    localStorage.setItem('storedContinentsAndCities', JSON.stringify($storedContinentsAndCities));
});}