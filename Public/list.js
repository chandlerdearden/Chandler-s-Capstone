 
 let unorderedlist = document.querySelector('#list')
 unorderedlist.innerHTML = ``

 function addIngredients () {
    console.log(ingredients)
    for(let i = 0; i < ingredients.length; i++){
        let list = document.createElement('li')
        list.textContent = ingredients[i]
        unorderedlist.appendChild(list)
    }
 }
addIngredients()