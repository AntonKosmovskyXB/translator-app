import {JetView} from "webix-jet";

export default class PopupView extends JetView {
	config() {
		const window = {
			view: "window",
			modal: true,
			localId: "popup",
			head: "Add word",
			position: "center",
			width: 600,
			body: {
				view: "form",
				localId: "popupForm",
				elements: [
					{
						view: "text",
						name: "englishWord",
						label: "English word",
						required: true,
						invalidMessage: "Field should not be empty"
					},
					{
						view: "text",
						name: "russianWord",
						label: "Russian word",
						required: true,
						invalidMessage: "Field should not be empty"
					},
					{
						view: "richselect",
						name: "partOfSpeech",
						localId: "partOfSpeech",
						label: "Part of speech",
						options: ["Noun", "Verb", "Adjective", "Participle", "Adverb"],
						required: true,
						invalidMessage: "Please, select one of the options"
					},
					{
						cols: [
							{
								view: "button",
								value: "Cancel",
								click: () => {
									webix.confirm({
										ok: "Yes",
										cancel: "No",
										text: "Are you sure that you want to close editor?"
									}).then(() => {
										this.closePopup();
									});
								}
							},
							{
								view: "button",
								value: "Save",
								localId: "saveButton",
								click: () => {
									this.saveWord();
								}
							}
						]
					}
				],
				elementsConfig: {
					labelWidth: 115
				}
			}
		};

		return window;
	}

	init() {
		this.form = this.$$("popupForm");
		this.popup = this.getRoot();
		this.saveButton = this.$$("saveButton");
		this.on(this.app, "onGroupSelect", (id) => {
			this.currentId = Number.parseInt(id);
		});
	}

	showPopup() {
		this.popup.show();
	}

	closePopup() {
		this.popup.hide();
		this.form.clear();
		this.form.clearValidation();
	}

	saveWord() {
		const validationResult = this.form.validate();
		if (validationResult) {
			const newWord = this.form.getValues();
			newWord.groupId = this.currentId;
			this.closePopup();
		}
	}
}
