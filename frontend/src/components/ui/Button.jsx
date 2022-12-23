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

const Button = ({ className, type = "button", btnType, ...props }) => {
  return <>
    <motion.div whileHover={props.disabled && variant}>
      <button
        className={`py-2 px-5 text-bold rounded-xl border-2 bg-zinc-100 text-black hover:ease-in-out duration-75 ` +
                    (props.disabled ? `cursor-not-allowed opacity-75 border-red-500 hover:outline-red-500 ` : `hover:text-white hover:bg-[#3A68E8] border-[#3A68E8] `) +
                    className}
        type={type}
        {...props}
      >
        {props.text}
      </button>
    </motion.div>
  </>
}

const DangerButton = ({ className, type = "button", btnType, ...props }) => {
  return <>
    <motion.div whileHover={props.disabled && variant}>
      <button
        className={`py-2 px-6 text-bold rounded-xl border-2 bg-zinc-100 text-black hover:ease-in-out duration-75 ` +
                    (props.disabled ? `cursor-not-allowed opacity-75 border-red-500 hover:outline-red-500 ` : `hover:text-white hover:bg-[#de4c23] border-[#e83a3a] `) +
                    className}
        type={type}
        {...props}
      >
        {props.text}
      </button>
    </motion.div>
  </>
}

export {Button, DangerButton}