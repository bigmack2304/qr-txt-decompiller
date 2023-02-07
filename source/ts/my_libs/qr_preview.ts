import { find_element, first_caller_delay_callback, is_device_mobile } from "./../qr/qr_utils";
import { DATAMatrix } from "../../js/libs/datamatrix";

import "./../../styles/less/libs/modal_qr_preview.less";

/*
    !!! стили подгружаются автоматически
   компонент, позволяет создавать динамическое окошко которое будет перемещатся за курсором
   и в нутри будет рендерится qr код, в нем будет закодировоно сообщение которое мы также указываем.
   Окно может быть и статическим.

   установка:
    1. в html кудато добавить такую структуру

        <div class="js-modal_qr_preview">
            <div class="js-modal_qr_preview__render_vieport"></div>
        </div>

    2. подключить этот скрипт и создать экземпляр класса QrPreviewer
        Настройки при создании экземпляра указаны в api

    3. вызвать метод init у экземпляра.

   
   API
        constructor() - принимает обьект с настройками
            is_dynamic              - true\false - будетли окно динамическим ? иначе будет статическим
                                      (тоесть не будет перемещатся за курсором)
            data_block_calssName    - только если is_dynamic:true  - определяет класс блока, при наведении
                                       на который курсором, с него будет считыватся textContent и это будет кодироватся в qr код
            render_setting_padding  - внутренний отступ внутри вьюпорта создаваемый на этапе рендеринга
            render_setting_size     - размер px квадрата в котором будет рендерится qr код

        qr_renderer(string)         - позволяет в ручную передать строку которую нужно закодировать
                                      Сразуже вызывает рендер qr кода 

*/

type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc["length"]]>;
type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

interface IConstructorInput {
    is_dynamic?: boolean;
    data_block_calssName?: string;
    render_setting_padding?: IntRange<0, 11>;
    render_setting_size?: number;
}

class QrPreviewer {
    private _modal_block: HTMLElement; // блок с отображаемым qr кодом
    private _modal_block_vieport: HTMLElement; // внутренний блок, в котором код будет рендерится
    private _is_cutsor_in: boolean = false; // находится-ли курсор над text_in_file__qr_item
    private _mouse_pos_x: number = 0; // храним координаты положения мышки
    private _mouse_pos_y: number = 0;
    private _dynamic: boolean = false;
    private _data_block_calssName: string;
    private _is_inited: boolean = false;
    private _qr_setting_padding: IntRange<0, 11>;
    private _qr_setting_size: number;
    private _FLOAT_OFFSET = 20; // % на который нужно смещать модалку от курсора (для динамического режима)

    constructor({
        is_dynamic = false,
        data_block_calssName = "js-modal_qr_preview--undefined",
        render_setting_padding = 0,
        render_setting_size = 100,
    }: IConstructorInput = {}) {
        this._modal_block = find_element<HTMLElement>("js-modal_qr_preview");
        this._modal_block_vieport = find_element<HTMLElement>("js-modal_qr_preview__render_vieport", this._modal_block);
        this._dynamic = is_dynamic;
        this._data_block_calssName = data_block_calssName;
        this._qr_setting_padding = render_setting_padding;
        this._qr_setting_size = render_setting_size;
    }

    public init() {
        if (this._is_inited) return; // ограничитель на одну инициализацию

        this._is_inited = true;

        if (!this._dynamic) {
            this._modal_block.classList.add("js-modal_qr_preview--static");
            this._modal_block.classList.add("js-modal_qr_preview--open");
        } else {
            this._modal_block.classList.add("js-modal_qr_preview--dynamic");
            document.body.addEventListener("mousemove", this._dynamic_modal_update.bind(this));
            document.body.addEventListener("mouseout", this._dynamic_modal_update.bind(this));
            window.addEventListener("scroll", this._dynamic_modal_update.bind(this));
        }
    }

