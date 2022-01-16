prediction="";
Webcam.set({
    width: 400,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
cam=document.getElementById("cam");
Webcam.attach('#cam');
function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="cam_result" src="' + data_uri + '"/>';
    });
}
console.log('ml5_version', ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/AzQZeyki-/model.json', modelLoaded);
function modelLoaded(){
    console.log('Model Loaded')
}
function speak(){
    synth=window.speechSynthesis;
    speakdata= "The prediction is " + prediction;
    utterThis=new SpeechSynthesisUtterance (speakdata);
    synth.speak(utterThis);
}
function check(){
    img=document.getElementById("cam_result");
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_hand_gesture_name").innerHTML=results[0].label;
        prediction=results[0].label;
        speak()
        if(results[0].label=="Thumb's Up"){
            document.getElementById("update_emoji").innerHTML="&#9995";
        }
        if(results[0].label=="Thumb's Down"){
            document.getElementById("update_emoji").innerHTML="&#10145";
        }
        if(results[0].label=="Peace Out"){
            document.getElementById("update_emoji").innerHTML="&#128512";
        }
    }
}