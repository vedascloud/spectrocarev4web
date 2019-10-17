(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"\">\r\n      <app-header *ngIf=\"isValid()\"></app-header>\r\n\r\n</div>\r\n\r\n<div class=\"container-fluid\">\r\n   <div class=\"row\">\r\n       <div class=\"col-md-2 \"> \r\n           <app-sidebar *ngIf=\"isValid()\"></app-sidebar>\r\n        </div>\r\n        <div class=\"col-md-10\">\r\n                <router-outlet *ngIf=\"isValid()\"></router-outlet>\r\n        </div>\r\n   </div>\r\n</div>\r\n<router-outlet *ngIf=\"!isValid()\"></router-outlet>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/adminsignin/adminsignin.component.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/adminsignin/adminsignin.component.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"menbersigninbg\">\n\n    <div class=\"container\">\n\n        <div class=\"\">\n\n       \n        <div class=\"mb-3\">\n            <h3 class=\"p-3 text-white\">Welcome to SpectroCare</h3>\n        </div>\n\n        <div class=\"row justify-content-center \">\n\n            <div class=\"col-md-2\"></div>\n            <div class=\"col-md-8\">\n                <div class=\"card\">\n\n                    <h4 class=\"mt-4 mb-4\">Sign In as {{title}}</h4>\n\n                    <div class=\"container\">\n                        <div class=\"row \">\n                            <div class=\"col-md-2\">\n                            </div>\n                            <div class=\"col-sm-8\">\n\n                               <div class=\"d-inline d-flex justify-content-around\">\n                                <button [ngClass]=\"{'btn-primary':isAdministrator === true}\" class=\"btn btn-sm  btn-outline-dark shadow text-uppercase\"\n                                 (click)=\"callAdministrator()\">Administrator</button>\n                                <button class=\"text-nowrap btn btn-sm btn-outline-dark shadow text-uppercase\"\n                                (click)=\"callMedicalPersonnel()\" [ngClass]=\"{'btn-primary':isAdministrator === false}\">medical personnel</button>\n                               </div>\n\n                            </div>\n                            <div class=\"col-md-2\">\n                            </div> \n                        </div>\n                    </div>\n\n                    <div class=\"container\" *ngIf=\"isAdministrator\">\n                        <div class=\"row ml-5 mr-5 mt-4\">\n                            <div class=\"col-md-2\">\n                            </div>\n                            <div class=\"col-md-8 \">\n                                <form>\n                                    <div class=\"form-group\">\n                                        <label for=\"exampleInputEmail1\">Email</label>\n                                        <input type=\"email\" class=\"form-control bg-light\" id=\"exampleInputEmail1\"\n                                            aria-describedby=\"emailHelp\" placeholder=\"\">\n                                    </div>\n                                    <div class=\"form-group\">\n                                        <label for=\"exampleInputPassword1\">Password</label>\n                                        <input type=\"password\" class=\"form-control bg-light\" id=\"exampleInputPassword1\"\n                                            placeholder=\"\">\n                                    </div>\n                                    <div class=\"form-group d-flex justify-content-between\">\n                                        <label for=\"forgotPassword\">forgot password ?</label>\n                                        <button class=\"btn btn-sm btn-success px-2 shadow\"\n                                                [routerLink] = \"['/home']\" \n                                        >Login</button>\n                                    </div>\n                                </form>\n\n                            </div>\n                            <div class=\"col-md-2\">\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"container\" *ngIf=\"!isAdministrator\">\n                        <div class=\"row ml-5 mr-5 mt-4\">\n                            <div class=\"col-md-2\">\n                            </div>\n                            <div class=\"col-md-8 \">\n                                <form>\n                                    <div class=\"form-group\">\n                                        <label for=\"exampleInputEmail1\">Email</label>\n                                        <input type=\"email\" class=\"form-control bg-light\" id=\"exampleInputEmail1\"\n                                            aria-describedby=\"emailHelp\" placeholder=\"\">\n                                    </div>\n                                    <div class=\"form-group\">\n                                        <label for=\"exampleInputPassword1\">Password</label>\n                                        <input type=\"password\" class=\"form-control bg-light\" id=\"exampleInputPassword1\"\n                                            placeholder=\"\">\n                                    </div>\n                                    <div class=\"form-group d-flex justify-content-between\">\n                                            <label for=\"forgotPassword\">forgot password ?</label>\n                                            <button class=\"btn btn-sm btn-success px-2 shadow\"\n                                                    [routerLink] = \"['/home']\"\n                                            >Login</button>\n                                    </div>\n                                </form>\n\n                            </div>\n                            <div class=\"col-md-2\">\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"after-buttons mb-5\">\n                        <h6 class=\"text-center mt-3\">Don't have account yet ?\n                            <a  class=\"text-info\" (click)=\"signUp()\">Sign Up.</a>here.</h6>\n                    </div>\n\n                </div>\n            </div>\n            <div class=\"col-md-2\"></div>\n        </div>\n\n    </div>\n\n    </div>\n\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/adminsignup/adminsignup.component.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/adminsignup/adminsignup.component.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"menbersignupbg\">\n\n        <div class=\"container \">\n    \n            <div class=\"mb-3\">\n                <h3 class=\"p-3 text-white\">Welcome to SpectroCare</h3>\n            </div>\n    \n            <div class=\"row justify-content-center \">\n    \n                <div class=\"col-md-2\"></div>\n                <div class=\"col-md-8\">\n                    <div class=\"card\">\n    \n                        <h4 class=\"mt-4 mb-4\">Create your account</h4>\n    \n                        <div class=\"container\">\n                            <div class=\"row \">\n                                <div class=\"col-md-2\">\n                                </div>\n                                <div class=\"col-sm-8\">\n    \n                                   <div class=\"d-inline d-flex justify-content-around\">\n                                    <button class=\"btn btn-primary btn-sm btn-outline-dark shadow text-uppercase\"\n                                     (click)=\"callAdministrator()\">Administrator</button>\n                                    <button class=\"text-nowrap btn btn-sm btn-outline-dark shadow text-uppercase\"\n                                     [routerLink] = \"['/medicalpersonnelsignup']\" \n                                     >medical personnel</button>\n                                   </div>\n    \n                                </div>\n                                <div class=\"col-md-2\">\n                                </div> \n                            </div>\n                        </div>\n\n                            <div class=\"row ml-5 mr-5 mt-4\">\n                                <div class=\"col-md-2\">\n                                </div>\n                                <div class=\"col-md-8 \">\n                                    <form>\n                                        <div class=\"form-group\">\n                                            <label for=\"InputUserId\"  placement=\"right\" ngbTooltip=\"Tooltip on left\">User ID</label>\n                                            <input type=\"userId\" class=\"form-control bg-light\" id=\"InputUserId\"\n                                                aria-describedby=\"userIdHelp\" placeholder=\"\">\n                                        </div>\n                                        <div class=\"form-group\">\n                                            \n                                                <div class=\"row\">\n                                                        <div class=\"col-md-6\">\n                                                                <label for=\"exampleInputPassword1\">Last Name</label>\n                                                                <input type=\"password\" class=\"form-control bg-light\" id=\"exampleInputPassword1\"\n                                                                    placeholder=\"\">\n                                                        </div>\n                                                        <div class=\"col-md-6\">\n                                                                <label for=\"exampleInputPassword1\">First Name</label>\n                                                                <input type=\"password\" class=\"form-control bg-light\" id=\"exampleInputPassword1\"\n                                                                    placeholder=\"\">\n                                                        </div>\n                                                      </div>\n\n                                        </div>\n                                        <div class=\"form-group\">\n                                                <label for=\"exampleInputEmail1\">Email</label>\n                                                <input type=\"email\" class=\"form-control bg-light\" id=\"exampleInputEmail1\"\n                                                    aria-describedby=\"emailHelp\" placeholder=\"\">\n                                            </div>\n\n                                            <div class=\"form-group\">\n                                                    <label for=\"exampleInputEmail1\">Phone Number</label>\n                                                    <div class=\"input-group\">\n                                                            <div class=\"input-group-prepend\">\n                                                                   <select class=\"form-control bg-light m-0 \">\n                                                                            <option selected>+91</option>\n                                                                            <option value=\"1\">+92</option>\n                                                                            <option value=\"1\">+886</option>\n\n                                                                        </select>\n                                                                  </div>\n                                                                  <input type=\"text\" class=\"form-control\" aria-label=\"Text input with dropdown button\">\n                                                    </div>\n                                                    \n                                                </div>\n\n                                                <div class=\"form-group\">\n                                                        <label for=\"exampleInputPassword1\" class=\"mr-2\">Password</label>\n                                                        <img style=\"width: 1rem; height: 1rem;\" \n                                                             placement=\"right\" \n                                                             ngbTooltip=\"Must be atleast 8 characters\" \n                                                             src=\"assets/images/info.png\">\n                                                        <input type=\"password\" class=\"form-control bg-light\" id=\"exampleInputPassword1\"\n                                                            placeholder=\"\">\n                                                    </div>\n                                                    <div class=\"form-group\">\n                                                            <label for=\"exampleInputPassword1\" class=\"mr-2\">Confirm Password</label>\n                                                            <img style=\"width: 1rem; height: 1rem;\" \n                                                             placement=\"right\" \n                                                             ngbTooltip=\"Must be same a password\" \n                                                             src=\"assets/images/info.png\">\n                                                            <input type=\"password\" class=\"form-control bg-light\" id=\"exampleInputPassword1\"\n                                                                placeholder=\"\">\n                                                    </div>\n\n                                                    <div class=\"form-group\">\n                                                            <label for=\"exampleInputPassword1\">Hospital / Clinic Name</label>\n                                                            <input type=\"password\" class=\"form-control bg-light\" id=\"exampleInputPassword1\"\n                                                                        placeholder=\"\">\n                                                        </div>\n                                                        <div class=\"form-group\">\n                                                            <label for=\"exampleInputPassword1\" class=\"mr-2\">Registration No</label>\n                                                            <img style=\"width: 1rem; height: 1rem;\" \n                                                             placement=\"right\" \n                                                             ngbTooltip=\"The registration number cannot be changed after the account is registered. Please make sure you provide the correct registration number.\" \n                                                             src=\"assets/images/info.png\">\n                                                            <input type=\"password\" class=\"form-control bg-light\" id=\"exampleInputPassword1\"\n                                                                        placeholder=\"\">\n                                                        </div>\n                                                        <div class=\"form-group\">\n                                                            <label for=\"exampleInputPassword1\">Phone Number</label>\n                                                            <input type=\"password\" class=\"form-control bg-light\" id=\"exampleInputPassword1\"\n                                                                        placeholder=\"\">\n                                                        </div>\n                                                            \n                                                        <div class=\"form-group\">\n                                                            <label for=\"exampleInputPassword1\">Email</label>\n                                                            <input type=\"password\" class=\"form-control bg-light\" id=\"exampleInputPassword1\"\n                                                                        placeholder=\"\">\n                                                        </div>\n\n                                                        <div class=\"form-group\">\n                                                            <div class=\"row\">\n                                                                    <div class=\"col-md-12 mb-2\">\n                                                                            <div class=\"d-flex justify-content-between\">\n                                                                                    <label for=\"exampleInputPassword1\">Address</label>\n                                                                                    <a  href=\"#\" for=\"exampleInputPassword1\">\n                                                                                        Use current location\n                                                                                        <img src=\"assets/images/placeholder.png\">\n                                                                                    </a>\n                                                                                    \n                                                                            </div>\n                                                                    </div>\n\n                                                            </div>\n                                                           \n                                                           \n                                                            <input type=\"password\" class=\"form-control bg-light\" id=\"exampleInputPassword1\"\n                                                                        placeholder=\"\">\n                                                        </div>\n\n                                                        <div class=\"form-group\">\n                                                                <label for=\"exampleInputPassword1\">City</label>\n                                                                <input type=\"password\" class=\"form-control bg-light\" id=\"exampleInputPassword1\"\n                                                                            placeholder=\"\">\n                                                            </div>\n\n                                                            <div class=\"form-group\">\n                                            \n                                                                    <div class=\"row justify-content-between\">\n                                                                            <div class=\"col-6\">\n                                                                                    <label for=\"exampleInputPassword1\">State</label>\n                                                                                    <input type=\"password\" class=\"form-control bg-light\" id=\"exampleInputPassword1\"\n                                                                                        placeholder=\"\">\n                                                                            </div>\n                                                                            <div class=\"col-6\">\n                                                                                    <label for=\"exampleInputPassword1\">Postcode</label>\n                                                                                    <input type=\"password\" class=\"form-control bg-light\" id=\"exampleInputPassword1\"\n                                                                                        placeholder=\"\">\n                                                                            </div>\n                                                                          </div>\n                    \n                                                            </div>\n\n                                                            <div class=\"form-group\">                                \n                                                                    <label class=\"terms align-self-center \">\n                                                                        <input class=\"align-self-center mr-1\" type=\"checkbox\" >I accept the \n                                                                        <a class=\"anchortag\" style=\"color: #00b0ff\"> Terms and Conditions </a> & \n                                                                        <a class=\"anchortag\"  style=\"color: #00b0ff\"> Privacy Policy</a> \n                                                                    </label>                                                    \n                                                                </div>\n                                                        \n                                                                <div class=\"row justify-content-center\">\n                                                                    <a href=\"#\" type=\"button\" class=\"btn mt-2 mb-4 text-dark \">Create Account</a>\n                                                                </div>\n                        \n                                    </form>\n    \n                                </div>\n                                <div class=\"col-md-2\">\n                                </div>\n                            </div>\n                    </div>\n                </div>\n                <div class=\"col-md-2\"></div>\n            </div>\n        </div>\n    \n    </div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/header/header.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/header/header.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<nav class=\"navbar navbar-expand-lg navbar-light p-0\" style=\"background-color: #153f69;\">\n    <a class=\"navbar-brand text-uppercase text-white font-weight-bold ml-5\" href=\"#\">Spectrocare</a>\n    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNavDropdown\" aria-controls=\"navbarNavDropdown\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n      <span class=\"navbar-toggler-icon\"></span>\n    </button>\n    <div class=\"collapse navbar-collapse justify-content-end\" id=\"navbarNavDropdown\">\n      <ul class=\"navbar-nav p-0\">\n        <li class=\"nav-item p-0\">\n          <a class=\"nav-link text-uppercase\" href=\"#\">Home <span class=\"sr-only\">(current)</span></a>\n        </li>\n        <li class=\"nav-item p-0\">\n          <a class=\"nav-link text-uppercase\" href=\"#\">Patient</a>\n        </li>\n        <li class=\"nav-item p-0\">\n          <a class=\"nav-link text-uppercase\" href=\"#\">Admin Center</a>\n        </li>\n        <li class=\"nav-item p-0\">\n            <a class=\"nav-link\" href=\"#\">\n                <img style=\"width: 2rem; \" src=\"assets/images/user.png\">\n            </a>\n          </li>\n          <li class=\"nav-item p-0\">\n            <a class=\"nav-link\" href=\"#\">Sign Out</a>\n          </li>\n        \n      </ul>\n    </div>\n  </nav>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/home/home.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/home/home.component.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("    <div class=\"container\">\n                    <div class=\"row \">\n\n\n                    <div class=\"col-md-12 m-0 p-0 \" >\n                            <h3 class=\"text-center shadow p-3\">Hospital Information</h3>\n                            <img style=\"height: 30vh;\" class=\"img-fluid w-100 p-0\" src=\"assets/images/The-Health-Clinic.png\">\n                        <div class=\" d-flex\">\n                            <div class=\"col-md-6\">\n                                <div class=\"form-group\">\n                                    <label for=\"exampleInputEmail1\">Hospital / Clinic Name</label>\n                                    <input type=\"email\" class=\"form-control bg-light\" id=\"exampleInputEmail1\"\n                                        aria-describedby=\"emailHelp\" placeholder=\"\">\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"exampleInputPassword1\">Phone Number</label>\n                                    <input type=\"password\" class=\"form-control bg-light\" id=\"exampleInputPassword1\"\n                                        placeholder=\"\">\n                                </div>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <div class=\"form-group\">\n                                    <label for=\"exampleInputEmail1\">Registration No</label>\n                                    <input type=\"email\" class=\"form-control bg-light\" id=\"exampleInputEmail1\"\n                                        aria-describedby=\"emailHelp\" placeholder=\"\">\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"exampleInputPassword1\">Email</label>\n                                    <input type=\"password\" class=\"form-control bg-light\" id=\"exampleInputPassword1\"\n                                        placeholder=\"\">\n                                </div>\n                            </div>\n                        </div>\n            \n                        <div class=\"container\">\n            \n                       \n                        <div class=\"form-group\">\n                            <label for=\"exampleInputEmail1\">Email</label>\n                            <input type=\"email\" class=\"form-control bg-light\" id=\"exampleInputEmail1\"\n                                aria-describedby=\"emailHelp\" placeholder=\"\">\n                        </div>\n                        <div class=\"form-group\">\n                            <label for=\"exampleInputPassword1\">Password</label>\n                            <div class=\"d-flex\">\n                                    <input type=\"password\" class=\"form-control bg-light w-50 mr-5\" id=\"exampleInputPassword1\"\n                                    placeholder=\"\">\n                                    <a class=\"btn btn-dark\" href=\"#\">Change Password</a>\n                            </div>\n                            \n                        </div>\n                        <p>Last Update Date : 2019/10/16</p>\n                    </div>\n                        \n            \n                    </div>\n                </div>\n                </div>\n   \n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/medicalpersonnelsignup/medicalpersonnelsignup.component.html":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/medicalpersonnelsignup/medicalpersonnelsignup.component.html ***!
  \*******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"medicalpersonnelsignupbg\">\n\n        <div class=\"container \">\n    \n            <div class=\"mb-3\">\n                <h3 class=\"p-3 text-white\">Welcome to SpectroCare</h3>\n            </div>\n    \n            <div class=\"row justify-content-center \">\n    \n                <div class=\"col-md-2\"></div>\n                <div class=\"col-md-8\">\n                    <div class=\"card\">\n    \n                        <h4 class=\"mt-4 mb-4\">Create your account</h4>\n    \n                        <div class=\"container\">\n                            <div class=\"row \">\n                                <div class=\"col-md-2\">\n                                </div>\n                                <div class=\"col-sm-8\">\n    \n                                   <div class=\"d-inline d-flex justify-content-around\">\n                                    <button  class=\"btn btn-sm btn-outline-dark shadow text-uppercase\"\n                                    [routerLink] = \"['/adminsignup']\" >Administrator</button>\n\n                                    <button class=\"text-nowrap btn btn-sm btn-primary btn-outline-dark shadow text-uppercase\"\n                                    >medical personnel</button>\n                                   </div>\n    \n                                </div>\n                                <div class=\"col-md-2\">\n                                </div> \n                            </div>\n                        </div>\n                                <div class=\"row ml-5 mr-5 mt-4\">\n                                    <div class=\"col-md-2\">\n                                    </div>\n                                    <div class=\"col-md-8 \">\n                                        <form>\n                                            <div class=\"form-group\">\n                                                <label for=\"InputUserId\">User ID</label>\n                                                <input type=\"userId\" class=\"form-control bg-light\" id=\"InputUserId\"\n                                                    aria-describedby=\"userIdHelp\" placeholder=\"\">\n                                            </div>\n\n                                            <div class=\"form-group\">\n                                                \n                                                    <div class=\"row\">\n                                                            <div class=\"col-md-6\">\n                                                                    <label for=\"exampleInputPassword1\">Identity</label>\n                                                                    <select class=\"form-control bg-light m-0 \">\n                                                                            <option selected>Doctor</option>\n                                                                            <option value=\"1\">Nurse</option>\n                                                                            <option value=\"1\">List Item 1</option>\n\n                                                                        </select>\n                                                            </div>\n                                                            <div class=\"col-md-6\">\n                                                                    <label for=\"exampleInputPassword1\">Gender</label>\n                                                                    <select class=\"form-control bg-light m-0 \">\n                                                                            <option selected>Male</option>\n                                                                            <option value=\"1\">Female</option>\n                                                                            \n                                                                        </select>\n                                                            </div>\n                                                          </div>\n    \n                                            </div>\n\n                                            <div class=\"form-group\">\n                                                \n                                                    <div class=\"row\">\n                                                            <div class=\"col-md-6\">\n                                                                    <label for=\"exampleInputPassword1\">Last Name</label>\n                                                                    <input type=\"password\" class=\"form-control bg-light\" id=\"exampleInputPassword1\"\n                                                                        placeholder=\"\">\n                                                            </div>\n                                                            <div class=\"col-md-6\">\n                                                                    <label for=\"exampleInputPassword1\">First Name</label>\n                                                                    <input type=\"password\" class=\"form-control bg-light\" id=\"exampleInputPassword1\"\n                                                                        placeholder=\"\">\n                                                            </div>\n                                                          </div>\n    \n                                            </div>\n                                            <div class=\"form-group\">\n                                                    <label for=\"exampleInputEmail1\">Email</label>\n                                                    <input type=\"email\" class=\"form-control bg-light\" id=\"exampleInputEmail1\"\n                                                        aria-describedby=\"emailHelp\" placeholder=\"\">\n                                                </div>\n    \n                                                <div class=\"form-group\">\n                                                        <label for=\"exampleInputEmail1\">Phone Number</label>\n                                                        <div class=\"input-group\">\n                                                                <div class=\"input-group-prepend\">\n                                                                       <select class=\"form-control bg-light m-0 \">\n                                                                                <option selected>+91</option>\n                                                                                <option value=\"1\">+92</option>\n                                                                                <option value=\"1\">+886</option>\n    \n                                                                            </select>\n                                                                </div>\n                                                                      <input type=\"text\" class=\"form-control\" aria-label=\"Text input with dropdown button\">\n                                                        </div>\n                                                        \n                                                    </div>\n    \n                                                    <div class=\"form-group\">\n                                                            <label for=\"exampleInputPassword1\" class=\"mr-2\">Password</label>\n                                                            <img style=\"width: 1rem; height: 1rem;\" \n                                                             placement=\"right\" \n                                                             ngbTooltip=\"Must be atleast 8 characters\" \n                                                             src=\"../../../assets/images/info.png\">\n                                                            <input tpye=\"password\" class=\"form-control bg-light\" id=\"exampleInputPassword1\"\n                                                                placeholder=\"\">\n                                                        </div>\n                                                        <div class=\"form-group\">\n                                                                <label for=\"exampleInputPassword1\" class=\"mr-2\">Confirm Password</label>\n                                                                <img style=\"width: 1rem; height: 1rem;\" \n                                                             placement=\"right\" \n                                                             ngbTooltip=\"Must be same a password\" \n                                                             src=\"../../../assets/images/info.png\">\n                                                                <input type=\"password\" class=\"form-control bg-light\" id=\"exampleInputPassword1\"\n                                                                    placeholder=\"\">\n                                                        </div>\n\n                                                        <div class=\"form-group\">\n                                                            <label for=\"exampleInputPassword1\" class=\"mr-2\">Hospital Registration No</label>\n                                                            <img style=\"width: 1rem; height: 1rem;\" \n                                                             \n                                                            placement=\"right\" \n                                                             ngbTooltip=\"Please enter the registration number of your hospital/clinic. If the registration number does not exist, please contact the administrator.\" \n                                                             src=\"../../../assets/images/info.png\">\n                                                            <input type=\"password\" class=\"form-control bg-light\" id=\"exampleInputPassword1\"\n                                                                    placeholder=\"\">\n                                                            \n                                                        </div>\n    \n                                                        <div class=\"form-group\">\n                                                                <label for=\"exampleInputPassword1\">Department</label>\n                                                                <input type=\"password\" class=\"form-control bg-light\" id=\"exampleInputPassword1\"\n                                                                            placeholder=\"\">\n                                                            </div>\n                                                            \n                                                                \n                                                                                                     \n                                                               \n                                                                                                       <div class=\"form-group\">                                \n                                                                        <label class=\"terms align-self-center \">\n                                                                            <input class=\"align-self-center mr-1\" type=\"checkbox\" >I accept the \n                                                                            <a class=\"anchortag\" style=\"color: #00b0ff\"> Terms and Conditions </a> & \n                                                                            <a class=\"anchortag\"  style=\"color: #00b0ff\"> Privacy Policy</a> \n                                                                        </label>                                                    \n                                                                    </div>\n                                                            \n                                                                    <div class=\"row justify-content-center\">\n                                                                        <a href=\"#\" type=\"button\" class=\"btn mt-2 mb-4 text-dark \">Create Account</a>\n                                                                    </div>\n                            \n                                        </form>\n        \n                                    </div>\n                                    <div class=\"col-md-2\">\n                                    </div>\n                                </div>\n                           \n                    </div>\n                </div>\n                <div class=\"col-md-2\"></div>\n            </div>\n        </div>\n    \n    </div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/sidebar/sidebar.component.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/sidebar/sidebar.component.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<nav class=\"navbar align-items-center m-0 p-0 \" \n     style=\"width: 100%; height: 100vh; min-width: 200px; background-color: #27384a;\" \n     id=\"sidebar-wrapper\" >\n  \n<ul class=\"nav  flex-column ml-4 align-self-start\" >\n    <li class=\"nav-item\">\n      <a class=\"nav-link btn btn-light btn-outline-dark\" href=\"#\">Profile</a>\n    </li>\n    <li class=\"nav-item\">\n      <a class=\"nav-link btn btn-light btn-outline-dark\" href=\"#\">Manage User</a>\n    </li>\n    <li class=\"nav-item\">\n      <a class=\"nav-link btn btn-light btn-outline-dark\" href=\"#\">Report</a>\n    </li>\n    <li class=\"nav-item\">\n      <a class=\"nav-link btn btn-light btn-outline-dark\" href=\"#\">Bill & Payment</a>\n    </li>\n    \n  </ul>\n\n  </nav>\n");

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _components_adminsignin_adminsignin_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/adminsignin/adminsignin.component */ "./src/app/components/adminsignin/adminsignin.component.ts");
/* harmony import */ var _components_adminsignup_adminsignup_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/adminsignup/adminsignup.component */ "./src/app/components/adminsignup/adminsignup.component.ts");
/* harmony import */ var _components_medicalpersonnelsignup_medicalpersonnelsignup_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/medicalpersonnelsignup/medicalpersonnelsignup.component */ "./src/app/components/medicalpersonnelsignup/medicalpersonnelsignup.component.ts");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/home/home.component */ "./src/app/components/home/home.component.ts");







