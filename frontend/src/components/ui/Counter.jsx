const Counter = ({ index }) => {
  return <>
    <h1 className="ml-4 w-[25px] text-center rounded-full bg-orange-400">
      { index + 1 }
    </h1>
  </>
}

export default Counter