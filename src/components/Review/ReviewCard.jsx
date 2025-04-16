"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useMemo } from "react"
import { formatDate, glowVariants, headerVariants, avatarVariants, nameVariants, verifyVariants, starVariants, reviewTextVariants, footerVariants, glowBarVariants, getCardStyles, getCardVariants } from "../functions"

const ReviewCard = ({ review, direction, cardPosition }) => {
  const { formattedDate, formattedTime } = formatDate(review.date)

  const cardStyle = useMemo(() => getCardStyles(cardPosition), [cardPosition])
  const cardVariants = useMemo(() => getCardVariants(cardStyle, cardPosition), [cardStyle, cardPosition])

  return (
    <motion.div
      custom={direction}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      whileTap="tap"
      className={`px-4 py-7 flex flex-col justify-between min-w-[30%] md:w-[398.06px] rounded-2xl border-2 border-[#333333] bg-[#0E1016] absolute`}
      style={{
        transformOrigin: cardPosition === "left" ? "right bottom" : cardPosition === "right" ? "left bottom" : "center",
        height: cardStyle.height,
        filter: cardPosition === "center" ? "blur(0px)" : "blur(1.5px)"
      }}
    >
      <motion.div
        className="absolute rotate-[320deg] blur-[27px] -top-10 left-[40%] w-[69px] h-[300px] md:h-[545px] bg-[#d9d9d930]"
        style={{
          background: "linear-gradient(180deg, rgba(253,111,0,0.1) 0%, rgba(217,217,217,0.2) 100%)",
        }}
      />

      {/* Card content with animations for the center card */}
      <motion.div key={review.transitionId} className="flex flex-col h-full justify-between">
        <motion.header
          className="flex items-center gap-4"
          variants={headerVariants}
          initial={"hidden"}
          animate="visible"
        >

          <motion.div
            variants={avatarVariants}
            initial={"hidden"}
            animate="visible" >
            <Image
              src={review.picture || "/placeholder.svg"}
              alt={review.name}
              width={100}
              height={100}
              className="rounded-full w-[3.25rem] h-[3.25rem] border-2 border-[#333333]"
            />
          </motion.div>

          <motion.div > {/* Center card name and star rating */}
            <div className="flex gap-2 items-center">
              <motion.h2
                className="font-semibold leading-9 text-2xl"
                variants={nameVariants}
                initial={"hidden"}
                animate="visible"
              >
                {review.name}
              </motion.h2>
              <motion.img
                src="/verify.svg"
                alt="Verified User"
                variants={verifyVariants}
                initial={"hidden"}
                animate="visible"
              />
            </div>

            <motion.div className="flex gap-1 justify-center items-center w-fit">
              {[...Array(Number.parseInt(review.star || 0))].map((_, i) => (
                <motion.img
                  src="/star.svg"
                  key={i}
                  alt={"star" + i}
                  custom={i}
                  variants={starVariants}
                  initial={"hidden"}
                  animate="visible"
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.header>

        <motion.div
          className="text-white font-normal leading-7 tracking-wider mt-4"
          variants={reviewTextVariants}
          initial={"hidden"}
          animate="visible"
        >
          {review.review}
        </motion.div>

        <motion.footer
          className="text-[#FD6F00] mt-4"
          variants={footerVariants}
          initial={"hidden"}
          animate="visible"
        >
          Posted on {formattedDate} · {formattedTime}
        </motion.footer>
      </motion.div>

      {cardPosition === "center" && (
        <motion.div
          className="rounded-lg blur-[8px] origin-center absolute -bottom-2 left-0 right-0 mx-auto w-[80%] h-[10px] bg-[#FD6F00]"
          variants={glowBarVariants}
          initial={"hidden"}
          animate="visible" />
      )}

      {/* Particle effects for center card */}
      {cardPosition === "center" && (
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
}

export default ReviewCard