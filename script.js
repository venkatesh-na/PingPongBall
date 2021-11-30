const ball = document.querySelector(".ball")
const base = document.querySelector(".base")
const main = document.querySelector(".main-container")
const scoreContainer = document.querySelector(".score-container")
const start = document.querySelector(".start-again")
var score = 0
let left = 0;



start.addEventListener("click",()=>{
    location.reload()
})

var x = window.matchMedia("(max-width:500px)")

if(x.matches)
{
    const leftButton = document.querySelector(".left")
    const rightButton = document.querySelector(".right")
    leftButton.addEventListener("click",()=>{
         if(base.offsetLeft > 0)
            {
            left = left - 20;
            base.style.left = `${left}px`
            }
    })
    rightButton.addEventListener("click",()=>{
        let offsetRight = main.offsetWidth - (base.offsetWidth + base.offsetLeft)
        console.log(offsetRight)
            if(offsetRight > 15)
            {
            left = left + 20;
            base.style.left = `${left}px`
            }
    })
}
document.addEventListener("keydown",(e)=>{
    switch(e.key)
    {
        case "ArrowRight":
            let offsetRight = main.offsetWidth - (base.offsetWidth + base.offsetLeft)
            if(offsetRight > 15)
            {
            left = left + 60;
            base.style.left = `${left}px`
            }
            break;
        case "ArrowLeft":
            if(base.offsetLeft > 0)
            {
            left = left - 60;
            base.style.left = `${left}px`
            }
            break;
        default:
            break;
    }
})
document.addEventListener("DOMContentLoaded",()=>{
    let check = false
    let lefttWall = false
    let topWall = false
    let rightWall = false
    ball.style.transform = `translateY(${main.offsetHeight}px)`
    let timer = setInterval(()=>{
    let value = base.offsetTop -(ball.getBoundingClientRect().top - main.getBoundingClientRect().top)
    //value is difference between base offsetTop and ball offsetTop since balloffsetTop does not change on movement so thereofore i had to use gaetBoundingClientRect
    //offset not working properly
    let diff = (base.getBoundingClientRect().left - main.getBoundingClientRect().left) - (ball.getBoundingClientRect().left - main.getBoundingClientRect().left)
    //value and diff is for collision detection
    let ballTop = ball.getBoundingClientRect().top - main.getBoundingClientRect().top
    let ballLeft  =  ball.getBoundingClientRect().left - main.getBoundingClientRect().left    
    let ballRight = main.offsetWidth - (ball.getBoundingClientRect().right - main.getBoundingClientRect().left)
    let ballBottom = main.getBoundingClientRect().bottom - ball.getBoundingClientRect().bottom
    //i have used multiple elseif becuase if multiple condition satisfies than te ball may be stuck at single position 
    if(ballLeft < 30)
    {
        lefttWall = true
        if(topWall == true || rightWall == true)
        {   
            //if ball hits top wall and then left wall than it will got down
            //if ball hits right wall and then hits left wall than it will go down
            if(x.matches) ball.style.transform = `translate(${main.offsetHeight+ballBottom}px,${main.offsetHeight+ballBottom}px)`
            else ball.style.transform = `translate(${main.offsetWidth-ballBottom}px,${main.offsetWidth}px)`
            }
            else
            {
                //ball strikes first on left wall
                ball.style.transform = `translate(${ballTop*4}px,-${ballTop}px)`
            }
        }
        else if(ballRight < 30)
        {
            rightWall = true
            if(lefttWall == true || topWall == true)
            {
                //if ball hits left wall and then right wall than it will got down
                //if ball hits top wall and then hits right wall than it will go down
                if(x.matches) ball.style.transform = `translate(-${main.offsetHeight+ballBottom}px,${main.offsetHeight+ballBottom}px)`
                else ball.style.transform = `translate(-${main.offsetWidth-ballBottom}px,${main.offsetWidth}px)`
            }
            else
            {
                //ball striks first on right wall
                ball.style.transform = `translate(-${ballTop*4}px,-${ballTop}px)`
            }
        }
        else if(ballTop < 10 && check)
        {
            topWall = true
            let baseLeft = base.getBoundingClientRect().left - main.getBoundingClientRect().left
            //this logic is like if base in left than ball turn right else left
            if(baseLeft < main.offsetWidth/2)
            {
                ball.style.transform = `translate(${ballLeft}px,${main.offsetHeight}px)`
            }
            else
            {
                ball.style.transform = `translate(-${ballLeft}px,${main.offsetHeight}px)`
            }
            //ball strike on top strike
        }
        else if(x.matches && (diff <= 1 && diff >= -29) && value < 20)
        {
            ball.style.transition = `all 1.5s linear`
            lefttWall = false
            rightWall = false
            topWall = false
            check = true
            //striking of ball in diiferent part of base
            let mainHeight = main.offsetHeight
            if(diff <= 1 && diff >= -10)
            {
                ball.style.transform = `translate(-${mainHeight}px,-${mainHeight-ballTop}px)`
            }
            if(diff <= -10 && diff > -20)
            {
                ball.style.transform = `translate(0px,-${mainHeight-ball.offsetHeight}px)`
            }
            if(diff <= -20 && diff > -30)
            {
                ball.style.transform = `translate(${mainHeight}px,-${mainHeight-ballTop}px)`
            }
            score++;
            scoreContainer.innerHTML = `<spna>score : ${score}</span>`
            if(ballBottom < 10)
            {
                scoreContainer.innerHTML = `<span>your out and score is : ${score}</span>`
            // clearInterval(timer)
            }
        }
        else if ((diff <= 15 && diff >= -110) && value < 20)
        {
            ball.style.transition = `all 1.5s linear`
            lefttWall = false
            rightWall = false
            topWall = false
            check = true
            //striking of ball in diiferent part of base
            let mainWidth = main.offsetWidth
            if(diff <= 15 && diff >= -10)
            {
                ball.style.transform = `translate(-${mainWidth}px,-${mainWidth-ballTop}px)`
            }
            if(diff < -10 && diff > -45)
            {
                ball.style.transform = `translate(-${mainWidth}px,-${mainWidth-ball.offsetHeight}px)`
            }
            if(diff <= -45 && diff > -55)
            {
                ball.style.transform = `translate(0px,-${mainWidth-ball.offsetHeight}px)`
            }
            if(diff <= -50 && diff > -80)
            {
                ball.style.transform = `translate(${mainWidth}px,-${mainWidth-ball.offsetHeight}px)`
            }
            if(diff <= -80 && diff > -110)
            {
                ball.style.transform = `translate(${mainWidth}px,-${mainWidth-ballTop}px)`
            }
            score++;
            scoreContainer.innerHTML = `<spna>score : ${score}</span>`
        }
        if(ballBottom < 6)
        {
            scoreContainer.innerHTML = `<span>your out and score is : ${score}</span>`
           clearInterval(timer)
        }
    },0)
})


