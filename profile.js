
// url copy paste security
function url_secure(){
    if(sessionStorage.length<=0){
        var page = document.getElementById("profileBox");
        page.style.display = "none";
        document.body.style.background = "black"
        document.body.innerHTML = "<h1 style='color:white' >Wrong Action Performed</h1>"
    }
}

url_secure()




function upload_pic() {
    var input = document.getElementById("uploadFile");
    var fileReader = new FileReader();

    fileReader.readAsDataURL(input.files[0]);
    fileReader.onloadend = function(event) {
        var image_url = event.target.result;
        document.getElementById("uploadIcon").style.display = "none";
        
        var show = document.getElementById("uploadBox");
        show.style.background = "url(" + image_url + ")";
        show.style.backgroundRepeat = "no-repeat";
        show.style.backgroundSize = "cover";
        show.style.backgroundPosition = "center";
        show.style.objectFit = "cover";

        var userIcon = document.getElementById("arrow");
        userIcon.onclick = function() {
            localStorage.setItem(localStorage.getItem('user_mail') + "images", image_url);
            location.replace("welcome.html");
        };
    };
}

function profile_name() {
    var result = document.getElementById("welcome");
    var user_mail = sessionStorage.getItem('user_mail');
    var image_url = localStorage.getItem(user_mail + "images");
    var user_details = localStorage.getItem(user_mail);
    var user_data = JSON.parse(user_details);
    var fullname = user_data.name;
    result.innerHTML = atob(fullname);
}

profile_name();

function stop_upload() {
    if (localStorage.getItem(sessionStorage.getItem('user_mail') + "images") != null) {
        document.getElementById("profileContentBox").style.display = "none";
        location.replace("welcome.html");
    }
}

stop_upload();



