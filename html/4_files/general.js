function SetCategory(cat) {
    PageMethods.SetSessionVar('CategoryName', cat, SetCategoryCallBack);
}

function SetCategoryCallBack(results, context, methodName) {
    window.location.href = "/productcategory.aspx";
}

function SetCategory2(cat) {
    PageMethods.SetSessionVar('CategoryName', cat, SetCategoryCallBack2);
}

function SetCategoryCallBack2(results, context, methodName) {
    window.location.href = "/productcategory.aspx#";
}

function SetProduct(pID) {
    PageMethods.SetSessionVar('ProductID', pID, SetProductCallBack);
}

function SetProductCallBack(results, context, methodName) {
    window.location.href = "/productdetail.aspx";
}

function openClose(controlId, imageId) {
    var control = $(controlId);
    var imag = $(imageId);

    if (control.style.display == 'none') {
        control.style.display = '';
        imag.className = 'arrowClose';
    }
    else {
        control.style.display = 'none';
        imag.className = 'arrowOpen';
    }
}

function showHide(controlId) {
    var control = $(controlId);
    if (control.style.display == 'none') {
        control.style.display = '';
    }
    else {
        control.style.display = 'none';
    }
}

/* Language Preference cookie*/
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else {
        var expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function changeLanguage(lang) {
    try {
        eraseCookie('SiteLanguage');
    }
    catch (ex) {
    }
    createCookie('SiteLanguage', lang, 365);
    window.location.href = window.top.location.href;
}

/* Product browser */
function fillDetailView(ID, site) {
    var vTitle = $("valueTitle" + ID);
    var vText = $("valueText" + ID);
    var vImage = $("valueImage" + ID);
    var contentTitle = $("ContentTitle");
    var contentText = $("ContentText");
    var contentImage = $("ctl00_mainContent_ContentImage");
    var contentFrame = $("detailScreen");

    contentFrame.style.display = '';
    if (vTitle != null)
        contentTitle.innerHTML = vTitle.value;
    if (vText != null)
        contentText.innerHTML = vText.value;
    if (vImage != null)
        contentImage.src = "Handlers/GeneralHandler.ashx?type=pCat&img=" + vImage.value + "&width=150&height=150";
}

function gotoProdDetail(productId) {
    window.location = "ProductDetail.aspx?pID=" + productId;
}

/* Menu items */
function toggleSelection() {
    if (arguments.length > 1) {
        var StrippedMenuItem = arguments[0];
        var nsItem = $("ns" + StrippedMenuItem);

        // Is selected?                         
        if (nsItem.style.display == 'none') {
            hideMenuItem(StrippedMenuItem);
        }
        else {
            showMenuItem(StrippedMenuItem);
        }
        // Hide the other menu items
        for (var i = 1; i < arguments.length; i++) {
            hideMenuItem(arguments[i]);
        }
    }
}

function hideRestOfMenu() {
    for (var i = 0; i < arguments.length; i++) {
        var element = $(arguments[i]);
        hideMenuItem(element);
    }
}

function hideMenuItem(StrippedMenuItem) {
    var nsItem = $("ns" + StrippedMenuItem);
    var sItem = $("s" + StrippedMenuItem);
    var aItem = $("a" + StrippedMenuItem);
    var rItem = $("r" + StrippedMenuItem);

    if (nsItem.style.display == 'none') {
        nsItem.style.display = '';
        sItem.style.display = 'none';
        aItem.style.display = 'none';
        rItem.className = 'bgLineOrange';
        hideSubNav(StrippedMenuItem);
    }
}

function showMenuItem(StrippedMenuItem) {
    var nsItem = $("ns" + StrippedMenuItem);
    var sItem = $("s" + StrippedMenuItem);
    var aItem = $("a" + StrippedMenuItem);
    var rItem = $("r" + StrippedMenuItem);

    if (nsItem.style.display == '') {
        nsItem.style.display = 'none';
        sItem.style.display = '';
        aItem.style.display = '';
        rItem.className = 'bgLineWhite';
        showSubNav(StrippedMenuItem);
    }
}

/* Sub navigation */
function showSubNav(StrippedMenuItem) {
    var sNav = $("sNav" + StrippedMenuItem);
    var sNavLine = $("sNavLine" + StrippedMenuItem);
    if (sNav != null) {
        if (sNav.style.display == 'none') {
            sNav.style.display = '';
            sNavLine.style.display = '';
        }
    }
}

function hideSubNav(StrippedMenuItem) {
    var sNav = $("sNav" + StrippedMenuItem);
    var sNavLine = $("sNavLine" + StrippedMenuItem);
    if (sNav != null) {
        if (sNav.style.display == '') {
            sNav.style.display = 'none';
            sNavLine.style.display = 'none';
        }
    }
}

function ResizeLoadingScreen(controlName) {

    var control = $(controlName);
    var xheight = document.body.offsetWidth;
    var xwidth = document.body.offsetHeight;

    control.height = xheight;
    control.width = xwidth;

}

// Instead of: document.getElementById('a');
// use: $('a');
/*
function $() {
var results = [], element;
for (var i = 0; i < arguments.length; i++) {
element = arguments[i];
if (typeof element == 'string')
element = document.getElementById(element);
results.push(element);
}
return results.length < 2 ? results[0] : results;
}
*/

function hideProductTab() {
    for (var i = 0; i < arguments.length; i++) {
        var element = $(arguments[i]);
        element.style.display = 'none';
    }
}

//hides all divs (with prefix tab) within a specific div(1st argument) except the one given(2nd argument) 
function hideAll() {
    var element = $(arguments[0]);
    for (var i = 0; i < element.childNodes.length; i++) {
        var childElement = element.childNodes[i];
        if (childElement != $(arguments[1]))
            childElement.style.display = 'none';
    }
}

function makeActive() {
    var oTarget = bpc.xpath("id('DetailTabs')/t:v-tab[@b:state='selected']", _current)[0];
    bpc.trigger('SetCalculatedHeight', oTarget);
    for (var i = 0; i < arguments.length; i++) {
        var element = $(arguments[i]);
        element.className = 'geoTabActive';
    }

}

function makeAllInActive() {
    var element = $(arguments[0]);
    for (var i = 0; i < element.childNodes.length; i++) {
        var childElement = element.childNodes[i];
        if (childElement != $(arguments[1]) && childElement.className != 'ClearLeft geoTabDottedLine')
            childElement.className = 'geoTab';
    }
}

function showProductTab() {
    for (var i = 0; i < arguments.length; i++) {
        var element = $(arguments[i]);
        element.style.display = '';
    }
}

var $A = Array.from = function(iterable) {
    if (!iterable) return [];
    if (iterable.toArray) {
        return iterable.toArray();
    } else {
        var results = [];
        for (var i = 0; i < iterable.length; i++)
            results.push(iterable[i]);
        return results;
    }
}

Function.prototype.bind = function() {
    var __method = this, args = $A(arguments), object = args.shift();
    return function() {
        return __method.apply(object, args.concat($A(arguments)));
    }
}

function hasClassName(element, className) {

    var classNames = element.className.split(' ');

    for (var index = 0; index < classNames.length; index++) {

        if (classNames[index] == className) {
            return true;
        }
    }

    return false;
}

// Mozilla Developer Center
// Source: http://developer.mozilla.org/en/docs/Whitespace_in_the_DOM#Making_things_easier
// License: http://creativecommons.org/licenses/by-sa/3.0/
/**
* Determine if a node should be ignored by the iterator functions.
*
* @param nod  An object implementing the DOM1 |Node| interface.
* @return     true if the node is:
*                1) A |Text| node that is all whitespace
*                2) A |Comment| node
*             and otherwise false.
*/
function is_ignorable(nod) {
    return (nod.nodeType == 8) || // A comment node
         ((nod.nodeType == 3) && is_all_ws(nod)); // a text node, all ws 
}

/**
* Version of |firstChild| that skips nodes that are entirely
* whitespace and comments.
*
* @param sib  The reference node.
* @return     Either:
*               1) The first child of |sib| that is not
*                  ignorable according to |is_ignorable|, or
*               2) null if no such node exists.
*/
function first_child(par) {
    var res = par.firstChild;
    while (res) {
        if (!is_ignorable(res)) return res;
        res = res.nextSibling;
    }
    return null;
}

/**
* Determine whether a node's text content is entirely whitespace.
*
* @param nod  A node implementing the |CharacterData| interface (i.e.,
*             a |Text|, |Comment|, or |CDATASection| node
* @return     True if all of the text content of |nod| is whitespace,
*             otherwise false.
*/
function is_all_ws(nod) {
    // Use ECMA-262 Edition 3 String and RegExp features
    return !(/[^\t\n\r ]/.test(nod.data));
}


// Replaces all instances of the given substring.
String.prototype.replaceAll = function(
     strTarget, // The substring you want to replace
     strSubString // The string you want to replace in.
     ) {
    var strText = this;
    var intIndexOfMatch = strText.indexOf(strTarget);

    // Keep looping while an instance of the target string
    // still exists in the string.
    while (intIndexOfMatch != -1) {
        // Relace out the current instance.
        strText = strText.replace(strTarget, strSubString)

        // Get the index of any next matching substring.
        intIndexOfMatch = strText.indexOf(strTarget);
    }

    // Return the updated string with ALL the target strings
    // replaced out with the new substring.
    return (strText);
}


// BROWSER DETECTION //

// Usage of this object: BrowserDetect.OS, BrowserDetect.browser, BrowserDetect.version

var BrowserDetect = {
    init: function() {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function(data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function(dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    dataBrowser: [
		{ string: navigator.userAgent,
		    subString: "OmniWeb",
		    versionSearch: "OmniWeb/",
		    identity: "OmniWeb"
		},
		{
		    string: navigator.vendor,
		    subString: "Apple",
		    identity: "Safari"
		},
		{
		    prop: window.opera,
		    identity: "Opera"
		},
		{
		    string: navigator.vendor,
		    subString: "iCab",
		    identity: "iCab"
		},
		{
		    string: navigator.vendor,
		    subString: "KDE",
		    identity: "Konqueror"
		},
		{
		    string: navigator.userAgent,
		    subString: "Firefox",
		    identity: "Firefox"
		},
		{
		    string: navigator.vendor,
		    subString: "Camino",
		    identity: "Camino"
		},
		{		// for newer Netscapes (6+)
		    string: navigator.userAgent,
		    subString: "Netscape",
		    identity: "Netscape"
		},
		{
		    string: navigator.userAgent,
		    subString: "MSIE",
		    identity: "Explorer",
		    versionSearch: "MSIE"
		},
		{
		    string: navigator.userAgent,
		    subString: "Gecko",
		    identity: "Mozilla",
		    versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
		    string: navigator.userAgent,
		    subString: "Mozilla",
		    identity: "Netscape",
		    versionSearch: "Mozilla"
		}
	],
    dataOS: [
		{
		    string: navigator.platform,
		    subString: "Win",
		    identity: "Windows"
		},
		{
		    string: navigator.platform,
		    subString: "Mac",
		    identity: "Mac"
		},
		{
		    string: navigator.platform,
		    subString: "Linux",
		    identity: "Linux"
		}
	]

};
BrowserDetect.init();

// END BROWSER DETECTION //

// String Trim function //
function trim(value) {
    value = value.replace(/^\s+/, '');
    value = value.replace(/\s+$/, '');
    return value;
}
//String Trim function //