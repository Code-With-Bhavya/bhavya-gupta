"use client"

import { AnimatePresence, motion, useAnimationControls } from "framer-motion"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"

const Review = ({ user }) => {
  const [reviews, setReviews] = useState([])
  const [startIndex, setStartIndex] = useState(0)
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

  const handleNext = () => {
    if (startIndex + 1 < reviews.length) {
      controls.start("slideLeft")
      setTimeout(() => {
        setStartIndex(startIndex + 1)
      }, 300)
    }
  }

  const handlePrev = () => {
    if (startIndex - 1 >= 0) {
      controls.start("slideRight")
      setTimeout(() => {
        setStartIndex(startIndex - 1)
      }, 300)
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
    slideLeft: {
      x: -100,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] },
    },
    slideRight: {
      x: 100,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] },
    },
  }

  const cardVariants = {
    center: (index) => ({
      scale: index === 1 ? 1 : 0.9,
      y: index === 1 ? 0 : 20,
      rotate: index === 0 ? -3.74 : index === 2 ? 3.74 : 0,
      filter: index === 1 ? "blur(0px)" : "blur(2px)",
      zIndex: index === 1 ? 50 : 10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.5,
      },
    }),
    hover: (index) => ({
      scale: index === 1 ? 1.05 : 0.95,
      y: index === 1 ? -10 : 15,
      rotate: index === 0 ? -5 : index === 2 ? 5 : 0,
      filter: index === 1 ? "blur(0px)" : "blur(1.5px)",
      boxShadow: index === 1 ? "0px 10px 30px rgba(253, 111, 0, 0.3)" : "none",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    }),
    tap: {
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    initial: (index) => ({
      opacity: 0,
      scale: index === 1 ? 0.5 : 0.8,
      y: index === 1 ? 50 : 30,
      rotate: index === 0 ? -8 : index === 2 ? 8 : 0,
    }),
    animate: (index) => ({
      opacity: 1,
      scale: index === 1 ? 1 : 0.9,
      y: index === 1 ? 0 : 20,
      rotate: index === 0 ? -3.74 : index === 2 ? 3.74 : 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: index * 0.1,
      },
    }),
    exit: (index) => ({
      opacity: 0,
      scale: 0.8,
      y: 30,
      rotate: index === 0 ? -8 : index === 2 ? 8 : 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    }),
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

      {/* Buttons */}
      <motion.button
        onClick={handlePrev}
        className="absolute -left-0 top-1/2 -translate-y-1/2 z-50"
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        disabled={startIndex === 0}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
          <motion.path
            fill={startIndex === 0 ? "#FFFFFF" : "#FD6F00"}
            d="m9.55 12l7.35 7.35q.375.375.363.875t-.388.875t-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675t-.15-.75t.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388t.375.875t-.375.875z"
            animate={
              startIndex === 0
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
        disabled={startIndex === reviews.length - 1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
          <motion.path
            fill={startIndex === reviews.length - 1 ? "#ffffff" : "#FD6F00"}
            d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887t.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75t-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1t-.375-.888t.375-.887z"
            animate={
              startIndex === reviews.length - 1
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
        <AnimatePresence mode="wait">
          <motion.ul
            key={startIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full flex justify-center items-end relative"
          >
            {reviews.slice(startIndex, startIndex + visibleCount)?.map((review, index) => {
              const { formattedDate, formattedTime } = formatDate(review.date)
              return (
                <motion.li
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileHover={index === 1 ? "hover" : ""}
                  whileTap={index === 1 ? "tap" : ""}
                  className={`px-4 py-7 flex flex-col justify-between w-[398.06px] rounded-2xl border-2 border-[#333333] bg-[#0E1016] relative ${
                    index === 0
                      ? "h-[391px] blur-[1.5px] absolute left-14"
                      : index === 2
                        ? "h-[391px] blur-[1.5px] absolute right-14"
                        : "h-[459px] z-50"
                  }`}
                  style={{
                    transformOrigin: index === 0 ? "right bottom" : index === 2 ? "left bottom" : "center",
                  }}
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

                  <motion.header
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.3 + index * 0.1,
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
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          {review.name}
                        </motion.h2>
                        <motion.img
                          src="/verify.svg"
                          alt="verify"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: 0.5 + index * 0.1,
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
                            initial={{ opacity: 0, scale: 0, rotate: -30 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{
                              delay: 0.6 + i * 0.1 + index * 0.05,
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
                    className="text-white font-normal leading-7 tracking-wider"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    {review.review}
                  </motion.div>

                  <motion.footer
                    className="text-[#FD6F00]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    Posted on {formattedDate} · {formattedTime}
                  </motion.footer>

                  {index === 1 && (
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 mx-auto w-[80%] h-[10px] bg-[#FD6F00]"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 0.6, scaleX: 1 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                      style={{
                        borderRadius: "10px",
                        filter: "blur(8px)",
                        transformOrigin: "center",
                      }}
                    />
                  )}
                </motion.li>
              )
            })}
          </motion.ul>
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

export default Review
