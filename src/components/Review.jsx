"use client"

import { AnimatePresence, motion, useInView } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import ReviewCard from "./Review/ReviewCard"
import NavigationButtons from "./Review/NavigationButtons"
import BackgroundElements from "./Review/BackgroundElements"
import Image from "next/image"

const Review = ({ user }) => {
    const [reviews, setReviews] = useState([])
    const [startIndex, setStartIndex] = useState(0)
    const [star, setStar] = useState(0) // Track selected star rating
    const [direction, setDirection] = useState(0) // -1 for left, 1 for right, 0 for initial
    const [isAnimating, setIsAnimating] = useState(false) // Track animation state
    const [animateCenter, setAnimateCenter] = useState(true) // Track if center card animations should run
    const [reviewadded, setReviewadded] = useState(false);
    const [reviewbyuser, setReviewbyuser] = useState("");
    const visibleCount = 3
    const carouselRef = useRef(null)
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

    useEffect(() => {
        // fetch reviews from the server
        fetchReviews()
    }, [])

    const fetchReviews = async () => {
        const res = await fetch("/api/review")
        const data = await res.json()
        setReviews(data)
    }

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

    // Function to handle looping indexes
    const getLoopedIndex = (index) => {
        // If we have no reviews, return 0
        if (!reviews.length) return 0

        // Calculate the true index using modulo to wrap around
        // Add reviews.length to handle negative indexes first
        return ((index % reviews.length) + reviews.length) % reviews.length
    }

    // Get visible reviews with looping
    const getVisibleReviews = () => {
        if (!reviews.length) return []

        const result = []
        for (let i = 0; i < visibleCount; i++) {
            const loopedIndex = getLoopedIndex(startIndex + i)
            result.push({
                ...reviews[loopedIndex],
                loopedIndex, // Add this to help with keying
                position: i === 0 ? "left" : i === 1 ? "center" : "right", // Add position property
                transitionId: startIndex + i, // Add a unique transition ID
            })
        }
        return result
    }

    // Update the handleNext function to ensure proper animation timing
    const handleNext = () => {
        if (!isAnimating && reviews.length >= visibleCount) {
            // Enable center card animations when navigating
            setAnimateCenter(false)
            setTimeout(() => {
                setAnimateCenter(true)
            }, 50)

            setIsAnimating(true)
            setDirection(1) // Moving right

            // Update index after a short delay to allow exit animations to start
            setTimeout(() => {
                setStartIndex((prev) => getLoopedIndex(prev + 1))
                // Reset animation state after the transition is complete
                setTimeout(() => setIsAnimating(false), 600)
            }, 50)
        }
    }

    // Update the handlePrev function to ensure proper animation timing
    const handlePrev = () => {
        if (!isAnimating && reviews.length >= visibleCount) {
            // Enable center card animations when navigating
            setAnimateCenter(false)
            setTimeout(() => {
                setAnimateCenter(true)
            }, 50)

            setIsAnimating(true)
            setDirection(-1) // Moving left

            // Update index after a short delay to allow exit animations to start
            setTimeout(() => {
                setStartIndex((prev) => getLoopedIndex(prev - 1))
                // Reset animation state after the transition is complete
                setTimeout(() => setIsAnimating(false), 600)
            }, 50)
        }
    }

    // Animation variants for section
    const sectionVariants = {
        hidden: {
            opacity: 0,
            y: 50,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    }

    // Animation variants for title
    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: 0.2,
            },
        },
    }

    const headerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.2,
                duration: 0.3,
            },
        },
    }

    const avatarVariants = {
        hidden: { scale: 0, rotate: -30 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.3,
            },
        },
    }

    const nameVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.4,
                duration: 0.3,
            },
        },
    }

    const verifyVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delay: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 10,
            },
        },
    }

    const starVariants = {
        hidden: { opacity: 0, scale: 0, rotate: -30 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                delay: 0.6 + i * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 10,
            },
        }),
    }

    const reviewTextVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.7,
                duration: 0.3,
            },
        },
    }

    const cardVariants = {
        initial: {
            opacity: 0,
            y: 50,
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 180,
                damping: 22,
                mass: 1,
            },
        },
        exit: {
            opacity: 0,
            y: -50,
            transition: {
                type: "spring",
                stiffness: 180,
                damping: 22,
            },
        },
        hover: {
            scale: 1.05,
            y: -10,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
        tap: {
            scale: 0.98,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
    };



    return (
        <motion.section
            ref={sectionRef}
            className="w-full h-[100vh] py-12 flex flex-col gap-5 pointer-events-auto relative overflow-hidden"
            id="review"
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <motion.h2 className="text-3xl" variants={titleVariants} initial="hidden" animate="visible">
                Rev
                <motion.span
                    className="text-[#FD6F00]"
                    animate={{
                        color: ["#FD6F00", "#FF9F4A", "#FD6F00"],
                        textShadow: [
                            "0 0 5px rgba(253, 111, 0, 0.3)",
                            "0 0 15px rgba(253, 111, 0, 0.5)",
                            "0 0 5px rgba(253, 111, 0, 0.3)",
                        ],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                >
                    ie
                </motion.span>
                ws
            </motion.h2>

            {!reviewadded && <motion.button
                className="absolute top-0 ml-auto mr-2 hoverbtn w-fit  bg-[#FD6F00] text-white px-4 py-2 rounded-md shadow-md z-50"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "/api/auth/google")}
            >
                + Add Review
            </motion.button>}

            {/* Navigation buttons */}
            <NavigationButtons
                handlePrev={handlePrev}
                handleNext={handleNext}
                isAnimating={isAnimating}
                reviewsCount={reviews.length}
            />

            {/* Background elements */}
            <BackgroundElements />

            {/* Sliding Carousel */}
            <div className="w-full flex justify-center items-center h-[500px]" ref={carouselRef}>
                <div className="w-full flex justify-center items-center relative h-full">
                    <AnimatePresence initial={false} mode="popLayout">
                        {reviewadded || !user ? getVisibleReviews().map((review) => (
                            <ReviewCard
                                key={`${review.id || review.loopedIndex}-${review.position}`}
                                review={review}
                                cardPosition={review.position}
                                direction={direction}
                                isAnimating={isAnimating}
                                animateCenter={animateCenter}
                            />
                        ))
                            :
                            (
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
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <motion.button
                                                                key={star}
                                                                type="button"
                                                                className="text-2xl focus:outline-none"
                                                                custom={star}
                                                                variants={starVariants}
                                                                initial="hidden"
                                                                animate="visible"
                                                                whileHover={{
                                                                    scale: 1.2,
                                                                    transition: { duration: 0.2 }
                                                                }}
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={() => {
                                                                    // Select rating logic here
                                                                    const stars = document.querySelectorAll('.star-rating');
                                                                    stars.forEach((s, i) => {
                                                                        if (i < star) {
                                                                            s.classList.remove('text-gray-400');
                                                                            s.classList.add('text-[#FD6F00]');
                                                                            setStar(i + 1);
                                                                        } else {
                                                                            s.classList.remove('text-[#FD6F00]');
                                                                            s.classList.add('text-gray-400');
                                                                            setStar(i - 1);
                                                                        }
                                                                    });
                                                                    // You could store this in state if needed
                                                                }}
                                                            >
                                                                <span className="star-rating text-gray-400 hover:text-[#FD6F00] transition-colors">★</span>
                                                            </motion.button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </motion.header>

                                        <textarea
                                            required
                                            placeholder="Write your review here..."
                                            value={reviewbyuser}
                                            onChange={(e) => setReviewbyuser(e.target.value)}
                                            className="w-full h-28 p-3 rounded-lg bg-[#2A2A2A] text-white border border-[#FD6F00] focus:outline-none focus:ring-2 focus:ring-[#FD6F00] transition-all"
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
                    </AnimatePresence>

                    {/* Trail effect for card movement */}
                    <motion.div
                        className="absolute w-full h-full pointer-events-none"
                        animate={{
                            opacity: direction !== 0 ? [0, 0.3, 0] : 0,
                        }}
                        transition={{ duration: 0.8 }}
                    >
                        {direction !== 0 && (
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[5px] bg-[#FD6F00]"
                                initial={{
                                    scaleX: 0,
                                    rotate: direction > 0 ? -5 : 5,
                                    x: direction > 0 ? -100 : 100,
                                }}
                                animate={{
                                    scaleX: [0, 1, 0],
                                    x: direction > 0 ? [100, 0, -100] : [-100, 0, 100],
                                }}
                                transition={{ duration: 0.8 }}
                                style={{ filter: "blur(8px)", opacity: 0.6 }}
                            />
                        )}
                    </motion.div>
                </div>
            </div>
        </motion.section>
    )
}

export default Review
