import { useFormStatus } from "react-dom";
import { Button } from "./button";

export default function SubmitButton({
  children,
  pendingCase,
}: {
  children: React.ReactNode;
  pendingCase: React.ReactNode;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? pendingCase : children}
    </Button>
  );
}
