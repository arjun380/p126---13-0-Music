song = "";

scoreRightWrist = 0;
scoreRightWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristY = 0;
leftWristX = 0;

function preload()
{
    song = loadSound('music.mp3');
}
 function setup()
 {
     canvas = createCanvas(600, 500);
     canvas.center();

     video = createCapture(VIDEO);
     video.hide();

     poseNet = ml5.poseNet(video, modelLoaded);
     poseNet.on('pose', gotPoses);

 }
 function modelLoaded()
 {
     console.log("model is loaded");
 }

 function gotPoses(results)
 {
     if (results.length > 0)
     {
         scoreRightWrist = results[0].pose.keypoints[10].score;
         scoreleftWrist =  results[0].pose.keypoints[9].score;
    rightWristX =  results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

     }

 }

 function draw()
 {
     image(video, 0, 0, 600, 500);

     fill("#FF0000");
     stroke("#FF0000");

     if(scoreLeftWrist >0.2){
      circle(leftWristX,leftWristY,20);
      InNumberleftwristY = Number(leftWristY);
      
      new_leftWristY = floor(InNumberleftwristY *2);
      leftWristY_divide_1000 = new_leftWristY/1000;
      
      document.getElementById("volume").innerHTML = "Volume = " +leftWristY_divide_1000;
      song.setVolume(leftWristY_divide_1000);
     }
 }

 function play() {

    song.play();
    song.setVolume(1);
    song.rate(1);
 }

