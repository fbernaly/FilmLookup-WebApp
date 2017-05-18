
function lookup() {
    var str = document.getElementById("film_number").value;

    if (str == "") {
        document.getElementById("output").innerHTML = "Enter film number";
        return;
    } else { 
        // document.getElementById("output").innerHTML = str;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("output").innerHTML = xhttp.responseText;
            }
        };
        xmlhttp.open("GET","lookup.php?film_number="+str, true);
        xmlhttp.send();
    }
}
