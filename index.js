const treeCatagoryContiner = document.getElementById("treecatagorycontiner")

const treeContainer= document.getElementById("treecontainer")

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


    const treenewsByCategory = (treeId) =>{
        console.log(treeId)
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

            <div class="card bg-base-100 shadow-xl p-6">
      <img src="${article.image}" alt="" class=" rounded-xl">
      <h2 class="font-bold text-[#1F2937]">${article.name}</h2>
      <p class="mt-2 text-[#1F293770]">${article.description}</p>
      <div class="py-3 flex justify-between items-center">
        <button class="btn bg-[#15803D80] text-[#15803D] rounded-lg p-1">${article.category}</button>
        <h3 class="text-[#1F2937] font-bold ">$${article.price}</h3>
      </div>
      <button class="btn bg-[#15803D] rounded-xl text-white w-full">Add to Cart</button>
    </div>

            `

        })

    }






loadCategory()



