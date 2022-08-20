function validateForm() {
    let fullName = document.forms["contact-form"]["fname"].value;

    if (fullName.toLower() === "Ironhack" || fullName === "ironhack") {
        alert("You can not be Ironhack, because I am Ironhack");
        return false;
    }  else {
        return true;
    }
}
