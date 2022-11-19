function runmain(){
       //dashboard nav script
   let navtabs = document.getElementsByClassName("nav-item-tab")
   let subtabs = document.getElementsByClassName("nav-sub-items-wrap")

   for(let i=0; i < navtabs.length; i++){
       navtabs[i].addEventListener("click", ()=>{
           subtabs[i].classList.toggle("hidden")
           console.log("navtabs clicked")
       })
   }

    //dashboardnave logic
    let dashham = document.getElementById("dash-ham")
    let dashnav = document.getElementById("dash-nav")

    dashham.addEventListener("click",()=>{
        dashnav.classList.toggle("collapse")
        dashnav.classList.toggle("show")
    })

}

   window.addEventListener("load", runmain)