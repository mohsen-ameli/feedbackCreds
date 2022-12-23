const Container = props => {
  return <>
    <div className={"max-w-2xl mx-auto mt-40 mb-16 px-8 " + props.className}>
      {props.children}
    </div>
  </>
}
 
export default Container;