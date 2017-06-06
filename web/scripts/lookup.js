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
                var json = JSON.parse(response);;
                setItem("firstname", json['firstname']);
                setItem("lastname", json['lastname']);
                setItem("email", json['email']);
                setItem("mobile", json['mobile']);
                setItem("role", json['role']);
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

function getUsers(id) {
     var xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState == XMLHttpRequest.DONE) {
             if (xmlhttp.status == 200) {
                 document.getElementById(id).innerHTML = xmlhttp.responseText;
             } else {
                 alert('There was a problem with the request.');
             }
         }
     };
     xmlhttp.open('GET', 'scripts/all_users.php');
     xmlhttp.send();
}

function getFilms(id) {
     var xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState == XMLHttpRequest.DONE) {
             if (xmlhttp.status == 200) {
                 document.getElementById(id).innerHTML = xmlhttp.responseText;
             }
             else {
                 alert('There was a problem with the request.');
             }
         }
     };
     xmlhttp.open('GET', 'scripts/all_data.php');
     xmlhttp.send();
}

function deleteFilm(button) {
     var row = button.parentNode.parentNode;
     var film = row.firstChild.firstChild.nodeValue;
     if (film == null) {
         alert('Error');
         return;
     }
     var xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState == XMLHttpRequest.DONE) {
             if (xmlhttp.status == 200) {
                 row.parentNode.removeChild(row);
                 alert("Film " + film + " was removed.");
             }
             else {
                 alert('There was a problem with the request.');
             }
         }
     };
     xmlhttp.open('GET', 'scripts/delete.php?film_number=' + film);
     xmlhttp.send();
}

function addFilm() {
    var film = document.getElementById("film_number").value;
    if (film == "") {
        document.getElementById("response").innerHTML = "Film number missing";
        return;
    } else {
        document.getElementById("response").innerHTML = "";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    document.getElementById("response").innerHTML = xmlhttp.responseText;
                    getFilms('all_films');
                }
                else {
                    alert('There was a problem with the request.');
                }
            }
        };
        xmlhttp.open('POST', 'scripts/insert.php');
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        var email = getItem('email');
        xmlhttp.send('film_number=' + film + '&email=' + email);
    }
}

function setItem(key, value) {
    if (typeof (Storage) !== "undefined") {
        sessionStorage.setItem(key, value);
    }
}
