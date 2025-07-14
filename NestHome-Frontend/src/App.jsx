import "./App.css";
import { AllRoutes } from "./Routes/AllRoutes";
import { Footer, NavBar } from "./components";
import { AuthProvider } from "./Auth/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <NavBar />
        <AllRoutes />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
