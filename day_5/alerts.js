async function loadalers() {
    const container = document.getElementById("alerts-dropdown");

    try {
        const response = await fetch("alerts.JSON");
        const noti = await response.json();

        noti.forEach(alert => {
            const NotiDiv = document.createElement("div");

            // Conditional rendering using ternary operators and template literals
            const seenIcon = alert.read
                ? `<div class="seen-icon"><img width="15px" height="18px" src="assets/Icons/correct.png"></div>`
                : `<div class="seen-icon"><img width="15px" height="18px" src="assets/Icons/zoom-in.png"></div>`;

            const fileSection = alert["attached-files"]
                ? `<div class="files">
                        <div class="file-content"><img width="15px" height="15px" src="assets/Icons/paper-clip.png"> ${alert["attached-files"]} files are attached</div>
                        <div class="file-time">${alert.timestamp}</div>
                   </div>`
                : `<div class="time">${alert.timestamp}</div>`;

            // Conditionally add class for unread alert
            const alertClass = alert.read ? "drop-down-alerts" : "drop-down-alerts unread-alert";

            NotiDiv.innerHTML = `
                <div class="${alertClass}">
                    <div class="heading">
                        <div class="sender">
                            <div class="senders-lable">PA:</div>${alert.sender}
                        </div>
                        ${seenIcon}
                    </div>
                    <div class="alert-message">
                        ${alert.message}
                    </div>
                    ${fileSection}
                </div>
            `;

            container.appendChild(NotiDiv);
        });
    } catch (error) {
        console.log("stuck");
        container.innerHTML = `<p style="color: red;">Failed to load.</p>`;
    }

}

window.onload = loadalers();
