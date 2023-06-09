class Cylinder extends Figure {
    constructor({
        color = '#eeff8e',
        centre,
        height = 20,
        count = 30,
        radius = 10,
    }) {
        super({color, centre});
        this.count = count;
        this.radius = radius;
        this.height = height;

        this.generateFigure();
    }

    generatePoints() {
        const propI = this.height / this.count;
        const propJ = 2 * Math.PI / this.count;

        for (let i = -this.count / 2; i < this.count / 2; i++) {
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.centre.x + this.radius * Math.cos(j * propJ),
                    this.centre.y + i * propI,
                    this.centre.z + this.radius * Math.sin(j * propJ),
                ));
            }
        }
    }

    generateEdges() {
        for (let i = 0; i < this.count; i++) {
            const k = i ? i * this.count - 1 : i;
            for (let j = 0; j < this.count - 1; j++) {
                this.edges.push(new Edge(i * this.count + j, i * this.count + j + 1));
                this.edges.push(new Edge((i ? i - 1 : i) * this.count + j, i * this.count + j));
            }
            this.edges.push(new Edge(k, k + this.count));
            this.edges.push(new Edge(i * this.count, (i + 1) * this.count - 1));
        }
    }

    generatePolygons() {
        for (let i = 0; i < this.count - 1; i++) {
            for (let j = 0; j < this.count - 1; j++) {
                this.polygons.push(new Polygon([
                    i * this.count + j,
                    (i + 1) * this.count + j,
                    (i + 1) * this.count + j + 1,
                    i * this.count + j + 1,
                ], this.color));
            }

            this.polygons.push(new Polygon([
                i * this.count,
                (i + 1) * this.count - 1,
                (i + 2) * this.count - 1,
                (i + 1) * this.count,
            ], this.color));
        }
    }
}