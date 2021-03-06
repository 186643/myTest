var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Generated              = WebDeveloper.Generated || {};
WebDeveloper.Generated.cookie       = null;
WebDeveloper.Generated.storedLocale = null;

// Handles the cookie session setting being changed
WebDeveloper.Generated.changeSession = function()
{
  var session = $(this);

  // If the session setting is checked
  if(session.prop("checked"))
  {
    $("#cookie-expires").val("").prop("disabled", true);
  }
  else
  {
    $("#cookie-expires").val(WebDeveloper.Cookies.getDateTomorrow()).prop("disabled", false);
  }
};

// Deletes a cookie
WebDeveloper.Generated.deleteCookie = function()
{
  var alert  = document.createElement("div");
  var cookie = WebDeveloper.Generated.populateCookieFromElement(WebDeveloper.Generated.cookie);

  alert.appendChild(document.createTextNode(WebDeveloper.Generated.storedLocale.cookieDeleted.replace("%S", "'" + cookie.name + "'")));
  alert.setAttribute("class", "alert alert-success");

  WebDeveloper.Cookies.deleteCookie(cookie);

  WebDeveloper.Generated.cookie.slideUp(WebDeveloper.Generated.animationSpeed, function() { WebDeveloper.Generated.cookie.remove(); });
  $("#delete-dialog").modal("hide");
  WebDeveloper.Generated.cookie.before(alert);
};

// Displays a cookie
WebDeveloper.Generated.displayCookie = function(cookie, container, cookiesCounter, locale)
{
  var childElement        = document.createElement("th");
  var cookieElement       = document.createElement("div");
  var cookieExpires       = cookie.expires;
  var cookieName          = cookie.name;
  var element             = document.createElement("tr");
  var expiresDescription  = locale.atEndOfSession;
  var httpOnlyDescription = locale.no;
  var secureDescription   = locale.no;
  var separator           = document.createElement("div");
  var table               = document.createElement("table");
  var tableContainer      = document.createElement("thead");

  // If the cookie has an expiration
  if(cookieExpires)
  {
    expiresDescription = new Date(cookieExpires * 1000).toUTCString();
  }

  // If the cookie is HttpOnly
  if(cookie.httpOnly)
  {
    httpOnlyDescription = locale.yes;
  }

  // If the cookie is secure
  if(cookie.secure)
  {
    secureDescription = locale.yes;
  }

  cookieElement.setAttribute("class", "web-developer-cookie");
  cookieElement.setAttribute("id", "cookie-" + cookiesCounter);

  childElement.appendChild(document.createTextNode(locale.property));
  element.appendChild(childElement);

  childElement = document.createElement("th");

  childElement.appendChild(document.createTextNode(locale.value));
  element.appendChild(childElement);
  tableContainer.appendChild(element);

  childElement   = document.createElement("td");
  element        = document.createElement("tr");
  tableContainer = document.createElement("tbody");

  childElement.appendChild(document.createTextNode(locale.name));
  element.appendChild(childElement);

  childElement = document.createElement("td");

  childElement.appendChild(document.createTextNode(cookieName));
  childElement.setAttribute("class", "web-developer-name");
  element.appendChild(childElement);
  tableContainer.appendChild(element);

  childElement = document.createElement("td");
  element      = document.createElement("tr");

  childElement.appendChild(document.createTextNode(locale.value));
  element.appendChild(childElement);

  childElement = document.createElement("td");

  childElement.appendChild(document.createTextNode(cookie.value));
  childElement.setAttribute("class", "web-developer-value");
  element.appendChild(childElement);
  tableContainer.appendChild(element);

  childElement = document.createElement("td");
  element      = document.createElement("tr");

  childElement.appendChild(document.createTextNode(locale.host));
  element.appendChild(childElement);

  childElement = document.createElement("td");

  childElement.appendChild(document.createTextNode(cookie.host));
  childElement.setAttribute("class", "web-developer-host");
  element.appendChild(childElement);
  tableContainer.appendChild(element);

  childElement = document.createElement("td");
  element      = document.createElement("tr");

  childElement.appendChild(document.createTextNode(locale.path));
  element.appendChild(childElement);

  childElement = document.createElement("td");

  childElement.appendChild(document.createTextNode(cookie.path));
  childElement.setAttribute("class", "web-developer-path");
  element.appendChild(childElement);
  tableContainer.appendChild(element);

  childElement = document.createElement("td");
  element      = document.createElement("tr");

  childElement.appendChild(document.createTextNode(locale.expires));
  element.appendChild(childElement);

  childElement = document.createElement("td");

  childElement.appendChild(document.createTextNode(expiresDescription));
  childElement.setAttribute("class", "web-developer-expires");
  element.appendChild(childElement);
  tableContainer.appendChild(element);

  childElement = document.createElement("td");
  element      = document.createElement("tr");

  childElement.appendChild(document.createTextNode(locale.secure));
  element.appendChild(childElement);

  childElement = document.createElement("td");

  childElement.appendChild(document.createTextNode(secureDescription));
  childElement.setAttribute("class", "web-developer-secure");
  element.appendChild(childElement);
  tableContainer.appendChild(element);

  childElement = document.createElement("td");
  element      = document.createElement("tr");

  childElement.appendChild(document.createTextNode(locale.httpOnly));
  element.appendChild(childElement);

  childElement = document.createElement("td");

  childElement.appendChild(document.createTextNode(httpOnlyDescription));
  element.appendChild(childElement);
  tableContainer.appendChild(element);

  table.appendChild(tableContainer);
  table.setAttribute("class", "table table-striped");
  cookieElement.appendChild(table);
  cookieElement.appendChild(WebDeveloper.Generated.generateCommands(cookie, locale));
  container.appendChild(cookieElement);
  separator.setAttribute("class", "web-developer-separator");
  container.appendChild(separator);
  document.getElementById("content").appendChild(container);

  childElement = document.createElement("a");
  element      = document.createElement("li");

  childElement.appendChild(document.createTextNode(cookieName));
  childElement.setAttribute("href", "#cookie-" + cookiesCounter);
  element.appendChild(childElement);
  $(".dropdown-menu", $("#cookies-dropdown")).get(0).appendChild(element);
};

