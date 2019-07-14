// ==UserScript==
// @name            Peep VK message
// @description     Peep last VK user message without dropping unread status
// @namespace       https://github.com/alexkudrow/UserScripts
// @version         1.0
// @author          Alex Kudrow
// @downloadURL     https://github.com/alexkudrow/UserScripts/raw/master/userscripts/peep_vk_message/peep_vk_message.user.js
// @updateURL       https://github.com/alexkudrow/UserScripts/raw/master/userscripts/peep_vk_message/peep_vk_message.user.js
// @match           https://vk.com/im*
// @grant           none
// ==/UserScript==

(function (window) {
    if (window.self != window.top) {
        return;
    }

    if (!/https:\/\/vk.com\/im/.test(window.location.href)) {
        return;
    }

    document.addEventListener('mouseover', function(e){
        if (e.target) {
            var parent = e.target.closest('.nim-dialog--text-preview');
            if (parent) {
                parent.setAttribute('title', parent.innerText);
            }
        }
    });

    document.addEventListener('mouseout', function(e){
        if (e.target) {
            var parent = e.target.closest('.nim-dialog--text-preview');
            if (parent) {
                parent.removeAttribute('title');
            }
        }
    });
})(window);