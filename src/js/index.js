import Search from "./models/Search";
import * as searchView from './views/searchView';
import {element, clearLoader} from './views/cssElements';

/*
Global State of the app
*/
const state = {};


const controlSearch = async () => {
    const query = searchView.getInput();
    if (query) {
        searchView.clearSearch();
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