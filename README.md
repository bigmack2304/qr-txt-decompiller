<p align="center">
  <span><b>QR-TXT-EDITOR</b></span>
</p>
<p align="center">
  <a href="https://github.com/bigmack2304/qr-txt-decompiller"><img src="./source/img/icon/apple-touch-icon-114x114.png" alt=""></a>
</p>
<p align="center">
  <a href="https://github.com/bigmack2304/qr-txt-decompiller"><img src="https://github.com/bigmack2304/qr-txt-decompiller/actions/workflows/github-actions-main.yml/badge.svg" alt=""></a>
</p>

Приложение для преобразования большого списка QR кодов, в отдельные фаилы формата .txt

Поддерживает входные фаилы форматов .csv и .txt

### Инструкция по применению:

-   Открыть страницу приложения
-   Нажать на кнопку "выбрать фаил" и выбрать фаил со списком qr кодов
    ![](./source/img/forReadme/1_2023-01-30_00-27-35.png)

    Предпологается что содержимое фаила будет такого вида...
    ![](./source/img/forReadme/2_2023-01-30_00-26-04.png)

    Это крайне важно, т.к. алгоритм удаления ненужного описания настроен именно на такой шаблон данных. При несовпадении шаблона будет выдана ошибка.
    После выбора фаила, оно откроется в приложении.
    ![](./source/img/forReadme/3_2023-01-30_00-23-51.png)

-   Нажать на кнопку "удалить лишнее", после этого отображаемое содержимое должно выглядеть так...
    ![](./source/img/forReadme/4_2023-01-30_00-26-36.png)

    Это непосредственно сам qr код. Удаленное описание никак не скажется на закодированной информации в qr коде.

-   Далее можно разбить этот фаил на множество небольших фаилов. Для этого нужно заполнить форму рядом с кнопкой "удалить лишнее", это необходимое количество кодов в одном фаиле, по умолчанию оно имеет значение "150", если изменение не требуется можно сразу нажать на кнопку "удалить лишнее".
    После этого станет доступен предварительный просмотр каждого сгенерированого фаила.
    ![](./source/img/forReadme/5_2023-01-30_12-36-36.png)

    **Для компьютеров** доступен предворительный просмотр каждого qr кода в формате DataMatrix

    ![](./source/img/forReadme/6_2023-02-05_12-37-27.png)

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
