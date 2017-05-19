
function lookup() {
    var str = document.getElementById("film_number").value;

    if (str == "") {
        document.getElementById("output").innerHTML = "Enter film number";
        return;
    } else { 
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 500) {
                document.getElementById("readyState").innerHTML = xmlhttp.readyState;
                document.getElementById("status").innerHTML = xmlhttp.status;
                document.getElementById("output").innerHTML = xmlhttp.responseText;
            }
        };
        xmlhttp.open("GET","scripts/lookup.php?film_number="+str);
        xmlhttp.send();
    }
}
