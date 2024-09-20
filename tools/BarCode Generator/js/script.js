/*document.getElementById("btn").addEventListner("click",function (){
var value = document.getElementById("usr").value;
JsBarcode("#barcode", value);
  
  });*/

function go(){
  
  var value = document.getElementById("usr").value;
  JsBarcode("#barcode", value);
}

downloadBarCode =function (el){
  var canvas = document.getElementById("barcode");
  var image = canvas.toDataURL("image/jpg");
  el.href = image;
};


document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
  });
});