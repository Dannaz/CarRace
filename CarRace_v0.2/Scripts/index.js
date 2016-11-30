'use strict';
const context = document.querySelector('#canvas').getContext("2d");

const DATA = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [0, 1, 1, 1, 0, 1, 0, 0, 1, 3, 3, 3, 3, 3, 3, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var MAP;

const RESOURCES = {};
const BLOCK_SIZE = 80;
const BLOCK_MARGIN = 0;

class Car {
    /**
     * Создает машину
     * @param {Object} resources - текстуры (передавай RESOURCES).
     * @param {number[][]} data - поле, где 0 - трава. 1 - дорога. 2 - финиш. 3 - разделитель.
     * @param {Object} context - контекст канваса (передавай context).
     * @param {number} startPosX - Координата x.
     * @param {number} startPosY - Координата y.
     */
    constructor(resources, data, context, startPosX, startPosY) {
        Car.number++;
        this._number = Car.number;
        this._sprites = [];
        for (var i = 0; i < 3; i++) {
            this._sprites[i] = {
                // EAST
                idle_east: resources.cars[i].idle_east,
                leftLights_east: resources.cars[i].left_east,
                rightLights_east: resources.cars[i].right_east,
                stopLights_east: resources.cars[i].stop_east,
                // NORTH
                idle_north: resources.cars[i].idle_north,
                leftLights_north: resources.cars[i].left_north,
                rightLights_north: resources.cars[i].right_north,
                stopLights_north: resources.cars[i].stop_north,
                // SOUTH
                idle_south: resources.cars[i].idle_south,
                leftLights_south: resources.cars[i].left_south,
                rightLights_south: resources.cars[i].right_south,
                stopLights_south: resources.cars[i].stop_south,
                // WEST
                idle_west: resources.cars[i].idle_west,
                leftLights_west: resources.cars[i].left_west,
                rightLights_west: resources.cars[i].right_west,
                stopLights_west: resources.cars[i].stop_west

            }
        }
        this._tiles = resources.tiles;
        this._data = data;
        this._lastCoords = {
            x: startPosX,
            y: startPosY
        }
        this._context = context;
        this.draw(startPosX, startPosY, 'idle_east');
    }
    /**
     * Перерисовывает машину в новых коориднатах, предыдущие координаты закрашивает соответсвующей текстурой
     * @param {number} x - Координата x.
     * @param {number} y - Координата y.
     * @param {string='idle_dirrection'} state - Тип автомобиля 'leftLights_dirrection'||'rightLights_dirrection'||'stopLights_dirrection'
     */
    draw(x, y, state='idle_east') {
        console.log("(" + x + ";" + y + ") state:" + state);
        this._tiles[this._data[this._lastCoords.y][this._lastCoords.x]].draw(context, this._lastCoords.x, this._lastCoords.y);
        this._lastCoords.x = x;
        this._lastCoords.y = y;
        this._sprites[this._number-1][state].draw(this._context, x, y)
    }
}
Car.number = 0;

class Sprite {
    constructor(image, meta) {
        this._image = image;
        this._meta = meta;
    }

    draw(context, x, y) {
        const d = {}, s = {};
        s.x = this._meta.frame.x;
        s.y = this._meta.frame.y;
        s.width = this._meta.frame.w;
        s.height = this._meta.frame.h;
        d.x = (x * BLOCK_SIZE) + (x + 1) * BLOCK_MARGIN;
        d.y = (y * BLOCK_SIZE) + (y + 1) * BLOCK_MARGIN;
        d.width = BLOCK_SIZE;
        d.height = BLOCK_SIZE;
        context.drawImage(this._image, s.x, s.y, s.width, s.height, d.x, d.y, d.width, d.height);
        return d;
    }
}

Promise.all([
    loadSpriteSheet('car'),
    loadSpriteSheet('tiles')
]).then(([resourceCar, resourceTiles]) => {
    RESOURCES.cars = [];
    for (var i = 0; i < 3; i++) {
        RESOURCES.cars[i] = {
            // EAST
            // Грузит каждый четвертый спрайт с направлением east из car.js, начиная с 0, загрузит все idle
            idle_east: new Sprite(
                resourceCar.image,
                resourceCar.meta.frames[16*i]
            ),
            // Грузит каждый четвертый спрайт с направлением east из car.js, начиная с 1, загрузит все left
            left_east: new Sprite(
                resourceCar.image,
                resourceCar.meta.frames[4+16*i]
            ),
            // Грузит каждый четвертый спрайт с направлением east из car.js, начиная с 2, загрузит все right
            right_east: new Sprite(
                resourceCar.image,
                resourceCar.meta.frames[8+16*i]
            ),
            // Грузит каждый четвертый спрайт с направлением east из car.js, начиная с 3, загрузит все stop
            stop_east: new Sprite(
                resourceCar.image,
                resourceCar.meta.frames[12+16*i]
            ),
            // NORTH
            idle_north: new Sprite(
                resourceCar.image,
                resourceCar.meta.frames[1+16*i]
            ),
            left_north: new Sprite(
                resourceCar.image,
                resourceCar.meta.frames[5+16*i]
            ),
            right_north: new Sprite(
                resourceCar.image,
                resourceCar.meta.frames[9+16*i]
            ),
            stop_north: new Sprite(
                resourceCar.image,
                resourceCar.meta.frames[13+16*i]
            ),
            // SOUTH
            idle_south: new Sprite(
                resourceCar.image,
                resourceCar.meta.frames[2+16*i]
            ),
            left_south: new Sprite(
                resourceCar.image,
                resourceCar.meta.frames[6+16*i]
            ),
            right_south: new Sprite(
                resourceCar.image,
                resourceCar.meta.frames[10+16*i]
            ),
            stop_south: new Sprite(
                resourceCar.image,
                resourceCar.meta.frames[14+16*i]
            ),
            // WEST
            idle_west: new Sprite(
                resourceCar.image,
                resourceCar.meta.frames[3+16*i]
            ),
            left_west: new Sprite(
                resourceCar.image,
                resourceCar.meta.frames[7+16*i]
            ),
            right_west: new Sprite(
                resourceCar.image,
                resourceCar.meta.frames[11+16*i]
            ),
            stop_west: new Sprite(
                resourceCar.image,
                resourceCar.meta.frames[15+16*i]
            )
        };
    }
    console.log(RESOURCES.cars);

    RESOURCES.tiles = [
        // grass
        new Sprite(
            resourceTiles.image,
            resourceTiles.meta.frames[1]
        ),
        // road
        new Sprite(
            resourceTiles.image,
            resourceTiles.meta.frames[3]
        ),
        // finish
        new Sprite(
            resourceTiles.image,
            resourceTiles.meta.frames[0]
        ),
        // line
        new Sprite(
            resourceTiles.image,
            resourceTiles.meta.frames[2]
        )
    ];

    /*
        Вот тут фигачишь основную движуху
        Это нужно делать только в этом месте - этот кусок вызовется после того, как загрузятся все текстуры
        Вначале рисуешь карту - drawMap(DATA);
        Потом создаешь нужное количество машин - var car = new Car(RESOURCES, DATA, context, 0, 0);
        И перемещаешь - car.draw(1, 1);
    */
    //drawMap(DATA);
    //const car = new Car(RESOURCES, DATA, context, 0, 1)

    

    /* ------------ testing ------------
    // контролируешь тайминг ты
    // перерисовываются они засчет наложения текстуры на предыдущии их координаты,
    // поэтому если машины близко друг к другу надо давать им разницу во времени хотя бы 10 мс,
    // иначе может случится что текстура будет наложена на следующую машину

    var g = 0;
    setInterval(()=>{
        if (g>4) {
            car.draw(g+=2, 2);
        } else if (g===4){
            car.draw(g++, 2, 'rightLights');
        } else if (g===3){
            car.draw(g++, 1, 'rightLights');
        } else {
            car.draw(g++, 1);
        }
    }, 1010)
    const car2 = new Car(RESOURCES, DATA, context, 1, 1)
    var d = 1;
    setInterval(()=>{
        car2.draw(d++, 1, 'stopLights');
    }, 1000)
      ------------ testing ------------ */

})

function loadImage(url) {
    return new Promise((resolve) => {
        var img = new Image();
        img.onload = () => resolve(img);
        img.src = url;
    });
}

function loadSpriteSheet(name) {
    return Promise.all([
        loadImage('sprites/' + name + '.png'),
        fetch('sprites/' + name + '.json').then((response) => response.json())
    ]).then(([image, meta]) => {
        return {
            image: image,
            meta: meta
        };
    });
}
/**
 * Создает карту
 * @param {number[][]} data - поле, 0 - трава. 1 - дорога. 2 - финиш. 3 - разделитель.
 */
function drawMap(data) {
    MAP = data.slice(0);
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            // if (data[i][j] > )
            RESOURCES.tiles[data[i][j]].draw(context, j, i);
        }
    }
}

var car1, car2, car3;  

function createCar(carNumber, xCor, yCor){
    console.log("#" + carNumber + ": (" + xCor + ";" + yCor + ")");
    if(car1 === undefined && carNumber == 1){
        car1 = new Car(RESOURCES, MAP, context, xCor, yCor);
    }
    if(car2 === undefined && carNumber == 2){
        car2 = new Car(RESOURCES, MAP, context, xCor, yCor);
    }
    if(car3 === undefined && carNumber == 3){
        car3 = new Car(RESOURCES, MAP, context, xCor, yCor);
    }
}
function drawCar(carNumber, xCor,yCor, carState) {
    console.log("carNumber: " + carNumber);
    console.log("(" + xCor + ";" + yCor + ") state:" + carState);
    switch(carNumber) {
        case 1: 
            car1.draw(xCor, yCor, carState);
            break;
        case 2:
            car2.draw(xCor, yCor, carState);
            break;
        case 3: 
            car3.draw(xCor, yCor, carState);
            break;
    }
}


