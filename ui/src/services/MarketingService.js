/**
 * Created by maykinayki on 4/03/17.
 */

import {resource as $resource} from "react-angular-http-resource";

import $constant from "../utils/constants";

export default $resource($constant.api.buildURL('/marketing/threads/:id'), { id: '@id' }, {
    list: {url: $constant.api.buildURL('/marketing/threads/list/:page'), method: "POST", isArray: false, params: { page: '@page' }},

    upload: {
        url: $constant.api.buildURL('/marketing/threads/email/upload'),
        method: "POST",
        headers: {enctype:'multipart/form-data'}
    },

    update: { method: 'PUT' },
    getSMSList: {
        method: "POST",
        url: $constant.api.buildURL('/marketing/threads/:id/list/:page'),
        params: {
            id: "@id",
            page: "@page"
        }
    },
    getEmailList: {
        method: "POST",
        url: $constant.api.buildURL('/marketing/threads/email/:id/list/:page'),
        params: {
            id: "@id",
            page: "@page"
        }
    },
    getEmailThreadOverallCounts: {method: "GET", url: $constant.api.buildURL("/marketing/threads/email/:id/stats/counts"), params: {id: "@id"}, isArray: true},
    getEmailThreadServicesStats: {method: "GET", url: $constant.api.buildURL("/marketing/threads/email/:id/stats/services"), params: {id: "@id"}, isArray: true},

    getSMSThreadEstimatedPrice: {method: "POST", url: $constant.api.buildURL("/marketing/threads/getPrice"), params: {}, isArray: true},
    getSMSThreadCounts: {method: "POST", url: $constant.api.buildURL("/marketing/threads/getCounts"), params: {}},
    resendMarketingSMS: {method: "POST", url: $constant.api.buildURL("/marketing/sms/:id/resend"), params: {id: "@id"}},
    resendAllNotSentSMS: {method: "POST", url: $constant.api.buildURL("/marketing/threads/:id/resend"), params: {id: "@id"}},

    getLink: {method: "GET", url: $constant.api.buildURL("/marketing/links/:id"), params: {id: "@id"}},
    getMarketingWidget: {method: "GET", url: $constant.api.buildURL("/mwgt/:id"), params: {id: "@id"}},
    postMarketingWidget: {method: "POST", url: $constant.api.buildURL("/mwgt/:id"), params: {id: "@id"}},
    getThreadOverallCounts: {method: "GET", url: $constant.api.buildURL("/marketing/threads/:id/stats/counts"), params: {id: "@id"}, isArray: true},
    getThreadServicesStats: {method: "GET", url: $constant.api.buildURL("/marketing/threads/:id/stats/services"), params: {id: "@id"}, isArray: true}
});