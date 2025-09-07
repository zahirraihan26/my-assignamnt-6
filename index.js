const treeCatagoryContiner = document.getElementById("treecatagorycontiner")

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
        // console.log(e.target)
        e.target.classList.add("bg-[#15803D]")
       }
    })







loadCategory()



