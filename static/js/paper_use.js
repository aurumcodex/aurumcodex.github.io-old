var path = new Path();
path.strokeColor = '#90dbb9';
var start = new Point(30, 40);
path.moveTo(start);
path.lineTo(start + [60, 70]);

var disp_text = new PointText(new Point(200, 40));
disp_text.justification = "center";
disp_text.fillColor = '#90dbb9';
disp_text.strokeColor = '#acaeae';
disp_text.fontFamily = "Anonymous Pro";
disp_text.fontSize = "14";
disp_text.content = "this is a line being displayed via paper.js";

// Size examples;
// Sizes are used to define widths and heights of shapes like Rectangles.
var size = new Size();
size.width = 10;
size.height = size.width + 50;
console.log("size variable: " + size);

var size2 = new Size(20, 60);
console.log("size2 variable" + size2);

var size3 = new Size(size2.width * 4, size2.height + 10);
console.log("size3 variable: " + size3);

// Rectangle example(s)
var corner = new Point(40, 40);
var r_size = new Size(50, 50);
var rect = new Rectangle(corner, r_size);

var rect2 = new Rectangle(30, 30, 20, 10);

var top_left = new Point(70, 70);
var bottom_right = new Point(140, 140);
var rect3 = new Rectangle(top_left, bottom_right);

var rect4 = new Rectangle();
rect4.size = new Size(90, 100);
rect4.center = new Point(100, 100);

var rect5 = new Rectangle();
rect5.top = 200;
rect5.right = 400;
rect5.left = 200;
rect5.bottom = 400;