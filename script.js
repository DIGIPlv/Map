//Setting map on warious screens
//Landscape screens
let correctWidth;
if(screen.width > window.innerWidth)
{
  correctWidth = window.innerWidth;
}
else
{
  correctWidth = screen.width;
}
if(correctWidth > screen.height)
{
 if(correctWidth < 1200)
 {
   document.getElementById('zoom-container').style.width = correctWidth - 60 + 'px';
   document.getElementById('zoom-container').style.height = (correctWidth - 60) / 2 + 'px';
   document.getElementById('wrap-zoom').style.width = correctWidth - 60 + 'px';
   document.getElementById('wrap-zoom').style.height = (correctWidth - 60) / 2 + 'px';
   document.getElementById('img-map').style.width = correctWidth - 60 + 'px';
   document.getElementById('img-map').style.height = correctWidth - 60 / 2 + 'px';
 }
}
// Portrait screens
else
{
 document.getElementById('img-map').src = 'https://uploads-ssl.webflow.com/5e932e6c65892b04bd139085/60113ab951945115c51a2cbc_Map_more_area_vertical.png';
 if((correctWidth - 60) * 2 < screen.height)
 {
   document.getElementById('zoom-container').style.width = correctWidth - 60 + 'px';
   document.getElementById('zoom-container').style.height = (correctWidth - 60) * 2 + 'px';
   document.getElementById('wrap-zoom').style.width = correctWidth - 60 + 'px';
   document.getElementById('wrap-zoom').style.height = (correctWidth - 60) * 2 + 'px';
   document.getElementById('img-map').style.width = correctWidth - 60 + 'px';
   document.getElementById('img-map').style.height = (correctWidth - 60) * 2 + 'px';
 }
 else
 {
   document.getElementById('zoom-container').style.width = (screen.height / 2) - 60 + 'px';
   document.getElementById('zoom-container').style.height = (screen.height / 2 - 60) * 2 + 'px';
   document.getElementById('wrap-zoom').style.width = screen.height / 2 - 60 + 'px';
   document.getElementById('wrap-zoom').style.height = (screen.height / 2 - 60) * 2 + 'px';
   document.getElementById('img-map').style.width = screen.height / 2 - 60 + 'px';
   document.getElementById('img-map').style.height = (screen.height / 2 - 60) * 2 + 'px';
 }
}

