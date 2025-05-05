import React from "react";
import Hero from "./Hero/Hero.jsx";
import Navbar from "./Navbar/Navbar.jsx";
import Services from "./Services/Services.jsx";
import Banner from "./Banner/Banner.jsx";
import AppStore from "./AppStore/AppStore.jsx";
import Testimonial from "./Testimonial/Testimonial.jsx";
import Footer from "./Footer/Footer.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import OrderPopup from "./OrderPopup/OrderPopup.jsx";
import Books from "./BooksSlider/Books.jsx";




const Template = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);


  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
<div>
 <Navbar handleOrderPopup={handleOrderPopup} />
 <Hero handleOrderPopup={handleOrderPopup} />
 <Services handleOrderPopup={handleOrderPopup} />
 <Banner />
 <AppStore />
 <Books />
 <Testimonial />
  <Footer />
  <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
</div>
     
        

  );
};

export default Template;