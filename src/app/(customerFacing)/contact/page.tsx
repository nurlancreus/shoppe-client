import Heading from "@/components/ui/heading";
import ContactForm from "./_components/page/contact-form";

export default function Contact() {
  return (
    <div className="mt-32 flex flex-col text-center">
      <Heading>Contact Us</Heading>
      <p className="mx-auto mt-10 max-w-lg text-h3-desktop">
        Say Hello send us your thoughts about our products or share your ideas
        with our Team!
      </p>
      <ContactForm />
    </div>
  );
}
