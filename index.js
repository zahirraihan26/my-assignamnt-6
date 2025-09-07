const treeCatagoryContiner = document.getElementById("treecatagorycontiner")

const treeContainer= document.getElementById("treecontainer")

const treecountcontiner= document.getElementById("treecountcontiner")

let treecart=[]

const loadtreeData = async(id) =>{
   const url = `https://openapi.programming-hero.com/api/plant/${id} `
   const res = await fetch(url);
   const ditels = await res.json()
   displaytreeditels(ditels)
}


const displaytreeditels = (tree) => {
   const plant = tree.plants 

  const diteltreeBox = document.getElementById("ditels-continer");

  diteltreeBox.innerHTML = ` 
    <div class="space-y-3">
       <h3 class="text-lg font-bold">${ plant.name}</h3>
      <img src="${ plant.image}" alt="" class="w-full h-48 object-cover rounded-lg">
      <p><span class="font-bold">Category:</span> ${ plant.category}</p>
      <p><span class="font-bold">Price:</span> $${ plant.price}</p>
      <p><span class="font-bold">Description:</span> ${ plant.description}</p>
    </div>
  `;

  document.getElementById("my_modal_5").showModal();
};












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
         showloading()
        // console.log(e.target.id)
        e.target.classList.add("bg-[#15803D]")
        treenewsByCategory(e.target.id)
       }
    })

    // call cata ogri 
        const callnewsByCategory = () =>{
           showloading();
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
         showloading()
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
      <div onclick="loadtreeData(${article.id}) " class=""><h2 class="font-bold text-[#1F2937] my-1 ">${article.name}</h2></div>
      <p class="mt-2 text-[#1F293770] text-[11px]">${article.description}</p>
      <div id="billcount"  class="py-3 flex justify-between items-center">
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
   const card = e.target.parentNode;  
   const title = card.children[1].innerText;  
   const price = card.querySelector("h3").innerText;  
   const id = card.id;   

   treecart.push({
      title: title,
      price: price,
      id: id
   })

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
        
         <button onClick="handeldeletebookmark('${item.id}')"class=""> ❌</button>
         
         
         </div>
         <div>
        <h2 class="text-[11px] font-bold">${item.price}</h2>
        </div>
        </div>
        
        `
     })
     
     showTotal()
 }

 

   const handeldeletebookmark=(treeid)=>{
    const filterBookmarkTree=treecart.filter(a => a.id !== treeid)

    // console.log(filterBookmarkTree)

    treecart = filterBookmarkTree

    showtreecart(treecart )

   }

   const showTotal = () => {
   let total = 0
   for (const item of treecart) {
    const priceNumber = Number(item.price.replace('$', ''));
    total += priceNumber;
   }
  document.getElementById("totaltk").innerText = ` Total:  $${total}`
 }


 const showloading=()=>{
   treeContainer.innerHTML = `
    <div class="flex justify-center items-center col-span-12 h-[200px]">
      <span class="loading loading-bars loading-xl"></span>

    </div>
  `;
 }
   


loadCategory()

callnewsByCategory()


 



