window.onload = function () {
    document.getElementsByTagName("form")[0].onsubmit = function () {
        login();
        return false;
    }
};

function login() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                var json = JSON.parse(xmlhttp.responseText);
                var success = json['success'];
                if (success) {
                    sessionStorage.user = JSON.stringify(json['user']);
                    window.location.href = "index.html";
                } else {
                    var message = json['error'];
                    alert(message);
                }  
            } else {}
        }
    };
    xmlhttp.open('POST', 'php/login.php');
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    xmlhttp.send('password=' + password + '&email=' + email);
}
