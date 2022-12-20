import { motion } from "framer-motion"

/**
 * General button component
 */
const variant = {
  scaleX: [1, 1.1, 1, 1.1, 1],
  scaleY: [1, 0.9, 1, 0.9, 1],
  transition: {
    type: "spring",
    repeat: Infinity,
    repeatType: "loop"
  }
}

const Button = ({ text, className, onClick, disabled }) => {
  return <>
    <motion.div whileHover={disabled && variant}>
      <button
        className={`py-2 px-6 text-bold rounded-xl border-2
                  bg-zinc-100 text-black hover:ease-in-out duration-75 ` +
                    (!disabled ? `hover:text-white hover:bg-[#3A68E8] border-[#3A68E8] ` : `cursor-not-allowed opacity-75 border-red-500 hover:outline-red-500 `) +
                    className}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </motion.div>
  </>
}

export default Button