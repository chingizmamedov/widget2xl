/** @format */

const version = "v1";

const server_1 = "https://api.qmeter.net";
const server_2 = "https://api.qmeter.net";
const localAPI = "http://localhost:9000";

const constants = {
	api: {
		baseURL() {
			return process.env.REACT_APP_ENV === "production" ? server_2 : server_1; //api URI based on ENV
		},
		apiURL() {
			return this.baseURL() + "/" + version;
		},
		buildURL(path) {
			let t = this;
			return t.apiURL() + path;
		},
	},
	fn: {
		isAvailableRateOption(rateOptionIndex, template) {
			let rateOptionCount = template.ratePage.rateOption;
			if (rateOptionCount === 4) {
				return rateOptionIndex !== 2;
			} else if (rateOptionCount === 3) {
				return rateOptionIndex !== 1 && rateOptionIndex !== 3;
			} else if (rateOptionCount === 2) {
				return rateOptionIndex === 0 || rateOptionIndex === 4;
			}
			return true;
		},
		getRateMarkPageValueByText(rate) {
			let t = "";
			if (rate.value === 10) {
				t = "onVeryGood";
			}
			if (rate.value === 5) {
				t = "onGood";
			}
			if (rate.value === 0) {
				t = "onNeutral";
			}
			if (rate.value === -5) {
				t = "onBad";
			}
			if (rate.value === -10) {
				t = "onVeryBad";
			}
			return t;
		},
	},
	metaData: {
		ageRanges: [
			{ id: 1, name: "12-17", value: "12-17" },
			{ id: 2, name: "18-24", value: "18-24" },
			{ id: 3, name: "25-34", value: "25-34" },
			{ id: 4, name: "35-44", value: "35-44" },
			{ id: 5, name: "45-54", value: "45-54" },
			{ id: 6, name: "55+", value: "55+" },
		],
		genders: [
			{ id: 1, value: "m", name: "Male" },
			{ id: 2, value: "f", name: "Female" },
		],
	},
	regexps: {
		onlyletters: /^[a-zа-я\süöğıəçş\u00C0-\u00ff\u00C6\u00D0\u018E\u018F\u0190\u0194\u0132\u014A\u0152\u1E9E\u00DE\u01F7\u021C\u00E6\u00F0\u01DD\u0259\u025B\u0263\u0133\u014B\u0153\u0138\u017F\u00DF\u00FE\u01BF\u021D\u0104\u0181\u00C7\u0110\u018A\u0118\u0126\u012E\u0198\u0141\u00D8\u01A0\u015E\u0218\u0162\u021A\u0166\u0172\u01AFY\u0328\u01B3\u0105\u0253\u00E7\u0111\u0257\u0119\u0127\u012F\u0199\u0142\u00F8\u01A1\u015F\u0219\u0163\u021B\u0167\u0173\u01B0y\u0328\u01B4\u00C1\u00C0\u00C2\u00C4\u01CD\u0102\u0100\u00C3\u00C5\u01FA\u0104\u00C6\u01FC\u01E2\u0181\u0106\u010A\u0108\u010C\u00C7\u010E\u1E0C\u0110\u018A\u00D0\u00C9\u00C8\u0116\u00CA\u00CB\u011A\u0114\u0112\u0118\u1EB8\u018E\u018F\u0190\u0120\u011C\u01E6\u011E\u0122\u0194\u00E1\u00E0\u00E2\u00E4\u01CE\u0103\u0101\u00E3\u00E5\u01FB\u0105\u00E6\u01FD\u01E3\u0253\u0107\u010B\u0109\u010D\u00E7\u010F\u1E0D\u0111\u0257\u00F0\u00E9\u00E8\u0117\u00EA\u00EB\u011B\u0115\u0113\u0119\u1EB9\u01DD\u0259\u025B\u0121\u011D\u01E7\u011F\u0123\u0263\u0124\u1E24\u0126I\u00CD\u00CC\u0130\u00CE\u00CF\u01CF\u012C\u012A\u0128\u012E\u1ECA\u0132\u0134\u0136\u0198\u0139\u013B\u0141\u013D\u013F\u02BCN\u0143N\u0308\u0147\u00D1\u0145\u014A\u00D3\u00D2\u00D4\u00D6\u01D1\u014E\u014C\u00D5\u0150\u1ECC\u00D8\u01FE\u01A0\u0152\u0125\u1E25\u0127\u0131\u00ED\u00ECi\u00EE\u00EF\u01D0\u012D\u012B\u0129\u012F\u1ECB\u0133\u0135\u0137\u0199\u0138\u013A\u013C\u0142\u013E\u0140\u0149\u0144n\u0308\u0148\u00F1\u0146\u014B\u00F3\u00F2\u00F4\u00F6\u01D2\u014F\u014D\u00F5\u0151\u1ECD\u00F8\u01FF\u01A1\u0153\u0154\u0158\u0156\u015A\u015C\u0160\u015E\u0218\u1E62\u1E9E\u0164\u0162\u1E6C\u0166\u00DE\u00DA\u00D9\u00DB\u00DC\u01D3\u016C\u016A\u0168\u0170\u016E\u0172\u1EE4\u01AF\u1E82\u1E80\u0174\u1E84\u01F7\u00DD\u1EF2\u0176\u0178\u0232\u1EF8\u01B3\u0179\u017B\u017D\u1E92\u0155\u0159\u0157\u017F\u015B\u015D\u0161\u015F\u0219\u1E63\u00DF\u0165\u0163\u1E6D\u0167\u00FE\u00FA\u00F9\u00FB\u00FC\u01D4\u016D\u016B\u0169\u0171\u016F\u0173\u1EE5\u01B0\u1E83\u1E81\u0175\u1E85\u01BF\u00FD\u1EF3\u0177\u00FF\u0233\u1EF9\u01B4\u017A\u017C\u017E\u1E93]+$/i,
	},
};

export default constants;