// Zoom and pan
var zoomer = (function () {
   var wrapElement = null,
     x_cursor = 0,
     y_cursor = 0,
     x_wrapElement = 0,
     y_wrapElement = 0,
     orig_width = document.getElementById('wrap-zoom').getBoundingClientRect().width,
     orig_height = document.getElementById('wrap-zoom').getBoundingClientRect().height,
     current_top = 0,
     current_left = 0,
     zoom_factor = 2.0,
   mapImg = document.getElementById('img-map');
 var new_width = (orig_width * zoom_factor);
   var new_heigth = (orig_height * zoom_factor);
 wrapElement = document.getElementById('wrap-zoom');
 wrapElement.style.width = new_width + 'px';
 wrapElement.style.height = new_heigth + 'px';
 if(correctWidth > screen.height)
 {
   wrapElement.style.left = '-528px';
   wrapElement.style.top = '-414px';
 }
 else
 {
   wrapElement.style.left = '-141px';
   wrapElement.style.top = '-596px';

 }

 mapImg.style.width = new_width + 'px';
 mapImg.style.height = new_heigth + 'px';
 wrapElement = null;

   return {
       zoom: function (zoomincrement) {
           wrapElement = document.getElementById('wrap-zoom');
           zoom_factor = zoom_factor + zoomincrement;
           if (zoom_factor <= 1.0)
           {
               zoom_factor = 1.0;
               wrapElement.style.top =  '0px';
               wrapElement.style.left = '0px';
           }
     if(zoom_factor > 5.0)
     {
       zoom_factor = 5.0;
     }

           new_width = (orig_width * zoom_factor);
           new_heigth = (orig_height * zoom_factor);

           if (current_left < (orig_width - new_width))
           {
               current_left = (orig_width - new_width);
           }
           if (current_top < (orig_height - new_heigth))
           {
               current_top = (orig_height - new_heigth);
           }
           wrapElement.style.left = current_left + 'px';
           wrapElement.style.top = current_top + 'px';
           wrapElement.style.width = new_width + 'px';
           wrapElement.style.height = new_heigth + 'px';
     mapImg.style.width = new_width + 'px';
           mapImg.style.height = new_heigth + 'px';

           wrapElement = null;
       },

       start_drag: function () {
         if (zoom_factor <= 1.0)
         {
            return;
         }
         wrapElement = this;
         x_wrapElement = window.event.clientX - document.getElementById('wrap-zoom').offsetLeft;
         y_wrapElement = window.event.clientY - document.getElementById('wrap-zoom').offsetTop;

       },

   startDragTouch: function () {
     if (zoom_factor <= 1.0)
         {
            return;
         }
     event.preventDefault();
     var touch = event.touches[0];
         wrapElement = this;
         x_wrapElement = touch.clientX - document.getElementById('wrap-zoom').offsetLeft;
         y_wrapElement = touch.clientY - document.getElementById('wrap-zoom').offsetTop;
   },
       stop_drag: function () {
         if (wrapElement !== null) {
           if (zoom_factor <= 1.0)
           {
             wrapElement.style.left = '0px';
             wrapElement.style.top =  '0px';
           }

           }
         wrapElement = null;
       },

       stopDragTouch: function () {
         if (wrapElement !== null) {
       event.preventDefault();
           if (zoom_factor <= 1.0)
           {
             wrapElement.style.left = '0px';
             wrapElement.style.top =  '0px';
           }

           }
         wrapElement = null;
       },

   while_drag: function () {
           if (wrapElement !== null)
           {
               var x_cursor = window.event.clientX;
               var y_cursor = window.event.clientY;
               var new_left = (x_cursor - x_wrapElement);
               if (new_left > 0)
               {
                   new_left = 0;
               }
               if (new_left < (orig_width - wrapElement.offsetWidth))
               {
                   new_left = (orig_width - wrapElement.offsetWidth);
               }
               var new_top = ( y_cursor - y_wrapElement);
               if (new_top > 0)
               {
                   new_top = 0;
               }
               if (new_top < (orig_height - wrapElement.offsetHeight))
               {
                   new_top = (orig_height - wrapElement.offsetHeight);
               }
               current_left = new_left;
               wrapElement.style.left = new_left + 'px';
               current_top = new_top;
               wrapElement.style.top = new_top + 'px';

           }
       },
   whileDragTouch: function () {
     event.preventDefault();
           if (wrapElement !== null)
           {
   var touch = event.touches[0];
               var x_cursor = touch.clientX;
               var y_cursor = touch.clientY;
               var new_left = (x_cursor - x_wrapElement);
               if (new_left > 0)
               {
                   new_left = 0;
               }
               if (new_left < (orig_width - wrapElement.offsetWidth))
               {
                   new_left = (orig_width - wrapElement.offsetWidth);
               }
               var new_top = ( y_cursor - y_wrapElement);
               if (new_top > 0)
               {
                   new_top = 0;
               }
               if (new_top < (orig_height - wrapElement.offsetHeight))
               {
                   new_top = (orig_height - wrapElement.offsetHeight);
               }
               current_left = new_left;
               wrapElement.style.left = new_left + 'px';
               current_top = new_top;
               wrapElement.style.top = new_top + 'px';

           }
       }
   };
} ());

document.getElementById('zoomout').addEventListener('click', function() {
 zoomer.zoom(-0.25);
});
document.getElementById('zoomin').addEventListener('click', function() {
 zoomer.zoom(0.25);
});

document.getElementById('wrap-zoom').addEventListener('mousedown', zoomer.start_drag);
document.getElementById('zoom-container').addEventListener('mousemove', zoomer.while_drag);
document.getElementById('zoom-container').addEventListener('mouseup', zoomer.stop_drag);
document.getElementById('zoom-container').addEventListener('mouseout', zoomer.stop_drag);
// Touch devices
document.getElementById('wrap-zoom').addEventListener('touchstart', zoomer.startDragTouch);
document.getElementById('zoom-container').addEventListener('touchmove', zoomer.whileDragTouch);
document.getElementById('zoom-container').addEventListener('touchend', zoomer.stopDragTouch);


