import Image from "next/image";

import { AvailabilitySearch } from "@/components/public-site/availability-search";
import { BookingHandoffPreview } from "@/components/public-site/booking-handoff-preview";
import { RoomCategorySelector } from "@/components/public-site/room-category-selector";
import { SiteHeader } from "@/components/public-site/site-header";
import { experienceImages } from "@/lib/public-site-data";

const bookingSteps = [
  {
    number: "01",
    title: "Set your stay",
    body: "Choose your dates and party size before an account is required.",
  },
  {
    number: "02",
    title: "Choose a category",
    body: "Compare the room type, capacity, amenities, conditions and total price.",
  },
  {
    number: "03",
    title: "Continue with Google",
    body: "Your selected dates, guests and category remain with you through sign-in.",
  },
  {
    number: "04",
    title: "Move into My Stay",
    body: "After confirmation, My Stay becomes the practical home for your reservation.",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <div className="prototype-banner" id="prototype-note">
        <span>Concept build</span>
        <p>
          XYZ Hotel, room details and photography are placeholders until
          supplied.
        </p>
      </div>

      <SiteHeader />

      <main id="main-content">
        <div className="hero" id="top">
          <Image
            className="hero-image"
            src="https://images.pexels.com/photos/27275300/pexels-photo-27275300.jpeg?auto=compress&cs=tinysrgb&w=2400"
            alt="Sample photography of a warmly illuminated hotel exterior at dusk"
            fill
            preload
            sizes="100vw"
          />
          <div className="hero-wash" />

          <div className="hero-main">
            <section className="hero-content" aria-labelledby="hero-title">
              <p className="hero-kicker">A quieter way to arrive</p>
              <h1 id="hero-title">Come in. The day can wait.</h1>
              <p className="hero-intro">
                Discover the rooms, set your dates and choose the category that
                fits your stay. Your physical room is issued by reception when
                you arrive.
              </p>
            </section>

            <AvailabilitySearch />
          </div>

          <a
            className="hero-credit"
            href="https://www.pexels.com/photo/the-exterior-of-a-hotel-at-night-with-lights-27275300/"
            target="_blank"
            rel="noreferrer"
          >
            Sample photo: Camilo Laverde / Pexels
          </a>
        </div>

        <section
          className="manifesto-section"
          aria-labelledby="manifesto-title"
        >
          <p className="section-label">The feeling</p>
          <h2 id="manifesto-title">
            One place to arrive. Enough room to slow down.
          </h2>
          <div className="manifesto-aside">
            <p>
              Settle in before you arrive. Start with your dates, compare room
              categories at a glance, and keep the practical details close
              without losing the feeling of the stay.
            </p>
            <a className="text-link" href="#rooms">
              Find your room <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section
          className="rooms-section"
          id="rooms"
          aria-labelledby="rooms-title"
        >
          <div className="section-heading">
            <div>
              <p className="section-label">Room categories</p>
              <h2 id="rooms-title" tabIndex={-1}>
                Four ways to make the stay yours.
              </h2>
            </div>
            <p className="section-intro">
              These categories and specifications are sample content from the
              product plan. Final inventory, imagery, amenities and pricing must
              come from the hotel.
            </p>
          </div>
          <RoomCategorySelector />
        </section>

        <section
          className="experience-section"
          id="experience"
          aria-labelledby="experience-title"
        >
          <div className="experience-intro">
            <p className="section-label">The experience</p>
            <h2 id="experience-title">A stay told in thresholds.</h2>
            <p>
              From the first welcome to the quiet of your room and the ease of
              the next morning, every threshold should make arrival feel
              lighter.
            </p>
          </div>

          <div className="experience-grid">
            {experienceImages.map((item, index) => (
              <figure
                className={`experience-card experience-card-${index + 1}`}
                key={item.title}
              >
                <div className="experience-image">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 760px) 100vw, 40vw"
                  />
                </div>
                <figcaption>
                  <span>{item.title}</span>
                  <p>{item.note}</p>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    Sample photo: {item.credit} / Pexels
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section
          className="journey-section"
          id="booking-journey"
          aria-labelledby="journey-title"
        >
          <div className="journey-heading">
            <p className="section-label">From looking to booked</p>
            <h2 id="journey-title" tabIndex={-1}>
              A short path, with every decision intact.
            </h2>
          </div>

          <ol className="journey-list">
            {bookingSteps.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="my-stay-bridge"
          id="my-stay"
          aria-labelledby="my-stay-title"
        >
          <div className="bridge-copy">
            <p className="section-label">After confirmation</p>
            <h2 id="my-stay-title">The story becomes practical.</h2>
            <p>
              Once your reservation is confirmed, My Stay gathers the details
              you need—your chosen category, dates, payment state and arrival
              information—so the next step is always easy to find.
            </p>
            <a className="light-button" href="#availability">
              Start with your dates
            </a>
          </div>
          <BookingHandoffPreview />
        </section>

        <section className="closing-section" aria-labelledby="closing-title">
          <p className="section-label">Your stay begins here</p>
          <h2 id="closing-title">
            Choose the dates. We’ll keep the path clear.
          </h2>
          <a className="primary-button" href="#availability">
            Find a room
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <a
          className="brand-lockup footer-brand"
          href="#top"
          aria-label="XYZ Hotel home"
        >
          <span>XYZ</span>
          <small>Hotel</small>
        </a>
        <p>
          Public-site concept build. Replace all sample property content before
          release.
        </p>
        <nav aria-label="Footer navigation">
          <a href="#rooms">Rooms</a>
          <a href="#booking-journey">Booking</a>
          <a href="#my-stay">My Stay</a>
        </nav>
      </footer>
    </>
  );
}
