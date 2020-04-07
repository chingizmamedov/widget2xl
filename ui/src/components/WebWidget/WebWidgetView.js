/**
 * Created by maykinayki on 3/7/17.
 *
 * @format
 */

import React, { Component } from "react";

import "core-js";

import RichTextEditor from "react-rte";

import Loader from "react-loaders";

import FeedbackTemplateView from "./FeedbackTemplateView";
import WebAccountService from "../../services/WebAccountService";

export default class WebWidgetView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			account: null,
			showLoader: true,
		};
	}

	componentDidMount() {
		const t = this;

		setTimeout(function () {
			WebAccountService.getWebWidget(
				{ id: t.props.match.params.id },
				(response) => {
					console.log("gelen cavab", response);

					// oazis data is different, comment this on prod
					// let response = responseRaw.webAccountData;

					response.originalTemplate.contactInfoPage.terms.markupObj = RichTextEditor.createValueFromString(
						response.originalTemplate.contactInfoPage.terms.markup,
						"markdown",
					);
					response.languages.forEach((element) => {
						response.translatedTemplates[
							element.langID
						].contactInfoPage.terms.markupObj = RichTextEditor.createValueFromString(
							response.translatedTemplates[element.langID].contactInfoPage.terms
								.markup,
							"markdown",
						);
					});
					t.setState({
						account: response,
						showLoader: false,
					});
				},
			);
		}, 500);
	}

	closeParentWindowIframe = (e) => {
		if (e.target === e.currentTarget) {
			try {
				window.parent.postMessage("hideQWWModal", "*");
			} catch (e) {
				console.log("exception", e);
			}
		}
	};

	render() {
		return (
			<div onClick={this.closeParentWindowIframe}>
				{this.state.account && (
					<FeedbackTemplateView
						webAccountID={this.props.match.params.id}
						id={this.props.match.params.id}
						template={this.state.account.originalTemplate}
						properties={this.state.account.properties}
						languages={this.state.account.languages}
						translatedTemplates={this.state.account.translatedTemplates}
						location={this.props.location}
					/>
				)}

				{this.state.showLoader && (
					<div
						style={{
							position: "fixed",
							width: "100%",
							height: "100%",
							backgroundColor: "rgba(255,255,255,0.5)",
							zIndex: 99999,
						}}
						className="layout-column layout-align-center-center"
					>
						<Loader type="ball-clip-rotate-multiple" />
					</div>
				)}
			</div>
		);
	}
}