    public qr_renderer(value: string) {
        if (!this._is_inited) return;

        this._qr_render_update(value);
    }

    public get_dom_element(): HTMLElement {
        return this._modal_block;
    }

    private _dynamic_open_delay_dec = first_caller_delay_callback(this._dynamic_open.bind(this), () => {}, 1000); // пониженный абдейт для открытия молального окна
    private _qr_render_update_delay_dec = first_caller_delay_callback(this._qr_render_update.bind(this), () => {}, 100); // пониженный абдейт для рендера qr кода

    private _dynamic_modal_update(e: MouseEvent | Event) {
        if (is_device_mobile()) {
            this._is_cutsor_in = false;
            this._dynamic_hide();
            return;
        }

        if (e instanceof MouseEvent) {
            this._mouse_pos_x = e.clientX;
            this._mouse_pos_y = e.clientY;
        }

        const hover_element = document.elementFromPoint(this._mouse_pos_x, this._mouse_pos_y);

        if (!hover_element) {
            this._is_cutsor_in = false;
            this._dynamic_hide();
            return;
        }

        if (hover_element.closest(`.${this._data_block_calssName}`)) {
            this._is_cutsor_in = true;
            this._dynamic_open_delay_dec();
            this._modal_pos_update();
            this._qr_render_update_delay_dec(hover_element.textContent ?? "");
        } else {
            this._is_cutsor_in = false;
            this._dynamic_hide();
        }
    }

    private _modal_pos_update() {
        const scroll_bar_width = 10;
        const X_OFFSET = (this._modal_block.offsetWidth / 100) * this._FLOAT_OFFSET; // смещения модалки от курсора
        const Y_OFFSET = -((this._modal_block.offsetHeight / 100) * this._FLOAT_OFFSET);
        const win_h = window.innerHeight;
        const win_w = window.innerWidth;

        if (this._mouse_pos_x + this._modal_block.offsetWidth + X_OFFSET + scroll_bar_width < win_w && this._mouse_pos_x + X_OFFSET > 0) {
            // отображение правее курсора
            this._modal_block.style.left = `${this._mouse_pos_x + X_OFFSET}px`;
        } else if (
            this._mouse_pos_x + this._modal_block.offsetWidth + X_OFFSET > win_w &&
            this._mouse_pos_x - X_OFFSET - this._modal_block.offsetWidth > 0
        ) {
            // отображение левее курсора
            this._modal_block.style.left = `${this._mouse_pos_x - X_OFFSET - this._modal_block.offsetWidth}px`;
        } else {
            // отображение отображение посередине курсора
            // this._modal_block.style.left = `${this._mouse_pos_x - this._modal_block.offsetWidth / 2}px`;
        }

        if (this._mouse_pos_y + this._modal_block.offsetHeight - Y_OFFSET < win_h) {
            // отображение ниже курсора
            this._modal_block.style.top = `${this._mouse_pos_y - Y_OFFSET}px`;
        } else {
            // отображение выше курсора
            this._modal_block.style.top = `${this._mouse_pos_y - this._modal_block.offsetHeight + Y_OFFSET}px`;
        }
    }

    private _qr_render_update(encode_message: string) {
        let svgNode = DATAMatrix({
            msg: encode_message,
            dim: this._qr_setting_size,
            rct: 0,
            pad: this._qr_setting_padding,
            pal: ["#000000", "#f2f4f8"],
            vrb: 0,
        });
        this._modal_block_vieport.replaceChildren(svgNode);
    }

    private _dynamic_open() {
        if (this._is_cutsor_in) {
            this._modal_block.classList.add("js-modal_qr_preview--open");
            setTimeout(this._modal_pos_update.bind(this));
        }
    }

    private _dynamic_hide() {
        this._modal_block.classList.remove("js-modal_qr_preview--open");
        this._modal_block_vieport.replaceChildren();
    }
}

export { QrPreviewer };
