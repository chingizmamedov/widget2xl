/**
 * Created by maykinayki on 3/7/17.
 *
 * @format
 */

/* eslint-disable */

import React, { Component, PropTypes } from "react";

import "core-js";

import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "react-modal-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import classNames from "classnames";
import Loader from "react-loaders";

import Constants from "../../utils/constants";
import { darkenColor } from "../../utils/_";

import Cookie from "js-cookie";

import WebAccountService from "../../services/WebAccountService";
import MarketingService from "../../services/MarketingService";

const alwaysOpenServiceIDS = [4822, 4823, 4846, 4851];

const feedbackTemplateModel2 = {
	properties: {
		id: 17,
		wgtBtnBgColor: "#444a59",
		wgtBtnFontColor: "#ffffff",
		wgtBtnSmileyFontColor: "#ffffff",
		wgtBtnWidth: 211,
		wgtBtnHeight: 50,
		wgtBtnRadiusTop: 0,
		wgtBtnRadiusBottom: 0,
		wgtBtnPosition: "BOTTOM_LEFT",
		wgtBtnText: "",
		wgtBtnTextBold: false,
		wgtBtnTextItalic: false,
		wgtBtnTextUnderlined: false,
		wgtBtnOnHover: false,
		domain: "qmeter.net",
		company_id: 1,
	},
	template: {
		id: 1,
		name: "All in one",
		description: "desc",
		customerLogoUrl:
			"https://qmeter-web-images.s3-us-west-2.amazonaws.com/fa95534d-ab4c-4e1b-9835-4b2b0a9da9ad.png?qqq=274",
		options: {
			mode: "singleRate",
			contactInfoPage: true,
			skipContactInfo: true,
			acceptIncompleteRates: false,
		},
		servicesPage: {
			headerBg: "#ef1f36",
			bgColor: "#ffffff",
			title: {
				text: "Please click on a service to rate.",
				fontColor: "#ffffff",
				bgColor: "#ef1f36",
			},
			buttons: {
				next: {
					text: "next",
					fontColor: "#ffffff",
					bgColor: "#ef1f36",
				},
				logout: {
					text: "Logout",
					fontColor: "#555555",
					bgColor: "#ef1f36",
				},
			},
			services: [
				// {
				//     "id": 1,
				//     "name": "Play framework!",
				//     "fontColor": "#ffffff",
				//     "bgColor": "#ef1f36",
				//     "rateBgColor": "#4a4a4a",
				//     "rateBgOpacity": 50,
				//     "rateFontColor": "#ffffff",
				//     "markPageConnections": {}
				// },
				{
					id: 2,
					name: "Scala",
					fontColor: "#ffffff",
					bgColor: "#c3192c",
					rateBgColor: "#4a4a4a",
					rateBgOpacity: 50,
					rateFontColor: "#ffffff",
					markPageConnections: {
						onVeryBad: 1,
					},
				},
				// {
				//     "id": 3,
				//     "name": "Java",
				//     "fontColor": "#ffffff",
				//     "bgColor": "#971422",
				//     "rateBgColor": "#4a4a4a",
				//     "rateBgOpacity": 50,
				//     "rateFontColor": "#ffffff",
				//     "markPageConnections": {}
				// },
				// {
				//     "id": 4,
				//     "name": "Html",
				//     "fontColor": "#ffffff",
				//     "bgColor": "#6a0e18",
				//     "rateBgColor": "#4a4a4a",
				//     "rateBgOpacity": 50,
				//     "rateFontColor": "#ffffff",
				//     "markPageConnections": {}
				// }
			],
		},
		ratePage: {
			headerBg: "#ef1f36",
			bgColor: "#ffffff",
			showLabels: true,
			title: {
				text: "How was your experience today ?",
				fontColor: "#ffffff",
				bgColor: "#ef1f36",
			},
			rateOption: 5,
			rateOptions: [
				{
					label: "Excellent",
					value: 10,
					bgColor: "#ef1f36",
					fontColor: "#ffffff",
				},
				{
					label: "Good",
					value: 5,
					bgColor: "#cc1a2e",
					fontColor: "#ffffff",
				},
				{
					label: "Neutral",
					value: 0,
					bgColor: "#a81626",
					fontColor: "#ffffff",
				},
				{
					label: "Bad",
					value: -5,
					bgColor: "#85111e",
					fontColor: "#ffffff",
				},
				{
					label: "Unacceptable",
					value: -10,
					bgColor: "#620d16",
					fontColor: "#ffffff",
				},
			],
		},
		markPages: [
			{
				id: 1,
				name: "Why Unacceptable?",
				headerBg: "#ef1f36",
				bgColor: "#ffffff",
				title: {
					text: "Why did you give us Unacceptable rate?",
					fontColor: "#ffffff",
					bgColor: "#ef1f36",
				},
				marks: [
					{
						id: 1,
						name: "I dont like you",
						fontColor: "#ffffff",
						bgColor: "#ef1f36",
					},
					{
						id: 2,
						name: "It is complicated",
						fontColor: "#ffffff",
						bgColor: "#c3192c",
					},
					{
						id: 3,
						name: "Just for fun",
						fontColor: "#ffffff",
						bgColor: "#971422",
					},
					{
						id: 4,
						name: "Lets dance",
						fontColor: "#ffffff",
						bgColor: "#6a0e18",
					},
				],
			},
		],
		contactInfoPage: {
			headerBg: "#ef1f36",
			bgColor: "#ffffff",
			title: {
				text: "Please provide your contact details.",
				fontColor: "#ffffff",
				bgColor: "#ef1f36",
			},
			buttons: {
				submit: {
					text: "Submit",
					fontColor: "#ffffff",
					bgColor: "#ef1f36",
				},
				skip: {
					text: "Skip",
					fontColor: "#ffffff",
					bgColor: "#ef1f36",
				},
			},
			contactInfo: [
				{
					fieldName: "fullName",
					fieldType: "singleLineText",
					placeHolder: "Full name",
					show: true,
					required: true,
				},
				{
					fieldName: "phone",
					fieldType: "phone",
					placeHolder: "Phone Number",
					show: true,
					required: true,
					defaultCountryCode: 971,
				},
				{
					fieldName: "email",
					fieldType: "email",
					placeHolder: "E-mail",
					show: true,
					required: false,
				},
				{
					fieldName: "gender",
					fieldType: "gender",
					placeHolder: "Gender",
					show: false,
					required: false,
				},
				{
					fieldName: "ageRange",
					fieldType: "age_range",
					placeHolder: "Select your age range",
					show: false,
					required: false,
				},
			],
			customFieldType1: -1,
			customFieldType2: -1,
		},
		thankYouPage: {
			headerBg: "#ef1f36",
			bgColor: "#ffffff",
			fontColor: "#ef1f36",
			text: "Thank you for your Feedback !",
			textSize: "sm",
		},
		company_id: 1,
		created_at: 1487509226482,
		updated_at: 1488903398605,
		drafts:
			'{"servicesColorsGenerated":true,"servicesMainColor":"#ef1f36","ratesColorsGenerated":true,"globalCustomized":true,"markPage_1_colorsGeneratd":true,"markPage_1_mainColor":"#ef1f36"}',
	},
};

const widgetFeedbackStatusKey = (id, type) => {
	return "wfs_" + type + "_" + id;
};

const blackListedCompanyID = 287;

const $ = window.$;

export default class FeedbackTemplateView extends Component {
	constructor(props) {
		super(props);

		this.interactionTimeout = 0;
		this.state = {
			location: this.props.location,
			widgetType: this.props.widgetType,
			template: this.props.template,
			languages: this.props.languages,
			selectedLanguage: {
				ltr: true,
				langID: null,
			},
			currentPage: this.props.currentPage,
			selectedService: null,
			selectedRate: this.props.selectedRate,
			selectedMarkPage: this.props.selectedMarkPage,
			isContactFormSkipped: false,
			contactFormData: [],
			response: {
				template_id: this.props.template.id,
				rates: [],
				contactInfo: [],
				comment: "",
			},
			showLoader: false,
			showTextModal: false,
			isLandscape: this.props.isLandscape,
			modifierSelectedMarks: {},
			modifierSelectedMarksData: [],
			comparsionCustomFields: {},
		};

		if (this.isSingleService()) {
			this.state.currentPage =
				this.state.currentPage == "services" ? "rates" : this.state.currentPage;
			this.state.template.options.mode = "singleRate";
			this.state.selectedService = this.state.template.servicesPage.services[0];
		}
	}

	static defaultProps = {
		template: feedbackTemplateModel2.template,
		properties: {},
		currentPage: "services",
		webAccountID: null,
		widgetType: "web_widget", //preview_widget, marketing_widget
		size: "lg", //xs sm md lg xlg
		visibleServiceCount: 5,
		showTablet: false,
		showNextButton: false,
		selectedRate: null,
		selectedMarkPage: null,
		outsideClickMarkPageClose: true,
		marketingAccountID: null,
		targetCustomer: null,
		marketingLink: {},
		isLandscape: false,
	};

	static contextTypes = {
		router: PropTypes.object.isRequired,
	};

	onOrientationChange = (isLandscape) => {
		this.setState({
			isLandscape: isLandscape,
		});
	};

	getUrlParameter = (name) => {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
		let results = regex.exec(window.location.search);
		return results === null
			? ""
			: decodeURIComponent(results[1].replace(/\+/g, " "));
	};

	getRateOptionByValue = (value) => {
		return this.state.template.ratePage.rateOptions.find((rateOption) => {
			return rateOption.value == value;
		});
	};

	checkAutoRate = () => {
		let t = this;
		return (
			t.getUrlParameter("r") != "" &&
			t.getUrlParameter("r") != null &&
			t.state.template.servicesPage.services.length == 1 &&
			t.getRateValueByAutoRate(t.getUrlParameter("r")) != null &&
			t.getRateOptionByValue(
				t.getRateValueByAutoRate(t.getUrlParameter("r")),
			) != null
		);
	};

	getRateValueByAutoRate = (rParameter) => {
		switch (rParameter) {
			case "ex":
				return 10;
			case "gd":
				return 5;
			case "nt":
				return 0;
			case "bd":
				return -5;
			case "vb":
				return -10;
			default:
				return null;
		}
	};

