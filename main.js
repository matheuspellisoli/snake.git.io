var canvas, ctx, tamanhoX , tamanhoY , fps, tamanhoSnake , pts;
var snake , playLabel , frut;
var isPause = false;
var isGameOver = false;
var isPlay = false;
var keys = {
    left: 65,
    up: 87,
    right: 68,
    down: 83,
    enter: 13,
    esc: 27
}
window.Event
window.addEventListener("keydown",keyDown);

function keyDown(e){
        
    switch(e.keyCode){
        case keys.left:
            if(snake.direction[0] != 1 && snake.direction[1] != 0){
                if(isPlay){
            snake.direction = [-1,0];
                }
            }
            
            break;
        case keys.up:
            if(snake.direction[0] != 0 && snake.direction[1] != 1){
            if(isPlay){
            snake.direction = [0,-1];
            }
            }
            break;
        case keys.right:
            if(snake.direction[0] != -1 && snake.direction[1] != 0){
           if(isPlay){
            snake.direction = [1,0];
           }
            }
            break;
        case keys.down:
           if(snake.direction[0] != 0 && snake.direction[1] != -1){
            if(isPlay){
            snake.direction = [0,1];
            }
            }
            break;
        case keys.enter:
            if(isGameOver){
                isGameOver = false;
                newGame();
            }else{
                isPlay = true;
            }
            
            break;
        case keys.esc:
            if(isPlay){
                if(!isPause){
                isPause = true;                      
            }else{
                isPause = false;
            }
                
            }
            break;
                    
                    }
}
function init(){
    tamanhoX = 600;
    tamanhoY = 400;    
    canvas =  document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = tamanhoX;//10
    canvas.height = tamanhoY    ;//10
    canvas.className = "base";
    document.getElementById("game").appendChild(canvas);
    fps = 15;
    tamanhoSnake = Math.max(tamanhoX /60 , tamanhoY / 60);
    newGame();
    run();
}
function newGame(){
    snake = new Snake();
    playLabel = new PlayLabel();
    frut = new Frut();
    frut.positionRandom();
    isPlay = false;
    isPause = false;
    isGameOver = false;
    pts = 0;
}
function Frut(){
    this.color = "#C40A06";
    this.position = [5,12];
    this.draw = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position[0] * tamanhoSnake ,this.position[1] * tamanhoSnake,tamanhoSnake , tamanhoSnake);
    }
    this.positionRandom = function(){
        var x = Math.floor(( Math.random() * ((tamanhoX / 10) - 0) + 0)) ;
        var y = Math.floor(( Math.random() * ((tamanhoY / 10) - 0) + 0));
        this.position = [x,y];
    }
}
function PlayLabel(){
    this.text = "";
    this.mensage = {
        inicio: "Leia as instruções antes de jogar pressione as entre para jogar.",
        fim: "Game Over",
        cont:{
            1:"1",
            2:"2",
            3:"3"
        },
        pause:{
            1:"Pause",
            2:"Pessione Esc para sair."
    }
    }
    this.color = "#fff"
    this.draw = function(){
        ctx.fillStyle = this.color;
        ctx.font = " 20px Arial";
        ctx.fillText(this.text,(tamanhoX / 2) - ctx.measureText(this.text).width /2, tamanhoY / 2);
        
    }
}

function colaider(){    
    if(snake.body[0][0] == frut.position[0] && snake.body[0][1] == frut.position[1]){
      snake.addBody(); 
    frut.positionRandom();
        pts++;
    };
    for(var i = 1; i < snake.body.length -1; i++){
        if(snake.body[0][0] == snake.body[i][0] && snake.body[0][1] == snake.body[i][1]){
           isGameOver = true;
           }
    }
if(snake.body[0][0] > (tamanhoX/10) || snake.body[0][0] < 0){
    isGameOver = true;
}   
    if(snake.body[0][1] >(tamanhoY/10) || snake.body[0][1] < 0){
    isGameOver = true;
} 
    
}
function Snake(){
    this.body = [[10,10],[10,11],[10,12]];
    this.color = "#000";
    this.direction = [0,-1];
    this.draw = function(){
        ctx.fillStyle = this.color;        
        for(var i = 0; i < this.body.length;i++){
            ctx.fillRect(this.body[i][0] * tamanhoSnake,this.body[i][1] * tamanhoSnake, tamanhoSnake , tamanhoSnake);
        }
    };
    this.update = function(){
        var nextPos = [this.body[0][0]+ this.direction[0], this.body[0][1] + this.direction[1]];
        if(!isPlay){
            if(this.direction[1] == -1 && nextPos[1] <= (tamanhoY * 0.01)){
                this.direction = [1,0];
            }else if(this.direction[0] == 1 && nextPos[0] >= (tamanhoX * 0.09)){
                this.direction = [0,1];
            }
            else if(this.direction[1] == 1 && nextPos[1] >= (tamanhoY * 0.09)){
                this.direction = [-1,0];
            }else if(this.direction[0] == -1 && nextPos[0] <= (tamanhoY * 0.01)){
                this.direction = [0,-1];
            }
        }
        
        this.body.pop(); // remove o ultimo valor
        
        this.body.splice(0,0,nextPos);
    } 
    
    this.addBody = function(){
        var tempPos = [this.body[this.body.length - 1][0],this.body[this.body.length - 1][1]];
        this.body.push(tempPos);
    };
}
function update(){
    snake.update();
    colaider();
}
function draw(){    
    ctx.clearRect(0,0,tamanhoX,tamanhoY);  
    
    if(!isPlay){
        snake.draw();    
        playLabel.text = playLabel.mensage.inicio;
        playLabel.draw();
    }else{
        frut.draw();
        snake.draw();
    }
    
}
function gameOver(){
    playLabel.text = playLabel.mensage.fim;
        playLabel.draw();
}
function pause(){
     playLabel.text = playLabel.mensage.pause[1];
      playLabel.draw(); 
}
function rest(){
    
}
function setPonts(){
  var pPonts =   document.getElementById("pts");
    pPonts.innerHTML = 'Pontuação: '+pts+' pts';
}
function run(){  
   // console.log("X "+snake.body[0][0] +"Y "+snake.body[0][1]);
    if(!isPause && !isGameOver){
        update();  
        draw();
    }else{
        if(isPause && !isGameOver){
            pause();
        }else{
        gameOver();
    }
    }
    setPonts();
    setTimeout(run,1000 / fps);
}

init();
