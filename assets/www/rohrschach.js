var ICONSIZE = 40;
var CACHED_PICTURES = 5;

var brushColor = Color.darkBlue();
var paperColor = Color.white();

var themes = [["blue", "white"],["red", "white"],["black", "white"],["green", "white"]];
var canvasses = new Array();
var currentTheme = 0;
var currentImageIndex = 0;

var currentWidth = 0;
var currentHeight = 0;

function fillCache(w, h) {
	canvasses.length = 0;
	for (var i = 0; i < CACHED_PICTURES; ++i) {
		canvasses.push(renderToCanvas(paintCanvas, w, h));
	}
}

function paintCached(index) {
	var canvas = document.getElementById("rohrschachCanvas");
	canvas.width = currentWidth;
	canvas.height = currentHeight;

	var ctx = canvas.getContext("2d");
	ctx.drawImage(canvasses[index], 0, 0);
}

function nextImage() {
	if (currentImageIndex >= CACHED_PICTURES) {
		fillCache(currentWidth, currentHeight);
		currentImageIndex = 0;
	}
	paintCached(currentImageIndex);
	currentImageIndex = currentImageIndex + 1;
}

function renderToCanvas(renderFunction, w, h) {
    var buffer = document.createElement("canvas");
    renderFunction(w, h, buffer);
    return buffer;
};

function paintCanvas(width, height, canvas) {
	var ctx    = canvas.getContext("2d");
	
	canvas.width = width;
    canvas.height = height;

    var sizeFactor = 1 + Math.min(canvas.height, canvas.width) / 200;
    var brushMaxSize = 4 * sizeFactor;
	var inkAmountMin = 150 * sizeFactor;
	var inkAmountMax = 1500 * sizeFactor;
	var stepWidth = 3 * sizeFactor;

	var halfWidth = canvas.width / 2 - brushMaxSize * 2;
	var height    = canvas.height - brushMaxSize * 2;

	ctx.fillStyle = brushColor.toAlphaString();

	var x = -1;
	var y = -1;

	var inkAmount = randomRange(inkAmountMin, inkAmountMax);

	for (var i = 0; i < inkAmount; i++) {

		if (x < 0 || x > halfWidth)	x = randomInt(halfWidth);
		if (y < 0 || y > height)	y = randomInt(height);

		var brushSize = randomRange(1, brushMaxSize);

		ctx.beginPath();
      	ctx.arc(                x + 1.5 * brushMaxSize, y + brushMaxSize, brushSize, 0, 2 * Math.PI, false);
      	ctx.arc(2 * halfWidth - x + 2.5 * brushMaxSize, y + brushMaxSize, brushSize, 0, 2 * Math.PI, false);
      	

		x = (x - stepWidth) + (randomInt(100) % (2*stepWidth+1));
		y = (y - stepWidth) + (randomInt(100) % (2*stepWidth+1));
		ctx.fill();
	}
}

function initializeApp() {
	var original = document.getElementById("rohrschachCanvas");
	var w = window.innerWidth - original.offsetLeft * 2; 
	var h = window.innerHeight - original.offsetTop * 2 - ICONSIZE;
	original.width 	= w;
	original.height = h;

	currentWidth = w;
	currentHeight = h;

	fillCache(w, h);
	nextImage();

	$("#rohrschachCanvas").swipe(nextImage());
}


function nextTheme() {
	currentTheme += 1;
	if (currentTheme >= themes.length) currentTheme = 0;
	brushColor = Color.named(themes[currentTheme][0]);
	paperColor = Color.named(themes[currentTheme][1]);
	
	fillCache(currentWidth, currentHeight);
	currentImageIndex = 0;
	nextImage();
}

function save() {
	var canvas = document.getElementById("rohrschachCanvas");
	document.location.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
}

function resize() { //TODO: something more sophisticated
	paint();
}

function blurImage() {
	// awesome: http://www.inserthtml.com/2012/06/css-filters/
	document.getElementById("rohrschachCanvas").style.webkitFilter = "blur(3px)";
	// found this here: http://www.quasimondo.com/BoxBlurForCanvas/FastBlurDemo.html
	//stackBlurCanvasRGB('rohrschachCanvas', 0, 0, 800, 400, 10);
}

function fillBackground(canvasId, color) {
//	$('#'+canvasId).css('background-color', color.toString());
}
