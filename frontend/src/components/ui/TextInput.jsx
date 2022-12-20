import { forwardRef } from "react";

/**
 * Input text component
 */
const Input = forwardRef(({className, valid = true, placeholder, onChange}, ref) => {
  return <>
    <input
      className={`appearance-none w-full h-[30px] py-6 pr-8 pl-3 placeholder:text-left rounded-xl
                  outline-double outline-2 outline-gray-200 text-black
                  focus:ease-linear duration-75 ` + 
                  (valid ? "focus:outline-[#3A68E8] " : "focus:outline-red-500 ") +
                  className}
      type="text"
      ref={ref}
      placeholder={placeholder}
      onChange={onChange}
    />
  </>
})
 
export default Input;