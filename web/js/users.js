window.onload = function () {
    if (!localStorage.user || localStorage.user == '{}') {
        window.location.href = "index.html";
        return;
    }

    user = new User(JSON.parse(localStorage.user))

    if (!user.isAuthenticated || !user.isAdmin()) {
        window.location.href = "index.html";
        return;
    }

    getUsers();
};

function getUsers() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                var json = JSON.parse(xmlhttp.responseText);
                setTimeout(function () {
                    displayUsersTable(json);
                }, 900);
            }
            hideLoader();
        }
    };
    xmlhttp.open('GET', 'php/users.php');
    xmlhttp.send();
}

function hideLoader() {
    var loader = document.getElementById("loader");
    loader.style.opacity = 0;
    setTimeout(function () {
        loader.style.display = "none";
    }, 1000);
}

function displayUsersTable(json) {
    var table = document.getElementById("users_table");
    var success = json['success'];
    var users = json['data'];
    if (success && users.length > 1) {
        table.style.visibility = "visible";
        table.style.opacity = 1;
    } else {
        table.style.visibility = "hidden";
        table.style.opacity = 0;
    }
    var id = user.id;
    for (user of users) {
        if (user.id != id)
            addUserRow(new User(user));
    }
}

function addUserRow(user) {
    var table = document.getElementById("users_table");
    var tr = document.createElement("TR");
    addTextColumn(tr, user.id);
    addTextColumn(tr, user.fullName());
    addTextColumn(tr, user.email);
    addToggleColumn(tr, user.id, user.isAdmin());
    table.appendChild(tr);
}

function addTextColumn(tr, text) {
    var td = document.createElement("TD");
    var textnode = document.createTextNode(text);
    td.appendChild(textnode);
    tr.appendChild(td);
}

function addToggleColumn(tr, id, checked) {
    var td = document.createElement("TD");
    var html = '<div class="onoffswitch">'
    html += '<input type="checkbox" onclick="updateRole(this.id, this.checked);" name="onoffswitch" class="onoffswitch-checkbox" id="'
    html += id
    html += '"'
    html += checked ? " checked" : ""
    html += '>'
    html += '<label class = "onoffswitch-label" for = "'
    html += id
    html += '" >'
    html += '<span class = "onoffswitch-inner"></span>'
    html += '<span class = "onoffswitch-switch"></span>'
    html += '</label>'
    html += '</div>'
    td.innerHTML = html;
    tr.appendChild(td);
}

function updateRole(id, admin) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {} else {}
        }
    };
    xmlhttp.open('PUT', 'php/users.php');
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    var role = admin == true ? "2" : "1";
    xmlhttp.send('id=' + id + '&role_id=' + role);
}
