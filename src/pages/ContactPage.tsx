import ContactForm from "../components/forms/ContactForm";

function Contact() {
  const handleFormSubmit = (formData: any) => {
    // In a real application, you would send this data to your backend
    console.log("Form submitted with data:", formData);
    // Show success message or redirect
    alert("Votre message a été envoyé avec succès!");
  };
  return <ContactForm onSubmit={handleFormSubmit} />;
}

export default Contact;
