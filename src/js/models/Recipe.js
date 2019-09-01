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
        const longUnits = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cup', 'pound'];
        const shortUnits = ['tbsp','tbsp','oz','oz','tsp','tsp','cup', 'pound'];
        const ingredients = this.rawIngredients.map(el => {
            
            let tempIngredient = el.tolowercase();
            longUnits.forEach((unit, i) => {
                tempIngredient.replace(unit, shortUnits[i]);
            })
            tempIngredient = tempIngredient.replace(/ *\([^)]*\) */g, ' ');

            const unitIndex = tempIngredient.split(' ').findIndex(el2 => shortUnits.includes(el2));
            let objectIngredient;
            if(unitIndex > -1) {
                objectIngredient = {
                    count: eval(tempIngredient.slice(0, unitIndex).replace('-','+').join('+')),
                    unit: tempIngredient[unitIndex],
                    ingredient: tempIngredient.slice(unitIndex)
                }
            } else if (parseInt(tempIngredient[0],10)){
                objectIngredient = {
                    count: eval(tempIngredient[0].replace('-','+').join('+')),
                    unit: '',
                    ingredient = tempIngredient
                }              
            }
            else {
                objectIngredient = {
                    count: 0,
                    unit: '',
                    ingredient = tempIngredient
                }

            }

            


            return ingredients;

        });

    }
}