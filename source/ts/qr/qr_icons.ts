"use strict";

import { AddonIcon } from "./qr_icons_class";

let addonIcon_load: AddonIcon = create_icon("js-loading", "loading");
let addonIcon_chunk: AddonIcon = create_icon("js-chunk_info", "chunk_info");

function create_icon(HTMLClassName: string, InstanceName: string): AddonIcon {
    const call_constructor = (): AddonIcon => {
        return new AddonIcon(document.querySelector(`.${HTMLClassName}`) as HTMLElement, InstanceName);
    };

    if (document.querySelector(`.${HTMLClassName}`)) {
        return call_constructor();
    } else {
        throw new Error(`selector icon '.${HTMLClassName}' not fund in HTML`);
    }
}

export { addonIcon_load, addonIcon_chunk };
