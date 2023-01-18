"use strict";

/////////////////////////////////////////////////////////////////////////////////////////////
/*  versions

    0.1 - соновной функционал
    0.2 - добавлен метод .get_AllError_info()
    0.3 - применена методика деструктуризации при вызове
          конструктора ошибки. Это сделает его вызов более гибким.
        - вызов alert отключен по умолчанию
	0.4 - добавлен колбек on_error, на создание ошибки

*/

/*  Desc

            - Класс позволяет создавать и накапливать ошибки. 
            - Каждая ошибка имеет 4 поля, которые нужно заполнять вручную при обьявлении ошибки.

                1.(string) (type:) тип. Он может быть как уникальным для каждой ошибки так и повторяющимся
                если у нескольких ошибок будет одинаковый тип то при обработке ошибок таково типа
                пудет выведены все ошибки таково типа.

                2.(bool) (true\false). Если true то можно будет записать эту ошибку даже если ошибки с таким типом уже есть,
                если false то эта ошибка не будет записана если ошибки с таким типом уже есть.
                Может пригодится если мы обьявляем ошибку в цыкле.

                3. место, (file:) задумано что это тоже будет string хотя поидее может быть и другой тип данных.
                Это поле хранит информацию о месте или фаиле в котором произошла ошибка.

                4. (info:) описание ошибки. Это поле говорит само за себя. Также задумано что это string, хоть и не обязательно.

            Ошибки можно обьявлять в любом месте кода и сколько угодно, при обьявлении они будут помещятся в
            приватный стек, расположенный внутри класса и хранится они будут там до тех пор пока мы их не обработаем.

            - Обработчик ошибок ищет и обрабатывает их по их типу (подробнее выше), вызвать обработчик можно влюбое время
            в любом месте. После его работы, обработанные ошибки удаляются из стека. В любом случае обработчик возвращает 
            true если хоть одна ошибка была обработана, либо false если ни одной ошибки обработано небыло.

            - Доп.функция обработчика ошибок. Обработчик лиш ищет нужные ошибки и после удаляет их из стека. Анализом ошибок занимается
            по умолчанию встроенная функция которая высылает всю информацию об ошибке в консоль и вызывает alert если он разрешен.
            Эту функцию можно переопределить, передав ее в вызов обработчика 2ым аргументом. Такая функция будет принемать аргумент
            1 обьект, { type: , file: , info: }
*/

/*  Metods

    // создание ошибки происходит вызовом такой конструкции, порядок параметров может быть другим.
      new CustomErrEditor({     type: 12,                   // НЕ ОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР. ПО УМОЛЧАНИЮ "test_err"    / Тип ошибки к которому мы можем ее отнести
                                file: new Error(),          // НЕ ОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР. ПО УМОЛЧАНИЮ ""            / данный способ покажет место где была вызвана ошибка, но также можно и ввести любую строку
                                info: "тестовое описание",  // НЕ ОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР. ПО УМОЛЧАНИЮ ""            / описание ошибки
                                duble = true,               // НЕ ОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР. ПО УМОЛЧАНИЮ true.         / разрешает добавление этой ошибки в стек, если там уже есть ошибки с таким типом
                          });


      CustomErrEditor.set_alert_mode(false);                  // запретить вызов alert при стандартной функции обработки ошибки. По умолчанию разрешено. 

    CustomErrEditor.get_error_info(type, func);             // вызов обработчика ошибок
                                                            // type - ошибки каково типа нужно обработать. По умолчанию = "test_err" 
                                                            // func - альтернативная вункция для обработки ошибок (по умолчанию используется стандартная, этот аргумент можно не указывать)
    CustomErrEditor.get_AllError_info();                    // тоже самое что и get_error_info, только выводит все ошибки.
                                                            // также поддерживает аргумент func

    Добавлена генерация события new_CustomErrEditor_error у window в момент создания ошибки
    Вся информация об ошибке записывается в обьект в поле detail

        window.addEventListener("new_CustomErrEditor_error", CustomErrEditor_onError);      // создаем слушатель этого события
        
        function CustomErrEditor_onError(evt) {                                             // функция при срабатывании события
            let err = evt.detail;                                                           // получаем конкретно ошибку
            
            
            ...далее ваш код...


            if (err.type == "open_file") {                              // проверка на тип ошибки
                CustomErrEditor.get_error_info(err.type);               // обработать эту ошибку
            }
        }
*/

/*  Example

    a();                                    // запускаем скрипт                     

    function custom_error_list(obj) {       // альтернативная функция для обработки ошибки (obj = {type, file, info})
        console.log(obj);                   // > {type:'lol', file:'text3.txt', info:'тестик 1'}
                                            // > {type:'lol', file:'text3.txt', info:'тестик 3'}
    }

    function a() {
        b();
        c();
        d();

    // будем искать ошибки с типом "lol"
    // используем свою функцию для обработки ошибок
        if (CustomErrEditor.get_error_info("lol", custom_error_list)) {

    // используем стандартную функцию для обработки ошибок
        if (CustomErrEditor.get_error_info("lol")) {
            console.log("ошибки есть");                     //   > ERROR
	                                                        //   >    Type:	lol
	                                                        //   >    Target:	text1.txt
	                                                        //   >    Desc:	тестик 1
	                                                        //   > ERROR
	                                                        //   >    Type:	lol
	                                                        //   >    Target:	text3.txt
	                                                        //   >    Desc:	тестик 3
                                                            //   > ошибки есть
        } else {
            console.log("ошибок нет");
        }
    }

    function b() {
        new CustomErrEditor("lol", true, "text1.txt", "тестик 1");        // создаем ошибку
    }

    function c() {
        new CustomErrEditor("kek", true,"text2.txt", "тестик 2");        // создаем ошибку
    }

    function d() {
        new CustomErrEditor("lol", true,"text3.txt", "тестик 3");        // создаем ошибку
    }

*/
/////////////////////////////////////////////////////////////////////////////////////////////

