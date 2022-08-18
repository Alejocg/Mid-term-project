function validateForm() {
    let fullName = document.forms["contact-form"]["fname"].value;
    let mail = document.forms["contact-form"]["email"].value;
    let phone = document.forms["contact-form"]["phone"].value.length;
    let message = document.forms["contact-form"]["message"].value;

    if (fullName === "Ironhack" || fullName === "ironhack") {
        alert("You can not be Ironhack, because I am Ironhack");
        return false;
    } else if (fullName == "" || fullName == null) {
        alert("Name must be filled out");
        return false;
    } else if (mail == "") {
        alert("Please provide a valid e-mail to send spam");
        return false;
    } else if (isNaN(phone)) {
        alert("Give us your phone!");
        return false;
    } else if (phone > 8) {
        alert(
            "Are you trolling? In our country number phones has at least 9 numbers ..."
        );
        return false;
    } else if (message == null || message == "") {
        alert(
            "C'mon, write something. We won't even care about your opinion."
        );
        return false;
    } else {
        return true;
    }
}
