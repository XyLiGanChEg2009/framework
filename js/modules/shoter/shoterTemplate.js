Template.prototype.shoterTemplate = () =>
    `
    <div id="shot-center">
    <div class="buttons-container">
        <input id="x" placeholder = "x" class="menu-item-inputs">
        <input id="y" placeholder = "y" class="menu-item-inputs">
    </div>

    <div class="buttons-container">
        <button id="shot" class="menu-item-buttons">Shot</button>
    </div><br>

    <span id="shotResult" class="spanColor">Результат:</span>
    </div>

    <br>

    <div class="buttons-container">
        <input id="count" placeholder = "Count" class="menu-item-inputs">
        <input id="min" placeholder = "Min" class="menu-item-inputs">
        <input id="max" placeholder = "Max" class="menu-item-inputs">
    </div>

    <div class="buttons-container">
        <button id="shoter" class="menu-item-buttons">Shoter</button>
    </div><br>

    <span id="shoterResult" class="spanColor"> Результат:</span>
    </div>
    `