	componentDidMount() {
		let t = this;

		if (this.checkAutoRate()) {
			// now I will give rate and send feedback
			let autoRateValue = t.getRateValueByAutoRate(t.getUrlParameter("r"));
			if (autoRateValue !== null) {
				this.handleRateClick(
					null,
					this.state.template.servicesPage.services[0],
					this.getRateOptionByValue(autoRateValue),
				);
			}
		}

		$("body").addClass("template-page-body");

		window.addEventListener(
			"resize",
			function () {
				if (window.navigator && /Android/.test(window.navigator.appVersion)) {
					if (
						["INPUT", "TEXTAREA"].indexOf(document.activeElement.tagName) > -1
					) {
						window.setTimeout(function () {
							document.activeElement.scrollIntoViewIfNeeded();
						}, 0);
					}
				}
			},
			false,
		);

		var fixServicesSize = function () {
			var servicesList = $(".more-than-five");
			if (servicesList.length) {
				var slHeight = servicesList.height();
				var slItemH = slHeight / 5;
				servicesList.find(".service-item").each(function () {
					$(this).css({
						minHeight: slItemH,
					});
				});
			}
		};

		if (!(t.props.widgetType == "preview_widget" && t.props.isLandscape)) {
			$(window).on("resize", function () {
				fixServicesSize();
			});

			window.setTimeout(function () {
				fixServicesSize();
			}, 100);
		}

		if (t.props.widgetType !== "preview_widget") {
			const mql = window.matchMedia("(orientation: landscape)");
			t.onOrientationChange(mql.matches);
			mql.addListener(function (mq) {
				t.onOrientationChange(mq.matches);
				console.log(mq);
			});
		}

		if (t.props.languages) {
			if (t.props.languages.length == 1) {
				t.setLanguage(t.props.languages[0]);
			} else if (t.props.languages.length > 1) {
				t.goToPage("lang");
			}
		}

		if (t.props.properties.kioskMode !== true) {
			const feedbackStatus = Cookie.get(
				widgetFeedbackStatusKey(t.props.id, t.props.widgetType),
			);
			if (feedbackStatus == "true") {
				t.goToPage("thanks");
			}

			if (t.props.marketingLink && t.props.marketingLink.feedbackID) {
				t.goToPage("thanks");
			}
		} else {
			window.setInterval(t.checkInteractionTimeout, 5 * 1000);
		}

		if (t.props.languages && t.props.languages.length > 1) {
			// start titles animating
			window.setInterval(t.showNextTitle, 3000);
		}

		// const {}
	}

	componentDidUpdate() {
		console.log("this.state", this.state);
		const langID = this.state.selectedLanguage.langID;
		const comparsionLength = Object.keys(this.state.comparsionCustomFields)
			.length;
		if (langID !== null && comparsionLength === 0) {
			const { contactInfo } = this.props.originalTemplate.contactInfoPage;
			const needFields = contactInfo.filter(
				(item) => item.fieldName === "custom_field_1",
			);
			const currFields = this.state.template.contactInfoPage.contactInfo
				.filter((item) => item.fieldName === "custom_field_1")
				.map((item) => item.options);
			console.log("currFields", currFields);
			const { options } = needFields[0];
			console.log("options", options);
			let customObject = {};
			console.log("needFields", needFields);
			customObject[`${currFields[0][0]}`] = options[0];
			customObject[`${currFields[0][1]}`] = options[1];
			this.setState({
				comparsionCustomFields: customObject,
			});
		}
	}

	setLanguage = (lang) => {
		let translatedTemplate = this.props.translatedTemplates[lang.langID];
		this.setState({
			template: translatedTemplate,
			selectedLanguage: lang,
		});
		if (!this.isSingleService()) {
			this.goToPage("services");
		} else if (this.isSingleRate()) {
			this.goToPage("rates");

			translatedTemplate.servicesPage.services[0].isSelected = true;

			this.setState({
				template: translatedTemplate,
				selectedService: translatedTemplate.servicesPage.services[0],
			});
		}
	};

	showNextTitle = () => {
		let t = this;

		if (t.state.currentPage == "lang") {
			let currentLangs = t.state.languages;
			let currentIndex = t.state.currentShowingTitleIndex;
			let nextTitleIndex = 0;
			currentLangs.map((lang, index) => {
				if (currentIndex == index) {
					if (lang.title && lang.title != "") {
						currentLangs[index].show = true;
					} else {
						currentLangs[index].show = false;
						t.setState({ currentShowingTitleIndex: currentIndex + 1 });
						t.showNextTitle();
					}
					if (currentIndex + 1 >= currentLangs.length) {
						nextTitleIndex = 0;
					} else {
						nextTitleIndex = currentIndex + 1;
					}
				} else {
					currentLangs[index].show = false;
				}
			});
			if (t.props.widgetType != "preview_widget") {
				t.setState({
					languages: currentLangs,
					currentShowingTitleIndex: nextTitleIndex,
				});
			}
		}
	};

	componentWillUnmount() {
		$(window).off("resize");
	}

	resetInteractionTimeout = () => {
		let t = this;
		t.interactionTimeout = 0;
	};

	checkInteractionTimeout = () => {
		let t = this;

		$(document).on("change", "select, input, textarea", function () {
			t.resetInteractionTimeout();
		});

		t.interactionTimeout += 5;

		if (t.state.currentPage == "services" && t.interactionTimeout > 59) {
			window.location.reload();
		}

		if (
			(t.state.currentPage == "contacts" ||
				t.state.currentPage == "comments") &&
			t.interactionTimeout > 119
		) {
			window.location.reload();
		}

		if (t.state.currentPage == "thanks" && !t.checkAutoRate()) {
			if (t.props.autoClose) {
				setTimeout(() => {
					window.location.href = "/closekiosk";
				}, 1000);
			} else {
				window.location.reload();
			}
		}

		if (
			t.state.currentPage == "thanks" &&
			t.interactionTimeout > 6 &&
			!t.checkAutoRate()
		) {
			if (t.props.autoClose) {
				window.location.href = "/closekiosk";
			} else {
				window.location.reload();
			}
		}

		console.log(t.interactionTimeout);
	};

	_setPage = (page) => {
		let t = this;

		const subdomainName = window.location.hostname.split(".")[0];
		const isEmailFeedback = subdomainName === "e";
		const isSMSFeedback = subdomainName === "s";

		this.setState(
			{
				currentPage: page,
			},
			() => {
				t.resetInteractionTimeout();

				if (page == "comments") {
					console.log(
						"+++++++++++++++ comment page opened and contact form initialized",
					);
					this.initContactFormValidation();

					var contactFormData = $(t.refs.contactForm).serializeArray();
					contactFormData.forEach(function (_) {
						if (t.props.targetCustomer) {
							if (_.name == "fullName") {
								$("[name='" + _.name + "']").val(t.props.targetCustomer.name);
							}
							if (_.name == "phone") {
								$("[name='" + _.name + "']")
									.val(t.props.targetCustomer.phone)
									.prop("disabled", isSMSFeedback);
							}
							if (_.name == "email") {
								$("[name='" + _.name + "']")
									.val(t.props.targetCustomer.email)
									.prop("disabled", isEmailFeedback);
							}
							if (_.name == "gender") {
								const gender =
									t.props.targetCustomer.gender == "m"
										? "Male"
										: t.props.targetCustomer.gender == "f"
										? "Femaile"
										: "";
								if (gender == "Male") {
									$(".gender-selection-box").first().addClass("active");
								}
								if (gender == "Female") {
									$(".gender-selection-box").eq(1).addClass("active");
								}
								$("[name='" + _.name + "']").val(gender);
							}
							if (_.name == "ageRange") {
								$("[name='" + _.name + "']").val(
									t.props.targetCustomer.age_range,
								);
							}
						} else if (t.props.marketingLink) {
							if (_.name == "phone" && t.props.marketingLink.number) {
								$("[name='" + _.name + "']")
									.val(t.props.marketingLink.number)
									.prop("disabled", isSMSFeedback);
							}
							if (_.name == "email" && t.props.marketingLink.email) {
								$("[name='" + _.name + "']")
									.val(t.props.marketingLink.email)
									.prop("disabled", isEmailFeedback);
							}
						}
					});
					t.initCommentFormValidation();
				}
			},
		);
	};

	checkingCommentPageEnabledByRate = (rates, ratesEnabled) => {
		let list = [];

		rates.forEach((rate) => {
			if (!list.includes(rate.rate)) {
				list.push(rate.rate);
			}
		});

		return (
			(list.includes(-10) && ratesEnabled.onVeryBad) ||
			(list.includes(-5) && ratesEnabled.onBad) ||
			(list.includes(10) && ratesEnabled.onExcellent) ||
			(list.includes(5) && ratesEnabled.onGood) ||
			(list.includes(0) && ratesEnabled.onNeutral)
		);
	};

	goToPage = (page) => {
		let t = this;

		if (t.props.widgetType == "preview_widget") {
			return false;
		}

		if (
			t.state.currentPage == "contacts" ||
			t.state.currentPage == "comments"
		) {
			let formData = $(t.refs.contactForm).serializeArray();
			t.state.contactFormData = formData.map((_) => {
				return {
					fieldName: _.name,
					fieldValue: _.value,
				};
			});
		}

		if (page == "contacts" && !this.state.template.options.contactInfoPage) {
			page = "thanks";
		}

		if (
			page == "comments" &&
			!this.state.template.options.additionalCommentEnabled
		) {
			page = "thanks";
		} else if (
			page == "comments" &&
			!this.checkingCommentPageEnabledByRate(
				this.state.response.rates,
				this.state.template.additionalCommentPage.ratesEnabled,
			)
		) {
			page = "thanks";
		}

		if (page == "thanks") {
			this.setState(
				{
					showLoader: true,
				},
				() => {
					let feedbackStatus =
						t.props.properties.kioskMode !== true
							? Cookie.get(
									widgetFeedbackStatusKey(t.props.id, t.props.widgetType),
							  )
							: "false";

					if (
						feedbackStatus == "true" ||
						t.props.marketingLink.feedbackID ||
						t.getUrlParameter("rated")
					) {
						console.log("thanks1 not send feedback");
						this._setPage(page);
						this.setState({
							showLoader: false,
						});
					} else {
						console.log("thanks2 send feedback");
						this.sendFeeback()
							.then((response) => {
								console.log(response);

								// Dubai Ladies Club redirect to Instructors
								let serviceExistToRedirect = false;
								let givenResponse = { ...this.state.response };

								givenResponse.rates.forEach((rate) => {
									if (rate.service_id == 3907) {
										serviceExistToRedirect = true;
									}
								});

								console.log("shoud i redirect: ", serviceExistToRedirect);
								if (serviceExistToRedirect) {
									let instructorsTemplate = "https://w.qmeter.net/eOG7VO";
									window.location.href = instructorsTemplate;
									return true;
								}
								// Dubai Ladies Club Customization end

								this.setState(
									{
										showLoader: false,
									},
									() => {
										this._setPage(page);
										window.setTimeout(function () {
											t.closeParentWindowIframe();
										}, 4000);

										if (t.checkAutoRate()) {
											var newurl = window.location.href + "&rated=true";
											window.location.replace(newurl);
											// window.history.pushState({ path: newurl }, "", newurl);
										}

										if (t.props.properties.kioskMode !== true) {
											Cookie.set(
												widgetFeedbackStatusKey(t.props.id, t.props.widgetType),
												true,
												{ expires: 1 },
											);
										}
									},
								);
							})
							.catch((errorResponse) => {
								console.log("feedback sent error");
								console.log("error", errorResponse);
								this.setState({
									showLoader: false,
								});
							});
					}
				},
			);
		} else {
			this._setPage(page);
		}
	};