// Edits a cookie
WebDeveloper.Generated.editCookie = function()
{
  // If the dialog is valid
  if(WebDeveloper.Generated.validateEditDialog())
  {
    var alert     = document.createElement("div");
    var newCookie = WebDeveloper.Generated.populateCookieFromDialog();
    var oldCookie = WebDeveloper.Generated.populateCookieFromElement(WebDeveloper.Generated.cookie);

    WebDeveloper.Cookies.deleteCookie(oldCookie);
    WebDeveloper.Cookies.addCookie(newCookie);
    WebDeveloper.Generated.populateElementFromCookie(WebDeveloper.Generated.cookie, newCookie);

    alert.appendChild(document.createTextNode(WebDeveloper.Generated.storedLocale.cookieEdited.replace("%S", "'" + oldCookie.name + "'")));
    alert.setAttribute("class", "alert alert-success");

    WebDeveloper.Generated.cookie.prepend(alert);
    $("#edit-dialog").modal("hide");
  }
};

// Generates the commands
WebDeveloper.Generated.generateCommands = function(cookie, locale)
{
  var childElement = document.createElement("i");
  var commands     = document.createDocumentFragment();
  var cookieHost   = cookie.host;
  var element      = document.createElement("button");

  childElement.setAttribute("class", "icon-trash");
  element.appendChild(childElement);
  element.appendChild(document.createTextNode(" " + locale.deleteConfirmation));
  element.setAttribute("class", "web-developer-delete btn btn-danger");
  commands.appendChild(element);

  childElement = document.createElement("i");
  element      = document.createElement("button");

  childElement.setAttribute("class", "icon-pencil");
  element.appendChild(childElement);
  element.appendChild(document.createTextNode(" " + locale.edit));

  // If the cookie is HTTP only
  if(cookie.httpOnly)
  {
    element.setAttribute("class", "web-developer-edit btn btn-primary disabled");
    element.setAttribute("data-content", locale.cannotEditHTTPOnlyCookies);
    element.setAttribute("data-html", true);
    element.setAttribute("data-title", locale.cannotEdit);
  }
  else if(!WebDeveloper.Cookies.canEditLocalCookie() && (cookieHost == "localhost" || cookieHost == ".localhost"))
  {
    element.setAttribute("class", "web-developer-edit btn btn-primary disabled");
    element.setAttribute("data-content", locale.cannotEditLocalhostCookies);
    element.setAttribute("data-html", true);
    element.setAttribute("data-title", locale.cannotEdit);
  }
  else
  {
    element.setAttribute("class", "web-developer-edit btn btn-primary");
  }

  commands.appendChild(element);

  return commands;
};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
  var container         = null;
  var contentDocument   = null;
  var cookieInformation = locale.cookieInformation;
  var documents         = data.documents;
  var cookieDescription = null;
  var cookies           = null;
  var cookiesCounter    = 1;
  var cookiesDropdown   = $("#cookies-dropdown");
  var cookiesLength     = null;
  var deleteDialog      = $("#delete-dialog");
  var editDialog        = $("#edit-dialog");

  WebDeveloper.Generated.emptyContent();
  WebDeveloper.Generated.localizeHeader(locale);
  WebDeveloper.Generated.setPageTitle(cookieInformation, data, locale);

  $(".dropdown-toggle", cookiesDropdown).prepend(locale.cookies);

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument   = documents[i];
    cookieDescription = locale.cookies.toLowerCase();
    cookies           = contentDocument.cookies;
    cookiesLength     = cookies.length;

    // If there is only one cookie
    if(cookiesLength == 1)
    {
      cookieDescription = locale.cookie.toLowerCase();
    }

    WebDeveloper.Generated.addDocument(contentDocument.url, i, cookieDescription, cookiesLength);

    // If there are cookies
    if(cookiesLength > 0)
    {
      container = WebDeveloper.Generated.generateDocumentContainer();

      // Loop through the cookies
      for(var j = 0; j < cookiesLength; j++)
      {
        WebDeveloper.Generated.displayCookie(cookies[j], container, cookiesCounter, locale);

        cookiesCounter++;
      }
    }
    else
    {
      WebDeveloper.Generated.addSeparator();
    }
  }

  WebDeveloper.Generated.storedLocale = locale;

  $("#cookie-expires").attr("placeholder", locale.expiresPlaceholder);
  $("#cookie-host").attr("placeholder", locale.hostPlaceholder);
  $("#cookie-name").attr("placeholder", locale.namePlaceholder);
  $("#cookie-path").attr("placeholder", locale.pathPlaceholder);
  $("#cookie-secure").after(locale.secureCookie);
  $("#cookie-session").after(locale.sessionCookie).on("change", WebDeveloper.Generated.changeSession);
  $("#cookie-value").attr("placeholder", locale.valuePlaceholder);
  $(".btn-danger", deleteDialog).append(locale.deleteLabel).on("click", WebDeveloper.Generated.deleteCookie);
  $(".btn-default", deleteDialog).text(locale.cancel);
  $(".btn-default", editDialog).text(locale.cancel);
  $(".btn-primary", editDialog).append(locale.save).on("click", WebDeveloper.Generated.editCookie);
  $(".web-developer-delete").on("click", WebDeveloper.Generated.showDeleteDialog);
  $(".web-developer-edit:not(.disabled)").on("click", WebDeveloper.Generated.showEditDialog);
  $(".web-developer-edit.disabled").popover();
  $('[for="cookie-expires"]').text(locale.expires);
  $('[for="cookie-host"]').text(locale.host);
  $('[for="cookie-name"]').text(locale.name);
  $('[for="cookie-path"]').text(locale.path);
  $('[for="cookie-value"]').text(locale.value);

  WebDeveloper.Generated.initializeCommonElements();
};

