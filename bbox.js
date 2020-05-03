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

	addPoint(p){
		if(p.x == null || p.y == null){
			throw "invalid point";
		}
		
		this.minX = this.minX < p.x ? this.minX : p.x;
		this.maxX = this.maxX > p.x ? this.maxX : p.x;

		this.minY = this.minY < p.y ? this.minY : p.y;
		this.maxY = this.maxY > p.y ? this.maxY : p.y;
	}

	normalizePoint(p){
		p.x = (p.x - this.cenX) / (this.maxX - this.cenX);
		p.y = (p.y - this.cenY) / (this.maxY - this.cenY);
	}
}

module.exports = BBox;
