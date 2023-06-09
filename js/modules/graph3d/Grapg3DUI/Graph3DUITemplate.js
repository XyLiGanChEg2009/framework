Template.prototype.Graph3DUI = () => `
    <div class="menuGraph3DButton">☰</div>
    <div class = "block3D hide">
        <div class="figuresMenu">
            <div class ='figuresCheckBoxes'>
                <input type="checkbox" id="PolygonsCheckBox" data-setting = "PolyAllow"  name="Polygons" checked>
                <label for="PolygonsCheckBox">Полигоны</label>
                <input type="checkbox" id="EdgesCheckBox" data-setting = "showEdges" name="Edges">
                <label for="EdgesCheckBox">Рёбра</label>
                <input type="checkbox" id="PointsCheckBox" data-setting = "showPoints" name="Points">
                <label for="PointsCheckBox">Точки</label>
                <input type="checkbox" id="animationCheckBox" data-setting = "showAnimation" name="Animation">
                <label for="animationCheckBox">Анимация</label>
                <input type="checkbox" id="shadowCheckBox" data-setting = "showShadows" name="Shadows" checked>
                <label for="shadowCheckBox">Тени</label>
            </div>
            <input class="lightPower" type="range" min="0" max="50000" step="1000" value="50000">
            <div class="addFigure">Добавить</div>
            <div id = 'figuresList' class = 'hide'>
                <div data-figure="Cube" class="figureList-buttons">Куб</div>
                <div data-figure="Sphere" class="figureList-buttons">Сфера</div>
                <div data-figure="Ellipsoid" class="figureList-buttons">Эллипсоид</div>
                <div data-figure="Cone" class="figureList-buttons">Конус</div>
                <div data-figure = "Cylinder" class="figureList-buttons">Цилиндр</div>
                <div data-figure="ParabolicCylinder" class="figureList-buttons">Параболический цилиндр</div>
                <div data-figure = "HyperbolicCylinder" class="figureList-buttons">Гиперболический цилиндр</div>
                <div data-figure = "SingleCavityHyperboloid" class="figureList-buttons">Однополостный гиперболоид</div>
                <div data-figure = "DoubleCavityHyperboloid" class="figureList-buttons">Двуполостный гиперболоид</div>
                <div data-figure = "EllipticalParaboloid" class="figureList-buttons">Эллиптический параболоид</div>
                <div data-figure = "HyperbolicParaboloid" class="figureList-buttons">Гиперболический параболоид</div>
                <div data-figure = "Tor" class="figureList-buttons">Тор</div>
            </div>

            <div class="figuresContainer"></div>
        </div>
    </div>
`