function generarCodigoQR() {
  var qrContainer = document.getElementById("codigoQRContainer");
  var urlInput = document.getElementById("urlInput").value.trim();

  if (urlInput !== "") {
    var typeNumber = 4;
    var errorCorrectionLevel = "L";
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(urlInput);
    qr.make();

    var canvas = document.createElement("canvas");
    canvas.width = qr.getModuleCount() * 6;
    canvas.height = qr.getModuleCount() * 6;
    var context = canvas.getContext("2d");

    for (var y = 0; y < qr.getModuleCount(); y++) {
      for (var x = 0; x < qr.getModuleCount(); x++) {
        if (qr.isDark(y, x)) {
          context.fillStyle = "#000";
        } else {
          context.fillStyle = "#fff";
        }
        context.fillRect(x * 6, y * 6, 6, 6);
      }
    }

    // Limpiar contenedor previo antes de añadir el nuevo código QR
    while (qrContainer.firstChild) {
      qrContainer.removeChild(qrContainer.firstChild);
    }

    qrContainer.appendChild(canvas);
    document.getElementById("descargarQR").style.display = "block";
  } else {
    alert("Por favor, ingrese una URL válida.");
  }
}

function descargarCodigoQR() {
    var qrCanvas = document.querySelector("#codigoQRContainer canvas");

    if (qrCanvas !== null) {
        var downloadLink = document.createElement("a");
        downloadLink.href = qrCanvas.toDataURL("image/png");
        downloadLink.download = "codigoQR.png";
        downloadLink.click();
    } else {
        alert("Primero genera el código QR antes de descargarlo.");
    }
}