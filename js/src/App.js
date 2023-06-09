class App extends Component {
    constructor(props){
        super(props);

        this.menu = new Menu({
			id: 'menu',
			parent: this.id,
			template: template.Menu,
			callbacks: {
				showMenuItem: (name) => this.showMenuItem(name)
			}
		})

		this.shoterContent = new ShoterShot({
			id:'shoterContent',
            parent: this.id,
            template: template.shoterTemplate,
            className: 'hide'
		})

		this.rootsContent = new RootsComponent({
			id: 'rootsContent',
            parent: this.id,
            template: template.rootsTemplate,
            className: 'hide'
		})

		// this.graph2dContent = new Graph2dComponent({
		// 	id: 'graph2dContent',
		// 	parent: this.id,
		// 	template: template.Graph2DTemplate,
		// 	className: 'hide'
		// })


		this.graph3dContent = new Graph3d({
			id: 'graph3dContent',
            parent: this.id,
            template: template.graph3dTemplate,
            className: 'hide'
		})


    }
	showMenuItem(name){
		this.shoterContent.hide();
		this.rootsContent.hide();
		// this.graph2dContent.hide();
		this.graph3dContent.hide();
        this[name].show();
    }
}