var songFile = document.getElementById("songFile");
var playIcon = document.getElementById("playIcon");
var playlist = document.getElementById("playlist");
var playlistVideo = document.getElementById("playlistVideo");

// Load playlist from localStorage
document.addEventListener('DOMContentLoaded', function() {
    var savedVideos = JSON.parse(localStorage.getItem('playlist')) || [];
    var savedVideos = JSON.parse(localStorage.getItem('playlistVideo')) || [];
    savedVideos.forEach(function(video) {
        addVideoToPlaylist(video.data, video.name);
    });
});

songFile.onchange = function() {
    const file = songFile.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const url = event.target.result;
        var video = document.getElementById("video");
        video.src = url;
        video.play();
        playIcon.className = "fa-solid fa-pause";

        var star = document.getElementById("star");
        star.onclick = function() {
            var name = file.name;
            addVideoToPlaylist(url, name);
            saveVideoToLocalStorage(url, name);
        }
    }

    reader.readAsDataURL(file);
};

function addVideoToPlaylist(url, name) {
    var li = document.createElement("li");
    var playLi = document.createElement("li");
    li.setAttribute("data-video-src", url);
    playLi.setAttribute("data-video-src", url);
    li.textContent = name;
    playLi.textContent = name;
    li.onclick = function() {
        var videoUrl = this.getAttribute("data-video-src");
        var myVideo = document.getElementById("video");
        myVideo.src = videoUrl;
        myVideo.play();
    };

    playLi.onclick = function() {
        var videoUrl = this.getAttribute("data-video-src");
        var myVideo = document.getElementById("video");
        myVideo.src = videoUrl;
        myVideo.play();
    };

    
    var deleteButton = document.createElement("i");
    deleteButton.className = "fa-solid fa-trash delete-button";
    deleteButton.onclick = function(event) {
        event.stopPropagation();
        playlist.removeChild(li);
        playlistVideo.removeChild(playLili)
        removeVideoFromLocalStorage(url);
    };
    li.appendChild(deleteButton);
    playLi.appendChild(deleteButton);
    playlist.appendChild(li);
    playlistVideo.appendChild(playLi)
}

function saveVideoToLocalStorage(url, name) {
    var savedVideos = JSON.parse(localStorage.getItem('playlist')) || [];
    var savedVideos = JSON.parse(localStorage.getItem('playlistVideo')) || [];
    savedVideos.push({ data: url, name: name });
    localStorage.setItem('playlist', JSON.stringify(savedVideos));
    localStorage.setItem('playlistVideo', JSON.stringify(savedVideos));
}

function removeVideoFromLocalStorage(url) {
    var savedVideos = JSON.parse(localStorage.getItem('playlist')) || [];
    var savedVideos = JSON.parse(localStorage.getItem('playlistVideo')) || [];
    savedVideos = savedVideos.filter(function(video) {
        return video.data !== url;
    });
    localStorage.setItem('playlist', JSON.stringify(savedVideos));
    localStorage.setItem('playlistVideo', JSON.stringify(savedVideos));
}







//play and pause coding
var video = document.getElementById("video");
var play = document.getElementById("playIcon");
play.onclick = function(){

    if(this.className == "fa-solid fa-play"){
        video.play()
        this.className = "fa-solid fa-pause"
    }else{
        video.pause()
        this.className = "fa-solid fa-play"
    }
   

}



var containerTheme = document.getElementById("containerTheme");
containerTheme.oninput = function(){
   var background = this.value;
   document.getElementById("header").style.backgroundColor = background;
   document.getElementById("controls").style.backgroundColor = background;
}

var IconTheme = document.getElementById("iconTheme");
IconTheme.oninput = function(){
var background2 = this.value; 
  document.getElementById("backward").style.color = background2;
  document.getElementById("forward").style.color = background2;
  document.getElementById("playIcon").style.color = background2;
  document.getElementById("gear").style.color = background2;
  document.getElementById("download").style.color = background2;
  document.getElementById("fullScreen").style.color = background2;
  document.getElementById("refresh").style.color = background2;
  document.getElementById("high").style.color = background2;

}

var textTheme = document.getElementById("textTheme");
textTheme.oninput = function(){
   var background3 = this.value;
   document.getElementById("fav").style.color = background3;
   document.getElementById("chapter").style.color = background3;
}

var resetThemes = document.getElementById("resetThemes");
resetThemes.onclick = function(){
    location.reload();
}


//progress bar
video.ontimeupdate = function(){
    var progress = document.getElementById("progress");
    var time = (100/this.duration) * this.currentTime;
    progress.style.width = time + "%"
}



//full screen
var fullScreen  = document.getElementById("fullScreen");
fullScreen.onclick = function(){
    video.requestFullscreen()
}


setInterval(function(){
    var currentTime = video.currentTime/60;
    var currentDuration = video.duration/60;
    var time = currentTime.toFixed(2);
    document.getElementById("currentTime").innerHTML = time + " / " + currentDuration.toFixed(2);
},1000)




var forwardBtn = document.getElementById("forward");
forwardBtn.onclick = function(){
    var current= video.currentTime
      video.currentTime = (current+10);
}

var backwardBtn = document.getElementById("backward");
backwardBtn.onclick = function(){
    var current= video.currentTime
     if(current > 10) video.currentTime = (current-10);
};




//Download
var download = document.getElementById("download");
download.onclick = function(){
    var videoSrc = video.src;
    var a = document.createElement("a");
    a.href = videoSrc;
    a.download = videoSrc;
    document.body.appendChild(a);
    a.click()
}






var range = document.getElementById("ranges");
range.oninput = function(){
    var high = document.getElementById("high")
    video.volume = this.value;
    if(this.value == 0){
        high.className = "fa-solid fa-bars"
    }else{
                high.className = "fa-solid fa-volume-high"
    }
}


document.getElementById("high").onclick = function(){
  var range = document.getElementById("ranges");
  range.value = 0;
  if(range.value == 0){
    this.className = "fa-solid fa-bars"
    video.volume = range.value;
  }
}


var progress = document.getElementById("scrollBar");
progress.onclick = function(event){
    var percent = event.offsetX / this.offsetWidth;
    video.currentTime = percent * video.duration;
}




var gear = document.getElementById("gear");
gear.onclick = function(){
    var gearBox = document.getElementById("gearBox");
    if(gearBox.style.display === "block"){
        gearBox.style.display = "none"
        gear.style.rotate = "-5deg"
        gear.style.transition = "0.3s"
    }else{
        gearBox.style.display = "block"
         gear.style.rotate = "90deg"
        gear.style.transition = "0.3s"
    }
}

const speedRange = document.getElementById('speedRange');
const speedValue = document.getElementById('speedValue');
const resetSpeed = document.getElementById('resetSpeed');


// Speed control
speedRange.addEventListener('input' , function() {
    video.playbackRate = speedRange.value;
    speedValue.textContent = speedRange.value;
});



// Reset themes (placeholder functionality)
resetThemes.addEventListener('click', function() {
    document.body.classList.remove('dark-theme');
    alert('Themes reset!');
});



