let playGround = new Array(100) //棋盘
let realPlayGround = $('#playGround')
let path=[{x:7,y:7}]	//蛇的起始位置

// let app  = {
// 	init:function{

// 	}
// }

function coor2Index(coor){
	var {x,y} = coor
	var index = (y-1)*10+x
	return index
}


function render(coor,object){
	let index = coor2Index(coor)
	realPlayGround.find('td').eq(index-1).append(object)
}


realPlayGround.on('keydown',function(e){
	let key=e.which
	// switch(key):
	// 	case 37:

})

class food{
	constructor(){
		this.coor={x:5,y:5}  //食物的起始位置
		this.render(this.coor)
	}
	newFood(){
		this.coor = {x:Math.ceil(Math.random()*10),y:Math.ceil(Math.random()*10)}
		this.render(coor)
	}

	render(coor){
		let food=1
		render(coor,food)	
	}
}




class snake{
	constructor(){
		let direction = 1 //0 1 2 3 上 右 下 左
		this.renderPath()
	}

	move(){
		var self=this
		setInterval(function(){
			let coor = path[path.length-1]
			// coor++
			console.log(path)
			coor = {x:(coor.x+1),y:coor.y}
			if(coor!=food.coor){
				path.push(coor)
				path.shift()
				self.renderPath()
			}
		},500)

	}

	renderPath(){
		var snake=2
		for(let i=0;i<path.length;i++){
			render(path[i],snake)
		}
	}
}



let food1 = new food()
let snake1 = new snake()
snake1.move()