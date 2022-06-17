pmouseX = "";
pmouseY = "";
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifiyCanvas);
    synth = window.speechSynthesis;
}
function preload(){

classifier = ml5.imageClassifier('Doodlenet');

}
function clearcanvas(){
    background("white");
}
function draw(){
    strokeWeight(13);
    stroke(0)
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}
function gotResult(error,results){
if (error){
    console.error(error);
}
console.log(results);
document.getElementById('label').innerHTML = 'Label:' + results[0].label;

document.getElementById('confident').innerHTML = 'Confidence:' + Math.round(results[0].confidence*100)+ '%';

utterThis = new SpeechSynthesisUtterance(results[0].label);
synth.speak(utterThis);

}
function classifiyCanvas(){
    classifier.classify(canvas,gotResult);
}