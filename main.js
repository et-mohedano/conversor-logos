const logos = {
    "hidalgo": {
        "horizontal": "logos/hidalgo-horizontal.svg",
        "vertical": "logos/hidalgo-vertical.svg",
    },
    "planeacion": {
        "horizontal": "logos/planeacion-horizontal.svg",
        "vertical": "logos/planeacion-vertical.svg",
        "completo": "logos/planeacion-completo.svg"
    },
    "coemere": {
        "horizontal": "logos/coemere-horizontal.svg",
        "vertical": "logos/coemere-vertical.svg",
        "completo": "logos/coemere-completo.svg"
    },
    "gobierno": {
        "horizontal": "logos/gobierno-horizontal.svg",
        "vertical": "logos/gobierno-vertical.svg",
        "completo": "logos/gobierno-completo.svg"
    },
    "oficialia": {
        "horizontal": "logos/oficialia-mayor-horizontal.svg",
        "vertical": "logos/oficialia-mayor-vertical.svg",
        "completo": "logos/oficialia-mayor-completo.svg"
    },
    "obras": {
        "horizontal": "logos/obras-publicas-horizontal.svg",
        "vertical": "logos/obras-publicas-vertical.svg",
        "completo": "logos/obras-publicas-completo.svg"
    }
};

function mostrarLogo() {
    const dependencia = document.getElementById("dependencia").value;
    const modelo = document.getElementById("modelo").value;
    const logoUrl = logos[dependencia][modelo];

    document.getElementById("logo-container").innerHTML = `<img id="logo" src="${logoUrl}" alt="Logo" class="img-fluid" style="max-width: 300px;">`;
    showNotification("Logo cargado", "bg-success");
}

function ajustarProporcion() {
    const img = document.getElementById("logo");
    if (!img) return;
    const height = document.getElementById("img-height").value;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
}

function descargarLogo(formato) {
    const dependencia = document.getElementById("dependencia").value;
    const modelo = document.getElementById("modelo").value;
    const logoUrl = logos[dependencia][modelo];

    const link = document.createElement("a");
    link.href = logoUrl;
    link.download = `logo-${dependencia}-${modelo}.${formato}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification("Descarga iniciada", "bg-info");
}

function descargarComoImagen(formato) {
    const img = document.getElementById("logo");
    if (!img) {
        showNotification("Primero selecciona y muestra un logo.", "bg-danger");
        return;
    }

    const svgURL = img.src;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const height = parseInt(document.getElementById("img-height").value, 10) || 500;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const width = Math.round(height * aspectRatio);

    const svgImg = new Image();
    svgImg.crossOrigin = "anonymous";
    svgImg.src = svgURL;

    svgImg.onload = function() {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(svgImg, 0, 0, width, height);

        const link = document.createElement("a");
        link.href = canvas.toDataURL(`image/${formato}`);
        link.download = `logo.${formato}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showNotification("Descarga iniciada", "bg-info");
    };
}

function copiarImagen() {
    const img = document.getElementById("logo");
    if (!img) {
        showNotification("Primero selecciona y muestra un logo.", "bg-danger");
        return;
    }

    const svgURL = img.src;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const height = parseInt(document.getElementById("img-height").value, 10) || 500;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const width = Math.round(height * aspectRatio);

    const svgImg = new Image();
    svgImg.crossOrigin = "anonymous";
    svgImg.src = svgURL;

    svgImg.onload = function() {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(svgImg, 0, 0, width, height);

        canvas.toBlob(blob => {
            if (!blob) {
                showNotification("Error al copiar la imagen.", "bg-danger");
                return;
            }
            const item = new ClipboardItem({ "image/png": blob });
            navigator.clipboard.write([item])
                .then(() => {
                    showNotification("Imagen copiada al portapapeles", "bg-success");
                })
                .catch(err => {
                    showNotification("Error copiando imagen. Intenta nuevamente.", "bg-danger");
                });
        }, "image/png");
    };
}
function showNotification(message, bgClass = "bg-success") {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        console.error("No se encontró el contenedor de notificaciones.");
        return;
    }
    // Crear el elemento toast
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white ${bgClass} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
      </div>
    `;
    // Agregar el toast al contenedor
    toastContainer.appendChild(toast);
    // Inicializar y mostrar el Toast
    const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
    bsToast.show();
    // Remover el toast una vez oculto
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}
