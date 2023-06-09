class Light extends Point {
    constructor(x, y, z, lumen = 50000) {
        super(x, y, z);
        this.lumen = lumen;
    }
}