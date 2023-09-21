let depositDivs = document.getElementsByClassName("deposit-div")

let plan = document.getElementById("plan")
let currency = document.getElementById("currency")
let amount = document.getElementById("deposit-amount")
let depositBtn = document.getElementById("deposit-btn")

let showplan = document.getElementById("plan-span")
let showaddress = document.getElementById("deposit-addr")
let showamount = document.getElementById("amount-span")
let showprofit = document.getElementById("profit-span")

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
            showplan.innerText = "Silver plan"
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
            showplan.innerText = "Diamond plan"
            showamount.innerText = "6000"
            showprofit.innerText = "120% for one month"
            amount.value = 6000
            break;
        case "platinum":
            showplan.innerText = "Platinum plan"
            showamount.innerText = "10000"
            showprofit.innerText = "120% for one month"
            amount.value = 10000
    }

    switch(currency.value){
        case 'bitcoin':
            showaddress.innerText = "bc1qra0srskmzl068c7nvvj62duxz0edrwfjm0lff2" //bc1qxk95d3gsy6y72utz3ueqt2zclt5jn85d69tr3t
            break;
        case 'ethereum':
            showaddress.innerText = "0x6CfdE2789b594492C51eE7F8832aE7A0C81fB524" //"0x98f17aD4e86062F1CCB4D4689aE2b6871BaF40A9"
            break;
        case 'trc':
            showaddress.innerHTML = "TYjfNUX8qVmp7qCvsEFPPmhDGua9pCatdX" //"TBmNoQAoZCL1iVZWAzSkeknMGGyginPeQP"
    }

   for(let i = 0; i < depositDivs.length; i++){
    depositDivs[i].classList.toggle("hidden")
   }

})