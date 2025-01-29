const logos = {
    "dependencia1": {
        "horizontal": "logos/dependencia1-horizontal.svg",
        "vertical": "logos/dependencia1-vertical.svg",
        "completo": "logos/dependencia1-completo.svg"
    },
    "dependencia2": {
        "horizontal": "logos/dependencia2-horizontal.svg",
        "vertical": "logos/dependencia2-vertical.svg",
        "completo": "logos/dependencia2-completo.svg"
    }
};

function mostrarLogo() {
    const dependencia = document.getElementById("dependencia").value;
    const modelo = document.getElementById("modelo").value;
    const logoUrl = logos[dependencia][modelo];

    document.getElementById("logo-container").innerHTML = `<img id="logo" src="${logoUrl}" alt="Logo" class="img-fluid" style="max-width: 300px;">`;
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
}

function descargarComoImagen(formato) {
    const img = document.getElementById("logo");
    if (!img) {
        alert("Primero selecciona y muestra un logo.");
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
    };
}