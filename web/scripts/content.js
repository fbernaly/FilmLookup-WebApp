function setWelcomeMessage(id) {
    var firstname = getItem("firstname");
    if (firstname == null) {
        document.getElementById(id).innerHTML = "<p>Welcome to the Film Lookup Service for the Sacramento FamilySearch Library. Now you can look up your films in a quick and reliable way.</p><p>As a patron you can enter the film number you are looking for and get a quick response.</p><p>If you are an admin login to add or remove more films to the database.</p>";
    } else {
        document.getElementById(id).innerHTML = "<p>Welcome " + firstname + " to the Film Lookup Service for the Sacramento FamilySearch Library.</p>";
    }
}

function setFooter(id) {
    document.getElementById(id).innerHTML = "<p>Published: May, 2017</p><p>©2017 fby</p>";
}

function setNavBar(id) {
    var firstname = getItem("firstname");
    if (firstname == null) {
        setTitle(id, true);
        var nav = document.createElement('nav');
        nav.innerHTML = "<ul><li><a href='index.html'>Home</a></li><li><a href=\"login.html\">Log In</a></li><li><a href=\"signup.html\">Sign Up</a></li></ul>";
        document.getElementById(id).appendChild(nav);
    } else {
        setTitle(id, true);
        var nav = document.createElement('nav');
        nav.innerHTML = "<ul><li><a href='index.html'>Home</a></li><li><a href='acount.html'>My account</a></li><li><a href='manage.html'>Films</a></li><li><a href='index.html' onclick='logout()'>Log Out</a></li></ul>";
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
    clearSession();
    location.reload();
}

function goToHome() {
    window.location.href = "index.html";
}

function setMyAccount(id) {
    var firstname = getItem("firstname");
    var lastname = getItem("lastname");
    var email = getItem("email");
    var mobile = getItem("mobile");
    var role = getItem("role");
    
    document.getElementById(id).innerHTML = "<h3>Contact Information</h3><p>" + firstname + " " + lastname + "</p><p>" + email + "</p><p>" + mobile + "</p><p>" + role + "</p><p>********</p><button onclick=\"editInfo()\">Edit</button>";
}

function editInfo() {
}

function getItem(key) {
    return sessionStorage.getItem(key);
}

function clearSession() {
    sessionStorage.clear();
}
