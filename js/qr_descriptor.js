'use strict';

let file_txt;                                                                           // будет содержать в себе временный текст из загруженного фаила
let pages = 0;

const qr_info = document.getElementsByClassName("file_info")[0];                        // блок с инфой о фаиле
qr_info.style.display = 'none';                                                         // лучше сразу его скроем (по умолчанию)

const qr_size_n = document.getElementsByClassName("file_info__QRn")[0].children[0];            // сюда записать кол/во qr кодов (строк) в фаиле
const doc_size_n = document.getElementsByClassName("file_info__size")[0].children[0];          // инфа о размере фаила (для прикола)
const file_wath = document.getElementsByClassName("text_in_file");                             // окно, в котором можно посмотреть фаил

const btn_filter = document.getElementsByClassName("btn_filter_qr");            // кнопка удалить лишнее
if (btn_filter.length >= 1) {
    btn_filter[0].addEventListener ('click', evt_lstr_click_btn_filter);                         
}

const btn_decomp = document.getElementsByClassName("btn_decomp");               // кнопка разбить на фаилы
if (btn_decomp.length >= 1) {
    btn_decomp[0].addEventListener ('click', evt_lstr_click_btn_decomp);                         
}

const btn_download = document.getElementsByClassName("btn_download");           // кнопка скачать
if (btn_download.length >= 1) {
    btn_download[0].addEventListener ('click', evt_lstr_click_btn_download);                             
}

// выключаем нажимаемость для определенных кнопок
btn_active_deactive(btn_filter[0], true);
btn_active_deactive(btn_decomp[0], true);
btn_active_deactive(btn_download[0], true);

const reader = new FileReader();                                                // обьект для работы с фаилом
const file_uploader = document.getElementsByClassName("js-file_uploader");      // получаем хагрузчик фаила
if (file_uploader.length >= 1) {
    file_uploader[0].addEventListener ('change', evt_lstr_change_file_uploader);    // вешаем на него событие загрузки
}


function evt_lstr_click_btn_filter(evt) {
    btn_filter_klick(evt);
}

function evt_lstr_click_btn_decomp(evt) {
    btn_decomp_klick(evt);
}

function evt_lstr_click_btn_download(evt) {
    btn_download_klick(evt);
}

function evt_lstr_change_file_uploader(evt) {
    file_input(evt);
}


function file_input(obj) {                                                      // вызывается при загрузке фаила
    const file = obj.target.files[0];
    reader.readAsText(file);

    reader.onload = () => {
        file_txt = reader.result;                               // считанные данные пишем в переменную
        file_txt = file_txt.split("\n");                        // преобразуем в массив, строка - ячейка
        file_check(file_txt);                                   // обновляем содержимое в окне просмотра
        qr_info.style.display = 'block';                        // делаем видимым блок информации о фаиле

        btn_active_deactive(btn_filter[0], false);              // включаем нажимаемость для кнопок
        btn_active_deactive(btn_decomp[0], false);
        btn_active_deactive(btn_download[0], false);     
        pages = 0; 
    }

    reader.onerror = () => {
        alert("Ошибка чтения фаила");
    }

}

function btn_filter_klick () {                                              // удалить лишнее
    if (file_txt != undefined) {
       // обновить переменную, тк в ней почемуто не сохранились переносы мтрок 
       file_txt = document.getElementsByClassName("text_in_file__text")[0].innerHTML;
       file_txt = file_txt.split("\n");   
       // обрабатываем каждую строку
        for (let i=0; i < file_txt.length; i++) {
            file_txt[i] = file_txt[i].slice(0, is_tab(file_txt[i]));        // удаляем все после таба
            if (file_txt[i] == '') {
                file_txt.splice(i);
            }
        }

       file_check(file_txt);
    } else {
        alert("Нужно сначала открыть фаил");
    }
}

function btn_decomp_klick() {
    if (file_txt != undefined) {
        const need_qr = document.getElementsByClassName("btn_decomp_n")[0].value;       // сколько должно быть qr кодов в фаиле
        const need_docs = Math.ceil(Number(qr_size_n.innerText)/need_qr);               // щитаем сколько нам понадобится страниц
        file_wath[0].innerHTML = "";
        let file_txt_i = 0;

        for (let i=0; i < need_docs; i++) {
            let arry_temp = [];
            for (let k=0; k < need_qr; k++) {
                if (file_txt[file_txt_i] != undefined) {
                    arry_temp.push(file_txt[file_txt_i]);
                    file_txt_i++;

                    if (file_txt[file_txt_i] != '') {
                        //  file_txt[i] = file_txt[i].concat("\n");
                      } else {
                          file_txt.splice(i);
                      }

                } else {
                    break;
                }
            }
            file_check_final(arry_temp);
        }
   //     addon_spoiler_start_script();
    } else {
        alert("Нужно сначала открыть фаил");
    }

    btn_active_deactive(btn_filter[0], true);
    btn_active_deactive(btn_decomp[0], true);
    btn_active_deactive(btn_download[0], false);
}

