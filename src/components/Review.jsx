"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import ReviewCard from "./Review/ReviewCard"
import NavigationButtons from "./Review/NavigationButtons"
import BackgroundElements from "./Review/BackgroundElements"
import { sectionVariants, titleVariants } from "./functions"
import Form from "./Review/Form"
import { useIsMobile } from "./ismobile"

const Review = ({ user }) => {
    const [reviews, setReviews] = useState([])
    const [startIndex, setStartIndex] = useState(0)
    const [direction, setDirection] = useState(0) // -1 for left, 1 for right, 0 for initial
    const [isAnimating, setIsAnimating] = useState(false) // Track animation state
    const [reviewadded, setReviewadded] = useState(false);
    const isMobile = useIsMobile();
    const visibleCount = isMobile ? 1 : 3;

    // fetch reviews from the server
    useEffect(() => {
        fetchReviews()
    }, [])

    const fetchReviews = async () => {
        const res = await fetch("/api/review")
        const data = await res.json()
        setReviews(data)
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
        const adjustedVisibleCount = Math.min(visibleCount, reviews.length)
        for (let i = 0; i < adjustedVisibleCount; i++) {
            const loopedIndex = getLoopedIndex(startIndex + i)
            result.push({
                ...reviews[loopedIndex],
                loopedIndex,
                position: visibleCount === 3 ? (i === 0 ? "left" : i === 1 ? "center" : "right") : "center", // Add position property
                transitionId: startIndex + i, // Add a unique transition ID
            })
        }
        return result
    }

    // Update the handleNext function to ensure proper animation timing
    const handleNext = () => {
        if (!isAnimating) {
            setIsAnimating(true)
            setDirection(1) // Moving right
            setStartIndex((prev) => getLoopedIndex(prev + 1))
            setTimeout(() => setIsAnimating(false), 600)

        }
    }

    const handlePrev = () => {
        if (!isAnimating) {
            setIsAnimating(true)
            setDirection(-1)
            setStartIndex((prev) => getLoopedIndex(prev - 1))
            setTimeout(() => setIsAnimating(false), 600)
        }
    }

    return (
        <motion.section
            className="w-full h-[100vh] py-12 flex flex-col gap-5 pointer-events-auto relative overflow-hidden"
            id="review"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            transition="transition"
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
                reviewsCount={reviews.length}
            />

            {/* Background elements */}
            <BackgroundElements />

            {/* Sliding Carousel */}
            <div className="w-full flex justify-center items-center h-[500px]">
                <div className="w-full flex justify-center items-center relative h-full">
                    <AnimatePresence mode="popLayout">
                        {reviewadded || !user ? getVisibleReviews().map((review) => (
                            <ReviewCard
                                key={`${review._id} `}
                                review={review}
                                direction={direction}
                                cardPosition={review.position}
                            />
                        ))
                            : <Form user={user} setReviewadded={setReviewadded} fetchReviews={fetchReviews} />
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
                                className="blur-xl opacity-[0.6] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[5px] bg-[#FD6F00]"
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
                            />
                        )}
                    </motion.div>
                </div>
            </div>
        </motion.section>
    )
}

export default Review