const routes = [
    { path: "adminsignin", component: _components_adminsignin_adminsignin_component__WEBPACK_IMPORTED_MODULE_3__["AdminsigninComponent"] },
    { path: "", redirectTo: "adminsignin", pathMatch: "full" },
    { path: "adminsignup", component: _components_adminsignup_adminsignup_component__WEBPACK_IMPORTED_MODULE_4__["AdminsignupComponent"] },
    { path: "medicalpersonnelsignup", component: _components_medicalpersonnelsignup_medicalpersonnelsignup_component__WEBPACK_IMPORTED_MODULE_5__["MedicalpersonnelsignupComponent"] },
    { path: "home", component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_6__["HomeComponent"] }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AppRoutingModule);



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("*{\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxTQUFTO0lBQ1QsVUFBVTtBQUNkIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIqe1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxufSJdfQ== */");

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");



let AppComponent = class AppComponent {
    constructor(router) {
        this.router = router;
        this.title = 'spectrocarev4web';
    }
    isValid() {
        if ((this.router.url != "/") && (this.router.url != "/adminsignin") && (this.router.url != "/adminsignup") &&
            (this.router.url != "/medicalpersonnelsignup")) {
            return true;
        }
        else {
            return false;
        }
    }
};
AppComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")).default]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_adminsignin_adminsignin_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/adminsignin/adminsignin.component */ "./src/app/components/adminsignin/adminsignin.component.ts");
/* harmony import */ var _components_adminsignup_adminsignup_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/adminsignup/adminsignup.component */ "./src/app/components/adminsignup/adminsignup.component.ts");
/* harmony import */ var _components_medicalpersonnelsignup_medicalpersonnelsignup_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/medicalpersonnelsignup/medicalpersonnelsignup.component */ "./src/app/components/medicalpersonnelsignup/medicalpersonnelsignup.component.ts");
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/header/header.component */ "./src/app/components/header/header.component.ts");
/* harmony import */ var _components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/sidebar/sidebar.component */ "./src/app/components/sidebar/sidebar.component.ts");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/home/home.component */ "./src/app/components/home/home.component.ts");












