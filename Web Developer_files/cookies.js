var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Cookies = WebDeveloper.Cookies || {};

// Deletes all the cookies for the current domain
WebDeveloper.Cookies.deleteDomainCookies = function(cookies)
{
  var cookiesLength = cookies.length;

  // If no domain cookies were found
  if(cookiesLength === 0)
  {
    WebDeveloper.Common.displayNotification("deleteDomainCookiesNoneFound");
  }
  else
  {
    var message = null;

    // If one domain cookie was found
    if(cookiesLength == 1)
    {
      message = WebDeveloper.Locales.getString("deleteDomainCookiesSingleConfirmation");
    }
    else
    {
      message = WebDeveloper.Locales.getFormattedString("deleteDomainCookiesMultipleConfirmation", [cookiesLength]);
    }

    // If the deletion is confirmed
    WebDeveloper.Overlay.displayConfirmation(WebDeveloper.Locales.getString("deleteDomainCookies"), message, WebDeveloper.Locales.getString("delete"), "trash", function()
    {
      WebDeveloper.Overlay.closeConfirmation();

      // Loop through the domain cookies
      for(var i = 0; i < cookiesLength; i++)
      {
        WebDeveloper.Cookies.deleteCookie(cookies[i]);
      }

      // If one domain cookie was deleted
      if(cookiesLength == 1)
      {
        WebDeveloper.Common.displayNotification("deleteDomainCookiesSingleResult");
      }
      else
      {
        WebDeveloper.Common.displayNotification("deleteDomainCookiesMultipleResult", [cookiesLength]);
      }
    });
  }
};

// Deletes all the cookies for the current path
WebDeveloper.Cookies.deletePathCookies = function(cookies)
{
  var cookiesLength = cookies.length;

  // If no path cookies were found
  if(cookiesLength === 0)
  {
    WebDeveloper.Common.displayNotification("deletePathCookiesNoneFound");
  }
  else
  {
    var message = null;

    // If one path cookie was found
    if(cookiesLength == 1)
    {
      message = WebDeveloper.Locales.getString("deletePathCookiesSingleConfirmation");
    }
    else
    {
      message = WebDeveloper.Locales.getFormattedString("deletePathCookiesMultipleConfirmation", [cookiesLength]);
    }

    // If the deletion is confirmed
    WebDeveloper.Overlay.displayConfirmation(WebDeveloper.Locales.getString("deletePathCookies"), message, WebDeveloper.Locales.getString("delete"), "trash", function()
    {
      WebDeveloper.Overlay.closeConfirmation();

      // Loop through the path cookies
      for(var i = 0; i < cookiesLength; i++)
      {
        WebDeveloper.Cookies.deleteCookie(cookies[i]);
      }

      // If one path cookie was deleted
      if(cookiesLength == 1)
      {
        WebDeveloper.Common.displayNotification("deletePathCookiesSingleResult");
      }
      else
      {
        WebDeveloper.Common.displayNotification("deletePathCookiesMultipleResult", [cookiesLength]);
      }
    });
  }
};

// Deletes all session cookies
WebDeveloper.Cookies.deleteSessionCookies = function(allCookies)
{
  var cookie        = null;
  var cookies       = [];
  var cookiesLength = null;

  // Loop through the cookies
  for(var i = 0, l = allCookies.length; i < l; i++)
  {
    cookie = allCookies[i];

    // If this is a session cookie
    if(cookie.session)
    {
      cookies.push(cookie);
    }
  }

  cookiesLength = cookies.length;

  // If no session cookies were found
  if(cookiesLength === 0)
  {
    WebDeveloper.Common.displayNotification("deleteSessionCookiesNoneFound");
  }
  else
  {
    var message = null;

    // If one session cookie was found
    if(cookiesLength == 1)
    {
      message = WebDeveloper.Locales.getString("deleteSessionCookiesSingleConfirmation");
    }
    else
    {
      message = WebDeveloper.Locales.getFormattedString("deleteSessionCookiesMultipleConfirmation", [cookiesLength]);
    }

    // If the deletion is confirmed
    WebDeveloper.Overlay.displayConfirmation(WebDeveloper.Locales.getString("deleteSessionCookies"), message, WebDeveloper.Locales.getString("delete"), "trash", function()
    {
      WebDeveloper.Overlay.closeConfirmation();

      // Loop through the session cookies
      for(i = 0; i < cookiesLength; i++)
      {
        WebDeveloper.Cookies.deleteCookie(cookies[i]);
      }

      // If one session cookie was deleted
      if(cookiesLength == 1)
      {
        WebDeveloper.Common.displayNotification("deleteSessionCookiesSingleResult");
      }
      else
      {
        WebDeveloper.Common.displayNotification("deleteSessionCookiesMultipleResult", [cookiesLength]);
      }
    });
  }
};

// Returns tomorrow's date as a string
WebDeveloper.Cookies.getDateTomorrow = function()
{
  var date = new Date();

  date.setDate(date.getDate() + 1);

  return date.toUTCString();
};

var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Cookies = WebDeveloper.Cookies || {};

// Adds a cookie
WebDeveloper.Cookies.addCookie = function(cookie)
{
  var path             = cookie.path.trim();
  var cookieString     = cookie.name.trim() + "=" + cookie.value.trim() + ";path=" + path + ";";
  var cookiePreference = WebDeveloper.Preferences.getIntegerPreference("network.cookie.cookieBehavior");
  var host             = cookie.host.trim();
  var scheme           = "http://";
  var uri              = null;

  // If the host is a domain
  if(host.charAt(0) == ".")
  {
    cookieString += "domain=" + host + ";";
    host          = host.substring(1);
  }

  // If this is not a session cookie
  if(!cookie.session)
  {
    cookieString += "expires=" + new Date(cookie.expires.trim()).toUTCString() + ";";
  }

  // If the cookie is secure
  if(cookie.secure)
  {
    cookieString += "secure;";
    scheme        = "https://";
  }

  uri = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI(scheme + host + path, null, null);

  // If the cookie preference is not allowing all cookies
  if(cookiePreference !== 0)
  {
    WebDeveloper.Preferences.setIntegerPreference("network.cookie.cookieBehavior", 0);
  }

  Components.classes["@mozilla.org/cookieService;1"].getService().QueryInterface(Components.interfaces.nsICookieService).setCookieString(uri, null, cookieString.substring(0, cookieString.length - 1), null);

  // If the cookie preference was not allowing all cookies
  if(cookiePreference !== 0)
  {
    WebDeveloper.Preferences.setIntegerPreference("network.cookie.cookieBehavior", cookiePreference);
  }
};

// Returns true if you can edit a local cookie
WebDeveloper.Cookies.canEditLocalCookie = function()
{
  return true;
};

// Deletes a cookie
WebDeveloper.Cookies.deleteCookie = function(cookie)
{
  // Try to delete the cookie without origin attributes
  try
  {
    Components.classes["@mozilla.org/cookiemanager;1"].getService(Components.interfaces.nsICookieManager2).remove(cookie.host, cookie.name, cookie.path, false);
  }
  catch(exception)
  {
    Components.classes["@mozilla.org/cookiemanager;1"].getService(Components.interfaces.nsICookieManager2).remove(cookie.host, cookie.name, cookie.path, false, cookie.originAttributes);
  }
};

// Returns all cookies
WebDeveloper.Cookies.getAllCookies = function()
{
  var allCookies        = [];
  var cookie            = null;
  var cookieEnumeration = Components.classes["@mozilla.org/cookiemanager;1"].getService(Components.interfaces.nsICookieManager2).enumerator;
  var cookieObject      = null;

  // Loop through the cookies
  while(cookieEnumeration.hasMoreElements())
  {
    cookie       = {};
    cookieObject = cookieEnumeration.getNext().QueryInterface(Components.interfaces.nsICookie2);

    cookie.expires          = cookieObject.expires;
    cookie.host             = cookieObject.host;
    cookie.httpOnly         = cookieObject.isHttpOnly;
    cookie.name             = cookieObject.name;
    cookie.originAttributes = cookieObject.originAttributes;
    cookie.path             = cookieObject.path;
    cookie.secure           = cookieObject.isSecure;
    cookie.session          = cookieObject.isSession;
    cookie.value            = cookieObject.value;

    allCookies.push(cookie);
  }

  return allCookies;
};
