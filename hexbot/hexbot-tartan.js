let canvas;
let ctx;

let background;
let controls;

// called by NOOPBOT on window.onload

function start_app() {

  document.body.style.backgroundColor = '#f1f1f1';
  document.getElementById('controls').style.padding = 20;

  // size canvas to window
  sizeCanvas();

  //fire a draw event.
  draw();

  //redraw when canvas is clicked.
  canvas.addEventListener('click', draw);
}

function sizeCanvas() {
  canvas = document.getElementById('canvas');
  ctx = NOOPBOT_SETUP_CANVAS( { canvas: canvas, bgColor:'#f1f1f1', width: 600, height: 600 });
}

function draw() {
  //get the data!
  NOOPBOT_FETCH({
    API: 'hexbot',
    count: 1
  }, drawSet);
}

function drawSet(responseJson) {
  sizeCanvas()
  let { colors } = responseJson;
  colors.forEach(function(color,count) {
    drawTartan(ctx, color);
  })
}

function drawTartan(ctx, color) {
  var img = new Image();

  // Download our Tartan Template from GitHub & allow CORS
  img.crossOrigin="anonymous";
  img.src = "https://raw.githubusercontent.com/Spedge/hexbot/master/images/blackandwhite.jpg"

  img.onload = function() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.stroke;

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
  
    hex = color.value;
    r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);
    
    for (var i = 0; i < data.length; i += 4) {

      if(data[i] < 200)
      {
        data[i]     = data[i] + r;
        data[i + 1] = data[i + 1] + g;
        data[i + 2] = data[i + 2] + b;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }; 
}

// listen if browser changes size.
window.onresize = function(event){
  sizeCanvas();
  draw();
};
