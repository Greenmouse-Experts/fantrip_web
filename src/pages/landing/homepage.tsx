import AppAdvert from "@/modules/landing/homepage/app-advert"
import BookSection from "@/modules/landing/homepage/book-section"
import ChatRoom from "@/modules/landing/homepage/chat-room"
import FandomHome from "@/modules/landing/homepage/fandom"
import FaqSection from "@/modules/landing/homepage/faq-section"
import HeroBanner from "@/modules/landing/homepage/hero-banner"

const LandingHomepage = () => {
  return (
    <div>
        <HeroBanner/>
        <BookSection/>
        <FandomHome/>
        <AppAdvert/>
        <ChatRoom/>
        <FaqSection/>
    </div>
  )
}

export default LandingHomepage