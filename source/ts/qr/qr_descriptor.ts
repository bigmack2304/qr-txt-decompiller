"use strict";

/*
    IMPORT
*/

import { Addon_spoiler } from "./../my_libs/s_addon_spoiler";
import * as qr_icons from "./qr_icons";
import { btn_active_deactive, btn_filter, btn_decomp, btn_download } from "./qr_buttons";
import { CustomErrEditor } from "./../my_libs/addon_error_edit";
import { arry_renderer, arry_renderer_chunk, find_element } from "./qr_utils";
import { Dark_theme } from "./../pages_scripts/index";
import * as Papa from "papaparse";

import type * as CustomErrEditor_types from "./../my_libs/addon_error_edit";
import type * as Papa_types from "papaparse";

//interface CustomError

/*--------------------------------------------------------------------------------------------*/

let file_txt: string | string[] = ""; // будет содержать в себе временный текст из загруженного фаила
let pages: number = 0;
let text_pages: string[][] = []; // хранит массивы со строками, после разбития на фаилы

const qr_info = find_element<HTMLDivElement>("file_info"); // блок с инфой о фаиле
const qr_name_n = find_element<HTMLElement>("file_info__name", qr_info).children[0] as HTMLElement; // инфа об имяи фаила
const qr_size_n = find_element<HTMLElement>("file_info__QRn", qr_info).children[0] as HTMLElement; // сюда записать кол/во qr кодов (строк) в фаиле
const doc_size_n = find_element<HTMLElement>("file_info__size", qr_info).children[0] as HTMLElement; // инфа о размере фаила (для прикола)
const file_content = find_element<HTMLDivElement>("text_in_file"); // окно, в котором можно посмотреть фаил
const file_content_container = find_element<HTMLDivElement>("text_in_file__container");
const btn_decomp_n = find_element<HTMLInputElement>("js-btn_decomp_n"); // поле для задания максимального количества кодов в фаиле при разбиении
const file_uploader = find_element<HTMLInputElement>("js-file_uploader"); // получаем загрузчик фаила

let custom_spoilers: Addon_spoiler = new Addon_spoiler({});
custom_spoilers.init();

file_uploader.addEventListener("change", file_input); // вешаем на него событие загрузки
file_content.style.display = "none";
qr_info.style.display = "none";
qr_icons.addonIcon_load.icon_off_hand();
qr_icons.addonIcon_chunk.icon_off_hand();

btn_active_deactive(file_uploader, false);
btn_active_deactive(btn_filter, true);
btn_active_deactive(btn_decomp, true);
btn_active_deactive(btn_download, true);
btn_active_deactive(btn_decomp_n, false);

window.addEventListener("new_CustomErrEditor_error", CustomErrEditor_onError as EventListener);

function CustomErrEditor_onError({ detail: err }: CustomEvent<CustomErrEditor_types.IcustomErr>): void {
    if (
        err.type == "read_file_txt" ||
        err.type == "read_file_csv" ||
        err.type == "read_file_csv_final_Step" ||
        err.type == "zip_download_stage"
    ) {
        alert(err.info); // проинформаровать пользователя
        CustomErrEditor.get_error_info(err.type); // обработать эту ошибку
        file_uploader.value = ""; // сбросить открытый фаил для html input (чтобы его можно было повторно открыть)
    }

    if (err.type == "open_file") {
        CustomErrEditor.get_error_info(err.type); // обработать эту ошибку
    }
}

function file_input(e: Event): void {
    // вызывается при загрузке фаила
    // получаем загруженный фаил

    if (typeof ((e.target as HTMLInputElement).files as FileList)[0] == "undefined") {
        new CustomErrEditor({
            type: "open_file",
            duble: false,
            file: new Error(),
            info: "фаил не открыт",
        });
        return;
    }

    const file = ((e.target as HTMLInputElement).files as FileList)[0];
    qr_icons.addonIcon_load.icon_off_hand();
    qr_icons.addonIcon_chunk.icon_off_hand();
    file_txt = "";
    pages = 0;
    text_pages = [];

    if (file.name.includes(".txt")) {
        file_reader_txt(file);
    } else if (file.name.includes(".csv")) {
        file_reader_csv(file);
    }

    doc_size_n.innerHTML = `${Math.ceil(file.size / 1024)} Kb`;
    qr_name_n.innerHTML = file.name;
    qr_name_n.title = file.name;
}

function file_reader_txt(file: File): void {
    // читаем txt фаил
    const reader = new FileReader(); // обьект для работы с фаилом
    reader.readAsText(file);

    reader.onload = () => {
        file_txt = reader.result as string; // считанные данные пишем в переменную
        file_txt = file_txt.split("\n"); // преобразуем в массив, строка - ячейка
        file_check(file_txt); // обновляем содержимое в окне просмотра
        qr_info.style.display = "block"; // делаем видимым блок информации о фаиле
        file_content.style.display = "block"; // включить видимость для окна просмотра документа

        btn_active_deactive(btn_filter, false); // включаем нажимаемость для кнопок
        btn_active_deactive(btn_decomp, false);
        btn_active_deactive(btn_decomp_n, false);
    };

    reader.onerror = () => {
        new CustomErrEditor({
            type: "read_file_txt",
            file: new Error(),
            info: "ошибка при открытии фаила.txt",
        });
    };
}

