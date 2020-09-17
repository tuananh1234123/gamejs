var foods = function(game) {
    this.game = game;
    this.foods = [];
    this.init = function() {
        this.createFoods();
    };

    this.createFoods = function() {
        for (let i = 0; i < 12; i++) {
            var f = new food(this.game);
            f.init();
            this.foods.push(f);
        }
    };

    this.draw = function() {
        this.foods.forEach(function(f) {
            f.draw();
        });
    };
};