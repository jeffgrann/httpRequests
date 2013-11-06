
httpRequests v1.0
=================

httpRequests is a unified Javascript RequireJS/CommonJS module for the browser and/or Wakanda
Server (SSJS) which provides basic http request support which includes a provision for automatic 
reauthentication for services that use expiring authentication tokens. 

Contents
--------
* [Example](#EXAMPLE)
* [Dependencies](#DEPENDENCIES)
* [Script Files](#SCRIPT_FILES)
* [Exceptions](#EXCEPTIONS)
    * [RequestError](#REQUESTERROR)
* [Module Functions](#MODULE_FUNCTIONS)
    * [del (url, callback)](#DEL)
    * [get (url, callback)](#GET)
    * [head (url, callback)](#HEAD)
    * [post (url, callback)](#POST)
    * [put (url, callback)](#PUT)
    * [request (method, url, callback)](#REQUEST)
* [Request Object Methods](#REQUEST_OBJECT_METHODS)
    * [send (data)](#REQUEST.SEND)
    * [setAuthentication (authenticationFunction, authenticationInfo)](#REQUEST.SETAUTHENTICATION)
    * [setHeaders (setHeadersFunction)](#REQUEST.SETHEADERS)
* [Contributions](#CONTRIBUTIONS)
* [License](#LICENSE)


<a id="EXAMPLE"></a>
Example
-------

```javascript
var http = require('http');
var httpRequests = require('httpRequests');
var xhr;


// Simple synchronous get.
xhr = httpRequests.get("http://www.google.com").send();
alert(xhr.responseText);


// Simple asynchronous get.
xhr =
	httpRequests.get(
		"http://www.google.com",
		function (xhr) {
			if (http.isErrorResponse(xhr)) {
				alert("Error " + xhr.status + " occurred.");
			}
			else {
				alert(xhr.responseText);
			}
		}).send();
		

// Synchronous put of a file with headers and reauthentication.
httpRequests
	.put(url)
	.setHeaders(
		function (xhr) {
			xhr.setRequestHeader("X-Auth-Token", account.authToken);
			xhr.setRequestHeader("Content-Type", "application/pdf");	
		})
	.setAuthentication(authenticate, account)
	.send(file);
```

<a id="DEPENDENCIES"></a>
Dependencies
------------

* [http](https://github.com/jeffgrann/http)
* [RequireJS](http://requirejs.org) on the client (browser) side.
* [Wakanda](http://www.wakanda.org) v6+.

<a id="SCRIPT_FILES"></a>
Script Files
------------

* httpRequests.js - Fully commented script. Update to contribute.
* httpRequests.min.js - Minimized script. For normal use.
* httpRequests.no-md.js - Commented script without markdown comments. Use for debugging.

<a id="EXCEPTIONS"></a>
Exceptions
----------
<a id="REQUESTERROR"></a>
### RequestError

Exceptions of this type contain a `xhr` property which is an XMLHttpRequest object that can be used
to determine the type of the error using its `status` property. 

Examples:

```javascript
try {
    ....
    xhr.send();
}
catch (error) {
    if (error instanceof httpRequests.RequestError) {
        status = error.xhr.status;
    }
}
```

<a id="MODULE_FUNCTIONS"></a>
Module Functions
----------------
<a id="DEL"></a>
### del (url, callback)

Creates a new HTTP DELETE request. See [Request Object Methods](#REQUEST_OBJECT_METHODS).

#### Arguments

* `url` - The full URL for the request, including the domain.

* `callback` *optional* - A function to call when the request's response is received. The function
is passed the request's XMLHttpRequest object. If this function is specified, the request is
made asynchonously. Please note that as of version 6, Wakanda Server does not support
asynchronous HTTP requests. 

#### Return Value

* Returns a new Request object. See [Request Object Methods](#REQUEST_OBJECT_METHODS).

Examples:

```javascript
httpRequests.del(url).send();
```
<a id="GET"></a>
### get (url, callback)

Creates a new HTTP GET request. See [Request Object Methods](#REQUEST_OBJECT_METHODS).

#### Arguments

* `url` - The full URL for the request, including the domain.

* `callback` *optional* - A function to call when the request's response is received. The function
is passed the request's XMLHttpRequest object. If this function is specified, the request is
made asynchonously. Please note that as of version 6, Wakanda Server does not support
asynchronous HTTP requests. 

#### Return Value

* Returns a new Request object. See [Request Object Methods](#REQUEST_OBJECT_METHODS).

Examples:

```javascript
xhr = httpRequests.get(url).send();
```
<a id="HEAD"></a>
### head (url, callback)

Creates a new HTTP HEAD request. See [Request Object Methods](#REQUEST_OBJECT_METHODS).

#### Arguments

* `url` - The full URL for the request, including the domain.

* `callback` *optional* - A function to call when the request's response is received. The function
is passed the request's XMLHttpRequest object. If this function is specified, the request is
made asynchonously. Please note that as of version 6, Wakanda Server does not support
asynchronous HTTP requests. 

#### Return Value

* Returns a new Request object. See [Request Object Methods](#REQUEST_OBJECT_METHODS).

Examples:

```javascript
xhr = httpRequests.head(url).send();
```
<a id="POST"></a>
### post (url, callback)

Creates a new HTTP POST request. See [Request Object Methods](#REQUEST_OBJECT_METHODS).

#### Arguments

* `url` - The full URL for the request, including the domain.

* `callback` *optional* - A function to call when the request's response is received. The function
is passed the request's XMLHttpRequest object. If this function is specified, the request is
made asynchonously. Please note that as of version 6, Wakanda Server does not support
asynchronous HTTP requests. 

#### Return Value

* Returns a new Request object. See [Request Object Methods](#REQUEST_OBJECT_METHODS).

Examples:

```javascript
httpRequests.post(url).send();
```
<a id="PUT"></a>
### put (url, callback)

Creates a new HTTP PUT request. See [Request Object Methods](#REQUEST_OBJECT_METHODS).

#### Arguments

* `url` - The full URL for the request, including the domain.

* `callback` *optional* - A function to call when the request's response is received. The function
is passed the request's XMLHttpRequest object. If this function is specified, the request is
made asynchonously. Please note that as of version 6, Wakanda Server does not support
asynchronous HTTP requests. 

#### Return Value

* Returns a new Request object. See [Request Object Methods](#REQUEST_OBJECT_METHODS).

Examples:

```javascript
httpRequests.put(url).send();
```
<a id="REQUEST"></a>
### request (method, url, callback)

Creates a new HTTP request. See [Request Object Methods](#REQUEST_OBJECT_METHODS).

#### Arguments

* `method` - The HTTP method to use.

* `url` - The full URL for the request, including the domain.

* `callback` *optional* - A function to call when the request's response is received. The function
is passed the request's XMLHttpRequest object. If this function is specified, the request is
made asynchonously. Please note that as of version 6, Wakanda Server does not support
asynchronous HTTP requests. 

#### Return Value

* Returns a new Request object. See [Request Object Methods](#REQUEST_OBJECT_METHODS).

Examples:

```javascript
httpRequests.request("LOCK", url).send();
```
<a id="REQUEST_OBJECT_METHODS"></a>
Request Object Methods
----------------------
<a id="REQUEST.SEND"></a>
### Request.send (data)

Sends the request to the server. If the request has an associated callback function, returns after
sending the request and calls the callback function when the response is received, passing the
XMLHttpRequest object. If there is no associated callback function, waits for the response, and
then returns the XMLHttpRequest object. 

#### Arguments

* `data` *optional* - The request data to send.

#### Return Value

* If the request has an associated callback function, no value is returned. If it doesn't, returns
the XMLHttpRequest object. 

#### Exceptions

* `RequestError` - Throws this exception when this method is called synchronously and the response
contains an http error status code. See the [RequestError exception](#REQUESTERROR).

Examples:

```javascript
httpRequests.post(url).send();
```
<a id="REQUEST.SETAUTHENTICATION"></a>
### Request.setAuthentication (authenticationFunction, authenticationInfo)

Sets the function to call when reauthentication is required because the current authentication
expired.

#### Arguments

* `authenticationFunction` - The function to call when reauthentication is required. This function is
passed `authenticationInfo`. 

* `authenticationInfo` *optional* - An object to pass to `authenticationFunction`. Typically contains
account information -- user name, password, and the like. 

#### Return Value

* The Request object. This value is useful for chaining method calls.

Examples:

```javascript
httpRequest.setAuthentication(authenticate, this.accountInfo);
```
<a id="REQUEST.SETHEADERS"></a>
### Request.setHeaders (setHeadersFunction)

Calls the given function with the XMLHttpRequest object as the argument so that the function can
set the request's headers. 

#### Arguments

* `setHeadersFunction` - The function to call to set the headers. This function is passed the
request's XMLHttpRequest object. 

#### Return Value

* The Request object. This value is useful for chaining method calls.

Examples:

```javascript
httpRequest.setHeaders(function (xhr) { xhr.setRequestHeader("X-Auth-Token", theToken); });
```

<a id="CONTRIBUTIONS"></a>
Contributions
-------------
If you contribute to this library, just modify `httpRequests.js` and send a pull request. Please
remember to update the markdown if the public interface changes. 

<a id="LICENSE"></a>
License
-------
Licensed under MIT.

Copyright (C) 2013 [Jeff Grann](https://github.com/jeffgrann) <jeff@successware.net>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions: 

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software. 

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
