"use strict";

/*
    класс описывающий иконку отображающую текущее состояние.
    в constructor необходимо передать ссылку на некий блок в DOM дереве, который получит новое поведение
      и 2м параметром передать название иконки которою будет применятся в нутри класса конкретно для
      этой иконки, для помощи при дебаге.

    После создания экземпляра таково класса, у него можно вызывать методы которые будут влиять
    на соответствующий элемент в DOM дереве.

    icon_on         // отобразить иконку. (возможен многократный вызов)
    icon_off        // команда "скрыть иконку", скроет только если вызвать этот метод столькоже раз, сколько раз
                        // был вызван icon_on. Тоесть если вызвать icon_on 3 раза, то чтобы скрыть иконку мы должны 
                        // вызвать этот метод не менее 3х раз.
    icon_off_hand   // принудительное скрытие иконки. 
    get_name        // возвращает имя иконке, переданное в конструктор при создании
*/

class AddonIcon {
    private _icon: HTMLElement | null;
    private _name: string = "";
    private _calls_count: number = 0;

    constructor(DOM_obj: HTMLElement, name: string) {
        this._icon = DOM_obj;
        this._name = name;
    }

    private _is_icon(icon: HTMLElement | null): icon is HTMLElement {
        if (icon instanceof HTMLElement) {
            return true;
        }
        return false;
    }

    public icon_off_hand(): void {
        if (this._is_icon(this._icon)) {
            this._icon.style.display = "none";
            this._calls_count = 0;
        }
    }

    public icon_off(): void {
        if (this._is_icon(this._icon)) {
            if (this._calls_count >= 1) {
                // защита от лишних дикрементов, чтобы щечик не ушел в -
                this._calls_count = this._calls_count - 1; // если использовать дикримент то TSC не расценивает это как использование переменной

                if (this._calls_count <= 0) {
                    this._icon.style.display = "none";
                }
            }
        } else {
            console.error(`Not icon: ${this._name}`);
        }
    }

    public icon_on(): void {
        if (this._is_icon(this._icon)) {
            this._icon.style.display = "block";
            this._calls_count = this._calls_count + 1;
        } else {
            console.error(`Not icon: ${this._name}`);
        }
    }

    public get_name(): string {
        return this._name;
    }
}

export { AddonIcon };
export type {};
