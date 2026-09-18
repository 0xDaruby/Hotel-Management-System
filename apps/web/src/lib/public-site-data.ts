export type RoomCategory = {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  alt: string;
  capacity: string;
  bed: string;
  highlights: string[];
  credit: {
    name: string;
    href: string;
  };
};

export const roomCategories: RoomCategory[] = [
  {
    id: "standard",
    name: "Standard",
    eyebrow: "A calm place to land",
    description:
      "A simple, considered room for guests who value an easy arrival and a restful night.",
    image:
      "https://images.pexels.com/photos/7746576/pexels-photo-7746576.jpeg?auto=compress&cs=tinysrgb&w=1800",
    alt: "Sample photography of a warm bedroom with a large window and soft natural light",
    capacity: "Sample: up to 2 guests",
    bed: "Sample: one double bed",
    highlights: ["Room essentials", "Private bathroom", "Work surface"],
    credit: {
      name: "Max Vakhtbovych",
      href: "https://www.pexels.com/photo/room-in-hotel-7746576/",
    },
  },
  {
    id: "deluxe",
    name: "Deluxe",
    eyebrow: "More room to settle in",
    description:
      "A more generous setting for slower mornings, longer evenings and an unhurried stay.",
    image:
      "https://images.pexels.com/photos/29333850/pexels-photo-29333850.jpeg?auto=compress&cs=tinysrgb&w=1800",
    alt: "Sample photography of a contemporary hotel bedroom with warm lighting",
    capacity: "Sample: up to 2 guests",
    bed: "Sample: one king bed",
    highlights: ["Lounge seating", "Enhanced bathroom", "Generous storage"],
    credit: {
      name: "Craig Adderley",
      href: "https://www.pexels.com/photo/modern-minimalist-hotel-room-with-warm-lighting-29333850/",
    },
  },
  {
    id: "family-suite",
    name: "Family Suite",
    eyebrow: "Together, with breathing room",
    description:
      "A flexible category concept for families or small groups travelling together.",
    image:
      "https://images.pexels.com/photos/20666872/pexels-photo-20666872.jpeg?auto=compress&cs=tinysrgb&w=1800",
    alt: "Sample photography of a bright hotel room with twin beds and greenery outside",
    capacity: "Sample: up to 4 guests",
    bed: "Sample: flexible bedding",
    highlights: ["Flexible sleeping", "Shared seating", "Family storage"],
    credit: {
      name: "Trần Chính",
      href: "https://www.pexels.com/photo/beds-in-a-hotel-room-20666872/",
    },
  },
  {
    id: "business-suite",
    name: "Business Suite",
    eyebrow: "Space for the work between",
    description:
      "A stay concept with room to focus, meet the day and switch off when work is done.",
    image:
      "https://images.pexels.com/photos/18801079/pexels-photo-18801079.jpeg?auto=compress&cs=tinysrgb&w=1800",
    alt: "Sample photography of a hotel suite with a bed and separate lounge seating",
    capacity: "Sample: up to 2 guests",
    bed: "Sample: one king bed",
    highlights: [
      "Dedicated workspace",
      "Separate seating",
      "Extended-stay comfort",
    ],
    credit: {
      name: "Stiven Rivera",
      href: "https://www.pexels.com/photo/couch-and-double-bed-in-hotel-suite-18801079/",
    },
  },
];

export const experienceImages = [
  {
    title: "The welcome",
    note: "Arrival should feel clear, personal and unhurried.",
    image:
      "https://images.pexels.com/photos/8918652/pexels-photo-8918652.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Sample photography of a warmly lit hotel lobby",
    href: "https://www.pexels.com/photo/inside-the-hotel-s-lobby-8918652/",
    credit: "Bianca Jelezniac",
  },
  {
    title: "The threshold",
    note: "Every transition should guide the guest without rushing them.",
    image:
      "https://images.pexels.com/photos/13490218/pexels-photo-13490218.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Sample photography of a softly lit modern hotel corridor",
    href: "https://www.pexels.com/photo/hallway-in-modern-hotel-13490218/",
    credit: "Zhengdong Hu",
  },
  {
    title: "The morning",
    note: "Small rituals make a stay feel considered.",
    image:
      "https://images.pexels.com/photos/25781659/pexels-photo-25781659.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Sample photography of a breakfast table with coffee, pastries and flowers",
    href: "https://www.pexels.com/photo/morning-breakfast-table-25781659/",
    credit: "Jakub Zerdzicki",
  },
];
