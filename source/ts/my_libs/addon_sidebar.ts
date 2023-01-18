"use strict";

class Addon_sidebar {
    private _MEDIA_MOBILE_SIZE: number = 440; // ширина вьюпорта в пикселях, с которого мы щитаем что это мобила, взято из СSS
    private _object_sidebar_btn: HTMLElement | null = null; // кеопка открытия саидбара
    private _sidebar: HTMLElement | null = null;

    constructor() {}

    public init(): void {
        this._object_sidebar_btn = document.querySelector(".js-sidebar_button[data-button_id]");
        if (!this._object_sidebar_btn) {
            console.error(`Не удалось найти элемент по указанному селектору:
            ".js-sidebar_button[data-button_id]", дальнейшая инициализация приостановлена`);
            return;
        }

        this._sidebar = document.querySelector(`.js-sidebar[data-sidebar_id='${this._object_sidebar_btn.dataset.button_id}']`);
        if (!this._sidebar) {
            console.error(`Не удалось найти элемент по указанному селектору:
            ".js-sidebar[data-sidebar_id=${this._object_sidebar_btn.dataset.button_id}",
             дальнейшая инициализация приостановлена`);
            return;
        }

        // this._object_sidebar_btn.addEventListener("click", this._sidebar_on_click.bind(this) as EventListener);
        // this._sidebar.addEventListener("click", this._sidebar_on_click.bind(this) as EventListener);
        document.body.addEventListener("click", this._sidebar_on_click.bind(this) as EventListener);
        window.addEventListener("resize", this._winResize.bind(this));
    }

    private _winResize(e: Event): void {
        let window_width: number = (e.target as Window).innerWidth;

        if (window_width >= this._MEDIA_MOBILE_SIZE) {
            this._close_sidebar();
            this._body_scroll_remove(false);
        }
    }

    private _sidebar_on_click(e: PointerEvent): void {
        let is_sidebar_open: boolean = (this._sidebar as HTMLElement).classList.contains("js-sidebar--active");
        const selector_button: string = `.js-sidebar_button[data-button_id='${
            (this._object_sidebar_btn as HTMLElement).dataset.button_id
        }']`;
        const condition_1 = (e.target as HTMLElement).classList.contains("js-sidebar");
        const condition_2 = (e.target as HTMLElement).dataset.sidebar_id == (this._object_sidebar_btn as HTMLElement).dataset.button_id;
        const condition_3 = (e.target as HTMLElement).closest(selector_button);

        if ((condition_1 && condition_2) || condition_3) {
            if (!is_sidebar_open) {
                this._open_sidebar();
            } else {
                this._close_sidebar();
            }
            this._body_scroll_remove(!is_sidebar_open);
        }
    }

    private _body_scroll_remove(val: boolean): void {
        let body_element = document.querySelector("body");
        if (body_element) {
            if (val) {
                body_element.classList.add("scroll_remove");
            } else {
                body_element.classList.remove("scroll_remove");
            }
        }
    }

    private _open_sidebar(): void {
        if (this._object_sidebar_btn && this._sidebar) {
            this._sidebar.classList.add("js-sidebar--active");
            this._object_sidebar_btn.classList.add("js-sidebar_button--active");
            this._sidebar.children[1].classList.add("js-sidebar__elements--active");
        }
    }

    private _close_sidebar(): void {
        if (this._object_sidebar_btn && this._sidebar) {
            this._sidebar.classList.remove("js-sidebar--active");
            this._object_sidebar_btn.classList.remove("js-sidebar_button--active");
            this._sidebar.children[1].classList.remove("js-sidebar__elements--active");
        }
    }
}

export { Addon_sidebar };
