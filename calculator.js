'use strict'
 
const oper= document.querySelectorAll('.op')
const num = document.querySelectorAll('.num')
const inp = document.querySelector('.input')
const clear = document.querySelector('.clear')
const del = document.querySelector('.del')
const result = document.querySelector('.result')

const check = ['+','-', '%','×','÷' ,'(' , ')']
// precedence of + - lesser than '%','×','÷' 
console.log(oper)
console.log(num)
console.log(check)

let Dot = 0 
const operations = function(lastchar){
 
		let flag = -1 
		for(let i = 0 ; i < check.length ;++i){
			if(lastchar === check[i])
			{
				flag = i 
				break
			}
		}
		return flag
}

const isOp = (str)=>{
	let a = operations(str)
	return (a > 0 && a< 4)
}

const Replace = function(cur)
{
	check.forEach( (a)=>{
		cur = cur.replace(a,','+a)
	})
	// cur = cur.replace('+',',+')
	
	return cur 
}

const postfixexpression = (res)=>{
	let result = []
	let stack = []
		for(let i = 0 ; i < res.length ; ++i){
		let pos = operations(res[i])
		if(pos===-1){ // number
			result.push(res[i])
		}
		else{
			let n = stack.length
			if(pos===4||n ===0){
				stack.push(pos)
			}
			else if(pos > 1 && stack[ n - 1 ] <=1  && pos!== 5){
				stack.push(pos)
			}
			else {

				while(stack.length > 0 && stack[stack.length - 1 ]!==4){
					result.push(check[stack[stack.length - 1]])
					stack.pop()

				}
				if(stack.length > 0 && stack[stack.length]===4 && pos === 5)
					stack.pop()
				else
					stack.push(pos)

 			}
			 
		}
	}
	while(stack.length > 0 ){
		result.push(check[stack[stack.length - 1]])
		stack.pop()
	}
	return result

}

const evaluate = (p)=>{
	let stack = []
 
	for(let i = 0 ; i < p.length ;++i){
		let pos = operations(p[i])
	// console.log("Evaluate ",stack)

		if(pos===-1){
			stack.push(parseFloat(p[i]))
		}
		else{
			let val1 = stack[stack.length - 1]
			stack.pop()
			let val2 = stack[stack.length - 1]
			stack.pop()

			if(pos===0)
				stack.push(val2 + val1)	
			else if(pos===1)
				stack.push(val2 - val1)	
			else if(pos===2)
				stack.push(val2 % val1)	
			else if(pos===3)
				stack.push(val2 *val1)	
			else if(pos===4)
				stack.push(val2 / val1)	
			console.log("Evaluated : ",stack)

		}
		// console.log("Evaluated : ",stack)
	}
		return stack[0]


}

for(let i = 0 ; i <oper.length ;++i){
	oper[i].addEventListener('click',function(){

		if(inp.textContent.length ===0)return

		let lastchar = inp.textContent[inp.textContent.length-1]

		console.log(lastchar)
		let flag = operations(lastchar)
		console.log("flag: ",flag)
		if(flag!=-1){
			inp.textContent = inp.textContent.slice(0,-1) + oper[i].textContent
			return
		}
	else{	inp.textContent+=oper[i].textContent		}	
		Dot = 0 
	})
}


for(let i = 0 ; i < num.length ;++i){
	num[i].addEventListener('click',function(){
		console.log("Dot",Dot)

		if(num[i].textContent==='.'){
			if(Dot>0 || inp.textContent.length === 0|| isOp(inp.textContent[inp.textContent.length-1]) )
				return 
			else
				Dot++;
		}
		inp.textContent+=num[i].textContent 
	})
}

clear.addEventListener('click',()=>{
 	 inp.textContent=''
})

del.addEventListener('click',()=>{
	if(inp.textContent.length>0)
	{	
		if(inp.textContent[inp.textContent.length-1] ==='.')
			Dot--
		inp.textContent = inp.textContent.slice(0,-1) 
 
	}
})

result.addEventListener('click',function(){
	let cur = inp.textContent

	cur = Replace(cur)

	let res = cur.split(",") 
	let result = [  res[0]  ]
	for(let i = 1 ; i < res.length ; ++i ){
		result.push( res[i].slice(0,1) )
		result.push(  res[i].slice(1)  )
	}


	let postfix = postfixexpression(result)
	let ans = evaluate(postfix)
	inp.textContent = ans 
	console.log(cur)
	console.log(res)
	console.log('res' ,result)
	console.log('post', postfix)
	console.log('ans',ans)


})

/*
for(let i = 0 ; i <oper.length ;++i){
	oper[i].addEventListener('click',function(){
		let ch = oper[i].textContent ;
		if(ch==='C'){
			inp.textContent =''
			inp.textContent = res = 0 
		}
		else if(ch==='del'){
			inp.textContent = inp.textContent.slice(0,-1) 
			inp.textContent /= 10;

		}
		else if(ch==='+/-'){

		}
		else if(ch==='='){
			operations()
			inp.textContent=res
			op=''
			res = 0
			console.log(res,inp.textContent,op)
			inp.textContent = inp.textContent

		}
		else{
			let ch  = inp.textContent ; 
			let flag = false 
			for(let i = 0 ; i < check.length ;++i){
				if(ch[-1]===check[i]){
					flag= true 
					break
				}
			}
			if(flag)
			inp.textContent +=oper[i].textContent
			operations()
			console.log(res,inp.textContent,op)
			inp.textContent =0
			op = oper[i].textContent
		}
	})
}*/