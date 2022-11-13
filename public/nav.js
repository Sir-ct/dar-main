function main(){
             //mobile nav script
             let hamburger = document.getElementById("ham")
             let menu = document.getElementById("nav-items")
         
             hamburger.addEventListener("click", ()=>{
                 console.log("menu clicked")
                 menu.classList.toggle("nav-display")
             })
             
}
    
         window.addEventListener("load", main)