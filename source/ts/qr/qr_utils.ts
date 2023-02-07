"use strict";

type TobjectSizedElement = boolean | number | string | IobjectSized;
type TanyFunc = (...args: any[]) => any;
type TanyVoidFunc = (...args: any[]) => void;

interface ICallStackElement {
    argum: any[];
}

interface IobjectSized {
    [idx: string]: TobjectSizedElement;
}

// возвращать индекс табудяции, либо конец строки
function is_tab(str: string): number {
    let idx = str.indexOf("\t");
    if (idx != -1) {
        return idx;
    } else {
        return str.length;
    }
}

/* 
    выводит содержимое arry в target.textContent не целиком а кусками.
    Каждый элемент массива = строка 
*/

function arry_renderer(arry: string[], target: HTMLElement, callback = () => {}): void {
    let counter: number = 0;
    const MAX_COUNTER: number = arry.length; // максимальное количество отрисоввываемых элементов
    const BLOCK_SIZE: number = 500; // количество строк за отрисовку

    const get_block = () => {
        let temp: string = "";
        for (let i = 0; counter < MAX_COUNTER && i < BLOCK_SIZE; ) {
            temp += `${arry[counter]}\n`;
            counter++;
            i++;
        }
        return temp;
    };

    const render = (str: string) => {
        target.textContent += str;
    };

    const render_dec = caller_delay_callback(render, callback);

    while (counter < MAX_COUNTER) {
        let block: string = get_block();
        render_dec(block);
    }
}

/*
    помещает каждый элемент arry в свой pre тег, получившийся набор pre елементов ложит в target
 */
function arry_renderer_pre_container(arry: string[], target: HTMLElement, container_className: string, callback = () => {}): void {
    let counter: number = 0;
    const MAX_COUNTER: number = arry.length; // максимальное количество отрисоввываемых элементов
    const BLOCK_SIZE: number = 500; // количество строк за отрисовку

    function get_block_fragment(): DocumentFragment {
        let fragment = new DocumentFragment(); // создаем DocumentFragment

        for (let i = 0; counter < MAX_COUNTER && i < BLOCK_SIZE; ) {
            const pre_element = document.createElement("pre"); // создаем элемент
            pre_element.className = container_className;
            pre_element.textContent = arry[counter];
            fragment.append(pre_element);
            counter++;
            i++;
        }

        return fragment; // возвращаем обертку
    }

    const render = (fragment: DocumentFragment) => {
        target.append(fragment);
    };

    const render_dec = caller_delay_callback(render, callback);

    while (counter < MAX_COUNTER) {
        let block: DocumentFragment = get_block_fragment();
        render_dec(block);
    }
}

/*
    выводит содержимое arry в target.textContent не целиком а кусками.
    эти куски будут добавлятся по мере приблежения скролла к краю не отрисованной
    части.
    Каждый элемент массива = строка 
*/

function arry_renderer_chunk(arry: string[], target: HTMLElement, callback = () => {}): void {
    let counter: number = 0; // счетчик отрисованных строк
    const MAX_COUNTER: number = arry.length; // максимальное количество отрисоввываемых элементов
    const BLOCK_SIZE: number = 500; // количество строк за отрисовку
    const HEIGHT_TO_RENDERER: number = 2500; // количество пикселей от текущего скролла до низа элемента, менее которого элемент продолжит рендерится.
    let fake_block: HTMLElement = document.createElement("div");

    const get_block = () => {
        let temp: string = "";
        for (let i = 0; counter < MAX_COUNTER && i < BLOCK_SIZE; ) {
            temp += `${arry[counter]}\n`;
            counter++;
            i++;
        }
        return temp;
    };

    const scrollEnded = () => {
        window.removeEventListener("window_scroll_reset", scrollEnded);
        observer.disconnect();
        fake_block.remove();
        callback();
    };

    const frame = () => {
        target.textContent += get_block();
        if (counter >= MAX_COUNTER) {
            scrollEnded();
        }
    };

    let observer: IntersectionObserver = new IntersectionObserver(frame, {
        rootMargin: `0px 0px ${HEIGHT_TO_RENDERER}px 0px`,
        threshold: 0.05,
    });

    window.addEventListener("window_scroll_reset", scrollEnded);
    document.body.append(fake_block);
    observer.observe(fake_block);
}

