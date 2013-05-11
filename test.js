var BaseCar = function (config) {
    this.octaneRequired = 86;
    this.shiftTo = function (gear) {
        this.gear = gear;
    };
    this.shiftTo('park');
};

    BaseCar.prototype = {
        engine: 'I4',
        turbo: false,
        wheels: 'basic',
        getEngine: function () {
            return this.engine;
        },
        drive: function () {
            return 'Vrrrrooooooom - Im driving!'
        }
    };

var mySlowCar = new BaseCar();
console.log(mySlowCar.drive());
console.log(mySlowCar.getEngine());
console.log('mySlowCar contents:');
console.dir(mySlowCar)


var PremiumCar = function() {
    PremiumCar.superclass.constructor.call(this);
    this.octaneRequired = 93;
};
PremiumCar.prototype = new BaseCar();
PremiumCar.superclass = BaseCar.prototype;
PremiumCar.prototype.turbo = true;
PremiumCar.prototype.wheels = 'premium';
PremiumCar.prototype.drive = function() {
    this.shiftTo('drive');
    PremiumCar.superclass.drive.call(this);
};
PremiumCar.prototype.getEngine = function() {
    return 'Turbo ' + this.engine;
};

var myFastCar = new PremiumCar();
myFastCar.drive()
console.log('myFastCar contents:');
console.dir(myFastCar);