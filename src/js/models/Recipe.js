import axios from 'axios';
import {proxy, key}  from '../config';

export default class Recipe {
    constructor(id) {
        this.id - id;
    }

    async getRecipe(){
        try {
            const recipeQuery = `${proxy}https://www.food2fork.com/api/get?key=${key}&q=${this.id}`;
            const results = await axios(recipeQuery);
            this.title = results.data.recipe.title;
            this.author = results.data.recipe.publisher;
            this.img_url = results.data.recipe.image_url;
            this.url = results.data.recipe.source_url;
            this.ingredients = results.data.recipe.ingredients;
            this.serving = 4;
            this.calcTime= calculateTime();
        } catch(err) {
            consolo.log(err);
        }
    }

    calculateTime() {
        this.cookingTime = (Math.floor(this.ingredients.length/3)) * 15;
    }
}