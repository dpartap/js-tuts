import axios from 'axios';

export default class Search {
    constructor(query){
        this.query = query;
        this.recipes = [];
    }

    async getResults(){
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = 'e254a83f9337b3162e893469cfb3a94b';

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