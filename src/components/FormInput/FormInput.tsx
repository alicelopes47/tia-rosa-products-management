import "./FormInput.css"

interface FormInputProps {
  type: string;
  value?: string;
  placeholder: string;
  width?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput: React.FC<FormInputProps> = ({ type, placeholder, onChange, value, width }) => {
  return (
    <input type={type} style={{width}} value={value} placeholder={placeholder} onChange={onChange} />
  );
}
