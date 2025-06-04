function validateForm(event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const comments = document.getElementById("comments").value.trim();
    const male = document.getElementById("male").checked;
    const female = document.getElementById("female").checked;

    if (name === "" || comments === "") {
        alert("Please fill out both fields.");
        return false;
    }

    if (!male && !female) {
        alert("Please select your gender.");
        return false;
    }

    alert("Form submitted successfully!");
    return true;
}
