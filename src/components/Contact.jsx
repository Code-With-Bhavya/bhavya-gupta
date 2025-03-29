import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Contact = () => {
    const [text, setText] = useState("Send message");
    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        email: "",
        message: "",
    });

    const [activeField, setActiveField] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleFocus = (field) => {
        setActiveField(field);
    };

    const handleBlur = () => {
        setActiveField(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            }, 2000);
            setFormData({ name: "", subject: "", message: "" });
        } else {
            alert("Error sending message.");
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-[100vh] p-12 flex flex-col gap-5 pointer-events-auto"
            >
                <div className="flex flex-col">
                    <h1 className="text-3xl text-white">
                        Con<span className="text-[#FD6F00]">ta</span>ct
                    </h1>
                    <p className="text-[#FD6F00]">So that we can talk more about...</p>
                </div>

                <div className="p-8 rounded-lg w-full max-w-md mx-auto">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Name Input */}
                        <div className="relative w-full">
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
                                className={`absolute left-4 px-1 transition-all bg-[#03050C] ${
                                    formData.name || activeField === "name"
                                        ? "top-[-10px] text-[#FD6F00]"
                                        : "top-3 text-gray-400"
                                } peer-focus:top-[-10px] peer-focus:text-[#FD6F00]`}
                            >
                                Name
                            </label>
                        </div>

                        {/* Subject Input */}
                        <div className="relative w-full">
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
                                className={`absolute left-4 px-1 transition-all bg-[#03050C] ${
                                    formData.subject || activeField === "subject"
                                        ? "top-[-10px] text-[#FD6F00]"
                                        : "top-3 text-gray-400"
                                } peer-focus:top-[-10px] peer-focus:text-[#FD6F00]`}
                            >
                                Subject
                            </label>
                        </div>

                        {/* Email or Contact(Optional) */}
                        <div className="relative w-full">
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
                                className={`absolute left-4 px-1 transition-all bg-[#03050C] ${
                                    formData.email || activeField === "email"
                                        ? "top-[-10px] text-[#FD6F00]"
                                        : "top-3 text-gray-400"
                                } peer-focus:top-[-10px] peer-focus:text-[#FD6F00]`}
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
                                className="peer bg-transparent border-2 border-[#FD6F00] text-white px-4 py-3 w-full rounded-md outline-none focus:ring-2 focus:ring-white h-32 resize-none"
                                required
                            />
                            <label
                                htmlFor="message"
                                className={`absolute left-4 px-1 transition-all bg-[#03050C] ${
                                    formData.message || activeField === "message"
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
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Contact;
