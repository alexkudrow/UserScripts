// ==UserScript==
// @name            Peep VK message
// @description     Peep last VK user message without dropping unread status
// @namespace       https://github.com/alexkudrow/UserScripts
// @version         1.1
// @author          Alex Kudrow
// @copyright       2019 Alex Kudrow (http://github.com/alexkudrow)
// @license         GNU GPL v3.0; http://www.gnu.org/licenses/gpl-3.0.txt
// @homepage        https://github.com/alexkudrow/UserScripts/tree/master/userscripts/peep_vk_message
// @downloadURL     https://github.com/alexkudrow/UserScripts/raw/master/userscripts/peep_vk_message/peep_vk_message.user.js
// @updateURL       https://github.com/alexkudrow/UserScripts/raw/master/userscripts/peep_vk_message/peep_vk_message.user.js
// @run-at          document-end
// @match           https://vk.com/im*
// @grant           none
// ==/UserScript==

(function(window) {
    if (window.self != window.top) {
        return;
    }

    if (!/https:\/\/vk.com\/im/.test(window.location.href)) {
        return;
    }

    document.addEventListener("mouseover", function(event) {
        if (event.target) {
            var parent = event.target.closest(".nim-dialog");

            if (parent) {
                var child = parent.querySelector(".nim-dialog--text-preview");

                if (child) {
                    parent.setAttribute("title", child.innerText);
                }
            }
        }
    });

    document.addEventListener("mouseout", function(event) {
        if (event.target && event.target.className == "nim-dialog") {
            event.target.removeAttribute("title");
        }
    });
})(window);
