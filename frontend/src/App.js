import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import About from "./Components/About";
import Work from "./Components/Work";
import Testimonial from "./Components/Testimonial";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Login from "./Components/LoginPage";
import Signup from "./Components/SignUp";
import Uploadvideo from "./Components/UploadVideo";
import Premiumplan from "./Components/PremiumPlan";
import Dashboard from "./Components/Dashboard";
import Freeplan from "./Components/FreePlan";
import Proplan from "./Components/ProPlan";
import Cart from "./Components/Cart";



function LandingPage() {
  return (
    <div>
      <Home />
      <About />
      <Work />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing page displaying all sections */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Individual pages if users navigate directly */}
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/uploadvideo" element={<Uploadvideo/>} />
          <Route path="/premiumplan" element={<Premiumplan/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/freeplan" element={<Freeplan/>} />
          <Route path="/proplan" element={<Proplan/>} />
          <Route path="/cart" element={<Cart/>} />



           

        </Routes>
      </div>
    </Router>
  );
}

export default App;
