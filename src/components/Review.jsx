"use client"

import { AnimatePresence, motion, useAnimationControls } from "framer-motion"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"

const Review = ({ user }) => {
  const [reviews, setReviews] = useState([])
  const [startIndex, setStartIndex] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right, 0 for initial
  const [isAnimating, setIsAnimating] = useState(false) // Track animation state
  const visibleCount = 3
  const controls = useAnimationControls()
  const carouselRef = useRef(null)

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
    const review = e.target[0].value
    if (!review) return

    const res = await fetch("/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ review: review, name: user.name, email: user.email, picture: user.picture }),
    })

    if (res.ok) {
      alert("Review submitted successfully")
      fetchReviews()
    } else {
      alert("Failed to submit review")
    }
  }

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString)

    const formattedDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    const formattedTime = dateObj.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })

    return { formattedDate, formattedTime }
  }

  // Function to handle looping indexes
  const getLoopedIndex = (index) => {
    // If we have no reviews, return 0
    if (!reviews.length) return 0
    
    // Calculate the true index using modulo to wrap around
    // Add reviews.length to handle negative indexes first
    return (index + reviews.length) % reviews.length
  }

  // Get visible reviews with looping
  const getVisibleReviews = () => {
    if (!reviews.length) return []
    
    const result = []
    for (let i = 0; i < visibleCount; i++) {
      const loopedIndex = getLoopedIndex(startIndex + i)
      result.push({
        ...reviews[loopedIndex],
        loopedIndex // Add this to help with keying
      })
    }
    return result
  }

  const handleNext = () => {
    if (!isAnimating && reviews.length >= visibleCount) {
      setIsAnimating(true)
      setDirection(1) // Moving right
      setTimeout(() => {
        setStartIndex(getLoopedIndex(startIndex + 1))
        // Reset animation state after the transition is complete
        setTimeout(() => setIsAnimating(false), 600)
      }, 50)
    }
  }

  const handlePrev = () => {
    if (!isAnimating && reviews.length >= visibleCount) {
      setIsAnimating(true)
      setDirection(-1) // Moving left
      setTimeout(() => {
        setStartIndex(getLoopedIndex(startIndex - 1))
        // Reset animation state after the transition is complete
        setTimeout(() => setIsAnimating(false), 600)
      }, 50)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  // Glow effect animation
  const glowVariants = {
    initial: {
      opacity: 0.3,
      rotate: -40.71,
    },
    animate: {
      opacity: [0.3, 0.6, 0.3],
      rotate: [-40.71, -38, -40.71],
      transition: {
        opacity: {
          repeat: Number.POSITIVE_INFINITY,
          duration: 3,
          ease: "easeInOut",
        },
        rotate: {
          repeat: Number.POSITIVE_INFINITY,
          duration: 8,
          ease: "easeInOut",
        },
      },
    },
  }

  // Button hover animations
  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.9 },
  }

  // Card position and style variants based on position
  const getCardStyles = (index) => {
    // Center card
    if (index === 1) {
      return {
        scale: 1,
        y: 0,
        rotate: 0,
        filter: "blur(0px)",
        zIndex: 50,
        x: 0,
        height: "459px",
      }
    }
    // Left card
    else if (index === 0) {
      return {
        scale: 0.9,
        y: 20,
        rotate: -3.74,
        filter: "blur(1.5px)",
        zIndex: 10,
        x: -200,
        height: "391px",
      }
    }
    // Right card
    else {
      return {
        scale: 0.9,
        y: 20,
        rotate: 3.74,
        filter: "blur(1.5px)",
        zIndex: 10,
        x: 200,
        height: "391px",
      }
    }
  }

  return (
    <section
      className="w-full h-[100vh] py-12 flex flex-col gap-5 pointer-events-auto relative overflow-hidden"
      id="review"
    >
      <motion.h2
        className="text-3xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
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

      <motion.button
        className="absolute top-0 right-0"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => (window.location.href = "/api/auth/google")}
      >
        Login with Google
      </motion.button>

      {/* Buttons - always enabled in loop carousel except when animating */}
      <motion.button
        onClick={handlePrev}
        className="absolute -left-0 top-1/2 -translate-y-1/2 z-50"
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        disabled={isAnimating || reviews.length < visibleCount}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
          <motion.path
            fill={isAnimating || reviews.length < visibleCount ? "#FFFFFF" : "#FD6F00"}
            d="m9.55 12l7.35 7.35q.375.375.363.875t-.388.875t-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675t-.15-.75t.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388t.375.875t-.375.875z"
            animate={
              isAnimating || reviews.length < visibleCount
                ? {}
                : {
                    fill: ["#FD6F00", "#FF9F4A", "#FD6F00"],
                  }
            }
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </svg>
      </motion.button>
      <motion.button
        onClick={handleNext}
        className="absolute -right-0 top-1/2 -translate-y-1/2 z-50"
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        disabled={isAnimating || reviews.length < visibleCount}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
          <motion.path
            fill={isAnimating || reviews.length < visibleCount ? "#ffffff" : "#FD6F00"}
            d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887t.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75t-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1t-.375-.888t.375-.887z"
            animate={
              isAnimating || reviews.length < visibleCount
                ? {}
                : {
                    fill: ["#FD6F00", "#FF9F4A", "#FD6F00"],
                  }
            }
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </svg>
      </motion.button>

      {/* Background elements */}
      <motion.div
        className="absolute w-full h-full top-0 left-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-[#FD6F00]"
          initial={{ opacity: 0.03 }}
          animate={{
            opacity: [0.03, 0.05, 0.03],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ filter: "blur(100px)" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] rounded-full bg-[#FD6F00]"
          initial={{ opacity: 0.02 }}
          animate={{
            opacity: [0.02, 0.04, 0.02],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
          style={{ filter: "blur(120px)" }}
        />
      </motion.div>

      {/* Sliding Carousels */}
      <motion.div
        className="w-full flex justify-center items-center h-[500px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        ref={carouselRef}
      >
        <div className="w-full flex justify-center items-center relative h-full">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            {getVisibleReviews().map((review, index) => {
              const { formattedDate, formattedTime } = formatDate(review.date)
              const cardStyle = getCardStyles(index)
              const cardPosition = index === 0 ? "left" : index === 1 ? "center" : "right"
              const isCenter = index === 1
              
              // For unique keys, ensure we have a truly unique key for each card position
              // by combining the looped index with the position
              const cardKey = `${review.id || review.loopedIndex}-${cardPosition}`

              return (
                <motion.div
                  key={cardKey}
                  custom={direction}
                  initial={{
                    ...cardStyle,
                    x: direction > 0 ? 1000 : direction < 0 ? -1000 : cardStyle.x,
                    opacity: direction === 0 ? 0 : 1,
                  }}
                  animate={{
                    ...cardStyle,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 200, // Smoother movement
                      damping: 25,
                      mass: 1,
                      velocity: 2,
                    },
                  }}
                  exit={{
                    x: direction > 0 ? -1000 : 1000,
                    opacity: 0,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 30,
                    },
                  }}
                  whileHover={
                    isCenter
                      ? {
                          scale: 1.05,
                          y: -10,
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          },
                        }
                      : {}
                  }
                  whileTap={
                    isCenter
                      ? {
                          scale: 0.98,
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          },
                        }
                      : {}
                  }
                  className={`px-4 py-7 flex flex-col justify-between w-[398.06px] rounded-2xl border-2 border-[#333333] bg-[#0E1016] absolute`}
                  style={{
                    transformOrigin: index === 0 ? "right bottom" : index === 2 ? "left bottom" : "center",
                    height: cardStyle.height,
                  }}
                  data-card-position={cardPosition}
                >
                  <motion.div
                    className="absolute -top-10 left-[40%] w-[69px] h-[545px] bg-[#d9d9d930]"
                    variants={glowVariants}
                    initial="initial"
                    animate="animate"
                    style={{
                      filter: "blur(50px)",
                      background: "linear-gradient(180deg, rgba(253,111,0,0.2) 0%, rgba(217,217,217,0.1) 100%)",
                    }}
                  />

                  {/* Card content with animations only for center card or initial load */}
                  <motion.div
                    initial={{ opacity: isCenter || direction === 0 ? 0 : 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: isCenter ? 0.2 : 0, duration: isCenter ? 0.3 : 0 }}
                  >
                    <motion.header
                      className="flex items-center gap-4"
                      initial={isCenter && (direction === 0 || !isAnimating) ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: isCenter && (direction === 0 || !isAnimating) ? 0.2 : 0,
                        duration: isCenter ? 0.3 : 0
                      }}
                    >
                      <motion.div
                        initial={isCenter && (direction === 0 || !isAnimating) ? { scale: 0, rotate: -30 } : { scale: 1, rotate: 0 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: isCenter && (direction === 0 || !isAnimating) ? 0.3 : 0,
                        }}
                      >
                        <Image
                          src={review.picture || "/placeholder.svg"}
                          alt={review.name}
                          width={100}
                          height={100}
                          className="rounded-full w-[3.25rem] h-[3.25rem] border-2 border-[#333333]"
                        />
                      </motion.div>
                      <div>
                        <div className="flex gap-2 items-center">
                          <motion.h2
                            className="font-semibold leading-9 text-2xl"
                            initial={isCenter && (direction === 0 || !isAnimating) ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              delay: isCenter && (direction === 0 || !isAnimating) ? 0.4 : 0,
                              duration: isCenter ? 0.3 : 0
                            }}
                          >
                            {review.name}
                          </motion.h2>
                          <motion.img
                            src="/verify.svg"
                            alt="verify"
                            initial={isCenter && (direction === 0 || !isAnimating) ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: isCenter && (direction === 0 || !isAnimating) ? 0.5 : 0,
                              type: "spring",
                              stiffness: 300,
                              damping: 10,
                            }}
                          />
                        </div>
                        <div className="flex gap-1 justify-center items-center w-fit">
                          {[...Array(Number.parseInt(review.star || 0))].map((_, i) => (
                            <motion.img
                              src="/star.svg"
                              key={i}
                              alt="star"
                              initial={isCenter && (direction === 0 || !isAnimating) ? { opacity: 0, scale: 0, rotate: -30 } : { opacity: 1, scale: 1, rotate: 0 }}
                              animate={{ opacity: 1, scale: 1, rotate: 0 }}
                              transition={{
                                delay: isCenter && (direction === 0 || !isAnimating) ? 0.6 + i * 0.1 : 0,
                                type: "spring",
                                stiffness: 300,
                                damping: 10,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.header>

                    <motion.div
                      className="text-white font-normal leading-7 tracking-wider mt-4"
                      initial={isCenter && (direction === 0 || !isAnimating) ? { opacity: 0 } : { opacity: 1 }}
                      animate={{ opacity: 1 }}
                      transition={{ 
                        delay: isCenter && (direction === 0 || !isAnimating) ? 0.7 : 0,
                        duration: isCenter ? 0.3 : 0
                      }}
                    >
                      {review.review}
                    </motion.div>

                    <motion.footer
                      className="text-[#FD6F00] mt-4"
                      initial={isCenter && (direction === 0 || !isAnimating) ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: isCenter && (direction === 0 || !isAnimating) ? 0.8 : 0,
                        duration: isCenter ? 0.3 : 0
                      }}
                    >
                      Posted on {formattedDate} · {formattedTime}
                    </motion.footer>
                  </motion.div>

                  {isCenter && (
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 mx-auto w-[80%] h-[10px] bg-[#FD6F00]"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 0.6, scaleX: 1 }}
                      transition={{ delay: direction === 0 ? 0.9 : 0.3, duration: 0.5 }}
                      style={{
                        borderRadius: "10px",
                        filter: "blur(8px)",
                        transformOrigin: "center",
                      }}
                    />
                  )}

                  {/* Particle effects for center card */}
                  {isCenter && (
                    <>
                      <motion.div
                        className="absolute -right-4 top-1/4 w-2 h-2 rounded-full bg-[#FD6F00]"
                        animate={{
                          x: [0, 10, 0],
                          y: [0, -10, 0],
                          opacity: [0.7, 0.3, 0.7],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.div
                        className="absolute -left-4 top-2/3 w-3 h-3 rounded-full bg-[#FD6F00]"
                        animate={{
                          x: [0, -15, 0],
                          y: [0, 15, 0],
                          opacity: [0.5, 0.2, 0.5],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: 1,
                        }}
                      />
                    </>
                  )}
                </motion.div>
              )
            })}
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
      </motion.div>
    </section>
  )
}

export default Review