// Populates a cookie from a dialog
WebDeveloper.Generated.populateCookieFromDialog = function()
{
  var cookie = {};

  cookie.host  = $("#cookie-host").val();
  cookie.name  = $("#cookie-name").val();
  cookie.path  = $("#cookie-path").val();
  cookie.value = $("#cookie-value").val();

  // If the cookie is secure
  if($("#cookie-secure").prop("checked"))
  {
    cookie.secure = true;
  }

  // If the cookie is a session cookie
  if($("#cookie-session").prop("checked"))
  {
    cookie.session = true;
  }
  else
  {
    cookie.expires = $("#cookie-expires").val();
  }

  return cookie;
};

// Populates a cookie from an element
WebDeveloper.Generated.populateCookieFromElement = function(cookieElement)
{
  var cookie = {};

  cookie.host = $(".web-developer-host", cookieElement).text();
  cookie.name = $(".web-developer-name", cookieElement).text();
  cookie.path = $(".web-developer-path", cookieElement).text();

  // If the cookie is secure
  if($(".web-developer-secure", cookieElement).text() == WebDeveloper.Generated.storedLocale.yes)
  {
    cookie.secure = true;
  }

  return cookie;
};

// Populates a dialog from an element
WebDeveloper.Generated.populateDialogFromElement = function(cookieElement)
{
  var expires = $(".web-developer-expires", cookieElement).text();

  $("#cookie-host").val($(".web-developer-host", cookieElement).text());
  $("#cookie-name").val($(".web-developer-name", cookieElement).text());
  $("#cookie-path").val($(".web-developer-path", cookieElement).text());
  $("#cookie-value").val($(".web-developer-value", cookieElement).text());

  // If this is a session cookie
  if(expires == WebDeveloper.Generated.storedLocale.atEndOfSession)
  {
    $("#cookie-expires").val("").prop("disabled", true);
    $("#cookie-session").prop("checked", true);
  }
  else
  {
    $("#cookie-expires").val(expires).prop("disabled", false);
    $("#cookie-session").prop("checked", false);
  }

  // If this is not a secure cookie
  if($(".web-developer-secure", cookieElement).text() == WebDeveloper.Generated.storedLocale.no)
  {
    $("#cookie-secure").prop("checked", false);
  }
  else
  {
    $("#cookie-secure").prop("checked", true);
  }
};

