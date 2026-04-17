function updateMessage(event, message) {
    console.log(message);
    let elemE = document.getElementById("message");
    elemE.innerHTML = message;
    
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM content loaded", updateMessage);
    window.api.updateMessage(updateMessage);
});


