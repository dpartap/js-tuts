import Search from "./models/Search";
import Recipe from "./models/Search";

import * as searchView from './views/searchView';
import {element, renderLoader, clearLoader} from './views/cssElements';

/*
Global State of the app
*/
const state = {};


const controlSearch = async () => {
    const query = searchView.getInput();
    if (query) {
        searchView.clearSearch();
        renderLoader(element.searchResultContainer);
        state.search = new Search(query);
        await state.search.getResults();
        clearLoader();
        searchView.renderResult(state.search.recipes);
    }


}

element.searchForm,addEventListener('submit',e => {
    e.preventDefault();
    controlSearch();
})

element.searchResultPages.addEventListener('click',e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearSearch();
        searchView.renderResult(state.search.recipes, goToPage);        
    }
})

const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    if(id) {
        state.recipe = new Recipe(id);
        await state.recipe.getRecipe();
        console.log(recipe);
    }
    
}

//Recipe Controller
window.addEventListener('hashchange', e => {
    controlRecipe();
});

