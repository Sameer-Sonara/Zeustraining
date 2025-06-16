
    const notiCard = [
      {
        message: "License for Introduction to Algebra has been assigned to your school",
        timestamp: "15-Sep-2018 07:21 pm",
        seen : true
      },
      {
        message: "Lesson 3 Practice Worksheet overdue for Amy Santiago",
        course: "Advanced Mathematics",
        timestamp: "14-Sep-2018 05:21 pm",
        seen : false
      },
      {
        message: "23 new students created",
        timestamp: "14-Sep-201801:21 pm",
        seen : true
      },
      {
        message: "15 submissions ready for evaluation",
        class: "Basics of Algebra",
        timestamp: "13-Sep-2018 01:15 pm",
        seen : false
      },
      {
        message: "License for Basic Concepts in Geometry has been assigned to your school",
        timestamp: "15-Sep-2018 07:21 pm",
        seen : true
      },
      {
        message: "Lesson 3 Practice Worksheet overdue for Sam Diego",
        course: "Advanced Mathematics",
        timestamp: "15-Sep-2018 05:21 pm",
        seen : false
      }
    ];

    function displayNotifications(data) {
      const container = document.getElementById("notifications-alerts");

      data.forEach((item) => {
        const notiBox = document.createElement("div");
        notiBox.className = "notification-card ";

        let content = `
        <div class="notification-card   ${item.seen ? "unseen" : ""}">
            <div class="notiBox">
                <div class="notification-message">${item.message}</div>
                <div class="status-icon">
                    ${item.seen ? `<img src="assets/Icons/correct.png" width="20" height="20"/>` : `<img src="assets/Icons/zoom-in.png" width="20" height="20" />`}
                </div>
            </div>
            <div class="meta-info">
                ${item.course ? `<div class = "notiCourse">Course:</div> ${item.course}<br>` : ""}
                ${item.class ? `<div class="notiClass">Class:</div> ${item.class}<br>` : ""}
            </div>
            <div class="time">${item.timestamp}</div>
        </div>
        `;

        notiBox.innerHTML = content;
        container.appendChild(notiBox);
      });
    }

    document.addEventListener("DOMContentLoaded", () => {
      displayNotifications(notiCard);
    });