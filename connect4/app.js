const app = Vue.createApp({
    /*first we set the data that is needed to set up an empty board*/
    data() {
      return { 
        colorChecker: false,
        currentColor: 'red',
        currentPlayer: 'Player 1',
        turnCounter: 0,
        gameBoard: {
            columns: [[], [], [],[],[],[]],
            circles: [[], [], [], [], [], []]
        }
       };
    },
    /*here we set up what methods we will be using to play the game*/
    methods: {
        /*this method sets the current turn, the current player and the current active color*/
        changeTurn(){
            if( this.colorChecker === false) {
                this.colorChecker = true;
                this.currentPlayer = "Player 2";
                this.currentColor = "blue";
                this.turnCounter += 1;
            }
            else if (this.colorChecker === true){
                this.colorChecker = false;
                this.currentPlayer = "Player 1";
                this.currentColor = "red";
                this.turnCounter += 1;
            }
        },
        /*this method finds the last unoccupied piece in the column that was just clicked based on the 
        classname of the clicked column and the id of the circles inside it*/
        hilightPiece(circle, column, color, turnTaken){
            let currentRow = document.getElementById('column-' + column).getElementsByClassName('notClicked').length-1;
            let currentCircle = document.getElementById('circle-' + column + '-' + currentRow)
            if(currentCircle.classList.contains('red') || currentCircle.classList.contains('blue')){
                return;
            }
            currentCircle.classList.add('turn-taken-'+turnTaken)
            currentCircle.classList.add('turn-taken')
            currentCircle.classList.remove('notClicked')
            if(color === "red"){
                currentCircle.classList.toggle('red')
            }else if (color=== "blue"){
                currentCircle.classList.toggle('blue')
            }
        },
        /*this method makes sure that changeTurn and hilightPiece are both run when the column is clicked*/
        addToken(cino, colno, color, player, turnTaken){
            let currentCircle= this.findLastCircle;
            this.hilightPiece(cino, colno, color, turnTaken);
            this.changeTurn();
        },  
        /*this method skips back a step to undo everything that happened in the last step that was taken*/
        redoLastTurn(){
            if(this.turnCounter <= 0){
                alert('no turns have been taken');
                return;
            }
            if( this.colorChecker === false) {
                this.colorChecker = true;
                this.currentPlayer = "Player 2";
                this.currentColor = "blue";
                this.turnCounter -= 1;
            }
            else if (this.colorChecker === true){
                this.colorChecker = false;
                this.currentPlayer = "Player 1";
                this.currentColor = "red";
                this.turnCounter -= 1;
            }
            let previousTurn = document.getElementsByClassName('turn-taken-'+this.turnCounter)[0]
            previousTurn.classList.add('notClicked')
            previousTurn.classList.remove(this.currentColor);
            previousTurn.classList.remove('turn-taken-'+this.turnCounter)
        },
        /*this method undoes everything that is currently on the board to start a new clean game*/
        restartGame(){
            this.colorChecker= false,
            this.currentColor= 'red',
            this.currentPlayer= 'Player 1',
            this.turnCounter= 0
            let activeCircles = document.querySelectorAll('.turn-taken');
            activeCircles.forEach(circle =>{
                circle.className = "circle notClicked"
            })  
        },
        saveGame(){
            /*this should contain a way to save the board to localstorage*/
        },
        deleteSavedGame(){
            /*this should delete the previously saved game from localstorage*/
        }
    },
  });
  
  app.mount('#connect4');