function file_reader_csv(file: File): void {
    // читаем csv фаил

    const load_step = (row: string[]) => {
        // по завершению чтения строки
        //if (row.length == 2) {                  // затычка для одного исключительного фаила
        //                                        // тут нужно вызвать что-то типа assert
        //    file_txt += row + '\n';             // это убрать
        //}
        if (row.length == 3) {
            file_txt += row[0] + "\t" + row[1] + "\t" + row[2] + "\n";
        } else {
            new CustomErrEditor({
                type: "read_file_csv_step",
                duble: false,
                file: new Error(),
                info: "ошибка при чтении фаила.csv\nСтруктура фаила не соответствует заданному шаблону.",
            });
        }
    };

    const load_comlete = () => {
        // по завершению чтения фаила
        if (!CustomErrEditor.get_error_info("read_file_csv_step")) {
            file_txt = (file_txt as string).split("\n"); // преобразуем в массив, строка - ячейка
            file_txt.pop(); // в конце у нас есть перенос строки а значит, получается новая пустая строка. Удаляем ее.
            file_check(file_txt); // обновляем содержимое в окне просмотра
            qr_info.style.display = "block"; // делаем видимым блок информации о фаиле
            file_content.style.display = "block"; // включить видимость для окна просмотра документа
            btn_active_deactive(btn_filter, false); // включаем нажимаемость для кнопок
            btn_active_deactive(btn_decomp, false);
            btn_active_deactive(btn_decomp_n, false);
        } else {
            doc_size_n.innerHTML = "";
            qr_size_n.innerHTML = "";
            file_content.style.display = "none";
            btn_active_deactive(btn_download, true);
            btn_active_deactive(btn_decomp_n, false);
            new CustomErrEditor({
                type: "read_file_csv_final_Step",
                file: new Error(),
                info: "ошибка при чтении фаила.csv",
            });
        }
    };

    Papa.parse(file, {
        worker: true,
        step: function (results: Papa_types.ParseStepResult<string[]>) {
            load_step(results.data);
        },
        complete: function (results, file) {
            load_comlete();
        },
        error: function (err, file) {
            new CustomErrEditor({
                type: "read_file_csv",
                file: new Error(),
                info: "ошибка при открытии фаила.csv",
            });
        },
        delimitersToGuess: ["\t", "|", Papa.RECORD_SEP, Papa.UNIT_SEP],
    });
}

// заполняет окно просмтора содержимым фаила
function file_check(input: string[]): void {
    const callback = () => {
        qr_icons.addonIcon_load.icon_off();
    };
    const callback_chunk = () => {
        qr_icons.addonIcon_chunk.icon_off();
    };

    file_content_container.innerHTML = `<div class="text_in_file__container">
                                            <xmp class= "text_in_file__text"></xmp>
                                        </div> `.trim();

    let text_cotainer: HTMLElement = file_content_container.querySelector(".text_in_file__text") as HTMLElement;
    if (input.length < 8000) {
        qr_icons.addonIcon_load.icon_on();
        arry_renderer(input, text_cotainer, callback); // отрисоввываем частями
    } else {
        qr_icons.addonIcon_chunk.icon_on();
        arry_renderer_chunk(input, text_cotainer, callback_chunk); // отрисоввываем частями с подгрузкой
    }
    qr_size_n.innerHTML = input.length.toString();
}

// заполняем окно просмотра раскрывающимся текстом (после нажатия кнопки разбить на фаилы)
function file_check_final(input: string[]): void {
    const callback = () => {
        qr_icons.addonIcon_load.icon_off();
    };

    let spoiler_heder_dark: string = Dark_theme.get_dark_theme_state() ? "addon_spoiler_heder--dark" : "";
    let spoiler_body_dark: string = Dark_theme.get_dark_theme_state() ? "addon_spoiler_body--dark" : "";
    let list: HTMLDivElement = document.createElement("div");
    list.className = "text_in_file__content_container";

    /*
         тут я использую тег (plaintext либо xmp) для отображения результата
         аналогичные code/pre не подходят, тк они игнорируют некоторые символы
         а некоторые вообщеподменяют на что попало либо добавля.т какуюто отчебятину
         те теги хоти и все пишут что устаревшие, они отображают текст как есть
         и сохраняют функции спецсимволов \n \t \0 итд 
        */

    //

    list.innerHTML = `<div class="js-addon_spoiler"> 
                        <div class="addon_spoiler_heder ${spoiler_heder_dark}" tabindex="0">
                            <p></p>
                            <div class="addon_spoiler_indicator"></div>
                        </div> 
                        <div class="addon_spoiler_body ${spoiler_body_dark}">
                            <xmp class="final_page"></xmp>
                        </div>
                      </div>`.trim();

    file_content_container.append(list);
    let text_cotainer: HTMLElement = list.querySelector(".final_page") as HTMLElement;
    let text_header: HTMLElement = list.querySelector(".addon_spoiler_heder > p") as HTMLElement;
    qr_icons.addonIcon_load.icon_on();
    arry_renderer(input, text_cotainer, callback);
    text_header.innerHTML = `Document:${pages + 1} codes:${input.length}`;
    pages++;
    qr_info.style.display = "none";
}

export { file_txt, file_content, file_content_container, qr_size_n, file_check, file_check_final, file_uploader, text_pages, btn_decomp_n };
