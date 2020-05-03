var fs = require('fs')
var es = require('event-stream');
var d3 = require('d3-geo');
var BBox = require('./bbox.js');
var JSONStream = require('JSONStream');

var latlonBox = new BBox();
var testarr = [];
var projector = d3.geoMercator();
var nodes = new Map();
var ways = [];

fs.createReadStream('./data.json')
  .pipe(JSONStream.parse('elements.*'))
  .pipe(es.mapSync(callback))
  .on('end', saveResults);

function callback(el){
	if(el.type === 'node'){
		processNode(el);
	}else if(el.type === 'way'){
		processWay(el);
	}
}

function processNode(node){
	let xy = projector([node.lon, node.lat]);	
	var point = {id: node.id, x: xy[0], y: xy[1]};

	latlonBox.addPoint(point);
	testarr.push(point);
}

function processWay(way){
	ways.push(way);
}
function saveResults(){
	testarr.forEach((point) =>{
		latlonBox.normalizePoint(point);
		nodes.set(point.id, {x: point.x, y: point.y});
	});
	
	var segs = [];

	ways.forEach((way) => {
		
	});

	console.log(testarr);
}
