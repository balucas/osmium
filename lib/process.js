//Process extracted Map Data into Nodes and Edges

var fs = require('fs')
var es = require('event-stream');
var d3 = require('d3-geo');
var BBox = require('./bbox.js');
var JSONStream = require('JSONStream');

var inFilePath = process.argv[2];
var outFileName = process.argv[3];

var mercBox = new BBox();
var projector = d3.geoMercator();

var nodeList = [];
var nodeIDMap = new Map();
var ways = [];

fs.createReadStream(inFilePath)
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
	//Mercator projection
	let xy = projector([node.lon, node.lat]);	
	
	//Compress node ID and map
	const newId = nodeIDMap.size;
	nodeIDMap.set(node.id, newId);

	var point = {x: xy[0], y: xy[1]};

	//Add to mercator bounding box and node list
	mercBox.addPoint(point);
	nodeList.push(point);
}

function processWay(way){
	ways.push(way);
}

function saveResults(){

	nodeList.forEach((point) =>{
		mercBox.normalizePoint(point);
	});
	
	//Create flat array of graph edges
	var edges = [];
	ways.forEach((way) => {
		let nodeRefs = way.nodeRefs;
		let prev = 0;

		for(let i = 1; i < nodeRefs.length; i++){
			edges.push([ nodeIDMap.get(nodeRefs[prev]), nodeIDMap.get(nodeRefs[i]) ]);	
			prev = i;
		}
	});

	var res = JSON.stringify({
		name: outFileName,
		nodes: nodeList,
		edges: edges
	})
	
	console.log(`Processed ${nodeList.length} nodes and ${edges.length} edges.`);

	const graphDir = 'data/final/' + outFileName;
	fs.writeFileSync(graphDir + '.json', res);
}
