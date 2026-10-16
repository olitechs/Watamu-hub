/**
 * Activities data model — no prices.
 *
 * Photos: each activity has exactly 4 (existing Commons photos reused where
 * possible, otherwise a clearly-marked placeholder). Placeholder images are
 * stored at public/images/activities/{slug}/{n}.jpg and labelled in alt text.
 *
 * Content is written from the existing demo descriptions plus general
 * knowledge of the Watamu/Malindi/Marafa area. Anything uncertain is marked
 * with a `// TODO verify` comment inline.
 */

export type Area = "watamu" | "malindi" | "marafa";
export type ActivityCategory = "Water" | "Nature" | "History" | "Culture" | "Adventure";

export interface ActivityPhoto {
  src: string;
  alt: string;
  caption?: string;
}

export interface Activity {
  slug: string;
  title: string;
  area: Area;
  location: string;
  category: ActivityCategory;
  intro: string;
  history: string[];
  story: string[];
  highlights: string[];
  bestTime?: string;
  duration?: string;
  photos: ActivityPhoto[]; // exactly 4
}

export const areaLabels: Record<Area, string> = {
  watamu: "Watamu",
  malindi: "Malindi",
  marafa: "Marafa",
};

export const activities: Activity[] = [
  {
    slug: "marine-park-snorkelling",
    title: "Marine Park snorkelling",
    area: "watamu",
    location: "Watamu Marine National Park",
    category: "Water",
    intro: "Drift over coral gardens inside the Watamu Marine National Park and float above shoals of reef fish in calm, clear water.",
    history: [
      "The Watamu Marine National Park was among the first marine protected areas established in Kenya, created to safeguard the fringing reefs along this stretch of coast.",
      "Coral gardens here have long been known to local fishing communities; the park gave them a formal frame and, over time, a tourism economy built around guided snorkelling and glass-bottom boat trips.",
      "Today the park is part of a larger protected seascape that includes the Watamu Marine National Reserve, where local guides and community operators run most of the visitor trips.",
    ],
    story: [
      "A typical morning starts with a short boat ride from the beach strip to the reef. The water is usually calmest before the midday breeze, and visibility is best in the cooler months.",
      "Snorkellers drift over hard and soft coral in shallow water, often with butterflyfish, surgeonfish and the occasional reef shark passing below.",
      "Most visits include gear and a local guide, and some operators combine the snorkel with a beach picnic or a stop at an island sandbank.",
    ],
    highlights: [
      "Coral gardens inside a protected marine park",
      "Guided trips with local boatmen",
      "Good visibility in calm morning conditions",
      "Suitable for confident swimmers and families",
    ],
    bestTime: "Morning, calm tide (roughly October to April)",
    duration: "About 3 hours for a boat-and-snorkel trip",
    photos: [
      { src: "/images/activities/marine-park-snorkelling/1.jpg", alt: "Snorkeller over coral in clear shallow water" },
      { src: "/images/activities/marine-park-snorkelling/2.jpg", alt: "Coloured reef fish among hard coral" },
      { src: "/images/activities/marine-park-snorkelling/3.jpg", alt: "Wooden snorkel boat at the reef edge" },
      { src: "/images/activities/marine-park-snorkelling/4.jpg", alt: "Turquoise water and white sand in the marine park" },
    ],
  },
  {
    slug: "dhow-sunset-cruise",
    title: "Dhow sunset cruise",
    area: "watamu",
    location: "Watamu Beach",
    category: "Water",
    intro: "Sail the evening breeze on a wooden dhow along the beach, with the sun dropping over the Indian Ocean and the shoreline turning gold.",
    history: [
      "Dhows are the traditional wooden sailing vessels of the East African coast, built for generations by Swahili and Arab boatbuilders using curved mast and lateen sail designs.",
      "In Watamu, dhows have always been part of the shoreline — fishing, transport and, more recently, tourist cruises that borrow the same silhouette and slow pace.",
      "A sunset cruise is now one of the classic coastal experiences here: short, unhurried, and built around the light rather than a destination.",
    ],
    story: [
      "Boards usually step on in the late afternoon, once the day's heat has softened. The dhow slips out along the beach and turns to face west as the sun lowers.",
      "On a clear evening the water catches the sky and the hull throws a long shadow; crews often serve drinks and light snacks while the light changes.",
      "Private charters are available for smaller groups who want the boat to themselves, but the shared cruise is the simplest way to see the sunset from the water.",
    ],
    highlights: [
      "Traditional wooden dhow on the Indian Ocean",
      "Sunset timing, usually one hour before dusk",
      "Option of a shared cruise or private charter",
      "Short, relaxed trip along the beach strip",
    ],
    bestTime: "Daily, about one hour before sunset",
    duration: "Around 2 hours",
    photos: [
      { src: "/images/activities/dhow-sunset-cruise/1.jpg", alt: "Wooden dhow sailing at sunset" },
      { src: "/images/activities/dhow-sunset-cruise/2.jpg", alt: "Orange sunset over the Indian Ocean" },
      { src: "/images/activities/dhow-sunset-cruise/3.jpg", alt: "Dhow silhouette against a purple sky" },
      { src: "/images/activities/dhow-sunset-cruise/4.jpg", alt: "Passengers on deck as the sun goes down" },
    ],
  },
  {
    slug: "deep-sea-fishing",
    title: "Deep-sea fishing",
    area: "watamu",
    location: "Watamu Bay",
    category: "Water",
    intro: "Blue-water trolling off the Watamu banks targets marlin, sailfish, tuna and mahi-mahi on light tackle, with a local skipper handling the boat.",
    history: [
      "Deep-sea sport fishing has been part of the Kenyan coast for decades, with Watamu's offshore banks and seasonal currents drawing pelagic species that move through the Indian Ocean.",
      "Local skippers who know the banks, birds and current lines have historically been the key to good days out — the fishing is as much about reading the water as it is about gear.",
      "Catch-and-release is common for billfish, and many boats will fillet and pack anything kept for the trip back.",
    ],
    story: [
      "A full-day trip usually leaves early, heading past the reef into deeper water where the temperature breaks and baitfish gather. Signs such as birds and surface activity often tell the skipper where to work.",
      "Tackle ranges from light trolling to heavier setups depending on the target species, and crews generally provide rods, lines and bait.",
      "A slow day can still be memorable — the boat, the sea state and the offshore horizon are the larger story most of the time.",
    ],
    highlights: [
      "Offshore trolling for billfish and tuna",
      "Local skipper familiar with the banks",
      "Gear and bait usually included",
      "Ice and water typically on board",
    ],
    bestTime: "Peaks around August to October and January to March",
    duration: "Half day or full day",
    photos: [
      { src: "/images/activities/deep-sea-fishing/1.jpg", alt: "Fishing boat heading into open water" },
      { src: "/images/activities/deep-sea-fishing/2.jpg", alt: "Angler on deck fighting a fish" },
      { src: "/images/activities/deep-sea-fishing/3.jpg", alt: "Sailfish or marlin near the boat" },
      { src: "/images/activities/deep-sea-fishing/4.jpg", alt: "Blue open ocean off the Watamu coast" },
    ],
  },
  {
    slug: "kitesurfing-lessons",
    title: "Kitesurfing lessons",
    area: "watamu",
    location: "Kite Point, north of Watamu Beach",
    category: "Water",
    intro: "Flat-water lagoons north of Watamu Beach are a friendly place to learn kitesurfing, with instructors, radio helmets and full gear for each lesson.",
    history: [
      "Kitesurfing found the Kenyan coast because of the wind and the shallow lagoons that form along parts of it, including the flats north of Watamu.",
      "The same seasonal winds that shape the coast's weather also create predictable windows for learning: the kaskazi period is the one most often cited by riders and schools.",
      "Lesson progression here is usually built around flat water first — board control and kite handling before anything more demanding.",
    ],
    story: [
      "A beginner lesson starts on land with kite control, then moves into the shallows where the water is calm enough to stand and reset.",
      "Instructors commonly use radio helmets so they can talk a rider through each run without shouting over the wind.",
      "By the third lesson many students are getting up on the board for short runs; the flat lagoons make that progression smoother than in chop or surf.",
    ],
    highlights: [
      "Flat-water lagoon learning conditions",
      "Instructors with radio helmets",
      "Full kit usually included",
      "Good option for first-timers",
    ],
    bestTime: "Around August to October, during the kaskazi winds",
    duration: "About 2 to 3 hours per lesson",
    photos: [
      { src: "/images/activities/kitesurfing-lessons/1.jpg", alt: "Kitesurfer over flat turquoise water" },
      { src: "/images/activities/kitesurfing-lessons/2.jpg", alt: "Kite in the sky above the lagoon" },
      { src: "/images/activities/kitesurfing-lessons/3.jpg", alt: "Student on a board in shallow water" },
      { src: "/images/activities/kitesurfing-lessons/4.jpg", alt: "Wind lines on the lagoon surface" },
    ],
  },
  {
    slug: "mida-creek-bird-walk",
    title: "Mida Creek bird walk",
    area: "watamu",
    location: "Mida Creek",
    category: "Nature",
    intro: "Walk the boardwalk and mangrove channels of Mida Creek with a community guide, looking for kingfishers, herons, monkeys and, in season, thousands of migrating waders.",
    history: [
      "Mida Creek is a long, sheltered inlet fringed by mangroves and backed by small settlements that have long used its channels for fishing and boat access.",
      "The creek's mangrove forest and mudflats are what make it notable for visitors: a habitat that supports both resident birds and, at certain times of year, large numbers of migrants.",
      "Community-run guiding has grown around the creek as a way to share those habitats without treating them as a spectacle — the boardwalk and boat options keep most visitors on a managed route.",
    ],
    story: [
      "A walk here usually starts on the boardwalk, which threads through the mangroves and gives access to the channels without needing a boat at first.",
      "Guides tend to point out the small things as much as the obvious ones: kingfishers dropping onto fish, herons working the shallows, monkeys moving through the canopy above.",
      "In the migration season the mudflats can host large mixed flocks of waders, and some visits add a short boat section to see the creek from the water.",
    ],
    highlights: [
      "Boardwalk and mangrove channels",
      "Community-run guiding",
      "Resident and migratory birds",
      "Optional boat section on the creek",
    ],
    bestTime: "Early morning; migrants most likely November to April",
    duration: "About 2.5 hours",
    photos: [
      { src: "/images/activities/mida-creek-bird-walk/1.jpg", alt: "Boardwalk through mangrove forest" },
      { src: "/images/activities/mida-creek-bird-walk/2.jpg", alt: "Bird perched in mangrove trees" },
      { src: "/images/activities/mida-creek-bird-walk/3.jpg", alt: "Still water of Mida Creek at low tide" },
      { src: "/images/activities/mida-creek-bird-walk/4.jpg", alt: "Mangrove roots and calm channel" },
    ],
  },
  {
    slug: "turtle-rescue-centre",
    title: "Turtle rescue centre visit",
    area: "watamu",
    location: "Turtle Bay",
    category: "Nature",
    intro: "Visit the turtle rehabilitation pools at Turtle Bay, meet recovering green and hawksbill turtles, and learn how injured turtles are treated and released.",
    history: [
      "Turtles have always been part of the Watamu coast — feeding, nesting and passing through the reefs — and the area's turtle watching grew from that regular presence on the beaches and in the water.",
      "The rehabilitation side developed in response to injured and sick turtles found along the coast, with the idea that some could be treated and returned rather than simply lost.",
      "Visiting the centre is both a look at that work and a chance to hear what nesting season looks like on these beaches, when turtles come ashore to lay.",
    ],
    story: [
      "A visit usually begins with an introduction to the turtles in the rehabilitation pools and the kinds of injuries or conditions they are being treated for.",
      "Education is part of the visit: how turtles are rescued, what the common threats are, and how release works when an animal is ready.",
      "Nesting season, roughly March to September on this coast, is when the beaches are busiest with turtles coming ashore — guides often time talks around that annual rhythm.",
    ],
    highlights: [
      "Rehabilitation pools with recovering turtles",
      "Education session about rescue and release",
      "Nesting-season talks in the season",
      "A simple, family-friendly stop",
    ],
    bestTime: "Year-round; nesting talks most relevant March to September",
    duration: "About 1.5 hours",
    photos: [
      { src: "/images/activities/turtle-rescue-centre/1.jpg", alt: "Green turtle in a rehab pool" },
      { src: "/images/activities/turtle-rescue-centre/2.jpg", alt: "Carer tending to a rescued turtle" },
      { src: "/images/activities/turtle-rescue-centre/3.jpg", alt: "Turtle swimming underwater in the pool" },
      { src: "/images/activities/turtle-rescue-centre/4.jpg", alt: "Beach where turtles come ashore to nest" },
    ],
  },
  {
    slug: "gedi-ruins-tour",
    title: "Gedi Ruins & Swahili history",
    area: "watamu",
    location: "Gedi, edge of the Arabuko-Sokoke forest",
    category: "History",
    intro: "Explore the ruins of Gedi, a once-thriving Swahili town swallowed by forest — coral-stone walls, mosques, palaces and the quiet of a town the jungle reclaimed.",
    history: [
      "Gedi was a Swahili town that flourished from around the 13th century, part of the network of stone towns that rose along the East African coast through trade.",
      "Its remains include mosques, palaces and domestic courtyards built from coral rag and lime mortar — the materials and layout of a town that once held a substantial population.",
      "At some point the town was abandoned, and the forest moved in. What visitors see today is a ruined town inside a canopy of trees, with walls and chambers half-hidden by roots and shade.",
    ],
    story: [
      "Walking into Gedi feels like entering a place that has been quietly retaken. The forest closes around the ruins and the main courtyards open up only when you step into them.",
      "The most striking parts are often the larger structures — the palace area and the mosques — where the scale of the original town still announces itself despite the collapse.",
      "A site guide helps give the stones their context: what the different buildings may have been for, how the town fit into the coast's wider history, and what the forest has done to it since.",
    ],
    highlights: [
      "Coral-stone ruins inside the forest",
      "Mosques, palaces and domestic quarters",
      "Site guide to set the history in context",
      "A short trip from Watamu",
    ],
    bestTime: "Morning, before the heat builds",
    duration: "About 3 to 4 hours",
    photos: [
      { src: "/images/activities/gedi-ruins-tour/1.jpg", alt: "Coral-stone walls of the Gedi Ruins" },
      { src: "/images/activities/gedi-ruins-tour/2.jpg", alt: "Ruined mosque under forest canopy" },
      { src: "/images/activities/gedi-ruins-tour/3.jpg", alt: "Courtyard walls overtaken by trees" },
      { src: "/images/activities/gedi-ruins-tour/4.jpg", alt: "Path through the ruins at Gedi" },
    ],
  },
  {
    slug: "arabuko-sokoke-forest-trip",
    title: "Arabuko-Sokoke forest trip",
    area: "watamu",
    location: "Arabuko-Sokoke Forest",
    category: "Nature",
    intro: "Walk East Africa's largest remaining patch of coastal forest — mahogany trails, rare forest birds and a mangrove boardwalk, often paired with a stop at the Gedi Ruins.",
    history: [
      "Arabuko-Sokoke is one of the largest remnants of the coastal forest that once ran along much of Kenya's shore, and it is now one of the most important pieces of that habitat left.",
      "The forest holds species found almost nowhere else in the same combination: birds such as the Sokoke scops owl and mammals such as the golden-rumped elephant shrew are among the reasons people come here.",
      "For visitors, the forest is also a practical pairing — it sits close enough to Gedi that the two are often done together, one for history, one for the woods.",
    ],
    story: [
      "A forest trip usually begins on the older trails, where the canopy closes overhead and the sounds are mostly birds and wind in the leaves.",
      "Guided walks focus on the species that are hard to see elsewhere: the Sokoke scops owl, the golden-rumped elephant shrew and the forest birds that give the place its reputation.",
      "Some routes include the mangrove boardwalk, which adds a different texture to the visit — the forest's edge meeting the creek in a quieter, wetter world.",
    ],
    highlights: [
      "One of the largest remaining coastal forests",
      "Specialist bird species and forest wildlife",
      "Guided walks with a forest guide",
      "Often paired with a Gedi Ruins stop",
    ],
    bestTime: "Year-round; birding is often best November to April",
    duration: "Full day",
    photos: [
      { src: "/images/activities/arabuko-sokoke-forest-trip/1.jpg", alt: "Forest path under tall canopy trees" },
      { src: "/images/activities/arabuko-sokoke-forest-trip/2.jpg", alt: "Leafy forest floor with sunlight patches" },
      { src: "/images/activities/arabuko-sokoke-forest-trip/3.jpg", alt: "Mangrove boardwalk at the forest edge" },
      { src: "/images/activities/arabuko-sokoke-forest-trip/4.jpg", alt: "Forest canopy with filtered light" },
    ],
  },
  {
    slug: "malindi-night-market",
    title: "Malindi night market",
    area: "malindi",
    location: "Malindi town centre",
    category: "Culture",
    intro: "Walk the Malindi night market after dusk for street food, fresh fruit, fabrics and the steady mix of town life that fills the streets once the day's heat breaks.",
    history: [
      "Malindi has long been one of the major towns on this stretch of coast, with a history that ties it to the Swahili trading world and to later Portuguese and colonial presence on the Kenya coast.",
      "Its market rhythms — day market, fish market, evening gatherings — reflect the same mix of fishing, trade and town life that has defined it for generations.",
      "The night market is less a single historic institution than a living piece of that rhythm: the part of town that comes alive after work and after the heat of the day.",
    ],
    story: [
      "Evenings here begin with the loosening of the day: shutters half-open, smoke from grills, the smell of fruit and the sound of people filling the space between the stores.",
      "Food is often the main draw — grilled fish, cashew nuts, fresh juice, pieces of fruit and the small snacks that make a market walk feel like a meal in motion.",
      "It is also a place to browse without much plan: bolts of cloth, phone accessories, household pieces and the kind of bargains that only exist when a market is doing what markets do.",
    ],
    highlights: [
      "Street food and fresh fruit stalls",
      "Evening town atmosphere after dusk",
      "Cloth, crafts and everyday market goods",
      "A relaxed, unhurried walk through Malindi",
    ],
    bestTime: "Evening, once the market fills after sunset",
    duration: "About 1 to 2 hours for a casual walk",
    photos: [
      { src: "/images/activities/malindi-night-market/1.jpg", alt: "Night market stalls lit at dusk" },
      { src: "/images/activities/malindi-night-market/2.jpg", alt: "Street food grills in the evening" },
      { src: "/images/activities/malindi-night-market/3.jpg", alt: "Crowd walking through a lit market" },
      { src: "/images/activities/malindi-night-market/4.jpg", alt: "Fruit and goods on night market tables" },
    ],
  },
  {
    slug: "malindi-museum-heritage",
    title: "Malindi Museum and Swahili heritage",
    area: "malindi",
    location: "Malindi old town",
    category: "History",
    intro: "Visit the Malindi Museum and the old-town landmarks that trace the coast's Swahili past — a compact way into the history that sits just off the main streets.",
    history: [
      "Malindi's older streets and nearby buildings carry the layered history of the coast: Swahili settlement, trade, outside influence and the slow reshaping of a town that has always sat at a meeting point of sea and hinterland.",
      "Small museums and heritage stops in town gather some of that story in one place — objects, rooms and exhibits that help make sense of what you walk past outside.",
      "For visitors, the point is less a single famous building than the texture of an old coastal town where history is still readable in the streets.",
    ],
    story: [
      "A visit usually starts with one of the older parts of town, where the pace drops and the buildings suggest a different century from the ones around them.",
      "The museum and nearby stops give context to that texture: what was traded, who passed through, and how the Swahili coast built its own version of town life.",
      "Done at an unhurried pace, it is a short, useful counterpoint to the beach days — a little history between the sea and the market.",
    ],
    highlights: [
      "Swahili coastal history in a compact visit",
      "Museum exhibits and old-town landmarks",
      "Close to other Malindi stops",
      "Good for a half-day excursion",
    ],
    bestTime: "Morning or late afternoon, away from the heat",
    duration: "About 1.5 to 3 hours",
    photos: [
      { src: "/images/activities/malindi-museum-heritage/1.jpg", alt: "Old building in Malindi's historic area" },
      { src: "/images/activities/malindi-museum-heritage/2.jpg", alt: "Museum room with coastal artefacts" },
      { src: "/images/activities/malindi-museum-heritage/3.jpg", alt: "Stone-walled building in old Malindi" },
      { src: "/images/activities/malindi-museum-heritage/4.jpg", alt: "Street scene in Malindi old town" },
    ],
  },
  {
    slug: "marafa-stone-forest",
    title: "Marafa's stone forest",
    area: "marafa",
    location: "Marafa Hills",
    category: "Nature",
    intro: "Walk into the Marafa Hills, where gullies and standing rock have been carved into a strange, quiet landscape of pinnacles and soft stone scored by weather.",
    history: [
      "The Marafa Hills are a striking geological feature on the coast — pinnacles and gullies formed over long periods by weathering, water and the peculiar softness of the rock here.",
      "They are often called the 'Stone Forest' because that is roughly what they look like from a distance: standing shapes and broken columns baking in the heat and shadowed in the cuts between them.",
      "For visitors, the hills are a short excursion from the coast and one of those places that feels more like a landscape than a site — the walk is the point.",
    ],
    story: [
      "The walk into the hills takes you through changing light and changing shape: open rock, sudden shade, narrow cuts in the ground and the odd postcard view of the pinnacles from above.",
      "The stone is soft enough to have been carved by time into shapes that look almost built and almost not — columns, rims, ridges and the eroded mouths of small gullies.",
      "It is a place best taken slowly. The heat, the footing and the size of the landscape all encourage the same pace: look, stop, move on, look again.",
    ],
    highlights: [
      "Pinnacles and gullies in weathered stone",
      "A landscape walk rather than a formal site",
      "Different views from different points in the hills",
      "A short trip from the Watamu and Malindi area",
    ],
    bestTime: "Morning or late afternoon, cooler and better light",
    duration: "About 1 to 2 hours for the main walk",
    photos: [
      { src: "/images/activities/marafa-stone-forest/1.jpg", alt: "Stone pinnacles in the Marafa Hills" },
      { src: "/images/activities/marafa-stone-forest/2.jpg", alt: "Gullies and columns of weathered rock" },
      { src: "/images/activities/marafa-stone-forest/3.jpg", alt: "View over the stone forest from above" },
      { src: "/images/activities/marafa-stone-forest/4.jpg", alt: "Sunlit rock shapes in the hills" },
    ],
  },
  {
    slug: "marafa-creek-boardwalk",
    title: "Marafa Creek boardwalk",
    area: "marafa",
    location: "Marafa Creek area",
    category: "Nature",
    intro: "A quieter walk along the Marafa Creek margins, where mangrove edges, mud and water make a smaller, calmer companion to the hills nearby.",
    history: [
      "The creek sides around Marafa are part of the same coastal fringe that runs through much of the area — mangrove, mudflat, shallow water and the mix of birds and animals that live in that edge world.",
      "Boardwalk-style access in places like this is usually built to let people see the habitat without flattening it, which is why these walks can feel gentler than a beach or a hill walk.",
      "For a visitor, it is an easy add-on: a quieter hour near the hills, more about still water and mangroves than about the dramatic stone above them.",
    ],
    story: [
      "The walk is mostly about slowing down. The creek side is flat, shaded in places, and full of the small movements that make a wetland readable if you are paying attention.",
      "Birds work the shallows, roots hold the banks, and the water reflects the sky in a way that changes by the minute depending on wind and cloud.",
      "It is not the headline trip of the area — the hills are — but it is a good one for anyone who wants a calmer half-hour close to the same landscape.",
    ],
    highlights: [
      "Mangrove and creek-edge habitat",
      "Quieter alternative to the hills",
      "Good for birds and still-water views",
      "Easy short walk near Marafa",
    ],
    bestTime: "Morning, when the creek is calmest",
    duration: "About 45 minutes to 1.5 hours",
    photos: [
      { src: "/images/activities/marafa-creek-boardwalk/1.jpg", alt: "Boardwalk along mangrove creek" },
      { src: "/images/activities/marafa-creek-boardwalk/2.jpg", alt: "Still water and mangrove roots" },
      { src: "/images/activities/marafa-creek-boardwalk/3.jpg", alt: "Bird standing in shallow creek water" },
      { src: "/images/activities/marafa-creek-boardwalk/4.jpg", alt: "Mangrove edge at the water line" },
    ],
  },
];

export function getActivityBySlug(slug: string): Activity | undefined {
  return activities.find((a) => a.slug === slug);
}

export function filterByArea(list: Activity[], area: Area | ""): Activity[] {
  if (!area) return list;
  return list.filter((a) => a.area === area);
}

export function activitiesForArea(area: Area): Activity[] {
  return activities.filter((a) => a.area === area);
}

export function whatsappActivityMessage(a: Activity): string {
  return `Hello Watamu Hub 👋 I'd like to ask about "${a.title}" in ${a.location}. Can you tell me more?`;
}
