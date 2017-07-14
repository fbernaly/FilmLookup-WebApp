window.onload = function () {
    document.getElementsByTagName("form")[0].onsubmit = function () {
        if (validatePasswords()) {
            signup();
        }
        return false;
    }
};

function validatePasswords() {
    var pass1 = document.getElementById("password").value;
    var pass2 = document.getElementById("confirm_password").value;
    if (pass1 != pass2) {
        document.getElementById("password").style.borderColor = "#E34234";
        document.getElementById("confirm_password").style.borderColor = "#E34234";
        alert("Passwords do not match.");
        return false;
    }
    return true;
}

function signup() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                var json = JSON.parse(xmlhttp.responseText);
                var success = json['success'];
                if (success) {
                    localStorage.user = JSON.stringify(json['data']);
                    window.location.href = "index.html";
                } else {
                    var message = json['error'];
                    alert(message);
                }
            } else {}
        }
    };
    xmlhttp.open('POST', 'php/signup.php');
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    var firstName = document.getElementById("firstName").value
    var lastName = document.getElementById("lastName").value
    var mobile = document.getElementById("mobile").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    xmlhttp.send('firstName=' + firstName + '&lastName=' + lastName + '&mobile=' + mobile + '&email=' + email + '&password=' + password);
}
