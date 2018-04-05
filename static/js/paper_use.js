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
