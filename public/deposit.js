let depositDivs = document.getElementsByClassName("deposit-div")

let plan = document.getElementById("plan")
let currency = document.getElementById("currency")
let amount = document.getElementById("deposit-amount")
let depositBtn = document.getElementById("deposit-btn")

let showplan = document.getElementById("plan-span")
let showaddress = document.getElementById("deposit-addr")
let showamount = document.getElementById("amount-span")
let showprofit = document.getElementById("profit-span")

showaddress.addEventListener("click", ()=>{
   // Copy the text inside the text field
  navigator.clipboard.writeText(showaddress.innerText);
  alert("text copied :" + " " + showaddress.innerText)
})

plan.addEventListener("change", ()=>{
    switch(plan.value){
        case 'basic':
            amount.value = 50
            break;
        case 'bronze':
            amount.value = 500
            break;
        case 'silver':
            amount.value = 1000
            break;
        case 'gold':
            amount.value = 2000
            break;
        case "diamond":
            amount.value = 6000
            break;
        case "platinum":
            amount.value = 10000
    }
})

depositBtn.addEventListener("click", ()=>{
   // console.log("plan:" + plan.value + ", currency:" + currency.value + ", amount:" + amount.value)

    switch(plan.value){
        case 'basic':
            showplan.innerText = "Basic plan"
            showamount.innerText = amount.value > 50 ? amount.value.toString() : "50"
            showprofit.innerText = "20% for 24 hours"
            amount.value = amount.value > 50 ? amount.value : 50
            break;
        case 'bronze':
            showplan.innerText = "Bronze plan"
            showamount.innerText = amount.value > 500 ? amount.value.toString() : "500"
            showprofit.innerText = "35% for 48 hours"
            amount.value = amount.value > 500 ? amount.value : 500
            break;
        case 'silver':
            showplan.innerText = "Standard Plan"
            showamount.innerText = amount.value > 1000 ? amount.value.toString() : "1000"
            showprofit.innerText = "80% for 92 hours"
            amount.value = amount.value > 1000 ? amount.value : 1000
            break;
        case 'gold':
            showplan.innerText = "Gold plan"
            showamount.innerText = amount.value > 2000 ? amount.value.toString() : "2000"
            showprofit.innerText = "100% for 48 hours"
            amount.value = amount.value > 2000 ? amount.value : 2000
            break;
        case "diamond":
            showplan.innerText = "Company Shares"
            showamount.innerText = amount.value > 6000 ? amount.value.toString() : "6000"
            showprofit.innerText = "120% for 72 hours"
            amount.value = amount.value > 6000 ? amount.value : 6000
            break;
        case "platinum":
            showplan.innerText = "Real Estate"
            showamount.innerText = amount.value > 10000 ? amount.value.toString() : "10000"
            showprofit.innerText = "150% for 48 hours"
            amount.value = amount.value > 10000 ? amount.value : 10000
    }

    switch(currency.value){
        case 'bitcoin':
            showaddress.innerText = "bc1qwcv0eknwmzuevfaw8x4a527yk6726aq00qkgpj" //"bc1qrknpq0y46s34w680d2u7mrg3l06j7xev9q302g" //"bc1qra0srskmzl068c7nvvj62duxz0edrwfjm0lff2"
            break;
        case 'ethereum':
            showaddress.innerText = "0x8F025EBb705c537C32D7e99be44605Fafa2baaB3" //"0x86369F349b77b08BAd5Edf95A87959e603D8377B" //"0x6CfdE2789b594492C51eE7F8832aE7A0C81fB524" //
            break;
        case 'trc':
            showaddress.innerText = "TKgko6uySacY8d2z3GbHC9LLSkhTr825a4" //"TV1peHCMg6E8pywkTCAhePSNRNymuWWPee" //"TYjfNUX8qVmp7qCvsEFPPmhDGua9pCatdX" //
    }

   for(let i = 0; i < depositDivs.length; i++){
    depositDivs[i].classList.toggle("hidden")
   }

})