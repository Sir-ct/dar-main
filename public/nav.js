function main(){
    //mobile nav script
    let hamburger = document.getElementById("ham")
    let menu = document.getElementById("nav-items")
         
    hamburger.addEventListener("click", ()=>{
        console.log("menu clicked")
        menu.classList.toggle("nav-display")
    })

    //dashboard nav script
    let navtabs = document.getElementsByClassName("nav-item-tab")
    let subtabs = document.getElementsByClassName("nav-sub-items-wrap")

    for(let i=0; i < navtabs.length; i++){
        navtabs[i].addEventListener("click", ()=>{
            subtabs[i].classList.toggle("hidden")
        })
    }
             
}
    
         window.addEventListener("load", main)