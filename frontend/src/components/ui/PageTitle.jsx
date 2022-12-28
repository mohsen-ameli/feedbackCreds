const PageTitle = ({ text, ...props }) => {
  return (
    <h1
      className={"mb-4 text-3xl font-semibold text-center " + props.className}
    >
      {text}
    </h1>
  )
}

export default PageTitle
