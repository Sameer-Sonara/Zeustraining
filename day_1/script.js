function validateForm(event) {
    event.preventDefault();

    const name = document.getElementById("name");
    const comments = document.getElementById("comments");
    const male = document.getElementById("male").checked;
    const female = document.getElementById("female").checked;
    
    const error = document.getElementsByClassName("error");

    for(var i = 0 ; i<error.length ; i++)
    error[i].innerHTML="";
    
    
    if (name.value.trim() === "" )
    {
        // alert("Please fill your name");
        name.focus();
        error[0].innerHTML="Please fill you name";
        return false;

    }
    if(comments.value.trim() === "") 
    {
        // alert("Please add your comments");
        comments.focus();
        error[1].innerHTML="Please fill you Comments";
        return false;        
    }

    if (!male && !female) {
        // alert("Please select your gender.");
        error[2].innerHTML="Please select your gender";
        return false;
    }
    for(var i = 0 ; i<error.length ; i++)
    error[i].innerHTML="";
    alert("Form submitted successfully!");
    return true;
}
