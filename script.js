const playList = document.getElementById("playList")
const audioTag = document.getElementById("audioTag")
const trackCover = document.getElementById("trackCover")
const trackTitle = document.getElementById("trackTitle")
const trackAlbum = document.getElementById("trackAlbum")
const trackSinger = document.getElementById("trackSinger")
const muteButton = document.getElementById("muteButton")
const playIcon = document.getElementById("playIcon")
const playPauseButton = document.getElementById("playPauseButton")
const volumeRange = document.getElementById("volumeRange")
const seekBar = document.getElementById("seekBar")
const bodyTag = document.querySelector("body")
const passedTime = document.getElementById("passedTime")
const totalTime = document.getElementById("totalTime")
const tracksThumbnail = document.getElementsByClassName("tracksThumbnail")
let volumeValue = 80
let playState = false 
let iconStatus = false
let muteState = false
let repeatState = false
let shuffleState = false
let oldTrackId
let trackId = parseInt(Math.random()*10)
const musicData = [ {id: "0",color: "#be8216", title: "Blinding Lights", album: "After Hours", artist: "The Weeknd", url:"src/music/The Weeknd - Blinding Lights.mp3", cover:"src/img/cover/The-Weeknd-Blinding-Lights.jpg"},
                    {id: "1",color: "#6d23ac", title: "Divoonegi (Black Box)", album: "Black Box", artist: "Sirvan Khosravi", url:"src/music/Sirvan Khosravi - Divoonegi (Black Box).mp3", cover:"src/img/cover/Sirvan-Khosravi-Divoonegi-(Black-Box).jpg"},
                    {id: "2",color: "#121212", title: "Dar Astaneye Piri", album: "Abraham", artist: "Mohsen Chavoshi", url:"src/music/Mohsen Chavoshi - Dar Astaneye Piri.mp3", cover:"src/img/cover/Mohsen Chavoshi - Ebrahim.jpg"},
                    {id: "3",color: "#012b51", title: " Nightcall", album: "10th Record Makers", artist: "Kavinsky", url:"src/music/Kavinsky - Nightcall.mp3", cover:"src/img/cover/a0849033462_10.jpg"},
                    {id: "4",color: "#80221e", title: "Ghafas Bas", album: "Single", artist: "Mehdi Yarrahi", url:"src/music/Mehdi Yarrahi - Ghafas Bas.mp3", cover:"src/img/cover/photo_2022-09-21_14-39-55.jpg"},
                    {id: "5",color: "#242b35", title: "Shabe Masti", album: "Single", artist: "Ali Zand Vakili", url:"src/music/Ali Zand Vakili - Shabe Masti.mp3", cover:"src/img/cover/Ali-Zand-Vakili-Shabe-Masti.jpg"},
                    {id: "6",color: "#290137", title: "Ghabe Akse Khali", album: "Single", artist: "Sirvan Khosravi", url:"src/music/Sirvan Khosravi - Ghabe Akse Khali.mp3", cover:"src/img/cover/4759d0beaa1bd5443a1ba1eb2e50c9b5993.jpg"},
                    {id: "7",color: "#050d0f", title: "I Feel It Coming (Ft DAFT PUNK)", album: "Starboy", artist: "The Weeknd", url:"src/music/The Weeknd - I Feel It Coming ( Ft DAFT PUNK ).mp3", cover:"src/img/cover/The-Weeknd-I-Feel-It-Coming-Ft-DAFT-PUNK-.jpg"},
                    {id: "8",color: "#121212", title: "To Dar Masafate Barani", album: "Abraham", artist: "Mohsen Chavoshi", url:"src/music/Mohsen Chavoshi - To Dar Masafate Barani.mp3", cover:"src/img/cover/Mohsen Chavoshi - Ebrahim.jpg"},
                    {id: "9",color: "#53524c", title: "Bebin Haleto (Violin Instrumental)", album: "Mano Seda Bezan", artist: "Ehsan Neyzan", url:"src/music/Ehsan Neyzan - Bebin Haleto (Violin Instrumental).mp3", cover:"src/img/cover/Ehsan-Neyzan-Mano-Seda-Bezan.jpg"},]
