import {element, renderLoader} from './cssElements';


export const getInput = () => element.searchInput.value;

export const clearSearch = () => {
    element.searchInput.value = '';
    element.searchResultList.innerHTML = '';
}

const formatRecipeTitle = (recipeTitle, limit = 15) => {
    const formatRecipe = [];
    if (recipeTitle.length > limit) {
        recipeTitle.split(' ').reduce((acc,cur) => {
            if (acc + cur.length <=15) {
                formatRecipe.push(cur);
            }
            return acc + cur.length;

        },0)
        return `${formatRecipe.join(' ')}...`;

    }
    return recipeTitle;
}

const renderRecipe = (recipe) => {
    const markup = `
    <li>
        <a class="results__link results__link--active" href=${recipe.recipe_id}>
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${formatRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;
    element.searchResultList.insertAdjacentHTML('beforeend',markup);

}


const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1: page + 1}>
        <span>Page ${type === 'prev' ? page - 1: page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;



const renderNavigation = (page, count, totalPage) => {

    element.searchResultPages.innerHTML = '';
    const button = (page == 1 ? createButton(page,'next'): (page==totalPage) ? createButton(page,'prev') : `${createButton(page,'prev')} ${createButton(page,'next')}`);
    console.log("output ->" +  button);
    element.searchResultPages.insertAdjacentHTML('afterbegin', button);
}

export const renderResult = (recipes, page=1, resultsPerPage=10) => {
    console.log(page, resultsPerPage);
    recipes.slice((page * resultsPerPage) - resultsPerPage, page * resultsPerPage).forEach(renderRecipe);
    renderNavigation(page, recipes.length, Math.ceil(recipes.length/resultsPerPage));
}