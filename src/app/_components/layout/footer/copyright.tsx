const currentYear = new Date().getFullYear();

export default function Copyright() {
  return (
    <p className="text-h5-desktop">
      <span className="font-bold">© {currentYear} Shelly.</span> Terms of use{" "}
      <span className="font-bold">and </span>privacy policy.
    </p>
  );
}
