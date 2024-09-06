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

depositBtn.addEventListener("click", ()=>{
   // console.log("plan:" + plan.value + ", currency:" + currency.value + ", amount:" + amount.value)

    switch(plan.value){
        case 'basic':
            showplan.innerText = "Basic plan"
            showamount.innerText = "500"
            showprofit.innerText = "50% for one month"
            amount.value = 500
            break;
        case 'bronze':
            showplan.innerText = "Bronze plan"
            showamount.innerText = "1500"
            showprofit.innerText = "50% for one month"
            amount.value = 1500
            break;
        case 'silver':
            showplan.innerText = "Standard Plan"
            showamount.innerText = "3000"
            showprofit.innerText = "50% for one month"
            amount.value = 3000
            break;
        case 'gold':
            showplan.innerText = "Gold plan"
            showamount.innerText = "5000"
            showprofit.innerText = "120% for one month"
            amount.value = 5000
            break;
        case "diamond":
            showplan.innerText = "Company Shares"
            showamount.innerText = "6000"
            showprofit.innerText = "120% for one month"
            amount.value = 6000
            break;
        case "platinum":
            showplan.innerText = "Real Estate"
            showamount.innerText = "10000"
            showprofit.innerText = "120% for one month"
            amount.value = 10000
    }

    switch(currency.value){
        case 'bitcoin':
            showaddress.innerText = "bc1qrknpq0y46s34w680d2u7mrg3l06j7xev9q302g" //"bc1qra0srskmzl068c7nvvj62duxz0edrwfjm0lff2"
            break;
        case 'ethereum':
            showaddress.innerText = "0x86369F349b77b08BAd5Edf95A87959e603D8377B" //"0x6CfdE2789b594492C51eE7F8832aE7A0C81fB524" //
            break;
        case 'trc':
            showaddress.innerText = "TV1peHCMg6E8pywkTCAhePSNRNymuWWPee" //"TYjfNUX8qVmp7qCvsEFPPmhDGua9pCatdX" //
    }

   for(let i = 0; i < depositDivs.length; i++){
    depositDivs[i].classList.toggle("hidden")
   }

})