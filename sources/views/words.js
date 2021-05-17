import {JetView} from "webix-jet";

import PopupView from "./popup";

export default class WordsView extends JetView {
	config() {
		const groupsDatatable = {
			view: "datatable",
			localId: "groupDatatable",
			select: true,
			scroll: "y",
			margin: 10,
			columns: [
				{
					id: "name",
					header: "Group name",
					fillspace: true
				},
				{
					id: "date",
					header: "Creating date",
					format: webix.i18n.dateFormatStr
				},
				{
					id: "numberOfWords",
					header: "Number of words"
				},
				{template: "<span class='webix_icon wxi-trash'></span>"}
			],
			onClick: {
				"wxi-trash": (event, id) => {
					webix.confirm({
						text: "Are you sure that you want to remove this activity item?",
						ok: "Yes",
						cancel: "No"
					}).then(() => {
						wordsGroups.remove(id);
					});
					return false;
				}
			},
			on: {
				onAfterSelect: (item) => {
					this.app.callEvent("onGroupSelect", [item.id]);
					this.setParam("id", item.id, true);
				}
			}
		};

		const addGroupToolbar = {
			cols: [
				{
					view: "button",
					localId: "addGroupBUtton",
					value: "Add group",
					css: "webix_primary",
					width: 150,
					click: () => {
						if (this.$$("groupNameLabel").getValue() !== "") {
							const newGroup = {
								name: this.$$("groupNameLabel").getValue(),
								date: new Date(),
								numberOfWords: 0
							};
							webix.ajax().post("http://localhost:3000/wordsGroups", newGroup).then((data) => {
								this.groupsTable.add(data.json());
							});
							this.$$("groupNameLabel").setValue("");
						}

						else {
							webix.message("Please, write group name");
						}
					}
				},
				{},
				{
					view: "text",
					localId: "groupNameLabel",
					label: "Group name",
					labelWidth: 90,
					width: 350
				}
			]
		};

		const addWord = {
			cols: [
				{
					view: "button",
					value: "Add word",
					css: "webix_primary",
					width: 150,
					click: () => {
						this.popup.showPopup();
					}
				},
				{}
			]
		};

		const wordsDatatable = {
			view: "datatable",
			localId: "wordsDatatable",
			select: true,
			columns: [
				{
					id: "englishWord",
					header: "English",
					fillspace: true
				},
				{
					id: "russianWord",
					header: "Russian",
					fillspace: true
				},
				{
					id: "partOfSpeech",
					header: "Part of speech",
					fillspace: true
				}
			]
		};

		return {
			cols: [
				{
					rows: [addGroupToolbar, groupsDatatable]
				},
				{
					rows: [addWord, wordsDatatable]
				}
			]
		};
	}

	init() {
		this.popup = this.ui(PopupView);
		this.groupsTable = this.$$("groupDatatable");
		this.wordsTable = this.$$("wordsDatatable");
		webix.ajax().get("http://localhost:3000/wordsGroups").then((data) => {
			this.groupsTable.parse(data);
			const id = this.getParam("id") || this.groupsTable.getFirstId();

			if (id && this.groupsTable.exists(id)) {
				this.groupsTable.select(id);
			}

			else {
				this.groupsTable.select(this.groupsTable.getFirstId());
			}
		});

		webix.ajax().get("http://localhost:3000/words").then(() => {
			this.wordsTable.filter(item => item.groupId === Number.parseInt(this.getParam("id", true)));
		});
	}

	urlChange() {
		this.wordsTable.filter(item => item.groupId === Number.parseInt(this.getParam("id", true)));
	}
}
