import * as model from "../js/model.js";
import recipeView from "./Views/recipeView.js";
import searchView from "./Views/searchView.js";
import paginationView from "./Views/paginationView.js";
import resultsView from "./Views/resultsView.js";
import bookmarksView from "./Views/bookmarksView.js";
import addRecipeView from "./Views/addRecipeView.js";
import { func } from "assert-plus";
import { MODAL_CLOSE_SEC } from "./config.js";
import "core-js/stable"; // polyfillinh other things
import "regenerator-runtime/runtime"; //polyfilling async await
const { recip } = require("prelude-ls");

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//if (module.hot) {
//	module.hot.accept();
//}
const controlRecipes = async function () {
	try {
		const id = window.location.hash.slice(1);
		if (!id) return;
		recipeView.renderSpinner();
		resultsView.update(model.getSearchResultsPage());
		bookmarksView.update(model.state.bookmarks);
		await model.loadRecipe(id);
		const { recipe } = model.state;
		//console.log(recipe);
		//2) rendering recipe

		recipeView.render(model.state.recipe);
		res;
	} catch (err) {
		//console.log(err);
		recipeView.renderError();
	}
};

const controlSearchResults = async function () {
	try {
		const query = searchView.getQuery();
		if (!query) return;
		resultsView.renderSpinner();
		await model.loadSearchResults(query);
		resultsView.render(model.getSearchResultsPage(1));
		paginationView.render(model.state.search);
	} catch (err) {
		console.log(err);
	}
};
controlSearchResults();

const controlPagination = function (goToPage) {
	resultsView.render(model.getSearchResultsPage(goToPage));
	paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
	model.updateServings(newServings);
	recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
	if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
	else model.deleteBookmark(model.state.recipe.id);
	recipeView.update(model.state.recipe);

	//render bookamrks
	bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
	bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
	try {
		addRecipeView.renderSpinner();
		await model.uploadRecipe(newRecipe);
		//console.log(model.state.recipe);
		recipeView.render(model.state.recipe);
		addRecipeView.renderMessage();
		bookmarksView.render(model.state.bookmarks);
		//changeID in url
		window.history.pushState(null, "", `#${model.state.recipe.id}`);
		setTimeout(function () {
			addRecipeView.toggleWindow();
		}, MODAL_CLOSE_SEC * 1000);
	} catch (err) {
		console.log(err);
		addRecipeView.renderError(err.message);
	}
};

const init = function () {
	bookmarksView.addHandlerRender(controlBookmarks);
	recipeView.addHandlerRender(controlRecipes);
	recipeView.addHandlerUpdateServings(controlServings);
	recipeView.addHandlerAddBookmark(controlAddBookmark);
	searchView.addHandlerSearch(controlSearchResults);
	paginationView.addHandlerClick(controlPagination);
	addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

//const clearBookmarks = function(){ only for debugging
//	localStorage.clear('bookmarks')
//}
//clearBookmarks()
