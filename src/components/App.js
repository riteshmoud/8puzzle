import React, { useEffect, useState } from 'react'
import Board from './Board'
import '../css/App.css'
import {motion} from 'framer-motion'

const App = () => {
    const [boardObj] = useState(new Board())
    const [board,setBoard] = useState([])
    const [completed,setCompleted] = useState(false)

    // framer motion variants
    const boardVariant = {
        hidden: {
            opacity: 0.2,
            x: '-100vw'
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring', 
                bounce: 0.5, 
                duration: 0.8,
                when: 'beforeChildren',
                staggerChildren: 0.2
            }
        }
    }

    const numBoxVariant = {
        hidden: {
            opacity: 0.2,
            scale: 0
        },
        show: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring', 
                bounce: 0.6
            }
        }
    }

    const buttonVariant = {
        hidden: {
            y: '100vh',
            opacity: 0.2
        },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring', 
                bounce: 0.5, 
                duration: 0.8,
            }
        }
    }

    useEffect(()=>{
        const matrix = boardObj.initializeBoard();
        setBoard(matrix)
    },[boardObj])

    useEffect(()=>{
        console.log(board);
        if(board.length !== 0 && boardObj.won()){
            setTimeout(()=>{
                setCompleted(true)
            },250)
        }
    },[board,boardObj])

    const renderNewGame = () => {
        window.location.reload()
    }
    const resetGame = () => {
        console.log(boardObj.initialBoard);
        setBoard(boardObj.initialBoard)
        boardObj.resetBoard()
    }

    const onCellClick = (e) => {
        const mat = boardObj.moveTile(e)
        setBoard([...mat])
    }
    
    const getBoard = () => {
        return board.map((row,r)=>{
                return row.map((val,c)=>{
                    if(val === -1){
                        return <motion.div className='num-box empty-box' id={`(${r},${c})`} onClick={onCellClick}
                            variants={numBoxVariant}
                        ></motion.div> 
                    }
                    return <motion.div className='num-box' id={`(${r},${c})`} onClick={onCellClick}
                        variants={numBoxVariant}
                    >{val}</motion.div>
                })
            })
    }

    return (
        <div className='flex h-screen border-[4px] border-solid border-[#5c16c5] flex-col justify-center items-center bg-[#1f1f23] p-4'>
            {
                completed ? (
                    <div className='flex text-[#F5DEB3] justify-center items-center py-4 px-12 rounded-xl flex-col'>
                        <i class="fa-solid fa-trophy text-[4rem] m-4 text-green-500 fa-bounce"></i>
                        <h1 className='text-4xl'>🎉 You have made it.. 🎉</h1>
                    </div>
                ) : (
                    board.length !== 0 && (
                        <motion.div className='board border-[4px] border-solid border-yellow-500 w-full md:w-1/2'
                            variants={boardVariant}
                            initial='hidden'
                            animate='show'
                        >
                            {getBoard()}
                        </motion.div>
                    )
                )
            }
            <div className='flex justify-center items-center p-8'>
                <motion.button className='text-white text-xl px-4 py-2 bg-[#264f5f] m-4 rounded-lg play-btn'
                    onClick={renderNewGame}
                    variants={buttonVariant}
                    initial='hidden'
                    animate='show'
                    whileHover={{
                        x: 5,
                        y: -5,
                        boxShadow: '-5px 5px yellow'
                    }}
                >{!completed ? 'New Game' : 'Play Again'}</motion.button>
                {
                    !completed ? (
                        <motion.button className='text-white text-xl px-4 py-2 bg-red-500 m-4 rounded-lg reset-btn'
                            onClick={resetGame}
                            variants={buttonVariant}
                            initial='hidden'
                            animate='show'
                            whileHover={{
                                x: 5,
                                y: -5,
                                boxShadow: '-5px 5px yellow'
                            }}
                        >Reset</motion.button>
                    ) : null
                }
                
            </div>
        </div>
    )
}

export default App