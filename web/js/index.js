window.onload = function () {
    sessionStorage.user = '{}'
    sessionStorage.user = '{"id":1,"firstName":"Francisco","lastName":"Bernal","email":"fbernaly@gmail.com","mobile":"7063511553","role":"admin"}'

    user = new User(JSON.parse(sessionStorage.user))

    setupHeaderSubtitle()
    setupNav()
    showAdminOptions()

    getFilms();
};

function setupNav() {
    var html = '<li><a href="#">Home</a></li>'
    if (user.isAuthenticated()) {
        html += '<li><a href="/account">My Account</a></li>'
        if (user.isAdmin()) {
            html += '<li><a href="/users">Users</a></li>'
        }
        html += '<li><a href="/logout">Log Out</a></li>'
    } else {
        html += '<li><a href="/login">Login</a></li>'
        html += '<li><a href="/signup">Sign Up</a></li>'
    }
    document.getElementById('ul_nav').innerHTML = html
}

function setupHeaderSubtitle() {
    document.getElementById('h2_title').innerHTML = 'Welcome' + (user.isAuthenticated() ? ' ' + user.firstName : '')
}

function showAdminOptions() {
    if (user.isAuthenticated() && user.isAdmin()) {
        document.getElementById('p_admi').style.display = ''
        document.getElementById('th_delete').style.display = ''
    }
}

function lookup() {
    var filter, table, tr, matching, containing;
    filter = document.getElementById("film_number").value.toUpperCase();
    table = document.getElementById("films_table");
    tr = table.getElementsByTagName("tr");
    matching = document.getElementById("matching").checked;
    containing = document.getElementById("containing").checked;

    var hide = true

    for (var i = 1; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (filter == "" || (matching == true && td.innerHTML.toUpperCase() == filter) || (containing == true && td.innerHTML.toUpperCase().indexOf(filter) > -1)) {
                tr[i].style.display = "";
                hide = false
            } else {
                tr[i].style.display = "none";
            }
        }
    }

    table.style.opacity = hide ? 0 : 1;
    hide ? showNotFound() : hideNotFound();
    hide ? showAddButton() : hideAddButton()
}

function getFilms() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                var json = JSON.parse(xmlhttp.responseText);
                setTimeout(function () {
                    displayTable(json);
                }, 900);
            }
            hideLoader();
        }
    };
    xmlhttp.open('GET', 'php/films.php');
    xmlhttp.send();
}

function hideLoader() {
    var loader = document.getElementById("loader");
    loader.style.opacity = 0;
    setTimeout(function () {
        loader.parentNode.removeChild(loader);
    }, 1000);
}

function displayTable(json) {
    var table = document.getElementById("films_table");
    var films = json;
    if (films.length > 0) {
        table.style.visibility = "visible";
        table.style.opacity = 1;
    } else {
        table.style.visibility = "hidden";
        table.style.opacity = 0;
    }
    for (film of films) {
        addRow(film);
    }
}

function addRow(film, sibling) {
    var table = document.getElementById("films_table");
    var tr = document.createElement("TR");
    addColumn(tr, film['film_number']);
    addColumn(tr, film['location']);
    addColumn(tr, film['created_at']);
    if (user.isAuthenticated() && user.isAdmin()) {
        addDeleteButton(tr, film['id'], film['film_number']);
    }
    if (sibling) {
        table.insertBefore(tr, sibling);
    } else {
        table.appendChild(tr);
    }
}

function addColumn(tr, text) {
    var td = document.createElement("TD");
    var textnode = document.createTextNode(text);
    td.appendChild(textnode);
    tr.appendChild(td);
}

function addDeleteButton(tr, id, number) {
    var td = document.createElement("TD");
    var button = document.createElement("BUTTON");
    button.onclick = function () {
        deleteFilm(id, number, tr);
    };
    var text = document.createTextNode("Delete");
    button.appendChild(text)
    td.appendChild(button);
    tr.appendChild(td);
}

function showNotFound() {
    var toast = document.getElementById("toast")
    var film_number = document.getElementById("film_number").value.toUpperCase();
    p = document.getElementById("ptoast");
    p.innerHTML = "'" + film_number + "' not found :("
    toast.style.transform = "translate(0px, -80px)";
    toast.style.opacity = 1;
    setTimeout(function () {
        hideNotFound();
    }, 1500);
}

function hideNotFound() {
    var toast = document.getElementById("toast")
    toast.style.transform = "translate(0px, 80px)";
    toast.style.opacity = 0;
}

function showAddButton() {
    var button = document.getElementById("add_button");
    if (user.isAuthenticated() && user.isAdmin()) {
        button.style.display = ""
    }
}

function hideAddButton() {
    var button = document.getElementById("add_button");
    button.style.display = "none"
}

function addFilm() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                var json = JSON.parse(xmlhttp.responseText);
                var film = json[0];
                var sibling = searchFilmSiblingInTable()
                addRow(film, sibling)
                lookup()
            } else {}
        }
    };
    xmlhttp.open('POST', 'php/films.php');
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    var number = document.getElementById("film_number").value
    var email = user.email
    xmlhttp.send('number=' + number + '&email=' + email);
}

function deleteFilm(id, number, tr) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                tr.parentNode.removeChild(tr);
                lookup()
                var p = document.getElementById("ptoast");
                p.innerHTML = "Film '" + number + "' deleted."
            } else {}
        }
    };
    xmlhttp.open('DELETE', 'php/films.php');
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send('id=' + id);
}

function searchFilmSiblingInTable() {
    var number, table, tr, matching, containing;
    number = document.getElementById("film_number").value.toUpperCase();
    table = document.getElementById("films_table");
    tr = table.getElementsByTagName("tr");

    for (var i = 1; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            var text = td.innerHTML.toUpperCase()
            if (parseInt(number) < parseInt(text)) {
                return tr[i];
            }
        }
    }
    return null;
}
