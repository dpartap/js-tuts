import axios from 'axios';
import {proxy, key}  from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe(){
        try {
            const recipeQuery = `${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`;
            const results = await axios(recipeQuery);
            console.log(results.data.recipe);
            if (results.data.recipe ) {
                this.title = results.data.recipe.title;
                this.author = results.data.recipe.publisher;
                this.img_url = results.data.recipe.image_url;
                this.url = results.data.recipe.source_url;
                this.rawIngredients = results.data.recipe.ingredients;
                this.serving = 4;
                this.calculateTime();    
            }
        } catch(err) {
            console.log(err);
        }
    }

    calculateTime() {
        this.cookingTime = (Math.floor(this.rawIngredients.length/3)) * 15;       
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.rawIngredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3) Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;
            if (unitIndex > -1) {
                // There is a unit
                // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
                // Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);
                
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };

            } else if (parseInt(arrIng[0], 10)) {
                // There is NO unit, but 1st element is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return objIng;
        });
        this.ingredients = newIngredients;
    }
}