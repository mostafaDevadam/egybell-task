
type Props = {
    name: string
    value: any
}

const InputHidden = ({name, value}: Props) => <input type="hidden" name={name} value={value} />

export default InputHidden