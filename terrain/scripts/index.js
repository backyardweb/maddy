console.log("no errors.");

var canvas = document.getElementById('canvas');

noise.seed(Math.random());

var ctx = canvas.getContext('2d');

var image = ctx.createImageData(canvas.width, canvas.height);

var data = image.data;

var map = [[], []];

for (var x = 0; x < canvas.width; x++) {
    for (var y = 0; y < canvas.height; y++) {
        var value = Math.abs(noise.perlin2(x / 100, y / 100));
        map[x][y] = value;
    }
}

console.log(map);

ctx.fillColor = 'black';
ctx.fillRect(0, 0, 100, 100);
ctx.putImageData(map, 0, 0);