import "./FormInput.css"

interface FormInputProps {
  type: string;
  value?: string;
  placeholder: string;
  width?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  extraClass?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ type, extraClass, placeholder, onChange, value, width }) => {
  return (
    <input type={type} className={`${extraClass}`} style={{width}} value={value} placeholder={placeholder} onChange={onChange} />
  );
}
