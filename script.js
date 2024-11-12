console.log("Welcome TO Spotify");
//Initialize the variable 
let songIndex=0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems =Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementsByClassName('masterSongName')[0];

let songs =[
    {songName: "Let me Love You-Justin Beiber", filePath: "song/1.mp3", coverPath: "cover/1.jpg" ,duration: "3:26"},
    {songName: "Try Everything-Shakira", filePath: "song/2.mp3", coverPath: "cover/2.jpg",duration: "3:15"},
    {songName: "Espresso-Sabrina Carpenter", filePath: "song/3.mp3", coverPath: "cover/3.jpg",duration: "2:55"},
    {songName: "We don't talk anymore-Charlie Puth", filePath: "song/4.mp3", coverPath: "cover/4.jpg",duration: "3:15"},
    {songName: "Love Story-Taylor Swift", filePath: "song/5.mp3", coverPath: "cover/5.jpg",duration: "3:57"},
    {songName: "There's nothing olding me back-Shawn Mendes", filePath: "song/6.mp3", coverPath: "cover/6.jpg",duration: "3:58"},
    {songName: "People you know-Selena Gomez", filePath: "song/7.mp3", coverPath: "cover/7.jpg",duration: "3:16"},
    {songName: "Perfect-Ed Sheeran", filePath: "song/8.mp3", coverPath: "cover/8.jpg",duration: "4:40"},
    {songName: "Night Changes-One Direction", filePath: "song/9.mp3", coverPath: "cover/9.jpg",duration: "3:15"},
    {songName: "Despacito-Justin Beiber", filePath: "song/10.mp3", coverPath: "cover/10.jpg",duration: "3:50"},
];

songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
   
   
})

//audioElement.play()

//handle pause play click
masterPlay.addEventListener('click',(e)=>{
    console.log(e);
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
        makeAllPlays();
        document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-play-circle');
        document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-pause-circle');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
        e.target.classList.remove('fa-pause-circle');
        e.target.classList.add('fa-play-circle');
        makeAllPlays();
        
    }
});
//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})


makeAllPlays =()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element,index)=>{
    element.addEventListener('click',(e)=>{
        
        if(songIndex==index)
        {
        if(audioElement.paused)
        {
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        }
        else
        {
            audioElement.pause();
            gif.style.opacity=0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
        }
        }
        else{
            makeAllPlays();
        songIndex=index;
        masterSongName.innerText[0]=songs[songIndex].songName;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=`song/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        }
        
    })
});

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9)
    {
    songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`song/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0)
    {
    songIndex=9;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`song/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

audioElement.addEventListener('loadedmetadata',()=>{
    let totalDuration = audioElement.duration;
    document.getElementsByClassName('timestamp').innerText =formatTime(totalDuration);
});

audioElement.addEventListener('timeupdate',()=>
{
    document.getElementsByClassName('currentTime').innerText=formatTime(audioElement.currentTime);

});

function formatTime(time){
    let minutes = Math.floor(time/60);
    let seconds = Math.floor(time%60);
    return `${minutes}:${seconds<10?'0':''}${seconds}`;
}