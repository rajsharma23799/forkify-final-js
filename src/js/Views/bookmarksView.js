import previewView from "./previewView";
import View from "./View";
class BookmarksView extends View {
	_parentElement = document.querySelector(".bookmarks__list");
	_errorMessage = `No bookmarks yet. Find a nice recipe and bookmarked it :) `;
	_message = "";

	_generateMarkup() {
		//console.log(this._data);
		return this._data
			.map((bookmark) => previewView.render(bookmark, false))
			.join("");
	}

	addHandlerRender(handler) {
		window.addEventListener("load", handler);
	}
}
export default new BookmarksView();
