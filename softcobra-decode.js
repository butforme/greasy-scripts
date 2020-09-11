// ==UserScript==
// @name         Softcobra Decoder
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  decodes links on softcobra.net
// @author       butforme
// @match        https://www.softcobra.com/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js
// ==/UserScript==

(function () {
    'use strict';
    window.addEventListener('load', function () {
        var tableRows = document.getElementsByTagName('td');
        var j;
        for (j = 0; j < tableRows.length; j++) {
            var currRow = tableRows[j].innerText;
            const regex = /^U2Fsd.*/g;
            if (currRow.match(regex)) {
                var decodedLink = CryptoJS.AES.decrypt(currRow, "/").toString(CryptoJS.enc.Utf8);
                tableRows[j].innerHTML = `<a href="${decodedLink}">${decodedLink}</a>`;
            }
        }
    }, false);
})();