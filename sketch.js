var canvas;
var drawing= [];
var currentPath=[];
var isDrawing = false;


function setup(){
  canvas= createCanvas(1000,1000);
  canvas.mousePressed(startPath);
  canvas.parent('canvascontainer')
  canvas.mouseReleased(endPath);
 var saveButton = select('#saveButton');
 saveButton.mousePressed(saveDrawing);

 var clearButton = select('#clearButton');
 clearButton.mousePressed(clearDrawing);

 database= firebase.database();
}

function startPath(){
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}
function endPath(){
  isDrawing = false;
}
  

function draw(){
  background(255,0,0);

if(isDrawing){
  var point = {
    x:mouseX,
    y:mouseY
  }
  currentPath.push(point); 
}
beginShape();
stroke(0);
strokeWeight(4);
noFill();
for(var i=0; i<drawing.length;i++){
  var path= drawing[i]
  beginShape();
  for(var j=0; j<path.length;j++){
vertex(path[j].x,path[j].y)
}
endShape();
}
}

function saveDrawing(){
  var ref= database.ref('drawings');
  var data={
    drawing:drawing
  }
  ref.push(data);

}
function clearDrawing(){
  drawing= [];
}