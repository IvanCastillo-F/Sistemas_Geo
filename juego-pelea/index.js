const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7

const background = new Sprite({
    position:{
        x:0,
        y:0
    },
    imageSrc:'./img/Background.webp'
})

const player = new Player({
   position:{
    x:0,y:0
   } ,
   velocity:{
    x:0,y:0
   },
   offset:{
       x:0,
       y:0
   },
   imageSrc: './img/Hero/Idle.png',
   framesMax: 8,
   scale: 2.7,
   offset:{
       x:215,
       y:139
   },
   sprites:{
    idle:{
        imageSrc: './img/Hero/Idle.png',
        framesMax: 8
       },
    run:{
        imageSrc: './img/Hero/Run.png',
        framesMax: 8
    },
    jump:{
        imageSrc: './img/Hero/Jump.png',
        framesMax: 2
    },
    fall:{
        imageSrc: './img/Hero/Fall.png',
        framesMax: 2
    },
    attack1:{
        imageSrc: './img/Hero/Attack1.png',
        framesMax: 6
    },
    takeHit:{
        imageSrc: './img/Hero/Take Hit - white silhouette.png',
        framesMax: 4
    },
    death:{
        imageSrc: './img/Hero/Death.png',
        framesMax: 6
    },
   },
   attackBox:{
       offset:{
           x:100,
           y:50
       },
       width:240,
       height: 50
   }
})


const enemy = new Player({
    position:{
        x:400,y:100
       } ,
       velocity:{
        x:0,y:0
       },
       color:'blue',
       offset:{
           x:-50,
           y:0
       },
   imageSrc: './img/Wizard/Idle.webp',
   framesMax: 6,
   scale: 1.8,
   offset:{
       x:215,
       y:62
   },
   sprites:{
    idle:{
        imageSrc: './img/Wizard/Idle.webp',
        framesMax: 6
       },
    run:{
        imageSrc: './img/Wizard/Run.webp',
        framesMax: 8
    },
    jump:{
        imageSrc: './img/Wizard/Jump.webp',
        framesMax: 2
    },
    fall:{
        imageSrc: './img/Wizard/Fall.webp',
        framesMax: 2
    },
    attack1:{
        imageSrc: './img/Wizard/Attack2.webp',
        framesMax: 8
    },
    takeHit:{
        imageSrc: './img/Wizard/WhiteHit.webp',
        framesMax: 4
    },
    death:{
        imageSrc: './img/Wizard/Death.webp',
        framesMax: 7
    },
   },
   attackBox:{
    offset:{
        x:-180,
        y:30
    },
    width:150,
    height: 70
}
})


const key = {
    a:{
        presssed: false
    },
    d:{
        presssed: false
    },
    ArrowLeft:{
        presssed: false
    },
    ArrowRight:{
        presssed: false
    },

}


decreaseTimer()

function animate(){
 
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    // background
    background.update()
    c.fillStyle = 'rgba(255, 255, 255, 0.07)'
    c.fillRect(0, 0, canvas.width, canvas.height)

    //players
    player.update()
    enemy.update()
    // Player 1 movement
    player.velocity.x = 0
    
    if(key.a.presssed && player.lastKey === 'a'){
        player.velocity.x = -5
        player.switchSprite('run')
    }else if(key.d.presssed && player.lastKey === 'd'){
        player.velocity.x = 5
        player.switchSprite('run')
    } else {
        player.switchSprite('idle')
    }

    // jumping
    if(player.velocity.y < 0){
       player.switchSprite('jump')
    }else if(player.velocity.y > 0){
        player.switchSprite('fall')
    }


    // Player 2 movement
    enemy.velocity.x = 0
    
    if(key.ArrowLeft.presssed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    }else if(key.ArrowRight.presssed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    }else {
        enemy.switchSprite('idle')
    }

      // jumping
      if(enemy.velocity.y < 0){
        enemy.switchSprite('jump')
     }else if(enemy.velocity.y > 0){
        enemy.switchSprite('fall')
     }

    //detect for colision player 1
    if(collision({
        rec1:player,
        rec2:enemy
    }) &&
        player.isAttacking && player.frameCurrent === 4){
            enemy.takeHit()
            player.isAttacking = false
          
            gsap.to('#enemyHealth',{
                width: enemy.health + '%'
            })
    }

    // if player miss attack
    if(player.isAttacking && player.frameCurrent === 4){
        player.isAttacking = false
    }


     //detect for colision player 2
     if(collision({
        rec1:enemy,
        rec2:player
    }) &&
        enemy.isAttacking && enemy.frameCurrent === 5){
            player.takeHit()
            enemy.isAttacking = false
           
            gsap.to('#playerHealth',{
                width: player.health + '%'
            })
    }

    // if player miss attack
    if(enemy.isAttacking && enemy.frameCurrent === 5){
        enemy.isAttacking = false
    }

    //end game by health
    if(enemy.health <= 0 || player.health <= 0){
        determineWinner({player, enemy, timerId})
    }
}

animate()

window.addEventListener('keydown',(event) =>{
    
    if(!player.dead){
switch(event.key){
    //Player 1 keys
    case 'd':
            key.d.presssed = true
            player.lastKey = 'd'
        break
        case 'a':
            key.a.presssed = true
            player.lastKey = 'a'
        break
        case 'w':
            if(player.position.y >= 100)
            player.velocity.y = -15
        break
        case ' ':
            player.attack()
        break
}}
if(!enemy.dead){
switch(event.key){
        //Player 2 keys
    case 'ArrowRight':
            key.ArrowRight.presssed = true
            enemy.lastKey = 'ArrowRight'
        break
    case 'ArrowLeft':
            key.ArrowLeft.presssed = true
            enemy.lastKey = 'ArrowLeft'
        break
    case 'ArrowUp':
        if(enemy.position.y >= 100)
            enemy.velocity.y = -15
        break
        case 'ArrowDown':
            enemy.attack()
        break
}
}
})

window.addEventListener('keyup',(event) =>{
    switch(event.key){
        case 'd':
            key.d.presssed = false
            break
        case 'a':
            key.a.presssed = false
        break
    }

    switch(event.key){
        case 'ArrowRight':
            key.ArrowRight.presssed = false
            break
        case 'ArrowLeft':
            key.ArrowLeft.presssed = false
        break
    }
    })
