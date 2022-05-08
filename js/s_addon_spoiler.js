'use strict';

//addon spoiler
const addon_spoiler_use_one = false;    // при открытии одного споилера, закрывать остальные открытые
const addon_spoiler_def_hide = true;    // все споилеры закрыты по умолчанию       
const addon_spoiler_resize_upd = true;  // обновлять размер открытого спойлера при изменении размеров окна браузера         


addon_spoiler_start_script();           // запустим функцию инизиализации

function addon_spoiler_start_script() {
  // проверяет обьекты возвращаемые от getElementsByClassName
  // если там есть хоть 1 элемент, вернет true
  const is_object_valid = (obj) => {
    return (obj.length != 0) ? (true) : (false);
  }

  let get_addon_spoilers = document.getElementsByClassName('js-addon_spoiler');  // получить все закрытые спойлеры
  if (!addon_spoiler_def_hide && is_object_valid(get_addon_spoilers)) {
    for (let i = 0; i < get_addon_spoilers.length;) {                                // обходим все найденные спойлеры  
      addon_spoiler_use(get_addon_spoilers[i]);
    }
  }

  let addon_spoilers = document.getElementsByClassName('addon_spoiler_heder');  // получить все заголовки спойлеров
  if (is_object_valid(addon_spoilers)) {
    for (let i = 0; i < addon_spoilers.length; i++) {
      addon_spoilers[i].removeEventListener('click', evt_lstr_spoiler_click);                // в дальнейшем я буду сперва удалять событие а потом добавлять его (сделано для того чтобы можно было безопасно вызывать много раз функцию инициализации например когда мы динамически добавляем обьекты на страницу и требуется проинициализировать их заново) -
      addon_spoilers[i].removeEventListener('keydown', evt_lstr_spoiler_keydown);               // - был нюанс что если повесить событие клик на один и тотже обьект 2 раза (или более) то при клике по обьекту это событие сработает столько раз сколько раз мы его повешли.
                                                                                                // для того чтобы событие можно было снять, нужно вынести отдельно вызываемую функцию, и уже при снятии упоминать ее название.
      addon_spoilers[i].addEventListener('click', evt_lstr_spoiler_click );                  // повесить на них обработчик "клик мышкой"
      addon_spoilers[i].addEventListener('keydown', evt_lstr_spoiler_keydown );              // повесить на них обработчик "выбор enter,ом"
    }
  }

  if (addon_spoiler_resize_upd && is_object_valid(get_addon_spoilers)) {
    document.removeEventListener('DOMContentLoaded', evt_lstr_dom_load);
    document.addEventListener('DOMContentLoaded', evt_lstr_dom_load );   // если DOM загрузился
  }
}

function evt_lstr_spoiler_click(evt) {    // при событии клик по хедеру спойлера
  addon_spoiler_on_click(evt);
}

function evt_lstr_spoiler_keydown(evt) {  // при событии нажатии клавой по хедеру спойлера
  if (evt.code == 'Enter') addon_spoiler_on_click(evt);
}

function evt_lstr_dom_load(evt) {         // при загрузке документа
  window.removeEventListener('resize', evt_lstr_window_resize);
  window.addEventListener('resize', evt_lstr_window_resize );  
}

function evt_lstr_window_resize(evt) {    // при изменении размера окна браузера 
  resize_upd();                                 
}

function addon_spoiler_on_click(DOM_obj) {
  let get_addon_spoiler_active = document.getElementsByClassName('js-addon_spoiler--active'); // получить все открытые спойлеры
  let object = DOM_obj.currentTarget.parentElement;                 // получаем доступ к родительскому обьекту элемента addon_spoilers

  if (addon_spoiler_use_one) {                                      // если разрешено использовать только 1 споилер  
    for (let i=0; i < get_addon_spoiler_active.length; i++) {       // обходим все открытые споилеры
      if (get_addon_spoiler_active[i] !== object) {                 // если это не тот споилер по которому был клик
        addon_spoiler_use(get_addon_spoiler_active[i]);             // имитируем нажатие по нему (закрываем)
      }
    }
  }
  addon_spoiler_use(object);                                        // закрыть или открыть споилер
}

function addon_spoiler_use(DOM_obj) {
  let is_active = (DOM_obj.classList.contains('js-addon_spoiler--active')) ? (true) : (false); // проверяет наличие нужного класса в списке, если он есть значит спойлер открыт
  let object_body = DOM_obj.lastElementChild;                   // обьект с содержимым слайдера
  let object_body_height = object_body.scrollHeight;            // размер содержимого слайдера, в пикселях
  DOM_obj.classList.toggle("js-addon_spoiler");                 // удаляем у родителя класс если он был, если нет то добавляем
  DOM_obj.classList.toggle("js-addon_spoiler--active");         // удаляем у родителя класс если он был, если нет то добавляем

  if (!is_active) {                                             // если споилер закрыт
    object_body.style.maxHeight = object_body_height + "px";    // делаем высату для содержимого, равной его размеру
    upd_parent_height(DOM_obj,object_body_height);
  } else {                                                      // если споилер открыт
    object_body.style.maxHeight = "0px";                        // делаем высату для содержимого 0
    upd_parent_height(DOM_obj,0);
  }
}

function resize_upd() {
  let get_addon_spoiler_active = document.getElementsByClassName('js-addon_spoiler--active');   // получить все открытые спойлеры
  if (get_addon_spoiler_active != null) {                                                       // если активные споилеры есть
    for (let i=0; i < get_addon_spoiler_active.length; i++) {                                   // обходим все открытые споилеры
      let this_content = get_addon_spoiler_active[i].lastElementChild;                          // получаем обьект контента
      let this_content_height = this_content.scrollHeight;                                      // получаем его высоту
      this_content.style.maxHeight = this_content_height + "px";                                // задаем параметр максимальной высоты равным его текущей высоте
    }
  }
}

function check_parent_spoiler(obj) {
  let parent_slider = obj.closest('.js-addon_spoiler--active');
  if (parent_slider == null) {
    return false;
  }
  return parent_slider;
}

function upd_parent_height(DOM_obj, old_size) {
  let check_p_slider = DOM_obj;
  let children_h = old_size;
  while (check_parent_spoiler(check_p_slider.parentElement) != false) {
    check_p_slider = check_parent_spoiler(check_p_slider.parentElement);
    check_p_slider.lastElementChild.style.maxHeight = check_p_slider.lastElementChild.scrollHeight + children_h + "px";
    children_h = check_p_slider.lastElementChild.scrollHeight + children_h;
  }
}