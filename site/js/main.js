var stage = new createjs.Stage('game');
var drivers = [];

createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener("tick", ticktock);

function ticktock() {
    var explodingCars = [];
    for (var i = 0; i<drivers.length; i++) {
        var a = drivers [i];
        for (var j = i+1; j<drivers.length; j++){
            var b =drivers[j];
            if(a.didCrash(b)) {
                explodingCars.push(a);
                explodingCars.push(b);
            }         
        }
    }
    for (var i=0; i<explodingCars.length; i++){
        explodingCars[i].die();
    }
    stage.update();
}

function DrunkDriver(){
    var carBody = new createjs.Graphics();
    carBody.beginFill("rgba(100, 150, 150, 0.8)")
    carBody.moveTo(0, 0);
    carBody.lineTo(50, 0);
    carBody.lineTo(50, -20);
    carBody.lineTo(25, -20);
    carBody.lineTo(20, -30);
    carBody.lineTo(-20, -30);
    carBody.lineTo(-25, -20);
    carBody.lineTo(-40, -20);
    carBody.lineTo(-40, 0);
    carBody.lineTo(0, 0);
    carBody.closePath();
    carBody.endFill();
    carBody.beginFill("rgba(100, 150, 200, 0.8)");
    carBody.drawCircle(20, 0, 15);
    carBody.drawCircle(-20, 0, 15);

    this.isAlive = true;
    this.shape = new createjs.Shape(carBody);
    this.shape.x = Math.random() * 600;
    this.shape.y = Math.random() * 400;
    stage.addChild(this.shape);

}
DrunkDriver.prototype.drive = function(){
    var duration= Math.floor(Math.random() * 2000) + 1000;
    var direction = {};
    if (Math.random() > 0.5) {
        direction.x = Math.floor(Math.random() * 600) - 300;
    } else {
        direction.y = Math.floor(Math.random() *400) - 200;
    }
    createjs.Tween.get(this.shape)
        .to(direction, duration)

    setTimeout(this.drive.bind(this), duration + 500);

}
DrunkDriver.prototype.didCrash = function(car){
    var localPoint = this.shape.globalToLocal(car.shape.x, car.shape.y);
    return(this.shape.hitTest(localPoint.x, localPoint.y));
}
DrunkDriver.prototype.die = function(){
    stage.removeChild(this.shape);
}


for (var i=0; i<4; i++){
    var newDriver = new DrunkDriver();
    newDriver.drive();
    drivers.push(newDriver);
}

stage.update();