//fundamental of js
//array and object
//function return
//async 

let a = [1, 2, 7, 5, 4, 6, 5]
//foreach map filter find indexOf

// a.forEach((val)=>
// {
//     val+="hello";
//     console.log(val) 
// })

// var ans=a.map((val)=>
// {
//    return val*3;
// })
// console.log(ans)


// let ans=a.filter((val)=>
// {
//     return val>4;
// })
// console.log(ans)

// let ans=a.find((val)=>
// {
//     return val===5;
// })
// console.log(ans)

// console.log(a.indexOf(6 ))

// let obj = {
//     name: "Paras",
//     age: 11,
// }
// Object.freeze(obj);//this will prevent the object to change its values
// obj.age=90;
// console.log(obj.name)
// console.log(obj.age)

// function abcd()
// {
//     return 12;
// }
// console.log(abcd()) 

async function fun()
{
    let raw=await fetch('');
    let data=await raw.json();
    console.log(data)
}
fun();