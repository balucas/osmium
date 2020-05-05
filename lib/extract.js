var osmread = require('osm-read');
var fs = require('fs');
var data = [];
var inFilePath = process.argv[2];
var outFilePath = process.argv[3];

var parser = osmread.parse({
	filePath: inFilePath, 
	endDocument: saveResults,
	node: addNode,
	way: addWay,
	error: errorHandle,
});

function clean(item){
	//Remove irrelevant properties
	delete item.tags;
	delete item.version;
	delete item.changeset;
	delete item.uid;
	delete item.user;
	delete item.center;
}

function addNode(node){
	clean(node);
	node.type = "node";
	data.push(node);
}

function addWay(way){
	clean(way);
	way.type = "way";
	data.push(way);
}

function saveResults(){
	var json = {name:"Placeholder", elements: data};
	
	if(outFilePath){
		fs.writeFileSync(outFilePath, JSON.stringify(json));
	}else{
		console.log(JSON.stringify(json));
	}
}


function errorHandle(){
	console.log('error');
}

