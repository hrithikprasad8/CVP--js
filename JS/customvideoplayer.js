let playButton = document.getElementById('play-btn');
let ourvisual = document.querySelector('.video');
let volumeIcn = document.getElementById('volume-icon');
let volumerBar = document.querySelector('.volume-bar');
let progressBar = document.querySelector('.progress-bar');
let progressRange = document.querySelector('.progress-range');
let initialTimeOfVideo = document.querySelector('.time-elapsed');
let ttlDuration = document.querySelector('.time-duration');
let fullScrn = document.getElementById('flscn');
let isVideoPlaying = false;
let isVideoMuted = false;
let isFullScreen = false;
function playVideoSmoothly() {
    if (!isVideoPlaying) {
        ourvisual.play();
        playButton.classList.replace("fa-play", "fa-pause");
        isVideoPlaying = true;

    } else {
        ourvisual.pause();
        playButton.classList.replace("fa-pause", "fa-play");
        isVideoPlaying = false;
    }
}
function playVideoByKeyActn(event) {
    if (event.key === "" || event.keyCode === 32) {
        playVideoSmoothly();
    }
}
function movementOfProgressbar(event) {
    let ctime = event.target.currentTime;
    let tduration = event.target.duration;
    progressBar.style.cssText = `width: ${(ctime / tduration) * 100}%`;
}
function randomlyContinueVideo(event) {
    let onWhichPixel = event.offsetX;
    let widthOfProgressBar = this.clientWidth;
    let currentRange = (onWhichPixel / widthOfProgressBar) * ourvisual.duration;
    ourvisual.currentTime = currentRange;
}
function kybrdActnsTomoveback(event) {
    if (event.key === "ArrowLeft") {
        let newTme = ourvisual.currentTime - 3;
        if (newTme < 0) {
            newTme = 0; 
        }
        ourvisual.currentTime = newTme;
    }
}
function kybrdActnsTomovefront(event) {
    if (event.key === "ArrowRight") {
        let newTme = ourvisual.currentTime + 2;
        if (newTme > ourvisual.duration) {
            newTme = ourvisual.duration;
        }
        ourvisual.currentTime = newTme;
    }
}
function actionToMute() {
    if (!isVideoMuted) {
        volumeIcn.classList.replace("fa-volume-up", "fa-volume-down");
        ourvisual.muted = true;
        isVideoMuted = true;
    } else {
        volumeIcn.classList.replace("fa-volume-down", "fa-volume-up");
        ourvisual.muted = false;
        isVideoMuted = false;
    }
}
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);  //converting it into minutes.
    const remainingSeconds = Math.floor(seconds % 60); //converting it into seconds.
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;//converting them into minutes and second format
    return formattedTime;
}
function formatTime2(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    return formattedTime;
}

function initialtmestrt(event) {
    let strtinitl = event.target.currentTime;
    let tutalDuration = event.target.duration;
    const formattedTime = formatTime(strtinitl);
    initialTimeOfVideo.innerText = formattedTime;
}
function keepsInFullScreenSize() {
   if(!isFullScreen){
    ourvisual.requestFullscreen();
    isFullScreen = true;
   }else{
    document.exitFullscreen();
   }
} 
playButton.addEventListener("click", playVideoSmoothly);
ourvisual.addEventListener("click", playVideoSmoothly);
document.addEventListener("keydown", playVideoByKeyActn);
ourvisual.addEventListener("timeupdate", movementOfProgressbar);
progressRange.addEventListener("click", randomlyContinueVideo);
document.addEventListener("keydown", kybrdActnsTomoveback);
document.addEventListener("keydown", kybrdActnsTomovefront);
volumeIcn.addEventListener("click", actionToMute);
ourvisual.addEventListener("timeupdate", initialtmestrt);
fullScrn.addEventListener("click",keepsInFullScreenSize);



