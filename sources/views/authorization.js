import {JetView} from "webix-jet";

export default class AutorizationView extends JetView {
	config() {
		const toolbar = {
			view: "toolbar",
			cols: [
				{
					view: "button",
					label: "Sing up",
					css: "webix_primary",
					click: () => {
						this.signInForm.hide();
						this.signUpForm.show();
					}
				},
				{
					view: "button",
					label: "Log in",
					css: "webix_primary",
					click: () => {
						this.signUpForm.hide();
						this.signInForm.show();
					}
				},
				{
					view: "button",
					label: "Log out",
					css: "red_button",
					click: () => {
						this.signUpForm.hide();
						this.signInForm.hide();
						webix.confirm({
							ok: "Yes",
							cancel: "No",
							text: "Are you sure that you want to exit?"
						}).then(() => {
							webix.storage.local.remove("token");
							webix.storage.local.remove("user");
							this.closePopup();
						});
					}
				}
			]
		};

		const singInForm = {
			view: "form",
			localId: "singInForm",
			elements: [
				{
					view: "text",
					label: "Username",
					name: "username",
					required: true,
					invalidMessage: "Please, enter username"
				},
				{
					view: "text",
					type: "password",
					label: "Password",
					name: "password",
					required: true,
					invalidMessage: "Please, enter password"

				},
				{
					view: "button",
					label: "Sign in",
					css: "webix_primary",
					click: () => {
						const values = this.signInForm.getValues();
						if (this.signInForm.validate()) {
							webix.ajax().post("http://localhost:3000/auth/login", values).then((data) => {
								const jsonData = data.json();
								if (jsonData.message === "User did not found") {
									webix.message("There is no user with such username");
								}
								if (jsonData.message === "Invalid password") {
									webix.message("Invalid password");
								}
								if (jsonData.token) {
									if (!webix.storage.local.get("token")) {
										webix.message("Successful authorization");
										webix.storage.local.put("token", jsonData.token);
										webix.storage.local.put("user", jsonData.username);
										this.clearForm(this.signInForm);
										this.signInForm.hide();
									}
									else {
										webix.message("User already logined");
									}
								}
							});
						}
					}
				}
			],
			elementsConfig: {
				labelWidth: 100
			}
		};

		const singUpForm = {
			view: "form",
			localId: "singUpForm",
			elements: [
				{
					view: "text",
					label: "Username",
					name: "username",
					required: true,
					invalidMessage: "Please, enter username"
				},
				{
					view: "text",
					type: "password",
					label: "Password",
					name: "password",
					required: true,
					invalidMessage: "Please, enter password"
				},
				{
					view: "text",
					label: "Email",
					name: "email",
					required: true,
					invalidMessage: "Please, enter correct email"
				},
				{
					view: "button",
					label: "Sign up",
					css: "webix_primary",
					click: () => {
						const values = this.signUpForm.getValues();
						if (this.signUpForm.validate()) {
							webix.ajax().post("http://localhost:3000/auth/registration", values).then((data) => {
								if (data.json().message === "User already exists") {
									webix.message("User with this username already exists, enter other username");
								}
								else {
									this.clearForm(this.signUpForm);
									webix.message("User successfuly added");
									this.signUpForm.hide();
								}
							});
						}
					}
				}
			],
			elementsConfig: {
				labelWidth: 100
			},
			rules: {
				email: webix.rules.isEmail
			}
		};

		return {
			rows: [
				toolbar,
				{
					cols: [
						{},
						singInForm,
						singUpForm,
						{}
					]
				}
			]
		};
	}

	init() {
		this.signUpForm = this.$$("singUpForm");
		this.signInForm = this.$$("singInForm");
		this.signInForm.hide();
		this.signUpForm.hide();
	}

	clearForm(form) {
		form.clear();
		form.clearValidation();
	}
}
