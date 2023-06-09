class Figure {
    constructor({
        color = '#eeff8e',
        centre = new Point
    }) {
        this.points = [];
        this.edges = [];
        this.polygons = [];
        this.animations = [];
        this.color = color;
        this.centre = centre;
    }

    doAnimation(math3D) {
        this.animations.forEach((anim) => {
            const t1 = math3D.move(
                -anim.centre.x,
                -anim.centre.y,
                -anim.centre.z,
            );

            const t2 = math3D[anim.method](anim.value);

            const t3 = math3D.move(
                anim.centre.x,
                anim.centre.y,
                anim.centre.z,
            );

            const matrix = math3D.getTranformMatrix(t1, t2, t3);

            this.points.forEach((point) => {
                math3D.transformPoint(matrix, point);
            });

            math3D.transformPoint(matrix, this.centre);
        });
    }

    dropAnimation() {
        this.animations = [];
    }

    setAnimation(method, value, centre) {
        this.animations.push({
            method: method,
            value: value,
            centre: centre ? centre : this.centre,
        })
    }

    generateFigure() {
        this.clearFigure();
        this.generatePoints();
        this.generateEdges();
        this.generatePolygons();
    };

    clearFigure() {
        this.points = [];
        this.edges = [];
        this.polygons = [];
    };

    updateAnimation(index, anim) {
        this.animations[index] = anim;
    }

    generatePoints() { };
    generateEdges() { };
    generatePolygons() { };
}