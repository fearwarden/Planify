import backgroundImageGreen from "@/assets/img/background.jpg";
import LoginForm from "./components/LoginForm";

function Login() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageGreen})`,
    backgroundSize: "cover",
  };

  return (
    <div className="bg-cover" style={backgroundStyle}>
      <div className="grid min-h-screen place-items-center drop-shadow-lg">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
