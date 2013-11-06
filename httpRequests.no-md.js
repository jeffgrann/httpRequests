//****************************************************************************************************
// MODULE: httpRequests
//****************************************************************************************************
//----------------------------------------------------------------------------------------------------
({define: typeof define === 'function' ? define : function (A,F) {var I = F.apply(null, A.map(require)); Object.keys(I).forEach(function(k) {exports[k] = I[k];});}}).define(

['http'], // Module dependencies.

function (http) {
	"use strict";
	
	var del;
	var get;
	var head;
	var publicInterface;
	var post;
	var put;
	var request;
	var Request;
	var RequestError;
	
	//****************************************************************************************************
	//****************************************************************************************************

	//****************************************************************************************************
	// RequestError
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	RequestError = function RequestError (message, xhr) {
	    this.message = message;
	    this.xhr = xhr;
	}

	RequestError.prototype = new Error();

	//****************************************************************************************************
	// Private Module Functions
	//****************************************************************************************************
	
	Request = function Request (method, url, callback) {
		var isAsync = typeof callback === 'function';
		
		this._method = method;
		this._url = url;
		this._xhr = new XMLHttpRequest();
		this._xhr.open(method, url, isAsync);
		this._callback = callback;
	};
	
	//****************************************************************************************************
	//****************************************************************************************************

	//****************************************************************************************************
	// del
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	del = function del (url, callback) {
		return request('DELETE', url, callback);
	};
	
	//****************************************************************************************************
	// get
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	get = function get (url, callback) {
		return request('GET', url, callback);
	};
	
	//****************************************************************************************************
	// head
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	head = function head (url, callback) {
		return request('HEAD', url, callback);
	};
	
	//****************************************************************************************************
	// post
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	post = function post (url, callback) {
		return request('POST', url, callback);
	};
	
	//****************************************************************************************************
	// put
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	put = function put (url, callback) {
		return request('PUT', url, callback);
	};
	
	//****************************************************************************************************
	// request
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	request = function request (method, url, callback) {
		return new Request(method, url, callback);
	};
	
	//****************************************************************************************************
	//****************************************************************************************************

	Request.prototype._isAsynchronous = function requestIsAsynchronous () {
		return typeof this._callback === 'function';
	};

	//****************************************************************************************************
	// Request.send
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	Request.prototype.send = function sendRequest (data) {
		var canReauthenticate = typeof this._authenticate === 'function';
		var newRequest;
		
		if (typeof this._setHeadersFunction === 'function') {
			this._setHeadersFunction(this._xhr);
		}
		
		if (this._isAsynchronous()) {
			this._xhr.onreadystatechange =
				function () {
					if (this._xhr.readyState === 4) {
						if (http.isAuthErrorResponse(this._xhr) && canReauthenticate) {
							this._authenticate(this._authenticationInfo);
							newRequest = request(this._method, this._url, this._callback).setHeaders(this._setHeadersFunction);
							newRequest.send(data);
						}
						else {
							this._callback(this._xhr);
						}
			    	}
			  	};
		}

		if (typeof data === 'undefined') {
			this._xhr.send();
		}
		else {
			this._xhr.send(data);
		}

		if (this._isAsynchronous()) {
			return;
		}
		
		if (http.isAuthErrorResponse(this._xhr) && canReauthenticate) {
			this._authenticate(this._authenticationInfo);
			newRequest = request(this._method, this._url, this._callback).setHeaders(this._setHeadersFunction);
			return newRequest.send(data);
		}
		else {
			if (http.isErrorResponse(this._xhr)) {
				throw new RequestError(http.statusText(this._xhr), this._xhr);
			}

			return this._xhr;
		}
	};

	//****************************************************************************************************
	// Request.setAuthentication
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	Request.prototype.setAuthentication = function setRequestAuthentication (authenticationFunction, authenticationInfo) {
		this._authenticate = authenticationFunction;
		this._authenticationInfo = authenticationInfo;
		return this;
	};
	
	//****************************************************************************************************
	// Request.setHeaders
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	Request.prototype.setHeaders = function setRequestHeaders (setHeadersFunction) {
		this._setHeadersFunction = setHeadersFunction;
		return this;
	};
	
	//****************************************************************************************************
	// Set this module's public interface.
	//****************************************************************************************************
	publicInterface = {};

	publicInterface.del				= del;
	publicInterface.get				= get;
	publicInterface.head			= head;
	publicInterface.post		 	= post;
	publicInterface.put		 		= put;
	publicInterface.request 	 	= request;
	publicInterface.RequestError 	= RequestError;
	
	return publicInterface;
});

//****************************************************************************************************
//****************************************************************************************************
//----------------------------------------------------------------------------------------------------

//****************************************************************************************************
//****************************************************************************************************