// Populates an element from a cookie
WebDeveloper.Generated.populateElementFromCookie = function(cookieElement, cookie)
{
  $(".web-developer-host", cookieElement).text(cookie.host);
  $(".web-developer-name", cookieElement).text(cookie.name);
  $(".web-developer-path", cookieElement).text(cookie.path);
  $(".web-developer-value", cookieElement).text(cookie.value);

  // If the cookie is secure
  if(cookie.secure)
  {
    $(".web-developer-secure", cookieElement).text(WebDeveloper.Generated.storedLocale.yes);
  }
  else
  {
    $(".web-developer-secure", cookieElement).text(WebDeveloper.Generated.storedLocale.no);
  }

  // If the cookie is a session cookie
  if(cookie.session)
  {
    $(".web-developer-expires", cookieElement).text(WebDeveloper.Generated.storedLocale.atEndOfSession);
  }
  else
  {
    $(".web-developer-expires", cookieElement).text(cookie.expires);
  }

  return cookie;
};

// Resets the edit cookie dialog
WebDeveloper.Generated.resetEditDialog = function(editDialog)
{
  $(".has-error", editDialog).removeClass("has-error");
  $(".help-block", editDialog).text("");
};

// Shows the delete cookie dialog
WebDeveloper.Generated.showDeleteDialog = function()
{
  var cookieElement = $(this).parent();
  var cookieName    = $(".web-developer-name", cookieElement).text();
  var deleteDialog  = $("#delete-dialog");

  WebDeveloper.Generated.cookie = cookieElement;

  $(".alert").remove();

  $("h4", deleteDialog).text(WebDeveloper.Generated.storedLocale.deleteCookie);
  $("p", deleteDialog).text(WebDeveloper.Generated.storedLocale.deleteCookieConfirmation.replace("%S", "'" + cookieName + "'"));

  deleteDialog.modal("show");
};

// Shows the edit cookie dialog
WebDeveloper.Generated.showEditDialog = function()
{
  var cookieElement = $(this).parent();
  var editDialog    = $("#edit-dialog");

  WebDeveloper.Generated.cookie = cookieElement;

  $(".alert").remove();

  $("h4", editDialog).text(WebDeveloper.Generated.storedLocale.editCookie);
  WebDeveloper.Generated.populateDialogFromElement(cookieElement);
  WebDeveloper.Generated.resetEditDialog(editDialog);

  editDialog.modal("show");
};