let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            _components_adminsignin_adminsignin_component__WEBPACK_IMPORTED_MODULE_6__["AdminsigninComponent"],
            _components_adminsignup_adminsignup_component__WEBPACK_IMPORTED_MODULE_7__["AdminsignupComponent"],
            _components_medicalpersonnelsignup_medicalpersonnelsignup_component__WEBPACK_IMPORTED_MODULE_8__["MedicalpersonnelsignupComponent"],
            _components_header_header_component__WEBPACK_IMPORTED_MODULE_9__["HeaderComponent"],
            _components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_10__["SidebarComponent"],
            _components_home_home_component__WEBPACK_IMPORTED_MODULE_11__["HomeComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModule"]
        ],
        providers: [],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/components/adminsignin/adminsignin.component.css":
/*!******************************************************************!*\
  !*** ./src/app/components/adminsignin/adminsignin.component.css ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ul {\r\n    display: flex;\r\n    margin: 0;\r\n    padding: 0;    \r\n}\r\n\r\nimg{\r\n    width: 2rem;\r\n    height: 2rem;   \r\n}\r\n\r\nform {\r\n    text-align: left\r\n}\r\n\r\nh3{\r\n    display: flex;\r\n    justify-content: center;\r\n}\r\n\r\nh4{\r\n    display: flex;\r\n    justify-content: center;\r\n}\r\n\r\n.menbersigninbg{\r\n    height: 100vh;\r\n    background-color: #153f69;\r\n   \r\n    \r\n}\r\n\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9hZG1pbnNpZ25pbi9hZG1pbnNpZ25pbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksYUFBYTtJQUNiLFNBQVM7SUFDVCxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtBQUNoQjs7QUFDQTtJQUNJO0FBQ0o7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLGFBQWE7SUFDYix5QkFBeUI7OztBQUc3QiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvYWRtaW5zaWduaW4vYWRtaW5zaWduaW4uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInVsIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAwOyAgICBcclxufVxyXG5cclxuaW1ne1xyXG4gICAgd2lkdGg6IDJyZW07XHJcbiAgICBoZWlnaHQ6IDJyZW07ICAgXHJcbn1cclxuZm9ybSB7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0XHJcbn1cclxuXHJcbmgze1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcblxyXG5oNHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLm1lbmJlcnNpZ25pbmJne1xyXG4gICAgaGVpZ2h0OiAxMDB2aDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxNTNmNjk7XHJcbiAgIFxyXG4gICAgXHJcbn1cclxuXHJcbiJdfQ== */");

