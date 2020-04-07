/**
 * Created by maykinayki on 2/28/17.
 *
 * @format
 */

import { resource as $resource } from "react-angular-http-resource";

import $constant from "../utils/constants";

export default $resource(
	$constant.api.buildURL("/accounts/web/:id"),
	{ id: "@userID" },
	{
		update: { method: "PUT" },
		create: { method: "POST" },
		enableWebWidget: {
			method: "PUT",
			url: $constant.api.buildURL("/accounts/web/:userID/enable"),
			params: { userID: "@userID" },
		},
		disableWebWidget: {
			method: "PUT",
			url: $constant.api.buildURL("/accounts/web/:userID/disable"),
			params: { userID: "@userID" },
		},
		getWebWidget: {
			method: "GET",
			url: $constant.api.buildURL("/webwidget/:id"),
			params: { id: "@id" },
		},
		postWebWidget: {
			method: "POST",
			url: $constant.api.buildURL("/webwidget/:id"),
			params: { id: "@id" },
		},
		userMappedView: {
			method: "GET",
			url: $constant.api.buildURL("/usermappings/:username"),
			params: { username: "@username" },
		},
	},
);