// Returns true if the edit cookie dialog is valid
WebDeveloper.Generated.validateEditDialog = function()
{
  var expires = $("#cookie-expires");
  var host    = $("#cookie-host");
  var name    = $("#cookie-name");
  var path    = $("#cookie-path");
  var valid   = true;

  WebDeveloper.Generated.resetEditDialog($("#edit-dialog"));

  // If the cookie name is not set
  if(!name.val())
  {
    name.closest(".form-group").addClass("has-error");
    name.next().text(WebDeveloper.Generated.storedLocale.nameCannotBeEmpty);

    valid = false;
  }

  // If the cookie host is not set
  if(!host.val())
  {
    host.closest(".form-group").addClass("has-error");
    host.next().text(WebDeveloper.Generated.storedLocale.hostCannotBeEmpty);

    valid = false;
  }

  // If the cookie path is not set
  if(!path.val())
  {
    path.closest(".form-group").addClass("has-error");
    path.next().text(WebDeveloper.Generated.storedLocale.pathCannotBeEmpty);

    valid = false;
  }

  // If the cookie is not a session cookie
  if(!$("#cookie-session").prop("checked"))
  {
    var expiresValue = expires.val().trim();

    // If the cookie expires is not set
    if(!expiresValue)
    {
      expires.closest(".form-group").addClass("has-error");
      expires.closest(".input-group").next().text(WebDeveloper.Generated.storedLocale.expiresCannotBeEmpty);

      valid = false;
    }
    else if(new Date(expiresValue) == "Invalid Date")
    {
      expires.closest(".form-group").addClass("has-error");
      expires.closest(".input-group").next().text(WebDeveloper.Generated.storedLocale.expiresNotValid);

      valid = false;
    }
  }

  return valid;
};

var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Preferences                    = WebDeveloper.Preferences || {};
WebDeveloper.Preferences.preferencesService = null;

// Deletes a preference for the extension
WebDeveloper.Preferences.deleteExtensionPreference = function(preference)
{
  WebDeveloper.Preferences.deletePreference(preference, WebDeveloper.Preferences.getExtensionBranch());
};

// Deletes a preference
WebDeveloper.Preferences.deletePreference = function(preference, branch)
{
  // If the branch is not set
  if(!branch)
  {
    branch = WebDeveloper.Preferences.getGlobalBranch();
  }

  // Try to delete the extension
  try
  {
    branch.clearUserPref(preference);
  }
  catch(exception)
  {
    // Ignore
  }
};

// Deletes a preference branch
WebDeveloper.Preferences.deletePreferenceBranch = function(branch)
{
  branch.deleteBranch("");
};

// Disables the given preference for the extension
WebDeveloper.Preferences.disableExtensionPreference = function(element, preference)
{
  WebDeveloper.Preferences.setExtensionBooleanPreference(preference, !WebDeveloper.Common.convertToBoolean(element.getAttribute("checked")));
};

// Disables the given preference
WebDeveloper.Preferences.disablePreference = function(element, preference)
{
  WebDeveloper.Preferences.setBooleanPreference(preference, !WebDeveloper.Common.convertToBoolean(element.getAttribute("checked")));
};

// Enables the given preference for the extension
WebDeveloper.Preferences.enableExtensionPreference = function(element, preference)
{
  WebDeveloper.Preferences.setExtensionBooleanPreference(preference, WebDeveloper.Common.convertToBoolean(element.getAttribute("checked")));
};

// Enables the given preference
WebDeveloper.Preferences.enablePreference = function(element, preference)
{
  WebDeveloper.Preferences.setBooleanPreference(preference, WebDeveloper.Common.convertToBoolean(element.getAttribute("checked")));
};

// Returns a boolean preference, returning false if the preference is not set
WebDeveloper.Preferences.getBooleanPreference = function(preference, branch)
{
  // If the branch is not set
  if(!branch)
  {
    branch = WebDeveloper.Preferences.getGlobalBranch();
  }

  // Try to get the preference
  try
  {
    return branch.getBoolPref(preference);
  }
  catch(exception)
  {
    // Ignore
  }

  return false;
};

// Returns the preferences branch
WebDeveloper.Preferences.getBranch = function(branch)
{
  return WebDeveloper.Preferences.getPreferencesService().getBranch(branch);
};

// Returns a boolean preference for the extension, returning false if the preference is not set
WebDeveloper.Preferences.getExtensionBooleanPreference = function(preference)
{
  return WebDeveloper.Preferences.getBooleanPreference(preference, WebDeveloper.Preferences.getExtensionBranch());
};

// Returns the extension preferences branch
WebDeveloper.Preferences.getExtensionBranch = function()
{
  return WebDeveloper.Preferences.getBranch("extensions.webdeveloper.");
};

// Returns an integer preference for the extension, returning 0 if the preference is not set
WebDeveloper.Preferences.getExtensionIntegerPreference = function(preference)
{
  return WebDeveloper.Preferences.getIntegerPreference(preference, WebDeveloper.Preferences.getExtensionBranch());
};

