import clsx from "clsx";
import { useFormContext } from "react-hook-form";

type InputProps = {
  type: "text" | "email" | "password" | "textarea";
  name: string;
  id: string;
  placeholder: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  rows?: number;
  className?: string;
  formControllClassName?: string;
  error?: string | string[] | null;
};

export default function Input({
  type,
  name,
  id,
  placeholder,
  value,
  defaultValue,
  disabled = false,
  onChange,
  rows,
  className = "",
  formControllClassName = "",
  error,
}: InputProps) {
  const { register } = useFormContext();

  return (
    <div className={clsx("relative flex flex-col", formControllClassName)}>
      {type === "textarea" ? (
        <textarea
          // name={name}
          id={id}
          placeholder={placeholder}
          rows={rows}
          value={value}
          // onChange={onChange}
          disabled={disabled}
          defaultValue={defaultValue}
          {...register(name)}
          className={clsx(
            "w-full resize-none border-b border-b-gray py-3 text-body-medium text-black transition duration-200 placeholder:text-body-medium placeholder:text-dark-gray focus:border-b-black focus:outline-transparent",
            className,
          )}
        />
      ) : (
        <input
          type={type}
          // name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          defaultValue={defaultValue}
          // onChange={onChange}
          {...register(name)}
          className={clsx(
            "w-full border-b border-b-gray pb-3 text-body-medium text-black transition duration-200 placeholder:text-body-medium placeholder:text-dark-gray focus:border-b-black focus:outline-transparent",
            className,
          )}
        />
      )}
      {error && (
        <span className="absolute -bottom-6 left-0 mt-1 text-sm text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}
