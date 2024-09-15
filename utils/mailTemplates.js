import {v4 as uuidv4 } from "uuid"

export const welcomeMail = (username)=>{
    let content = 
    `<div>
        <p> 
            Hello ${username},
            <br />
            Dormantrefunds, 
            <br />
            Thank you for creating an account with us, if you're not logged in already, you can head to the login page on the wesite.
            <br />
            You can contact us on support@dormantrefunds.org for further questions and assistance.
        <p>
    </div>`

    return content
}

export const depositMail = (username, amount)=>{
    let content = 
    `<div>
        <p> 
            Hello ${username},
            <br />
            Dormantrefunds, 
            <br />
            We have received your deposit request of $${amount}, once you have deposited to the address, your request would be processed automatically.
            <br />
            You can contact us on support@dormantrefunds.org for further questions and assistance.
        <p>
    </div>`

    return content
}

export const withdrawMail = (username, amount)=>{
    let content = 
    `<div>
        <p> 
            Hello ${username},
            <br />
            Dormantrefunds, 
            <br />
            $${amount}, has been transferred to your wallet address, withdrawal id is ${uuidv4()}
            <br />
            You can contact us on support@dormantrefunds.org for further questions and assistance.
        <p>
    </div>`

    return content
}