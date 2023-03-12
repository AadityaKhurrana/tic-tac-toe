const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector('.game-info');
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winingPostion=[[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

function init(){
    currentPlayer='X';
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
    boxes.forEach((ele,index)=>{
        ele.innerText="";
        boxes[index].style.pointerEvents="all";
    })
    gameGrid=["","","","","","","","",""];
    newGameBtn.classList.remove("active");
    boxes.forEach((box)=>{
        box.classList.remove("win");
    })
}
init();

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index);
    })
})

function swapTrun()
{
    if(currentPlayer==='X')
    {
        currentPlayer='O'
    }
    else{
        currentPlayer='X'
    }
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer="";
    winingPostion.forEach((pos,index)=>{
        let x=gameGrid[pos[0]];
        let y=gameGrid[pos[1]];
        let z=gameGrid[pos[2]];
 
         if(x!=="" || y!=="" || z!=="")
         {
             if(x===y && y===z)
             {
                if(x==='X')
                {
                    answer='X';
                }
                else{
                    answer='O'; 
                }
                // disable pointer

                boxes.forEach((box)=>{
                    box.style.pointerEvents="none";
                })

                boxes[pos[0]].classList.add("win");
                boxes[pos[1]].classList.add("win");
                boxes[pos[2]].classList.add("win");
             }
         }
     })

    if(answer!=="")
    {
        newGameBtn.classList.add('active')
        gameInfo.innerText=`Winner Player ${answer}`
        return
    }

    // Tie or nor
    let count=0;
    gameGrid.forEach((val)=>{
        if(val!=="")
        {
            count++;
        }
    })
    if(count===9)
    {
        newGameBtn.classList.add('active')
        gameInfo.innerText=`Game Tied`
    }
}

function handleClick(index)
{
    if(gameGrid[index]==="")
    {
        
        gameGrid[index]=currentPlayer;
        boxes[index].innerText=currentPlayer;
        boxes[index].style.pointerEvents="none";

        // swap player
        swapTrun();

        // Game Over
        checkGameOver();
        
    }
    
}

newGameBtn.addEventListener('click',()=>{
    init();
})