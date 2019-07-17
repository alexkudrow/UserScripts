// ==UserScript==
// @name            Peep VK message
// @description     Peep last VK user message without dropping unread status
// @namespace       https://github.com/alexkudrow/UserScripts
// @version         1.2
// @author          Alex Kudrow
// @copyright       2019 Alex Kudrow (http://github.com/alexkudrow)
// @license         GNU GPL v3.0; http://www.gnu.org/licenses/gpl-3.0.txt
// @homepage        https://github.com/alexkudrow/UserScripts/tree/master/userscripts/peep_vk_message
// @downloadURL     https://github.com/alexkudrow/UserScripts/raw/master/userscripts/peep_vk_message/peep_vk_message.user.js
// @updateURL       https://github.com/alexkudrow/UserScripts/raw/master/userscripts/peep_vk_message/peep_vk_message.user.js
// @run-at          document-end
// @match           https://vk.com/im*
// @match           https://vk.com/al_im.php
// @grant           none
// ==/UserScript==

(function(window) {
    if (window.self != window.top) {
        return;
    }

    document.addEventListener("mouseover", function(event) {
        var parent = event.target.closest(".nim-dialog");

        if (parent) {
            var child = parent.querySelector(".nim-dialog--text-preview");

            if (child) {
                parent.setAttribute("title", child.innerText);
            }
        }
    });
})(window);
