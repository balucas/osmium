var osmread = require('osm-read');
var data = [];

var parser = osmread.parse({
	filePath: './map.xml',
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
	var json = {name:"test map", elements: data};
	console.log(JSON.stringify(json));
}


function errorHandle(){
	console.log('error');
}

