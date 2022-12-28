const Counter = ({ index }) => {
  return (
    <>
      <div className="absolute left-3 w-[25px] h-[25px] text-center rounded-full bg-orange-400">
        {index + 1}
      </div>
      <div className="pr-5"></div>
    </>
  )
}

export default Counter
