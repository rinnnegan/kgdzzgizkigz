// URL de la webhook de Discord
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1345088596205506690/_kYIVj1dol9MWNoHxiWMOQmQkTsuJ9u7fUn0FTPAwum9pDGEIeHNThK9-qV-z3DzC607';

// Función para enviar log a Discord
function enviarLogADiscord(ip, deviceInfo, ciudad, pais) {
    const logMessage = {
        content: `Nuevo acceso a la web:\nIP: ${ip}\nDispositivo: ${deviceInfo}\nCiudad: ${ciudad}\nPaís: ${pais}`
    };

    fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(logMessage)
    })
    .then(response => {
        if (response.ok) {
            console.log("Log enviado correctamente.");
        } else {
            console.error("Error al enviar el log.");
        }
    })
    .catch(error => {
        console.error("Error al enviar el log:", error);
    });
}

// Obtener la IP, Ciudad y País utilizando ip-api (sin API key)
function obtenerIPYUbicacion() {
    fetch('http://ip-api.com/json/')
    .then(response => response.json())
    .then(data => {
        const ip = data.query; // IP del cliente
        const ciudad = data.city; // Ciudad del cliente
        const pais = data.country; // País del cliente

        // Obtener las especificaciones del dispositivo
        const userAgent = navigator.userAgent;

        // Enviar los datos al webhook
        enviarLogADiscord(ip, userAgent, ciudad, pais);
    })
    .catch(error => {
        console.error("Error al obtener la información de la IP:", error);
    });
}

// Llamar a la función para obtener la IP y la ubicación al cargar la página
obtenerIPYUbicacion();

// Mostrar/Ocultar las secciones
document.getElementById("serverButton").addEventListener("click", function() {
    document.getElementById("serverSection").style.display = "block";
    document.getElementById("infoSection").style.display = "none";
});

document.getElementById("infoButton").addEventListener("click", function() {
    document.getElementById("serverSection").style.display = "none";
    document.getElementById("infoSection").style.display = "block";
});