// popWraps and pins
const mapInfo = [];
let objectInfo = document.getElementsByClassName('map__object-info');
for(let i = 0; i < objectInfo.length; i++)
{
  mapInfo.push([]);
  for(let j = 0; j < objectInfo[i].children.length; j++)
  {
    mapInfo[i].push(objectInfo[i].children[j].innerHTML);
  }
}
const pinStyle = [
 ['map__edu', 'https://uploads-ssl.webflow.com/5e932e6c65892b04bd139085/6023ba7039eea86d9768f7a3_IT_izglitiba.svg'],
 ['map__smart', 'https://uploads-ssl.webflow.com/5e932e6c65892b04bd139085/6023ba700a59887a2485f112_Viedie_risinajumi.svg'],
 ['map__intrests', 'https://uploads-ssl.webflow.com/5e932e6c65892b04bd139085/6023ba6fbc44264b622a7924_Interesu_izgitiba.svg'],
 ['map__lab', 'https://uploads-ssl.webflow.com/5e932e6c65892b04bd139085/6023ba6f86d4d514e4635df9_Laboratorijas.svg'],
 ['map__technology', 'https://uploads-ssl.webflow.com/5e932e6c65892b04bd139085/6023ba6f2a8eeb29f0de902a_Tehnologijas.svg'],
 ['map__digip', 'https://uploads-ssl.webflow.com/5e932e6c65892b04bd139085/6023ed3a98fac9673233e790_DIGIP.svg'],
 ['map__smart', 'https://uploads-ssl.webflow.com/5e932e6c65892b04bd139085/602d7916d895fdbed6af3227_Luksofors.svg'],  // Smart traffic light
 ['map__smart', 'https://uploads-ssl.webflow.com/5e932e6c65892b04bd139085/602d7917d040cb9819e71c9e_Elektrouzl%C4%81de.svg'],  // Charging point
 ['map__smart', 'https://uploads-ssl.webflow.com/5e932e6c65892b04bd139085/602d7917d040cb746ee71c9f_Saules%20pane%C4%BCi.svg'],  // Solar panels
 ['map__ltk', 'https://uploads-ssl.webflow.com/5e932e6c65892b04bd139085/60defd30a670a6824b253c77_LTK_Pin.svg']
];
let map = document.getElementById('wrap-zoom');
let pinHight = 54;
let pinWidthCorrection = 18;
function putPins ()
{
 for(let i = 0; i < mapInfo.length; i++)
 {
   let pin = document.createElement('img');
   pin.src = pinStyle[mapInfo[i][4]][1];
   pin.className = 'map__pin';
   pin.id = 'pin_' + i;
   pin.classList.add(pinStyle[mapInfo[i][4]][0]);
   pin.style.top = 'calc(' + mapInfo[i][5] + '% - ' + pinHight + 'px)';
   pin.style.left = 'calc(' + mapInfo[i][6] + '% - ' + pinWidthCorrection + 'px)';
   map.append(pin);
 }
}
function createPopup(id)
{

 let mapModal = document.createElement('div');
 mapModal.className = 'modal';
 mapModal.style.display = 'block';
 let mapModalContent = document.createElement('div');
 mapModalContent.className = 'modal__content';
 mapModal.append(mapModalContent);
 let popWrap = document.createElement('div');
 popWrap.className = 'map__wrap-popup';
 let popHeading = document.createElement('h3');
 popHeading.className = 'h3 txt_color_brand-dark txt_align_centred mb_20';
 popHeading.innerHTML = mapInfo[id][0];
 popWrap.append(popHeading);
 let popImg = document.createElement('img');
 popImg.className = 'map__img-popup';
 popImg.src = mapInfo[id][3];
 let popImgWrap = document.createElement('div');
 popImgWrap.className = 'map__wrap-img mb_20';
 popImgWrap.append(popImg);
 popWrap.append(popImgWrap);
 let mapAddressHeading = document.createElement('div');
 mapAddressHeading.className = 'h5 txt_color_brand-dark txt_semi-bold';
 mapAddressHeading.innerHTML = 'Adrese';
 popWrap.append(mapAddressHeading);
 let popAddress = document.createElement('div');
 popAddress.className = 'txt-body txt_bold mb_10';
 popAddress.innerHTML = mapInfo[id][1];
 popWrap.append(popAddress);
 let popInfo = document.createElement('div');
 popInfo.className = 'txt-body txt_align_justify';
 popInfo.innerHTML = mapInfo[id][7];
 popWrap.append(popInfo);

 // Contact
 if (mapInfo[id][4] != 1 && mapInfo[id][4] != 6 && mapInfo[id][4] != 7 && mapInfo[id][4] != 8)
 {
   let contactWrap = document.createElement('div');
   contactWrap.className = 'wrap-btn mt_40';
   let contact = document.createElement('div');
   contact.className = 'btn btn_long';
   let mapBtnTxt = document.createElement('div');
   mapBtnTxt.className = 'h4 txt_color_bright';
   mapBtnTxt.innerHTML = 'Sazināties';
   contact.append(mapBtnTxt);
   let mapBtnGradient = document.createElement('div');
   mapBtnGradient.className = 'gradient';
   contact.append(mapBtnGradient);
   contact.addEventListener('click', (e) =>
   {
     document.getElementById('btn-contact').click();
     document.getElementById('contact-with').value = mapInfo[id][0];
   });
   contact.addEventListener('touchstart', (e) =>
   {
     document.getElementById('btn-contact').click();
     document.getElementById('contact-with').value = mapInfo[id][0];
   });
   contactWrap.append(contact);
   popWrap.append(contactWrap);
 }
 // Close btn
 let popClose = document.createElement('div');
 popClose.className = 'wrap-btn-close popup__wrap-btn-close';
 let popCloseBarA = document.createElement('div');
 popCloseBarA.className = 'wrap-btn-close__bar wrap-btn-close__bar_top';
 popClose.append(popCloseBarA);
 let popCloseBarB = document.createElement('div');
 popCloseBarB.className = 'wrap-btn-close__bar wrap-btn-close__bar_bottom';
 popClose.append(popCloseBarB);
 mapModalContent.append(popClose);
 // Add to body
 mapModalContent.append(popWrap);
 document.body.append(mapModal);
 // Closeing popup
 mapModal.addEventListener('click', (e) =>
 {
   document.body.removeChild(mapModal);
 });

}
function drop()
{
 let drop = document.getElementById('map-drop');
 if(drop.value == 'all')
 {
   let showPins = document.getElementsByClassName('map__pin');
   for(let i = 0; i < showPins.length; i++)
   {
     if(showPins[i].className.includes('hidden'))
     {
       showPins[i].classList.remove('hidden');
     }
   }
 }
 else
 {
   let hidePins = document.getElementsByClassName('map__pin');
   for(let i = 0; i < hidePins.length; i++)
   {
     if(!hidePins[i].className.includes(pinStyle[drop.value][0]))
     {
       hidePins[i].classList.add('hidden');
     }
     else
     {
       if(hidePins[i].className.includes('hidden'))
       {
         hidePins[i].classList.remove('hidden');
       }
     }
   }
 }
}
putPins();

