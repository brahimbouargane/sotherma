import LoginForm from "../components/forms/LoginForm";

function LoginPage() {
  const handleFormSubmit = (formData: any) => {
    // In a real application, you would send this data to your backend
    console.log("Form submitted with data:", formData);
    // Show success message or redirect
    alert("Votre message a été envoyé avec succès!");
  };
  return <LoginForm onSubmit={handleFormSubmit} />;
}

export default LoginPage;
