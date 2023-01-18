"use strict";

/*
    styles
*/

import "../../styles/css/normalize.css";
import "../../styles/less/pages_main/index.less";

/*
    scripts
*/

import { Addon_dark_theme } from "./../my_libs/addon_dark_theme";
import { Addon_sidebar } from "./../my_libs/addon_sidebar";

// dark-theme
// классы, для которых должна приминятся темная тема
let support_class_dark_theme: string[] = [
    "body",
    "header",
    "main",
    "footer",
    "def_icon__icon",
    "header__horisontal_line",
    "file_info",
    "text_in_file",
    "text_blue",
    "addon_spoiler_heder",
    "addon_spoiler_body",
    "js-sidebar__element",
    "js-sidebar__elements",
    "header__button_wrapper",
];

let Dark_theme: Addon_dark_theme = new Addon_dark_theme({ classes_dark_style: support_class_dark_theme });
Dark_theme.init();

// disable banner no-js

let banners = document.getElementsByClassName("banner") as HTMLCollectionOf<HTMLElement>;
if (banners.length != 0) {
    for (let elem of banners as unknown as Array<HTMLElement>) {
        elem.remove();
    }
}

// sidebar

let Sidebar: Addon_sidebar = new Addon_sidebar();
Sidebar.init();

// preview html

document.addEventListener(
    "DOMContentLoaded",
    function (evt) {
        const html_header = document.querySelector("body > header");
        const html_main = document.querySelector("body > main");
        const html_footer = document.querySelector("body > footer");

        if (html_header && html_main && html_footer) {
            html_header.classList.remove("visually_hidden");
            html_main.classList.remove("visually_hidden");
            html_footer.classList.remove("visually_hidden");
        } else {
            throw new Error("header || main || footer, not fund in html");
        }
    },
    { once: true }
);

export { Dark_theme };
