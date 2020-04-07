/**
 * Qmeter universal web widget script
 * www.qmeter.net
 * Author: mike
 * Created on 3/5/17.
 */

"use strict";

(function (window, document) {

    function initWidget(uid) {

        var process =  {
            env: {
                NODE_ENV: "test"
            }
        };

        var apihost = process.env.NODE_ENV === "production" ? "https://api.qmeter.net" : "https://api.testqmeter.net";
        var webwidgetURI = apihost+"/v1/webwidget/"+uid;

        var host = process.env.NODE_ENV === "production" ? "https://w.qmeter.net" : "https://w.testqmeter.net";
        var iframeURI = host+"/"+uid;

        var CDN_HOST = process.env.NODE_ENV === "production" ? "https://app.qmeter.net" : "https://testqmeter.net";
        var loaderURI = CDN_HOST+"/static/web/loader.gif";

        var css = "[id*='qww-']{-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; font-family: 'Arial', sans-serif;}@font-face{font-family:'Qmeter';src:url('https://app.qmeter.net/fonts/Qmeter.eot');src:url('https://app.qmeter.net/fonts/Qmeter.eot?#iefix') format('embedded-opentype'),url('https://app.qmeter.net/fonts/Qmeter.woff') format('woff'),url('https://app.qmeter.net/fonts/Qmeter.ttf') format('truetype'),url('https://app.qmeter.net/fonts/Qmeter.svg#Qmeter') format('svg');font-weight: normal;font-style: normal;}[class*='qs-icon-']:before{display: inline-block;font-family: 'Qmeter';font-style: normal;font-weight: normal;line-height: normal; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale}.qs-icon-s1:before{content:'\\0041';}.qs-icon-s2:before{content:'\\0042';}.qs-icon-s3:before{content:'\\0043';}.qs-icon-s4:before{content:'\\0044';}.qs-icon-s5:before{content:'\\0045';}.qs-icon-s1:before{content:'\\0031';}.qs-icon-s2:before{content:'\\0032';}.qs-icon-s3:before{content:'\\0033';}.qs-icon-s4:before{content:'\\0034';}.qs-icon-s5:before{content:'\\0035';}.qs-icon-men:before{content:'\\0038';}.qs-icon-women:before{content:'\\0039';}iframe{margin: 0;padding: 0;border: 0;font-size: 100%;font: inherit;vertical-align: baseline;}.layout-column { -ms-flex-direction: column;flex-direction: column;}.layout-row { -ms-flex-direction: row;flex-direction: row;}.layout-align-center-center{-ms-flex-align: center; -ms-grid-row-align: center;align-items: center; -ms-flex-line-pack: center;align-content: center;justify-content: center;max-width: 100%;}.layout, .layout-column, .layout-row {box-sizing: border-box;display: -ms-flexbox;display: flex;}",
            head = document.head || document.getElementsByTagName('head')[0], style = document.createElement('style');

        style.type = 'text/css';
        if (style.styleSheet){
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);


        var widgetContainer = document.createElement("div");
        widgetContainer.setAttribute("id", "qww-"+uid);
        document.body.appendChild(widgetContainer);

        var widgetButton = document.createElement("div");
        widgetContainer.appendChild(widgetButton);

        var widgetSmileDiv = document.createElement("div");
        widgetButton.appendChild(widgetSmileDiv);
        var wsdss = {display: "table-cell", verticalAlign: "middle", padding: "10px 5px 10px 10px", textAlign: "center"};
        for(var wsds in wsdss) {
            if(wsdss.hasOwnProperty(wsds)) {
                widgetSmileDiv.style[wsds] = wsdss[wsds];
            }
        }

        var widgetTextDiv = document.createElement("div");
        widgetButton.appendChild(widgetTextDiv);
        var wtdss = {display: "table-cell", verticalAlign: "middle", textAlign: "center", padding: "10px 10px 10px 5px"};
        for(var wtds in wtdss) {
            if(wtdss.hasOwnProperty(wtds)) {
                widgetTextDiv.style[wtds] = wtdss[wtds];
            }
        }

        var loaderImage = document.createElement("img");
        loaderImage.width = 22;
        loaderImage.src = loaderURI;

        fetch(webwidgetURI).then(checkStatus)
        .then(function (response) {
            return response.json();
        }).then(function (response) {
            console.log(response);

            if(response && response.properties) {

                var modalBox = document.createElement("div");
                modalBox.setAttribute("class", "layout-row layout-align-center-center");
                modalBox.style.position = "fixed";
                modalBox.style.top = "0";
                modalBox.style.right = "0";
                modalBox.style.bottom = "0";
                modalBox.style.left = "0";
                modalBox.style.background = "rgba(0,0,0,.3)";
                modalBox.style.zIndex = 9999999999;
                modalBox.style.display = "none";

                window.addEventListener("message", function(event) {
                    if(event.data === "hideQWWModal") {
                        modalBox.style.display = "none";
                    }
                });

                var modalOverlay = document.createElement("div");
                modalOverlay.addEventListener("click", function () {
                    modalBox.style.display = "none";
                }, false);
                modalOverlay.style.position = "absolute";
                modalOverlay.style.top = "0";
                modalOverlay.style.right = "0";
                modalOverlay.style.bottom = "0";
                modalOverlay.style.left = "0";
                modalOverlay.style.background = "rgba(0,0,0,.6)";
                modalOverlay.style.zIndex = 100;

                var modalLoader = document.createElement("div");
                modalLoader.setAttribute("class", "layout-column layout-align-center-center");
                modalLoader.style.position = "absolute";
                modalLoader.style.top = "50%";
                modalLoader.style.left = "50%";
                modalLoader.style.width = "37px";
                modalLoader.style.height = "37px";
                modalLoader.style.marginTop = "-19px";
                modalLoader.style.marginLeft = "-19px";
                modalLoader.style.background = "rgba(0,0,0,1)";
                modalLoader.style.borderRadius = "3px";
                modalLoader.style.zIndex = 150;

                var modalDialog = document.createElement("div");
                modalDialog.style.width = "100%";
                modalDialog.style.minWidth = "440px";
                modalDialog.style.height = "100%";
                modalDialog.style.margin = "auto";

                var iframe = document.createElement("iframe");
                iframe.style.opacity = 0.01;
                iframe.onload = function () {
                    console.log("loaded");
                    setTimeout(function () {
                        iframe.style.opacity = 1;
                        modalDialog.style.zIndex = 200;
                        modalLoader.style.display = "none";
                    }, 500);
                };
                iframe.setAttribute("src", iframeURI);
                iframe.setAttribute("width", "100%");
                iframe.setAttribute("height", "100%");


                modalBox.appendChild(modalOverlay);

                modalBox.appendChild(modalLoader);
                modalLoader.appendChild(loaderImage);

                modalBox.appendChild(modalDialog);

                modalDialog.appendChild(iframe);

                document.body.appendChild(modalBox);


                widgetButton.addEventListener("click", function () {
                    modalBox.style.display = "flex";
                }, false);

                var styles = widgetPropertiesToCSS(response.properties);
                for(var style in styles) {
                    if(styles.hasOwnProperty(style)) {
                        widgetButton.style[style] = styles[style];
                    }
                }

                setTimeout(function () {
                    widgetButton.style.marginLeft = response.properties.wgtBtnHorizontalMargin+"px";
                }, 1500);

                var widgetSmileImage = document.createElement("span");
                widgetSmileImage.style.color = response.properties.wgtBtnSmileyFontColor;
                widgetSmileImage.style.fontSize = response.properties.wgtBtnSmileySize + "px";
                widgetSmileImage.style.lineHeight = "10px";
                widgetSmileImage.style.display = "block";
                widgetSmileImage.setAttribute("class", "qs-icon-s2");
                widgetSmileDiv.appendChild(widgetSmileImage);

                if(response.properties.wgtBtnText) {
                    var widgetTextElement = document.createElement("div");
                    widgetTextElement.innerText = response.properties.wgtBtnText;
                    widgetTextDiv.appendChild(widgetTextElement);
                    var wtess = {
                        width: response.properties.wgtBtnWidth + "px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: response.properties.wgtBtnTextSize + "px",
                        fontFamily: "Roboto, Arial, sans-serif",
                        fontWeight: response.properties.wgtBtnTextBold ? "bold": "normal",
                        textDecoration: response.properties.wgtBtnTextUnderlined ? "underline": "none",
                        fontStyle: response.properties.wgtBtnTextItalic ? "italic": "normal",
                        letterSpacing: "normal"
                    };
                    for(var wtes in wtess) {
                        if(wtess.hasOwnProperty(wtes)) {
                            widgetTextElement.style[wtes] = wtess[wtes];
                        }
                    }
                }

            }
        }).catch(function (error) {
            console.error(error);
        });
    }

    function widgetPropertiesToCSS(properties) {
        var style = {
            backgroundColor: properties.wgtBtnBgColor,
            color: properties.wgtBtnFontColor,
            height: properties.wgtBtnHeight+"px",
            borderTopLeftRadius: properties.wgtBtnRadiusTop+"px",
            borderTopRightRadius: properties.wgtBtnRadiusTop+"px",
            borderBottomLeftRadius: properties.wgtBtnRadiusBottom+"px",
            borderBottomRightRadius: properties.wgtBtnRadiusBottom+"px",
            marginLeft: "-9999px",
            marginRight: properties.wgtBtnHorizontalMargin+"px",
            marginTop: properties.wgtBtnVerticalMargin+"px",
            marginBottom: properties.wgtBtnVerticalMargin+"px",
            minWidth: "55px",
            fontSize: properties.wgtBtnTextSize+"px",
            display: "table",
            position: "fixed",
            cursor: "pointer",
            zIndex: 9999999
        };

        switch (properties.wgtBtnPosition) {
            case "TOP_LEFT": {
                style.top = 0;
                style.left = 0;
                break;
            }
            case "TOP_CENTER": {
                style.top = 0;
                style.left = "50%";
                style.transform = "translate(-50%, 0)";
                break;
            }
            case "TOP_RIGHT": {
                style.top = 0;
                style.right = 0;
                break;
            }
            case "CENTER_LEFT": {
                style.top = "50%";
                style.left = Math.round(properties.wgtBtnHeight / 2) + "px";
                style.transform = "translate(-50%, -50%) rotate(-90deg)";
                style.transformOrigin = "center center";
                break;
            }
            case "CENTER_RIGHT": {
                style.top = "50%";
                style.right = Math.round(properties.wgtBtnHeight / 2) + "px";
                style.transform = "translate(50%, -50%) rotate(-90deg)";
                style.transformOrigin = "center center";
                break;
            }
            case "BOTTOM_LEFT": {
                style.bottom = 0;
                style.left = 0;
                break;
            }
            case "BOTTOM_CENTER": {
                style.bottom = 0;
                style.left = "50%";
                style.transform = "translate(-50%, 0)";
                break;
            }
            case "BOTTOM_RIGHT": {
                style.bottom = 0;
                style.right = 0;
                break;
            }
        }
        return style;
    }

    function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }

    (function () {
        window.WebFontConfig = {
            google: { families: [ 'Roboto'] }
        };
        (function() {
            var wf = document.createElement('script');
            wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
                '://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js';
            wf.type = 'text/javascript';
            wf.async = 'true';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(wf, s);
        })();
    })();

    (function(self) {
        'use strict';

        if (self.fetch) {
            return
        }

        var support = {
            searchParams: 'URLSearchParams' in self,
            iterable: 'Symbol' in self && 'iterator' in Symbol,
            blob: 'FileReader' in self && 'Blob' in self && (function() {
                try {
                    new Blob()
                    return true
                } catch(e) {
                    return false
                }
            })(),
            formData: 'FormData' in self,
            arrayBuffer: 'ArrayBuffer' in self
        }

        if (support.arrayBuffer) {
            var viewClasses = [
                '[object Int8Array]',
                '[object Uint8Array]',
                '[object Uint8ClampedArray]',
                '[object Int16Array]',
                '[object Uint16Array]',
                '[object Int32Array]',
                '[object Uint32Array]',
                '[object Float32Array]',
                '[object Float64Array]'
            ]

            var isDataView = function(obj) {
                return obj && DataView.prototype.isPrototypeOf(obj)
            }

            var isArrayBufferView = ArrayBuffer.isView || function(obj) {
                    return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
                }
        }

        function normalizeName(name) {
            if (typeof name !== 'string') {
                name = String(name)
            }
            if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
                throw new TypeError('Invalid character in header field name')
            }
            return name.toLowerCase()
        }

        function normalizeValue(value) {
            if (typeof value !== 'string') {
                value = String(value)
            }
            return value
        }

        // Build a destructive iterator for the value list
        function iteratorFor(items) {
            var iterator = {
                next: function() {
                    var value = items.shift()
                    return {done: value === undefined, value: value}
                }
            }

            if (support.iterable) {
                iterator[Symbol.iterator] = function() {
                    return iterator
                }
            }

            return iterator
        }

        function Headers(headers) {
            this.map = {}

            if (headers instanceof Headers) {
                headers.forEach(function(value, name) {
                    this.append(name, value)
                }, this)
            } else if (Array.isArray(headers)) {
                headers.forEach(function(header) {
                    this.append(header[0], header[1])
                }, this)
            } else if (headers) {
                Object.getOwnPropertyNames(headers).forEach(function(name) {
                    this.append(name, headers[name])
                }, this)
            }
        }

        Headers.prototype.append = function(name, value) {
            name = normalizeName(name)
            value = normalizeValue(value)
            var oldValue = this.map[name]
            this.map[name] = oldValue ? oldValue+','+value : value
        }

        Headers.prototype['delete'] = function(name) {
            delete this.map[normalizeName(name)]
        }

        Headers.prototype.get = function(name) {
            name = normalizeName(name)
            return this.has(name) ? this.map[name] : null
        }

        Headers.prototype.has = function(name) {
            return this.map.hasOwnProperty(normalizeName(name))
        }

        Headers.prototype.set = function(name, value) {
            this.map[normalizeName(name)] = normalizeValue(value)
        }

        Headers.prototype.forEach = function(callback, thisArg) {
            for (var name in this.map) {
                if (this.map.hasOwnProperty(name)) {
                    callback.call(thisArg, this.map[name], name, this)
                }
            }
        }

        Headers.prototype.keys = function() {
            var items = []
            this.forEach(function(value, name) { items.push(name) })
            return iteratorFor(items)
        }

        Headers.prototype.values = function() {
            var items = []
            this.forEach(function(value) { items.push(value) })
            return iteratorFor(items)
        }

        Headers.prototype.entries = function() {
            var items = []
            this.forEach(function(value, name) { items.push([name, value]) })
            return iteratorFor(items)
        }

        if (support.iterable) {
            Headers.prototype[Symbol.iterator] = Headers.prototype.entries
        }

        function consumed(body) {
            if (body.bodyUsed) {
                return Promise.reject(new TypeError('Already read'))
            }
            body.bodyUsed = true
        }

        function fileReaderReady(reader) {
            return new Promise(function(resolve, reject) {
                reader.onload = function() {
                    resolve(reader.result)
                }
                reader.onerror = function() {
                    reject(reader.error)
                }
            })
        }

        function readBlobAsArrayBuffer(blob) {
            var reader = new FileReader()
            var promise = fileReaderReady(reader)
            reader.readAsArrayBuffer(blob)
            return promise
        }

        function readBlobAsText(blob) {
            var reader = new FileReader()
            var promise = fileReaderReady(reader)
            reader.readAsText(blob)
            return promise
        }

        function readArrayBufferAsText(buf) {
            var view = new Uint8Array(buf)
            var chars = new Array(view.length)

            for (var i = 0; i < view.length; i++) {
                chars[i] = String.fromCharCode(view[i])
            }
            return chars.join('')
        }

        function bufferClone(buf) {
            if (buf.slice) {
                return buf.slice(0)
            } else {
                var view = new Uint8Array(buf.byteLength)
                view.set(new Uint8Array(buf))
                return view.buffer
            }
        }

        function Body() {
            this.bodyUsed = false

            this._initBody = function(body) {
                this._bodyInit = body
                if (!body) {
                    this._bodyText = ''
                } else if (typeof body === 'string') {
                    this._bodyText = body
                } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
                    this._bodyBlob = body
                } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
                    this._bodyFormData = body
                } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                    this._bodyText = body.toString()
                } else if (support.arrayBuffer && support.blob && isDataView(body)) {
                    this._bodyArrayBuffer = bufferClone(body.buffer)
                    // IE 10-11 can't handle a DataView body.
                    this._bodyInit = new Blob([this._bodyArrayBuffer])
                } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
                    this._bodyArrayBuffer = bufferClone(body)
                } else {
                    throw new Error('unsupported BodyInit type')
                }

                if (!this.headers.get('content-type')) {
                    if (typeof body === 'string') {
                        this.headers.set('content-type', 'text/plain;charset=UTF-8')
                    } else if (this._bodyBlob && this._bodyBlob.type) {
                        this.headers.set('content-type', this._bodyBlob.type)
                    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
                    }
                }
            }

            if (support.blob) {
                this.blob = function() {
                    var rejected = consumed(this)
                    if (rejected) {
                        return rejected
                    }

                    if (this._bodyBlob) {
                        return Promise.resolve(this._bodyBlob)
                    } else if (this._bodyArrayBuffer) {
                        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
                    } else if (this._bodyFormData) {
                        throw new Error('could not read FormData body as blob')
                    } else {
                        return Promise.resolve(new Blob([this._bodyText]))
                    }
                }

                this.arrayBuffer = function() {
                    if (this._bodyArrayBuffer) {
                        return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
                    } else {
                        return this.blob().then(readBlobAsArrayBuffer)
                    }
                }
            }

            this.text = function() {
                var rejected = consumed(this)
                if (rejected) {
                    return rejected
                }

                if (this._bodyBlob) {
                    return readBlobAsText(this._bodyBlob)
                } else if (this._bodyArrayBuffer) {
                    return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
                } else if (this._bodyFormData) {
                    throw new Error('could not read FormData body as text')
                } else {
                    return Promise.resolve(this._bodyText)
                }
            }

            if (support.formData) {
                this.formData = function() {
                    return this.text().then(decode)
                }
            }

            this.json = function() {
                return this.text().then(JSON.parse)
            }

            return this
        }

        // HTTP methods whose capitalization should be normalized
        var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

        function normalizeMethod(method) {
            var upcased = method.toUpperCase()
            return (methods.indexOf(upcased) > -1) ? upcased : method
        }

        function Request(input, options) {
            options = options || {}
            var body = options.body

            if (input instanceof Request) {
                if (input.bodyUsed) {
                    throw new TypeError('Already read')
                }
                this.url = input.url
                this.credentials = input.credentials
                if (!options.headers) {
                    this.headers = new Headers(input.headers)
                }
                this.method = input.method
                this.mode = input.mode
                if (!body && input._bodyInit != null) {
                    body = input._bodyInit
                    input.bodyUsed = true
                }
            } else {
                this.url = String(input)
            }

            this.credentials = options.credentials || this.credentials || 'omit'
            if (options.headers || !this.headers) {
                this.headers = new Headers(options.headers)
            }
            this.method = normalizeMethod(options.method || this.method || 'GET')
            this.mode = options.mode || this.mode || null
            this.referrer = null

            if ((this.method === 'GET' || this.method === 'HEAD') && body) {
                throw new TypeError('Body not allowed for GET or HEAD requests')
            }
            this._initBody(body)
        }

        Request.prototype.clone = function() {
            return new Request(this, { body: this._bodyInit })
        }

        function decode(body) {
            var form = new FormData()
            body.trim().split('&').forEach(function(bytes) {
                if (bytes) {
                    var split = bytes.split('=')
                    var name = split.shift().replace(/\+/g, ' ')
                    var value = split.join('=').replace(/\+/g, ' ')
                    form.append(decodeURIComponent(name), decodeURIComponent(value))
                }
            })
            return form
        }

        function parseHeaders(rawHeaders) {
            var headers = new Headers()
            rawHeaders.split(/\r?\n/).forEach(function(line) {
                var parts = line.split(':')
                var key = parts.shift().trim()
                if (key) {
                    var value = parts.join(':').trim()
                    headers.append(key, value)
                }
            })
            return headers
        }

        Body.call(Request.prototype)

        function Response(bodyInit, options) {
            if (!options) {
                options = {}
            }

            this.type = 'default'
            this.status = 'status' in options ? options.status : 200
            this.ok = this.status >= 200 && this.status < 300
            this.statusText = 'statusText' in options ? options.statusText : 'OK'
            this.headers = new Headers(options.headers)
            this.url = options.url || ''
            this._initBody(bodyInit)
        }

        Body.call(Response.prototype)

        Response.prototype.clone = function() {
            return new Response(this._bodyInit, {
                status: this.status,
                statusText: this.statusText,
                headers: new Headers(this.headers),
                url: this.url
            })
        }

        Response.error = function() {
            var response = new Response(null, {status: 0, statusText: ''})
            response.type = 'error'
            return response
        }

        var redirectStatuses = [301, 302, 303, 307, 308]

        Response.redirect = function(url, status) {
            if (redirectStatuses.indexOf(status) === -1) {
                throw new RangeError('Invalid status code')
            }

            return new Response(null, {status: status, headers: {location: url}})
        }

        self.Headers = Headers
        self.Request = Request
        self.Response = Response

        self.fetch = function(input, init) {
            return new Promise(function(resolve, reject) {
                var request = new Request(input, init)
                var xhr = new XMLHttpRequest()

                xhr.onload = function() {
                    var options = {
                        status: xhr.status,
                        statusText: xhr.statusText,
                        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
                    }
                    options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
                    var body = 'response' in xhr ? xhr.response : xhr.responseText
                    resolve(new Response(body, options))
                }

                xhr.onerror = function() {
                    reject(new TypeError('Network request failed'))
                }

                xhr.ontimeout = function() {
                    reject(new TypeError('Network request failed'))
                }

                xhr.open(request.method, request.url, true)

                if (request.credentials === 'include') {
                    xhr.withCredentials = true
                }

                if ('responseType' in xhr && support.blob) {
                    xhr.responseType = 'blob'
                }

                request.headers.forEach(function(value, name) {
                    xhr.setRequestHeader(name, value)
                })

                xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
            })
        }
        self.fetch.polyfill = true
    })(typeof self !== 'undefined' ? self : this);

    initWidget(window.qww.uid);

})(window, document);