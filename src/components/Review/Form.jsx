import { motion } from "framer-motion"
import Image from "next/image"
import { cardVariants, reviewTextVariants, headerVariants, avatarVariants, nameVariants, verifyVariants, starVariants } from "../functions"
import { useState } from "react"

const Form = ({user, setReviewadded, fetchReviews}) => {

    const [reviewbyuser, setReviewbyuser] = useState("");
    const [star, setStar] = useState(0) 
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!reviewbyuser) return

        const res = await fetch("/api/review", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ review: reviewbyuser, name: user.name, email: user.email, star: star, picture: user.picture }),
        })

        if (res.ok) {
            setReviewadded(true)
            alert("Review submitted successfully")
            fetchReviews()
        } else if (res.status === 345) {
            setReviewadded(true)
            alert("Review already exists with this email")
        }
        else {
            alert("Failed to submit review")
        }
    }


    return (
        <motion.div
            className="flex flex-col h-full justify-between bg-[#1E1E1E] text-white p-6 rounded-2xl shadow-lg max-w-md w-full"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.form
                onSubmit={handleSubmit}
                className="mt-4 flex flex-col h-[451px] justify-between"
                variants={reviewTextVariants}
            >
                <motion.header
                    className="flex items-center gap-4"
                    variants={headerVariants}
                >
                    <motion.div variants={avatarVariants}>
                        <Image
                            src={user.picture || "/placeholder.svg"}
                            alt={user.name}
                            width={100}
                            height={100}
                            className="rounded-full w-[3.25rem] h-[3.25rem] border-2 border-[#333333]"
                        />
                    </motion.div>
                    <div>
                        <div className="flex gap-2 items-center">
                            <motion.h2
                                className="font-semibold leading-9 text-2xl text-[#FD6F00]"
                                variants={nameVariants}
                            >
                                {user.name}
                            </motion.h2>
                            <motion.img
                                src="/verify.svg"
                                alt="verify"
                                variants={verifyVariants}
                            />
                        </div>
                        {/* Ask for rating */}
                        <motion.div
                            className="flex flex-col gap-2 mb-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                        >
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((currentStar) => (
                                    <motion.button
                                        key={currentStar}
                                        type="button"
                                        className="text-2xl focus:outline-none"
                                        custom={currentStar}
                                        variants={starVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover="hover"
                                        whileTap="tap"
                                        onClick={() => setStar(currentStar)}
                                    >
                                        <span
                                            className={`transition-colors ${currentStar <= star ? "text-[#FD6F00]" : "text-gray-400"
                                                }`}
                                        >
                                            ★
                                        </span>
                                    </motion.button>
                                ))}
                            </div>

                        </motion.div>
                    </div>
                </motion.header>

                <motion.textarea
                    required
                    placeholder="Write your review here..."
                    value={reviewbyuser}
                    variants={reviewTextVariants}
                    onChange={(e) => setReviewbyuser(e.target.value)}
                    className="w-full h-28 p-3 rounded-lg bg-[#1c1c1d] text-white border border-[#FD6F00] focus:outline-none focus:ring-2 focus:ring-[#FD6F00] transition-all"
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-[#FD6F00] text-white hoverbtn px-4 py-2 rounded-lg shadow-md transition-colors duration-300 font-semibold"
                >
                    Submit Review
                </motion.button>
            </motion.form>
        </motion.div>
    )
}

export default Form
