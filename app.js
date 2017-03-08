let playGround = new Array(100) //棋盘
let realPlayGround = $('#playGround')
let path=[{x:7,y:7}]	//蛇的起始位置
let directionSet=[{i:0,j:-1},{i:1,j:0},{i:0,j:1},{i:-1,j:0}]



// let app  = {
// 	init:function{

// 	}
// }

function coor2Index(coor){
	let {x,y} = coor
	let index = (y-1)*10+x
	return index
}


function render(coor,object){
	let index = coor2Index(coor)
	realPlayGround.find('td').eq(index-1).html(object)
}

function clear(coor){
	let index = coor2Index(coor)
	realPlayGround.find('td').eq(index-1).empty()
}

function judge(coor){
	if(coor.x===0||coor.x===11||coor.y===0||coor.y===11){ //越界
		return 1 //game over
	}else if(arrayContainsObj(path,coor)){ //碰到自身轨迹
		console.log('hha')
		return 1
	}else{
		return 0
	}
}
// 判断对象值是否相等
function isEqual(obj1,obj2){
	for(prop in obj1){
		if(obj1[prop]!==obj2[prop])
			return false
	}
	return true
}

function arrayContainsObj(array,obj){
	for(var i=0;i<array.length;i++){
		if(isEqual(array[i],obj)){
			return true
		}
	}
	return false
}


function events(){
	$('body').on('keydown',function(e){
		let key=e.which
		let direction
		switch(key){
			case 37:
				direction = 3 //left
				break
			case 38:
				direction = 0 //up
				break
			case 39:
				direction = 1 //right
				break
			case 40:
				direction = 2 //down
				break
		}
		if(snake1!==undefined){
		    snake1.changeDirection(direction)
		}
	    else{
	    	return
	    }  

	})
}


class food{
	constructor(){
		this.coor={x:5,y:5}  //食物的起始位置
		this.render(this.coor)
	}
	newFood(){
		clear(this.coor)
		this.coor = {x:Math.ceil(Math.random()*10),y:Math.ceil(Math.random()*10)}
		if(path.indexOf(this.coor)!==-1){
			newFood()
		}else{
			this.render(this.coor)
		}
	}

	render(coor){
		let food=1
		render(coor,food)	
	}
}




class snake{
	constructor(){
		this.direction = 1 //0 1 2 3 上 右 下 左
		this.renderPath()
	}

	move(){
		let self=this
		let id = setInterval(function(){
			let coor = path[path.length-1]
			// coor++
			// coor = {x:(coor.x+1),y:coor.y}
			coor=self.coorPlus(coor)
			if(judge(coor)){
				alert('Game Over')
				clearInterval(id)
				return
			}
			path.push(coor)
			if(isEqual(coor,food1.coor)){
				food1.newFood()
			}else{
				// 清除最后一格
				clear(path[0])
				path.shift()
			}
			self.renderPath()
		},500)

	}

	renderPath(){
		let snake=2
		for(let i=0;i<path.length;i++){
			render(path[i],snake)
		}
	}

	changeDirection(direction){
		this.direction=direction
	}

	coorPlus(coor){
		let {x,y} = coor
	    let {i,j}=directionSet[this.direction]
	    return {x:(x+i),y:(y+j)}
	}
}


events()
let food1 = new food()
let snake1 = new snake()
snake1.move()