/***/ }),

/***/ "./src/app/components/adminsignin/adminsignin.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/components/adminsignin/adminsignin.component.ts ***!
  \*****************************************************************/
/*! exports provided: AdminsigninComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminsigninComponent", function() { return AdminsigninComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");



let AdminsigninComponent = class AdminsigninComponent {
    constructor(router) {
        this.router = router;
        this.title = 'Administrator';
        this.isAdministrator = true;
    }
    ngOnInit() {
    }
    callMedicalPersonnel() {
        this.isAdministrator = false;
        this.title = 'Medical Personnel';
    }
    callAdministrator() {
        this.isAdministrator = true;
        this.title = 'Administrator';
    }
    signUp() {
        if (this.isAdministrator === true) {
            this.router.navigateByUrl('/adminsignup');
        }
        else {
            this.router.navigateByUrl('/medicalpersonnelsignup');
        }
    }
};
AdminsigninComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
AdminsigninComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-adminsignin',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./adminsignin.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/adminsignin/adminsignin.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./adminsignin.component.css */ "./src/app/components/adminsignin/adminsignin.component.css")).default]
    })
], AdminsigninComponent);



/***/ }),

/***/ "./src/app/components/adminsignup/adminsignup.component.css":
/*!******************************************************************!*\
  !*** ./src/app/components/adminsignup/adminsignup.component.css ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ul {\r\n    display: flex;\r\n    margin: 0;\r\n    padding: 0;    \r\n}\r\n\r\nimg{\r\n    width: 2rem;\r\n    height: 2rem;   \r\n}\r\n\r\nform {\r\n    text-align: left\r\n}\r\n\r\nh3{\r\n    display: flex;\r\n    justify-content: center;\r\n}\r\n\r\nh4{\r\n    display: flex;\r\n    justify-content: center;\r\n}\r\n\r\n.terms {\r\n    font-size: 0.99rem\r\n}\r\n\r\n.menbersignupbg{\r\n    height: 230vh;\r\n    background-color: #153f69;\r\n   \r\n    \r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9hZG1pbnNpZ251cC9hZG1pbnNpZ251cC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksYUFBYTtJQUNiLFNBQVM7SUFDVCxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtBQUNoQjs7QUFDQTtJQUNJO0FBQ0o7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJO0FBQ0o7O0FBRUE7SUFDSSxhQUFhO0lBQ2IseUJBQXlCOzs7QUFHN0IiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2FkbWluc2lnbnVwL2FkbWluc2lnbnVwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ1bCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMDsgICAgXHJcbn1cclxuXHJcbmltZ3tcclxuICAgIHdpZHRoOiAycmVtO1xyXG4gICAgaGVpZ2h0OiAycmVtOyAgIFxyXG59XHJcbmZvcm0ge1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdFxyXG59XHJcblxyXG5oM3tcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuaDR7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi50ZXJtcyB7XHJcbiAgICBmb250LXNpemU6IDAuOTlyZW1cclxufVxyXG5cclxuLm1lbmJlcnNpZ251cGJne1xyXG4gICAgaGVpZ2h0OiAyMzB2aDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxNTNmNjk7XHJcbiAgIFxyXG4gICAgXHJcbn1cclxuIl19 */");

