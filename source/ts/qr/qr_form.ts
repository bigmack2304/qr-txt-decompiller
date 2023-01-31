"use strict";

import { find_element } from "./qr_utils";

const form = find_element<HTMLInputElement>("js-btn_decomp_n");
form.addEventListener("change", form_change);

function form_change(e: Event) {
    const target = e.target as HTMLInputElement;

    if (Number(target.value) > Number(target.max)) {
        target.value = target.max;
    }

    if (Number(target.value) < Number(target.min)) {
        target.value = target.min;
    }
}

export {};
