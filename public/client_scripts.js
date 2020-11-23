var source = document.querySelector("#new_entry").innerHTML; 
var template = Handlebars.compile(source);
document.body.innerHTML = template();

var back_button = document.getElementById("btn_click");
back_button.addEventListener("click", go_back);

function go_back(event){
    window.history.back();
}