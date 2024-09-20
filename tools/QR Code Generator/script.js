document.addEventListener("DOMContentLoaded", function () {
  const userInput = document.getElementById("userInput");
  const qrCodeElement = document.getElementById("qrcode");
  const submitButton = document.getElementById("submit");
  const downloadButton = document.getElementById("download");
  const sizeOptions = document.querySelector(".sizeOptions");
  const bgColor = document.getElementById("BGColor");
  const fgColor = document.getElementById("FGColor");

  function generateQRCode() {
    qrCodeElement.innerHTML = "";
    const qrCode = new QRCode(qrCodeElement, {
      text: userInput.value,
      width: parseInt(sizeOptions.value),
      height: parseInt(sizeOptions.value),
      colorDark: fgColor.value,
      colorLight: bgColor.value,
    });

    setTimeout(() => {
      const img = qrCodeElement.querySelector("img");
      const src = img.src;
      downloadButton.href = src;
      downloadButton.download = "qrcode.png";
      downloadButton.classList.remove("hide");
    }, 300);
  }

  userInput.addEventListener("input", function () {
    submitButton.disabled = !userInput.value.trim();
  });

  submitButton.addEventListener("click", generateQRCode);

  document.querySelector(".nav-toggle").addEventListener("click", function () {
    document.querySelector(".nav-links").classList.toggle("active");
  });
});