/***/ }),

/***/ "./src/app/components/adminsignup/adminsignup.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/components/adminsignup/adminsignup.component.ts ***!
  \*****************************************************************/
/*! exports provided: AdminsignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminsignupComponent", function() { return AdminsignupComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let AdminsignupComponent = class AdminsignupComponent {
    constructor() {
        this.title = 'Administrator';
        this.isAdministrator = true;
    }
    ngOnInit() {
    }
    callMedicalPersonnel() {
        this.isAdministrator = false;
        this.title = 'Medical Personnel';
    }
    callAdministrator() {
        this.isAdministrator = true;
        this.title = 'Administrator';
    }
};
AdminsignupComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-adminsignup',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./adminsignup.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/adminsignup/adminsignup.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./adminsignup.component.css */ "./src/app/components/adminsignup/adminsignup.component.css")).default]
    })
], AdminsignupComponent);



/***/ }),

/***/ "./src/app/components/header/header.component.css":
/*!********************************************************!*\
  !*** ./src/app/components/header/header.component.css ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ul li a{\r\n    color: white;\r\n    padding: 10px;\r\n    margin: 0;\r\n}\r\nul li a:hover{\r\n    color:darkorange;\r\n  }  \r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLFNBQVM7QUFDYjtBQUNBO0lBQ0ksZ0JBQWdCO0VBQ2xCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ1bCBsaSBhe1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIG1hcmdpbjogMDtcclxufVxyXG51bCBsaSBhOmhvdmVye1xyXG4gICAgY29sb3I6ZGFya29yYW5nZTtcclxuICB9ICAiXX0= */");

