"use strict";

/*
    IMPORT
*/

import {
    file_txt,
    qr_size_n,
    file_check_final,
    file_content_container,
    file_check,
    file_uploader,
    text_pages,
    btn_decomp_n,
} from "./qr_descriptor";
import { CustomErrEditor } from "./../my_libs/addon_error_edit";
import { is_tab, caller_delay_callback, find_element } from "./qr_utils";
import JSZip from "jszip";
import * as qr_icons from "./qr_icons";

type TsaveFun = (a: Blob, b: string) => void;

/*--------------------------------------------------------------------------------------------*/

let saveAs: TsaveFun = require("jszip/vendor/FileSaver.js");

const btn_filter = find_element<HTMLButtonElement>("js-btn_filter_qr"); // кнопка удалить лишнее
const btn_decomp = find_element<HTMLButtonElement>("js-btn_decomp"); // кнопка разбить на фаилы
const btn_download = find_element<HTMLButtonElement>("js-btn_download"); // кнопка скачать

btn_filter.addEventListener("click", btn_filter_klick);
btn_decomp.addEventListener("click", btn_decomp_klick);
btn_download.addEventListener("click", btn_download_klick);

function isArrString(value: string | string[]): value is string[] {
    // ранее тут была проверка на то что каждый элемент массива это
    // string, но ее пришлось удалить тк при большом массиве на этой проверке былбы
    // долгий лаг.
    // TODO может быть я потом сделаю асинхронный обработчик архива

    const check_elements = (value: string[]) => {
        for (let elem of value) {
            if (typeof elem == "string") {
                continue;
            }
            return false;
        }
        return true;
    };

    if (Array.isArray(value)) {
        // if (check_elements(value)) {
        return true;
        // }
    }
    return false;
}

function btn_filter_klick(): void {
    // кнопка удалить лишнее
    if (file_txt && isArrString(file_txt)) {
        for (let i = 0; i < file_txt.length; i++) {
            file_txt[i] = file_txt[i].slice(0, is_tab(file_txt[i])); // удаляем все после таба
            if (file_txt[i] == "") {
                file_txt.splice(i);
            }
        }

        window.dispatchEvent(new CustomEvent("window_scroll_reset"));
        file_check(file_txt);
        btn_active_deactive(btn_filter, true);
    }
}

function btn_decomp_klick(): void {
    // кнопка разбить на фаилы
    const need_qr: number = Number(btn_decomp_n.value); // сколько должно быть qr кодов в фаиле
    const need_docs: number = Math.ceil(Number(qr_size_n.innerText) / Number(need_qr)); // щитаем сколько нам понадобится страниц
    file_content_container.innerHTML = "";
    let file_txt_i: number = 0;
    const caller_callback = () => {
        qr_icons.addonIcon_load.icon_off();
    };

    window.dispatchEvent(new CustomEvent("window_scroll_reset"));

    let file_check_final_dec = caller_delay_callback(file_check_final, caller_callback);

    qr_icons.addonIcon_load.icon_on();

    for (let i = 0; i < need_docs; i++) {
        let arry_temp: string[] = [];
        for (let k = 0; k < need_qr; k++) {
            if (isArrString(file_txt) && file_txt[file_txt_i] != undefined) {
                arry_temp.push(file_txt[file_txt_i]);
                file_txt_i++;

                if (file_txt[file_txt_i] == "") {
                    file_txt.splice(i);
                }
            } else {
                break;
            }
        }
        file_check_final_dec(arry_temp);
        text_pages.push(arry_temp);
    }

    file_uploader.value = ""; // сбросить открытый фаил для html input (чтобы его можно было повторно открыть)

    btn_active_deactive(btn_filter, true);
    btn_active_deactive(btn_decomp, true);
    btn_active_deactive(btn_download, false);
    btn_active_deactive(btn_decomp_n, true);
}

function btn_download_klick(): void {
    // кнопка скачать
    let zip: JSZip = new JSZip(); // создаем новый архив

    for (let i = 0; i < text_pages.length; i++) {
        let text: string = text_pages[i].join("\n");
        if (text.endsWith("\n")) {
            text = text.slice(0, text.length - 1);
        }

        zip.file("QR_page_" + (i + 1) + "__" + ((text.match(new RegExp("\n", "g")) || []).length + 1) + ".txt", text); // генерируем имя для фаила
    }

    zip.generateAsync({ type: "blob" })
        .then((content) => {
            saveAs(content, "QR_pages.zip");
        })
        .catch((err: Error) => {
            new CustomErrEditor({
                type: "zip_download_stage",
                duble: false,
                file: err,
                info: "Ошибка при скачивании фаила.",
            });
        });

    btn_active_deactive(btn_download, true);
}

// активатор кнопок (обьект кнопки, true = деактевировать)
function btn_active_deactive(btn: HTMLButtonElement | HTMLInputElement, mode: boolean) {
    if (!btn) return;
    btn.disabled = mode;
}

export { btn_active_deactive, btn_filter, btn_decomp, btn_download };
