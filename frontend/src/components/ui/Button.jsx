/**
 * General button component
 */
const Button = ({ text, className, onClick, disabled }) => {
  return <>
    <button
      className={`py-2 px-6 text-bold rounded-xl border-2
               border-[#3A68E8] bg-zinc-100 hover:bg-[#3A68E8]
               text-black hover:text-white hover:ease-in-out duration-75 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  </>
}

export default Button