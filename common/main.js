function toggleRow(id, className){
    var caretID = id + "Caret";
    var caret = document.getElementById(caretID);
    caret.classList.toggle("fa-caret-right");
    caret.classList.toggle("fa-caret-down");
    var yearElement = document.getElementById(id);
    var elements = document.getElementsByClassName(className);
    var i = 0;
    var prev = elements[0].hidden;
    if(prev == true){
        yearElement.style.borderBottom = "none";
    }
    else{
        yearElement.style.borderBottom = "solid";
        yearElement.style.borderBottomColor = "white";
    }
    for(i; i < elements.length; i++){
        elements[i].hidden = !prev;
    }
}