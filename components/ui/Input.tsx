import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import "./ui.css";

type SharedProps = {
  label?: string;
  placeholder?: string;
};

type InputAsField = SharedProps &
  InputHTMLAttributes<HTMLInputElement> & {
    textarea?: false;
  };

type InputAsTextarea = SharedProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    textarea: true;
  };

type InputProps = InputAsField | InputAsTextarea;

export function Input(props: InputProps) {
  const { label, placeholder, textarea, ...rest } = props;

  return (
    <label className="field">
      {label ? <div className="field__label">{label}</div> : null}
      {textarea ? (
        <textarea
          className="field__control field__control--textarea"
          placeholder={placeholder}
          rows={3}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className="field__control"
          placeholder={placeholder}
          type={(rest as InputHTMLAttributes<HTMLInputElement>).type ?? "text"}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </label>
  );
}