	componentWillReceiveProps(nextProps) {
		let t = this;

		let state = {};
		if (
			nextProps.selectedMarkPage &&
			t.props.selectedMarkPage &&
			nextProps.selectedMarkPage.id != t.props.selectedMarkPage.id
		) {
			state.selectedRate = nextProps.selectedRate;
			state.selectedMarkPage = nextProps.selectedMarkPage;
		}

		if (nextProps.template.servicesPage.services.length == 1) {
			state.currentPage =
				this.state.currentPage == "services" ? "rates" : this.state.currentPage;
			this.state.template.options.mode = "singleRate";
			state.selectedService = this.state.template.servicesPage.services[0];
		} else if (nextProps.template.servicesPage.services.length > 1) {
			state.currentPage = nextProps.currentPage;
			this.state.template.options.mode = nextProps.template.options.mode;
			state.selectedService =
				this.props.template.servicesPage.services.length == 1
					? null
					: this.state.selectedService;
		}

		t.setState(state);
	}

	closeParentWindowIframe = () => {
		try {
			window.parent.postMessage("hideQWWModal", "*");
		} catch (e) {
			console.log("exception", e);
		}
	};

	isSingleService = () => {
		return this.state.template.servicesPage.services.length === 1;
	};

	isSingleRate = () => {
		return (
			this.state.template.options.mode !== "multiRate" ||
			this.state.template.servicesPage.services.length === 1
		);
	};

	isMultiRate = () => {
		return this.state.template.options.mode === "multiRate";
	};

	sendFeeback = () => {
		console.log(
			"FeedbackTemplateView -> sendFeeback -> this.state.response",
			this.state.response,
		);
		let response = { ...this.state.response };
		console.log("++++++++++ here is the final response");
		console.log(
			"FeedbackTemplateView -> sendFeeback -> this.state.response",
			this.state.response,
		);
		console.log("FeedbackTemplateView -> sendFeeback -> response", response);
		console.log(response);

		if (
			this.state.selectedLanguage != null &&
			this.state.selectedLanguage.langID != null
		) {
			response.langID = this.state.selectedLanguage.langID;
		}

		if (!this.state.isContactFormSkipped) {
			response.contactInfo = this.state.contactFormData.filter(
				(_) => _.fieldName !== "terms_and_conditions",
			);
			response.contactInfo.map((_, i, a) => {
				if (_.fieldName === "response.comment") {
				}
				if (_.fieldName === "phone") {
					if (
						_ &&
						_.fieldValue ===
							"+" +
								this.state.template.contactInfoPage.contactInfo.find(
									(_) => _.fieldName === "phone",
								).defaultCountryCode
					) {
						a.splice(i, 1);
					}
				}
			});
		}
		// debugger;
		let { modifierSelectedMarksData } = this.state;
		const { contactInfo } = response;
		console.log("modifierSelectedMarksData", modifierSelectedMarksData);
		console.log("contactInfo", contactInfo);
		let found = false;

		if (modifierSelectedMarksData.length > 0) {
			for (var i = 0; i < contactInfo.length; i++) {
				if (contactInfo[i].fieldName == "custom_field_2") {
					found = true;
					break;
				}
			}
		}
		console.log("found", found);
		if (!found) {
			response.contactInfo.push({
				fieldName: "custom_field_2",
				fieldValue: modifierSelectedMarksData.join(", "),
			});
		}

		console.log("response", response);

		response = {
			...response,
			contactInfo: response.contactInfo.filter((item) =>
				item.fieldName !== "response.comment" ? item : null,
			),
		};

		console.log("FeedbackTemplateView -> sendFeeback -> response", response);

		if (this.state.widgetType == "web_widget" && this.props.webAccountID) {
			return WebAccountService.postWebWidget(
				{ id: this.props.webAccountID },
				response,
			).promise;
		}

		if (this.props.marketingAccountID) {
			return MarketingService.postMarketingWidget(
				{ id: this.props.marketingAccountID },
				response,
			).promise;
		}

		return new Promise((resolve, reject) => reject());
	};

	getTextSizeByValue = (value) => {
		let textSize = "7vh";
		if (value == "lg") {
			textSize = "11vh";
		}
		if (value == "sm") {
			textSize = "5vh";
		}

		return textSize;
	};

	getRateIconClass = (rate) => {
		let rateIconClass = "qs-icon-s1";
		if (rate.value == 5) {
			rateIconClass = "qs-icon-s2";
		} else if (rate.value == 0) {
			rateIconClass = "qs-icon-s3";
		} else if (rate.value == -5) {
			rateIconClass = "qs-icon-s4";
		} else if (rate.value == -10) {
			rateIconClass = "qs-icon-s5";
		}
		return rateIconClass;
	};

	shadeColor = (color, luminosity, percentage) => {
		percentage = percentage || true;

		if (percentage) {
			luminosity = luminosity / 50 - 1;
		}

		// validate hex string
		color = String(color).replace(/[^0-9a-f]/gi, "");
		if (color.length < 6) {
			color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
		}
		luminosity = luminosity || 0;

		// convert to decimal and change luminosity
		var newColor = "#",
			c,
			i,
			black = 0,
			white = 255;
		for (i = 0; i < 3; i++) {
			c = parseInt(color.substr(i * 2, 2), 16);
			c = Math.round(
				Math.min(Math.max(black, c + luminosity * white), white),
			).toString(16);
			newColor += ("00" + c).substr(c.length);
		}
		return newColor;
	};

	appendStyleToHead = (css) => {
		var head = document.head || document.getElementsByTagName("head")[0],
			style = document.createElement("style");

		style.type = "text/css";
		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}

