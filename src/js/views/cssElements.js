export const element = {
    searchForm:document.querySelector('.search'),
    searchInput:document.querySelector('.search__field'),
    searchResultList:document.querySelector('.results__list'),
    searchResultContainer: document.querySelector('.results')
}

export const renderLoader = (parent) => {
    const loaderHTML = `
    <div class="loader">
        <svg>
            <use href="img/icons.svg#icon-cw></use>"
        </svg>
    </div>`;
    parent.insertAdjacentHTML('afterbegin', loaderHTML);
} 

export const clearLoader = () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
}