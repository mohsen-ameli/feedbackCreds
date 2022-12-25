import { motion } from "framer-motion"

// Wrapper for the question cards, for a little spring animation
const CardSpring = ({className, ...props}) => {
  return <motion.div
    className={`p-4 flex flex-col items-center ` + className}
    initial={{ scale: 0.25 }}
    animate={{ scale: 1 }}
    transition={{ type:"spring", stiffness: 220, damping: 20 }}
  >
    {props.children}
  </motion.div>
}
 
export default CardSpring;