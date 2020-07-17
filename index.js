var isGameOver = false;
var isX = false;
var boxes = [];
var html = "";
var playerOne;
var playerTwo;
var isCurrentPlayerOne;
var messageDisplay;
var playerOneScore = document.querySelector("#playerOneScore");
var playerTwoScore = document.querySelector("#playerTwoScore");
var message = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var box = document.querySelectorAll(".box");
var playerOneName = prompt("Enter Player one name");
var playerTwoName = prompt("Enter Player two name");

if(playerOneName == null)
{
    playerOneName = "player one"
}

if(playerTwoName == null)
{
    playerTwoName = "player two"
}

setupPlayer();
initialize();

function initialize()
{
    updateContent();
    isGameOver = false;
    message.textContent = ((isCurrentPlayerOne)?playerOneName:playerTwoName) + "'s turn";
    boxes.length = 0;

    for(var i=0; i<box.length; i++)
    {
        boxes.push(new setupBox(box[i], i));

        var temp = listenerFunction.bind(i, i);
        temp();
    }
}

function listenerFunction(index)
{
    var html;
    boxes[index].content.addEventListener("click", function(event){
    if(!boxes[index].isSelected && !isGameOver)
    {
        if(isX)
        {
            html = '<i class="fas fa-times d-flex justify-content-center align-items-center animate"></i>';
            boxes[index].option = "X";
        }
        else
        {
            html = '<i class="far fa-circle d-flex justify-content-center align-items-center animate"></i>';
            boxes[index].option = "O";
        }
        isX = !isX;
        boxes[index].content.innerHTML = html;
        boxes[index].isSelected = true;
        boxes[index].content.classList.remove("animate");
        checkGame();
        isCurrentPlayerOne = !isCurrentPlayerOne;
        if(!isGameOver)
        {
            message.textContent = ((isCurrentPlayerOne)?playerOneName:playerTwoName) + "'s turn";
        }
    }
});
    boxes[index].content.innerHTML = " "; 
}

function setupBox(selectedBox, index)
{
    this.index = index;
    this.isSelected = false;
    this.option = index;
    this.content = selectedBox; 
}

function setupPlayer()
{
    playerOne = {
        name: playerOneName,
        score: 0
    }
    document.querySelector("#playerOneName").textContent = playerOneName;

    playerTwo = {
        name: playerTwoName,
        score: 0
    }
    document.querySelector("#playerTwoName").textContent = playerTwoName;
}

function checkGame()
{
    messageDisplay = "Game Over<br>" + ((isCurrentPlayerOne)?playerOneName:playerTwoName) + " Wins!!";

    // diagonals
    if(boxes[0].option === boxes[4].option && boxes[0].option === boxes[8].option)
    {
        boxes[0].content.innerHTML = boxes[0].content.innerHTML.replace("animate", "win");
        boxes[4].content.innerHTML = boxes[4].content.innerHTML.replace("animate", "win");
        boxes[8].content.innerHTML = boxes[8].content.innerHTML.replace("animate", "win");
        isGameOver = true;
        message.innerHTML = messageDisplay;
        if(isCurrentPlayerOne)
        {
            playerOne.score++;
        }
        else
        {
            playerTwo.score++;
        }
        updateContent();
        return;
    }

    if(boxes[2].option === boxes[4].option && boxes[2].option === boxes[6].option)
    {
        boxes[2].content.innerHTML = boxes[2].content.innerHTML.replace("animate", "win");
        boxes[4].content.innerHTML = boxes[4].content.innerHTML.replace("animate", "win");
        boxes[6].content.innerHTML = boxes[6].content.innerHTML.replace("animate", "win");
        isGameOver = true;
        message.innerHTML = messageDisplay;
        if(isCurrentPlayerOne)
        {
            playerOne.score++;
        }
        else
        {
            playerTwo.score++;
        }
        updateContent();
        return;
    }

    for(i = 0; i < 3; i++)
    {
        // row
        if(boxes[3*i].option === boxes[3*i+1].option && boxes[3*i].option === boxes[3*i+2].option)
        {
            boxes[3*i].content.innerHTML = boxes[3*i].content.innerHTML.replace("animate", "win");
            boxes[3*i+1].content.innerHTML = boxes[3*i+1].content.innerHTML.replace("animate", "win");
            boxes[3*i+2].content.innerHTML = boxes[3*i+2].content.innerHTML.replace("animate", "win");
            isGameOver = true;
            message.innerHTML = messageDisplay;
            if(isCurrentPlayerOne)
            {
                playerOne.score++;
            }
            else
            {
                playerTwo.score++;
            }
            updateContent();
            return;
        }
        // col
        if(boxes[i].option === boxes[i+3].option && boxes[i].option === boxes[i+6].option)
        {
            boxes[i].content.innerHTML = boxes[i].content.innerHTML.replace("animate", "win");
            boxes[i+3].content.innerHTML = boxes[i+3].content.innerHTML.replace("animate", "win");
            boxes[i+6].content.innerHTML = boxes[i+6].content.innerHTML.replace("animate", "win");
            isGameOver = true;
            message.innerHTML = messageDisplay;
            if(isCurrentPlayerOne)
            {
                playerOne.score++;
            }
            else
            {
                playerTwo.score++;
            }
            updateContent();
            return;
        }
    }
    
    // game over
    isGameOver = true;
    for(var i = 0; i < boxes.length; i++)
    {
        if(boxes[i].isSelected == false)
        {
            isGameOver = false;
            break;
        }
    }

    if(isGameOver)
    {
        messageDisplay = "Game over<br>Draw!!";
        message.innerHTML = messageDisplay;
    }
}

function updateContent()
{
    playerOneScore.textContent = playerOne.score;
    playerTwoScore.textContent = playerTwo.score;
    isX = true;
    isCurrentPlayerOne = true;
}

resetButton.addEventListener("click", function(){
    for(var i=0; i<boxes.length; i++)
    {
        boxes[i].isSelected = false;
        boxes[i].option = i;
        boxes[i].content.innerHTML = ""; 
        boxes[i].content.style.color = "black"
    }
    updateContent();
    isGameOver = false;
    message.textContent = ((isCurrentPlayerOne)?playerOneName:playerTwoName) + "'s turn";
});