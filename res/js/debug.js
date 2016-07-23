/* This is where all debug functions go 

*/


/* getMapArray(map, layer) - used to get an array from a given map and layer
	@param map {Tilemap} the tilemap to be used for the array
	@param layer {Tilemap Layer} the specific layer within the tilemap to be used
*/
function getMapArray(map, layer) {
	var mapArrayHt = new Array(map.height);
	var mapArrayWt = new Array(map.width);

	for (var i = 0; i < map.height; i++) {
		for (var j = 0; j < map.width; j++) {
			mapArrayWt[j] = map.getTile(j, i, collisionLayer).index;
		};
		mapArrayHt[i] = mapArrayWt;
	};

	console.log("Array formed:");
	console.log(mapArrayHt);
	return mapArrayHt;
}

/* mapIDShow(mapArray) - used to display the index of each tile on the tilemap
	@param state {Phaser State} the state to refer to
	@param mapArray {Number Array} the array of the tilemap to be used; Must be two dimensional
*/
function mapIDShow(state, mapArray) {
	var style = {
		font: "20px"
	};

	var write;
	var tempArr = []

	state = state.game;

	for (var i = 0; i < mapArray.length; i++) { // amount of nested arrays
		tempArr = mapArray[i];

		for (var j = 0; j < mapArray[0].length; j++) { // amount of elements in each nested array
			
			state.add.text(j * 32, i * 32, tempArr[j], style);
		};
	};
}