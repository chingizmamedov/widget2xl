/**
 * Created by maykinayki on 3/7/17.
 */

import React, { Component } from "react";

import 'core-js';

import RichTextEditor from "react-rte";

import Loader from 'react-loaders';

import FeedbackTemplateView from "./FeedbackTemplateView";
import MarketingService from "../../services/MarketingService";

export default class MarketingWidgetView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            account: null,
            showLoader: true
        }
    }

    componentDidMount() {

        let t = this;

        setTimeout(function () {
            MarketingService.getMarketingWidget({ id: t.props.match.params.id }, response => {
                response.originalTemplate.contactInfoPage.terms.markupObj = RichTextEditor.createValueFromString(response.originalTemplate.contactInfoPage.terms.markup, "markdown");
                response.languages.forEach(element => {
                    response.translatedTemplates[element.langID].contactInfoPage.terms.markupObj = RichTextEditor.createValueFromString(response.translatedTemplates[element.langID].contactInfoPage.terms.markup, "markdown");
                });
                t.setState({
                    account: response,
                    showLoader: false
                });
            });
        }, 500);
    }

    render() {
        return (
            <div>
                {this.state.account && (
                    <FeedbackTemplateView
                        targetCustomer={this.state.account.customer}
                        marketingAccountID={this.props.match.params.id}
                        id={this.props.match.params.id}
                        marketingLink={this.state.account.link}
                        template={this.state.account.originalTemplate}
                        languages={this.state.account.languages}
                        translatedTemplates={this.state.account.translatedTemplates}
                        widgetType="marketing_widget"
                    />)}

                {this.state.showLoader && (
                    <div style={{ position: "fixed", width: "100%", height: "100%", backgroundColor: "rgba(255,255,255,0.5)", zIndex: 99999 }} className="layout-column layout-align-center-center">
                        <Loader type="ball-clip-rotate-multiple" />
                    </div>
                )}

            </div>
        )
    }
}