/* 

    декоратор, не позволяет вызывать функцию непрерывно, вместо этого накопливает параметры вызовов
    функции (func) и по интервалу delay вызывает func асинхронно столько раз сколько мы ее вызывали, с темиже параметрами.

    После выполнения всего стека вызовов будет вызвана функция (callback) которую
    мы должны указать.
*/

function caller_delay_callback<T extends TanyFunc>(func: T, callback = () => {}, delay: number = 0) {
    let call_stack: ICallStackElement[] = [];
    let is_start: boolean = false;

    return function caller(...args: Parameters<T>): void {
        call_stack.push({ argum: args });

        const func_call = () => {
            if (call_stack.length >= 1) {
                let { argum } = call_stack.shift() as ICallStackElement; // трудоемкая процедура
                func(...argum);
                setTimeout(func_call, delay);
            } else {
                is_start = false;
                callback();
            }
        };

        if (!is_start) {
            is_start = true; // выставляем флаг работы
            setTimeout(func_call, delay);
        }
    };
}

/*
    не позволяет вызывать функцию непрерывно, вместо этого вызывает функцию с последними переданными аргументами
    delay это милисекунды в течении которых вызов функции будет обновлять последние переданные аргументы
    и сбрасывать delay

    После выполнения оборачиваемой функции будет вызвана функция (callback) которую
    мы должны указать.
*/

function first_caller_delay_callback<T extends TanyFunc>(func: T, callback = () => {}, delay: number = 0) {
    let call_stack: ICallStackElement;
    let is_start: boolean = false;
    let timer_id: any = 0;

    return function caller(...args: Parameters<T>): void {
        call_stack = { argum: args };

        const func_call = () => {
            let { argum } = call_stack as ICallStackElement; // трудоемкая процедура
            func(...argum);
            is_start = false;
            callback();
        };

        if (is_start) {
            clearTimeout(timer_id);
        }

        is_start = true; // выставляем флаг работы
        timer_id = setTimeout(func_call, delay);
    };
}

/*
    декоратор, не позволяет вызывать функцию непрерывно, вместо этого функция будет вызыватся с 
    задержкой delay ms, с последними переданными параметрами функции
    вызов функции до истечения delay приведет к обновлению переданных ранее параметров на новые.

    После выполнения оборачиваемой функции будет вызвана функция (callback) которую
    мы должны указать.
*/

function low_update_decorator<T extends TanyFunc>(func: T, callback = () => {}, delay: number = 100) {
    let call_stack: ICallStackElement;
    let is_start: boolean = false;

    return function caller(...args: Parameters<T>): void {
        call_stack = { argum: args };

        if (is_start) {
            return;
        }

        const func_call = () => {
            let { argum } = call_stack as ICallStackElement; // трудоемкая процедура
            func(...argum);
            is_start = false;
            callback();
        };

        is_start = true; // выставляем флаг работы
        setTimeout(func_call, delay);
    };
}

/* ищет элемент по указанному классу, если не находит бросает исключение */
function find_element<T>(HtmlClassName: string, root: Document | HTMLElement = document): T {
    let selector: T | null = root.querySelector(`.${HtmlClassName}`) as T;
    if (selector) {
        return selector;
    } else {
        throw new Error(`selector '.${HtmlClassName}' not fund in HTML`);
    }
}

/*
    возврощает true если ширина окна менее 440px
*/
function is_mobile_screen(): boolean {
    return window.innerWidth >= 440 ? false : true;
}

/*
    возврощает true если на устройстве мультитач
    (для пк в 98% вернет false, тк мало у кого сенсорный экран)
*/
function is_multiTuch(): boolean {
    if (window.navigator.maxTouchPoints > 1) {
        return true;
    }
    return false;
}

/*
    Попытка определить мобильное устройство.
    true если это мобила
    PS: метод не самый лучший, но для начала сойдет
*/

function is_device_mobile() {
    return is_mobile_screen() || is_multiTuch() ? true : false;
}

export {
    is_tab,
    arry_renderer,
    arry_renderer_chunk,
    caller_delay_callback,
    find_element,
    arry_renderer_pre_container,
    first_caller_delay_callback,
    is_mobile_screen,
    is_multiTuch,
    is_device_mobile,
    low_update_decorator,
};
export type {};
