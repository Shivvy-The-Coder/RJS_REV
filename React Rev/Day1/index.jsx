a=true
b=false


function getname (name)
{
    return name
}

console.log(b&&getname("Shivam"))


// tempelate literals
let name1 = "Shivam"
let name2 = "Dow"

console.log(name1+" "+name2)
// or in tempelate lieteral
console.log(`${name1} ${name2}`)


let showreciepie = false;

function getRcipeOneName(recipeiName){
    return recipeiName
}
function getRcipeTwoName(recipeiName){
    return recipeiName
}

if (showreciepie)
    {
        console.log(getRcipeOneName("Pizza"))
    }
else
    {
        console.log(getRcipeTwoName("coke"))
    }
    showreciepie=true
    showreciepie?console.log(getRcipeOneName("Pizza")):console.log(getRcipeTwoName("coke"))


    const id =1;
    const productname ="Apple Watch"
    const rating=5;

    const product ={
        id ,
        productname,
        rating 
    }
    console.log(product)

    const product2={
        description : 'product 2 description',
        product
    }
const getProductTwoDescription = product2.description

console.log(getProductTwoDescription)
console.log(product2.product)


const array2= [2,3,4]
const array3= [1,5,6]

console.log(...array2, ...array3)
console.log([...array2,...array3])






// ES6 Array Methods

const personArray=[
    {
        name : "person 1",
        age: 30,
        country : "USA"
    },
    {
        name : "person 4",
        age: 45,
        country : "USA"
    },
    {
        name : "person 2",
        age: 40,
        country : "Russia"
    },
    {
        name : "person 3",
        age: 50,
        country : "India"
    }
];


// this is how Map works in javascript

let getAllNames = personArray.map((singlePerson,index)=>
    {
    return `${singlePerson.name} age is ${singlePerson.age}`
    }
)

console.log(getAllNames)


// this is how Find works in javascript , if a condition satisfies than it will return the first matching object 

let getpersonFromUSA = personArray.find((singlePerson,index)=>{
    return singlePerson.country==="USA" 
});

console.log(getpersonFromUSA)


// Filter return all the objects that match the condition

let getAllPersonFromUSA = personArray.filter((names, index)=>{
    return names.country==="USA"
})

console.log(getAllPersonFromUSA)


// this will returb true and false based on condition matching in any array element  some is like or , if one satify than it will return true
let checkSoneArrayMethodWithExample = personArray.some((single,index)=>{
    return (single.age>40)
});

console.log(checkSoneArrayMethodWithExample)

let checkEveryArrayMethodWithExample = personArray.every((single,index)=>{
    return (single.age>40)
});

console.log(checkEveryArrayMethodWithExample)



const fruitsArray = ["Mango" , "Apple" , "Waqamoli" , "Banana"];
console.log(fruitsArray.includes("Apples"))


// find the index of the person who is from russia

const getIndexOfPersonFromRussia = personArray.findIndex((name, index)=>{
    return (name.country==="Russia")
})

console.log(getIndexOfPersonFromRussia)

const getIndexOfPersonFromJapan = personArray.findIndex((name, index)=>{
    return (name.country==="Japan")
})

console.log(getIndexOfPersonFromJapan)

