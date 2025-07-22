import DistrictNavbar from "../components/navbar/DistrictNavbar";
import DistrictHeroSection from "../components/hero/DistrictHeroSection";
import DestinationsSection from "../components/district/DestinationsSection";
import HotelsSection from "../components/district/HotelsSection";
import TransportSection from "../components/district/TransportSection";
import PlanYourTrip from "../components/district/PlanYourTrip";
import AllReviewsSection from "../components/district/AllReviewsSection";
import AboutUs from "../components/district/AboutUs";
import ContactUs from "../components/district/ContactUs";
import Footer from "../components/district/Footer";

const DistrictPage = () => {


  return (
   <>
      <DistrictNavbar />
      <DistrictHeroSection />
      <DestinationsSection />
      <HotelsSection />
      <TransportSection />
      <PlanYourTrip />
      <AllReviewsSection />
      <AboutUs />
      <ContactUs />
      <Footer />
   </>
  );
};

export default DistrictPage;