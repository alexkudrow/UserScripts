// ==UserScript==
// @name            Peep Telegram message
// @description     Peep last Telegram user message without dropping unread status
// @namespace       https://github.com/alexkudrow/UserScripts
// @version         1.0
// @author          Alex Kudrow
// @copyright       2019 Alex Kudrow (http://github.com/alexkudrow)
// @license         GNU GPL v3.0; http://www.gnu.org/licenses/gpl-3.0.txt
// @homepage        https://github.com/alexkudrow/UserScripts/tree/master/userscripts/peep_telegram_message
// @downloadURL     https://github.com/alexkudrow/UserScripts/raw/master/userscripts/peep_telegram_message/peep_telegram_message.user.js
// @updateURL       https://github.com/alexkudrow/UserScripts/raw/master/userscripts/peep_telegram_message/peep_telegram_message.user.js
// @run-at          document-end
// @match           https://web.telegram.org/*
// @grant           none
// ==/UserScript==

(function (window) {
    if (window.self != window.top) {
        return;
    }

    if (!/https:\/\/web.telegram.org\//.test(window.location.href)) {
        return;
    }

    document.addEventListener("mouseover", function(event){
        if (event.target) {
            var parent = event.target.closest(".im_dialog");

            if (parent) {
                var child = parent.querySelector(".im_dialog_message");

                if (child) {
                    parent.setAttribute("title", child.innerText);
                }
            }
        }
    });

    document.addEventListener("mouseout", function(event){
        if (event.target && event.target.className == "im_dialog") {
            event.target.removeAttribute("title");
        }
    });
})(window);
