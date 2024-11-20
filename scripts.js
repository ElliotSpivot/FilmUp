$(document).ready(function () {
    $('span[data-name="pedidos"]').click(function () {
  $('form').show();
    });
  
    $('.items span').not('[data-name="pedidos"]').click(function () {
  $('form').hide();
    });
  
    $('#myInput').on("keyup", function () {
  let searchValue = $(this).val().toLowerCase();
  $(".gallery .poster").each(function () {
   let title = $(this).attr("title") || "";
   if (title.toLowerCase().includes(searchValue)) {
    $(this).show();
   } else {
    $(this).hide();
   }
  });
    });
   });
  
   const filterItem = document.querySelector(".items");
   const filterImg = document.querySelectorAll(".gallery .poster");
  
   window.onload = () => {
    filterItem.onclick = (selectedItem) => {
  if (selectedItem.target.classList.contains("item")) {
   filterItem.querySelector(".active").classList.remove("active");
   selectedItem.target.classList.add("active");
   let filterName = selectedItem.target.getAttribute("data-name");
   filterImg.forEach((image) => {
    let filterImges = image.getAttribute("data-name");
    if ((filterImges == filterName) || (filterName == "all")) {
  image.classList.remove("hide");
    } else {
  image.classList.add("hide");
    }
   });
  }
    };
   };
  
   const botToken = '7329413680:AAFFa4ZGi000_jFt81EJ6NAoPZgi4QslC_Q';
   const chatId = '1837831353';
  
   document.getElementById("pedidoForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const tipo = document.getElementById("tipo").value;
    const nombre = document.getElementById("nombre").value;
    const anio = document.getElementById("anio").value;
    const imagen = document.getElementById("imagen").files[0];
  
    let message = `Nuevo pedido:\nTipo: ${tipo}\nNombre: ${nombre}\nAño: ${anio}\nPortada ⬇️`;
  
    let formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append("text", message);
  
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
  method: "POST",
  body: formData,
    })
  .then((response) => response.json())
  .then((data) => {
   if (data.ok) {
    alert("Mensaje enviado a Telegram con éxito");
   } else {
    alert("Error al enviar el mensaje");
   }
  })
  .catch((error) => {
   console.error("Error:", error);
   alert("Error al enviar el mensaje");
  });
  
    if (imagen) {
  let formDataImage = new FormData();
  formDataImage.append("chat_id", chatId);
  formDataImage.append("photo", imagen);
  
  fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
   method: "POST",
   body: formDataImage,
  })
   .then((response) => response.json())
   .then((data) => {
    if (data.ok) {
  console.log("Imagen enviada con éxito");
    } else {
  console.error("Error al enviar la imagen");
    }
   })
   .catch((error) => console.error("Error al enviar la imagen:", error));
    }
   });