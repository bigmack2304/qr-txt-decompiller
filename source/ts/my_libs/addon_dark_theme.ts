"use strict";

//  Desc
/*
    класс, позволяет использовать темную тему на странице, по умолчанию
    страница должна быть сверстона в светлой теме, после чего для нужных
    элементов создается (имя--dark) класс. Для нужного элемента с классом,
    должен быть его аналог в --dark варианте.
    При включении темы в класслист для нужных елементов будет добавлятся
    (name--dark) класс. (модификатор если по БЭМу)

    для включения скрипта нкжно гдето импортировать этот скрипт и прописать
    что-то типа этого...

        let Dark_theme = new addon_dark_theme({ classes_dark_style: support_class_dark_theme });

    Сдесь support_class_dark_theme это массив строк, строки - названия классов у
    которых есть модификатор --dark.

    например...

        let support_class_dark_theme = [
            "body",
            "header",
            "main",
            "footer",
        ];

    далее в html нужно добавить кнопку переключения темы, это не обязательно может быть
    кнопка, главное чтобы у этой сущьности был класс 
        
        js-addon_dark_theme_button

    по нажатию на эту сущьность будет менятся цвет темы.

    Тема сохраняется в local storage под переменной qr_decompiller_dark_theme_state

*/

interface IConstructorInput {
    classes_dark_style?: string[];
}

class Addon_dark_theme {
    private _elements_DarkTheme: string[] = []; // классы элементов у которых будет class--dark версия
    private _theme_btn: HTMLButtonElement | null = null; // кнопка переключения темы
    private static _dark_theme_state: boolean = false; // хранит текущее состояние темной темы (вкл выкл)

    constructor({ classes_dark_style = [""] }: IConstructorInput = {}) {
        this._elements_DarkTheme = classes_dark_style; // подгружаем классы с поддержкой темной темы
    }

    public init(): void {
        this._theme_btn = document.querySelector(".js-addon_dark_theme_button");
        if (!this._theme_btn) {
            console.error(`не удалось найти на странице кнопку переключения темы
            по селектору ".js-addon_dark_theme_button"`);
            return;
        }

        Addon_dark_theme._dark_theme_state = this._load_dark_theme_state(); // загружаем состояние темы из локального хранилища
        this._save_dark_theme_state(); // сохраняем повторно состояние переменной (нужно если этой переменной нету в лок.хранилище)
        // по дефолту у нас светлая тема
        if (Addon_dark_theme._dark_theme_state) {
            // если состояние загруженной переменной true
            this._update_styles(); // меняем тему
        }

        this._button_icon_update();
        this._theme_btn.disabled = false; // сделать кнопку нажимаемой (в этом проекте в штмле у нее стоит disabled, это на случай если js не поддерживается, чтобы кнопка не нажималась по умолчанию)
        this._theme_btn.addEventListener("click", this._theme_btn_onClick.bind(this) as EventListener);
    }

    public get_dark_theme_state(): boolean {
        return Addon_dark_theme._dark_theme_state;
    }

    private _load_dark_theme_state(): boolean {
        let state = localStorage.getItem("qr_decompiller_dark_theme_state");

        if (state == null || state == "false") {
            return false;
        }

        return true;
    }

    private _save_dark_theme_state(): void {
        let state = Addon_dark_theme._dark_theme_state ? "true" : "false";
        localStorage.setItem("qr_decompiller_dark_theme_state", state);
    }

    private _theme_btn_onClick(e: PointerEvent): void {
        this._update_styles();
        Addon_dark_theme._dark_theme_state = !Addon_dark_theme._dark_theme_state;
        this._save_dark_theme_state();
        this._button_icon_update();
    }

    private _update_styles(): void {
        let valid_elements: Element[] = [];
        for (let elem of this._elements_DarkTheme) {
            let select = Array.from(document.getElementsByClassName(elem));
            valid_elements = [...valid_elements, ...select];
        }
        this._toggle_classes(valid_elements);
    }

    private _toggle_classes(elements: Element[]): void {
        for (let elem of elements) {
            for (let valid_class of this._elements_DarkTheme) {
                if (elem.classList.contains(String(valid_class))) {
                    elem.classList.toggle(`${valid_class}--dark`);
                    break;
                }
            }
        }
    }

    private _button_icon_update() {
        if (!Addon_dark_theme._dark_theme_state) {
            (this._theme_btn as HTMLButtonElement).value = "white";
        } else {
            (this._theme_btn as HTMLButtonElement).value = "dark";
        }
    }
}

export { Addon_dark_theme };
export type { IConstructorInput };
