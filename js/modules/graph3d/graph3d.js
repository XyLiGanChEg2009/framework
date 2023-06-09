class Graph3d extends Component {
    constructor(props) {
        super(props);

        const height = 700;
        const width = window.innerWidth * 0.95;
        this.scale = width / height;

        this.WIN = {
            width: 20 * this.scale,
            height: 20,
            bottom: -10,
            left: -10 * this.scale,
            focus: new Point(0, 0, 30),
            camera: new Point(0, 0, 50),
        };

        this.canMove = false;
        this.zoomStep = 1.2;

        this.PointsAllow = false;
        this.EdgesAllow = false;
        this.PolyAllow = true;
        this.AnimationAllow = false;
        this.LightAllow = true;
        this.animate;

        this.LIGHT = new Light(-100, 0, 0);

        let FPS = 0;
        this.FPS = 0;
        let lastTimestamp = Date.now();

        this.figures = [];

        this.figureNumber = 0;

        this.dx = 0;
        this.dy = 0;

        this.canvas = new Canvas({
            WIN: this.WIN,
            id: 'graph3d',
            width,
            height,
            callbacks: {
                wheel: (event) => this.wheel(event),
                mouseUp: () => this.mouseUp(),
                mouseDown: () => this.mouseDown(),
                mouseMove: (event) => this.mouseMove(event),
                mouseLeave: () => this.mouseLeave()
            }
        });

        this.math3d = new Math3d({ WIN: this.WIN });

        new Graph3DUI({
            id: 'Graph3DUI',
            parent: 'graph3dContent',
            template: template.Graph3DUI,
            className: 'container3D',
            callbacks: {
                keyPress: (event) => this.keyPress(event),
                toggleCheckBox: (name) => this.toggleCheckBox(name),
                selectFigure: (figure, num) => this.selectFigure(figure, num),
                clearfigures: () => this.clearfigures(),
                changeFigureSettings: (num, setting, settingValue) =>
                    this.changeFigureSettings(num, setting, settingValue),
                delFigure: (num) => this.delFigure(num),
                powerOfLight: (value) => this.powerOfLight(value),
                animationHandler: () => this.animationHandler(),
            }
        });

        const animLoop = () => {
            FPS++;
            const timestamp = Date.now();
            if (timestamp - lastTimestamp >= 1000) {
                this.FPS = FPS;
                FPS = 0;
                lastTimestamp = timestamp;
            }
            this.renderScene();
            window.requestAnimFrame(animLoop);
        }

        animLoop();
    }

    wheel(event) {
        const delta = (event.wheelDelta > 0) ? this.zoomStep : 1 / this.zoomStep;
        this.figures.forEach((figure) => {
            if (figure) {
                figure.points.forEach((point) => {
                    this.math3d.transformPoint(this.math3d.zoom(delta), point);
                });
                this.math3d.transformPoint(this.math3d.zoom(delta), figure.centre);
            }
        })
    }

    mouseUp() {
        this.canMove = false;
    }

    mouseDown() {
        this.canMove = true;
    }

    mouseMove(event) {
        if (this.canMove && !this.showAnimation) {
            const prop = 240;
            this.figures.forEach((figure) => {
                if (figure) {
                    figure.points.forEach((point) => {
                        this.math3d.transformPoint(this.math3d.rotateOx(event.movementX / prop), point);
                        this.math3d.transformPoint(this.math3d.rotateOy(event.movementY / prop), point);
                    })
                    this.math3d.transformPoint(this.math3d.rotateOx(event.movementY / prop), figure.centre);
                    this.math3d.transformPoint(this.math3d.rotateOy(-event.movementX / prop), figure.centre);
                }
            })
        }
    }

    mouseLeave() {
        this.canMove = false;
    }

    keyPress(event) {
        const gradusRotate = 0.1;
        switch (event.code) {
            case "KeyQ":
                this.figures.forEach((figure) => {
                    if (figure && !this.showAnimation) {
                        figure.points.forEach((point) => {
                            this.math3d.transformPoint(this.math3d.rotateOz(-gradusRotate), point);
                        })
                        this.math3d.transformPoint(this.math3d.rotateOz(-gradusRotate), figure.centre);
                    };
                });
                break;

            case "KeyE":
                this.figures.forEach((figure) => {
                    if (figure && !this.showAnimation) {
                        figure.points.forEach((point) => {
                            this.math3d.transformPoint(this.math3d.rotateOz(gradusRotate), point);
                        })
                        this.math3d.transformPoint(this.math3d.rotateOz(gradusRotate), figure.centre);
                    };
                });
                break;
        }
    }

    clear() {
        this.canvas.clear();
    }

    clearfigures() {
        figures = [];
    }

    drawPoints() {
        this.figures.forEach((figure) => {
            if (figure) {
                figure.points.forEach((point) => {
                    this.canvas.point(this.math3d.xs(point), this.math3d.ys(point), 'black', 1);
                });
            }
        });
    }

    drawEdges() {
        this.figures.forEach((figure) => {
            if (figure) {
                figure.edges.forEach((edge) => {
                    this.canvas.line(
                        this.math3d.xs(figure.points[edge.point1]),
                        this.math3d.ys(figure.points[edge.point1]),
                        this.math3d.xs(figure.points[edge.point2]),
                        this.math3d.ys(figure.points[edge.point2]),
                    )
                });
            }
        });
    }

    drawPolygons(polygons) {
        polygons.forEach((polygon) => {
            const points = [];

            for (let i = 0; i < polygon.points.length; i++) {
                points.push(this.figures[polygon.figureIndex].points[polygon.points[i]]);
            }

            let { r, g, b } = polygon.color;
            const { isShadow, dark } = this.math3d.calcShadow(polygon, this.figures, this.LIGHT);
            const lumen = this.math3d.calcIllumination(polygon.distance,
                this.LIGHT.lumen * (isShadow ? dark : 1));
            r = Math.round(r * lumen);
            g = Math.round(g * lumen);
            b = Math.round(b * lumen);

            this.canvas.polygon(
                points.map((point) => {
                    return {
                        x: this.math3d.xs(point),
                        y: this.math3d.ys(point),
                    };
                }),
                polygon.rgbToColor(r, g, b),
            );
        });
    }

    selectFigure(figure, num) {
        switch (figure) {
            case "Cube":
                this.figures[num] = new Cube({});
                break;

            case "Cone":
                this.figures[num] = new Cone({});
                break;

            case "Cylinder":
                this.figures[num] = new Cylinder({});
                break;

            case "DoubleCavityHyperboloid":
                this.figures[num] = new DoubleCavityHyperboloid({});
                break;

            case "Ellipsoid":
                this.figures[num] = new Ellipsoid({});
                break;

            case "EllipticalParaboloid":
                this.figures[num] = new EllipticalParaboloid({});
                break;

            case "HyperbolicParaboloid":
                this.figures[num] = new HyperbolicParaboloid({});
                break;

            case "HyperbolicCylinder":
                this.figures[num] = new HyperbolicCylinder({});
                break;

            case "ParabolicCylinder":
                this.figures[num] = new ParabolicCylinder({});
                break;

            case "SingleCavityHyperboloid":
                this.figures[num] = new SingleCavityHyperboloid({});
                break;

            case "Sphere":
                this.figures[num] = new Sphere({});
                break;

            case "Tor":
                this.figures[num] = new Tor({});
                break;
        }

        this.figures[num].setAnimation('rotateOy', 0.05, new Point);
        this.figures[num].setAnimation('rotateOx', 0.05, new Point);

    }

    changeFigureSettings(num, setting, settingValue) {
        if (setting === 'x' || setting === 'y' || setting === 'z') {
            this.figures[num]['centre'][setting] = settingValue;
        } else {
            this.figures[num][setting] = settingValue;
        }
        this.figures[num].generateFigure();
    }

    toggleCheckBox(name) {
        this[name] = !this[name];
    }

    animationHandler() {
        if (this.showAnimation) {
            this.animate = setInterval(() => {
                this.figures.forEach((figure) => {
                    if (figure) {
                        figure.doAnimation(this.math3d);
                    }
                })
            }, 60);
        } else {
            clearInterval(this.animate);
        }
    }

    delFigure(num) {
        this.figures[num] = null;
    }


    powerOfLight(value) {
        this.LIGHT.lumen = value;
    }

    renderScene() {
        this.canvas.clear();

        if (this.PolyAllow) {
            const polygons = [];
            this.figures.forEach((figure, index) => {
                if (figure) {
                    this.math3d.calcCenter(figure);

                    if (this.LightAllow) {
                        this.math3d.calcRadius(figure);
                    }

                    this.math3d.calcDistance(figure, this.WIN.camera, 'distance');
                    this.math3d.calcDistance(figure, this.LIGHT, 'lumen');

                    figure.polygons.forEach((polygon) => {
                        polygon.figureIndex = index;
                        polygons.push(polygon);
                    });
                }
            });
            this.math3d.sortByArtistAlg(polygons);

            this.drawPolygons(polygons);
        }

        if (this.showEdges) {
            this.drawEdges();
        }

        if (this.showPoints) {
            this.drawPoints();
        }

        this.canvas.render();
    }
}