/***/ }),

/***/ "./src/app/components/header/header.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/header/header.component.ts ***!
  \*******************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let HeaderComponent = class HeaderComponent {
    constructor() { }
    ngOnInit() {
    }
};
HeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-header',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./header.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/header/header.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./header.component.css */ "./src/app/components/header/header.component.css")).default]
    })
], HeaderComponent);



/***/ }),

/***/ "./src/app/components/home/home.component.css":
/*!****************************************************!*\
  !*** ./src/app/components/home/home.component.css ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("input{\r\n    box-shadow: 0 0 5px darkslateblue;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGlDQUFpQztBQUNyQyIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvaG9tZS9ob21lLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpbnB1dHtcclxuICAgIGJveC1zaGFkb3c6IDAgMCA1cHggZGFya3NsYXRlYmx1ZTtcclxufSJdfQ== */");

/***/ }),

/***/ "./src/app/components/home/home.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/home/home.component.ts ***!
  \***************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let HomeComponent = class HomeComponent {
    constructor() { }
    ngOnInit() {
    }
};
HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-home',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./home.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/home/home.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./home.component.css */ "./src/app/components/home/home.component.css")).default]
    })
], HomeComponent);



/***/ }),

/***/ "./src/app/components/medicalpersonnelsignup/medicalpersonnelsignup.component.css":
/*!****************************************************************************************!*\
  !*** ./src/app/components/medicalpersonnelsignup/medicalpersonnelsignup.component.css ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ul {\r\n    display: flex;\r\n    margin: 0;\r\n    padding: 0;    \r\n}\r\n\r\nimg{\r\n    width: 2rem;\r\n    height: 2rem;   \r\n}\r\n\r\nform {\r\n    text-align: left\r\n}\r\n\r\nh3{\r\n    display: flex;\r\n    justify-content: center;\r\n}\r\n\r\nh4{\r\n    display: flex;\r\n    justify-content: center;\r\n}\r\n\r\n.terms {\r\n    font-size: 0.99rem\r\n}\r\n\r\n.medicalpersonnelsignupbg{\r\n    height: 180vh;\r\n    background-color: #153f69;\r\n   \r\n    \r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9tZWRpY2FscGVyc29ubmVsc2lnbnVwL21lZGljYWxwZXJzb25uZWxzaWdudXAuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGFBQWE7SUFDYixTQUFTO0lBQ1QsVUFBVTtBQUNkOztBQUVBO0lBQ0ksV0FBVztJQUNYLFlBQVk7QUFDaEI7O0FBQ0E7SUFDSTtBQUNKOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLGFBQWE7SUFDYix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSTtBQUNKOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHlCQUF5Qjs7O0FBRzdCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9tZWRpY2FscGVyc29ubmVsc2lnbnVwL21lZGljYWxwZXJzb25uZWxzaWdudXAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInVsIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAwOyAgICBcclxufVxyXG5cclxuaW1ne1xyXG4gICAgd2lkdGg6IDJyZW07XHJcbiAgICBoZWlnaHQ6IDJyZW07ICAgXHJcbn1cclxuZm9ybSB7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0XHJcbn1cclxuXHJcbmgze1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcblxyXG5oNHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLnRlcm1zIHtcclxuICAgIGZvbnQtc2l6ZTogMC45OXJlbVxyXG59XHJcblxyXG4ubWVkaWNhbHBlcnNvbm5lbHNpZ251cGJne1xyXG4gICAgaGVpZ2h0OiAxODB2aDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxNTNmNjk7XHJcbiAgIFxyXG4gICAgXHJcbn0iXX0= */");

