class Shoter {
	constructor() { }

	shotToCenter(x, y) {
		return (x === 0 && y === 0) ? 10 : 0;
	}
	shotToCross(x, y) {
		var a = Math.abs((Math.sqrt(5) - 1) / 2);
		return ((x >= 0 && y >= 0 && (1 / (x + a)) - a >= y) ||
			(x <= 0 && y >= 0 && -1 / (x + a) - a >= y) ||
			(x <= 0 && y <= 0 && 1 / (x - a) + a <= y) ||
			(x >= 0 && y <= 0 && -1 / (x + a) + a <= y)) ? 4 : 0;
	}

	shotToCircle(x, y) {
        return (x * x + y * y <= 1)? 2 : 0;
    }

	shotToRomb(x, y) {
        return ((x*2+y*2)/2<=1)? 3 : 0;
    }

	shotSqr(x, y) {
        return (Math.abs(x) <= 1 && Math.abs(y) <= 1)? 1 : 0;
    }

	shot(x, y) {
        return (Math.abs(x) <= 1 && Math.abs(y) <= 1)? 1 : 0;
    }

	shoter(count, min, max){
		var score1 = 0;
		for (var i = 0; i <= count; i++) {
			        var x = Math.random() * (max-min) + min;
			        var y = Math.random() * (max-min) + min;
			        score1 += this.shot(x, y);
			    }
			    return score1;
	}
}
