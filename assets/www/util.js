// random
function randomInt(max)        { return Math.floor(Math.random() * max); }
function randomRange(min, max) { return Math.floor((Math.random() * (max - min)) + min); }

// colors
function Color(red, green, blue) { this.red = red; this.green = green; this.blue = blue; }
Color.black     = function() { return new Color(0, 0, 0); }
Color.white     = function() { return new Color(255, 255, 255); }
Color.red       = function() { return new Color(200, 0, 0); }
Color.darkBlue  = function() { return new Color(0, 0, 100); }
Color.darkGreen = function() { return new Color(0, 100, 0); }
Color.named = function(name) {
    if (name == "black") return Color.black();
    if (name == "blue")  return Color.darkBlue();
    if (name == "red")   return Color.red();
    if (name == "white") return Color.white();
    if (name == "green") return Color.darkGreen();
    return new Color(randomInt(255), randomInt(255), randomInt(255));
}
Color.prototype.toAlphaString = function() { return "rgba(" + this.red + "," + this.green + "," + this.blue + ",0.6666)"; }
Color.prototype.toString      = function() { return "rgb("  + this.red + "," + this.green + "," + this.blue + ")"; }

// popup
function initializePopup(id) { getElementBy(id).popup(); }
function showPopup(id)       { showPopupDelayed(id, 100); }
function closePopup(id)      { getElementBy(id).popup('close'); }
function showPopupDelayed(id, delay) {
    var callback = function() { callback, 
        getElementBy(id).popup('open');
    };
    setTimeout(callback, delay); 
}

// jquery
function getElementBy(id) { return $('#' + id); }