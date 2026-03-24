import { useState, useEffect, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────
const MOCK_POSTS = [
  {
    id: 1,
    title: "Hunza Valley: Pakistan's Slice of Heaven",
    excerpt: "Discover the emerald terraced fields, ancient forts, and glacier-fed rivers of Hunza — a destination that will redefine your idea of paradise.",
    content: `# Hunza Valley: Pakistan's Slice of Heaven\n\nNestled between the Karakoram, Hindu Kush, and Himalayan mountain ranges, Hunza Valley is one of the most breathtakingly beautiful places on earth. At an elevation of 2,438 metres, this ancient kingdom rewards every traveller who makes the journey with views that no camera can truly capture.\n\n## Baltit Fort\n\nPerched dramatically above Karimabad, Baltit Fort has stood for over 700 years. The recently restored structure blends Tibetan, Chinese, and local Hunza architectural styles in a way that feels both alien and deeply rooted. Climb to the top at dusk and watch the last light paint Rakaposhi — the 25th highest peak in the world — in shades of amber and rose.\n\n## Attabad Lake\n\nCreated by a catastrophic landslide in 2010, Attabad Lake is one of nature's most surreal accidents. The water is an impossible turquoise — almost electric — fed by the surrounding glaciers. Local boatmen will row you across for a few hundred rupees, and the silence out on the water, surrounded by cliffs thousands of feet high, is absolute.\n\n## Cherry Blossom Season\n\nEvery April, the entire valley erupts in white and pink blossom. The terraced orchards of apricot, cherry, and apple trees create a landscape so delicate it feels like a painting. This is when Hunza is at its most magical — and most visited. Book well in advance.`,
    category: "Destinations",
    image_url: "https://picsum.photos/seed/hunza-valley/1200/800",
    thumb_url: "https://picsum.photos/seed/hunza-valley/800/600",
    author: "Zara Ahmed",
    read_time: "6 min read",
    created_at: "2025-11-15T09:00:00Z",
  },
  {
    id: 2,
    title: "Trekking to K2 Base Camp: The Ultimate Challenge",
    excerpt: "A complete guide to one of the world's most demanding and rewarding treks — through the Karakoram to the foot of the Savage Mountain.",
    content: `# Trekking to K2 Base Camp: The Ultimate Challenge\n\nAt 8,611 metres, K2 is the second highest — and widely considered the most dangerous — mountain on earth. Getting to its base camp is itself a major expedition: a 14-day round trek through the Karakoram that pushes every trekker to their absolute limit.\n\n## The Baltoro Glacier\n\nThe approach follows the Baltoro Glacier — at 62 kilometres, one of the longest glaciers outside the polar regions. Walking on it feels like crossing the surface of another planet: a shifting, groaning river of ancient ice studded with towering seracs and crevasses that swallow the sound of your footsteps.\n\n## Concordia\n\nThe camp at Concordia is called the Throne Room of the Mountain Gods — and justifiably so. Here, four of the world's 14 eight-thousanders are visible simultaneously: K2, Broad Peak, Gasherbrum I, and Gasherbrum II. There is nowhere else on earth where you can stand surrounded by so much raw altitude.\n\n**Best time to go:** June through August. The trek requires a guide, porters, and a permit from the Pakistan Alpine Club. Allow 21 days total including acclimatisation.`,
    category: "Adventure",
    image_url: "https://picsum.photos/seed/k2-basecamp/1200/800",
    thumb_url: "https://picsum.photos/seed/k2-basecamp/800/600",
    author: "Imran Khalid",
    read_time: "8 min read",
    created_at: "2025-10-22T08:30:00Z",
  },
  {
    id: 3,
    title: "A Foodie's Guide to Lahore's Walled City",
    excerpt: "From Lahori chargha to paya nihari at dawn, here's everything you must eat inside the ancient walls of Pakistan's cultural capital.",
    content: `# A Foodie's Guide to Lahore's Walled City\n\nLahore does not merely have a food culture — it is a food culture. Inside the Walled City, a labyrinth of narrow alleys and crumbling havelis hides some of the finest street food on the subcontinent, unchanged in recipe for generations.\n\n## Gawalmandi Food Street\n\nThis is where Lahoris come to eat after midnight. The famous chefs here don't do fusion. They do one dish — lamb karahi, paya, or nihari — cooked in a blackened dekchi over wood fire, served with hand-pulled tandoor roti, and eaten at a table that spills onto the pavement. Arrive hungry.\n\n## Phajja's Siri Paye\n\nSince 1947, Phajja's in Heera Mandi has been serving one thing only: slow-cooked trotters in a spiced broth that takes eight hours to prepare. The shop opens at 5 AM. By 7 AM, it is gone. This is not breakfast for the faint-hearted — it is breakfast for those who understand that the best food requires commitment.\n\n## Anarkali Bazaar\n\nThe oldest bazaar in the subcontinent offers kulfi, jalebis fried in ghee, and lassi served in clay pots so thick with malai you have to eat it with a spoon. Never refuse the malai.`,
    category: "Tips",
    image_url: "https://picsum.photos/seed/lahore-food/1200/800",
    thumb_url: "https://picsum.photos/seed/lahore-food/800/600",
    author: "Ayesha Malik",
    read_time: "6 min read",
    created_at: "2025-09-08T11:00:00Z",
  },
  {
    id: 4,
    title: "Skardu & Deosai Plains: The Roof of the World",
    excerpt: "How to experience Pakistan's high-altitude plateau — home to brown bears, wildflowers, and skies so clear the stars feel within reach.",
    content: `# Skardu & Deosai Plains: The Roof of the World\n\nDeosai National Park sits at an average elevation of 4,114 metres — making it the second highest plateau on earth after Tibet. In summer, the plains transform into a carpet of wildflowers so dense and vivid they look artificial. In winter, they become one of the most severe environments on the planet.\n\n## The Brown Bears of Deosai\n\nDeosai is the last stronghold of the Himalayan brown bear in Pakistan. In the 1990s, fewer than 15 remained. Today, thanks to conservation efforts, the population has recovered to over 80. Early morning drives across the plateau in June and July offer genuine wildlife encounters — the bears are visible from a distance, foraging in the open meadows without fear.\n\n## Sheosar Lake\n\nAt the heart of Deosai sits Sheosar Lake — a mirror-still body of water reflecting the surrounding peaks so perfectly you can't tell where the mountain ends and its reflection begins. Camp here overnight. The altitude keeps the sky impossibly dark and the Milky Way pours across it from horizon to horizon.`,
    category: "Destinations",
    image_url: "https://picsum.photos/seed/deosai-plains/1200/800",
    thumb_url: "https://picsum.photos/seed/deosai-plains/800/600",
    author: "Kamran Baig",
    read_time: "7 min read",
    created_at: "2025-08-03T07:45:00Z",
  },
  {
    id: 5,
    title: "The Karakoram Highway: Pakistan's Epic Road Trip",
    excerpt: "One of the greatest drives on earth — from Islamabad through the Himalayas to the Chinese border at Khunjerab Pass.",
    content: `# The Karakoram Highway: Pakistan's Epic Road Trip\n\nBuilt over 20 years at the cost of hundreds of lives, the Karakoram Highway (KKH) stretches 1,300 kilometres from Hasan Abdal near Islamabad to the Khunjerab Pass at 4,693 metres — the highest paved international border crossing in the world.\n\n## Chilas to Gilgit\n\nThis stretch of the KKH passes through the ancient Silk Road heartland. The rock faces beside the road are covered in thousands of petroglyphs — carved by travellers, monks, and merchants over 2,000 years. Pull over and walk among them. You are touching the same stone that a Buddhist pilgrim touched in 500 AD.\n\n## Khunjerab Pass\n\nAt the top, the air is thin and cold even in summer. The border marker between Pakistan and China stands in a landscape so barren and vast it looks like the surface of Mars. Marco Polo sheep graze nearby, completely indifferent to international boundaries. A two-hour drive from Sost, the pass is open from May to November.\n\n**Best time to drive:** May through October. A private jeep from Islamabad to Khunjerab takes 3–4 days. Budget travellers can cover the same route by NATCO bus for a fraction of the cost.`,
    category: "Adventure",
    image_url: "https://picsum.photos/seed/karakoram-highway/1200/800",
    thumb_url: "https://picsum.photos/seed/karakoram-highway/800/600",
    author: "Tariq Hussain",
    read_time: "9 min read",
    created_at: "2025-07-19T14:20:00Z",
  },
  {
    id: 6,
    title: "How to Travel Pakistan on a Budget",
    excerpt: "From bus fares to guesthouses — a practical guide to exploring one of the world's most underrated destinations without breaking the bank.",
    content: `# How to Travel Pakistan on a Budget\n\nPakistan is one of the most affordable adventure destinations on earth. With the right knowledge, you can travel for weeks through some of the most dramatic landscapes in the world on a very modest daily budget.\n\n## Getting Around\n\nThe NATCO bus network connects all major towns in Gilgit-Baltistan for a fraction of what a jeep hire costs. Yes, the journey takes longer and the seats are cramped — but you'll share the road with local families, traders, and students, and those conversations will be the best part of your trip. For longer distances, Pakistan Railways is surprisingly comfortable and remarkably cheap.\n\n## Where to Sleep\n\nEvery major trekking town in Gilgit-Baltistan has a cluster of clean, simple guesthouses serving home-cooked food for 1,500–2,500 PKR per night. The PTDC (Pakistan Tourism Development Corporation) motels in more remote areas offer reliable basic accommodation with attached bathrooms.\n\n## The Best Free Thing in Pakistan\n\nHospitality. You will be invited into homes, offered chai you cannot refuse, and fed meals by people who will not accept payment. Budget nothing for this — but budget everything for gratitude.`,
    category: "Tips",
    image_url: "https://picsum.photos/seed/pakistan-budget-travel/1200/800",
    thumb_url: "https://picsum.photos/seed/pakistan-budget-travel/800/600",
    author: "Sara Naqvi",
    read_time: "5 min read",
    created_at: "2025-06-11T10:00:00Z",
  },
  {
    id: 7,
    title: "Mohenjo-daro: Walking Through 5,000 Years of History",
    excerpt: "The ancient ruins of one of the world's first great cities stand in Sindh — a UNESCO site that most travellers have never heard of.",
    content: `# Mohenjo-daro: Walking Through 5,000 Years of History\n\nBuilt around 2500 BCE, Mohenjo-daro was one of the largest cities of the ancient Indus Valley Civilisation — a sophisticated urban centre with grid-planned streets, two-storey brick houses, and a drainage system that would not be matched again for 3,000 years. Today its ruins sit in the flat plains of Sindh, baking in the heat, visited by only a handful of travellers each year.\n\n## The Great Bath\n\nThe centrepiece of Mohenjo-daro is a large, watertight pool — the Great Bath — built with such precision that it still holds water today. Archaeologists believe it was used for ritual purification. Standing at its edge in the silence of the Sindhi afternoon, surrounded by 4,500-year-old brickwork, the scale of what was once here becomes overwhelming.\n\n## The Dancing Girl\n\nThe most famous object found here — a small bronze statuette of a confident young woman, hand on hip, head tilted — is housed in New Delhi's National Museum. A replica stands in the site museum. She was cast in 2300 BCE. Her posture is modern. Her expression is timeless.\n\n**Getting there:** Fly to Mohenjo-daro Airport (IATA: MJD) from Karachi. The site is 1 km from the airport. Visit in November through February to avoid the Sindhi summer heat.`,
    category: "Culture",
    image_url: "https://picsum.photos/seed/mohenjo-daro/1200/800",
    thumb_url: "https://picsum.photos/seed/mohenjo-daro/800/600",
    author: "Nadia Qureshi",
    read_time: "7 min read",
    created_at: "2025-05-20T09:30:00Z",
  },
  {
    id: 8,
    title: "Lahore's Mughal Soul: Badshahi Mosque & Beyond",
    excerpt: "A deep dive into the city of gardens, saints, and one of the world's largest mosques — Lahore's Mughal heritage is unrivalled.",
    content: `# Lahore's Mughal Soul: Badshahi Mosque & Beyond\n\nLahore was the capital of the Mughal Empire at its zenith. The monuments left behind — the Badshahi Mosque, Lahore Fort, Shalimar Gardens — are among the finest examples of Mughal architecture anywhere in the world, and yet they receive a fraction of the visitors that comparable sites in India attract.\n\n## Badshahi Mosque\n\nCompleted in 1673 under Emperor Aurangzeb, Badshahi Mosque can accommodate 100,000 worshippers in its courtyard — for nearly three centuries it was the largest mosque in the world. Visit at sunset. The red sandstone turns a deep copper in the last light, and the call to prayer from its minarets echoes across the old city in a way that stops you completely.\n\n## Lahore Fort\n\nA UNESCO World Heritage Site, Lahore Fort contains structures spanning five centuries of Mughal rule, from Akbar's brick pavilions to Shah Jahan's marble inlay work — the same pietra dura technique used in the Taj Mahal, just 45 years earlier. The Sheesh Mahal — the Palace of Mirrors — is particularly extraordinary: a ceiling covered in hundreds of thousands of tiny convex mirrors that catch candlelight like stars.\n\n## Data Darbar\n\nThe shrine of Data Ganj Bakhsh, the 11th-century Sufi saint who is called the Patron Saint of Lahore, is the spiritual heart of the city. Visit on a Thursday night when qawwali singers perform devotional music until dawn.`,
    category: "Culture",
    image_url: "https://picsum.photos/seed/lahore-mughal/1200/800",
    thumb_url: "https://picsum.photos/seed/lahore-mughal/800/600",
    author: "Hamza Chaudhry",
    read_time: "8 min read",
    created_at: "2025-04-15T11:00:00Z",
  },
  {
    id: 9,
    title: "Karachi After Dark: Pakistan's City That Never Sleeps",
    excerpt: "The Karachi that reveals itself after sunset — sea breezes at Clifton, late-night biryani in Burns Road, and chai that tastes better at 2 AM.",
    content: `# Karachi After Dark: Pakistan's City That Never Sleeps\n\nKarachi is extraordinary by day. After dark, it becomes something else entirely — a city of 20 million people where the heat breaks, the sea wind picks up, and every neighbourhood finds its own way to stay awake until dawn.\n\n## Burns Road After Midnight\n\nThis strip in the heart of old Karachi is the undisputed capital of Pakistani street food. After 11 PM, the barbecue smoke thickens and the biryani vendors switch on their lights. The famous Waheed's Nihari has been open since 1950 and their slow-cooked shank nihari, available only from midnight until it runs out, is among the finest things you will eat anywhere in Pakistan.\n\n## Clifton Beach at Sunrise\n\nKarachiites are awake before the sun. By 5 AM, the sea-facing promenade at Clifton is already busy with walkers, chai vendors, and families watching the sunrise over the Arabian Sea. Hire a camel ride for a hundred rupees and watch the city's impossible skyline emerge from the morning haze.`,
    category: "Destinations",
    image_url: "https://picsum.photos/seed/karachi-night/1200/800",
    thumb_url: "https://picsum.photos/seed/karachi-night/800/600",
    author: "Fatima Rizvi",
    read_time: "6 min read",
    created_at: "2025-03-08T08:00:00Z",
  },
];

const CATEGORIES = ["All", "Culture", "Adventure", "Tips", "Destinations"];

const TOUR_PACKAGES = [
  {
    id: 1,
    title: "Hunza & Gilgit Explorer",
    subtitle: "10 Days · Islamabad, Gilgit, Hunza, Khunjerab",
    price: "PKR 185,000",
    image: "https://picsum.photos/seed/hunza-tour/800/600",
    badge: "Best Seller",
    rating: 4.9,
    reviews: 214,
  },
  {
    id: 2,
    title: "K2 Base Camp Trek",
    subtitle: "21 Days · Islamabad, Skardu, Concordia",
    price: "PKR 420,000",
    image: "https://picsum.photos/seed/k2-tour/800/600",
    badge: "Adventure",
    rating: 4.9,
    reviews: 87,
  },
  {
    id: 3,
    title: "Lahore & Mohenjo-daro Heritage",
    subtitle: "7 Days · Lahore, Multan, Mohenjo-daro",
    price: "PKR 95,000",
    image: "https://picsum.photos/seed/lahore-heritage-tour/800/600",
    badge: "Cultural",
    rating: 4.8,
    reviews: 143,
  },
  {
    id: 4,
    title: "Fairy Meadows & Nanga Parbat",
    subtitle: "8 Days · Islamabad, Raikot, Fairy Meadows",
    price: "PKR 130,000",
    image: "https://picsum.photos/seed/fairy-meadows-tour/800/600",
    badge: "Seasonal",
    rating: 5.0,
    reviews: 62,
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Ali Hassan",
    location: "Karachi, Pakistan",
    text: "SRZ Tourism planned our Hunza trip flawlessly — from the guesthouses to the jeep transfers. The valley exceeded every expectation. I've been recommending them to everyone ever since.",
    rating: 5,
    avatar: "https://picsum.photos/seed/pkavatar1/100/100",
    trip: "Hunza & Gilgit Explorer",
  },
  {
    id: 2,
    name: "Sophie Marchand",
    location: "Paris, France",
    text: "I had never considered Pakistan as a destination before a friend mentioned SRZ Tourism. The K2 base camp trek was the most challenging and rewarding experience of my life. Absolutely world-class.",
    rating: 5,
    avatar: "https://picsum.photos/seed/pkavatar2/100/100",
    trip: "K2 Base Camp Trek",
  },
  {
    id: 3,
    name: "Zainab Mirza",
    location: "Lahore, Pakistan",
    text: "The heritage tour through Lahore and Mohenjo-daro felt like travelling through time. Our guide's knowledge was extraordinary. SRZ understands Pakistan's history better than anyone.",
    rating: 5,
    avatar: "https://picsum.photos/seed/pkavatar3/100/100",
    trip: "Lahore & Mohenjo-daro Heritage",
  },
];

// ─── HELPERS ───────────────────────────────────────────────────────────────
function formatDate(dateStr, full = false) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: full ? "long" : "short",
    day: "numeric",
    year: "numeric",
  });
}

