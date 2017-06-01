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
