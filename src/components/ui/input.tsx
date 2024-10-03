
type InputProps = {
  type: "text" | "email" | "textarea";
  name: string;
  id: string;
  placeholder: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  rows?: number;
  className?: string;
  error?: string; 
};

export default function Input({
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
  rows,
  className = "",
  error,
}: InputProps) {
  return (
    <div className="flex flex-col">
      {type === "textarea" ? (
        <textarea
          name={name}
          id={id}
          placeholder={placeholder}
          rows={rows}
          value={value}
          onChange={onChange}
          className={`w-full resize-none border-b border-b-dark-gray py-3 text-body-medium text-black transition duration-200 placeholder:text-body-medium placeholder:text-dark-gray focus:border-b-black focus:outline-transparent ${className}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full border-b border-b-dark-gray pb-3 text-body-medium text-black transition duration-200 placeholder:text-body-medium placeholder:text-dark-gray focus:border-b-black focus:outline-transparent ${className}`}
        />
      )}
      {error && <span className="mt-1 text-sm text-red-500">{error}</span>}{" "}
      {/* Error message */}
    </div>
  );
}
