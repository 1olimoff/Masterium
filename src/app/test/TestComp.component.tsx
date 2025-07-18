// // src/app/components/TestComp.tsx
// 'use client';
// import { useState } from "react";
// import axios from "axios";

// export const TestComp = () => {
//     const [name, setName] = useState('');
//     const [phone_number, setPhoneNumber] = useState('');
//     const [password, setPassword] = useState('');
//     const [showCodeInput, setShowCodeInput] = useState(false);
//     const [code, setCode] = useState('');
//     const [error, setError] = useState('');

//     const handleClick = async () => {
//         try {
//             setError('');
//             const response = await axios.post('/api/auth/registration/', { phone_number, password, name, req_type: "register" });
//             if (response.data.success) {
//                 setShowCodeInput(true);
//             }
//             console.log("RESPONSE CLIENT", response);
//         } catch (e: any) {
//             setError(e.response?.data?.error || "Ro‘yxatdan o‘tishda xato yuz berdi");
//         }
//     };

//     const handleCodeClick = async () => {
//         try {
//             setError('');
//             const response = await axios.post('/api/auth/registration/', { phone_number, code, req_type: "otp" });
//             console.log("RESPONSE CLIENT CODE", response);
//         } catch (e: any) {
//             setError(e.response?.data?.error || "OTP tasdiqlashda xato yuz berdi");
//         }
//     };

//     return (
//         <html>
//             <head></head>
//             <body>
                
//         <div>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <input placeholder="Ism" onChange={(e) => setName(e.target.value)} value={name} />
//             <input placeholder="Telefon" onChange={(e) => setPhoneNumber(e.target.value)} value={phone_number} />
//             <input placeholder="Parol" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
//             <button onClick={handleClick}>Yuborish</button>
//             {showCodeInput && (
//                 <div>
//                     <input placeholder="OTP kodi" onChange={(e) => setCode(e.target.value)} value={code} />
//                     <button onClick={handleCodeClick}>Tasdiqlash</button>
//                 </div>
//             )}
//         </div>
//             </body>
//         </html>
//     );
// };