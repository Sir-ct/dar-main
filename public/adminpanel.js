let allUsersHeader = document.getElementById("auh");
let allUsersTable = document.getElementById("aut");
let passwordResetHeader = document.getElementById("rph")
let passwordResetBody = document.getElementById("rpb")
let pendingDepositHeader = document.getElementById("pdrh")
let pendingDepositTable = document.getElementById("pdrt")
let approveDepositHeader = document.getElementById("adh")
let approveDepositTable = document.getElementById("adt")
let withdrawalHeader = document.getElementById("wh")
let withdrawalTable = document.getElementById("wt")

allUsersHeader.addEventListener("click", ()=>{
    allUsersTable.classList.toggle("hidden")
})

passwordResetHeader.addEventListener("click", ()=>{
    passwordResetBody.classList.toggle("hidden")
})

pendingDepositHeader.addEventListener("click", ()=>{
    pendingDepositTable.classList.toggle("hidden")
})

approveDepositHeader.addEventListener("click", ()=>{
    approveDepositTable.classList.toggle("hidden")
})

withdrawalHeader.addEventListener("click",()=>{
    withdrawalTable.classList.toggle("hidden")
})