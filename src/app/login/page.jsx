"use client";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/authContext"; // henüz yapmadım.
import "./login.css";
import { useRouter } from "next/navigation";
export default function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();


    const handleLogin = async (req, res) => {
        setError("");
        try {
            const response = await fetch("BACKEND_URL", {

                method: "POST",
                headers: {
                    "Content-Type": "application/json"

                },
                body: JSON.stringify({ username, password })


            })
            const data = await response.json();

            if (response.ok) {
                console.log("Giriş başarılı:", data);
                localStorage.setItem("user", JSON.stringify(data));
                  router.push("/");  
                 // Ana sayfaya yönlendir
            } else {
                setError(data.message || "Giriş başarısız.");
            }

        }


        catch (err) {
            setError("Login failed. Please check your credentials.");
        }



    }







    return (
        <div className="ortalama">
            <h2 className="h2" style={{marginBottom:"5px"}} >Login Page</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                className="input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="password-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {/* onClick içine handleLogin fonksiyonunu bağladık */}
            <button className="button" onClick={handleLogin}>Login</button>
        </div>
    );
}






