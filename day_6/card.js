async function loadCards() {
    const container = document.getElementById("card-container");

    try {
        const response = await fetch("Card-Data.json");
        const cards = await response.json();

        cards.forEach(card => 
            {
                const cardDiv = document.createElement("div");
                cardDiv.classList.add("Card");
                // if (card.expired) cardDiv.classList.add("Disabled");

                cardDiv.innerHTML = `
                    ${card.expired ? `<div class="Tag Expired">EXPIRED</div>` : ""}
                    <div class="Card-content">
                        <img src="${card.image}" class="Image" />
                        <div class="content">
                            <div class="Content-Title">
                                <div class="Title">${card.title}</div>
                                <div class="Star">
                                    <img width="20px" height="24px" src="assets/Icons/favourite.svg" class="${card.favourite ? '' : 'Unfav'}">
                                </div>
                            </div>
                            <div class="Information-about-course">${card.subject} | ${card.grade} <span class="Add">${card.extra}</span></div>
                            ${(card.units || card.lessons || card.topics) ? `
                            <span class="Units">
                                <b>${card.units}</b> units <b>${card.lessons}</b> lessons <b>${card.topics}</b> Topics
                            </span>` : ''}
                            <div class="Card-input">
                                <select class="classs">
                                    ${card.classOptions.map(option => `<option><b>${option}</b></option>`).join("")}
                                </select>
                            </div>
                            <span class="Information-about-class">${card.info}</span>
                        </div>
                    </div>
                    <div class="Info-Icons">
                        <a href="#watch" class ="preview"><img width="22px" height="24px" src="assets/Icons/preview.svg"></a>
                        <a href="#manage-courses" class="manage"><img width="18px" height="20px" src="assets/Icons/manage course.svg"></a>
                        <a href="#grade-submission" class="grade-submission"><img width="18px" height="20px" src="assets/Icons/grade submissions.svg"></a>
                        <a href="#reports" class="reports"><img width="25px" height="25px" src="assets/Icons/reports.svg"></a>
                    </div>
                `;
                if(cardDiv.previwe)
                    console.log("preview");
                container.appendChild(cardDiv);
        });

    } catch (error) {
        console.error("Error loading cards:", error);
        container.innerHTML = `<p style="color:red">Failed to load cards.</p>`;
    }
}

window.onload = loadCards;