		head.appendChild(style);
	};

	createGradientBgColor = (color, reverse = false) => {
		let changedColor = darkenColor(color, 0.072);

		const _color = changedColor;
		if (reverse) {
			color = changedColor;
			changedColor = _color;
		}

		const def =
			"linear-gradient(to bottom, " + color + " , " + changedColor + ")";
		const webKit2 =
			"-webkit-gradient(linear,left top,left bottom,from(" +
			color +
			"),to(" +
			changedColor +
			"));";
		const moz =
			"-moz-linear-gradient(to bottom, " + color + " , " + changedColor + ")";
		const ms =
			"-ms-linear-gradient(to bottom, " + color + " , " + changedColor + ")";
		const o =
			"-o-linear-gradient(to bottom, " + color + " , " + changedColor + ")";

		var className = `gr-bg-${Math.round(Math.random() * 100000)}`;
		var css = `.${className} {
            background: ${color};
            background: ${moz};
            background: ${ms};
            background: ${def};
            background: ${webKit2};
        }`;

		this.appendStyleToHead(css);

		return className;
	};

	handleNextButtonClick = () => {
		this.goToPage("comments");
	};

	handleServiceMouseDown = (e, service) => {
		let t = this;
		t.resetInteractionTimeout();

		var className = this.createGradientBgColor(service.bgColor, true);
		$(e.currentTarget).addClass(className);
		e.currentTarget.setAttribute("data-reverse-color-classname", className);
	};

	handleServiceMouseLeave = (e, service) => {
		let t = this;
		t.resetInteractionTimeout();

		$(e.currentTarget).removeClass(
			e.currentTarget.getAttribute("data-reverse-color-classname"),
		);

		let template = { ...this.state.template };

		if (this.isMultiRate()) {
			template.servicesPage.services.forEach((_, i, a) => {
				if (_.id == service.id) {
					a[i].isSelected = false;
				}
			});

			this.setState((prevState, props) => ({
				selectedService: null,
				template: template,
			}));
		}
	};

	handleServiceClick = (e, service) => {
		let t = this;
		t.resetInteractionTimeout();

		e.stopPropagation();
		if (e.type == "mouseenter" && service.selectedRate) {
			return;
		}

		let template = { ...this.state.template };

		if (this.isSingleService()) {
			// this.goToPage("rates");
			// this.setState({
			//     selectedService: service
			// });
		} else if (this.isSingleRate()) {
			this.goToPage("rates");

			template.servicesPage.services.forEach((_, i, a) => {
				a[i].isSelected = _.id == service.id;
			});

			this.setState({
				template,
				selectedService: service,
			});
		} else if (this.isMultiRate()) {
			template.servicesPage.services.forEach((_, i, a) => {
				a[i].isSelected = _.id == service.id;
			});

			this.setState({
				selectedService: service,
				template: template,
			});
		}

		if (e) {
			$(e.currentTarget).removeClass(
				e.currentTarget.getAttribute("data-reverse-color-classname"),
			);
		}
	};

	handleRateClick = (e, service, rate) => {
		let t = this;
		t.resetInteractionTimeout();

		let response = { ...this.state.response };
		let template = { ...this.state.template };

		response.rates.forEach((_, i, a) => {
			if (_.service_id == service.id) {
				a.splice(i, 1);
			}
		});

		let selectedServiceIndex = 0;
		template.servicesPage.services.forEach((_, i, a) => {
			if (_.id == service.id) {
				a[i].selectedRate = rate;
				a[i].isSelected = false;
				selectedServiceIndex = i;
			}
		});

		response.rates.push({
			service_id: service.id,
			rate: rate.value,
		});

		console.log("selected rate", response.rates);

		let nextState = {
			template: template,
			response: response,
			selectedRate: rate,
		};

		let rateValueByText = Constants.fn.getRateMarkPageValueByText(rate);
		let markPage = template.markPages.filter(
			(_) => _.id == service.markPageConnections[rateValueByText],
		)[0];

		if (
			t.checkAutoRate() &&
			(rate.value > 0 || !template.options.contactInfoPage)
		) {
			this.goToPage("thanks");
		} else {
			if (t.props.widgetType != "preview_widget") {
				if (markPage) {
					nextState.selectedMarkPage = markPage;
				} else {
					if (this.isMultiRate() && this.hasGivenRateForAllServices()) {
						this.goToPage("comments");
					}
				}
			}
			this.setState(nextState, () => {
				if (t.props.widgetType != "preview_widget") {
					if (!markPage && this.isSingleRate()) {
						this.goToPage("comments");
					}
				}
			});
		}

		if (e) {
			$(e.currentTarget).removeClass(
				e.currentTarget.getAttribute("data-reverse-color-classname"),
			);
		}

		t.scrollToNextServiceIfCurrentIsLastVisible(selectedServiceIndex);
	};

	scrollToNextServiceIfCurrentIsLastVisible = (serviceIndex) => {
		var servicesList = $(".services-list");
		var servicesListItems = servicesList.find(".service-item");
		var serviceItem = servicesListItems.eq(serviceIndex);
		var serviceItemHeight = serviceItem.outerHeight();

		var scrollContent = servicesList;

		const visibleElements = [];
		servicesListItems.each(function () {
			var $this = $(this);

			const outerHeight = $this.outerHeight();
			const positionTop = $this.position().top;
			const scrollContentHeight = Math.floor(scrollContent.height());

			console.log(outerHeight, positionTop, scrollContentHeight);
			if (positionTop + outerHeight > 0 && positionTop < scrollContentHeight) {
				visibleElements.push($this);
			}
		});

		console.log(visibleElements);

		if (
			visibleElements.length > 0 &&
			visibleElements[visibleElements.length - 1].get(0) === serviceItem.get(0)
		) {
			$(scrollContent.parent()).animate(
				{
					scrollTop: `+=${serviceItemHeight}px`,
				},
				450,
			);
		}
	};

	hasGivenRateForAllServices = () => {
		return (
			this.state.response.rates.length ==
			this.state.template.servicesPage.services.length
		);
	};

	hasGivenAtLeastOneRate = () => {
		return this.state.response.rates.length;
	};

	handleHideMarkPage = () => {
		let t = this;
		if (t.props.outsideClickMarkPageClose) {
			this.setState(
				{
					selectedMarkPage: null,
				},
				() => {
					if (this.isSingleRate()) {
						this.goToPage("comments");
					}
				},
			);
		}
	};

	handleMarkClick = (e, mark) => {
		let markPage = this.state.selectedMarkPage;

		if (markPage.id === 1970 || markPage.id === 1963 || markPage.id === 1973) {
			if (this.isSingleRate()) {
				this.goToPage("comments");
			}
			if (this.isMultiRate() && this.hasGivenRateForAllServices()) {
				this.goToPage("comments");
			}

			return null;
		}
		let t = this;
		t.resetInteractionTimeout();

		if (t.props.widgetType == "preview_widget") {
			return false;
		}

		let response = { ...this.state.response };

		response.rates.forEach((_, i, a) => {
			if (_.service_id == this.state.selectedService.id) {
				a[i].markPage_id = this.state.selectedMarkPage.id;
				a[i].mark_id = mark.id;
			}
		});

		console.log("this state before", this.state);

		this.setState(
			{
				response: response,
				selectedService: null,
				selectedRate: null,
				selectedMarkPage: null,
			},
			() => {
				if (this.isSingleRate()) {
					this.goToPage("comments");
				}
				if (this.isMultiRate() && this.hasGivenRateForAllServices()) {
					this.goToPage("comments");
				}
			},
		);
		// simba
	};

	setModifierContent = (name, id) => {
		console.log("current id", id);
		const { marks } = this.props.originalTemplate.markPages[0];
		let modifierMarks = {};
		Object.values(marks).forEach((item) => {
			modifierMarks[`${item.id}`] = item.name;
		});
		console.log("modifierMarks", modifierMarks);
		const modifierArr = [...this.state.modifierSelectedMarksData];
		let index = modifierArr.indexOf(modifierMarks[`${id}`]);
		if (index < 0) {
			modifierArr.push(modifierMarks[`${id}`]);
		} else {
			modifierArr.splice(index, 1);
		}

		this.setState({
			modifierSelectedMarksData: modifierArr,
		});
	};

	isAlwaysOpenService = (id) => {
		return !alwaysOpenServiceIDS.includes(id);
	};

	renderMarkListItem = (item, index, IE11, totalCount) => {
		const { marks } = this.props.originalTemplate.markPages[0];
		let modifierMarks = {};
		Object.values(marks).forEach((item) => {
			modifierMarks[`${item.id}`] = item.name;
		});
		let data = this.state.modifierSelectedMarksData;
		let service = this.state.template.servicesPage.services;
		console.log("data", data);
		console.log("modifierMarks", modifierMarks);
		let i = index;
		let index1 = index + 1;

		let itemFlex = "flex-100";
		let order = index;

		let make50 = false;
		if (totalCount == 5) {
			make50 = index1 < 3;
		} else if (totalCount == 6) {
			make50 = index1 < 5;
		} else if (totalCount > 6) {
			make50 = true;
		}

		if (make50) {
			itemFlex = "flex-50";
		}

		if (totalCount % 2 == 1 && index1 == totalCount) {
			itemFlex = "flex-100";
		}

		if (!this.state.isLandscape) {
			itemFlex = "flex-100";
		}
		let markPage = this.state.selectedMarkPage;

		if (markPage.id === 1970 || markPage.id === 1963 || markPage.id === 1973) {
			if (IE11) {
				return (
					<div
						key={i}
						className={classNames(
							" mark layout-column layout-align-center-center",
							this.createGradientBgColor(item.bgColor),
						)}
						onClick={() => {
							this.setModifierContent(item.name);
						}}
						style={{ display: "table", width: "100%", textAlign: "center" }}
					>
						<div style={{ display: "table-cell", verticalAlign: "middle" }}>
							<span className="md-display-1" style={{ color: item.fontColor }}>
								{item.name}
							</span>
						</div>
					</div>
				);
			} else {
				return (
					<div
						key={i}
						className={classNames(
							itemFlex + " mark layout-column layout-align-center-center",
						)}
						onClick={() => {
							this.setModifierContent(item.name, item.id);
						}}
						style={{
							order: order,
						}}
					>
						<div
							className={classNames("flex layout-align-center-center mark-bg")}
							style={{
								background: data.includes(modifierMarks[`${item.id}`])
									? service[0].rateBgColor
									: item.bgColor,
							}}
						>
							<span
								className="md-display-1 p10"
								style={{ color: item.fontColor }}
							>
								{item.name}
							</span>
						</div>
					</div>
				);
			}
		} else {
			if (IE11) {
				return (
					<div
						key={i}
						className={classNames(
							" mark layout-column layout-align-center-center",
							this.createGradientBgColor(item.bgColor),
						)}
						onClick={(e) => this.handleMarkClick(e, item)}
						style={{ display: "table", width: "100%", textAlign: "center" }}
					>
						<div style={{ display: "table-cell", verticalAlign: "middle" }}>
							<span className="md-display-1" style={{ color: item.fontColor }}>
								{item.name}
							</span>
						</div>
					</div>
				);
			} else {
				return (
					<div
						key={i}
						className={classNames(
							itemFlex + " mark layout-column layout-align-center-center",
						)}
						onClick={(e) => this.handleMarkClick(e, item)}
						style={{
							order: order,
						}}
					>
						<div
							className={classNames("flex layout-align-center-center mark-bg")}
							style={{
								background: data.includes(item.name)
									? service[0].rateBgColor
									: item.bgColor,
							}}
						>
							<span
								className="md-display-1 p10"
								style={{ color: item.fontColor }}
							>
								{item.name}
							</span>
						</div>
					</div>
				);
			}
		}
	};

	renderMarkPageModal = () => {
		let markPage = this.state.selectedMarkPage;
		console.log("markPage", markPage);

		let IE11 = !window.ActiveXObject && "ActiveXObject" in window;

		if (IE11) {
			return markPage ? (
				markPage.id === 1970 || markPage.id === 1963 || markPage.id === 1973 ? (
					<div className="mark-page-content layout-column layout-align-center-center">
						<div
							className="mark-page-overlay"
							onClick={this.handleHideMarkPage}
						/>
						<div
							className="mark-page"
							style={{
								backgroundColor: markPage.bgColor,
								transform: "translateY(-60px)",
							}}
						>
							<div
								className="mark-page-rate"
								style={{ backgroundColor: markPage.bgColor }}
							>
								<span
									className={classNames(
										"mn-rate-icon",
										this.getRateIconClass(this.state.selectedRate),
									)}
									style={{ color: markPage.headerBg }}
								/>
							</div>
							<div
								className="mark-page-title"
								style={{ backgroundColor: markPage.title.bgColor }}
							>
								<span
									className="md-headline"
									style={{ color: markPage.title.fontColor }}
								>
									{markPage.title.text}
								</span>
							</div>
							<div className="mark-page-marks">
								{markPage.marks.map((item, i) => {
									return this.renderMarkListItem(
										item,
										i,
										IE11,
										markPage.marks.length,
									);
								})}
							</div>
						</div>
						<button
							style={{
								bottom: "11%",
								position: "absolute",
								width: "40%",
								background: markPage.bgColor,
								color: markPage.headerBg,
							}}
							onClick={(e) => this.handleMarkClick(e, item)}
							className={"btn"}
						>
							Ok
						</button>
					</div>
				) : (
					<div className="mark-page-content layout-column layout-align-center-center">
						<div
							className="mark-page-overlay"
							onClick={this.handleHideMarkPage}
						/>
						<div
							className="mark-page"
							style={{ backgroundColor: markPage.bgColor }}
						>
							<div
								className="mark-page-rate"
								style={{ backgroundColor: markPage.bgColor }}
							>
								<span
									className={classNames(
										"mn-rate-icon",
										this.getRateIconClass(this.state.selectedRate),
									)}
									style={{ color: markPage.headerBg }}
								/>
							</div>
							<div
								className="mark-page-title"
								style={{ backgroundColor: markPage.title.bgColor }}
							>
								<span
									className="md-headline"
									style={{ color: markPage.title.fontColor }}
								>
									{markPage.title.text}
								</span>
							</div>
							<div className="mark-page-marks">
								{markPage.marks.map((item, i) => {
									return this.renderMarkListItem(
										item,
										i,
										IE11,
										markPage.marks.length,
									);
								})}
							</div>
						</div>
					</div>
				)
			) : null;
		}

		return markPage ? (
			markPage.id === 1970 || markPage.id === 1963 || markPage.id === 1973 ? (
				<div className="mark-page-content layout-column layout-align-center-center">
					<div
						className="mark-page-overlay"
						onClick={this.handleHideMarkPage}
					/>
					<div
						className="mark-page"
						style={{
							backgroundColor: markPage.bgColor,
							transform: "translateY(-60px)",
						}}
					>
						<div
							className="mark-page-rate"
							style={{ backgroundColor: markPage.bgColor }}
						>
							<span
								className={classNames(
									"mn-rate-icon",
									this.getRateIconClass(this.state.selectedRate),
								)}
								style={{ color: markPage.headerBg }}
							/>
						</div>
						<div className="layout-row">
							<div className="flex" />
							<div
								className="mark-page-title"
								style={{ backgroundColor: markPage.title.bgColor }}
							>
								<span
									className="md-headline"
									style={{ color: markPage.title.fontColor }}
								>
									{markPage.title.text}
								</span>
							</div>
							<div className="flex" />
						</div>
						<div className="mark-page-marks">
							{markPage.marks.map((item, i) => {
								return this.renderMarkListItem(
									item,
									i,
									IE11,
									markPage.marks.length,
								);
							})}
						</div>
					</div>
					<button
						style={{
							bottom: "10%",
							position: "absolute",
							width: "40%",
							background: markPage.bgColor,
							color: markPage.headerBg,
						}}
						onClick={(e) => this.handleMarkClick(e, item)}
						className={"btn"}
					>
						Ok
					</button>
				</div>
			) : (
				<div className="mark-page-content layout-column layout-align-center-center">
					<div
						className="mark-page-overlay"
						onClick={this.handleHideMarkPage}
					/>
					<div
						className="mark-page"
						style={{ backgroundColor: markPage.bgColor }}
					>
						<div
							className="mark-page-rate"
							style={{ backgroundColor: markPage.bgColor }}
						>
							<span
								className={classNames(
									"mn-rate-icon",
									this.getRateIconClass(this.state.selectedRate),
								)}
								style={{ color: markPage.headerBg }}
							/>
						</div>
						<div className="layout-row">
							<div className="flex" />
							<div
								className="mark-page-title"
								style={{ backgroundColor: markPage.title.bgColor }}
							>
								<span
									className="md-headline"
									style={{ color: markPage.title.fontColor }}
								>
									{markPage.title.text}
								</span>
							</div>
							<div className="flex" />
						</div>
						<div className="mark-page-marks">
							{markPage.marks.map((item, i) => {
								return this.renderMarkListItem(
									item,
									i,
									IE11,
									markPage.marks.length,
								);
							})}
						</div>
					</div>
				</div>
			)
		) : null;
	};

	servicesHasImages = () => {
		var hasImage = false;
		this.state.template.servicesPage.services.forEach((service) => {
			if (service.iconImgURL && service.iconImgURL != "") {
				hasImage = true;
			}
		});
		return hasImage;
	};

	renderServicesPage = () => {
		const { langID } = this.state.selectedLanguage;
		return (
			<div
				className="services-page layout-column layout-fill flex"
				style={{
					backgroundColor: this.state.template.servicesPage.bgColor,
					border: "4px solid " + this.state.template.servicesPage.bgColor,
				}}
			>
				<div className="layout-column" style={{ height: "40%" }}>
					<div
						data-section="header"
						style={{
							backgroundColor: this.state.template.servicesPage.headerBg,
							height: "17%",
						}}
						className="template-header layout-row"
					>
						<div className="qmeter-logo layout-column layout-align-center-start flex-30 flex-lg-10 relative">
							<div
								style={{ height: "100%", width: "100%" }}
								className="full-absolute layout-column layout-align-center-start"
							>
								<img
									src="https://qmeter.net/img/logo-alt.png"
									alt="Qmeter"
									onClick={this._handleQmeterLogoClick}
								/>
							</div>
						</div>
						<div className="flex" />
						<div className="header-buttons layout-column">
							{(!!this.hasGivenAtLeastOneRate() ||
								this.props.showNextButton) && (
								<div
									className="h-b next-button flex layout-column layout-align-center-center"
									style={{
										backgroundColor: this.state.template.servicesPage.buttons
											.next.bgColor,
									}}
									onClick={this.handleNextButtonClick}
								>
									<span
										style={{
											color: this.state.template.servicesPage.buttons.next
												.fontColor,
										}}
									>
										{this.state.template.servicesPage.buttons.next.text}
									</span>
								</div>
							)}
						</div>
					</div>

					<div data-section="logo" className="flex layout-column">
						<div className="logo flex layout-column layout-align-center-center relative">
							<div
								style={{ height: "100%", width: "100%" }}
								className="full-absolute text-center layout-column layout-align-center-center"
							>
								<img
									src={this.props.template.customerLogoUrl}
									alt={this.props.template.name}
								/>
							</div>
						</div>
					</div>

					{this.props.targetCustomer && (
						<div
							style={{
								height: "15%",
								color: this.state.template.servicesPage.title.bgColor,
							}}
							className="customer-name"
						>
							{this.props.targetCustomer.name}
						</div>
					)}

					<div className="layout-row service-title-outer">
						<div className="flex" />
						<div
							className="services-title layout-column text-center"
							style={{
								backgroundColor: this.state.template.servicesPage.title.bgColor,
							}}
						>
							<span
								style={{
									color: this.state.template.servicesPage.title.fontColor,
								}}
							>
								{this.state.template.servicesPage.title.text}
							</span>
						</div>
						<div className="flex" />
					</div>
				</div>
				<div
					data-section="services"
					className="services-top-container layout-column"
					style={{ height: "60%" }}
				>
					<Scrollbars autoHide={false} autoHideTimeout={5000}>
						<div
							className={classNames(
								"flex services-list layout-column layout-fill",
							)}
						>
							{this.state.template.servicesPage.services.map((service, i) => {
								return (
									<div
										key={i}
										role="button"
										className="service-item layout-column"
									>
										<div
											className={classNames(
												"service-inner flex layout-row",
												this.createGradientBgColor(service.bgColor),
											)}
											onClick={(e) => {
												this.handleServiceClick(e, service);
											}}
										>
											{this.servicesHasImages() && (
												<div
													className="layout-column layout-align-center-left service-icon flex-10 "
													style={{
														backgroundImage:
															"url('" + service.iconImgURL + "')",
														backgroundSize: "contain",
														backgroundRepeat: "no-repeat",
														backgroundPosition: "center",
													}}
												/>
											)}
											<span
												className={classNames(
													"flex layout-column layout-align-center-center align-item-satrt",
													{
														"flex-80":
															service.selectedRate != null &&
															!service.isSelected,
													},
													{
														"flex-70":
															service.isSelected ||
															(service.selectedRate == null &&
																this.isAlwaysOpenService(service.id)),
													},
												)}
												style={{ color: service.fontColor }}
											>
												<span
													style={{
														// textAlign: "left",
														padding:
															langID === "ar"
																? "10px 5px 10px 28px"
																: "10px 29px 10px 5px",
														fontSize: "2vh",
														lineHeight: "2.6vh",
													}}
													className={"zambaq"}
												>
													{service.name}
												</span>
											</span>
											{service.selectedRate && (
												<div
													className="selected-rate layout-column layout-align-center-center flex-10 selected-rate-tutu"
													style={{ backgroundColor: service.rateBgColor }}
												>
													<span
														style={{ color: service.rateFontColor }}
														className={this.getRateIconClass(
															service.selectedRate,
														)}
													/>
													{this.state.template.ratePage.showLabels && (
														<small style={{ color: service.rateFontColor }}>
															{console.warn(
																"BAd",
																service,
																i,
																this.state.template.ratePage.rateOptions.length,
															)}
															{service.id !== 4823 &&
															service.id !== 4822 &&
															service.id !== 4846 &&
															service.id !== 4851 &&
															service.selectedRate.value === 10
																? langID === "ar"
																	? "نع"
																	: "Yes"
																: service.id !== 4823 &&
																  service.id !== 4822 &&
																  service.id !== 4846 &&
																  service.id !== 4851 &&
																  service.selectedRate.value === -10
																? langID === "ar"
																	? "لا"
																	: "No"
																: service.selectedRate.label}
														</small>
													)}
												</div>
											)}
										</div>
										<div
											className={classNames(
												"rate-options-outer layout-column",
												{
													hide: this.isAlwaysOpenService(service.id)
														? !service.isSelected &&
														  service.selectedRate != null
															? true
															: false
														: !service.isSelected,
												},
											)}
											style={{
												zIndex: this.isAlwaysOpenService(service.id)
													? "300"
													: service.isSelected
													? "300"
													: "5",
												right: "0",
												alignItems: "flex-end",
											}}
										>
											<div
												className={`rate-options-list rate-options-list-${
													service.id !== 4822 &&
													service.id !== 4823 &&
													service.id !== 4846 &&
													service.id !== 4851
														? 2
														: 5
												} layout-row flex`}
												style={{
													backgroundColor: service.rateBgColor,
													display: "flex",
													width: "100%",
												}}
											>
												{console.log(
													"dino",
													this.state.template.ratePage.rateOptions,
												)}
												{(this.isAlwaysOpenService(service.id)
													? true
													: service.isSelected) &&
													this.state.template.ratePage.rateOptions.map(
														(rate, i) => {
															console.log("renderServicesPage -> rate", rate);
															console.log("service", service);

															return Constants.fn.isAvailableRateOption(
																i,
																this.state.template,
															) &&
																(service.id === 4823 ||
																	service.id === 4822 ||
																	service.id === 4846 ||
																	service.id === 4851 ||
																	(service.id !== 4823 &&
																		service.id !== 4822 &&
																		service.id !== 4846 &&
																		service.id !== 4851 &&
																		i === 0) ||
																	(service.id !== 4823 &&
																		service.id !== 4822 &&
																		service.id !== 4846 &&
																		service.id !== 4851 &&
																		i ===
																			this.state.template.ratePage.rateOptions
																				.length -
																				1)) ? (
																<div
																	key={i}
																	className={`rate-option-item rate-option-item-${this.state.template.ratePage.rateOption} flex layout-column layout-align-center-center`}
																	onClick={(e) =>
																		this.handleRateClick(e, service, rate)
																	}
																>
																	<span
																		className={classNames(
																			this.getRateIconClass(rate),
																			"qm-smile",
																		)}
																		style={{ color: service.rateFontColor }}
																	/>
																	{this.state.template.ratePage.showLabels && (
																		<small
																			style={{
																				color: service.rateFontColor,
																				fontSize: "1.9vh",
																			}}
																		>
																			{console.log("service id", service.id)}
																			{service.id !== 4823 &&
																			service.id !== 4822 &&
																			service.id !== 4846 &&
																			service.id !== 4851 &&
																			i === 0
																				? langID === "ar"
																					? "نعم"
																					: "Yes"
																				: service.id !== 4823 &&
																				  service.id !== 4822 &&
																				  service.id !== 4846 &&
																				  service.id !== 4851 &&
																				  i ===
																						this.state.template.ratePage
																							.rateOptions.length -
																							1
																				? langID === "ar"
																					? "لا"
																					: "No"
																				: rate.label}
																		</small>
																	)}
																</div>
															) : null;
														},
													)}
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</Scrollbars>
				</div>
			</div>
		);
	};

	renderSingleModeRatesPage = () => {
		const pageStyle = {
			backgroundColor: this.state.template.ratePage.bgColor,
			border: "4px solid " + this.state.template.ratePage.bgColor,
		};

		const headerStyle = {
			backgroundColor: this.state.template.ratePage.headerBg,
			height: "14%",
		};

		return (
			<div
				className="rates-page layout-column layout-fill flex"
				style={pageStyle}
			>
				<div
					className="layout-column top-side"
					style={{ height: this.state.isLandscape ? "63%" : "45%" }}
				>
					<div
						data-section="header"
						style={headerStyle}
						className="template-header layout-row"
					>
						<div className="qmeter-logo layout-column layout-align-center-start flex-30 flex-lg-10 relative">
							<div
								style={{ height: "100%", width: "100%" }}
								className="full-absolute layout-column layout-align-center-start"
							>
								<img
									src="https://qmeter.net/img/logo-alt.png"
									alt="Qmeter"
									onClick={() => {
										if (!this.isSingleService()) {
											this._handleQmeterLogoClick();
										}
									}}
								/>
							</div>
						</div>
						<div className="flex" />
					</div>

					<div data-section="logo" className="flex layout-column">
						<div className="logo flex layout-column layout-align-center-center relative">
							<div
								style={{ height: "100%", width: "100%" }}
								className="full-absolute text-center layout-column layout-align-center-center"
							>
								<img
									src={this.props.template.customerLogoUrl}
									alt={this.props.template.name}
								/>
							</div>
						</div>
					</div>

					<div className="layout-row service-title-outer">
						<div className="flex" />
						<div
							className="services-title layout-column text-center"
							style={{
								backgroundColor: this.state.template.ratePage.title.bgColor,
							}}
						>
							<div
								style={{ color: this.state.template.ratePage.title.fontColor }}
							>
								{this.state.template.ratePage.title.text}
							</div>
						</div>
						<div className="flex" />
					</div>
				</div>

				<div
					data-section="rates"
					className="layout-column"
					style={{ height: this.state.isLandscape ? "60%" : "65%" }}
				>
					<div
						className={classNames("flex services-list", {
							"layout-column": !this.state.isLandscape || !this.isSingleRate(),
							"layout-row": this.state.isLandscape && this.isSingleRate(),
						})}
					>
						{this.state.template.ratePage.rateOptions.map((item, i) => {
							return Constants.fn.isAvailableRateOption(
								i,
								this.state.template,
							) ? (
								<div
									key={i}
									className={classNames("service-item flex layout-column")}
								>
									<div
										className={classNames(
											"service-inner flex layout-row",
											this.createGradientBgColor(item.bgColor),
										)}
										onClick={(e) =>
											this.handleRateClick(e, this.state.selectedService, item)
										}
									>
										<span
											className={classNames("flex single-mode-rate-item", {
												"without-labels": !this.state.template.ratePage
													.showLabels,
												"layout-row layout-align-start-center":
													!this.state.isLandscape || !this.isSingleRate(),
												"layout-column layout-align-center-center":
													this.state.isLandscape && this.isSingleRate(),
											})}
											style={{ color: item.fontColor }}
										>
											<div className="single-mode-rate-smile">
												<span
													style={{ color: item.fontColor }}
													className={this.getRateIconClass(item)}
												/>
											</div>
											{this.state.template.ratePage.showLabels && (
												<div className="single-mode-rate-text">
													<span>{item.label}</span>
												</div>
											)}
										</span>
									</div>
								</div>
							) : null;
						})}
					</div>
				</div>
			</div>
		);
	};

	initContactFormValidation = () => {
		$(this.refs.contactForm).parsley({
			trigger: "change",
			successClass: "has-success",
			errorClass: "has-error",
			classHandler: function (el) {
				return el.$element.closest(".form-group");
			},
			errorsContainer: function (el) {
				return el.$element.closest(".form-group");
			},
			errorsWrapper: '<span class="help-block help-block-min filled"></span>',
			errorTemplate: "<div></div>",
		});

		$(this.refs.genderInput).parsley({
			messages: {
				required: "bunu men mirta elave eledim",
			},
		});

		window.Parsley.addMessage(
			"en",
			"validatePhoneIfRequiredOrDefaultValueChanged",
			this.state.template.formErrors.phoneFormat,
		);
	};

	initCommentFormValidation = () => {
		$(this.refs.commentForm).parsley({
			trigger: "change",
			successClass: "has-success",
			errorClass: "has-error",
			classHandler: function (el) {
				return el.$element.closest(".form-group");
			},
			errorsWrapper: '<span class="help-block help-block-min filled"></span>',
			errorTemplate: "<div></div>",
		});
	};

	moveCaretAtEnd(e) {
		e.preventDefault();
		let temp_value = e.target.value;
		e.target.value = "";
		// e.target.value = temp_value;
		let d = e.target;
		setTimeout(() => {
			d.value = temp_value;
		}, 10);
	}

	renderContactInfoField = (field, index) => {
		let t = this;
		const tabIndex = index + 1;
		let i = index;
		let errors = t.state.template.formErrors;

		switch (field.fieldType) {
			case "select": {
				if (field.fieldName === "custom_field_1") {
					console.log("buda fieald --- ", field);
					return (
						<div
							className="form-group awesome-checkbox-wrap"
							key={i}
							style={{
								padding: "5px",
								paddingLeft: "10px",
								order: 0,
								display: "flex",
								alignItems: "center",
								height: "7.7vh",
							}}
						>
							<span
								className={"awesome-title-forckeckbox"}
								style={{
									color: "rgba(27,34,44,.72)",
									fontSize: "2vh",
									marginRight: "12px",
								}}
							>
								{field.placeHolder}
							</span>
							<div
								style={{
									display: "flex",
									alignItems: "center",
								}}
							>
								{field.options.map((item) => (
									<label
										key={item}
										style={{
											marginLeft: "15px",
											marginBottom: "0",
											fontSize: "2.2vh",
											display: "flex",
											alignItems: "center",
										}}
									>
										<input
											required={field.required}
											type="radio"
											name={field.fieldName}
											id=""
											value={this.state.comparsionCustomFields[item]}
											className={"awesome-checkbox"}
											style={{
												margin: " 0 4px",
												width: "16px",
												height: "16px",
											}}
										/>
										<span className="radio-btn">{item}</span>
									</label>
								))}
							</div>
						</div>
					);
				} else {
					return (
						<div
							className="flex-50 form-group"
							key={i}
							style={{ padding: "5px", order: 6 }}
						>
							<select
								className="form-control"
								// value={this.state.smsListStatusFilter}
								required={field.required}
								name={field.fieldName}
								placeholder={field.placeHolder}
								tabIndex={tabIndex}
								data-parsley-required-message={errors.required}
							>
								<option value="" disabled selected>
									{field.placeHolder}
								</option>
								{field.options.map((option, index) => {
									return (
										<option key={index} value={option}>
											{option}
										</option>
									);
								})}
							</select>
						</div>
					);
				}
			}
			case "singleLineText": {
				if (field.fieldName == "fullName") {
					return (
						<div
							className="flex-50 form-group"
							key={i}
							style={{ padding: "5px", order: 3 }}
						>
							<input
								autoComplete="off"
								required={field.required}
								type="text"
								className="form-control flex"
								name={field.fieldName}
								placeholder={field.placeHolder}
								tabIndex={tabIndex}
								minLength="2"
								maxLength="80"
								autoCapitalize=""
								style={{ textTransform: "capitalize" }}
								data-parsley-pattern="/^([^0-9]*)$/"
								data-parsley-required-message={errors.required}
								data-parsley-length-message={errors.tooShort}
								data-parsley-pattern-message={errors.fullNameFormat}
							/>
						</div>
					);
				}
				return (
					<div
						className="flex-50 form-group"
						key={i}
						style={{ padding: "5px", order: 1 }}
					>
						<input
							autoComplete="off"
							required={field.required}
							type="text"
							className="form-control flex"
							name={field.fieldName}
							placeholder={field.placeHolder}
							tabIndex={tabIndex}
							minLength="2"
							maxLength="80"
							autoCapitalize=""
							style={{ textTransform: "capitalize" }}
							data-parsley-pattern="/^([^0-9]*)$/"
							data-parsley-required-message={errors.required}
							data-parsley-length-message={errors.tooShort}
							data-parsley-pattern-message={errors.fullNameFormat}
						/>
					</div>
				);
			}
			case "phone": {
				const { langID } = this.state.selectedLanguage;
				let _prs = {};
				let _v = "+" + (field.defaultCountryCode || "");
				if (this.props.widgetType == "preview_widget") {
					_prs.placeholder = _v;
				} else {
					_prs.defaultValue = _v;
				}

				return (
					<div
						className="flex form-group"
						key={i}
						style={{ padding: "5px", order: 2 }}
					>
						<input
							autoComplete="off"
							required={field.required}
							data-parsley-validate-phone-if-required-or-default-value-changed="true"
							type="tel"
							maxLength="14"
							className="form-control"
							name={field.fieldName}
							data-default-value={
								field.defaultCountryCode ? "+" + field.defaultCountryCode : ""
							}
							tabIndex={tabIndex}
							{..._prs}
							data-parsley-required-message={errors.required}
							data-parsley-length-message={errors.tooShort}
							data-parsley-pattern-message={errors.phoneFormat}
							onChange={(e) => {
								console.log(e.target.value);
							}}
							style={{
								direction: "ltr",
								textAlign: langID === "ar" ? "right" : "left",
							}}
							onFocus={this.moveCaretAtEnd}
						/>
					</div>
				);
			}
			case "email": {
				return (
					<div
						className="form-group email-input-wrap"
						key={i}
						style={{ padding: "5px", order: 3 }}
					>
						<input
							autoComplete="off"
							required={field.required}
							type="email"
							className="form-control"
							name={field.fieldName}
							placeholder={field.placeHolder}
							tabIndex={tabIndex}
							maxLength="80"
							data-parsley-type="email"
							data-parsley-required-message={errors.required}
							data-parsley-length-message={errors.tooShort}
							data-parsley-type-message={errors.emailFormat}
						/>
					</div>
				);
			}
			case "age_range": {
				return (
					<div
						className={classNames(
							"form-group",
							{ "flex-30": this.state.isLandscape },
							{ "flex-50": !this.state.isLandscape },
						)}
						key={i}
						style={{ padding: "5px", order: 4 }}
					>
						<select
							className={classNames(
								"form-control",
								{ rtl: !this.state.selectedLanguage.ltr },
								{ ltr: this.state.selectedLanguage.ltr },
							)}
							required={field.required}
							name={field.fieldName}
							placeholder={field.placeHolder}
							tabIndex={tabIndex}
							data-parsley-required-message={errors.required}
						>
							<option value="" hidden="">
								{field.placeHolder}
							</option>
							{Constants.metaData.ageRanges.map((item, index) => {
								return (
									<option key={index} value={item.value}>
										{item.name}
									</option>
								);
							})}
						</select>
					</div>
				);
			}
			case "gender": {
				let overrideOrder = 5;
				if (!this.state.isLandscape) {
					overrideOrder = 20;
				}
				return (
					<div
						className={classNames(
							"form-group",
							{ "flex-20": this.state.isLandscape },
							{ "flex-50": !this.state.isLandscape },
						)}
						key={i}
						style={{ padding: "5px", order: overrideOrder }}
					>
						<div className="layout-align-start-center layout-row gender-group">
							<div
								className="gender-selection-box male selected layout-row flex"
								onClick={(e) => {
									$(e.currentTarget)
										.addClass("active")
										.siblings()
										.removeClass("active");
									this.refs.genderInput.value = "Male";
									$(this.refs.genderInput).parsley().validate();
								}}
							>
								<label
									htmlFor="male"
									className="gender male layout-align-center-center layout-row flex"
								>
									<i className="qs-icon-men" aria-hidden="true" />
								</label>
							</div>
							<div style={{ width: "10px" }} />
							<div
								className="gender-selection-box female layout-row flex"
								onClick={(e) => {
									$(e.currentTarget)
										.addClass("active")
										.siblings()
										.removeClass("active");
									this.refs.genderInput.value = "Female";
									$(this.refs.genderInput).parsley().validate();
								}}
							>
								<label
									htmlFor="female"
									className="gender layout-align-center-center layout-row flex"
								>
									<i className="qs-icon-women" aria-hidden="true" />
								</label>
							</div>
							<input
								type="text"
								className="hide"
								required={field.required}
								name={field.fieldName}
								ref="genderInput"
								data-parsley-required-message={errors.required}
							/>
						</div>
					</div>
				);
			}
			case "text": {
				let { fieldName } = field;
				if (fieldName == "custom_field_2") {
					return (
						<div
							className="flex-50 form-group"
							key={i}
							style={{ padding: "5px", order: 6, display: "none" }}
						>
							<input
								autoComplete="off"
								type="text"
								className="form-control"
								name={field.fieldName}
								placeholder={field.placeHolder}
								tabIndex={tabIndex}
								maxLength="160"
								data-parsley-required-message={errors.required}
								data-parsley-length-message={errors.tooShort}
								value={this.state.modifierSelectedMarksData.join(", ")}
							/>
						</div>
					);
				} else {
					return (
						<div
							className="flex-50 form-group"
							key={i}
							style={{ padding: "5px", order: 6 }}
						>
							<input
								autoComplete="off"
								required={field.required}
								type="text"
								className="form-control"
								name={field.fieldName}
								placeholder={field.placeHolder}
								tabIndex={tabIndex}
								maxLength="60"
								data-parsley-required-message={errors.required}
								data-parsley-length-message={errors.tooShort}
							/>
						</div>
					);
				}
			}
			case "number": {
				return (
					<div
						className="flex-50 form-group"
						key={i}
						style={{ padding: "5px", order: 7 }}
					>
						<input
							autoComplete="off"
							required={field.required}
							data-parsley-trigger="input"
							className="form-control"
							name={field.fieldName}
							placeholder={field.placeHolder}
							tabIndex={tabIndex}
							maxLength="60"
							data-parsley-type="digits"
							data-parsley-type-message={errors.numberFormat}
							data-parsley-required-message={errors.required}
							data-parsley-length-message={errors.tooShort}
						/>
					</div>
				);
			}
		}
	};

	handleSkipButtonClick = () => {
		this.setState(
			{
				isContactFormSkipped: true,
			},
			() => {
				this.goToPage("comments");
			},
		);
	};

	handleContactFormSubmit = (e) => {
		e.preventDefault();

		if ($(this.refs.contactForm).parsley().validate()) {
			this.goToPage("thanks");
		}
	};

	handleCommentFormSubmit = (e) => {
		e.preventDefault();

		if (
			$(this.refs.commentForm).parsley().validate() &&
			$(this.refs.contactForm).parsley().validate()
		) {
			this.goToPage("thanks");
		}
	};

	_handleQmeterLogoClick = () => {
		window.location.reload();
	};

	openTextModal = () => {
		let t = this;

		t.setState({
			currentMarkup: this.state.template.contactInfoPage.terms.markupObj,
			showTextModal: t.props.widgetType != "preview_widget",
		});
	};

	hideTextModal = () => {
		let t = this;

		t.setState({
			showTextModal: false,
		});
	};

	renderTextModal = (markup) => {
		let t = this;

		const html = t.state.currentMarkup
			? t.state.currentMarkup.toString("html")
			: "";

		return (
			<Modal
				autoFocus={true}
				container={this}
				isOpen={this.state.showTextModal}
				onRequestHide={t.hideTextModal}
			>
				<ModalHeader>
					<button
						type="button"
						className="close"
						onClick={t.hideTextModal}
						data-dismiss="modal"
						aria-hidden="true"
					>
						×
					</button>
					<h3 className="modal-title">
						{this.state.template.contactInfoPage.terms.title}
					</h3>
				</ModalHeader>

				<ModalBody>
					<div style={{ maxHeight: "65vh", overflow: "auto" }}>
						<div dangerouslySetInnerHTML={{ __html: html }} />
					</div>
				</ModalBody>

				<ModalFooter>
					<button className="btn btn-success" onClick={t.hideTextModal}>
						<span>Okay</span>
					</button>
				</ModalFooter>
			</Modal>
		);
	};

	renderContactsPage = () => {
		return (
			<div
				id="contacts-page"
				className="contacts-page layout-column layout-fill flex"
				style={{
					backgroundColor: this.state.template.contactInfoPage.bgColor,
					border: "4px solid " + this.state.template.contactInfoPage.bgColor,
				}}
			>
				{this.renderTextModal()}

				<div
					className="start layout-column"
					style={{ height: this.state.isLandscape ? "40%" : "30%" }}
				>
					<div
						data-section="header"
						style={{
							backgroundColor: this.state.template.contactInfoPage.headerBg,
							height: "17%",
						}}
						className="template-header layout-row"
					>
						<div className="qmeter-logo layout-column layout-align-center-start flex-30 flex-lg-10 relative">
							<div
								className="full-absolute layout-column layout-align-center-start"
								style={{ height: "100%", width: "100%" }}
							>
								<img
									src="https://qmeter.net/img/logo-alt.png"
									alt="Qmeter"
									onClick={this._handleQmeterLogoClick}
								/>
							</div>
						</div>
						<div className="flex" />
						<div className="header-buttons layout-column" />
					</div>

					<div data-section="logo" className="flex layout-column">
						<div className="logo flex layout-column layout-align-center-center relative">
							<div
								className="full-absolute text-center layout-column layout-align-center-center"
								style={{ height: "100%", width: "100%" }}
							>
								<img
									src={this.props.template.customerLogoUrl}
									alt={this.props.template.name}
								/>
							</div>
						</div>
					</div>

					<div className="layout-row service-title-outer">
						<div className="flex" />
						<div
							className="flex-90 services-title layout-column text-center"
							style={{
								backgroundColor: this.state.template.contactInfoPage.title
									.bgColor,
							}}
						>
							<div
								style={{
									color: this.state.template.contactInfoPage.title.fontColor,
								}}
							>
								{this.state.template.contactInfoPage.title.text}
							</div>
						</div>
						<div className="flex" />
					</div>
				</div>

				<div
					data-section="contact-form"
					className="end layout-column"
					style={{
						height: this.state.isLandscape ? "60%" : "70%",
						overflowY: "auto",
					}}
				>
					<form
						ref="contactForm"
						className="contact-form "
						onSubmit={(e) => this.handleContactFormSubmit(e)}
					>
						<fieldset>
							<div className="layout-row layout-align-center-center">
								<div
									className="flex-90"
									style={{
										display: "flex",
										flexFlow: "row wrap",
										justifyContent: "flex-start",
									}}
								>
									{this.state.template.contactInfoPage.contactInfo
										.filter((_) => !!_.show)
										.map((c, i) => {
											return this.renderContactInfoField(c, i);
										})}

									{this.props.template.options.enableTerms && (
										<div
											className="flex-100 form-group error-color-red text-center"
											style={{ order: 30 }}
										>
											<div className="layout-row layout-align-center-center">
												<div>
													<span className="checkbox mini">
														<label
															className="text-in checkbox-container"
															htmlFor="terms_and_conditions"
														>
															<input
																type="checkbox"
																className="terms-checkbox"
																id="terms_and_conditions"
																name="terms_and_conditions"
																data-parsley-required
																data-parsley-required-message={
																	this.state.template.formErrors.required
																}
															/>
															<span className="checkmark" />
														</label>
													</span>
												</div>
												<div style={{ width: "10px" }} />
												<div>
													<div
														className="terms-label pointer cp"
														onClick={this.openTextModal}
													>
														<u
															style={{
																color: this.state.template.contactInfoPage.terms
																	.labelColor,
															}}
														>
															<i>
																{
																	this.state.template.contactInfoPage.terms
																		.label
																}
															</i>
														</u>
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
							</div>

							<div className=" mb10">
								<div className="col text-center">
									<button
										onClick={this.handleContactFormSubmit}
										type="button"
										className="btn bt-default btn-space submit-button"
										style={{
											color: this.state.template.contactInfoPage.buttons.submit
												.fontColor,
											backgroundColor: this.state.template.contactInfoPage
												.buttons.submit.bgColor,
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.backgroundColor = this.shadeColor(
												this.state.template.contactInfoPage.buttons.submit
													.bgColor,
												43,
											);
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.backgroundColor = this.state.template.contactInfoPage.buttons.submit.bgColor;
										}}
									>
										{this.state.template.contactInfoPage.buttons.submit.text}
									</button>
								</div>
							</div>

							{this.state.template.options.skipContactInfo && (
								<div className="">
									<div className="col text-center">
										<button
											onClick={this.handleSkipButtonClick}
											type="button"
											className="btn bt-default skip-button"
											style={{
												color: this.state.template.contactInfoPage.buttons.skip
													.fontColor,
												backgroundColor: this.state.template.contactInfoPage
													.buttons.skip.bgColor,
											}}
										>
											{this.state.template.contactInfoPage.buttons.skip.text}
										</button>
									</div>
								</div>
							)}
						</fieldset>
					</form>
				</div>
			</div>
		);
	};
	/**
	 * Comment page
	 * */
	renderCommentsPage = () => {
		return (
			<div
				className="comments-page layout-column flex layout-fill"
				style={{
					backgroundColor: this.state.template.additionalCommentPage.bgColor,
					border:
						"4px solid " + this.state.template.additionalCommentPage.bgColor,
				}}
			>
				<div
					className="layout-column start"
					style={{
						height: this.state.currentPage === "comments" ? "30%" : "35%",
					}}
				>
					<div
						data-section="header"
						style={{
							backgroundColor: this.state.template.additionalCommentPage
								.headerBg,
							height: "18%",
						}}
						className="template-header layout-row"
					>
						<div className="qmeter-logo layout-column layout-align-center-start flex-30 flex-lg-10 relative">
							<div
								className="full-absolute layout-column layout-align-center-start"
								style={{ width: "100%", height: "100%" }}
							>
								<img
									src="https://qmeter.net/img/logo-alt.png"
									alt="Qmeter"
									onClick={this._handleQmeterLogoClick}
								/>
							</div>
						</div>
						<div className="flex" />
						<div className="header-buttons layout-column" />
					</div>

					<div data-section="logo" className="flex layout-column">
						<div className="logo flex layout-column layout-align-center-center relative">
							<div
								className="full-absolute text-center layout-column layout-align-center-center"
								style={{ width: "100%", height: "100%" }}
							>
								<img
									src={this.props.template.customerLogoUrl}
									alt={this.props.template.name}
								/>
							</div>
						</div>
					</div>

					<div className="layout-row service-title-outer">
						<div className="flex" />
						<div
							className="flex-90 services-title layout-column text-center flex-90"
							style={{
								backgroundColor: this.state.template.additionalCommentPage.title
									.bgColor,
							}}
						>
							<span
								style={{
									color: this.state.template.additionalCommentPage.title
										.fontColor,
								}}
							>
								{this.state.template.additionalCommentPage.title.text}
							</span>
						</div>
						<div className="flex" />
					</div>
				</div>

				<div
					data-section="comment-form"
					className="layout-column end"
					style={{ height: "60%" }}
				>
					{/* // burda forma bashlayir */}
					<form
						ref="contactForm"
						className="contact-form "
						onSubmit={(e) => this.handleCommentFormSubmit(e)}
						style={{
							marginTop: "0",
						}}
					>
						<fieldset
							style={{
								width: "90%",
								margin: "auto",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<div className="" style={{ width: "100%" }}>
								<div
									className="form-group"
									style={{ position: "relative", width: "100%" }}
								>
									<textarea
										className="form-control comment-textbox awesome-textarea"
										rows="6"
										required={
											this.state.template.additionalCommentPage.textBox.maxLength
												.toString()
												.slice(-1) == 1
												? true
												: false
										}
										style={{
											backgroundColor: this.state.template.additionalCommentPage
												.textBox.bgColor,
											color: this.state.template.additionalCommentPage.textBox
												.fontColor,
											height: "18vh",
										}}
										name="response.comment"
										value={this.state.response.comment}
										onChange={(e) => {
											this.state.response.comment = e.currentTarget.value;
											this.setState({
												response: this.state.response,
											});
										}}
										minLength={
											this.state.template.additionalCommentPage.textBox
												.minLength
										}
										maxLength={
											this.state.template.additionalCommentPage.textBox
												.maxLength
										}
										placeholder={
											this.state.template.additionalCommentPage.textBox
												.placeholder
										}
										data-parsley-required-message={
											this.state.template.formErrors.required
										}
										data-parsley-length-message={
											this.state.template.formErrors.tooShort
										}
									/>
									<div
										style={{
											position: "absolute",
											textAlign: "right",
											right: "10px",
											bottom: "10px",
											color: "#ccc",
											zIndex: 99999,
										}}
									>
										{this.state.response.comment.length} /{" "}
										{
											this.state.template.additionalCommentPage.textBox
												.maxLength
										}
									</div>
								</div>
							</div>
							<div
								className="layout-row layout-align-center-center"
								style={{
									maxWidth: "110%",
									margin: "5px -5px 0",
								}}
							>
								<div
									style={{
										display: "flex",
										flexFlow: "row wrap",
										justifyContent: "flex-start",
										margin: "0 -5px 0 -5px",
									}}
								>
									{this.state.template.contactInfoPage.contactInfo
										.filter((_) => !!_.show)
										.map((c, i) => {
											return this.renderContactInfoField(c, i);
										})}

									{this.props.template.options.enableTerms && (
										<div
											className="flex-100 form-group error-color-red text-center"
											style={{ order: 30 }}
										>
											<div className="layout-row layout-align-center-center">
												<div>
													<span className="checkbox mini">
														<label
															className="text-in checkbox-container"
															htmlFor="terms_and_conditions"
														>
															<input
																type="checkbox"
																className="terms-checkbox"
																id="terms_and_conditions"
																name="terms_and_conditions"
																data-parsley-required
																data-parsley-required-message={
																	this.state.template.formErrors.required
																}
															/>
															<span className="checkmark" />
														</label>
													</span>
												</div>
												<div style={{ width: "10px" }} />
												<div>
													<div
														className="terms-label pointer cp"
														onClick={this.openTextModal}
													>
														<u
															style={{
																color: this.state.template.contactInfoPage.terms
																	.labelColor,
															}}
														>
															<i>
																{
																	this.state.template.contactInfoPage.terms
																		.label
																}
															</i>
														</u>
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
							</div>

							<button
								type="submit"
								className="btn bt-default submit-button"
								style={{
									color: this.state.template.additionalCommentPage.submitButton
										.fontColor,
									backgroundColor: this.state.template.additionalCommentPage
										.submitButton.bgColor,
									margin: "20px auto",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.backgroundColor = this.shadeColor(
										this.state.template.additionalCommentPage.submitButton
											.bgColor,
										43,
									);
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.backgroundColor = this.state.template.additionalCommentPage.submitButton.bgColor;
								}}
							>
								{this.state.template.additionalCommentPage.submitButton.text}
							</button>
						</fieldset>
					</form>
					<form
						ref="commentForm"
						onSubmit={(e) => this.handleCommentFormSubmit(e)}
					></form>
				</div>
			</div>
		);
	};

	renderThanksPage = () => {
		return (
			<div
				className="contacts-page layout-column flex layout-fill"
				style={{
					backgroundColor: this.state.template.thankYouPage.bgColor,
					border: "4px solid " + this.state.template.thankYouPage.bgColor,
				}}
			>
				<div className="layout-column" style={{ height: "40%" }}>
					<div
						data-section="header"
						style={{
							backgroundColor: this.state.template.thankYouPage.headerBg,
							height: "17%",
						}}
						className="template-header layout-row"
					>
						<div className="qmeter-logo layout-column layout-align-center-start flex-30 flex-lg-10 relative">
							<div
								className="full-absolute layout-column layout-align-center-start"
								style={{ width: "100%", height: "100%" }}
							>
								<img src="https://qmeter.net/img/logo-alt.png" alt="Qmeter" />
							</div>
						</div>
						<div className="flex" />
						<div className="header-buttons layout-column" />
					</div>

					<div data-section="logo" className="flex layout-column">
						<div className="logo flex layout-column layout-align-center-center relative">
							<div
								className="full-absolute text-center layout-column layout-align-center-center"
								style={{ height: "100%", width: "100%" }}
							>
								<img
									src={this.props.template.customerLogoUrl}
									alt={this.props.template.name}
								/>
							</div>
						</div>
					</div>
				</div>

				<div
					data-section="text"
					style={{ height: "60%" }}
					className="layout-column"
				>
					<div
						className="text-center thanks-text overflow-hidden flex"
						style={{
							color: this.state.template.thankYouPage.fontColor,
							marginTop: "8vh",
							fontSize: this.getTextSizeByValue(
								this.state.template.thankYouPage.textSize,
							),
						}}
					>
						<span
							style={{
								fontSize: "26px",
								lineHeight: "20px",
							}}
						>
							{this.state.template.thankYouPage.text}
						</span>
					</div>
				</div>
			</div>
		);
	};

	renderLangPage = () => {
		return (
			<div
				className="lang-page layout-column layout-fill flex"
				style={{
					backgroundColor: this.state.template.langPage.bgColor,
					backgroundImage: `url(${this.state.template.langPage.bgImg})`,
				}}
			>
				<div
					className="dimmer layout-column layout-fill flex"
					style={{
						backgroundColor: this.state.template.langPage.bgDimmerColor,
						opacity: this.state.template.langPage.bgDimmerOpacity,
					}}
				/>

				<div className="layout-column flex content">
					<span
						className={classNames(this.getRateIconClass(10) + " smiley", {
							hide: !this.state.template.langPage.showSmiley,
						})}
						style={{
							color: this.state.template.langPage.smileyColor,
						}}
					/>

					<div className="titles">
						{this.props.languages.map((lang, i) => {
							if (lang.title && lang.title != "") {
								return (
									<span
										key={i}
										className={classNames(
											"lang-title",
											{
												"show-title": lang.show,
											},
											this.state.template.langPage.animatedTitleSize,
										)}
										style={{ color: this.state.template.langPage.titleColor }}
									>
										{lang.title}
									</span>
								);
							}
						})}
					</div>

					<div className="languages layout-fill flex layout-row">
						{this.props.languages.map((lang, index) => {
							return (
								<div
									key={index}
									className="lang-item layout-column flex"
									onClick={(e) => this.setLanguage(lang)}
								>
									<div className="flag layout-fill flex">
										<img
											src={
												"https://lipis.github.io/flag-icon-css/flags/4x3/" +
												lang.countryID.toLowerCase() +
												".svg"
											}
										/>
										<br />
										<span
											className={classNames(
												"lang-name m10",
												this.state.template.langPage.titleSize,
											)}
											style={{
												color: lang.labelColor,
												fontStyle:
													this.state.template.langPage.titleItalic && "italic",
												fontWeight:
													this.state.template.langPage.titleBold && "bold",
												textDecoration:
													this.state.template.langPage.titleUnderlined &&
													"underline",
											}}
										>
											{lang.label}
										</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	};

	isRtl = () => {
		let t = this;
		if (
			t.state.selectedLanguage &&
			!t.state.selectedLanguage.ltr &&
			t.state.currentPage != "lang"
		) {
			return true;
		} else {
			return false;
		}
	};

	render() {
		const { template, response } = this.state;

		return (
			<div
				className={classNames("modal-container size-" + this.props.size, {
					"single-service": this.isSingleService(),
					"hide-qmeter-logo":
						this.state.template.company_id === blackListedCompanyID,
				})}
			>
				<div
					className={classNames(
						"feedback-template layout-column type-" +
							this.props.widgetType +
							" size-" +
							this.props.size,
						{
							tablet: this.props.showTablet,
							landscape: this.state.isLandscape,
							portrait: !this.state.isLandscape,
							"single-service": this.isSingleService(),
						},
					)}
					dir={this.isRtl() ? "rtl" : "ltr"}
				>
					{this.state.currentPage == "lang" && this.renderLangPage()}
					{!this.isSingleService() &&
						this.state.currentPage == "services" &&
						this.renderServicesPage()}
					{this.isSingleRate() &&
						this.state.currentPage == "rates" &&
						this.renderSingleModeRatesPage()}

					{this.state.currentPage == "contacts" && this.renderCommentsPage()}

					{this.state.currentPage == "comments" && this.renderCommentsPage()}
					{this.state.currentPage == "thanks" && this.renderThanksPage()}

					{this.renderMarkPageModal()}

					{this.state.showLoader && (
						<div
							style={{
								position: "fixed",
								top: 0,
								left: 0,
								width: "100%",
								height: "100%",
								backgroundColor: "rgba(255,255,255,1)",
								zIndex: 99999,
							}}
							className="layout-column layout-align-center-center"
						>
							<Loader type="ball-clip-rotate-multiple" />
						</div>
					)}
				</div>
			</div>
		);
	}
}