function btn_download_klick() {
   // let pages = document.getElementsByClassName("text_in_file__text");
    let pages = document.getElementsByClassName("final_page");
    let zip = new JSZip();                     // создаем новый архив                

    for (let i=0; i < pages.length; i++) {
	    let text = pages[i].innerText;
        if (text.endsWith("\n")) {
            text =text.slice(0, text.length-1);
        }

        zip.file('QR_page_' + (i + 1) + '__' + (((text.match(new RegExp("\n", "g")) || []).length) + 1) + '.txt', text);          // генерируем имя для фаила
    }

     zip.generateAsync({type:"blob"}).then(function(content) {
        saveAs(content, "QR_pages.zip");
    });

}

function is_tab(str) {
    // возвращать индекс табудяции, либо конец строки
    let idx = str.indexOf('\t');
    if (idx != -1) {
        return idx;
    } else {
        return (str.length);
    }
}

function is_space(str) {
    // возвращать индекс пробела, либо конец строки
    let idx = str.indexOf('\ ');
    if (idx != -1) {
        return idx;
    } else {
        return (str.length);
    }
}

function file_check(input) {
    const thread_2 = new Promise((resolve, reject) => {
        let temp = "";
        for (let i=0; i < input.length; i++) {
           temp += input[i].concat("\n");
        }
        resolve(temp);
    });

    thread_2
        .then((data) => {
            file_wath[0].innerHTML = '<div class="text_in_file__container"><plaintext class= "text_in_file__text">';
            let text_cotainer = document.getElementsByClassName("text_in_file__text");
            text_cotainer[0].innerHTML = data;
            qr_size_n.innerHTML = input.length;
            doc_size_n.innerHTML = "~ " + roughSizeOfObject(input) / 1000 + " kb";

        })
        .catch((error) => {
            console.log("thread_2 error");
        });

}

// заполняем окно просмотра разделенными страницами с содержанием
function file_check_final(input) {
    const thread_3 = new Promise((resolve, reject) => {
        let temp = "";
        for (let i=0; i < input.length; i++) {
            temp += input[i].concat("\n");
        } 
        resolve(temp);
    });

    thread_3
    .then((data) => {
        let list = document.createElement('div');
        list.className = "text_in_file__container";

        /*
         тут я использую тег (plaintext либо xmp) для отображения результата
         аналогичные code/pre не подходят, тк они игнорируют некоторые символы
         а некоторые вообщеподменяют на что попало либо добавля.т какуюто отчебятину
         те теги хоти и все пишут что устаревшие, они отображают текст как есть
         и сохраняют функции спецсимволов \n \t \0 итд 
        */

        list.innerHTML = '<div class="js-addon_spoiler"> <div class="addon_spoiler_heder" tabindex="0"> <p></p> <div class="addon_spoiler_indicator"></div> </div> <div class="addon_spoiler_body"> <plaintext class="final_page">';
        //list.innerHTML = '<div class="js-addon_spoiler"> <div class="addon_spoiler_heder" tabindex="0"> <p></p> <div class="addon_spoiler_indicator"></div> </div> <div class="addon_spoiler_body"> <xmp class="final_page"> </xmp> </div> </div>';
        file_wath[0].append(list); 
        let text_cotainer = file_wath[0].lastChild.children[0].children[1].children[0];
        text_cotainer.innerHTML = data;
        text_cotainer = file_wath[0].lastChild.children[0].children[0].children[0];
        text_cotainer.innerHTML = 'Document:' + (pages + 1) + ' codes:' + ((data.match(new RegExp("\n", "g")) || []).length);
        pages++;

        //(data.match(new RegExp("\n", "g")) || []).length
        // нельзя использовать addEventListener с одним и темже событием для одного и тогоже обьекта несколько раз
        // иначе оно будет сробатывать несколько раз!
        addon_spoiler_start_script();
        qr_info.style.display = 'none';      
    })
    .catch((error) => {
        console.log("thread_3 error");
    });
}

// активатор кнопок (обьект кнопки, true = деактевировать)
function btn_active_deactive(btn, mode) {
    btn.disabled = mode;
    (mode == true) ? (btn.classList.add("deactivated")) : (btn.classList.remove("deactivated"));
} 

// возвращает размер обьекта
function roughSizeOfObject(object) {
    var objectList = [];
    var stack = [object];
    var bytes = 0;
    while (stack.length) {
        var value = stack.pop();
        if (typeof value === 'boolean') {
            bytes += 4;
        }
        else if (typeof value === 'string') {
            bytes += value.length * 2;
        }
        else if (typeof value === 'number') {
            bytes += 8;
        }
        else if (typeof value === 'object' && objectList.indexOf(value) === -1) {
            objectList.push(value);
            for(var i in value) {
                stack.push(value[i]);
            }
        }
    }
    return bytes;
}