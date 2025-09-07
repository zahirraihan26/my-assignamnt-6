const treeCatagoryContiner = document.getElementById("treecatagorycontiner")

const treeContainer= document.getElementById("treecontainer")

const treecountcontiner= document.getElementById("treecountcontiner")

let treecart=[]

const loadCategory = () =>{    
fetch('https://openapi.programming-hero.com/api/categories')
 .then(res => res.json())
 .then(data =>{
    // console.log(data.categories)

    const categories = data.categories
    treeShowCatagory(categories); 

    
 })
 .catch(err=>{
    console.log(err)
 })
}




const treeShowCatagory =(categories)=>{

    categories.forEach(cata => {

        // console.log(cata.category_name);

           treeCatagoryContiner.innerHTML +=`
           
           <li id="${cata.id}" class= " cursor-pointer hover:text-white hover:bg-[#15803D]">${cata.category_name}</li>
           `
        
    });

}

    treeCatagoryContiner.addEventListener("click", (e)=>{

        const allli =document.querySelectorAll("li")
        allli.forEach(li=>{
            li.classList.remove("bg-[#15803D]")
        })
        // console.log(e.target.localName)
       if(e.target.localName === "li"){
        // console.log(e.target.id)
        e.target.classList.add("bg-[#15803D]")
        treenewsByCategory(e.target.id)
       }
    })

    // call cata ogri 
        const callnewsByCategory = () =>{
        // console.log(treeId)
        fetch("https://openapi.programming-hero.com/api/plants")
         .then(res =>res.json())
         .then(data => {

            // console.log(data.plants)

             showtreesBycategory(data.plants) 

        })

         .catch(err => {
            console.log(err)
     })
    }


    // call catagori 


    const treenewsByCategory = (treeId) =>{
        // console.log(treeId)
        fetch(`https://openapi.programming-hero.com/api/category/${treeId}`)
         .then(res =>res.json())
         .then(data => {

            // console.log(data.plants)

             showtreesBycategory(data.plants) 

        })

         .catch(err => {
            console.log(err)
     })
    }

    const showtreesBycategory = (articles)=>{
        
         treeContainer.innerHTML=""
        // console.log(articles)
        articles.forEach(article =>{
            treeContainer.innerHTML+=`

            <div id=${article.id} class="card bg-base-100 shadow-xl p-2">
      <img src="${article.image}" alt="" class=" h-[185px] rounded-xl">
      <h2 class="font-bold text-[#1F2937] my-1">${article.name}</h2>
      <p class="mt-2 text-[#1F293770] text-[11px]">${article.description}</p>
      <div class="py-3 flex justify-between items-center">
        <button class=" bg-[#15803D80] text-[#15803D] text-[11px] rounded-lg p-1">${article.category}</button>
        <h3 class="text-[#1F2937] font-bold ">$${article.price}</h3>
      </div>
      <button id="addtocard" class="btn bg-[#15803D] rounded-xl text-white w-full">Add to Cart</button>
    </div>

            `

        })

    }



 treeContainer.addEventListener("click",(e)=>{
    // console.log(e.target.innerText)
    if(e.target.innerText ==="Add to Cart"){
        alert("tree has been added to the card")
        handeltreecart(e)
    }
 })

 const handeltreecart =(e)=>{

    // console.log("btn click")
        const title = e.target.parentNode.children[1].innerText
        const id =e.target.parentNode.id
        // console.log(id)

       treecart.push({
         title: title,
         id: id
       })
         console.log( treecart)

         showtreecart(treecart)

 }

 const showtreecart =(treecart)=>{
    console.log(treecart)
     treecountcontiner.innerHTML=""
     treecart.forEach(item =>{
        treecountcontiner.innerHTML +=`
         <div class=" shadow-sm my-3 p-2 ">
       <div class="flex justify-between">
        <h1 class="text-[11px] font-bold">${item.title}</h1>
         <button> ❌</button>
         </div>
        </div>
        
        `
     })

 }


loadCategory()

callnewsByCategory()


 



