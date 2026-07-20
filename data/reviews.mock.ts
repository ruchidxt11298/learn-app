import type { Review, Testimonial } from "@/types";
import { avatar } from "./_helpers";

export const reviewsMock: Review[] = [
  { id: "rev-1", author: "Amit Sharma", avatar: avatar("amit"), rating: 5, comment: "The Char Dham Yatra was organized end to end — registration, stays and the Kedarnath trek all went smoothly. Truly a spiritual experience.", date: "2026-06-02", entityType: "package", entityId: "pkg-char-dham-yatra" },
  { id: "rev-2", author: "Priya Nair", avatar: avatar("priya"), rating: 5, comment: "Our Kashmir trip felt like a dream — the houseboat stay on Dal Lake and the Gulmarg gondola ride were unforgettable.", date: "2026-07-14", entityType: "package", entityId: "pkg-kashmir-paradise" },
  { id: "rev-3", author: "Rahul Verma", avatar: avatar("rahul"), rating: 5, comment: "The Rajasthan desert safari in Jaisalmer was the highlight of our trip — the camp, the camel ride and the folk performance were all great.", date: "2026-08-03", entityType: "package", entityId: "pkg-rajasthan-royal" },
  { id: "rev-4", author: "Sneha Joshi", avatar: avatar("sneha"), rating: 4, comment: "Great value Himachal tour — Manali and McLeodganj were both beautiful, and the drive between towns was well planned.", date: "2026-05-20", entityType: "package", entityId: "pkg-himachal-complete" },
  { id: "rev-5", author: "Vikram Singh", avatar: avatar("vikram"), rating: 5, comment: "Bandhavgarh safari exceeded expectations — we spotted a tiger on our second drive. Well-organized by the Roshi Journeys team.", date: "2026-01-30", entityType: "package", entityId: "pkg-mp-wildlife-heritage" },
  { id: "rev-6", author: "Anjali Rawat", avatar: avatar("anjali"), rating: 5, comment: "Rishikesh and the start of our Char Dham journey completely reset our minds before the yatra began.", date: "2026-09-12", entityType: "destination", entityId: "dest-char-dham" },
];

export const testimonialsMock: Testimonial[] = [
  { id: "test-1", name: "Amit Sharma", location: "Delhi, India", avatar: avatar("amit"), rating: 5, quote: "Roshi Journeys planned every detail of our Char Dham Yatra flawlessly — the registration, stays and Kedarnath trek all went without a hitch." },
  { id: "test-2", name: "Priya Nair", location: "Mumbai, India", avatar: avatar("priya"), rating: 5, quote: "The Kashmir houseboat and Gulmarg gondola ride were the highlight of our year. Impeccable planning." },
  { id: "test-3", name: "Rahul Verma", location: "Lucknow, India", avatar: avatar("rahul"), rating: 5, quote: "The Jaisalmer desert camp and camel safari were exactly what we hoped for — will book with Roshi Journeys again." },
  { id: "test-4", name: "Sneha Joshi", location: "Pune, India", avatar: avatar("sneha"), rating: 4, quote: "Great value for the full Himachal circuit — Manali and McLeodganj were both beautifully covered." },
  { id: "test-5", name: "Vikram Singh", location: "Jaipur, India", avatar: avatar("vikram"), rating: 5, quote: "Our Bandhavgarh safari was superbly organized, right down to the safari zone permits." },
  { id: "test-6", name: "Anjali Rawat", location: "Dehradun, India", avatar: avatar("anjali"), rating: 5, quote: "The Rishikesh leg of our Char Dham journey gave us exactly the reset we needed before the yatra." },
];
