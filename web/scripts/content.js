function setWelcomeMessage(id) {
    var user = sessionStorage.getItem("user");
    if (user == null) {
        document.getElementById(id).innerHTML = "<p>Welcome to the Film Lookup Service for the Sacramento FamilySearch Library. Now you can look up your films in a quick and reliable way.</p><p>As a patron you can enter the film number you are looking for and get a quick response.</p><p>If you are an admin login to add or remove more films to the database.</p>";
    } else {
        document.getElementById(id).innerHTML = "<p>Welcome " + user + "</p>";
    }
}

function setFooter(id) {
    document.getElementById(id).innerHTML = "<p>Published: May, 2017</p><p>©2017 fby</p>";
}

function setNavBar(id) {
    var user = sessionStorage.getItem("user");
    if (user == null) {
        setTitle(id, true);
        var nav = document.createElement('nav');
        nav.innerHTML = "<ul><li><a href=\"login.html\">Log In</a></li><li><a href=\"signup.html\">Sign Up</a></li></ul>";
        document.getElementById(id).appendChild(nav);
    } else {
        setTitle(id, true);
        var nav = document.createElement('nav');
        nav.innerHTML = "<ul><li><a href='acount.html'>My account</a></li><li><a href='manage.html'>Database</a></li><li><a onclick='logout()'>Log Out</a></li></ul>";
        document.getElementById(id).appendChild(nav);
    }
}

function setTitle(id, clickable = false) {
    if (clickable) {
        document.getElementById(id).innerHTML = "<h1 onclick='goToHome()'>Film Lookup</h1>";
    } else {
        document.getElementById(id).innerHTML = "<h1>Film Lookup</h1>";
    }
}

function logout() {
    sessionStorage.clear();
    location.reload();
}

function goToHome() {
    window.location.href = "index.html";
}
