
function lookup() {
    var str = document.getElementById("film_number").value;

    if (str == "") {
        document.getElementById("response").innerHTML = "Film number missing";
        return;
    } else { 
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 500) {
                document.getElementById("response").innerHTML = xmlhttp.responseText;
            }
        };
        xmlhttp.open("GET","scripts/lookup.php?film_number="+str);
        xmlhttp.send();
    }
}
