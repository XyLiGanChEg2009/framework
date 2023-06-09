class RootsComponent extends Component {
    constructor(props) {
        super(props);
        this.res = document.getElementById('calcRoots');
        this.res.addEventListener('click', () => this.result());
    }

    result() {
        const roots = new Roots;
        var a = document.getElementById('a').value;
        var b = document.getElementById('b').value;
        var c = document.getElementById('c').value;
        var d = document.getElementById('d').value;
        document.getElementById('rootsResult').innerHTML = "Результат:  " + roots.getRoots(a, b, c, d);
    }
}