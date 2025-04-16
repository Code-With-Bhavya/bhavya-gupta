"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Mail, Twitter, Send } from "lucide-react"

const Contact = () => {
  const [text, setText] = useState("Send message")
  const [isSending, setIsSending] = useState(false)
  const [formData, setFormData] = useState(() => ({
    name: "",
    email: "",
    message: "",
  }))

  const [activeField, setActiveField] = useState(null)

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }, [])

  const handleFocus = (field) => {
    setActiveField(field)
  }

  const handleBlur = () => {
    setActiveField(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSending) return // Prevent multiple clicks
    setIsSending(true)
    setText("Sending message...")

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    const result = await response.json()
    if (result.success) {
      setText("Sent!!")
      setTimeout(() => {
        setText("Send Another Message")
        setIsSending(false)
      }, 2000)
      setFormData({ name: "", email: "", message: "" })
    } else {
      alert("Error sending message.")
      setIsSending(false)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, x: -200 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
      className=" pointer-events-auto w-full min-h-screen flex items-center justify-center p-4 md:p-8 bg-[#030711]"
      id="contact"
    >
      <div className="w-full max-w-5xl bg-[#0a0e1a] rounded-3xl overflow-hidden border border-gray-800">
        <div className="grid md:grid-cols-2 h-full">
          {/* Left side - Title and description */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-white mb-4">Contact</h2>
            {/* some text desc */}
            <p className="text-gray-400 mb-6">Have a project in mind or just want to say hi? Let’s connect!</p> 

            {/* Social links for larger screens */}
            <div className="hidden md:flex mt-auto gap-4">
              <a href="mailto:guptabhavya1402@gmail.com" className="text-[#FD6F00] hover:text-white transition-colors">
                <Mail size={20} />
              </a>
              <a href="https://x.com/Gupta_Bhavya_" className="text-[#FD6F00] hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/bhavya-gupta-030b59334/"
                className="text-[#FD6F00] hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="p-8 md:p-12 flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
              {/* Name Input */}
              <div className="relative w-full">
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={handleBlur}
                  className="peer w-full bg-[#131825] border-0 rounded-lg p-4 text-white outline-none focus:ring-1 focus:ring-[#FD6F00]"
                  required
                />
                <label
                  htmlFor="name"
                  className={`absolute left-4 transition-all ${
                    formData.name || activeField === "name" ? "top-0 text-xs text-[#FD6F00]" : "top-4 text-gray-400"
                  } peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#FD6F00]`}
                >
                  Name
                </label>
              </div>

              {/* Email Input */}
              <div className="relative w-full">
                <input
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={handleBlur}
                  className="peer w-full bg-[#131825] border-0 rounded-lg p-4 text-white outline-none focus:ring-1 focus:ring-[#FD6F00]"
                />
                <label
                  htmlFor="email"
                  className={`absolute left-4 transition-all ${
                    formData.email || activeField === "email" ? "top-0 text-xs text-[#FD6F00]" : "top-4 text-gray-400"
                  } peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#FD6F00]`}
                >
                  Email or Contact (Optional)
                </label>
              </div>

              {/* Message Input */}
              <div className="relative w-full">
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus("message")}
                  onBlur={handleBlur}
                  className="peer w-full bg-[#131825] border-0 rounded-lg p-4 text-white outline-none focus:ring-1 focus:ring-[#FD6F00] h-40 resize-none"
                  required
                />
                <label
                  htmlFor="message"
                  className={`absolute left-4 transition-all ${
                    formData.message || activeField === "message"
                      ? "top-0 text-xs text-[#FD6F00]"
                      : "top-4 text-gray-400"
                  } peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#FD6F00]`}
                >
                  Your message
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                disabled={isSending}
                type="submit"
                className="bg-[#FD6F00] text-white font-medium py-4 rounded-lg transition-all hover:bg-[#e56400] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {text}
                {!isSending && <Send size={16} />}
              </motion.button>
            </form>

            {/* Social links for mobile */}
            <div className="flex md:hidden mt-8 gap-4 justify-center">
              <a href="mailto:guptabhavya1402@gmail.com" className="text-[#FD6F00] hover:text-white transition-colors">
                <Mail size={20} />
              </a>
              <a href="https://x.com/Gupta_Bhavya_" className="text-[#FD6F00] hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/bhavya-gupta-030b59334/"
                className="text-[#FD6F00] hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact
