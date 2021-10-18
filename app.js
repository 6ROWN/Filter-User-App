
const results = document.getElementById("results")
const filter = document.getElementById("filter")
const loader = document.querySelector(".loading")
const listItems = []

//Hide loading Animation
loader.style.display = "block"
//HIde error message
document.querySelector(".error").style.display = "none"


//Get data

async function getData(){
    const response = await fetch("https://randomuser.me/api/?results=50")
    const data = await response.json()

    return {
        data
    }
    
    
}

setTimeout(function(){
    getData().then(data=>{
        const userData = data.data.results
    
        //Populating data
        userData.forEach(function(use){
            const li = document.createElement("li")
            li.classList.add("list-items")
            listItems.push(li)
            
            // setInterval(function(){}, 3000)
    
            li.innerHTML=`
            <div class="img">
                <img src=${use.picture.large} alt=${use.name.first}>
            </div>
            <div class="user-info">
                <h4>${use.name.first} ${use.name.last}</h4>
                <p>${use.location.city}, ${use.location.country}</p>
            </div>
            ` 
            results.appendChild(li)
            loader.style.display="none"
        })
        
    })
    .catch(err=>{
        document.querySelector(".error").style.display ="block"
        loader.style.display="none"
        
        
    })

}, 3000)



//Filter data
filter.addEventListener("input", (e)=>filterData(e.target.value))

function filterData(searchTerm){
    listItems.forEach(item=>{
        if(item.innerHTML.toLowerCase().includes(searchTerm.toLowerCase())){
            item.classList.remove("hide");
        }else{
            item.classList.add("hide")
        }
    })
}

//Loading