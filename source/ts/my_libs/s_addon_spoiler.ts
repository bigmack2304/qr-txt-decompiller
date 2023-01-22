"use strict";

/*
    !!! Подгрузка стилей автоматическая.
    блок раскрывающегося текста - споилер.
    После подключения скрипта необходимо создать экземпляр этого класса,
        конструктор принимает обьект со своиствами
            use_one - открыт может быть только 1 споилер. (при открытии нового, остальные закрываются), false по умолчанию
            def_hide - начальное состояние спойлеров закрытое, true по умолчанию
            resize_upd - обновлять высоту содержимого спойлера при изменении размера экрана, true по умолчанию
    и вызвать init()

    после чего использование спойлеров станет доступно.
    html конструкция спойлера должна быть такой...

    <div class="js-addon_spoiler"> 
        <div class="addon_spoiler_heder" tabindex="0">
            <p></p>
            <div class="addon_spoiler_indicator"></div>
        </div> 
        <div class="addon_spoiler_body">
        </div>
    </div>

    разрешается добавление новых классов.
    при нажатии на addon_spoiler_heder происходит раскрытые addon_spoiler_body
*/

import "../../styles/less/libs/addon_spoiler.less";

interface IConstructorInput {
    use_one?: boolean;
    def_hide?: boolean;
    resize_upd?: boolean;
}

class Addon_spoiler {
    public addon_spoiler_use_one: boolean; // при открытии одного споилера, закрывать остальные открытые
    public addon_spoiler_def_hide: boolean; // все споилеры закрыты по умолчанию
    public addon_spoiler_resize_upd: boolean; // обновлять размер открытого спойлера при изменении размеров окна браузера
    private _get_addon_spoilers: HTMLCollectionOf<Element>; // получить все закрытые _evt_lstr_spoiler_click2 спойлеры

    constructor({ use_one = false, def_hide = true, resize_upd = true }: IConstructorInput = {}) {
        this.addon_spoiler_use_one = use_one; // задаем дефолтные значения для переменных
        this.addon_spoiler_def_hide = def_hide;
        this.addon_spoiler_resize_upd = resize_upd;
        this._get_addon_spoilers = document.getElementsByClassName("js-addon_spoiler"); // получаем живую коллекцию всех спойлеров
    }

    public init(): void {
        let body_element: HTMLBodyElement | null = document.querySelector("body");

        if (body_element) {
            body_element.addEventListener("click", this._evt_lstr_spoiler_click.bind(this) as EventListener); // повесить новый обработчик "клик мышкой" на body
            body_element.addEventListener("keydown", this._evt_lstr_spoiler_keydown.bind(this)); // повесить новый обработчик "выбор enter,ом" на body
        }

        //if (this.addon_spoiler_resize_upd && this._is_object_valid(this._get_addon_spoilers)) {
        if (this.addon_spoiler_resize_upd) {
            // если нужно обновлять размер спойлеров при ресайзе окна и на странице есть спойлеры
            document.addEventListener("DOMContentLoaded", this._evt_lstr_dom_load.bind(this), { once: true }); // повесить новый обработчик "полной загрузки" на DOM
        }

        if (!this.addon_spoiler_def_hide && this._is_object_valid(this._get_addon_spoilers)) {
            // если спойлеры должны быть скрыты и на странице есть спойлеры
            for (let elem of this._get_addon_spoilers as unknown as HTMLElement[]) {
                // обходим все найденные спойлеры
                this._addon_spoiler_use(elem); // выполняем действие при нажатии на спойлер
            }
        }
    }

    private _is_object_valid(obj: HTMLCollectionOf<Element>): boolean {
        return obj.length != 0 ? true : false;
    }

    private _evt_lstr_dom_load(evt: Event) {
        // при загрузке документа
        //document.removeEventListener("DOMContentLoaded", this._evt_lstr_dom_load); // снимаем с него этот слушатель
        window.addEventListener("resize", this._evt_lstr_window_resize.bind(this)); // добавим слушатель события ресайза для окна браузера
    }

    private _evt_lstr_spoiler_click(evt: PointerEvent): void {
        // при событии клик
        let object: HTMLElement | null = (evt.target as HTMLBodyElement).closest(".addon_spoiler_heder"); // из места клика, аытаемся найти элемент addon_spoiler_heder
        if (object) {
            // если нашли
            evt.stopPropagation(); // останавливаем всплытие события
            this._addon_spoiler_on_click(object); // вызываем функцию при клике на addon_spoiler_heder
        }
    }

    private _evt_lstr_spoiler_keydown(evt: KeyboardEvent): void {
        // при событии нажатии клавой
        let object: HTMLElement | null = (evt.target as HTMLBodyElement).closest(".addon_spoiler_heder");
        if (object) {
            evt.stopPropagation();
            if (evt.code == "Enter") this._addon_spoiler_on_click(object);
        }
    }

