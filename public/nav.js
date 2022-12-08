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
        let locations = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Belarus", "Belgium",  "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Chad", "Chile", "China", "Colombia", "Congo", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands","Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Gibraltar", "Greece", "Greenland", "Grenada", "Guatemala", "Guinea", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait",  "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon",  "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen"]
        let action = ["deposited", "withdrew"]
        let randomaction = Math.floor(Math.random()*action.length )
        let randomcountry = Math.floor(Math.random() * locations.length)
        let randomamount = Math.floor(Math.random() * 20000) + 500
        
       popup.innerHTML = ` <ion-icon name="checkmark-circle-outline"></ion-icon> 
        <p>An investor from ${locations[randomcountry]} ${action[randomaction]} &pound;${randomamount}</p>`
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
        showpass.innerText = "hide password"
       }else{
        password.type = "password"
        showpass.innerText = "show password"
       }
   })
             
}
    
         window.addEventListener("load", main)