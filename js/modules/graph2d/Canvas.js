class Canvas {
    constructor({ WIN, id, width = 700, height = 700, callbacks = {}, color }) {
        this.WIN = WIN;
        this.canvas = document.getElementById(id);
        this.canvasVirt = document.createElement("canvas")

        this.canvas.width = width;
        this.canvasVirt.width = width;

        this.canvas.height = height;
        this.canvasVirt.height = height;

        this.ctx = this.canvas.getContext('2d');
        this.ctxVirt = this.canvasVirt.getContext('2d');

        this.canvas.color = color;

        const { wheel, mouseUp, mouseDown, mouseMove, mouseLeave } = callbacks;
        this.canvas.addEventListener('wheel', wheel);
        this.canvas.addEventListener('mouseup', mouseUp);
        this.canvas.addEventListener('mousedown', mouseDown);
        this.canvas.addEventListener('mousemove', mouseMove);
        this.canvas.addEventListener('mouseleave', mouseLeave);
    }

    xs = (x) => (x - this.WIN.left) / this.WIN.width * this.canvasVirt.width;
    ys = (y) => this.canvasVirt.height - (y - this.WIN.bottom) / this.WIN.height * this.canvasVirt.height;

    sx = (x) => x * this.WIN.width / this.canvasVirt.width;
    sy = (y) => -y * this.WIN.height / this.canvasVirt.height;

    x = (xs) => xs * this.WIN.width / this.canvasVirt.width + this.WIN.left;
    y = (ys) => -ys * this.WIN.height / this.canvasVirt.height + this.WIN.bottom + this.WIN.height;

    ssx(x) {
        return this.canvasVirt.width * (x - this.WIN.LEFT) / this.WIN.WIDTH;
    }

    ssy(y) {
        return this.canvasVirt.height - (this.canvasVirt.height * (y - this.WIN.BOTTOM) / this.WIN.HEIGHT);
    }

    drawRect(x, y, width, height, color = '#ebebeb') {
        const heightRect = height * this.canvasVirt.height / this.WIN.height;
        const widthRect = width * this.canvasVirt.width / this.WIN.width;
        this.ctxVirt.fillStyle = color;
        this.ctxVirt.fillRect(this.xs(x), this.ys(y), widthRect, heightRect);
    };

    clear() {
        this.ctxVirt.fillStyle = '#7f8291';
        this.ctxVirt.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };

    line(x1, y1, x2, y2, width = 1, color = '#000000', isDash = false) {
        this.ctxVirt.beginPath();
        this.ctxVirt.strokeStyle = color;
        this.ctxVirt.moveTo(this.xs(x1), this.ys(y1));
        if (isDash) {
            this.ctxVirt.lineWidth = 1;
            this.ctxVirt.setLineDash([10, 10]);
        } else {
            this.ctxVirt.lineWidth = width;
            this.ctxVirt.setLineDash([]);
        }
        this.ctxVirt.lineTo(this.xs(x2), this.ys(y2));
        this.ctxVirt.stroke();
        this.ctxVirt.closePath();
    };

    printText(text, x, y, color = '#A4A4A4', size = NaN) {
        this.ctxVirt.font = `${size}px serif`;
        this.ctxVirt.fillStyle = color;
        this.ctxVirt.fillText(text, this.xs(x), this.ys(y));
    };

    point(x, y, color = 'black', size = 4) {
        this.ctxVirt.beginPath();
        this.ctxVirt.arc(this.xs(x), this.ys(y), size, 0, 1.5 * Math.PI);
        this.ctxVirt.fillStyle = color;
        this.ctxVirt.fill();
        this.ctxVirt.closePath();
    };

    polygon(points, color = '#f003') {
        if (points.length >= 3) {
            this.ctxVirt.fillStyle = color;
            this.ctxVirt.strokeStyle = color;
            this.ctxVirt.beginPath();
            this.ctxVirt.moveTo(this.xs(points[0].x), this.ys(points[0].y));
            for (let i = 1; i < points.length; i++) {
                this.ctxVirt.lineTo(this.xs(points[i].x), this.ys(points[i].y));
            }
            this.ctxVirt.lineTo(this.xs(points[0].x), this.ys(points[0].y));
            this.ctxVirt.closePath();
            this.ctxVirt.fill();
            this.ctxVirt.stroke();
        };
    };

    printLine(x1, y1, x2, y2, width = 1, color = '#787d85', isDash = false) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.setLineDash([isDash ? isDash : '']);
        this.ctx.moveTo(this.ssx(x1), this.ssy(y1));
        this.ctx.lineTo(this.ssx(x2), this.ssy(y2));
        this.ctx.stroke();
    };

    printPoint(x, y, color = 'black', size = 3) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        this.ctx.arc(this.ssx(x), this.ssy(y), size, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.fill();
    }

    printPolygon(points = [], color = '#f003') {
        if (points.length >= 3) {
            this.ctx.fillStyle = color;
            this.ctx.strokeStyle = color;
            this.ctx.beginPath();
            this.ctx.moveTo(this.ssx(points[0].x), this.ssy(points[0].y));
            for (let i = 1; i < points.length; i++) {
                this.ctx.lineTo(this.ssx(points[i].x), this.ssy(points[i].y));
            }
            this.ctx.lineTo(this.ssx(points[0].x), this.ssy(points[0].y));
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
        };
    };

    getIntegral(f, a, b, d = 100) {
        const dx = (b - a) / d;
        let x = a;
        let S = 0;
        while (x <= b) {
            S += (f(x) + f(x + dx)) / 2 * dx;
            x += dx;
        }
        return S;
    }

    getZero(f, a, b, eps = 0.0001) {
        if (f(a) * f(b) > 0) return null;
        if (f(a) === 0) return a;
        if (f(b) === 0) return b;
        if (Math.abs(f(b) - f(a)) <= eps) return (a + b) / 2;
        const half = (a + b) / 2;
        if (f(a) * f(half) <= 0) return this.getZero(f, a, half, eps)
        if (f(b) * f(half) <= 0) return this.getZero(f, half, b, eps)
        else return null;
    }

    render() {
        this.ctx.drawImage(this.canvasVirt, 0, 0);
    }
}