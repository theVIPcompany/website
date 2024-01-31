'use client'
import { useState } from "react"

export function Newsletter() {
    const [email, setEmail] = useState("")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const subscribebutton = document.getElementById("subscribebutton") as HTMLInputElement
        subscribebutton!.innerHTML = "Please Wait <i class='fa-solid fa-circle-notch fa-spin'></i>"

        const emailinput = document.getElementById("email") as HTMLInputElement
        emailinput!.disabled = true

        const message = document.createElement("em");
        message.setAttribute("id", "message");
        message.style.color="red"

        try {
            const response = await fetch("/api/subscribe", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
              },
              body: JSON.stringify({email: email}),
            });

            const data = await response.json();
            if (data?.success) {
                subscribebutton!.classList.add("btn-success")
                subscribebutton!.classList.remove("btn-dark")
                subscribebutton!.innerHTML = "Successful <i class='fa-solid fa-circle-check'></i>"

                setTimeout(()=>{
                    setEmail("")
                    subscribebutton!.innerHTML = "Get Notified"
                    subscribebutton!.classList.remove("btn-succcess")
                    subscribebutton!.classList.add("btn-dark")
                    emailinput!.disabled = false
                    }, 5000
                )
            } else if (data?.success == false) {
                if (data.Error.responseCode == 550) {
                    const textnode = document.createTextNode("Invalid email or nonexistent domain. Please try again.");
                    message.appendChild(textnode);
                } else {
                    const textnode = document.createTextNode("Subscription unsuccessful, please try again.");
                    message.appendChild(textnode);
                }
                document.getElementById("subscribe")!.appendChild(message);

                subscribebutton!.classList.add("btn-danger")
                subscribebutton!.classList.remove("btn-dark")
                subscribebutton!.innerHTML = "Error <i class='fa-solid fa-triangle-exclamation'></i>"

                setTimeout(()=>{
                    document.getElementById("message")!.remove()
                    subscribebutton!.innerHTML = "Get Notified"
                    subscribebutton!.classList.remove("btn-danger")
                    subscribebutton!.classList.add("btn-dark")
                    emailinput!.disabled = false
                    }, 5000
                )
            }
          } catch(error) {
            console.error("Error Submitting Form:", error);
          }
    }
    return (
        <div id="subscribe" className="d-flex flex-column align-items-center w-100">
            <form name="newlestter" className="d-flex flex-row w-100 justify-content-center" onSubmit={handleSubmit}>
                <input type="email" id="email" name="email" className="py-2 px-3 border-0 bg-dark-subtle text-dark" value = {email} onChange={(e)=>setEmail(e.target.value)} placeholder="E-mail Address" required />
                <button type="submit" id="subscribebutton" className="btn btn-dark py-2 px-3 rounded-0 text-nowrap">Get Notified</button>
            </form>
        </div>
    )
}
