var baseRedirectLink = "https://saiharivamsi.github.io/student-attendace/";

// Set the duration for QR code generation in seconds
var durationInSeconds = 60;

var qrCodeContainer = document.getElementById("qr-code-container");

// Function to generate and display the QR code
function generateAndDisplayQRCode() {
    // Clear previous QR code
    qrCodeContainer.innerHTML = "";

    // Append a timestamp to the base link to make it unique
    var timestampedLink = baseRedirectLink + "?timestamp=" + Math.floor(Date.now() / 1000);

    // Generate the QR code for the timestamped link
    var qr = new QRCode(document.createElement("div"), {
        text: timestampedLink,
        width: 256,
        height: 256,
    });

    // Append the QR code to the container
    qrCodeContainer.appendChild(qr._el);
}

// Function to update the timer display
function updateTimers(elapsedSeconds) {
    var remainingSeconds = durationInSeconds - elapsedSeconds;

    var changeTimer = Math.min(10, remainingSeconds); // Display countdown for the first 10 seconds
    document.getElementById("change-timer").innerText = "QR Code will change in: " + changeTimer + "s";

    var stopTimer = Math.max(0, remainingSeconds - 10); // Display countdown after the first 10 seconds
    document.getElementById("stop-timer").innerText = "QR Codes will stop in: " + stopTimer + "s";
}

function updateDynamicTimers() {
    var elapsedSeconds = 0;

    // Set up the interval to update the QR code every 10 seconds
    var qrCodeIntervalId = setInterval(function () {
        generateAndDisplayQRCode();
        elapsedSeconds += 10;

        // Clear the interval after the specified duration
        if (elapsedSeconds >= durationInSeconds) {
            clearInterval(qrCodeIntervalId);
            qrCodeContainer.innerHTML = ""; // Clear the container after the specified duration

            // Update the timers to indicate that QR codes have stopped
            document.getElementById("change-timer").innerText = "QR Codes have stopped changing.";
            document.getElementById("stop-timer").innerText = "QR Codes have stopped serving.";

            // Redirect to a different page
            window.location.href = "complete_page.html"; // Replace with the actual URL of the page
        }

    }, 10000);

    // Set up a separate interval to update the timers every second
    var timerIntervalId = setInterval(function () {
        // Update the timers
        updateTimers(elapsedSeconds);

        if (elapsedSeconds >= durationInSeconds) {
            clearInterval(timerIntervalId);
        }

    }, 1000);

    // Initial update of timers
    updateTimers(elapsedSeconds);
}

// Call the function initially
generateAndDisplayQRCode();

// Call the function to update dynamic timers
updateDynamicTimers();
