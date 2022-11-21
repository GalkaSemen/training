// ==UserScript==
// @name         YandexBot 11-11
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Galina Semenova
// @match        https://ya.ru/*
// @match        https://yandex.ru/*
// @match        https://yandex.ru/search/*
// @match        https://auto.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==


let links = document.links;
let button = document.getElementsByClassName("search3__button mini-suggest__button")[0];
let keywords = ["Cтрахование автомобиля", "каталог автомобилей"];
let keyword = keywords[getRandom(0, keywords.length)];
let yandexInput = document.getElementsByName("text")[0];
let pager=document.getElementsByClassName("link link_theme_none link_target_serp pager__item pager__item_kind_next i-bem")[0];

if (button !== undefined) {
  let i=0;
  let timerId = setInterval (()=>{
    yandexInput.value += keyword[i];
    i++;
    if(i==keyword.length){
      clearInterval(timerId);
      button.click();
    }
  },500);


}else if (location.hostname == "auto.ru"){
  console.log("Мы на сайте");
  setInterval(()=>{
 let index=getRandom(0, links.length);
 if (getRandom(0, 101) > 70) {
 location.href = "https://ya.ru/";
 }
    if (links[index].href.indexOf("auto.ru") !== -1) links[index].click();
  }, getRandom(3000, 5000));
} else {
  let nextYandexPage=true;
  for( let i =0; i< links.length; i++){
    if (links[i].href.indexOf("auto.ru") !== -1){
      let link = links[i];
      nextYandexPage=false;
      console.log("Нашел строку " + links[i])
      setTimeout(()=>{
        link.click();
      }, getRandom(2000, 4000));

      break;
    }
  }
  if (document.getElementsByClassName("pager__item pager__item_current_yes pager__item_kind_page")[0].innerText=="3"){
    nextYandexPage=false;
    location.href="https://ya.ru/";
  }
  if (nextYandexPage) {
    setTimeout(()=>{
      pager.click();
    }, getRandom(2000, 4000));
  }
}



function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
