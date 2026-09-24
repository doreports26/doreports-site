import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | संपर्क",
  description:
    "Get in touch with the Do Reports editorial newsroom. Send breaking news tips, editorial inquiries, advertising requests, or connect with us on social media.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
