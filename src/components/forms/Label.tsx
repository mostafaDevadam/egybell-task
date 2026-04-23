"use client"


type Props = {
    htmlFor: string
    title: string
    className?: string

}
const Label = ({htmlFor, title, className}: Props) => {
  return (
    <label htmlFor={htmlFor} className={className}>{title}</label>
  )
}

export default Label