//loading musics form objects//
musicData.forEach(val =>{
    let track = document.createElement("img")
    track.classList.add("tracksThumbnail", "h-[100px]", "w-[100px]", "rounded-2xl", "cursor-pointer", "mb-4")
    track.src = val.cover
    track.setAttribute("data-i",val.id)
    track.setAttribute("onclick","selectTrack(this)")
    playList.appendChild(track)
})
//loading musics form objects//
audioTag.onloadedmetadata = function(){
    audioTag.volume = volumeRange.value/100
    passedTime.innerText = parseInt(audioTag.currentTime / 60) +":"+ parseInt(audioTag.currentTime % 60)
    totalTime.innerHTML = parseInt(audioTag.duration / 60) +":"+ parseInt(audioTag.duration % 60)
}
volumeRange.onchange = function(){
    audioTag.volume = volumeRange.value/100
    volumeValue = volumeRange.value
    muteFunction()
}
muteButton.addEventListener("click",() => {
    if (!muteState){
        volumeRange.value = 0
        audioTag.volume = 0    
        muteState = !muteState  
        muteFunction()
    }else{
        volumeRange.value = volumeValue
        audioTag.volume = volumeRange.value/100
        muteState = !muteState   
        muteFunction()
    }
})
//load first music to player//
updateTrack(trackId)
//load first music to player//
audioTag.onloadedmetadata = function(){
    seekBar.max = audioTag.duration
    seekBar.value = audioTag.currentTime
}
setInterval(() => {
    seekBar.value = audioTag.currentTime
    passedTime.innerText = parseInt(audioTag.currentTime / 60) +":"+ parseInt(audioTag.currentTime % 60)
    totalTime.innerHTML = parseInt(audioTag.duration / 60) +":"+ parseInt(audioTag.duration % 60)
    if (audioTag.ended){
        nextTrack()
    }
}, 500);
seekBar.onchange = function(){
    audioTag.currentTime = seekBar.value
}
//select track//
function selectTrack(track){
    trackId = track.getAttribute("data-i")
    updateTrack(trackId)
    playAgain()
}
//select track//
playPauseButton.addEventListener("click",() => {
    playStopTrack()
    changeIcon()
})
 //play track function//
function playStopTrack(){
    if (!playState){
        audioTag.play()
        playState = !playState
    }else{
        audioTag.pause()
        playState = !playState
    }
}
function playAgain(){
    if (playState){
        audioTag.play()
    }
}
 //play track function//
function changeIcon(){
    if (!iconStatus){
        playIcon.classList.toggle("animate-bounce")
        playPauseButton.src = "src/img/stop_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg"
        iconStatus = !iconStatus
    }else{
        playIcon.classList.toggle("animate-bounce")
        playPauseButton.src = "src/img/play_arrow_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg"
        iconStatus = !iconStatus
    }
}
//next track function//
function nextTrack(){
    if (trackId < 9){
        trackId++
    }else{
        trackId = 0
    }
    updateTrack(trackId)
    playAgain()
}
//next track function//
//previous track function//
function previousTrack(){
    if (trackId > 0){
        trackId--
    }else{
        trackId = 9
    }
    updateTrack(trackId)
    playAgain()
}
//previous track function//
//update track//
function updateTrack(selectedTrack){
    if(shuffleState){
        let oldSelectedTrack = selectedTrack
        selectedTrack = parseInt(Math.random()*10)
        if (oldSelectedTrack === selectedTrack){
            console.log("repeat")
            updateTrack(selectedTrack)
        }
    }
    audioTag.setAttribute("data-s",selectedTrack)
    audioTag.src = musicData[selectedTrack].url
    trackCover.src = musicData[selectedTrack].cover
    trackTitle.innerText = musicData[selectedTrack].title
    trackAlbum.innerText = musicData[selectedTrack].album
    trackSinger.innerText = musicData[selectedTrack].artist
    bodyTag.bgColor = musicData[selectedTrack].color
    for (let i = 0; i <= 9; i++) {
        tracksThumbnail[i].style.width = "100px"
        tracksThumbnail[i].style.height = "100px"
    }
    tracksThumbnail[selectedTrack].style.width = "130px"
    tracksThumbnail[selectedTrack].style.height = "130px"
    tracksThumbnail[selectedTrack].scrollIntoView()
}
//update track//

function muteFunction(){
    if(volumeRange.value == 0){
        muteButton.src = "src/img/volume_off_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg"
    }else{
        muteButton.src = "src/img/volume_up_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg"
    }
}

function repeatTrack(){
    if (!repeatState){
        audioTag.setAttribute("loop","loop")
        repeatButton.src = "src/img/repeat_one_on_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg"
        repeatState = !repeatState
    }else{
        audioTag.removeAttribute("loop")
        repeatButton.src = "src/img/repeat_one_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg"
        repeatState = !repeatState
    }
}
function shufflePlay(){
    if (!shuffleState){
        shuffleButton.src = "src/img/shuffle_on_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg"
        shuffleState = !shuffleState
        oldTrackId = trackId
    }else{
        shuffleButton.src = "src/img/shuffle_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg"
        shuffleState = !shuffleState
        trackId = audioTag.getAttribute("data-s")
    }
}
