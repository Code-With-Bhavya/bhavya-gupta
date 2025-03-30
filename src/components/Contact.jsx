import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

const Contact = () => {
    const [text, setText] = useState("Send message");
    const [isSending, setIsSending] = useState(false);
    const [formData, setFormData] = useState(() => ({
        name: "",
        subject: "",
        email: "",
        message: "",
    }));


    const [activeField, setActiveField] = useState(null);

    const handleChange = useCallback((e) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }, []);


    const handleFocus = (field) => {
        setActiveField(field);
    };

    const handleBlur = () => {
        setActiveField(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSending) return; // Prevent multiple clicks
        setIsSending(true);
        setText("Sending message...");

        const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (result.success) {
            setText("Sent!!");
            setTimeout(() => {
                setText("Send Another Message");
                setIsSending(false);
            }, 2000);
            setFormData({ name: "", subject: "", email: "", message: "" });
        } else {
            alert("Error sending message.");
            setIsSending(false);
        }
    };

    useEffect(() => {
        console.log('First Render')

    })


    return (
        <motion.section
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
            className="w-full h-[80vh] md:h-[100vh] lg:p-12 flex flex-col gap-5 pointer-events-auto"
            id="contact"
        >
            <header className="flex flex-col">
                <h2 className="text-3xl text-white">
                    Con<span className="text-[#FD6F00]">ta</span>ct
                </h2>
                <p className="text-[#FD6F00]">So that we can talk more about...</p>
            </header>


            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 rounded-lg w-full items-center">
                {/* Name Input */}
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus("name")}
                        onBlur={handleBlur}
                        className="peer bg-transparent border-2 border-[#FD6F00] text-white px-4 py-3 w-full rounded-md outline-none focus:ring-2 focus:ring-white"
                        required
                    />
                    <label
                        htmlFor="name"
                        className={`absolute left-4 px-1 transition-all bg-[#03050C] ${formData.name || activeField === "name"
                            ? "top-[-10px] text-[#FD6F00]"
                            : "top-3 text-gray-400"
                            } peer-focus:top-[-10px] peer-focus:text-[#FD6F00]`}
                    >
                        Name
                    </label>
                </div>

                {/* Subject Input */}
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => handleFocus("subject")}
                        onBlur={handleBlur}
                        className="peer bg-transparent border-2 border-[#FD6F00] text-white px-4 py-3 w-full rounded-md outline-none focus:ring-2 focus:ring-white"
                        required
                    />
                    <label
                        htmlFor="subject"
                        className={`absolute left-4 px-1 transition-all bg-[#03050C] ${formData.subject || activeField === "subject"
                            ? "top-[-10px] text-[#FD6F00]"
                            : "top-3 text-gray-400"
                            } peer-focus:top-[-10px] peer-focus:text-[#FD6F00]`}
                    >
                        Subject
                    </label>
                </div>

                {/* Email or Contact(Optional) */}
                <div className="relative w-full max-w-md">
                    <input
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus("email")}
                        onBlur={handleBlur}
                        className="peer bg-transparent border-2 border-[#FD6F00] text-white px-4 py-3 w-full rounded-md outline-none focus:ring-2 focus:ring-white"
                    />
                    <label
                        htmlFor="email"
                        className={`absolute left-4 px-1 transition-all bg-[#03050C] ${formData.email || activeField === "email"
                            ? "top-[-10px] text-[#FD6F00]"
                            : "top-3 text-gray-400"
                            } peer-focus:top-[-10px] peer-focus:text-[#FD6F00]`}
                    >
                        Email or Contact (Optional)
                    </label>
                </div>

                {/* Message Input */}
                <div className="relative w-full max-w-md">
                    <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus("message")}
                        onBlur={handleBlur}
                        className="peer bg-transparent border-2 border-[#FD6F00] text-white px-4 py-3 w-full rounded-md outline-none focus:ring-2 focus:ring-white h-32 resize-none"
                        required
                    />
                    <label
                        htmlFor="message"
                        className={`absolute left-4 px-1 transition-all bg-[#03050C] ${formData.message || activeField === "message"
                            ? "top-[-10px] text-[#FD6F00]"
                            : "top-3 text-gray-400"
                            } peer-focus:top-[-10px] peer-focus:text-[#FD6F00]`}
                    >
                        Your message
                    </label>
                </div>

                {/* Submit Button */}
                <motion.button
                    disabled={text === "Sending message..."}
                    type="submit"
                    className="bg-[#FD6F00] disabled:cursor-not-allowed hoverbtn px-6 py-3 rounded-md transition-all"
                >
                    {text}
                </motion.button>
            </form>



            <div className="flex gap-2 w-full lg:text-xl text-[#FD6F00] justify-center items-center">
                Other ways to contact me:
                <div className="flex gap-4 justify-center items-center">
                    <a className="hover:scale-110 hover:shadow-2xl pointer-events-auto transition-all ease-linear" href="mailto:guptabhavya1402@gmail.com"><img src="/mail.svg" width={28} className="cursor-pointer" height={500} alt="gmail" /></a>
                    <a className="hover:scale-110 hover:shadow-2xl pointer-events-auto transition-all ease-linear" href={'https://x.com/Gupta_Bhavya_'}><img src="/twitterlogo.svg" width={28} className="cursor-pointer" height={500} alt="twitter" /></a>
                    <a className="hover:scale-110 hover:shadow-2xl pointer-events-auto transition-all ease-linear" href={'https://t.me/BhavyaxGupta'}><img src="/telegramlogo.svg" width={35} className="cursor-pointer" height={500} alt="insta" /></a>
                    <a className="hover:scale-110 hover:shadow-2xl pointer-events-auto transition-all ease-linear" href={'https://www.linkedin.com/in/bhavya-gupta-030b59334/'}><img src="/linkedinlogo.svg" width={28} className="cursor-pointer" height={500} alt="linkedin" /></a>
                </div>
            </div>
        </motion.section>
    );
};

export default Contact;