// Returns a string preference for the extension, returning null if the preference is not set
WebDeveloper.Preferences.getExtensionStringPreference = function(preference)
{
  return WebDeveloper.Preferences.getStringPreference(preference, WebDeveloper.Preferences.getExtensionBranch());
};

// Returns the global preferences branch
WebDeveloper.Preferences.getGlobalBranch = function()
{
  return WebDeveloper.Preferences.getBranch("");
};

// Returns an integer preference, returning 0 if the preference is not set
WebDeveloper.Preferences.getIntegerPreference = function(preference, branch)
{
  // If the branch is not set
  if(!branch)
  {
    branch = WebDeveloper.Preferences.getGlobalBranch();
  }

  // Try to get the preference
  try
  {
    return branch.getIntPref(preference);
  }
  catch(exception)
  {
    // Ignore
  }

  return 0;
};

// Returns a localized preference, returning null if the preference is not set
WebDeveloper.Preferences.getLocalizedPreference = function(preference)
{
  // Try to get the preference
  try
  {
    return WebDeveloper.Preferences.getExtensionBranch().getComplexValue(preference, Components.interfaces.nsIPrefLocalizedString).data.trim();
  }
  catch(exception)
  {
    // Ignore
  }

  return null;
};

// Returns the preferences service
WebDeveloper.Preferences.getPreferencesService = function()
{
  // If the preferences service is not set
  if(!WebDeveloper.Preferences.preferencesService)
  {
    WebDeveloper.Preferences.preferencesService = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
  }

  return WebDeveloper.Preferences.preferencesService;
};

// Returns a string preference, returning null if the preference is not set
WebDeveloper.Preferences.getStringPreference = function(preference, branch)
{
  // If the branch is not set
  if(!branch)
  {
    branch = WebDeveloper.Preferences.getGlobalBranch();
  }

  // Try to get the preference
  try
  {
    return branch.getComplexValue(preference, Components.interfaces.nsISupportsString).data.trim();
  }
  catch(exception)
  {
    // Ignore
  }

  return null;
};

// Returns a string preference, returning null if the preference is not set
WebDeveloper.Preferences.isPreferenceSet = function(preference, branch)
{
  // If the branch is not set
  if(!branch)
  {
    branch = WebDeveloper.Preferences.getGlobalBranch();
  }

  return branch.prefHasUserValue(preference);
};

// Sets a boolean preference
WebDeveloper.Preferences.setBooleanPreference = function(preference, value, branch)
{
  // If the branch is not set
  if(!branch)
  {
    branch = WebDeveloper.Preferences.getGlobalBranch();
  }

  branch.setBoolPref(preference, value);
};

// Sets a boolean preference for the extension
WebDeveloper.Preferences.setExtensionBooleanPreference = function(preference, value)
{
  WebDeveloper.Preferences.setBooleanPreference(preference, value, WebDeveloper.Preferences.getExtensionBranch());
};

// Sets an integer preference for the extension
WebDeveloper.Preferences.setExtensionIntegerPreference = function(preference, value)
{
  WebDeveloper.Preferences.setIntegerPreference(preference, value, WebDeveloper.Preferences.getExtensionBranch());
};

// Sets a string preference for the extension
WebDeveloper.Preferences.setExtensionStringPreference = function(preference, value)
{
  WebDeveloper.Preferences.setStringPreference(preference, value, WebDeveloper.Preferences.getExtensionBranch());
};

// Sets an integer preference
WebDeveloper.Preferences.setIntegerPreference = function(preference, value, branch)
{
  // If the branch is not set
  if(!branch)
  {
    branch = WebDeveloper.Preferences.getGlobalBranch();
  }

  branch.setIntPref(preference, value);
};

// Sets a string preference
WebDeveloper.Preferences.setStringPreference = function(preference, value, branch)
{
  var supportsStringInterface = Components.interfaces.nsISupportsString;
  var string                  = Components.classes["@mozilla.org/supports-string;1"].createInstance(supportsStringInterface);

  // If the branch is not set
  if(!branch)
  {
    branch = WebDeveloper.Preferences.getGlobalBranch();
  }

  string.data = value;

  branch.setComplexValue(preference, supportsStringInterface, string);
};
