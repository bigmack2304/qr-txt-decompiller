<p align="center">
  <span><b>QR-TXT-EDITOR</b></span>
</p>
<p align="center">
  <a href="https://github.com/bigmack2304/qr-txt-decompiller"><img src="https://raw.githubusercontent.com/bigmack2304/qr-txt-decompiller/main/source/img/icon/apple-touch-icon-144x144.png" alt=""></a>
</p>
<p align="center">
  <a href="https://github.com/bigmack2304/qr-txt-decompiller"><img src="https://github.com/bigmack2304/qr-txt-decompiller/actions/workflows/github-actions-main.yml/badge.svg" alt=""></a>
</p>

Приложение для преобразования большого списка QR кодов, в отдельные фаилы формата .txt

Поддерживает входные фаилы форматов .csv и .txt

### Инструкция по применению:

-   Открыть страницу приложения
-   Нажать на кнопку "выбрать фаил" и выбрать фаил со списком qr кодов
    ![](https://s308vlx.storage.yandex.net/rdisk/3f441d4366dd48bf6c9ea21484f25f8c960de0b6188b81041f2f9e6c0fdd50d5/63df7d71/EZiZKLe44Y9fnI4E70ficJEq-j_J00Td1Z223IROoZQwIUyw7rGnyyah6oFfDCLYt7TPm9hgLZ6q_eHKDyI_Fg==?uid=139348533&filename=2023-01-30_00-27-35.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=139348533&fsize=6208&hid=523180ecbb77740e43fd649976df4618&media_type=image&tknv=v2&etag=8066442f87caa980504b4da288f66635&rtoken=98qhVv4p86E3&force_default=yes&ycrid=na-65c33a9c1e7c9b14842d0d78287b6a07-downloader22h&ts=5f3f0efd57e40&s=ee48c73e2ab9a4d494c206d43d96acd1111d4617bd629294c9daef7e17e9d14c&pb=U2FsdGVkX1_FBuOHYWwPxlVg0Q9wpBXgXdyPCQzoO4trc1WrMKJYEAJ8j0prAfJybV_HIGSq70MaZT8hs1vACBHpxspy7yQ-_I4OuLZZzkI)

    Предпологается что содержимое фаила будет такого вида...
    ![](https://s301vla.storage.yandex.net/rdisk/5e6772636a831163a73ed57f43e41ef48017461f6d869bfde7d4593ae5bf8c0f/63df7da1/EZiZKLe44Y9fnI4E70ficOmaifdic6zQ8GxPWym0fmqzYdIWRbyTSwq2dhoT2mmoJxx7DhjV7Q1rl50XpBFtLA==?uid=139348533&filename=2023-01-30_00-26-04.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=139348533&fsize=13594&hid=2d039cc29b000143577e8fe3a242d97a&media_type=image&tknv=v2&etag=0a9876c194f7ed32e2cc3abc8ca766fd&rtoken=53LlK7y61IC3&force_default=yes&ycrid=na-c14cf4db859c35ff8f21c7fc45c7c190-downloader15f&ts=5f3f0f2b1ea40&s=a7d4b873a87e97486e0f6f43fd89deef07c67c93e501fadb71346afd0565b642&pb=U2FsdGVkX1_R31n8zNbK-UhaKp-QwWB-c28NSDx8D9zoPtMVi4tyC8nHaT8xqHc6ZeyUdhFfq3qKSksuAzhrnO1Bc_yG2bhsODOXrXNsmDo)

    Это крайне важно, т.к. алгоритм удаления ненужного описания настроен именно на такой шаблон данных. При несовпадении шаблона будет выдана ошибка.
    После выбора фаила, оно откроется в приложении.
    ![](https://s692sas.storage.yandex.net/rdisk/986dcae798e563b5a2394f170fbd5d97f3d994d32c0a56ff49ccbfd8a6c9768c/63df7db8/EZiZKLe44Y9fnI4E70ficK1hoyzv9QLZh8fL3ZnpyVq5i8_f_eRgBwVHr01DTbhFa_y_oi2HAu9cQDlnQZ-wYg==?uid=139348533&filename=2023-01-30_00-23-51.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=139348533&fsize=12852&hid=096c0b294ccf8607940540781def2b9e&media_type=image&tknv=v2&etag=3dad26b844b84f235b0abfcab144b397&rtoken=5CdMEEOzMh9x&force_default=yes&ycrid=na-e62fa80881747470b0194e069e715351-downloader15f&ts=5f3f0f410de00&s=f4a5cf306f601ceff49df511b72a8ecee47e794fdfdd329fe5b161d53d09753d&pb=U2FsdGVkX18-Ko_qW0qUthsR1Nj5IzaELwr7XTglr_wFfKgwQ_0y5r548yUprUkcgzaTi4YnKZEtIwMwqXZ7HPXBpKkLStxs1UaV2HgyDDw)

-   Нажать на кнопку "удалить лишнее", после этого отображаемое содержимое должно выглядеть так...
    ![](https://s163vlx.storage.yandex.net/rdisk/715f5c78f06cc9ccc0be993a80570a5736e79dad925831dc3339ce6b1c526c90/63df7dc9/EZiZKLe44Y9fnI4E70ficCxGbsLKrAbxrQ5ypFQaGBWsatAYvrcJtu1prMSticUEnrxVNnoeFnknO7ZccnWy7Q==?uid=139348533&filename=2023-01-30_00-26-36.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=139348533&fsize=3616&hid=e0afb51cdd78238ca0b6d342567f82cc&media_type=image&tknv=v2&etag=ab223fa21fa3b793f2c6f1cb80b07ff3&rtoken=wKcPo2FEeB8D&force_default=yes&ycrid=na-943bfb6446fff7bb199aefabad80d033-downloader20f&ts=5f3f0f5144440&s=9653faeca9e9f424479fed8ee7cdbcbc76345b544236b4e84182c096b534f7f8&pb=U2FsdGVkX19OmK-jBuJIL_exfMskqiI-aFzdXcapp-4sDQVVKZb-e6wGfRaNLRbYHtmEaFpHsct5F6WalZ75qiBtUTR4AZpcDdWAQ80aVjU)

    Это непосредственно сам qr код. Удаленное описание никак не скажется на закодированной информации в qr коде.

-   Далее можно разбить этот фаил на множество небольших фаилов. Для этого нужно заполнить форму рядом с кнопкой "удалить лишнее", это необходимое количество кодов в одном фаиле, по умолчанию оно имеет значение "150", если изменение не требуется можно сразу нажать на кнопку "удалить лишнее".
    После этого станет доступен предварительный просмотр каждого сгенерированого фаила.
    ![](https://s787sas.storage.yandex.net/rdisk/00377bf1d6a0636ba6f3afda0cc5b6ff7ccc0f068148593d653de85e7c0511b4/63df7df0/EZiZKLe44Y9fnI4E70ficCoJLV1H8w646mdezRBmf-uE_RrTQ3lNc8FDuQhOPY88z40kJ7kt7oBpWbG2qbV2DQ==?uid=139348533&filename=2023-01-30_12-36-36.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=139348533&fsize=7811&hid=c24a8d0c5358f0e64770790bc70f2ab1&media_type=image&tknv=v2&etag=d29b529c92f15d389a04b0125d3e3db0&rtoken=lInf86EO1ixF&force_default=yes&ycrid=na-aecbf17c73070a35a2de19be513ec34a-downloader20f&ts=5f3f0f7675c00&s=97e2632b4ab78220ebf61215670db590ce46a75fc24e82f5f58fc56e9c6785be&pb=U2FsdGVkX1_F60kp20z7bxewaIJ8p8nqVMKy3X6TLzULNiH5Zt4F-OmqsnZebV4oHkd_dNlIA86ARdINDPMtUNhzVefWaRRYzBmb-a1G9IY)

    **Для компьютеров** доступен предворительный просмотр каждого qr кода в формате DataMatrix

    ![](https://s171vla.storage.yandex.net/rdisk/89310f31e9d6381a90c804e052352e9ddc96b2a29abb72b71fe182048e78d6ff/63df7e68/EZiZKLe44Y9fnI4E70ficJaxV36qkhVk9hfv1uA5iK5LMFAjIbT-K_EAhxML_Zrn2uvjw0vSij3cl5LQqc4PvQ==?uid=139348533&filename=2023-02-05_12-37-27.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=139348533&fsize=8837&hid=46d752e9b643e48e2e0c83b60dc80893&media_type=image&tknv=v2&etag=68f9ecebe6cb5ce0c81a8e7f00a92f34&rtoken=uBpnzFBHjF0G&force_default=yes&ycrid=na-a9590d72e3faf796ce191ca9d749a5f7-downloader20f&ts=5f3f0fe8e6a00&s=dfa7fce3be572835c31aade72214755793cd08de52037ba66d76b0d0da8dcb08&pb=U2FsdGVkX1-2hzWv9y1I-7qOWT6UKw-MSJ8zQNaC1wgENty0XiPMh5Ol3xuDD_uImo12Bu0hGgqFUyrU6LoGDUjfMJ0c5rWS_sb-5zlDzmM)

-   Теперь можно скачать все сгенерированые фаилы в одном архиве, нажав соответствующую кнопку.

#### Ссылки:

1. **[Ссылка](https://bigmack2304.github.io/qr-txt-decompiller/dist/final/index.html) на релизную версию приложения.**

2. [Ссылка](https://bigmack2304.github.io/qr-txt-decompiller/dist/dev/index.html) на последнюю тестовую версию приложения.

3. [Ссылка](https://disk.yandex.ru/d/rNEfis2mVBj2jw) фаил с qr кодами показанный в примере.

#### Используемые технологии:

-   HTML5
-   CSS3
-   LESS
-   PostCSS
-   Java Script
-   Type Script
-   WebPack

#### Используемые библиотеки:

-   [jszip](https://github.com/Stuk/jszip) (генерация и сохранение .zip архива)
-   [papaparse](https://github.com/mholt/PapaParse) (обработка .csv таблиц)
-   [datamatrix.js](https://github.com/datalog/datamatrix-svg) (рендер QR кода формата "data matrix")
