class RPGComponent extends Component{
    constructor(props){
        super(props);
        this.rpg = new RPG;
        this.start = document.getElementById("startRPG");
        this.start.addEventListener("click", this.rpg.startGame());
    }
}