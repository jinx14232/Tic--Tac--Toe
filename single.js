window.addEventListener("load", ()=>{
let boxes=document.querySelectorAll(".boxes");
if (boxes.length === 0) return; // Not on single.html

let win_patterns=[
    [0,1,2], [3,4,5],[6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]
let win_msg=document.querySelector(".winner");
let win=document.querySelector("#p1");
let win2=document.querySelector("#p2");
let win3=document.querySelector("span");
let r_btn=document.querySelector(".res-btn");
// let n_btn=document.querySelector(".new-btn");
let turnMsg= document.querySelector("#turns");

let yourTurn = localStorage.getItem('playerSymbol') || 'O';
let compTurn = yourTurn === 'X' ? 'O' : 'X';
let winnerFound= false;
let draw= false;
let moves=0; //to count number of turns played, to check for draw
// let check=false; //to check if winner is found or not, to avoid showing draw message after win

// Show main and turns
document.querySelector("main").style.display = "flex";
document.querySelector(".turns").style.display = "block";
turnMsg.innerText = `Your Turn (${yourTurn})`;


boxes.forEach((box)=>{
        box.addEventListener("click",()=>{
            box.style.boxShadow="0 0 10px 10px rgba(99, 97, 97, 0.5) inset";
            box.innerText= yourTurn;
            box.disabled=true;
            moves++;
            turnMsg.innerText= `Computer Turn (${compTurn})`;
            r_btn.disabled= true;
            checkWinner();
            if(!winnerFound){ //if winner not found, check for draw and comp move
                check_draw();
                if(draw){ 
                    disableBtns();
                }else{ 
                    setTimeout(()=>{
                        compFunction();
                    }, 1000)
                }
            }
    });

})   
const disableBtns= ()=>{
     boxes.forEach((box)=>{
            box.disabled=true;
        })
}

const compFunction= ()=>{
    let moveMade= false;
    win_patterns.some((idx)=>{ //check if comp can win in next move
            let box1=boxes[idx[0]].innerText;
            let box2=boxes[idx[1]].innerText;
            let box3=boxes[idx[2]].innerText;
            if((box1== box2 && box1== compTurn && box3== "") || //comp can win
                (box2== box3 && box2== compTurn && box1== "") || 
                (box1== box3 && box1== compTurn && box2== "")){ 
                    if(box3== ""){
                        boxes[idx[2]].innerText= compTurn;
                        boxes[idx[2]].style.boxShadow="0 0 10px 10px rgba(99, 97, 97, 0.5) inset";
                    }else if(box1== ""){
                        boxes[idx[0]].innerText= compTurn;
                        boxes[idx[0]].style.boxShadow="0 0 10px 10px rgba(99, 97, 97, 0.5) inset";
                    }else{   
                        boxes[idx[1]].innerText= compTurn;
                        boxes[idx[1]].style.boxShadow="0 0 10px 10px rgba(99, 97, 97, 0.5) inset";
                    }
                    moveMade= true;
                    return true;
            }
        });
    
    if(!moveMade){ //else check if comp can block in next move
        win_patterns.some((idx)=>{
        let box1=boxes[idx[0]].innerText;
        let box2=boxes[idx[1]].innerText;
        let box3=boxes[idx[2]].innerText;
        if((box1== box2 && box1== yourTurn && box3== "") || //comp can block
                (box2== box3 && box2== yourTurn && box1== "") || 
                (box1== box3 && box1== yourTurn && box2== "")){
                if(box3== ""){
                    boxes[idx[2]].innerText= compTurn;
                    boxes[idx[2]].style.boxShadow="0 0 10px 10px rgba(99, 97, 97, 0.5) inset";
                }else if(box1== ""){
                    boxes[idx[0]].innerText= compTurn;
                    boxes[idx[0]].style.boxShadow="0 0 10px 10px rgba(99, 97, 97, 0.5) inset";
                }else{   
                    boxes[idx[1]].innerText= compTurn;
                    boxes[idx[1]].style.boxShadow="0 0 10px 10px rgba(99, 97, 97, 0.5) inset";
                }
                moveMade= true;
                return true;
            }
    });
    }
    if(!moveMade){ //else comp takes first empty box
        win_patterns.some((idx)=>{
            let box1=boxes[idx[0]].innerText;
            let box2=boxes[idx[1]].innerText;
            let box3=boxes[idx[2]].innerText;
            if(box1== "" && (box2== compTurn || box3== compTurn || box2== "" || box3== "")){
                boxes[idx[0]].innerText= compTurn;
                boxes[idx[0]].style.boxShadow="0 0 10px 10px rgba(99, 97, 97, 0.5) inset";
                moveMade= true;
                return true;
            }else if(box2== "" && (box1== compTurn || box3== compTurn || box1== "" || box3== "")){    
                boxes[idx[1]].innerText= compTurn;
                boxes[idx[1]].style.boxShadow="0 0 10px 10px rgba(99, 97, 97, 0.5) inset";
                moveMade= true;
                return true;
            }else if(box3== "" && (box1== compTurn || box2== compTurn || box1== "" || box2== "")){
                boxes[idx[2]].innerText= compTurn;
                boxes[idx[2]].style.boxShadow="0 0 10px 10px rgba(99, 97, 97, 0.5) inset";
                moveMade= true;
                return true;
            }
        })
    }    
    checkWinner();
    check_draw();
    moves++;
    
    if(!winnerFound && !draw) {
        turnMsg.innerText= `Your Turn (${yourTurn})`;
        r_btn.disabled= false;
        boxes.forEach((box)=>{
            if(box.innerText== "")  box.disabled= false;
        })
    }
}
function check_draw(){
    if(moves===9 && draw===false){
        draw= true;
        disableBtns();
        r_btn.style.display="none";
        turnMsg.parentNode.style.display= "none";
        win3.innerText="OOPS!!";
        win.innerText=`No One Wins`;
        win2.innerText="GAME HAS DRAWN";
        win_msg.style.display="flex";
        moves=0;
    }
}
function checkWinner(){
    win_patterns.forEach((idx)=>{

        let box1=boxes[idx[0]].innerText;
        let box2=boxes[idx[1]].innerText;
        let box3=boxes[idx[2]].innerText;

        if(box1==box2 && box2==box3 && box1!="" && box2!="" && box3!=""){
            boxes[idx[0]].style.backgroundColor="#3f474b";
            boxes[idx[1]].style.backgroundColor="#3f474b";
            boxes[idx[2]].style.backgroundColor="#3f474b";
            boxes[idx[0]].style.color="#e4d8cb";
            boxes[idx[1]].style.color="#e4d8cb";
            boxes[idx[2]].style.color="#e4d8cb";
            winnerFound= true;
            winner_display(box1);
        }
    })    
}
function winner_display(winner){

    disableBtns();
    turnMsg.parentNode.style.display= "none";
    r_btn.style.display= "none";
    if(winner== yourTurn) {
        win3.innerText="CONGRATULATIONS";
        win.innerText=`You Are`;
        win2.innerText="THE WINNER";
    }else{
        win3.innerText="OOPS!!";
        win.innerText=`You Are`;
        win2.innerText="THE LOSER";
    }
    win_msg.style.display="flex";
    moves=0;
    draw=false;
}

r_btn.addEventListener("click",()=>{

    boxes.forEach((btn)=>{
        btn.innerText="";
        btn.style.backgroundColor="#e4d8cb";
        btn.style.boxShadow="0 0 10px 3px rgba(34, 33, 33, 0.5)";
        btn.disabled=false;
    })
    moves=0;
    draw=false;

})

// n_btn.addEventListener("click",()=>{

//     boxes.forEach((btn)=>{
//         btn.innerText="";
//         btn.style.backgroundColor="#e4d8cb";
//         btn.style.color="#5e503f";
//         btn.style.boxShadow="0 0 10px 3px rgba(34, 33, 33, 0.5)";
//         btn.disabled=false;
        
//     })
//     r_btn.style.display= "block";
//     check=false;
//     draw=0;
//     win_msg.style.display="none";
//     turnMsg.parentNode.style.display= "block";
    
// })
})