function SimpleMarkdown({ content }) {
  const lines = content.split("\n");
  const elements = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("# ")) {
      elements.push(<h1 key={i} className="md-h1">{line.slice(2)}</h1>);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="md-h2">{line.slice(3)}</h2>);
    } else if (line.trim() !== "") {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      const rendered = parts.map((part, idx) => idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part);
      elements.push(<p key={i} className="md-p">{rendered}</p>);
    }
    i++;
  }
  return <div className="markdown-body">{elements}</div>;
}

// ─── ICONS ─────────────────────────────────────────────────────────────────
const IconCompass = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
);
const IconArrowRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconSearch = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IconX = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconStar = ({ filled = true }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconMap = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
  </svg>
);
const IconClock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconUsers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconAward = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);
const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const IconSparkle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.88 5.76L20 10l-6.12 1.24L12 17l-1.88-5.76L4 10l6.12-1.24z"/>
  </svg>
);
const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.26h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

// ─── CSS ───────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0f0f0e;
    --gold: #c5973a;
    --gold-light: #e8d5a3;
    --gold-dim: rgba(197,151,58,0.15);
    --cream: #faf8f4;
    --cream-alt: #f3f0ea;
    --smoke: rgba(15,15,14,0.55);
    --smoke-lt: rgba(15,15,14,0.07);
    --border: rgba(15,15,14,0.09);
    --r-sm: 12px;
    --r-md: 20px;
    --r-lg: 28px;
    --shadow-sm: 0 2px 12px rgba(0,0,0,0.07);
    --shadow-md: 0 8px 32px rgba(0,0,0,0.12);
    --shadow-lg: 0 20px 60px rgba(0,0,0,0.18);
    --serif: 'Cormorant Garamond', Georgia, serif;
    --sans: 'Outfit', system-ui, sans-serif;
    --mono: 'DM Mono', monospace;
    --transition: 0.28s cubic-bezier(0.4,0,0.2,1);
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--cream);
    color: var(--ink);
    font-family: var(--sans);
    -webkit-font-smoothing: antialiased;
    line-height: 1.6;
  }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--cream-alt); }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 999px; }

  /* ── UTILITY ── */
  .serif { font-family: var(--serif); }
  .mono { font-family: var(--mono); }
  .page-wrap { max-width: 1300px; margin: 0 auto; padding: 0 clamp(1rem, 4vw, 2.5rem); }
  .fade-in { animation: fadeUp 0.5s ease both; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  @keyframes heroZoom { from { transform:scale(1.07); } to { transform:scale(1); } }
  @keyframes slideDown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
  @keyframes dotBounce { 0%,80%,100% { transform:scale(0.6); opacity:0.4; } 40% { transform:scale(1); opacity:1; } }
  @keyframes shimmer { 0%,100% { opacity:0.5; } 50% { opacity:1; } }

  /* ── NAV ── */
  .nav {
    position: sticky; top: 0; z-index: 200;
    background: rgba(250,248,244,0.88);
    backdrop-filter: blur(20px) saturate(1.4);
    -webkit-backdrop-filter: blur(20px) saturate(1.4);
    border-bottom: 1px solid var(--border);
    transition: box-shadow var(--transition);
  }
  .nav.scrolled { box-shadow: var(--shadow-sm); }
  .nav-inner {
    max-width: 1300px; margin: 0 auto;
    padding: 0 clamp(1rem,4vw,2.5rem);
    height: 76px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo {
    display: flex; align-items: center; gap: 0.65rem;
    cursor: pointer; text-decoration: none;
    transition: opacity var(--transition);
  }
  .nav-logo:hover { opacity: 0.8; }
  .nav-logo-icon {
    width: 42px; height: 42px;
    background: var(--ink); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: var(--gold); flex-shrink: 0;
  }
  .nav-logo-text { font-family: var(--serif); font-size: 1.55rem; font-weight: 700; letter-spacing: -0.01em; }
  .nav-logo-text em { color: var(--gold); font-style: normal; }
  .nav-links { display: flex; align-items: center; gap: 2.25rem; }
  .nav-link {
    font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--ink); text-decoration: none;
    transition: color var(--transition);
    position: relative;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
    height: 1.5px; background: var(--gold);
    transform: scaleX(0); transform-origin: left;
    transition: transform var(--transition);
  }
  .nav-link:hover { color: var(--gold); }
  .nav-link:hover::after { transform: scaleX(1); }
  .nav-link.active { color: var(--gold); }
  .nav-link.active::after { transform: scaleX(1); }
  .btn-book {
    background: var(--ink); color: #fff;
    border: none; cursor: pointer;
    padding: 0.6rem 1.5rem; border-radius: 999px;
    font-size: 0.75rem; font-weight: 600;
    font-family: var(--sans); letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: background var(--transition), transform var(--transition);
  }
  .btn-book:hover { background: var(--gold); color: var(--ink); transform: scale(1.04); }
  .nav-mobile-btn {
    display: none; background: none; border: none;
    cursor: pointer; color: var(--ink); padding: 0.4rem;
    border-radius: 8px; transition: background var(--transition);
  }
  .nav-mobile-btn:hover { background: var(--smoke-lt); }
  @media (max-width: 900px) { .nav-links { display: none; } .nav-mobile-btn { display: flex; } }
  .mobile-menu {
    background: var(--cream);
    border-bottom: 1px solid var(--border);
    padding: 1.75rem clamp(1rem,4vw,2.5rem) 2.25rem;
    display: flex; flex-direction: column; gap: 0;
    animation: slideDown 0.2s ease;
  }
  .mobile-menu-link {
    font-family: var(--serif); font-size: 1.5rem; font-weight: 600;
    color: var(--ink); text-decoration: none;
    padding: 0.65rem 0; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    cursor: pointer; background: none; border-left: none; border-right: none; border-top: none; width: 100%;
    font-family: var(--serif); text-align: left;
    transition: color var(--transition);
  }
  .mobile-menu-link:last-child { border-bottom: none; }
  .mobile-menu-link:hover { color: var(--gold); }
  .mobile-menu-cta {
    margin-top: 1.5rem; background: var(--ink); color: #fff;
    border: none; cursor: pointer; border-radius: 999px;
    padding: 0.85rem 2rem; font-size: 0.85rem; font-weight: 600;
    font-family: var(--sans); width: 100%; letter-spacing: 0.06em;
    text-transform: uppercase; transition: background var(--transition);
  }
  .mobile-menu-cta:hover { background: var(--gold); color: var(--ink); }

  /* ── HERO ── */
  .hero {
    position: relative; min-height: 92vh;
    display: flex; flex-direction: column; justify-content: center;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0; z-index: 0;
    width: 100%; height: 100%; object-fit: cover;
    filter: brightness(0.42) saturate(1.1);
    animation: heroZoom 16s ease-out forwards;
  }
  .hero-grain {
    position: absolute; inset: 0; z-index: 1;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
    pointer-events: none; opacity: 0.6;
  }
  .hero-overlay {
    position: absolute; inset: 0; z-index: 2;
    background: linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 65%, transparent 100%),
                linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%);
  }
  .hero-content {
    position: relative; z-index: 3;
    max-width: 1300px; margin: 0 auto;
    padding: clamp(4rem,10vh,8rem) clamp(1rem,4vw,2.5rem) 12rem;
    color: #fff;
    animation: fadeUp 0.9s 0.1s ease both;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 0.6rem;
    font-family: var(--mono); font-size: 0.7rem; font-weight: 500;
    letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1.5rem;
  }
  .hero-badge-line { width: 36px; height: 1px; background: var(--gold); }
  .hero-title {
    font-family: var(--serif);
    font-size: clamp(3.5rem, 9vw, 7.5rem);
    font-weight: 700; line-height: 0.95;
    letter-spacing: -0.02em; margin-bottom: 1.75rem;
  }
  .hero-title em { font-style: italic; color: var(--gold-light); }
  .hero-subtitle {
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    font-weight: 300; line-height: 1.8;
    color: rgba(255,255,255,0.75);
    max-width: 500px; margin-bottom: 3rem;
  }
  .hero-cta { display: flex; gap: 1rem; flex-wrap: wrap; }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 0.7rem;
    background: var(--gold); color: var(--ink);
    border: none; cursor: pointer;
    padding: 1rem 2.25rem; border-radius: 999px;
    font-size: 0.85rem; font-weight: 700;
    font-family: var(--sans); letter-spacing: 0.08em; text-transform: uppercase;
    transition: transform var(--transition), box-shadow var(--transition);
    box-shadow: 0 4px 24px rgba(197,151,58,0.4);
  }
  .btn-primary:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 8px 32px rgba(197,151,58,0.5); }
  .btn-secondary {
    display: inline-flex; align-items: center; gap: 0.7rem;
    background: rgba(255,255,255,0.12);
    backdrop-filter: blur(8px); color: #fff;
    border: 1.5px solid rgba(255,255,255,0.3);
    cursor: pointer; padding: 1rem 2.25rem; border-radius: 999px;
    font-size: 0.85rem; font-weight: 600;
    font-family: var(--sans); letter-spacing: 0.06em; text-transform: uppercase;
    transition: background var(--transition), border-color var(--transition);
  }
  .btn-secondary:hover { background: rgba(255,255,255,0.22); border-color: rgba(255,255,255,0.5); }

  /* hero scroll indicator */
  .hero-scroll {
    position: absolute; bottom: 8rem; left: 50%; transform: translateX(-50%);
    z-index: 3; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
    color: rgba(255,255,255,0.5); font-size: 0.65rem; font-family: var(--mono);
    letter-spacing: 0.2em; text-transform: uppercase;
    animation: shimmer 2.5s ease-in-out infinite;
  }
  .hero-scroll-line { width: 1px; height: 44px; background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.5)); }

  /* hero stats bar */
  .stats-bar {
    position: absolute; bottom: 0; left: 0; right: 0; z-index: 4;
    background: rgba(250,248,244,0.97); backdrop-filter: blur(12px);
    border-top: 1px solid var(--border);
  }
  .stats-bar-inner {
    max-width: 1300px; margin: 0 auto;
    padding: 1.35rem clamp(1rem,4vw,2.5rem);
    display: flex; align-items: center; gap: 0; overflow-x: auto;
  }
  .stat { display: flex; flex-direction: column; gap: 0.15rem; flex: 1; min-width: 100px; }
  .stat + .stat { border-left: 1px solid var(--border); padding-left: 2rem; margin-left: 2rem; }
  .stat-num {
    font-family: var(--serif); font-size: 1.6rem;
    font-weight: 700; line-height: 1; color: var(--ink);
  }
  .stat-label {
    font-size: 0.62rem; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase; color: var(--smoke);
  }

  /* ── SECTION HEADER ── */
  .section-header { margin-bottom: 3.5rem; }
  .section-eyebrow {
    display: inline-flex; align-items: center; gap: 0.6rem;
    font-family: var(--mono); font-size: 0.68rem; font-weight: 500;
    letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 0.75rem;
  }
  .section-eyebrow::before { content: ''; width: 28px; height: 1px; background: var(--gold); }
  .section-title {
    font-family: var(--serif); font-size: clamp(2.2rem, 4vw, 3.5rem);
    font-weight: 700; line-height: 1.1; letter-spacing: -0.02em;
  }
  .section-title em { font-style: italic; color: var(--gold); }
  .section-subtitle {
    font-size: 1rem; color: var(--smoke); line-height: 1.7;
    max-width: 560px; margin-top: 0.75rem;
  }

  /* ── CATEGORIES BAR ── */
  .categories-bar {
    background: #fff; border-bottom: 1px solid var(--border);
    padding: 0; position: sticky; top: 76px; z-index: 100;
    box-shadow: var(--shadow-sm);
  }
  .categories-inner {
    max-width: 1300px; margin: 0 auto;
    padding: 1rem clamp(1rem,4vw,2.5rem);
    display: flex; justify-content: space-between;
    align-items: center; gap: 1.25rem; flex-wrap: wrap;
  }
  .cat-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .cat-pill {
    padding: 0.45rem 1.15rem; border-radius: 999px;
    font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    cursor: pointer; border: 1.5px solid transparent;
    font-family: var(--sans); transition: all var(--transition); white-space: nowrap;
  }
  .cat-pill-active { background: var(--ink); color: #fff; border-color: var(--ink); }
  .cat-pill-inactive { background: transparent; color: var(--smoke); border-color: var(--border); }
  .cat-pill-inactive:hover { border-color: var(--ink); color: var(--ink); background: var(--smoke-lt); }
  .search-wrap { position: relative; }
  .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--smoke); pointer-events: none; }
  .search-input {
    padding: 0.5rem 1rem 0.5rem 2.4rem;
    border-radius: 999px; border: 1.5px solid var(--border);
    background: var(--cream); font-size: 0.84rem;
    font-family: var(--sans); color: var(--ink); outline: none;
    width: 240px; transition: border-color var(--transition), width var(--transition);
  }
  .search-input:focus { border-color: var(--gold); width: 280px; }
  .search-input::placeholder { color: var(--smoke); }

  /* ── BLOG GRID ── */
  .blog-section { padding: 5rem 0 7rem; background: var(--cream); }
  .blog-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 3.5rem 2.5rem; }
  @media (max-width: 1024px) { .blog-grid { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 640px) { .blog-grid { grid-template-columns: 1fr; } }

  .post-card { cursor: pointer; transition: transform var(--transition); }
  .post-card:hover { transform: translateY(-5px); }
  .post-card-img-wrap {
    position: relative; aspect-ratio: 4/3;
    border-radius: var(--r-lg); overflow: hidden;
    margin-bottom: 1.5rem; box-shadow: var(--shadow-sm);
    transition: box-shadow var(--transition);
  }
  .post-card:hover .post-card-img-wrap { box-shadow: var(--shadow-lg); }
  .post-card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
  .post-card:hover .post-card-img { transform: scale(1.07); }
  .post-card-badge {
    position: absolute; top: 14px; left: 14px;
    background: rgba(250,248,244,0.95); backdrop-filter: blur(8px);
    padding: 0.28rem 0.75rem; border-radius: 999px;
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--ink);
  }
  .post-card-read-time {
    position: absolute; top: 14px; right: 14px;
    background: rgba(0,0,0,0.5); backdrop-filter: blur(8px);
    padding: 0.25rem 0.65rem; border-radius: 999px;
    font-size: 0.6rem; font-weight: 500; letter-spacing: 0.08em;
    color: rgba(255,255,255,0.9); display: flex; align-items: center; gap: 4px;
  }
  .post-meta { display: flex; gap: 1rem; font-size: 0.7rem; color: var(--smoke); margin-bottom: 0.65rem; align-items: center; }
  .post-meta-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--smoke); }
  .post-title {
    font-family: var(--serif); font-size: 1.45rem; font-weight: 700;
    line-height: 1.25; margin-bottom: 0.65rem;
    transition: color var(--transition);
  }
  .post-card:hover .post-title { color: var(--gold); }
  .post-excerpt {
    font-size: 0.88rem; line-height: 1.7; color: var(--smoke);
    display: -webkit-box; -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; overflow: hidden;
    margin-bottom: 1.1rem;
  }
  .post-read-more {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--ink);
    transition: gap var(--transition), color var(--transition);
  }
  .post-card:hover .post-read-more { gap: 0.75rem; color: var(--gold); }

  /* ── FEATURED POST (first post) ── */
  .featured-post {
    grid-column: 1 / -1;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 3rem; align-items: center;
    background: #fff; border-radius: var(--r-lg);
    overflow: hidden; box-shadow: var(--shadow-md);
    cursor: pointer; transition: box-shadow var(--transition), transform var(--transition);
  }
  .featured-post:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); }
  .featured-post-img-wrap { aspect-ratio: 16/10; overflow: hidden; }
  .featured-post-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; }
  .featured-post:hover .featured-post-img { transform: scale(1.06); }
  .featured-post-body { padding: 2.5rem; }
  .featured-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: var(--gold-dim); color: var(--gold);
    padding: 0.28rem 0.75rem; border-radius: 999px;
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; margin-bottom: 1rem; border: 1px solid rgba(197,151,58,0.25);
  }
  .featured-title {
    font-family: var(--serif); font-size: clamp(1.6rem, 2.5vw, 2.2rem);
    font-weight: 700; line-height: 1.2; margin-bottom: 0.8rem;
    transition: color var(--transition);
  }
  .featured-post:hover .featured-title { color: var(--gold); }
  .featured-excerpt { font-size: 0.95rem; line-height: 1.75; color: var(--smoke); margin-bottom: 1.5rem; }
  @media (max-width: 768px) {
    .featured-post { grid-template-columns: 1fr; }
    .featured-post-img-wrap { aspect-ratio: 16/9; }
  }

  /* ── POST DETAIL ── */
  .post-hero {
    position: relative; height: 65vh; min-height: 440px;
    width: 100%; overflow: hidden;
  }
  .post-hero-img { width: 100%; height: 100%; object-fit: cover; }
  .post-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
    display: flex; align-items: flex-end;
  }
  .post-hero-body {
    max-width: 900px; margin: 0 auto;
    padding: 0 clamp(1rem,4vw,2.5rem) 3.5rem; width: 100%;
    color: #fff; animation: fadeUp 0.6s ease both;
  }
  .btn-back {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em;
    text-transform: uppercase; color: rgba(255,255,255,0.7);
    background: rgba(255,255,255,0.1); backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.2); cursor: pointer;
    border-radius: 999px; padding: 0.5rem 1.1rem;
    margin-bottom: 2rem; font-family: var(--sans);
    transition: background var(--transition), color var(--transition);
  }
  .btn-back:hover { background: rgba(255,255,255,0.2); color: #fff; }
  .post-category-badge {
    display: inline-block; background: var(--gold);
    color: var(--ink); padding: 0.28rem 0.85rem; border-radius: 999px;
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.15em;
    text-transform: uppercase; margin-bottom: 1rem;
  }
  .post-hero-title {
    font-family: var(--serif);
    font-size: clamp(2rem, 4.5vw, 3.75rem);
    font-weight: 700; line-height: 1.08; margin-bottom: 1.5rem;
  }
  .post-hero-meta { display: flex; gap: 1.5rem; font-size: 0.8rem; color: rgba(255,255,255,0.65); flex-wrap: wrap; }
  .post-hero-meta-item { display: flex; align-items: center; gap: 0.4rem; }

  .post-body {
    max-width: 900px; margin: 0 auto;
    padding: 5rem clamp(1rem,4vw,2.5rem);
    display: flex; gap: 4.5rem; align-items: flex-start;
  }
  .post-content { flex: 1; min-width: 0; }
  .post-sidebar { width: 290px; flex-shrink: 0; }
  @media (max-width: 900px) { .post-body { flex-direction: column; gap: 2.5rem; } .post-sidebar { width: 100%; } }

  .markdown-body {}
  .md-h1 {
    font-family: var(--serif); font-size: 2.3rem; font-weight: 700;
    line-height: 1.2; margin-bottom: 1.1rem; margin-top: 1.5rem;
    color: var(--ink);
  }
  .md-h2 {
    font-family: var(--serif); font-size: 1.65rem; font-weight: 600;
    line-height: 1.3; margin-bottom: 0.85rem; margin-top: 2.5rem;
    color: var(--ink); padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border);
  }
  .md-p { font-size: 1.06rem; line-height: 1.9; margin-bottom: 1.2rem; color: #333; }

  .sidebar-card { border-radius: var(--r-md); padding: 1.65rem; margin-bottom: 1.5rem; }
  .sidebar-card-insight {
    background: var(--cream-alt);
    border: 1.5px solid rgba(197,151,58,0.22);
  }
  .sidebar-card-cta { background: var(--ink); color: #fff; }
  .sidebar-card-related { background: #fff; border: 1px solid var(--border); }

  .insight-header { display: flex; align-items: center; gap: 0.5rem; color: var(--gold); margin-bottom: 1rem; }
  .insight-label { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; }
  .insight-text { font-size: 0.88rem; font-style: italic; line-height: 1.75; color: var(--smoke); }
  .insight-hint { font-size: 0.8rem; color: var(--smoke); line-height: 1.65; margin-bottom: 1rem; }
  .btn-generate {
    width: 100%; background: var(--ink); color: #fff; border: none;
    cursor: pointer; border-radius: var(--r-sm); padding: 0.8rem;
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; font-family: var(--sans);
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    transition: background var(--transition);
  }
  .btn-generate:hover:not(:disabled) { background: var(--gold); color: var(--ink); }
  .btn-generate:disabled { opacity: 0.65; cursor: not-allowed; }
  .dot-anim { display: inline-flex; gap: 3px; align-items: center; }
  .dot-anim span {
    width: 4px; height: 4px; border-radius: 50%; background: var(--gold-light);
    animation: dotBounce 1.2s infinite;
  }
  .dot-anim span:nth-child(2) { animation-delay: 0.2s; }
  .dot-anim span:nth-child(3) { animation-delay: 0.4s; }

  .cta-title { font-family: var(--serif); font-size: 1.3rem; font-weight: 600; margin-bottom: 0.6rem; }
  .cta-text { font-size: 0.83rem; color: rgba(255,255,255,0.6); line-height: 1.65; margin-bottom: 1.35rem; }
  .btn-inquire {
    width: 100%; background: var(--gold); color: var(--ink); border: none;
    cursor: pointer; border-radius: var(--r-sm); padding: 0.85rem;
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; font-family: var(--sans);
    transition: opacity var(--transition), transform var(--transition);
  }
  .btn-inquire:hover { opacity: 0.9; transform: scale(1.02); }

  .related-label { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--smoke); margin-bottom: 1rem; }
  .related-item {
    display: flex; gap: 0.85rem; align-items: flex-start;
    cursor: pointer; padding: 0.6rem 0; border-bottom: 1px solid var(--border);
    transition: color var(--transition);
  }
  .related-item:last-child { border-bottom: none; }
  .related-item:hover { color: var(--gold); }
  .related-thumb { width: 52px; height: 42px; border-radius: 8px; object-fit: cover; flex-shrink: 0; }
  .related-title { font-family: var(--serif); font-size: 0.88rem; font-weight: 600; line-height: 1.3; }
  .related-cat { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.2rem; }

  /* ── TOURS PAGE ── */
  .tours-page { background: var(--cream); }
  .tours-hero {
    background: var(--ink); color: #fff;
    padding: 6rem clamp(1rem,4vw,2.5rem);
    text-align: center; position: relative; overflow: hidden;
  }
  .tours-hero::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 50% 120%, rgba(197,151,58,0.18) 0%, transparent 70%);
  }
  .tours-hero-content { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
  .tours-section { padding: 6rem 0; }
  .tours-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 2.5rem; }
  @media (max-width: 768px) { .tours-grid { grid-template-columns: 1fr; } }

  .tour-card {
    background: #fff; border-radius: var(--r-lg); overflow: hidden;
    box-shadow: var(--shadow-sm); transition: transform var(--transition), box-shadow var(--transition);
    cursor: pointer;
  }
  .tour-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
  .tour-card-img-wrap { position: relative; aspect-ratio: 16/10; overflow: hidden; }
  .tour-card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
  .tour-card:hover .tour-card-img { transform: scale(1.07); }
  .tour-card-badge {
    position: absolute; top: 16px; left: 16px;
    background: var(--gold); color: var(--ink);
    padding: 0.3rem 0.85rem; border-radius: 999px;
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
  }
  .tour-card-body { padding: 1.75rem; }
  .tour-card-title { font-family: var(--serif); font-size: 1.55rem; font-weight: 700; margin-bottom: 0.3rem; }
  .tour-card-subtitle { font-size: 0.82rem; color: var(--smoke); margin-bottom: 1.25rem; }
  .tour-card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 1.25rem; border-top: 1px solid var(--border); }
  .tour-price { font-family: var(--serif); font-size: 1.5rem; font-weight: 700; }
  .tour-price-label { font-size: 0.68rem; color: var(--smoke); font-weight: 400; }
  .tour-rating { display: flex; align-items: center; gap: 0.4rem; }
  .tour-rating-stars { display: flex; gap: 1px; color: var(--gold); }
  .tour-rating-text { font-size: 0.78rem; font-weight: 600; }
  .tour-rating-count { font-size: 0.72rem; color: var(--smoke); }
  .btn-book-tour {
    background: var(--ink); color: #fff; border: none; cursor: pointer;
    border-radius: 999px; padding: 0.65rem 1.5rem;
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; font-family: var(--sans);
    transition: background var(--transition);
  }
  .btn-book-tour:hover { background: var(--gold); color: var(--ink); }

  /* ── ABOUT PAGE ── */
  .about-page { background: var(--cream); }
  .about-hero {
    min-height: 60vh; display: flex; align-items: center;
    background: var(--ink); color: #fff;
    padding: 6rem clamp(1rem,4vw,2.5rem);
    position: relative; overflow: hidden;
  }
  .about-hero::before {
    content: ''; position: absolute; top: -50%; right: -10%;
    width: 60vw; height: 160%;
    background: radial-gradient(ellipse, rgba(197,151,58,0.12) 0%, transparent 70%);
  }
  .about-hero-inner { max-width: 1300px; margin: 0 auto; width: 100%; position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
  @media (max-width: 768px) { .about-hero-inner { grid-template-columns: 1fr; } }
  .about-hero-img { border-radius: var(--r-lg); width: 100%; aspect-ratio: 4/3; object-fit: cover; opacity: 0.85; }
  .about-values { padding: 6rem 0; }
  .values-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2rem; }
  @media (max-width: 768px) { .values-grid { grid-template-columns: 1fr; } }
  .value-card {
    background: #fff; border-radius: var(--r-md); padding: 2rem;
    border: 1px solid var(--border); transition: box-shadow var(--transition), transform var(--transition);
  }
  .value-card:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); }
  .value-icon {
    width: 48px; height: 48px; background: var(--gold-dim);
    border-radius: 12px; display: flex; align-items: center; justify-content: center;
    color: var(--gold); margin-bottom: 1.25rem;
  }
  .value-title { font-family: var(--serif); font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; }
  .value-text { font-size: 0.88rem; line-height: 1.7; color: var(--smoke); }

  /* ── TESTIMONIALS ── */
  .testimonials-section { background: var(--ink); color: #fff; padding: 7rem 0; }
  .testimonials-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2rem; }
  @media (max-width: 900px) { .testimonials-grid { grid-template-columns: 1fr; } }
  .testimonial-card {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: var(--r-lg); padding: 2rem;
    transition: background var(--transition), border-color var(--transition);
  }
  .testimonial-card:hover { background: rgba(255,255,255,0.09); border-color: rgba(197,151,58,0.3); }
  .testimonial-stars { display: flex; gap: 2px; color: var(--gold); margin-bottom: 1rem; }
  .testimonial-text { font-family: var(--serif); font-size: 1.05rem; font-style: italic; line-height: 1.75; color: rgba(255,255,255,0.8); margin-bottom: 1.5rem; }
  .testimonial-author { display: flex; align-items: center; gap: 0.85rem; }
  .testimonial-avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(197,151,58,0.3); }
  .testimonial-name { font-weight: 600; font-size: 0.9rem; }
  .testimonial-loc { font-size: 0.75rem; color: rgba(255,255,255,0.45); }
  .testimonial-trip { font-size: 0.68rem; color: var(--gold); font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 0.2rem; }

  /* ── CONTACT PAGE ── */
  .contact-page { background: var(--cream); min-height: 100vh; }
  .contact-hero {
    background: var(--ink); color: #fff;
    padding: 5rem clamp(1rem,4vw,2.5rem) 4rem;
    text-align: center;
  }
  .contact-layout {
    max-width: 1100px; margin: 0 auto;
    padding: 5rem clamp(1rem,4vw,2.5rem);
    display: grid; grid-template-columns: 1fr 1.6fr; gap: 4rem;
    align-items: start;
  }
  @media (max-width: 768px) { .contact-layout { grid-template-columns: 1fr; } }
  .contact-info-item {
    display: flex; gap: 1rem; align-items: flex-start;
    padding: 1.25rem 0; border-bottom: 1px solid var(--border);
  }
  .contact-info-item:last-child { border-bottom: none; }
  .contact-icon {
    width: 42px; height: 42px; background: var(--gold-dim);
    border-radius: 10px; display: flex; align-items: center; justify-content: center;
    color: var(--gold); flex-shrink: 0;
  }
  .contact-info-label { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--smoke); margin-bottom: 0.3rem; }
  .contact-info-val { font-family: var(--serif); font-size: 1.1rem; font-weight: 600; }

  .contact-form-card {
    background: #fff; border-radius: var(--r-lg);
    padding: 2.5rem; box-shadow: var(--shadow-md);
  }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
  @media (max-width: 500px) { .form-row { grid-template-columns: 1fr; } }
  .form-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1rem; }
  .form-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--smoke); }
  .form-input, .form-textarea, .form-select {
    padding: 0.75rem 1rem; border-radius: var(--r-sm);
    border: 1.5px solid var(--border); background: var(--cream);
    font-size: 0.9rem; font-family: var(--sans); color: var(--ink); outline: none;
    transition: border-color var(--transition);
  }
  .form-input:focus, .form-textarea:focus, .form-select:focus { border-color: var(--gold); }
  .form-textarea { resize: vertical; min-height: 120px; }
  .btn-submit {
    width: 100%; background: var(--ink); color: #fff; border: none; cursor: pointer;
    border-radius: 999px; padding: 1rem; font-size: 0.8rem; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase; font-family: var(--sans);
    display: flex; align-items: center; justify-content: center; gap: 0.6rem;
    transition: background var(--transition), transform var(--transition);
  }
  .btn-submit:hover { background: var(--gold); color: var(--ink); transform: scale(1.02); }
  .form-success {
    text-align: center; padding: 2rem;
    color: var(--gold); font-family: var(--serif); font-size: 1.3rem; font-weight: 600;
  }
  .form-success p { font-family: var(--sans); font-size: 0.88rem; color: var(--smoke); margin-top: 0.5rem; font-style: normal; }

  /* ── BOOK TRIP MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: 1rem; animation: fadeUp 0.25s ease both;
  }
  .modal {
    background: #fff; border-radius: var(--r-lg);
    width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto;
    padding: 2.5rem; position: relative; box-shadow: var(--shadow-lg);
  }
  .modal-close {
    position: absolute; top: 1.25rem; right: 1.25rem;
    background: var(--smoke-lt); border: none; cursor: pointer;
    border-radius: 50%; width: 34px; height: 34px;
    display: flex; align-items: center; justify-content: center;
    color: var(--ink); transition: background var(--transition);
  }
  .modal-close:hover { background: var(--cream-alt); }
  .modal-title { font-family: var(--serif); font-size: 1.8rem; font-weight: 700; margin-bottom: 0.4rem; }
  .modal-subtitle { font-size: 0.85rem; color: var(--smoke); margin-bottom: 2rem; }

  /* ── NEWSLETTER BANNER ── */
  .newsletter-section {
    background: var(--gold);
    padding: 5rem clamp(1rem,4vw,2.5rem);
    position: relative; overflow: hidden;
  }
  .newsletter-section::before {
    content: ''; position: absolute; top: -60%; right: -5%;
    width: 50vw; height: 220%;
    background: radial-gradient(ellipse, rgba(255,255,255,0.15) 0%, transparent 70%);
    pointer-events: none;
  }
  .newsletter-inner { max-width: 680px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
  .newsletter-title { font-family: var(--serif); font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; color: var(--ink); margin-bottom: 0.75rem; }
  .newsletter-subtitle { font-size: 1rem; color: rgba(15,15,14,0.65); margin-bottom: 2rem; line-height: 1.65; }
  .newsletter-form { display: flex; gap: 0.6rem; max-width: 460px; margin: 0 auto; }
  .newsletter-input {
    flex: 1; padding: 0.85rem 1.25rem; border-radius: 999px;
    border: none; background: rgba(255,255,255,0.9);
    font-size: 0.9rem; font-family: var(--sans); color: var(--ink); outline: none;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  }
  .newsletter-input::placeholder { color: rgba(15,15,14,0.45); }
  .newsletter-btn {
    background: var(--ink); color: #fff; border: none; cursor: pointer;
    border-radius: 999px; padding: 0.85rem 1.75rem;
    font-size: 0.78rem; font-weight: 700; font-family: var(--sans);
    letter-spacing: 0.08em; text-transform: uppercase; white-space: nowrap;
    display: flex; align-items: center; gap: 0.5rem;
    transition: opacity var(--transition);
  }
  .newsletter-btn:hover { opacity: 0.85; }
  .newsletter-success { font-family: var(--serif); font-size: 1.1rem; font-weight: 600; color: var(--ink); }
  @media (max-width: 480px) { .newsletter-form { flex-direction: column; } .newsletter-btn { text-align: center; justify-content: center; } }

  /* ── FOOTER ── */
  .footer { background: var(--ink); color: #fff; padding: 5.5rem 0 0; }
  .footer-grid {
    max-width: 1300px; margin: 0 auto;
    padding: 0 clamp(1rem,4vw,2.5rem);
    display: grid; grid-template-columns: 2.2fr 1fr 1fr 1.3fr;
    gap: 3rem; margin-bottom: 4rem;
  }
  @media (max-width: 960px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr; } }
  .footer-logo { display: flex; align-items: center; gap: 0.7rem; margin-bottom: 1.35rem; }
  .footer-logo-text { font-family: var(--serif); font-size: 1.65rem; font-weight: 700; }
  .footer-logo-text em { color: var(--gold); font-style: normal; }
  .footer-desc { font-size: 0.86rem; line-height: 1.8; color: rgba(255,255,255,0.5); max-width: 300px; margin-bottom: 2rem; }
  .footer-socials { display: flex; gap: 0.6rem; }
  .social-btn {
    width: 38px; height: 38px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.15); background: none;
    cursor: pointer; color: #fff;
    display: flex; align-items: center; justify-content: center;
    transition: background var(--transition), border-color var(--transition), color var(--transition);
    font-size: 0.75rem; font-weight: 700; font-family: var(--sans);
  }
  .social-btn:hover { background: var(--gold); border-color: var(--gold); color: var(--ink); }
  .footer-col-title { font-family: var(--serif); font-size: 1.1rem; font-weight: 600; margin-bottom: 1.35rem; }
  .footer-links { display: flex; flex-direction: column; gap: 0.85rem; }
  .footer-link {
    font-size: 0.84rem; color: rgba(255,255,255,0.5);
    text-decoration: none; transition: color var(--transition);
    cursor: pointer; background: none; border: none; text-align: left;
    font-family: var(--sans);
  }
  .footer-link:hover { color: var(--gold); }
  .footer-nl-label { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 0.8rem; }
  .footer-nl-form { display: flex; gap: 0.5rem; }
  .footer-nl-input {
    flex: 1; background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12); border-radius: 999px;
    padding: 0.55rem 1rem; font-size: 0.8rem; font-family: var(--sans);
    color: #fff; outline: none; transition: border-color var(--transition);
  }
  .footer-nl-input::placeholder { color: rgba(255,255,255,0.3); }
  .footer-nl-input:focus { border-color: var(--gold); }
  .footer-nl-btn {
    background: var(--gold); color: var(--ink); border: none;
    cursor: pointer; border-radius: 999px; padding: 0.55rem 1rem;
    font-size: 0.68rem; font-weight: 700; font-family: var(--sans);
    letter-spacing: 0.08em; text-transform: uppercase; white-space: nowrap;
    transition: opacity var(--transition);
  }
  .footer-nl-btn:hover { opacity: 0.85; }
  .footer-bottom {
    max-width: 1300px; margin: 0 auto;
    padding: 1.5rem clamp(1rem,4vw,2.5rem);
    border-top: 1px solid rgba(255,255,255,0.08);
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 1rem;
    font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(255,255,255,0.28);
  }
  .footer-bottom-links { display: flex; gap: 2rem; }
  .footer-bottom-link {
    color: rgba(255,255,255,0.28); text-decoration: none;
    transition: color var(--transition); cursor: pointer; background: none; border: none;
    font-family: var(--sans); font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase;
  }
  .footer-bottom-link:hover { color: var(--gold); }

  .empty-state { text-align: center; padding: 5rem 2rem; color: var(--smoke); }
  .empty-state h3 { font-family: var(--serif); font-size: 1.7rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--ink); }
  .empty-state p { font-size: 0.9rem; }

  /* ── MARQUEE LOGO STRIP ── */
  .marquee-section {
    background: var(--ink);
    padding: 4.5rem 0 4rem;
    overflow: hidden;
  }
  .marquee-heading {
    text-align: center;
    margin-bottom: 2.5rem;
    padding: 0 1rem;
  }
  .marquee-eyebrow {
    font-family: var(--mono);
    font-size: 0.65rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 0.7rem;
    display: flex; align-items: center; justify-content: center; gap: 0.8rem;
  }
  .marquee-eyebrow::before, .marquee-eyebrow::after {
    content: ''; display: block; width: 28px; height: 1px;
    background: rgba(255,255,255,0.2);
  }
  .marquee-title {
    font-family: var(--serif);
    font-size: clamp(1.6rem, 3vw, 2.6rem);
    font-weight: 700;
    color: #fff;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  .marquee-title em { color: var(--gold); font-style: italic; }

  .marquee-outer { position: relative; width: 100%; }
  .marquee-stripe {
    background: rgba(255,255,255,0.03);
    border-top: 1px solid rgba(255,255,255,0.07);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    overflow: hidden;
    position: relative;
    height: 68px;
    display: flex;
    align-items: center;
  }
  .marquee-stripe + .marquee-stripe { border-top: none; margin-top: 2px; }

  /* edge fades */
  .marquee-stripe::before, .marquee-stripe::after {
    content: ''; position: absolute; top: 0; bottom: 0;
    width: clamp(60px, 8vw, 140px); z-index: 10; pointer-events: none;
  }
  .marquee-stripe::before { left: 0; background: linear-gradient(to right, var(--ink) 0%, transparent 100%); }
  .marquee-stripe::after  { right: 0; background: linear-gradient(to left,  var(--ink) 0%, transparent 100%); }

  .marquee-track {
    display: flex;
    align-items: center;
    width: max-content;
    will-change: transform;
  }
  .marquee-track-left  { animation: mScrollLeft  40s linear infinite; }
  .marquee-track-right { animation: mScrollRight 30s linear infinite; }
  .marquee-stripe:hover .marquee-track { animation-play-state: paused; }

  @keyframes mScrollLeft  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
  @keyframes mScrollRight { from { transform: translateX(-50%); } to { transform: translateX(0); }    }

  .marquee-item {
    display: flex; align-items: center; gap: 0.7rem;
    padding: 0 2rem;
    opacity: 0.5;
    transition: opacity 0.25s ease;
    cursor: default; white-space: nowrap; flex-shrink: 0;
    height: 68px;
  }
  .marquee-item:hover { opacity: 1; }
  .marquee-item-icon { display: flex; align-items: center; color: #fff; }
  .marquee-item-name {
    font-family: var(--sans); font-weight: 700;
    font-size: 0.85rem; letter-spacing: 0.04em; color: #fff;
  }
  .marquee-item-divider {
    width: 1px; height: 24px;
    background: rgba(255,255,255,0.12);
    flex-shrink: 0; margin: 0 0.15rem;
  }
`;

// ─── MARQUEE LOGO STRIP ────────────────────────────────────────────────────
const MARQUEE_ROW_A = [
  { name: "Pakistan Tourism", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"/><line x1="2" y1="12" x2="22" y2="12"/></svg> },
  { name: "PTDC", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 12 2 21 11 21 21 15 21 15 15 9 15 9 21 3 21"/></svg> },
  { name: "Pakistan Airlines", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5S18 1 16.5 2.5L13 6 4.8 4.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg> },
  { name: "Serena Hotels", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22V8l9-5 9 5v14"/><rect x="9" y="14" width="6" height="8"/><path d="M9 10h6"/></svg> },
  { name: "Karakoram Club", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { name: "Alpine Club Pakistan", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3L2 21h20L14 3z"/><path d="M14 3l3 8-5-2-5 2 3-8"/></svg> },
  { name: "Pakistan Expo", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
  { name: "Gilgit Tourism", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
];

const MARQUEE_ROW_B = [
  { name: "Lahore Fort Authority", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { name: "Hunza Tourism Board", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 6l5 5 5-5 5 5 5-5"/><path d="M1 14l5 5 5-5 5 5 5-5"/></svg> },
  { name: "National Heritage", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2M8 7V5a2 2 0 0 0-4 0v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg> },
  { name: "Pakistan Railways", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16M12 3v16M7 19l-2 2M17 19l2 2"/></svg> },
  { name: "Islamabad Capital", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/></svg> },
  { name: "Silk Route Journal", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10"/><path d="M13 2.05A10 10 0 0 1 22 11"/><path d="M2 12a10 10 0 0 0 10 10"/></svg> },
  { name: "Dawn Travel", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 12h4M3 12h4M12 3v4M12 17v4M18.36 5.64l-2.83 2.83M8.47 15.53l-2.83 2.83M18.36 18.36l-2.83-2.83M8.47 8.47L5.64 5.64"/></svg> },
  { name: "Adventure Pakistan", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> },
];

function MarqueeStrip() {
  const renderItems = (logos) =>
    logos.map((logo, i) => (
      <span key={i}>
        <span className="marquee-item">
          <span className="marquee-item-icon">{logo.icon}</span>
          <span className="marquee-item-name">{logo.name}</span>
        </span>
        {i < logos.length - 1 && <span className="marquee-item-divider" />}
      </span>
    ));

  return (
    <section className="marquee-section">
      <div className="marquee-heading">
        <div className="marquee-eyebrow">Trusted by teams at</div>
        <h2 className="marquee-title">Pakistan's Leading <em>Partners</em></h2>
      </div>
      <div className="marquee-outer">
        {/* Row 1 — scrolls left */}
        <div className="marquee-stripe">
          <div className="marquee-track marquee-track-left">
            {renderItems(MARQUEE_ROW_A)}
            {renderItems(MARQUEE_ROW_A)}
          </div>
        </div>
        {/* Row 2 — scrolls right */}
        <div className="marquee-stripe">
          <div className="marquee-track marquee-track-right">
            {renderItems(MARQUEE_ROW_B)}
            {renderItems(MARQUEE_ROW_B)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home"); // home | stories | destinations | tours | about | contact
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [aiInsight, setAiInsight] = useState(null);
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [footerEmail, setFooterEmail] = useState("");
  const [footerEmailDone, setFooterEmailDone] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [bookForm, setBookForm] = useState({ name: "", email: "", destination: "", dates: "", guests: "2", notes: "" });
  const [bookDone, setBookDone] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [contactDone, setContactDone] = useState(false);
  const topRef = useRef(null);

  useEffect(() => {
    const title = selectedPost
      ? `${selectedPost.title} — SRZ Tourism`
      : page === "home" ? "SRZ Tourism — Discover Pakistan's Hidden Gems"
      : page === "tours" ? "Tour Packages — SRZ Tourism"
      : page === "about" ? "About Us — SRZ Tourism"
      : page === "contact" ? "Contact — SRZ Tourism"
      : "Stories — SRZ Tourism";
    document.title = title;
  }, [selectedPost, page]);

  useEffect(() => {
    const onScroll = () => setIsNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredPosts = MOCK_POSTS.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const scrollTop = () => setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth" }), 50);

  const navigate = (newPage) => {
    setPage(newPage);
    setSelectedPost(null);
    setIsMenuOpen(false);
    scrollTop();
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setAiInsight(null);
    setIsMenuOpen(false);
    scrollTop();
  };

  const handleBackClick = () => {
    setSelectedPost(null);
    scrollTop();
  };

  const generateAiInsight = async (post) => {
    setIsGeneratingInsight(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 180,
          messages: [{ role: "user", content: `As a senior Pakistan travel expert for SRZ Tourism, write a 2-sentence unique insider travel tip related to: "${post.title}". Context: ${post.excerpt}. Be specific, practical, and focused on Pakistan.` }]
        })
      });
      const data = await response.json();
      setAiInsight(data.content?.[0]?.text || "No insight available.");
    } catch {
      setAiInsight("Unable to generate AI insight at this time. Please try again.");
    } finally {
      setIsGeneratingInsight(false);
    }
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (bookForm.name && bookForm.email && bookForm.destination) setBookDone(true);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) setContactDone(true);
  };

  const relatedPosts = (post) => MOCK_POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);

  return (
    <>
      <style>{CSS}</style>
      <div ref={topRef} />

      {/* ── NAVIGATION ── */}
      <nav className={`nav${isNavScrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => navigate("home")} aria-label="SRZ Tourism Home">
            <div className="nav-logo-icon"><IconCompass /></div>
            <span className="nav-logo-text">SRZ <em>Tourism</em></span>
          </div>
          <div className="nav-links">
            {[
              { label: "Destinations", id: "destinations" },
              { label: "Stories", id: "stories" },
              { label: "Tours", id: "tours" },
              { label: "About", id: "about" },
              { label: "Contact", id: "contact" },
            ].map(({ label, id }) => (
              <button key={id} onClick={() => navigate(id)}
                className={`nav-link${page === id ? " active" : ""}`}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--sans)" }}>
                {label}
              </button>
            ))}
            <button className="btn-book" onClick={() => setShowBookModal(true)}>Book a Trip</button>
          </div>
          <button className="nav-mobile-btn" aria-label="Toggle menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="mobile-menu">
          {[
            { label: "Destinations", id: "destinations" },
            { label: "Stories", id: "stories" },
            { label: "Tours", id: "tours" },
            { label: "About", id: "about" },
            { label: "Contact", id: "contact" },
          ].map(({ label, id }) => (
            <button key={id} className="mobile-menu-link" onClick={() => navigate(id)}>
              {label} <IconArrowRight size={16} />
            </button>
          ))}
          <button className="mobile-menu-cta" onClick={() => { setShowBookModal(true); setIsMenuOpen(false); }}>
            Book a Trip
          </button>
        </div>
      )}

      <main>
        {/* ── POST DETAIL ── */}
        {selectedPost ? (
          <div className="fade-in" style={{ background: "#fff" }}>
            <div className="post-hero">
              <img src={selectedPost.image_url} alt={`${selectedPost.title} — SRZ Tourism`} className="post-hero-img" referrerPolicy="no-referrer" />
              <div className="post-hero-overlay">
                <div className="post-hero-body">
                  <button className="btn-back" onClick={handleBackClick}>← Back to Stories</button>
                  <span className="post-category-badge">{selectedPost.category}</span>
                  <h1 className="post-hero-title">{selectedPost.title}</h1>
                  <div className="post-hero-meta">
                    <span className="post-hero-meta-item">✍ By {selectedPost.author}</span>
                    <span className="post-hero-meta-item">📅 {formatDate(selectedPost.created_at, true)}</span>
                    <span className="post-hero-meta-item"><IconClock /> {selectedPost.read_time}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="post-body">
              <div className="post-content">
                <SimpleMarkdown content={selectedPost.content} />
              </div>
              <aside className="post-sidebar" style={{ position: "sticky", top: "100px" }}>
                {/* AI Insight */}
                <div className="sidebar-card sidebar-card-insight">
                  <div className="insight-header">
                    <IconSparkle />
                    <span className="insight-label">SRZ AI Insight</span>
                  </div>
                  {aiInsight ? (
                    <p className="insight-text">"{aiInsight}"</p>
                  ) : (
                    <>
                      <p className="insight-hint">Get a unique insider travel tip for this destination, powered by AI.</p>
                      <button className="btn-generate" onClick={() => generateAiInsight(selectedPost)} disabled={isGeneratingInsight}>
                        {isGeneratingInsight
                          ? <><span>Generating</span> <div className="dot-anim"><span /><span /><span /></div></>
                          : <><IconSparkle /> Generate Pro-Tip</>}
                      </button>
                    </>
                  )}
                </div>
                {/* CTA */}
                <div className="sidebar-card sidebar-card-cta">
                  <h4 className="cta-title">Ready to visit?</h4>
                  <p className="cta-text">Let SRZ Tourism handle every detail. We design custom itineraries tailored to you.</p>
                  <button className="btn-inquire" onClick={() => setShowBookModal(true)}>Inquire Now</button>
                </div>
                {/* Related */}
                {relatedPosts(selectedPost).length > 0 && (
                  <div className="sidebar-card sidebar-card-related">
                    <div className="related-label">Related Stories</div>
                    {relatedPosts(selectedPost).map(rp => (
                      <div key={rp.id} className="related-item" onClick={() => handlePostClick(rp)}>
                        <img src={rp.thumb_url} alt={rp.title} className="related-thumb" referrerPolicy="no-referrer" />
                        <div>
                          <div className="related-cat">{rp.category}</div>
                          <div className="related-title">{rp.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </aside>
            </div>
          </div>
        ) : page === "home" ? (
          // ── HOME ──
          <div className="fade-in">
            {/* Hero */}
            <section className="hero">
              <img src="https://picsum.photos/seed/pakistan-mountains-hero/1920/1080" className="hero-bg" alt="Hunza Valley, Pakistan — SRZ Tourism" loading="eager" referrerPolicy="no-referrer" />
              <div className="hero-grain" />
              <div className="hero-overlay" />
              <div className="hero-content">
                <div className="hero-badge"><span className="hero-badge-line" />Discover Pakistan</div>
                <h1 className="hero-title">The World's Most<br /><em>Underrated</em> Paradise.</h1>
                <p className="hero-subtitle">Five mountain ranges. 5,000 years of history. Unmatched hospitality. SRZ Tourism takes you beyond the headlines and into the real Pakistan.</p>
                <div className="hero-cta">
                  <button className="btn-primary" onClick={() => { setPage("stories"); scrollTop(); }}>
                    Explore Stories <IconArrowRight />
                  </button>
                  <button className="btn-secondary" onClick={() => { setPage("tours"); scrollTop(); }}>
                    <IconMap /> View Tours
                  </button>
                </div>
              </div>
              <div className="hero-scroll">
                <div className="hero-scroll-line" />
                <span>Scroll</span>
              </div>
              <div className="stats-bar">
                <div className="stats-bar-inner">
                  {[{ num: "50+", label: "Destinations" }, { num: "8,000+", label: "Happy Travellers" }, { num: "4", label: "Provinces" }, { num: "12 Yrs", label: "Experience" }].map((s) => (
                    <div key={s.label} className="stat">
                      <span className="stat-num">{s.num}</span>
                      <span className="stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Marquee Logo Strip */}
            <MarqueeStrip />

            {/* Latest Stories */}
            <section style={{ padding: "7rem 0 5rem", background: "var(--cream)" }}>
              <div className="page-wrap">
                <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
                  <div>
                    <div className="section-eyebrow">Pakistan Stories</div>
                    <h2 className="section-title">Latest from the <em>Field</em></h2>
                  </div>
                  <button onClick={() => navigate("stories")} style={{ background: "none", border: "1.5px solid var(--border)", borderRadius: "999px", padding: "0.6rem 1.4rem", cursor: "pointer", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--sans)", color: "var(--ink)", display: "flex", alignItems: "center", gap: "0.5rem", transition: "all var(--transition)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--ink)"; }}>
                    All Stories <IconArrowRight size={14} />
                  </button>
                </div>
                <div className="blog-grid">
                  {MOCK_POSTS.slice(0, 6).map((post, idx) => (
                    <article key={post.id} className="post-card" onClick={() => handlePostClick(post)} style={{ animation: `fadeUp 0.5s ${idx * 0.08}s ease both` }}>
                      <div className="post-card-img-wrap">
                        <img src={post.thumb_url} alt={`${post.title} — ${post.category}`} className="post-card-img" loading="lazy" referrerPolicy="no-referrer" />
                        <span className="post-card-badge">{post.category}</span>
                        <span className="post-card-read-time"><IconClock /> {post.read_time}</span>
                      </div>
                      <div className="post-meta">
                        <span>{formatDate(post.created_at)}</span>
                        <span className="post-meta-dot" />
                        <span>{post.author}</span>
                      </div>
                      <h3 className="post-title">{post.title}</h3>
                      <p className="post-excerpt">{post.excerpt}</p>
                      <div className="post-read-more">Read Story <IconArrowRight size={14} /></div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Tour Packages Teaser */}
            <section style={{ padding: "6rem 0", background: "#fff" }}>
              <div className="page-wrap">
                <div className="section-header">
                  <div className="section-eyebrow">Curated Experiences</div>
                  <h2 className="section-title">Featured <em>Pakistan Tours</em></h2>
                  <p className="section-subtitle">Hand-crafted itineraries that take you deep into Pakistan's mountains, history, and culture.</p>
                </div>
                <div className="tours-grid">
                  {TOUR_PACKAGES.slice(0, 2).map(pkg => (
                    <div key={pkg.id} className="tour-card" onClick={() => navigate("tours")}>
                      <div className="tour-card-img-wrap">
                        <img src={pkg.image} alt={pkg.title} className="tour-card-img" loading="lazy" referrerPolicy="no-referrer" />
                        <span className="tour-card-badge">{pkg.badge}</span>
                      </div>
                      <div className="tour-card-body">
                        <div className="tour-card-title">{pkg.title}</div>
                        <div className="tour-card-subtitle">{pkg.subtitle}</div>
                        <div className="tour-card-footer">
                          <div>
                            <div className="tour-price">{pkg.price} <span className="tour-price-label">/ person</span></div>
                            <div className="tour-rating" style={{ marginTop: "0.3rem" }}>
                              <div className="tour-rating-stars">{[1,2,3,4,5].map(s => <IconStar key={s} />)}</div>
                              <span className="tour-rating-text">{pkg.rating}</span>
                              <span className="tour-rating-count">({pkg.reviews})</span>
                            </div>
                          </div>
                          <button className="btn-book-tour" onClick={e => { e.stopPropagation(); setShowBookModal(true); }}>Book Now</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
                  <button className="btn-primary" onClick={() => navigate("tours")}>
                    View All Tours <IconArrowRight />
                  </button>
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials-section">
              <div className="page-wrap">
                <div className="section-header" style={{ color: "#fff" }}>
                  <div className="section-eyebrow" style={{ color: "var(--gold)" }}>Traveler Reviews</div>
                  <h2 className="section-title" style={{ color: "#fff" }}>What Our <em>Explorers</em> Say</h2>
                </div>
                <div className="testimonials-grid">
                  {TESTIMONIALS.map(t => (
                    <div key={t.id} className="testimonial-card">
                      <div className="testimonial-stars">{[1,2,3,4,5].map(s => <IconStar key={s} />)}</div>
                      <p className="testimonial-text">"{t.text}"</p>
                      <div className="testimonial-author">
                        <img src={t.avatar} alt={t.name} className="testimonial-avatar" referrerPolicy="no-referrer" />
                        <div>
                          <div className="testimonial-name">{t.name}</div>
                          <div className="testimonial-loc">{t.location}</div>
                          <div className="testimonial-trip">{t.trip}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Newsletter */}
            <NewsletterBanner newsletterEmail={newsletterEmail} setNewsletterEmail={setNewsletterEmail} newsletterDone={newsletterDone} setNewsletterDone={setNewsletterDone} />
          </div>
        ) : page === "stories" || page === "destinations" ? (
          // ── STORIES / DESTINATIONS ──
          <div className="fade-in">
            <div id="stories" className="categories-bar">
              <div className="categories-inner">
                <div className="cat-pills">
                  {(page === "destinations"
                    ? ["All", "Destinations", "Culture"]
                    : CATEGORIES
                  ).map(cat => (
                    <button key={cat} onClick={() => setActiveCategory(cat)}
                      className={`cat-pill ${activeCategory === cat ? "cat-pill-active" : "cat-pill-inactive"}`}>
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="search-wrap">
                  <span className="search-icon"><IconSearch /></span>
                  <input type="search" placeholder="Search stories…" className="search-input"
                    aria-label="Search travel stories" value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
              </div>
            </div>

            <section className="blog-section">
              <div className="page-wrap">
                <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "2.5rem" }}>
                  <div>
                    <div className="section-eyebrow">{page === "destinations" ? "Destinations" : "Travel Stories"}</div>
                    <h1 className="section-title">{page === "destinations" ? <>World <em>Destinations</em></> : <>All <em>Stories</em></>}</h1>
                    <p style={{ color: "var(--smoke)", marginTop: "0.5rem", fontSize: "0.9rem" }}>
                      {filteredPosts.length} {filteredPosts.length === 1 ? "story" : "stories"} found
                    </p>
                  </div>
                </div>
                {filteredPosts.length === 0 ? (
                  <div className="empty-state">
                    <h3>No stories found</h3>
                    <p>Try a different category or search term.</p>
                  </div>
                ) : (
                  <div className="blog-grid">
                    {filteredPosts.map((post, idx) => (
                      <article key={post.id} className="post-card" onClick={() => handlePostClick(post)} style={{ animation: `fadeUp 0.5s ${idx * 0.07}s ease both` }}>
                        <div className="post-card-img-wrap">
                          <img src={post.thumb_url} alt={`${post.title} — ${post.category} travel story`} className="post-card-img" loading="lazy" referrerPolicy="no-referrer" />
                          <span className="post-card-badge">{post.category}</span>
                          <span className="post-card-read-time"><IconClock /> {post.read_time}</span>
                        </div>
                        <div className="post-meta">
                          <span>{formatDate(post.created_at)}</span>
                          <span className="post-meta-dot" />
                          <span>{post.author}</span>
                        </div>
                        <h2 className="post-title">{post.title}</h2>
                        <p className="post-excerpt">{post.excerpt}</p>
                        <div className="post-read-more">Read Story <IconArrowRight size={14} /></div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        ) : page === "tours" ? (
          // ── TOURS ──
          <div className="tours-page fade-in">
            <div className="tours-hero">
              <div className="tours-hero-content">
                <div className="section-eyebrow" style={{ color: "var(--gold)", justifyContent: "center" }}>Curated Experiences</div>
                <h1 className="section-title" style={{ color: "#fff", textAlign: "center", fontSize: "clamp(2.5rem,5vw,4rem)" }}>
                  Our <em style={{ color: "var(--gold-light)" }}>Pakistan Tour Packages</em>
                </h1>
                <p style={{ color: "rgba(255,255,255,0.6)", textAlign: "center", maxWidth: "520px", margin: "1rem auto 0", lineHeight: "1.7" }}>
                  Expert-led journeys through Pakistan's mountains, valleys, ancient cities, and coastal shores. Every detail handled, every memory guaranteed.
                </p>
              </div>
            </div>
            <section className="tours-section">
              <div className="page-wrap">
                <div className="tours-grid">
                  {TOUR_PACKAGES.map((pkg, idx) => (
                    <div key={pkg.id} className="tour-card" style={{ animation: `fadeUp 0.5s ${idx * 0.1}s ease both` }}>
                      <div className="tour-card-img-wrap">
                        <img src={pkg.image} alt={`${pkg.title} tour — SRZ Tourism`} className="tour-card-img" loading="lazy" referrerPolicy="no-referrer" />
                        <span className="tour-card-badge">{pkg.badge}</span>
                      </div>
                      <div className="tour-card-body">
                        <h2 className="tour-card-title">{pkg.title}</h2>
                        <p className="tour-card-subtitle">{pkg.subtitle}</p>
                        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
                          {["All-inclusive", "Expert guide", "Small groups"].map(f => (
                            <span key={f} style={{ background: "var(--cream-alt)", padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.68rem", fontWeight: 600, color: "var(--smoke)", letterSpacing: "0.05em" }}>{f}</span>
                          ))}
                        </div>
                        <div className="tour-card-footer">
                          <div>
                            <div className="tour-price">{pkg.price} <span className="tour-price-label">/ person</span></div>
                            <div className="tour-rating" style={{ marginTop: "0.35rem" }}>
                              <div className="tour-rating-stars">{[1,2,3,4,5].map(s => <IconStar key={s} />)}</div>
                              <span className="tour-rating-text">{pkg.rating}</span>
                              <span className="tour-rating-count">({pkg.reviews} reviews)</span>
                            </div>
                          </div>
                          <button className="btn-book-tour" onClick={() => setShowBookModal(true)}>Book Now</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "4rem", background: "var(--ink)", borderRadius: "var(--r-lg)", padding: "3rem", display: "flex", gap: "2rem", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: "1.75rem", fontWeight: 700, color: "#fff", marginBottom: "0.4rem" }}>Looking for a custom Pakistan trip?</div>
                    <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", maxWidth: "480px", lineHeight: "1.65" }}>Tell us which region calls to you — north, south, east, or west — and we'll craft a completely bespoke Pakistani itinerary just for you.</p>
                  </div>
                  <button className="btn-primary" onClick={() => setShowBookModal(true)}>Plan My Trip <IconArrowRight /></button>
                </div>
              </div>
            </section>
            <NewsletterBanner newsletterEmail={newsletterEmail} setNewsletterEmail={setNewsletterEmail} newsletterDone={newsletterDone} setNewsletterDone={setNewsletterDone} />
          </div>
        ) : page === "about" ? (
          // ── ABOUT ──
          <div className="about-page fade-in">
            <div className="about-hero">
              <div className="about-hero-inner">
                <div>
                  <div className="section-eyebrow" style={{ color: "var(--gold)" }}>Our Story</div>
                  <h1 className="section-title" style={{ color: "#fff", fontSize: "clamp(2.5rem,5vw,4rem)" }}>
                    Travel is <em style={{ color: "var(--gold-light)" }}>Our Passion</em>
                  </h1>
                  <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.8", marginTop: "1rem", fontSize: "1rem", maxWidth: "480px" }}>
                    Founded in 2013, SRZ Tourism was born from a simple belief: that Pakistan is one of the most magnificent and misunderstood countries on earth. We exist to show the world what we have always known — from the glaciers of the Karakoram to the Mughal grandeur of Lahore.
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.8", marginTop: "0.85rem", fontSize: "1rem", maxWidth: "480px" }}>
                    Over 12 years and 8,000+ travellers later, we still approach every itinerary with the same wonder that sent our founders to K2 base camp with nothing but a rucksack and a love for this country.
                  </p>
                  <button className="btn-primary" style={{ marginTop: "2rem" }} onClick={() => navigate("contact")}>
                    Get in Touch <IconArrowRight />
                  </button>
                </div>
                <img src="https://picsum.photos/seed/about-srz/900/700" alt="SRZ Tourism team on expedition" className="about-hero-img" referrerPolicy="no-referrer" />
              </div>
            </div>

            {/* Values */}
            <section className="about-values">
              <div className="page-wrap">
                <div className="section-header" style={{ textAlign: "center" }}>
                  <div className="section-eyebrow" style={{ justifyContent: "center" }}>What We Stand For</div>
                  <h2 className="section-title">Our <em>Values</em></h2>
                </div>
                <div className="values-grid">
                  {[
                    { icon: <IconGlobe />, title: "Pakistan First", text: "We are Pakistani guides showing Pakistan to the world. Every itinerary is crafted to reveal the real soul of this country — the mountain villages, ancient ruins, and warmth of people that no guidebook captures." },
                    { icon: <IconUsers />, title: "People First", text: "Small groups, personal service, genuine relationships. We limit every tour to ensure your experience is intimate and curated, never rushed or generic." },
                    { icon: <IconAward />, title: "Expert Local Knowledge", text: "Our team has trekked every major route, visited every province, and eaten at every famous dhaba. We only recommend what we have personally experienced and love." },
                  ].map(v => (
                    <div key={v.title} className="value-card">
                      <div className="value-icon">{v.icon}</div>
                      <h3 className="value-title">{v.title}</h3>
                      <p className="value-text">{v.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Team stats */}
            <section style={{ padding: "5rem 0", background: "var(--cream-alt)" }}>
              <div className="page-wrap" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2rem", textAlign: "center" }}>
                {[{ num: "12+", label: "Years of Experience" }, { num: "50+", label: "Pakistan Destinations" }, { num: "8,000+", label: "Travellers Served" }, { num: "98%", label: "5-Star Reviews" }].map(s => (
                  <div key={s.label} style={{ padding: "2rem", background: "#fff", borderRadius: "var(--r-md)", boxShadow: "var(--shadow-sm)" }}>
                    <div style={{ fontFamily: "var(--serif)", fontSize: "3rem", fontWeight: 700, color: "var(--gold)", lineHeight: 1 }}>{s.num}</div>
                    <div style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--smoke)", marginTop: "0.5rem" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials-section">
              <div className="page-wrap">
                <div className="section-header" style={{ color: "#fff" }}>
                  <div className="section-eyebrow" style={{ color: "var(--gold)" }}>Traveler Reviews</div>
                  <h2 className="section-title" style={{ color: "#fff" }}>What Our <em>Explorers</em> Say</h2>
                </div>
                <div className="testimonials-grid">
                  {TESTIMONIALS.map(t => (
                    <div key={t.id} className="testimonial-card">
                      <div className="testimonial-stars">{[1,2,3,4,5].map(s => <IconStar key={s} />)}</div>
                      <p className="testimonial-text">"{t.text}"</p>
                      <div className="testimonial-author">
                        <img src={t.avatar} alt={t.name} className="testimonial-avatar" referrerPolicy="no-referrer" />
                        <div>
                          <div className="testimonial-name">{t.name}</div>
                          <div className="testimonial-loc">{t.location}</div>
                          <div className="testimonial-trip">{t.trip}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <NewsletterBanner newsletterEmail={newsletterEmail} setNewsletterEmail={setNewsletterEmail} newsletterDone={newsletterDone} setNewsletterDone={setNewsletterDone} />
          </div>
        ) : page === "contact" ? (
          // ── CONTACT ──
          <div className="contact-page fade-in">
            <div className="contact-hero">
              <div className="section-eyebrow" style={{ color: "var(--gold)", justifyContent: "center" }}>Get In Touch</div>
              <h1 className="section-title" style={{ color: "#fff", textAlign: "center", fontSize: "clamp(2.5rem,5vw,4rem)", marginBottom: "1rem" }}>
                Let's Plan Your <em style={{ color: "var(--gold-light)" }}>Pakistan Adventure</em>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.55)", textAlign: "center", maxWidth: "500px", margin: "0 auto", lineHeight: "1.7" }}>
                Whether you're planning your first trip to Pakistan or your tenth, our expert team is here to help you create something truly unforgettable.
              </p>
            </div>
            <div className="contact-layout">
              <div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.65rem", fontWeight: 700, marginBottom: "0.5rem" }}>Contact Information</h2>
                <p style={{ color: "var(--smoke)", fontSize: "0.88rem", marginBottom: "2rem", lineHeight: "1.65" }}>Reach us through any of the channels below. We respond within 24 hours.</p>
                {[
                  { icon: <IconPhone />, label: "Phone", val: "+92 51 234 5678" },
                  { icon: <IconMail />, label: "Email", val: "hello@srztourism.com.pk" },
                  { icon: <IconPin />, label: "Office", val: "Office 12, Jinnah Super Market, F-7/2, Islamabad" },
                ].map(item => (
                  <div key={item.label} className="contact-info-item">
                    <div className="contact-icon">{item.icon}</div>
                    <div>
                      <div className="contact-info-label">{item.label}</div>
                      <div className="contact-info-val">{item.val}</div>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: "2rem" }}>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--smoke)", marginBottom: "0.85rem" }}>Follow Us</div>
                  <div style={{ display: "flex", gap: "0.6rem" }}>
                    {["IG", "TW", "FB", "YT"].map(s => (
                      <button key={s} className="social-btn" aria-label={s} style={{ background: "var(--smoke-lt)", border: "1px solid var(--border)", color: "var(--ink)" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "var(--ink)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "var(--smoke-lt)"; e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderColor = "var(--border)"; }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="contact-form-card">
                {contactDone ? (
                  <div className="form-success">
                    <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🌍</div>
                    <p style={{ fontFamily: "var(--serif)", fontSize: "1.4rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem", fontStyle: "normal" }}>Message Sent!</p>
                    <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                    <button className="btn-primary" style={{ marginTop: "1.5rem" }} onClick={() => { setContactDone(false); setContactForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}>
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit}>
                    <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>Send a Message</h3>
                    <div className="form-row">
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Full Name *</label>
                        <input className="form-input" type="text" placeholder="Sarah Jenkins" required
                          value={contactForm.name} onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Email *</label>
                        <input className="form-input" type="email" placeholder="hello@email.com" required
                          value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Phone</label>
                        <input className="form-input" type="tel" placeholder="+1 555 000 0000"
                          value={contactForm.phone} onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))} />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Subject *</label>
                        <select className="form-select"
                          value={contactForm.subject} onChange={e => setContactForm(f => ({ ...f, subject: e.target.value }))}>
                          <option value="">Select a topic</option>
                          <option>Trip Planning</option>
                          <option>Tour Packages</option>
                          <option>Custom Itinerary</option>
                          <option>General Inquiry</option>
                          <option>Partnership</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Message *</label>
                      <textarea className="form-textarea" placeholder="Tell us about your dream trip…" required
                        value={contactForm.message} onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))} />
                    </div>
                    <button type="submit" className="btn-submit">
                      <IconSend /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </main>

      {/* ── FOOTER ── */}
      {!selectedPost && (
        <footer className="footer">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">
                <div style={{ width: 36, height: 36, background: "var(--gold)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink)" }}>
                  <IconCompass />
                </div>
                <span className="footer-logo-text">SRZ <em>Tourism</em></span>
              </div>
              <p className="footer-desc">Pakistan's premier boutique travel agency — dedicated to showing the world the mountains, history, and warmth that make this country unlike anywhere else. Join 8,000+ travellers.</p>
              <div className="footer-socials">
                {["IG", "TW", "FB", "YT"].map(s => (
                  <button key={s} className="social-btn" aria-label={`SRZ Tourism on ${s}`}>{s}</button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="footer-col-title">Explore</h4>
              <div className="footer-links">
                {[{ label: "Destinations", id: "destinations" }, { label: "Travel Stories", id: "stories" }, { label: "Tour Packages", id: "tours" }, { label: "About Us", id: "about" }].map(l => (
                  <button key={l.id} className="footer-link" onClick={() => navigate(l.id)}>{l.label}</button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="footer-col-title">Company</h4>
              <div className="footer-links">
                {["Privacy Policy", "Terms of Service", "Cookie Policy", "Careers"].map(l => (
                  <a key={l} href="#" className="footer-link">{l}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="footer-col-title">Newsletter</h4>
              <p className="footer-nl-label">Travel inspiration in your inbox</p>
              {footerEmailDone ? (
                <p style={{ fontSize: "0.85rem", color: "var(--gold)", fontWeight: 600 }}>✓ You're subscribed!</p>
              ) : (
                <form className="footer-nl-form" onSubmit={(e) => { e.preventDefault(); if (footerEmail) setFooterEmailDone(true); }}>
                  <input type="email" placeholder="Email address" className="footer-nl-input" value={footerEmail} onChange={e => setFooterEmail(e.target.value)} />
                  <button type="submit" className="footer-nl-btn">Join</button>
                </form>
              )}
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 SRZ Tourism. All rights reserved.</span>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">Terms</a>
              <a href="#" className="footer-bottom-link">Cookies</a>
              <a href="#" className="footer-bottom-link">Sitemap</a>
            </div>
          </div>
        </footer>
      )}

      {/* ── BOOK TRIP MODAL ── */}
      {showBookModal && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) { setShowBookModal(false); setBookDone(false); } }}>
          <div className="modal">
            <button className="modal-close" onClick={() => { setShowBookModal(false); setBookDone(false); }}><IconX /></button>
            {bookDone ? (
              <div style={{ textAlign: "center", padding: "1rem 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✈️</div>
                <h3 className="modal-title">Booking Requested!</h3>
                <p style={{ color: "var(--smoke)", fontSize: "0.88rem", lineHeight: "1.65" }}>Thank you, {bookForm.name}! Our team will email you at {bookForm.email} within 24 hours to finalize your trip.</p>
                <button className="btn-primary" style={{ marginTop: "1.5rem" }} onClick={() => { setShowBookModal(false); setBookDone(false); setBookForm({ name: "", email: "", destination: "", dates: "", guests: "2", notes: "" }); }}>
                  Done <IconArrowRight />
                </button>
              </div>
            ) : (
              <>
                <h3 className="modal-title">Book a Trip</h3>
                <p className="modal-subtitle">Tell us about your dream adventure and we'll get back to you within 24 hours.</p>
                <form onSubmit={handleBookSubmit}>
                  <div className="form-row">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Full Name *</label>
                      <input className="form-input" type="text" placeholder="Your name" required
                        value={bookForm.name} onChange={e => setBookForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Email *</label>
                      <input className="form-input" type="email" placeholder="your@email.com" required
                        value={bookForm.email} onChange={e => setBookForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Destination *</label>
                    <select className="form-select" required value={bookForm.destination} onChange={e => setBookForm(f => ({ ...f, destination: e.target.value }))}>
                      <option value="">Select destination</option>
                      <option>Hunza & Gilgit Explorer (10 days)</option>
                      <option>K2 Base Camp Trek (21 days)</option>
                      <option>Lahore & Mohenjo-daro Heritage (7 days)</option>
                      <option>Fairy Meadows & Nanga Parbat (8 days)</option>
                      <option>Karakoram Highway Road Trip (12 days)</option>
                      <option>Skardu & Deosai Plains (9 days)</option>
                      <option>Custom Pakistan Itinerary</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Travel Dates</label>
                      <input className="form-input" type="date"
                        value={bookForm.dates} onChange={e => setBookForm(f => ({ ...f, dates: e.target.value }))} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Guests</label>
                      <select className="form-select" value={bookForm.guests} onChange={e => setBookForm(f => ({ ...f, guests: e.target.value }))}>
                        {["1","2","3","4","5","6","7","8+"].map(n => <option key={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Special Requests</label>
                    <textarea className="form-textarea" style={{ minHeight: "90px" }} placeholder="Any dietary requirements, accessibility needs, or special occasions?"
                      value={bookForm.notes} onChange={e => setBookForm(f => ({ ...f, notes: e.target.value }))} />
                  </div>
                  <button type="submit" className="btn-submit">
                    <IconSend /> Submit Request
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ─── NEWSLETTER BANNER COMPONENT ──────────────────────────────────────────
function NewsletterBanner({ newsletterEmail, setNewsletterEmail, newsletterDone, setNewsletterDone }) {
  return (
    <section className="newsletter-section">
      <div className="newsletter-inner">
        <div className="section-eyebrow" style={{ justifyContent: "center", color: "rgba(15,15,14,0.55)", marginBottom: "0.5rem" }}>Stay Inspired</div>
        <h2 className="newsletter-title">Never Miss a <em style={{ fontStyle: "italic" }}>Hidden Gem</em></h2>
        <p className="newsletter-subtitle">Join 8,000+ explorers who get our weekly stories from Pakistan's mountains, valleys, and cities — delivered to their inbox every week.</p>
        {newsletterDone ? (
          <div className="newsletter-success">🎉 Welcome to the SRZ Community!</div>
        ) : (
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); if (newsletterEmail) setNewsletterDone(true); }}>
            <input type="email" placeholder="Enter your email address" className="newsletter-input" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} required />
            <button type="submit" className="newsletter-btn"><IconSend /> Subscribe</button>
          </form>
        )}
        <p style={{ fontSize: "0.72rem", color: "rgba(15,15,14,0.45)", marginTop: "1rem" }}>No spam, ever. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
