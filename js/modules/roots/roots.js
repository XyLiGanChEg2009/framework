class Roots {
    line(a, b) {
        if (a === 0 && b === 0) {
            return [];
        }

        if (a === 0) {
            return null;
        }
        return [-b / a];
    }

    square(a, b, c) {
        var D = b * b - 4 * a * c;
        if (D < 0) {
            return null;
        }
        if (D === 0) {
            return [-b / (2 * a)];
        }
        return [
            (-b + Math.sqrt(D)) / (2 * a),
            (-b - Math.sqrt(D)) / (2 * a)
        ]
    }

    cube(x) {
        var y = Math.pow(Math.abs(x), 1 / 3);
        return x < 0 ? -y : y;
    }

    square3(a, b, c, d) {
        if (Math.abs(a) < 1e-8) { // то это квадратное ax^2+bx+c=0
            a = b; b = c; c = d;
            if (Math.abs(a) < 1e-8) { // то это линейное ax+b=0
                a = b; b = c;
                if (Math.abs(a) < 1e-8)
                    return [];
                return [-b / a];
            }

            let D = b * b - 4 * a * c;
            if (Math.abs(D) < 1e-8)
                return [-b / (2 * a)];
            else if (D > 0)
                return [(-b + Math.sqrt(D)) / (2 * a), (-b - Math.sqrt(D)) / (2 * a)];
            return [];
        }

        let p = (3 * a * c - b * b) / (3 * a * a);
        let q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
        let roots;

        if (Math.abs(p) < 1e-8) {
            roots = [this.cube(-q)];
        } else if (Math.abs(q) < 1e-8) {
            roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : []);
        } else {
            let D = q * q / 4 + p * p * p / 27;
            if (Math.abs(D) < 1e-8) {       // 2 корня
                roots = [-1.5 * q / p, 3 * q / p];
            } else if (D > 0) {             // 1 корень
                let u = this.cube(-q / 2 - Math.sqrt(D));
                roots = [u - p / (3 * u)];
            } else {                        // 3 корня
                let u = 2 * Math.sqrt(-p / 3);
                let t = Math.acos(3 * q / p / u) / 3;
                let k = 2 * Math.PI / 3;
                roots = [u * Math.cos(t), u * Math.cos(t - k), u * Math.cos(t - 2 * k)];
            }
        }

        for (let i = 0; i < roots.length; i++)
            roots[i] -= b / (3 * a);

        return roots;
    }

    getRoots(a, b, c, d) {
        if (!isNaN(a) && !isNaN(b) && !isNaN(c) && !isNaN(d)) {
            return this.square3(a, b, c, d);
        }
        if (!isNaN(a) && !isNaN(b) && !isNaN(c)) {
            return this.square(a, b, c);
        }
        if (!isNaN(a) && !isNaN(b)) {
            return this.line(a, b);
        }
        return null;
    }
}