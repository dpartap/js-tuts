import axios from 'axios';
import {proxy, key}  from '../config';

export default class Search {
    constructor(query){
        this.query = query;
        this.recipes = [];
    }

    async getResults(){
        try{
            const queryString = `${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`;
            const results = await axios(queryString);
            if (results.data.recipes != null) {
                this.recipes = results.data.recipes;
            }
            else {
                throw results.data.error;
            }
            
        }
        catch(error) {
            console.log(`Error from API: ${error}`);
        }
    }
}