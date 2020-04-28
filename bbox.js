class BBox{
	constructor(){
		this.minX = Number.POSITIVE_INFINITY;
		this.minY = Number.POSITIVE_INFINITY;
		this.maxX = Number.NEGATIVE_INFINITY;
		this.maxY = Number.NEGATIVE_INFINITY;
	}

	get width(){
		return this.maxX - this.minX;
	}

	get height(){
		return this.maxY - this.minY;
	}

	get cenX(){
		return (this.minX + this.maxX)/2;
	}

	get cenY(){
		return (this.minY + this.maxY)/2;
	}
}

module.exports = BBox;
