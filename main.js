song="";
leftx=0;
lefty=0;
rightx=0;
righty=0;
scoreLeftWrist=0;
scoreRightWrist=0;

 function preload(){
    song=loadSound("music.mp3");
 }

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
video.hide();

posenet = ml5.poseNet(video ,Load);
posenet.on('pose',gotposes);
}

function Load(){
   console.log('posenet is started');
}

function gotposes(results){
   if(results.length> 0){
      console.log(results);
      leftx = results[0].pose.leftWrist.x;
      lefty = results[0].pose.leftWrist.y;

       rightx= results[0].pose.rightWrist.x;
       righty= results[0].pose.rightWrist.y;

       console.log('leftWrist x is '+leftx+' leftWrist y is ' +lefty);
       console.log('rightWrist x is '+rightx+' rightWrist y is ' +righty);

       scoreLeftWrist = results[0].pose.keypoints[9].score;
       console.log('scoreLeftWrist = '+ scoreLeftWrist);

       scoreRightWrist = results[0].pose.keypoints[10].score;
       console.log('score Right Wrist = '+ scoreRightWrist);


   }
}

function draw(){
    image( video,0,0 ,600 ,500);

    fill('#FF0000');
    stroke('#FF0000');

if(scoreRightWrist > 0.2){
    circle(rightx , righty , 20);

    if(righty > 0 && righty<=100){
      document.getElementById("speed").innerHTML="speed = 0.5x";
      song.rate(0.5);
    }
    else if(righty >100 && righty<=200){
      document.getElementById("speed").innerHTML="speed = 1x";
      song.rate(1);
    }
    else if(righty >200 && righty<=300){
      document.getElementById("speed").innerHTML="speed = 1.5x";
      song.rate(1.5);
    }

    else if(righty >300 && righty<=400){
      document.getElementById("speed").innerHTML="speed = 2x";
      song.rate(2);
    }

    else if(righty >400 && righty<=500){
      document.getElementById("speed").innerHTML="speed = 2.5x";
      song.rate(2.5);
    }
}
    if(scoreLeftWrist > 0.2){
      circle(leftx , lefty,20);
      leftwristy = Number(lefty);
      left=floor(leftwristy);
      volume = left/500;
      document.getElementById('volume').innerHTML ="volume = "+volum;
      song.setvolume(volume);
    }
}

function play(){
   song.play();
   song.setvolume(1);
   song.rate(1);
}

function pause(){
    song.pause();
 }

 function stop(){
    song.stop();
 }

