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
    ![](https://s220vla.storage.yandex.net/rdisk/eb4812852a35700c6e38591ccc529a95356eb811f53c127327553257440c12e6/63d78d5e/EZiZKLe44Y9fnI4E70ficJEq-j_J00Td1Z223IROoZQwIUyw7rGnyyah6oFfDCLYt7TPm9hgLZ6q_eHKDyI_Fg==?uid=139348533&filename=2023-01-30_00-27-35.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=139348533&fsize=6208&hid=523180ecbb77740e43fd649976df4618&media_type=image&tknv=v2&etag=8066442f87caa980504b4da288f66635&rtoken=phN1KQlnZWlC&force_default=yes&ycrid=na-f6acc952eeef0f03181c7b4743d16d27-downloader4e&ts=5f377d0d79380&s=83216321e5bdac4ccf336a91e806872a4053fc19a325a36a17cd786030aaeb1a&pb=U2FsdGVkX18UBFgdcerH6cxtOFTgwNFyHyVKT21nLDspicMq5aAZHUSAoQ51LwrbaIGJkbkbOfgzMOY_Jhy0b_F8BRhpvZzmcCRM1kBAdik)

    Предпологается что содержимое фаила будет такого вида...
    ![](https://s301vla.storage.yandex.net/rdisk/2fb3e6a1d08e9e8769d5287078bdeb0f1fbd8b78fe25111f6ab3ad6ff95f2b04/63d78c2b/EZiZKLe44Y9fnI4E70ficOmaifdic6zQ8GxPWym0fmqzYdIWRbyTSwq2dhoT2mmoJxx7DhjV7Q1rl50XpBFtLA==?uid=139348533&filename=2023-01-30_00-26-04.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=139348533&fsize=13594&hid=2d039cc29b000143577e8fe3a242d97a&media_type=image&tknv=v2&etag=0a9876c194f7ed32e2cc3abc8ca766fd&rtoken=50iUm9oXZXkU&force_default=yes&ycrid=na-6b209416ef35883be637714fa69be5a8-downloader4e&ts=5f377be8b20c0&s=0e24c24541d49d32a4b6f5943bc41dfeec65c3aa1d05afd8d917f9b5a7e1e1b8&pb=U2FsdGVkX1-05ZGFk8KECMwMsYDQlEL5BFnzyyr5_b3P8_KWsJYemFXj2jGOfufm3XBSDDwvHnGS0h_MRUyzkG_sYa6RdqTo8GnR-POIfuU)

    Это крайне важно, т.к. алгоритм удаления ненужного описания настроен именно на такой шаблон данных. При несовпадении шаблона будет выдана ошибка.
    После выбора фаила, оно откроется в приложении.
    ![](https://s468vla.storage.yandex.net/rdisk/2a5bb0cceab53445552b8d97ba06bc0bfac3ecb7fcf7eef568d8449290f370df/63d78c9a/EZiZKLe44Y9fnI4E70ficK1hoyzv9QLZh8fL3ZnpyVq5i8_f_eRgBwVHr01DTbhFa_y_oi2HAu9cQDlnQZ-wYg==?uid=139348533&filename=2023-01-30_00-23-51.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=139348533&fsize=12852&hid=096c0b294ccf8607940540781def2b9e&media_type=image&tknv=v2&etag=3dad26b844b84f235b0abfcab144b397&rtoken=x4mS7jnEl9De&force_default=yes&ycrid=na-02672bef1063da2a12fe23ef215c67a3-downloader4e&ts=5f377c528da80&s=5c01845d360ac8f7d352cf99b535af5f087ab8dadc007f698bf08c505c6bf3fd&pb=U2FsdGVkX19N5XhRYs00Ghge0JdcqplxNYArktH8lrGGzO2X-vrHOVk6aTLYaecF3K57h2Xom1HDNdgDsZsbBMIaSJgt4qrmXP2GhedQj1g)

-   Нажать на кнопку "удалить лишнее", после этого отображаемое содержимое должно выглядеть так...
    ![](https://s361iva.storage.yandex.net/rdisk/3c91e94717c08053418b21ea5b916ee9928a891558d60839f51e6b769c181aee/63d78d34/EZiZKLe44Y9fnI4E70ficCxGbsLKrAbxrQ5ypFQaGBWsatAYvrcJtu1prMSticUEnrxVNnoeFnknO7ZccnWy7Q==?uid=139348533&filename=2023-01-30_00-26-36.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=139348533&fsize=3616&hid=e0afb51cdd78238ca0b6d342567f82cc&media_type=image&tknv=v2&etag=ab223fa21fa3b793f2c6f1cb80b07ff3&rtoken=6iUrgcB8MJUG&force_default=yes&ycrid=na-5b847a36a06e60fc225e615f0d452eb0-downloader4e&ts=5f377ce56b500&s=2cda61ade478f04d69544921de6f475927f636f9f895cf9805be8df8834dab76&pb=U2FsdGVkX1_48roy1mXKMf_xm-k3wwL6WjTERPIhpaQ2ZZvjvKhFfDBcspH2djn9rK5LgQb4OxcZH_aSswYuPXXLiC67LaslSDkpOmU0f_M)

    Это непосредственно сам qr код. Удаленное описание никак не скажется на закодированной информации в qr коде.

-   Далее можно разбить этот фаил на множество небольших фаилов. Для этого нужно заполнить форму рядом с кнопкой "удалить лишнее", это необходимое количество кодов в одном фаиле, по умолчанию оно имеет значение "150", если изменение не требуется можно сразу нажать на кнопку "удалить лишнее".
    После этого станет доступен предварительный просмотр каждого сгенерированого фаила.
    ![](https://s787sas.storage.yandex.net/rdisk/1b08afa5e72cd3eeb1e7d7049d44005eab0328a71eef96a8157b4e3455e910c5/63d790f2/EZiZKLe44Y9fnI4E70ficCoJLV1H8w646mdezRBmf-uE_RrTQ3lNc8FDuQhOPY88z40kJ7kt7oBpWbG2qbV2DQ==?uid=139348533&filename=2023-01-30_12-36-36.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=139348533&fsize=7811&hid=c24a8d0c5358f0e64770790bc70f2ab1&media_type=image&tknv=v2&etag=d29b529c92f15d389a04b0125d3e3db0&rtoken=VUb5tWz8wZRY&force_default=yes&ycrid=na-6bd6f32e048ad7743055623e8595b9f6-downloader4e&ts=5f3780770a080&s=2b60b2038fc8ab9aaa50f48d179d090637699c733675c87a6c36054d3c533199&pb=U2FsdGVkX1-Yji8Tn9QbjBUPPE4SZp7U-Gqgoa5sJEj0A0rSfEbndIeeTWXcTfDRvyJROI5gST1s413QUigSW2VZzPzknLzhjnq1-KKysqc)
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