    private _evt_lstr_window_resize(evt: Event): void {
        // при изменении размера окна браузера
        this._resize_upd();
    }

    private _resize_upd(): void {
        let get_addon_spoiler_active: HTMLCollectionOf<Element> = document.getElementsByClassName("js-addon_spoiler--active"); // получить все открытые спойлеры
        if (get_addon_spoiler_active.length != 0) {
            // если активные споилеры есть
            for (let i = 0; i < get_addon_spoiler_active.length; i++) {
                // обходим все открытые споилеры
                let this_content: HTMLElement = get_addon_spoiler_active[i].lastElementChild as HTMLElement; // получаем обьект контента
                let this_content_height: number = this_content.scrollHeight; // получаем его высоту
                this_content.style.maxHeight = this_content_height + "px"; // задаем параметр максимальной высоты равным его текущей высоте
            }
        }
    }

    private _addon_spoiler_on_click(DOM_obj: HTMLElement): void {
        // когда нажат addon_spoiler_heder
        let get_addon_spoilers_active: HTMLCollectionOf<Element> = document.getElementsByClassName("js-addon_spoiler--active"); // получить все открытые спойлеры (живая коллекция)
        let spoiler_clicked: HTMLElement = DOM_obj.parentElement as HTMLElement; // получитть родителя для addon_spoiler_heder (корень спойлера)

        if (this.addon_spoiler_use_one) {
            // если разрешено использовать только 1 споилер
            for (let i = get_addon_spoilers_active.length - 1; i != -1; i--) {
                // обходим все открытые споилеры, из конца в начало
                if (
                    get_addon_spoilers_active[i] !== spoiler_clicked && // если это не тот споилер по которому был клик
                    !this._check_all_parent_spoiler(spoiler_clicked, get_addon_spoilers_active[i] as HTMLElement)
                ) {
                    // и он не является предком нажатого
                    this._addon_spoiler_use(get_addon_spoilers_active[i] as HTMLElement); // имитируем нажатие по нему (закрываем)
                }
            }
        }
        this._addon_spoiler_use(spoiler_clicked); // закрыть или открыть споилер
    }

    private _addon_spoiler_use(DOM_obj: HTMLElement): void {
        //let is_active: boolean = DOM_obj.classList.contains("js-addon_spoiler--active") ? true : false; // проверяет наличие нужного класса в списке, если он есть значит спойлер открыт
        let is_active: boolean = DOM_obj.classList.contains("js-addon_spoiler--active");
        let object_body: HTMLElement = DOM_obj.lastElementChild as HTMLElement; // обьект с содержимым слайдера
        let object_body_height: number = object_body.scrollHeight; // размер содержимого слайдера, в пикселях
        DOM_obj.classList.toggle("js-addon_spoiler"); // удаляем у родителя класс если он был, если нет то добавляем
        DOM_obj.classList.toggle("js-addon_spoiler--active"); // удаляем у родителя класс если он был, если нет то добавляем

        if (!is_active) {
            // если споилер закрыт
            object_body.style.maxHeight = object_body_height + "px"; // делаем высату для содержимого, равной его размеру
            this._upd_parent_height(DOM_obj, object_body_height);
        } else {
            // если споилер открыт
            object_body.style.maxHeight = "0px"; // делаем высату для содержимого 0
            this._upd_parent_height(DOM_obj, 0);
        }
    }

    private _check_parent_spoiler(obj: HTMLElement): false | HTMLElement {
        // возвращает обьект, если он лежит внутри .js-addon_spoiler--active, иначе false
        let parent_slider: Element | null = obj.closest(".js-addon_spoiler--active");
        if (!parent_slider) {
            return false;
        }
        return parent_slider as HTMLElement;
    }

    private _check_all_parent_spoiler(child: HTMLElement, parent: HTMLElement): boolean {
        // возвращает true если child лежит внутри parent (внутри открытого спойлера)(на любом уровне вложенности)
        let current_child: HTMLElement = child.parentElement as HTMLElement;
        let obj_target: false | HTMLElement = this._check_parent_spoiler(current_child);

        if (obj_target) {
            if (obj_target == parent) {
                return true;
            } else {
                return this._check_all_parent_spoiler(obj_target, parent);
            }
        } else {
            return false;
        }
    }

    private _upd_parent_height(DOM_obj: HTMLElement, old_size: number): void {
        while (this._check_parent_spoiler(DOM_obj.parentElement as HTMLElement)) {
            DOM_obj = this._check_parent_spoiler(DOM_obj.parentElement as HTMLElement) as HTMLElement;
            (DOM_obj.lastElementChild as HTMLElement).style.maxHeight =
                (DOM_obj.lastElementChild as HTMLElement).scrollHeight + old_size + "px";
            old_size = (DOM_obj.lastElementChild as HTMLElement).scrollHeight + old_size;
        }
    }
}

export { Addon_spoiler };
export type { IConstructorInput };
