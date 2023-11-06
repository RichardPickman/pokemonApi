interface Props {
    onChange: (input: string) => void;
    value: string;
}

const Input = ({ value, onChange }: Props) => (
    <input
        onChange={(event) => onChange(event.target.value.trim().toLowerCase())}
        value={value}
    />
);
export default Input;
