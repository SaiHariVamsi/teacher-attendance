var baseRedirectLink = "https://cheery-cendol-c36cd5.netlify.app/";

var durationInSeconds = 30;

var qrCodeContainer = document.getElementById("qr-code-container");

function generateAndDisplayQRCode() {
    qrCodeContainer.innerHTML = "";

    var timestampedLink = baseRedirectLink + "?timestamp=" + Math.floor(Date.now() / 1000);

    var qr = new QRCode(document.createElement("div"), {
        text: timestampedLink,
        width: 256,
        height: 256,
    });

    qrCodeContainer.appendChild(qr._el);
}

function updateTimers(elapsedSeconds) {
    var remainingSeconds = durationInSeconds - elapsedSeconds;

    var changeTimer = Math.min(10, remainingSeconds); 
    document.getElementById("change-timer").innerText = "QR Code will change in: " + changeTimer + "s";

    var stopTimer = Math.max(0, remainingSeconds - 10); 
    document.getElementById("stop-timer").innerText = "QR Codes will stop in: " + stopTimer + "s";
}

function updateDynamicTimers() {
    var elapsedSeconds = 0;

    var qrCodeIntervalId = setInterval(function () {
        generateAndDisplayQRCode();
        elapsedSeconds += 10;

        if (elapsedSeconds >= durationInSeconds) {
            clearInterval(qrCodeIntervalId);
            qrCodeContainer.innerHTML = ""; 
            document.getElementById("change-timer").innerText = "QR Codes have stopped changing.";
            document.getElementById("stop-timer").innerText = "QR Codes have stopped serving.";

            window.location.href = "timeout.html";
        }

    }, 10000);

    var timerIntervalId = setInterval(function () {
        updateTimers(elapsedSeconds);

        if (elapsedSeconds >= durationInSeconds) {
            clearInterval(timerIntervalId);
        }

    }, 1000);
    updateTimers(elapsedSeconds);
}

generateAndDisplayQRCode();
updateDynamicTimers();
