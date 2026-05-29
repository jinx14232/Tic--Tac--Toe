let boxes=document.querySelectorAll(".boxes");
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
let n_btn=document.querySelector(".new-btn");


let turnX = true;
let draw=0;
let check=false;
let turnMsg= document.querySelector("#turns");
turnMsg.innerText= "Turn X";
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
 
        //box.style.backgroundColor="#b4ada6"
        box.style.boxShadow="0 0 10px 10px rgba(99, 97, 97, 0.5) inset";
        
        if(turnX==true){
            box.innerText="X";
            turnX = false;
            turnMsg.innerText= "Turn O";

        }else{
            box.innerText="O";
            turnX = true;
            turnMsg.innerText= "Turn X";
        }

        box.disabled=true;
        draw++;
        winner();
        check_draw();

    });
})   

function check_draw(){
    if(draw===9 && check===false){
        
        boxes.forEach((box)=>{
            box.disabled=true;
        })

        r_btn.style.display="none";
        turnMsg.parentNode.style.display= "none";
        win3.innerText="OOPS!!";
        win.innerText=`No one wins`;
        win2.innerText="GAME HAS DRAWN";
        win_msg.style.display="flex";
        draw=0;
    }
}
function winner(){
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
            check=true;    
            winner_display(box1);
        }
    })    
}
function winner_display(winner){

    boxes.forEach((box)=>{    
        box.disabled=true;
    })
    turnMsg.parentNode.style.display= "none";
    r_btn.style.display= "none";
    win3.innerText="CONGRATULATIONS";
    win.innerText=`Player ${winner} is the`;
    win2.innerText="THE WINNER";
    win_msg.style.display="flex";
    draw=0;
    check==false
}

r_btn.addEventListener("click",()=>{

    boxes.forEach((btn)=>{
        btn.innerText="";
        btn.style.backgroundColor="#e4d8cb";
        btn.style.boxShadow="0 0 10px 3px rgba(34, 33, 33, 0.5)";
        btn.disabled=false;
    })

    draw=0;
    check=false;

})

let i=1;
n_btn.addEventListener("click",()=>{

    boxes.forEach((btn)=>{
        btn.innerText="";
        btn.style.backgroundColor="#e4d8cb";
        btn.style.color="#5e503f";
        btn.style.boxShadow="0 0 10px 3px rgba(34, 33, 33, 0.5)";
        btn.disabled=false;
        
    })
    r_btn.style.display= "block";
    check=false;
    draw=0;
    win_msg.style.display="none";
    turnMsg.parentNode.style.display= "block";
    
    i++;
    if(i%2==0){
        turnX=false;
    }else{
        turnX=true;
    }
})
