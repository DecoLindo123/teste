song = ""; 
leftWristX = 0;
leftWristY = 0;
rigthWristX = 0;
rigthWristY = 0;

function preload()
{
    song = loadSound("music.mp3");

}
function setup()
{
    canvas = createCanvas(500,400);
    canvas.position(350,200);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses)
}
function draw()
{
    image(video, 0, 0, 500, 400);
    fill("#ff0000");
    stroke("#ff0000");
    circle(leftWristX, leftWristY, 20);
    inNumberLeftWrist = Number(leftWrist);
    removeDecimais = floor(inNumberLeftWrist);
    volume = removeDecimais/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
}
function modelLoaded()
{
    console.log("modelo carregado")
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rigthWristX = results[0].pose.rigthWrist.x;
        rigthWristY = results[0].pose.rigthWrist.y;
        console.log("rigthWristX = " + rigthWristX + "rigthWristY = " + rigthWristY);
    }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}