function main(){

    popnotif()

    //mobile nav script
    let hamburger = document.getElementById("ham")
    let menu = document.getElementById("nav-items")
         
    hamburger.addEventListener("click", ()=>{
        console.log("menu clicked")
        menu.classList.toggle("nav-display")
    })

     //pop up notification element declaration
     let popup = document.getElementById("notification-bar")

     function removepop(){
      
        popup.style.display = ""
    }

    function invested(){
        let locations = ["egypt", "mecca", "texas", "rome", "greece", "sweden", "los Angeles"]
        let action = ["deposited", "withdrew"]
        let randomaction = Math.floor(Math.random()*action.length )
        let randomcountry = Math.floor(Math.random() * locations.length)
        let randomamount = Math.floor(Math.random() * 20000) + 500
        
       popup.innerHTML = ` <ion-icon name="checkmark-circle-outline"></ion-icon> 
        <p>an investor from ${locations[randomcountry]} ${action[randomaction]} &pound;${randomamount}</p>`
        popup.style = "display: flex"

        setTimeout(()=>{
        removepop()

        return
      }, 2000)
    }

     function popnotif(){

    setInterval(() => {

        invested()

    }, 6000);
   }

   //showpassword
   let showpass = document.getElementById("showpass")

   showpass.addEventListener("click", ()=>{
       let password = document.getElementById("password")

       if(password.type == "password"){
        password.type = "text"
       }else{
        password.type = "password"
       }
   })
             
}
    
         window.addEventListener("load", main)