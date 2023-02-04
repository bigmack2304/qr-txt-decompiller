import { find_element, first_caller_delay_callback, is_device_mobile } from "./qr_utils";

interface IInstanceQrious {
    background: string;
    backgroundAlpha: number;
    element: HTMLCanvasElement;
    foreground: string;
    foregroundAlpha: number;
    level: "L" | "M" | "Q" | "H";
    mime: "image/jpeg" | "image/png";
    padding: number;
    size: number;
    value: string;
    set: (settings: Partial<Omit<IInstanceQrious, "set" | "toDataURL">>) => void;
    toDataURL: (type?: string) => string;
}

interface IClassQrious {
    new (parameters: Partial<Omit<IInstanceQrious, "set" | "toDataURL">>): IInstanceQrious;
}

const QRIOUS_CLASS: IClassQrious = require("qrious");

let qrRender = new QRIOUS_CLASS({
    element: find_element<HTMLCanvasElement>("modal_qr_preview__vieport"),
    size: 150,
    level: "L",
});

const modal_block = find_element<HTMLDivElement>("modal_qr_preview");
const one_open_delay_dec = first_caller_delay_callback(one_open, () => {}, 1000); // пониженный абдейт для открытия молального окна
const qr_render_update_delay_dec = first_caller_delay_callback(qr_render_update, () => {}, 100); // пониженный абдейт для рендера qr кода

let is_cutsor_in: boolean = false;
let mouse_pos_x = 0; // храним координаты положения мышки
let mouse_pos_y = 0;

document.body.addEventListener("mousemove", modal_update);
window.addEventListener("scroll", modal_update);

// абдейтим при изменении скролла, движении мыши
function modal_update(e: any) {
    if (is_device_mobile()) return; //todo: в релизе это раскоментировать

    if (e instanceof MouseEvent) {
        mouse_pos_x = e.clientX;
        mouse_pos_y = e.clientY;
    }
    const hover_element = document.elementFromPoint(mouse_pos_x, mouse_pos_y);

    if (!hover_element) {
        is_cutsor_in = false;
        one_hide();
        return;
    }

    if (hover_element.closest(".text_in_file__qr_item")) {
        is_cutsor_in = true;
        one_open_delay_dec();
        modal_pos_update();
        qr_render_update_delay_dec(hover_element);
    } else {
        is_cutsor_in = false;
        one_hide();
    }
}

function qr_render_update(hover_element: Element) {
    qrRender.set({
        value: hover_element.textContent ?? "",
    });
}

function modal_pos_update() {
    const scroll_bar_width = 10;
    const X_OFFSET = 30; // смещения модалки от курсора
    const Y_OFFSET = -70;
    const win_h = window.innerHeight;
    const win_w = window.innerWidth;

    if (mouse_pos_x + modal_block.offsetWidth + X_OFFSET + scroll_bar_width < win_w && mouse_pos_x + X_OFFSET > 0) {
        modal_block.style.left = `${mouse_pos_x + X_OFFSET}px`;
    } else if (mouse_pos_x + modal_block.offsetWidth + X_OFFSET > win_w && mouse_pos_x - X_OFFSET - modal_block.offsetWidth > 0) {
        modal_block.style.left = `${mouse_pos_x - X_OFFSET - modal_block.offsetWidth}px`;
    } else {
        modal_block.style.left = `${mouse_pos_x - modal_block.offsetWidth / 2}px`;
    }

    if (mouse_pos_y - Y_OFFSET * 2.65 < win_h) {
        modal_block.style.top = `${mouse_pos_y - Y_OFFSET / 2.5}px`;
    } else {
        modal_block.style.top = `${mouse_pos_y + Y_OFFSET * 2.5}px`;
    }
}

function one_open() {
    if (is_cutsor_in) {
        modal_block.style.display = "block";
        setTimeout(modal_pos_update);
    }
}

function one_hide() {
    modal_block.style.display = "none";
}

export {};
