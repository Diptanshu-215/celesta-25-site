"use client";

import SendMessage from "./SendMessage"
import ContactSection from "./ContactSection";
import styles from "./Contact.module.css";

export default function Contact() {

  return (
    <div className={`bg-muted p-6 lg::p-10 min-h-screen ${styles.background} text-white pb-20`}>
      <div className="mt-20 flex flex-col items-center justify-center w-full gap-6 ">
        <div className="h-full w-full p-2">
          <h1 className="font-bold text-5xl md:text-7xl text-grad p-2 race">Contact</h1>
        </div>


        <div className="flex flex-wrap justify-center items-center w-full gap-14 ">
          {/* Contact Form */}
          <SendMessage />



          {/* Contact Info */}
          <ContactSection />
        </div>
      </div>
    </div>
  );
}
