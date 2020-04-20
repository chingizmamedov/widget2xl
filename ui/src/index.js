import React from "react";
import ReactDOM from "react-dom";

import "loaders.css/loaders.css";
import "./styles/main.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MarketingWidgetView from "./components/WebWidget/MarketingWidgetView";
import WebWidgetView from "./components/WebWidget/WebWidgetView";
import UserMappedView from "./components/WebWidget/UserMappedView";

const Parsley = window.Parsley;

(function () {
  if (Parsley) {
    Parsley.addValidator("validatePhoneIfRequiredOrDefaultValueChanged", {
      validateString: function (value, requirement, parsleyInstance) {
        var $element = parsleyInstance.$element;

        var phoneRegex = /^([+]?\d{1,3}[-\s]?|)\d{2,3}[-\s]?\d{3}[-\s]?\d{4}$/;
        var defaultValue = $element.data("default-value");
        var isRequired = $element.prop("required");

        console.log(isRequired, defaultValue, value);

        if (isRequired && value.length < 7) {
          return false;
        }

        return isRequired
          ? phoneRegex.test(value)
          : value === defaultValue || phoneRegex.test(value);
      },

      messages: {
        en: "Phone number is not valid",
      },
    });
  }
})();

const subdomainName = window.location.hostname.split(".")[0];

let componentToRender = WebWidgetView;
switch (subdomainName) {
  case "e": {
    componentToRender = MarketingWidgetView;
    break;
  }
  case "s": {
    componentToRender = MarketingWidgetView;
    break;
  }
  case "um": {
    componentToRender = UserMappedView;
    break;
  }
  default: {
    componentToRender = WebWidgetView;
  }
}

ReactDOM.render(
  <Router>
    <div className="vh100">
      <Switch>
        <Route exact path="/:id" component={componentToRender} />
      </Switch>
    </div>
  </Router>,
  document.getElementById("root")
);
