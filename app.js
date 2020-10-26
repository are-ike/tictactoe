//This ia an array to store the player objects, so they can referenced anyway in the code.
const players = [];
//This is the player class
class Player{
    constructor(num){
        this.letter = num === 1 ? 'X' : 'O';
        this.player; //this is the variable that stores the name of player
        this.num = num; //num is either one or two
        this.chance = 1; //this is the number of times a player can play at a go
        this.score = 0;
    }
    setName(name){ //updates the player with the name parameter
        this.player = name;
    }
    displaySignIn(){ //this displays html page for the player name to be inputed
        document.querySelector('body').innerHTML =
            `<div class="container">
                <h2 class="heading">Player ${this.num}</h2>
                <input type="text" id="name" placeholder="Name">   
                <a href="#" class="btn" id="save">Save</a>
            </div>`;
    }
    static addToPlayers(player){ //adds player to playerss array
        players.push(player);
    }
}

class Game{
    constructor(){
        Game.currentPlayer; //current player playing
    }
    static showScoreboard(){
        document.querySelector('body').innerHTML = `
        <div class="container">
        <h2 class="sb">Scoreboard</h2>
        <div class="scoreboard">
            <h3>${players[0].player}</h3>
            <h3>${players[1].player}</h3>
            <p class="score gold">${players[0].score}</p>
            <p class="score gold">${players[1].score}</p>
        </div>
        <div class="btns">
            <a href="#" class="btn" id="play-again">play again</a>
            <a href="#" class="btn" id="restart">restart game</a>
        </div>
        </div>`;
        //add event to playagain btn
        document.querySelector('#play-again').addEventListener('click', ()=>{
            Game.showGame(players);
        });
        //add event to restart btn
        document.querySelector('#restart').addEventListener('click', () =>{
            //add reload to restart btn
            location.reload();
        });
    }
    static showGame(players){ //shows game page in html
        Game.currentPlayer = players[0]; //player one in array is automatically the current player

        //displays html
        document.querySelector('body').innerHTML = `
        <div class="container update">
        <h2><span>${Game.currentPlayer.player}</span> is playing</h2>
        <p class="info">Choose any box, then finalize by clicking the 'play' button</p>
        <div class="game">
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
        </div>
        <a href="#" class="btn" id="play">play</a>
        </div>`;

        // Functions and variables for game play
        const boxArray = []; //array to store box that is currently showing
        const winnerBoxes1 = [];
        const winnerBoxes2 = [];

        //function to display either X or O when a box is clicked
        function show(box){
            box.classList.add('show'); //when a box is clicked add 'show' class to indicate its showing
            box.textContent = Game.currentPlayer.letter; //put the letter of the current player into box
            Game.currentPlayer.chance--; //reduce their chance once they've played
            boxArray.push(box); //add this box to box array
        }
        //function to remove display of either X or O when a box is clicked
        function unshow(box){ 
            box.classList.remove('show'); //remove 'show' class
            box.textContent = ''; //remove letter in the box
            Game.currentPlayer.chance++; //add the chance back to the player so the new box can show
        }
        //function to control show and unshow of letters when clicking on boxes
        function play(){ 
            //add click event to each box
            document.querySelectorAll('.box').forEach(box => {
                box.addEventListener('click', ()=>{
                    //taken is a class put on a box to indicate someone has already played there. 
                    if(!box.classList.contains('taken')){ //if the box is not taken then run
                        if(Game.currentPlayer.chance === 1){ //if the player has a chance 
                            show(box);
                        }else{ //if the player does not have a chance i.e they have clicked a box before 
                             //remove the box that is currently showing from boxarray
                            let prevBox = boxArray.pop(); //store the previous box in this variable
                            unshow(prevBox); //unshow that box
                            show(box); //show the new box
                        }
                    }
                   
                });
            });
        }
        //function to check for a winner during game play
        function checkWinner(array, letter){ 
            //takes in an array of boxes that have been taken by one player and the letter of the player
            let boxIndex = ''; //string to hold the index of the boxes that have been taken by one player
            if(array.length >= 3){ //if three or more boxes in the array have been taken then check if player has won
                document.querySelectorAll('.box').forEach((box, i) => {
                    //for each box that is taken and has the textcontent equal to the letter of that player
                    if(box.classList.contains('taken') && box.textContent === letter){
                        boxIndex += i; //add the index of that box to the string
                    }
                });
            }
            //check the string of index. if any of these conditions are met then player has won, return true. else return false
            const boxes = document.querySelectorAll('.box'); //store boxes in array 
            if(boxIndex.includes('0') && boxIndex.includes('1') && boxIndex.includes('2')){
                //add bg color to boxes
                boxes[0].classList.add('bg-gold');
                boxes[1].classList.add('bg-gold');
                boxes[2].classList.add('bg-gold');
                return true;
            }
            else if(boxIndex.includes('0') && boxIndex.includes('3') && boxIndex.includes('6')){
                boxes[0].classList.add('bg-gold');
                boxes[3].classList.add('bg-gold');
                boxes[6].classList.add('bg-gold');
                return true;
            }
            else if(boxIndex.includes('0') && boxIndex.includes('4') && boxIndex.includes('8')){
                boxes[0].classList.add('bg-gold');
                boxes[4].classList.add('bg-gold');
                boxes[8].classList.add('bg-gold');
                return true;
            }
            else if(boxIndex.includes('2') && boxIndex.includes('5') && boxIndex.includes('8')){
                boxes[2].classList.add('bg-gold');
                boxes[5].classList.add('bg-gold');
                boxes[8].classList.add('bg-gold');
                return true;
            }
            else if(boxIndex.includes('2') && boxIndex.includes('4') && boxIndex.includes('6')){
                boxes[2].classList.add('bg-gold');
                boxes[4].classList.add('bg-gold');
                boxes[6].classList.add('bg-gold');
                return true;
            }
            else if(boxIndex.includes('1') && boxIndex.includes('4') && boxIndex.includes('7')){
                boxes[1].classList.add('bg-gold');
                boxes[4].classList.add('bg-gold');
                boxes[7].classList.add('bg-gold');
                return true;
            }
            else if(boxIndex.includes('3') && boxIndex.includes('4') && boxIndex.includes('5')){
                boxes[3].classList.add('bg-gold');
                boxes[4].classList.add('bg-gold');
                boxes[5].classList.add('bg-gold');
                return true;
            }
            else if(boxIndex.includes('6') && boxIndex.includes('7') && boxIndex.includes('8')){
                boxes[6].classList.add('bg-gold');
                boxes[7].classList.add('bg-gold');
                boxes[8].classList.add('bg-gold');
                return true;
            }else{
                return false;
            }
        }
        //function to display html when a player has won
        function showWinner(bool){ //takes in a boolean of true or false
            if(bool === true || bool === false && document.querySelectorAll('.taken').length === 9){ //if boolean is true
                //give current player win
                Game.currentPlayer.score++;
                //change h2
                document.querySelector('h2').innerHTML = `<span>${Game.currentPlayer.player}</span> <span class="gold">wins!</span>`;
                document.querySelector('p').remove();
                //replace 'play' btn with 'restart'
                document.querySelector('#play').textContent = 'restart game'; 
                document.querySelector('#play').setAttribute('id', 'restart');
                //get restart btn
                const restart = document.querySelector('#restart');
                //create div and 'go to scoreboard' btn
                const div = document.createElement('div');
                div.classList.add('btns');
                
                const scoreboard = document.createElement('a');
                scoreboard.classList.add('btn');
                scoreboard.setAttribute('id', 'scoreboard');
                scoreboard.textContent = 'go to scoreboard';

                //add btns to div
                div.appendChild(scoreboard);
                div.appendChild(restart);

                //insert div in html
                document.querySelector('.container').insertAdjacentElement('beforeend', div);

                //add events to btns
                scoreboard.addEventListener('click', Game.showScoreboard);

                restart.addEventListener('click', () =>{
                    //add reload to restart btn
                    location.reload();
                });

                //for all boxes add newbox class and remove box class to remove event on box class
                document.querySelectorAll('.box').forEach(box =>{
                    box.classList.add('newbox');
                    box.classList.remove('box');
                });
                
            }
            if(bool === false && document.querySelectorAll('.taken').length === 9){
                document.querySelector('h2').innerHTML = `no winner <span class="fail">:(</span>`;
                //remove current player win previously given since no one won
                Game.currentPlayer.score--;
            }
        }
        play(); // call play function
        //add event listener to play btn
        document.querySelector('#play').addEventListener('click', ()=>{
            //when player clicks btn reset their chance 
            Game.currentPlayer.chance = 1;
            //add taken class to box that has show class
            document.querySelector('.show').classList.add('taken');
            //run check winner and show winner for player 1 and player 2 after each play
            if(Game.currentPlayer.num === 1){
                winnerBoxes1.push(document.querySelector('.taken'));
                showWinner(checkWinner(winnerBoxes1, 'X'));
            }else{
                winnerBoxes2.push(document.querySelector('.taken'));
                showWinner(checkWinner(winnerBoxes2, 'O'));
            }
            //if there is a play btn after checking the winner( its possible a winner has been found and we don't want this code to run if a winner has been found)
            if(document.querySelector('#play')){
                //remove the show class from box since it is now taken
                document.querySelector('.show').classList.remove('show');
                //change the current player to the next
                Game.currentPlayer = Game.currentPlayer === players[0]? players[1] : players[0];
                //change h2 content
                document.querySelector('h2').innerHTML = `<span>${Game.currentPlayer.player}</span> is playing`;
                play(); //run play function for next player
            }
        });   
    }
    //function to setplayers before game
    static setPlayers(){
        //create a promise that will create a player object, add it to players array and display html
        const promise = new Promise((res, rej)=>{
            const player1 = new Player(1);
            Player.addToPlayers(player1);
            player1.displaySignIn();
            res('done');
        });
        promise.then(()=>{
            //when promise is done then add event to save btn
                document.querySelector('#save').addEventListener('click', showNextPlayer);
        });  
    }
}


//eventFunction
function showNextPlayer(){
    //only runs if input isnt empty
    if(getInput().length !== 0){
        //set input value to nameof player 1
        players[0].setName(getInput());
        //create a second player object, add it to players array and display html
        const player2 = new Player(2);
        Player.addToPlayers(player2);
        player2.displaySignIn();
        //remove the event listener on the save btn and add a new one
        document.querySelector('#save').removeEventListener('click', showNextPlayer);
        document.querySelector('#save').addEventListener('click', ()=>{
            if(getInput().length !== 0){ //if input value isnt empty then set it to player2's name
                player2.setName(getInput());
                Game.showGame(players); //show game
            }
        })
    }
}
//function to get input
function getInput(){
   return document.querySelector('input').value;
}

// Home Page: adding function to start btn
document.querySelector('#start').addEventListener('click', (e)=>{
    Game.setPlayers();
});

