import Banner from "./Banner/Banner.jsx";
import WhyChoos from "./WhyChoos/WhyChoos.jsx";
import PayNow from "./PayNow/PayNow.jsx";
import HowItWorks from "./HowItWorks/HowItWorks.jsx";
import BuildForStudent from "./BuildForStudent/BuildForStudent.jsx";
import StudentReview from "./StudentReview/StudentReview.jsx";
import CTASection from "./CTASection/CTASection.jsx";

function Home() {
  return (
    <main>
      <Banner />
      <WhyChoos />
      <PayNow />
      <HowItWorks />
      <BuildForStudent />
      <StudentReview />
      <CTASection />
    </main>
  );
}

export default Home;
