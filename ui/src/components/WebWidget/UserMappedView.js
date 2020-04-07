/**
 * Created by maykinayki on 3/7/17.
 */

import React, { Component } from "react";

import "core-js";

import RichTextEditor from "react-rte";

import Loader from "react-loaders";

import FeedbackTemplateView from "./FeedbackTemplateView";
import WebAccountService from "../../services/WebAccountService";

import moment from "moment";
window.moment = moment;

export default class UserMappedView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: null,
      showLoader: true,
      mapping: null
    };
  }

  componentDidMount() {
    const t = this;

    setTimeout(function() {
      WebAccountService.userMappedView(
        { username: t.props.match.params.id },
        mapping => {
          let closeDirectly = false;
          let now = moment();
          let morningStart = moment().set({ hour: "7", minute: "30" });
          let morningDeadline = moment().set({ hour: "10", minute: "30" });
          let eveningStart = moment().set({ hour: "13", minute: "30" });
          let eveningEnd = moment().set({ hour: "15", minute: "30" });

          let lastFeedbackMoment = moment().set({ year: "1995" });

          if(mapping.lastFeedback){
            lastFeedbackMoment = moment(mapping.lastFeedback);
          }

          let whiteHours =
            (now.isAfter(morningStart) && now.isBefore(morningDeadline)) ||
            (now.isAfter(eveningStart) && now.isBefore(eveningEnd));
          let morningFeedbackGiven =
            now.isBefore(eveningStart) &&
            lastFeedbackMoment.isAfter(morningStart);
          let eveningFeedbackGiven =
            now.isAfter(eveningStart) &&
            lastFeedbackMoment.isAfter(eveningStart);

          if (morningFeedbackGiven || eveningFeedbackGiven || !whiteHours) {
            closeDirectly = true;
          }

          if (closeDirectly) {
            window.location.href = "/closekiosk";
          } else {
            WebAccountService.getWebWidget(
              { id: mapping.account.username },
              response => {
                console.log("gelen cavab", response);

                // oazis data is different, comment this on prod
                // let response = responseRaw.webAccountData;

                response.originalTemplate.contactInfoPage.terms.markupObj = RichTextEditor.createValueFromString(
                  response.originalTemplate.contactInfoPage.terms.markup,
                  "markdown"
                );
                response.languages.forEach(element => {
                  response.translatedTemplates[
                    element.langID
                  ].contactInfoPage.terms.markupObj = RichTextEditor.createValueFromString(
                    response.translatedTemplates[element.langID].contactInfoPage
                      .terms.markup,
                    "markdown"
                  );
                });
                t.setState({
                  account: response,
                  showLoader: false,
                  mapping: mapping
                });
              }
            );
          }
        },
        error => {}
      );
    }, 500);
  }

  closeParentWindowIframe = e => {
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
      <div id="myContainer" onClick={this.closeParentWindowIframe}>
        {this.state.account && (
          <FeedbackTemplateView
            webAccountID={this.state.mapping.account.username}
            id={this.state.mapping.account.username}
            template={this.state.account.originalTemplate}
            properties={this.state.account.properties}
            languages={this.state.account.languages}
            translatedTemplates={this.state.account.translatedTemplates}
            location={this.props.location}
            autoClose={true}
          />
        )}

        {this.state.showLoader && (
          <div
            style={{
              position: "fixed",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255,255,255,0.5)",
              zIndex: 99999
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
