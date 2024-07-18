
var songFile = document.getElementById("songFile");
var playIcon = document.getElementById("playIcon");
var playlistVideo = document.getElementById("playlistVideo");
var favoritesList = document.getElementById("favoritesList");
var video = document.getElementById("video");

// Load playlist and favorites from localStorage
document.addEventListener('DOMContentLoaded', function() {
    var savedVideos = JSON.parse(localStorage.getItem('playlist')) || [];
    var favoriteVideos = JSON.parse(localStorage.getItem('favorites')) || [];
    savedVideos.forEach(function(video) {
        addVideoToPlaylist(video.data, video.name);
    });
    favoriteVideos.forEach(function(video) {
        addVideoToFavorites(video.data, video.name);
    });
});

songFile.onchange = function() {
    const file = songFile.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const url = event.target.result;
        video.src = url;
        video.play();
        playIcon.className = "fa-solid fa-pause";

        var star = document.getElementById("star");
        star.onclick = function() {
            var name = file.name;
            addVideoToFavorites(url, name);
            saveVideoToLocalStorage(url, name, 'favorites');
        };

        var name = file.name;
        addVideoToPlaylist(url, name);
        saveVideoToLocalStorage(url, name, 'playlist');
    };

    reader.readAsDataURL(file);
};

function addVideoToPlaylist(url, name) {
    var li = document.createElement("li");
    li.setAttribute("data-video-src", url);
    li.textContent = name;
    li.onclick = function() {
        var videoUrl = this.getAttribute("data-video-src");
        video.src = videoUrl;
        video.play();
    };

    var deleteButton = document.createElement("i");
    deleteButton.className = "fa-solid fa-trash delete-button";
    deleteButton.onclick = function(event) {
        event.stopPropagation();
        playlistVideo.removeChild(li);
        removeVideoFromLocalStorage(url, 'playlist');
    };
    li.appendChild(deleteButton);
    playlistVideo.appendChild(li);
}

function addVideoToFavorites(url, name) {
    var li = document.createElement("li");
    li.textContent = name;
    li.onclick = function() {
        var videoUrl = this.getAttribute("data-video-src");
        video.src = videoUrl;
        video.play();
    };

    var deleteButton = document.createElement("i");
    deleteButton.className = "fa-solid fa-trash delete-button";
    deleteButton.onclick = function(event) {
        event.stopPropagation();
        favoritesList.removeChild(li);
        removeVideoFromLocalStorage(url, 'favorites');

    };
    li.appendChild(deleteButton);
    favoritesList.appendChild(li);
}

function saveVideoToLocalStorage(url, name, key) {
    var savedVideos = JSON.parse(localStorage.getItem(key)) || [];
    savedVideos.push({ data: url, name: name });
    localStorage.setItem(key, JSON.stringify(savedVideos));
}

function removeVideoFromLocalStorage(url, key) {
    var savedVideos = JSON.parse(localStorage.getItem(key)) || [];
    savedVideos = savedVideos.filter(function(video) {
        return video.data !== url;

    });
    localStorage.setItem(key, JSON.stringify(savedVideos));
}



// Additional functionalities (play/pause, theme changes, etc.)
playIcon.onclick = function() {
    if(this.className == "fa-solid fa-play") {
        video.play();
        this.className = "fa-solid fa-pause";
    } else {
        video.pause();
        this.className = "fa-solid fa-play";
    }
};

var containerTheme = document.getElementById("containerTheme");
containerTheme.oninput = function() {
   var background = this.value;
   document.getElementById("header").style.backgroundColor = background;
   document.getElementById("controls").style.backgroundColor = background;
};

var IconTheme = document.getElementById("iconTheme");
IconTheme.oninput = function() {
    var background2 = this.value; 
    document.getElementById("backward").style.color = background2;
    document.getElementById("forward").style.color = background2;
    document.getElementById("playIcon").style.color = background2;
    document.getElementById("gear").style.color = background2;
    document.getElementById("download").style.color = background2;
    document.getElementById("fullScreen").style.color = background2;
    document.getElementById("high").style.color = background2;
};

var textTheme = document.getElementById("textTheme");
textTheme.oninput = function() {
   var background3 = this.value;
   document.getElementById("fav").style.color = background3;
   document.getElementById("chapter").style.color = background3;
};

var resetThemes = document.getElementById("resetThemes");
resetThemes.onclick = function() {
    location.reload();
};

video.ontimeupdate = function() {
    var progress = document.getElementById("progress");
    var time = (100 / this.duration) * this.currentTime;
    progress.style.width = time + "%";
};

var fullScreen  = document.getElementById("fullScreen");
fullScreen.onclick = function() {
    video.requestFullscreen();
};

setInterval(function() {
    var currentTime = video.currentTime / 60;
    var currentDuration = video.duration / 60;
    var time = currentTime.toFixed(2);
    document.getElementById("currentTime").innerHTML = time + " / " + currentDuration.toFixed(2);
}, 1000);

var forwardBtn = document.getElementById("forward");
forwardBtn.onclick = function() {
    var current = video.currentTime;
    video.currentTime = (current + 10);
};

var backwardBtn = document.getElementById("backward");
backwardBtn.onclick = function() {
    var current = video.currentTime;
    if(current > 10) video.currentTime = (current - 10);
};

var download = document.getElementById("download");
download.onclick = function() {
    var videoSrc = video.src;
    var a = document.createElement("a");
    a.href = videoSrc;
    a.download = videoSrc;
    document.body.appendChild(a);
    a.click();
};

var range = document.getElementById("ranges");
range.oninput = function() {
    var high = document.getElementById("high");
    video.volume = this.value;
    if(this.value == 0) {
        high.className = "fa-solid fa-bars";
    } else {
        high.className = "fa-solid fa-volume-high";
    }
};

document.getElementById("high").onclick = function() {
    var range = document.getElementById("ranges");
    range.value = 0;
    if(range.value == 0) {
        this.className = "fa-solid fa-bars";
        video.volume = range.value;
    }
};

var progress = document.getElementById("scrollBar");
progress.onclick = function(event) {
    var percent = event.offsetX / this.offsetWidth;
    video.currentTime = percent * video.duration;
};

var gear = document.getElementById("gear");
gear.onclick = function() {
    var gearBox = document.getElementById("gearBox");
    if(gearBox.style.display === "block") {
        gearBox.style.display = "none";
        gear.style.rotate = "-5deg";
        gear.style.transition = "0.3s";
    } else {
        gearBox.style.display = "block";
        gear.style.rotate = "90deg";
        gear.style.transition = "0.3s";
    }
};

const speedRange = document.getElementById('speedRange');
const speedValue = document.getElementById('speedValue');
const resetSpeed = document.getElementById('resetSpeed');

speedRange.addEventListener('input', function() {
    video.playbackRate = speedRange.value;
    speedValue.textContent = speedRange.value;
});

resetThemes.addEventListener('click', function() {
    document.body.classList.remove('dark-theme');
    alert('Themes reset!');
});


// Play next video when current video ends
video.onended = function() {
    var currentVideoIndex;
    var playlistItems = playlistVideo.getElementsByTagName("li");
    for (var i = 0; i < playlistItems.length; i++) {
        if (playlistItems[i].getAttribute("data-video-src") === video.src) {
            currentVideoIndex = i;
            break;
        }
    }
    var nextVideoIndex = currentVideoIndex + 1;
    if (nextVideoIndex < playlistItems.length) {
        var nextVideo = playlistItems[nextVideoIndex].getAttribute("data-video-src");
        video.src = nextVideo;
        video.play();
    }
};