let pins = document.getElementsByClassName('map__pin');
for(let i = 0; i < pins.length; i++)
{
 pins[i].addEventListener('click', (e) =>
 {
   createPopup(e.target.id.split('_')[1]);
 });
 pins[i].addEventListener('touchstart', (e) =>
 {
   createPopup(e.target.id.split('_')[1]);
 });
}
// Hide and show some of pins
let selectionBtns = document.getElementsByClassName('map__selection');
if(correctWidth > 991)
{
  let selectionBtns = document.getElementsByClassName('map__selection');
  for(let i = 0; i < selectionBtns.length; i++)
  {
   selectionBtns[i].addEventListener('click', (e) =>
   {
     for(let i = 0; i < selectionBtns.length; i++)
     {
       if(selectionBtns[i].className.includes('map__active-selection'))
       {
         selectionBtns[i].classList.remove('map__active-selection');
       }
     e.target.classList.add('map__active-selection');
     }
     if(e.target.id == 'all')
     {
       let showPins = document.getElementsByClassName('map__pin');
       for(let i = 0; i < showPins.length; i++)
       {
         if(showPins[i].className.includes('hidden'))
         {
           showPins[i].classList.remove('hidden');
         }
       }
     }
     else
     {
       let hidePins = document.getElementsByClassName('map__pin');
       for(let i = 0; i < hidePins.length; i++)
       {
         if(!hidePins[i].className.includes(pinStyle[e.target.id.split('_')[1]][0]))
         {
           hidePins[i].classList.add('hidden');
         }
         else
         {
           if(hidePins[i].className.includes('hidden'))
           {
             hidePins[i].classList.remove('hidden');
           }
         }
       }
     }
   });
 }
}
else
{
 let dropDown = document.getElementById('map-drop');
 dropDown.classList.remove('hidden');
 for(let i = 0; i < selectionBtns.length; i++)
 {
   selectionBtns[i].classList.add('hidden');
 }
}
