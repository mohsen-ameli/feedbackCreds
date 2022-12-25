import { AnimatePresence, motion } from "framer-motion";

const Card = ({isOpen, className, animate = { height: isOpen ? 175 : 100 }, ...props}) => {
  return <>
    <AnimatePresence>
      <motion.div
        className={`my-4 mb-8 relative w-full flex justify-evenly
        items-center rounded-xl text-white shadow-2xl shadow-sky-900 bg-blue-400 ` + className}
        animate={animate}
        exit={{ height: 10 }}
        transition={{ duration: 0.25 }}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  </>
}
 
export default Card;