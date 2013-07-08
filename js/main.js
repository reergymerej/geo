function Point(x, y){
    this.x = x;
    this.y = y;
}

function Vector(x, y){
    this.x = x;
    this.y = y;
}

function Actor(point, width, vector){
    this.position = point;
    this.width = width;
    this.vector = vector;
}

Point.prototype.add = function(x, y) {
    this.x += x;
    this.y += y;
    return this;
};

Vector.prototype.add = function(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
};

Vector.prototype.addVectors = function(v1, v2){
    return new Vector(v1.x + v2.x, v1.y + v2.y);
};

Vector.prototype.reverse = function(axis) {
    if(axis === 'x'){
        this.x *= -1;
    } else {
        this.y *= -1;
    }
};

Actor.prototype.nextPosition = function() {
    var nextPosition = new Point(this.position.x, this.position.y),
        bounceX,
        wallVector,
        combinedVectors;

    nextPosition.add(this.vector.x, this.vector.y);
    
    // Past right wall?
    if(nextPosition.x > RIGHT_WALL - this.width / 2){
        console.log('bounce');
        bounceX = RIGHT_WALL - this.width / 2;
        wallVector = new Vector((nextPosition.x - bounceX) * -2, 0);
        combinedVectors = Vector.prototype.addVectors(this.vector, wallVector);
        
        // new position after bounce
        nextPosition = this.position.add(combinedVectors.x, combinedVectors.y);
        
        // update actor's vector
        this.vector.reverse('x');
    }

    this.position = nextPosition;
};

var RIGHT_WALL = 10;
var actor = new Actor(new Point(0, 0), 3, new Vector(10, 10));
actor.nextPosition();