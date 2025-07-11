'use client'
import {useState} from "react";
import axios from "axios";

export const TestComp = () => {
    const [name, setName] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')

    //Code
    const [showCodeInput, setShowCodeInput] = useState(false)
    const [ code, setCode] = useState('')

    const handleClick = async () => {
        const response = await axios.post('/api/auth/registration/', {phone_number, password, name, req_type: "register"})
        // const response = await registrationController.setOtpApi({phone_number, name, password, req_type: "register"})
        if (response.data.success) {
            setShowCodeInput(true);
        }
        console.log("RESPONSE CLIENT", response)
    }

    const handleCodeClick = async () => {
        const response = await axios.post('/api/auth/registration/', {phone_number, code, req_type: "otp"})
        console.log("RESPONSE CLIENT CODE", response)
    }


    return (
        <html>
        <head></head>
        <body>
        <div>
            <input placeholder={"Name"} onChange={(e) => setName(e.target.value)} />
            <input placeholder={"Phone"} onChange={(e) => setPhoneNumber(e.target.value)} />
            <input placeholder={"Password"} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleClick}>Submit</button>
            {
                showCodeInput && (
                    <div>
                        <input placeholder={'code'} onChange={(e) => setCode(e.target.value)} />
                        <button onClick={handleCodeClick}>Submit</button>
                    </div>
                )
            }
        </div>
        </body>
        </html>
    )
}