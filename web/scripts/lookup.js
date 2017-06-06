function lookup() {
    var str = document.getElementById("film_number").value;
    if (str == "") {
        document.getElementById("response").innerHTML = "Film number missing";
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    document.getElementById("response").innerHTML = xmlhttp.responseText;
                } else {
                    alert('There was a problem with the request.');
                }
            }
        };
        xmlhttp.open('GET', 'scripts/lookup.php?film_number=' + str);
        xmlhttp.send();
    }
}

function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if (email == "") {
        document.getElementById("response").innerHTML = "<p>Email missing</p>";
        return;
    }
    if (password == "") {
        document.getElementById("response").innerHTML = "Password missing";
        return;
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                var response = xmlhttp.responseText;
                if (response.startsWith("<p>")) {
                    document.getElementById("response").innerHTML = response;
                    return;
                }
                document.getElementById("response").innerHTML = "<p>User logged in</p>";
                if (typeof (Storage) !== "undefined") {
                    // Store
                    sessionStorage.setItem("user", response);
                    sessionStorage.setItem("email", email);
                }
                window.location.href = "index.html";
            }
            else {
                alert('There was a problem with the request.');
            }
        }
    };
    xmlhttp.open('POST', 'scripts/login.php', true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send('email=' + email + '&password=' + password);
}
