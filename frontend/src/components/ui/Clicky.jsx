import { motion } from "framer-motion"

const Clicky = (props) => {
  return (
    <motion.button
      whileHover={{ scale: 1.17 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 500, damping: 13 }}
      className={"cursor-pointer " + props.className}
      onClick={props.onClick}
    >
      {props.children}
    </motion.button>
  )
}

export default Clicky
