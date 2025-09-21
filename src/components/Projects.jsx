import React from 'react'
import { motion } from 'framer-motion'
import LeftProject from './LeftSideProject'
import RightProject from './RightSideProject'

const Projects = () => {

    const projectsData = [
        {
            title: 'Functionable School Website',
            description: 'A modern, sleek , parent-friendly school website with functionable Admin Panel and Database integration, providing a seamless experience for parents and students.',
            tags: ['Next.js', 'Tailwind', 'MongoDB'],
            imageUrl: '/ss.png',
            projectUrl: 'https://sainikschool820.vercel.app/'
        },
        {
            title: 'Neuraseek AI',
            description: 'NeuraSeek AI is a smart platform that helps users quickly find the best tools for their needs. With a bold, modern interface, it lets users search directly or describe their task to get AI-powered recommendations. 🚀✨',
            tags: ['Next.js', 'Flask', 'Python', 'Framer'],
            imageUrl: '/neura.png',
            projectUrl: 'https://neuraseekai.vercel.app/'
        },
        {
            title: 'Guess The Drawing',
            description: '"Guess the Drawing" is a fun game where players sketch while others guess in real time. It features multiplayer mode, custom word lists, and leaderboards. With smooth animations and an interactive canvas, it makes drawing and guessing exciting! 🎨✨',
            tags: ['Next.js', 'Socket.io', 'Python', 'Framer'],
            imageUrl: '/Guesstd.png',
            projectUrl: 'https://guess-drawing.vercel.app/'
        },
        {
            title: 'EduCollab',
            description: '"EduCollab" is a collaborative platform for students and educators to share PDFs, exchange ideas, and work together. It offers real-time collaboration, study groups, and interactive discussions. Future updates will include live sessions, AI study assistants, and task management.',
            tags: ['React', 'Socket.io', 'Node.js', 'Tailwind'],
            imageUrl: '/Eduproject.png',
            projectUrl: 'https://educollab.vercel.app/'
        },
        {
            title: 'Chess Master YT',
            description: '"Chess Master YT" is a sleek and responsive website for a YouTube chess content creator. It showcases videos, strategies, and updates for chess enthusiasts. Built for an engaging user experience with smooth UI and interactive elements. ♟️🔥',
            tags: ['React', 'Tailwind', 'Framer', 'Netlify'],
            imageUrl: '/chessproject.png',
            projectUrl: 'https://chessmaster492.netlify.app/'
        },
        {
            title: 'Pong Game',
            description: '"Pong Game" is a classic arcade game with a modern twist. It features a single-player mode, multiplayer mode, and customizable settings. With smooth animations and responsive design, it offers an engaging gaming experience! 🏓🎮',
            tags: ['Vanilla JS', 'Html', 'CSS'],
            imageUrl: '/pong.png',
            projectUrl: 'https://bgpong.netlify.app/'
        },
        {
            title: '2048 ',
            description: '"2048" is a popular number puzzle game with a minimalist design. It features swipe controls, multiple themes, and a high score leaderboard. With smooth animations and responsive layout, it offers an addictive gaming experience! 🎲🔢',
            tags: ['Vanilla JS', 'HTML', 'CSS', 'Netlify'],
            imageUrl: '/2048.png',
            projectUrl: 'https://super2048.netlify.app/'
        },
        {
            title: 'Snake Game',
            description: '"Snake Game" is a classic arcade game with a modern twist. It features multiple levels, power-ups, and customizable settings. With smooth animations and responsive design, it offers an engaging gaming experience! 🐍🎮',
            tags: ['Vanilla JS', 'HTML', 'CSS', 'Netlify'],
            imageUrl: '/snake.png',
            projectUrl: 'https://mysnake-game-js.netlify.app/'
        }
    ];
    

    return (
        <motion.section
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='w-full flex flex-col gap-5 pointer-events-auto overflow-y-hidden'
            id='projects'
        >
            <h2 className='text-3xl'>P<span className='text-[#FD6F00]'>ro</span>jects</h2>
            <ul>
                {projectsData.map((project, index) => (
                    index % 2 === 0 ? (
                        <LeftProject key={index} project={project} />
                    ) : (
                        <RightProject key={index} project={project} />
                    )
                ))}
            </ul>
        </motion.section>
    )
}

export default Projects
