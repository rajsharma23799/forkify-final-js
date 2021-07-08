import View from "./View";
import icons from "url:../../img/icons.svg";
import { func } from "assert-plus";
class addRecipeView extends View {
	_message = `Recipe was successfully uploaded :)`;
	_parentElement = document.querySelector(".upload");
	_window = document.querySelector(".add-recipe-window");
	_overlay = document.querySelector(".overlay");
	_btnOpen = document.querySelector(".nav__btn--add-recipe");
	_btnClose = document.querySelector(".btn--close-modal");

	constructor() {
		super();
		this._addHandlerShowWindow();
		this._addHandlerHideWindow();
	}

	toggleWindow() {
		this._overlay.classList.toggle("hidden");
		this._window.classList.toggle("hidden");
	}
	_addHandlerShowWindow() {
		this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
	}

	_addHandlerHideWindow() {
		this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
		this._overlay.addEventListener("click", this.toggleWindow.bind(this));
	}

	addHandlerUpload(handler) {
		this._parentElement.addEventListener("submit", function (e) {
			e.preventDefault();
			const dataArray = [...new FormData(this)];
			const data = Object.fromEntries(dataArray);
			//console.log(data);
			handler(data);
		});
	}
}
export default new addRecipeView();
