window.onload = function () {
    if (!sessionStorage.user || sessionStorage.user == '{}') {
        window.location.href = "index.html";
        return;
    }

    user = new User(JSON.parse(sessionStorage.user))
    
    if (!user.isAuthenticated) {
        window.location.href = "index.html";
        return;
    }
    
    document.getElementById("p_fullname").innerHTML = user.fullName()
    document.getElementById("p_email").innerHTML = user.email
    document.getElementById("p_mobile").innerHTML = user.mobile
    document.getElementById("p_role").innerHTML = user.role

    if (!user.isAdmin()) {
        var p = document.getElementById("p_patron");
        p.style.visibility = "visible";
        p.style.opacity = 1;
        
        var a = document.getElementById("users_link");
        a.parentElement.removeChild(a);
    }
};
