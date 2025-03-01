const logos = {
    "planeacion": {
      "horizontal": "logos/planeacion-horizontal.svg",
      "vertical": "logos/planeacion-vertical.svg",
      "completo": "logos/planeacion-completo.svg"
    },
    "coemere": {
      "horizontal": "logos/coemere-horizontal.svg",
      "vertical": "logos/coemere-vertical.svg",
      "completo": "logos/coemere-completo.svg"
    }
  };
  
  function mostrarLogo() {
    const dependencia = document.getElementById("dependencia").value;
    const modelo = document.getElementById("modelo").value;
    const logoUrl = logos[dependencia][modelo];
  
    // Se elimina el estilo inline para permitir el ajuste dinámico
    document.getElementById("logo-container").innerHTML = `<img id="logo" src="${logoUrl}" alt="Logo">`;
    ajustarProporcion();
  }
  
  function actualizarAlturaValor() {
    const rangeInput = document.getElementById("img-height-range");
    document.getElementById("img-height-value").textContent = rangeInput.value;
  }
  
  function ajustarProporcion() {
    const img = document.getElementById("logo");
    if (!img) return;
    const height = parseInt(document.getElementById("img-height-range").value, 10);
    if (img.naturalWidth && img.naturalHeight) {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      const width = Math.round(height * aspectRatio);
      // Se ajusta directamente la imagen
      img.style.height = height + "px";
      img.style.width = width + "px";
    } else {
      img.onload = function() {
        ajustarProporcion();
      };
    }
  }
  
  function showToast(message, bgColor = "bg-secondary") {
    const toastEl = document.getElementById("liveToast");
    const toastBody = document.getElementById("toast-message");
    toastBody.textContent = message;
    toastEl.classList.remove("bg-secondary", "bg-success", "bg-danger", "bg-warning");
    toastEl.classList.add(bgColor);
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
  
  // Función actualizada para descargar el SVG sin abrirlo en otra pestaña
  function descargarLogo(formato) {
    const dependencia = document.getElementById("dependencia").value;
    const modelo = document.getElementById("modelo").value;
    const logoUrl = logos[dependencia][modelo];
    
    fetch(logoUrl)
      .then(response => response.blob())
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `logo-${dependencia}-${modelo}.${formato}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
        showToast("Descarga iniciada para SVG", "bg-success");
      })
      .catch(() => {
        showToast("Error al descargar el SVG.", "bg-danger");
      });
  }
  
  function descargarComoImagen(formato) {
    const img = document.getElementById("logo");
    if (!img) {
      alert("Primero selecciona y muestra un logo.");
      return;
    }
  
    const height = parseInt(document.getElementById("img-height-range").value, 10) || 500;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const width = Math.round(height * aspectRatio);
    
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    
    const svgImg = new Image();
    svgImg.crossOrigin = "anonymous";
    svgImg.src = img.src;
    
    svgImg.onload = function() {
      ctx.drawImage(svgImg, 0, 0, width, height);
      const link = document.createElement("a");
      link.href = canvas.toDataURL(`image/${formato}`);
      link.download = `logo.${formato}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(`Descarga iniciada para ${formato.toUpperCase()}`, "bg-success");
    };
    
    svgImg.onerror = function() {
      showToast("Error al cargar la imagen para descarga.", "bg-danger");
    };
  }
  
  // Nueva función para copiar el PNG al portapapeles
  function copiarComoImagen() {
    const img = document.getElementById("logo");
    if (!img) {
      alert("Primero selecciona y muestra un logo.");
      return;
    }
    
    const height = parseInt(document.getElementById("img-height-range").value, 10) || 500;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const width = Math.round(height * aspectRatio);
    
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    
    const svgImg = new Image();
    svgImg.crossOrigin = "anonymous";
    svgImg.src = img.src;
    
    svgImg.onload = function() {
      ctx.drawImage(svgImg, 0, 0, width, height);
      canvas.toBlob(blob => {
        if (!blob) {
          showToast("Error al generar la imagen.", "bg-danger");
          return;
        }
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]).then(() => {
          showToast("Imagen copiada al portapapeles", "bg-success");
        }).catch(() => {
          showToast("Error al copiar la imagen.", "bg-danger");
        });
      }, "image/png");
    };
    
    svgImg.onerror = function() {
      showToast("Error al cargar la imagen para copiar.", "bg-danger");
    };
  }
  