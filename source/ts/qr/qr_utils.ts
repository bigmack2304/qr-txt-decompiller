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
    выводит содержимое arry в target.innerHTML не целиком а кусками.
    Каждый элемент массива = строка 
*/

function arry_renderer(arry: string[], target: HTMLElement, callback = () => {}): void {
    let counter: number = 0;
    const MAX_COUNTER: number = arry.length; // максимальное количество отрисоввываемых элементов
    const BLOCK_SIZE: number = 1000; // количество строк за отрисовку

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
        target.innerHTML += str;
    };

    const render_dec = caller_delay_callback(render, callback);

    while (counter < MAX_COUNTER) {
        let block: string = get_block();
        render_dec(block);
    }
}

/*
    выводит содержимое arry в target.innerHTML не целиком а кусками.
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
        target.innerHTML += get_block();
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
    декоратор, позволяет накапливать вызовы функции (func) но при этом осуществлять
    эти вызовы по интервалу асинхронно. 
    После выполнения всего стека вызовов будет вызвана функция (callback) которую
    мы должны указать.
*/

function caller_delay_callback(func: TanyFunc, callback = () => {}): TanyVoidFunc {
    let call_stack: ICallStackElement[] = [];
    const T_DELAY: number = 0;
    let is_start: boolean = false;

    return function caller(...args: any[]): void {
        call_stack.push({ argum: args });

        const func_call = () => {
            if (call_stack.length >= 1) {
                let fun: ICallStackElement = call_stack.shift() as ICallStackElement; // трудоемкая процедура
                func(...fun.argum);
                setTimeout(func_call, T_DELAY);
            } else {
                is_start = false;
                callback();
            }
        };

        if (!is_start) {
            is_start = true; // выставляем флаг работы
            setTimeout(func_call, T_DELAY);
        }
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

export { is_tab, arry_renderer, arry_renderer_chunk, caller_delay_callback, find_element };
export type {};
