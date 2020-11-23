var source = document.querySelector("#new_entry").innerHTML; 
var template = Handlebars.compile(source);
document.body.innerHTML = template();

var back_button = document.getElementById("btn_click");
back_button.addEventListener("click", go_back);

//         return new Handlebars.SafeString(result);

//     });
// });


document.getElementById('add_entry_button').addEventListener('click', (event) => {
    event.preventDefault();


    var titleValue = document.getElementById("title").value;
    var dateOfEventValue = document.getElementById("dateOfEvent").value;
    var timeOfEntryValue = document.getElementById("timeOfEntry").value;
    var locationValue = document.getElementById("location").value;
    var categoryValue = document.getElementById("category").value;
    var commentsValue = document.getElementById("comments").value;
    var reviewValue = document.getElementById("review").value;
    var groupSizeValue = document.getElementById("groupSize").value;

    var entryData = {}
    entryData.userID = 1
    entryData.title = titleValue
    entryData.dateOfEvent = dateOfEventValue
    entryData.timeOfEntry = timeOfEntryValue
    entryData.location = locationValue
    entryData.category = categoryValue
    entryData.comments = commentsValue
    entryData.review = reviewValue
    entryData.groupSize = groupSizeValue

    var req = new XMLHttpRequest();
    req.open("POST", "http://localhost:3000/api/entries", true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function(){
        if(req.status >= 200 && req.status < 400){
            console.log("request was made!");
            
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    })
    req.send(JSON.stringify(entryData));

})