/***/ }),

/***/ "./src/app/components/medicalpersonnelsignup/medicalpersonnelsignup.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/components/medicalpersonnelsignup/medicalpersonnelsignup.component.ts ***!
  \***************************************************************************************/
/*! exports provided: MedicalpersonnelsignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MedicalpersonnelsignupComponent", function() { return MedicalpersonnelsignupComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let MedicalpersonnelsignupComponent = class MedicalpersonnelsignupComponent {
    constructor() {
        this.title = 'Administrator';
        this.isAdministrator = true;
    }
    ngOnInit() {
    }
    callMedicalPersonnel() {
        this.isAdministrator = false;
        this.title = 'Medical Personnel';
    }
    callAdministrator() {
        this.isAdministrator = true;
        this.title = 'Administrator';
    }
};
MedicalpersonnelsignupComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-medicalpersonnelsignup',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./medicalpersonnelsignup.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/medicalpersonnelsignup/medicalpersonnelsignup.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./medicalpersonnelsignup.component.css */ "./src/app/components/medicalpersonnelsignup/medicalpersonnelsignup.component.css")).default]
    })
], MedicalpersonnelsignupComponent);



/***/ }),

/***/ "./src/app/components/sidebar/sidebar.component.css":
/*!**********************************************************!*\
  !*** ./src/app/components/sidebar/sidebar.component.css ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("li{\r\n  margin-bottom: 2px;\r\n  \r\n  margin: 10px;\r\n}\r\n\r\n\r\n\r\n  /* Change the link color on hover */\r\n\r\n\r\n\r\n  li a:hover {\r\n    background-color: darkseagreen;\r\n    color: black;\r\n    box-shadow: 0 0 5px brown;\r\n  }  \r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFrQjs7RUFFbEIsWUFBWTtBQUNkOzs7O0VBSUUsbUNBQW1DOzs7O0VBQ25DO0lBQ0UsOEJBQThCO0lBQzlCLFlBQVk7SUFDWix5QkFBeUI7RUFDM0IiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsibGl7XHJcbiAgbWFyZ2luLWJvdHRvbTogMnB4O1xyXG4gIFxyXG4gIG1hcmdpbjogMTBweDtcclxufVxyXG5cclxuXHJcblxyXG4gIC8qIENoYW5nZSB0aGUgbGluayBjb2xvciBvbiBob3ZlciAqL1xyXG4gIGxpIGE6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZGFya3NlYWdyZWVuO1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDVweCBicm93bjtcclxuICB9ICAiXX0= */");

/***/ }),

/***/ "./src/app/components/sidebar/sidebar.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/components/sidebar/sidebar.component.ts ***!
  \*********************************************************/
/*! exports provided: SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let SidebarComponent = class SidebarComponent {
    constructor() { }
    ngOnInit() {
    }
};
SidebarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-sidebar',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./sidebar.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/sidebar/sidebar.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./sidebar.component.css */ "./src/app/components/sidebar/sidebar.component.css")).default]
    })
], SidebarComponent);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Spectrum\Spectrum4\WebApplication\spectrocarev4web\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map