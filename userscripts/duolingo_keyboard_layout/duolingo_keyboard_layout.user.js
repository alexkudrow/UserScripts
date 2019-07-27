// ==UserScript==
// @name            Duolingo keyboard layout
// @description     Warns when you need to switch the keyboard layout during exercise
// @namespace       https://github.com/alexkudrow/UserScripts
// @version         0.1
// @author          Alex Kudrow
// @copyright       2019 Alex Kudrow (http://github.com/alexkudrow)
// @license         GNU GPL v3.0; http://www.gnu.org/licenses/gpl-3.0.txt
// @homepage        https://github.com/alexkudrow/UserScripts/tree/master/userscripts/duolingo_keyboard_layout
// @downloadURL     https://github.com/alexkudrow/UserScripts/raw/master/userscripts/duolingo_keyboard_layout/duolingo_keyboard_layout.user.js
// @updateURL       https://github.com/alexkudrow/UserScripts/raw/master/userscripts/duolingo_keyboard_layout/duolingo_keyboard_layout.user.js
// @run-at          document-end
// @match           https://www.duolingo.com/*
// @grant           none
// ==/UserScript==

(function(window) {
    var observer,
        typedLang,
        hintClassName = "ak-language-helper";

    var colors = {
        success: "#58a700",
        danger: "#ea2b2b",
        warning: "#ff9600",
    }

    var LANG_STATE = -1; // -1 - not defined, 1 - correct, 0 - wrong

    window.addEventListener("load", function(event){
        var observedElement = document.querySelector("#root");
        console.log(observedElement);

        if (!observedElement) return;

        process();

        observer = new MutationObserver(function (mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.target.querySelector("[data-test=challenge-translate-input], [data-test=challenge-text-input]")) {
                    console.log(mutation.target);
                    console.log("observe");
                    process();
                }
            });
        });

        observer.observe(observedElement, {
            childList: true,
            subtree: true,
        });
    });

    var process = function() {
        if (!document.querySelector("[data-test=challenge-header]")) return;
        console.log("process");

        var input = document.querySelector("[data-test=challenge-translate-input], [data-test=challenge-text-input]");

        if (!input) return;

        if (!input.getAttribute("data-ak-event")) {
            console.log("set event");
            input.addEventListener("keyup", function(event) {
                var value = this.value.replace(/[^a-zA-Zа-яА-ЯЁё]/g, "");

                if (!value) {
                    if (typedLang == "incorrect") {
                        typedLang = "";
                    }
                    return;
                }

                if (/^[a-zA-Z]+$/.test(value)) {
                    typedLang = "en";
                } else if (/^[а-яА-ЯЁё]+$/.test(value)) {
                    typedLang = "ru";
                } else {
                    typedLang = "incorrect";
                }

                console.log(typedLang);
                process();
            });

            input.setAttribute("data-ak-event", 1);
        }

        var text,
            hintType;

        if (!typedLang) {
            text = "Start typing something...";
            hintType = "warning";
        } else if (typedLang == "incorrect") {
            text = "Incorrect string is typed";
            hintType = "danger";
        } else if (typedLang == getRequiredLang(input)) {
            text = "Keyboard layout is correct";
            hintType = "success";
        } else {
            text = "Switch keyboard layout";
            hintType = "danger";
        }

        var hintElem = getHintElement();

        hintElem.innerText = text;
        hintElem.style.color = colors[hintType];
    }

    var getRequiredLang = function(element) {
        if (!element) return;

        var lang;

        switch (element.getAttribute("data-test")) {
            case "challenge-translate-input":
                lang = element.getAttribute("lang");
                break;

            case "challenge-text-input":
                // Parse lang from url pathname. For example: /skill/en/Occupations/4
                lang = document.location.pathname.split("/")[2];
                break;
        }

        return lang;
    }

    var getHintElement = function() {
        var element = document.querySelector("." + hintClassName);

        if (!element) {
            element = document.createElement('div');
            element.className = hintClassName;
            element.style.textAlign = "center";

            document.querySelector("[data-test=challenge-header]").parentNode.appendChild(element);
        }

        return element;
    }
})(window);
