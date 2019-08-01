class Piece {

    constructor(x, y, num) {
        this.pos = createVector(x, y);
        this.vel = null;
        this.destination = null;
        this.num = num;

        this.offset = 3;
    }

    toString() {
        return "(" + this.pos.x + ", " + this.pos.y + ", n:" + this.num + ")";
    }

    show() {
        fill(255);
        stroke(0);
        strokeWeight(1);
        rect(this.pos.x * w + this.offset, this.pos.y * w + this.offset, w - this.offset, w - this.offset);

        textAlign(CENTER, CENTER);
        fill(0);
        textSize(64);

        text(this.num == 0 ? '' : this.num, this.pos.x * w + w / 2, this.pos.y * w + w / 2);
    }

    update() {
        // console.log(this.pos, this.destination);
        if (this.destination != null && this.vel == null) {
            this.vel = p5.Vector.sub(this.destination, this.pos).normalize().div(w * 0.5);
        }

        if (this.destination != null && this.vel != null) {
            if (this.destination.dist(this.pos) > 0.005) {
                // console.log(this.destination.dist(this.pos));
                this.pos.add(this.vel);
                this.vel.mult(0.999);
            } else {
                this.destination = null;
                this.vel = null;
            }
        }
    }

    setDestination(dest) {
        this.destination = dest.copy();
    }
}