interface IcustomErr {
    type: string;
    file: string | Error;
    info: string;
}

interface IConstructorInput {
    duble?: boolean;
    type?: string;
    file?: string | Error;
    info?: string;
}

type TfileElement = string | string[] | Error;

type TfuncHandler = {
    (...args: any[]): any;
};

////////////////////////////////////////////////////////////////////////////////////////////////

class CustomErrEditor {
    private static _err_stak: IcustomErr[] = []; // стек ошибок
    private static _alert_enable: boolean = false; // вызов всплывающего окна в браузере при обработке ошибки (alert)

    constructor({ type = "test_err", duble = true, file = "", info = "" }: IConstructorInput = {}) {
        // конструктор

        const add_obj_to_stack = (): void => {
            CustomErrEditor._err_stak.push({
                type: type, // создаем обьект ошибки и закидываем его в private static массив
                file: file,
                info: info,
            });
        };

        if (duble === true) {
            // если дублирование разрешено
            add_obj_to_stack();
            // CustomErrEditor.on_error(CustomErrEditor.#_err_stak.at(-1));
            window.dispatchEvent(new CustomEvent<IcustomErr>("new_CustomErrEditor_error", { detail: CustomErrEditor._err_stak.at(-1) }));
        } else if (duble === false) {
            // если дублирование запрещено
            const check_dublicat = (): boolean => {
                for (let elem of CustomErrEditor._err_stak) {
                    if (elem.type == type) {
                        return true;
                    }
                }
                return false;
            };

            if (!check_dublicat()) {
                add_obj_to_stack();
                //   CustomErrEditor.on_error(CustomErrEditor.#_err_stak.at(-1));
                window.dispatchEvent(
                    new CustomEvent<IcustomErr>("new_CustomErrEditor_error", { detail: CustomErrEditor._err_stak.at(-1) })
                );
            }
        }
    }

    private static _print_err(obj: IcustomErr): void {
        // обработчик ошибки, на вход поступает обьект ошибки

        let Read_file: TfileElement = obj.file; // читаем поле с описанием проблемного места

        if (typeof Read_file == "object") {
            // если это обьект
            if (Read_file.stack?.indexOf("Error") == 0) {
                // проверим что у него есть поле stack и в нем в начале есть "Error"
                Read_file = Read_file.stack; // значит мы использовали file: new Error() при создании ошибки, получаем доступ к строке
                Read_file = Read_file.split("\n"); // разбить строку на массив, по разделителю "\n"
                Read_file = Read_file.map((item, index, array) => {
                    // вызываем функцию для каждого элемента
                    if (index <= 4) {
                        // так мы ограничиваем отображаемый стек вызовов, не более 4
                        return index == 1 ? `${item.trim()}` : `\t\t${item.trim()}`; // добавлю пару табуляций в начале для красоты
                    }
                    return "";
                });
                Read_file = Read_file.slice(1).join("\n").trim(); // вернуть копию массива с позиции 1 (без ячейки с "error") и конвертировать его в строку, с разделителем "\n", удалить пробелы в начале и в конце
            }
        }
        // генерим текст сообщения
        const gen_desc = "\t" + "Type:\t" + obj.type + "\n\n\t" + "File:\t" + Read_file + "\n\n\t" + "Info:\t" + obj.info;
        console.error("ERROR\n" + gen_desc + "\n"); // выкидываем его в консоль
        if (CustomErrEditor._alert_enable) {
            // если разрешен alert
            alert("ERROR: " + obj.info); // делаем alert с основной информацией
        }
    }

    public static get_error_info(need_type: string = "test_err", func: TfuncHandler = CustomErrEditor._print_err): boolean {
        // обработка ошибок нужного типа, вункция обработчика
        let err_index_del: number[] = []; // хранит индексы обработанных ошибок

        CustomErrEditor._err_stak.forEach((elem) => {
            // обходим стек ошибок, ищим ошибки указанного типа
            if (elem.type == need_type) {
                // если тип совпал
                func(elem); // обрабатываем эту ошибку
                err_index_del.push(CustomErrEditor._err_stak.indexOf(elem)); // запоменаем индекс этой ошибки в стеке
            }
        });

        if (err_index_del.length != 0) {
            // если у нас есть обработанные ошибки
            while (err_index_del.length != 0) {
                // начинаем извлекать индексы ошибок с конца массива,
                CustomErrEditor._err_stak.splice(err_index_del.pop() as number, 1); // таким образом, удаляя из стека обработанные ошибки
            } // из конца к началу. (тк при удалении элемента из массива, у всех
            // элементов следующих за ним сбивается индекс)
            return true; // по завершению возвращаем true
        }
        return false; // если не обработали не одной ошибки, вернем false
    }

    public static get_AllError_info(func: TfuncHandler = CustomErrEditor._print_err): boolean {
        if (CustomErrEditor._err_stak.length != 0) {
            CustomErrEditor._err_stak.forEach((elem) => {
                func(elem);
            });

            CustomErrEditor._err_stak.splice(0, CustomErrEditor._err_stak.length);
            return true;
        }
        return false;
    }

    public static set_alert_mode(mode: boolean = true): void {
        // можно включить или выключить alert при обработке ошибки
        CustomErrEditor._alert_enable = mode;
    }
}

export { CustomErrEditor };
export type { IcustomErr, TfuncHandler, IConstructorInput };
