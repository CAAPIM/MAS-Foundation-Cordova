/**
 * Copyright (c) 2016 CA, Inc. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 */

var MASPluginUtils = require("./MASPluginUtils"),
    MASPluginConstants = require("./MASPluginConstants");
 
var MASPluginApplication = function() {

    this.MASAuthenticationStatus = {
        /**
         *  MASAuthenticationStatusNotLoggedIn represents that the app has not been authenticated.
         */    
        MASAuthenticationStatusNotLoggedIn: -1,
        /**
         *  MASAuthenticationStatusLoginWithUser represents that the app has been authenticated with user.
         */
        MASAuthenticationStatusLoginWithUser: 0,
        /**
         *  MASAuthenticationStatusLoginAnonymously represents that the app has been authenticated with client credentials.
         */ 
        MASAuthenticationStatusLoginAnonymously: 1
    },

    /**
    * Retrieves all the enterprise apps in form of JSON from the server. It includes both native and web apps.
    */
    this.retrieveEnterpriseApps = function(successHandler, errorHandler) {
            return Cordova.exec(successHandler, errorHandler, "MASPluginApplication", "retrieveEnterpriseApps", []);
    };

    /**
    * Launches the selected Enterprise App
    */
    this.launchApp = function(successHandler, errorHandler, appId) {
            document.addEventListener("backbutton", MASPluginUtils.onBackKeyPressEvent, false);
            return Cordova.exec(successHandler, errorHandler, "MASPluginApplication", "launchApp", [appId]);
    };

    /**
    * Initializes the Enterprise Browser window and populates it with the native and web apps registered in the server.
    */
    this.initEnterpriseBrowser = function(successHandler, errorHandler) {
            var result = Cordova.exec(function(result) {
                MASPluginUtils.MASPopupUI(MASPluginConstants.MASEnterpriseBrowserPage, function() {}, function() {
                    displayApps(result);
                    successHandler(true);
                });
            }, errorHandler, "MASPluginApplication", "retrieveEnterpriseApps", []);
            return result;
    };
}

module.exports = MASPluginApplication;