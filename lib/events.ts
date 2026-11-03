export interface EventStage {
  number: string;
  title: string;
  description: string;
  iconName?: string;
}

export interface CoordinatorContact {
  name: string;
  phone: string;
}

export interface FestEvent {
  slug: string;
  name: string;
  tagline: string;
  theme?: string;
  description: string;
  detailedDescription?: string;
  posterImage: string;
  teamSize: number;
  genderRule?: string;
  entryFee: string;
  date: string;
  time?: string;
  venue: string;
  category: string;
  stages: EventStage[];
  rules: string[];
  keyHighlights?: string[];
  faqs: { question: string; answer: string }[];
  // Strictly event-specific: only populated if the actual poster has phone numbers!
  contacts?: CoordinatorContact[];
}

export const FEST_EVENTS: FestEvent[] = [
  {
    slug: "reel-campus",
    name: "REEL CAMPUS",
    tagline: "Frame Your Story",
    theme: "COLLEGE LIFE — Same Campus. Different Stories.",
    description: "Frame your story through the lens of creativity. Capture the spirit of campus life and transform your footage into an engaging short video.",
    detailedDescription: "Reel Campus invites creators, storytellers, and cinephiles to bring the vibrant atmosphere of NIE North Campus to life. Grab your cameras, compose your frames, and narrate your unique perspective of student memories, friendships, and campus culture.",
    posterImage: "/images/events/reel-campus.jpg",
    teamSize: 2,
    entryFee: "Free Entry",
    date: "20th Nov",
    venue: "NIE North Campus, Mysuru",
    category: "Creative & Media",
    stages: [
      {
        number: "01",
        title: "SHOOT",
        description: "Capture your story around the vibrant campus.",
        iconName: "Camera",
      },
      {
        number: "02",
        title: "EDIT",
        description: "Cut, sync, and polish your video within the allocated time.",
        iconName: "Scissors",
      },
      {
        number: "03",
        title: "SHINE",
        description: "Submit your final reel and screen it for the judges.",
        iconName: "Sparkles",
      },
    ],
    rules: [
      "Team must have exactly 2 members.",
      "Video duration must be within 2 minutes.",
      "Video must be shot on campus and edited within the given time.",
      "No AI tools should be used for editing.",
      "Judges' decision will be final.",
    ],
    faqs: [
      {
        question: "Can we use DSLR cameras?",
        answer: "Yes, both smartphones and DSLRs are permitted for capturing footage on campus.",
      },
      {
        question: "Can we use background audio or music?",
        answer: "Yes, royalty-free audio and campus ambience can be used to enrich your edit.",
      },
      {
        question: "Is AI-generated video or AI voiceover allowed?",
        answer: "No, rule 4 strictly prohibits AI tools for generation or editing to ensure authentic human creativity.",
      },
    ],
    // Reel Campus poster does NOT contain contact phone numbers.
    contacts: [],
  },
  {
    slug: "prompting-the-image",
    name: "PROMPTING THE IMAGE",
    tagline: "Imagine It. Prompt It. Create It.",
    theme: "AI Art Beyond Limits — Same Prompts, Different Worlds",
    description: "An AI image-generation challenge testing creativity, prompt-writing, and visual storytelling.",
    detailedDescription: "Step into the realm of Generative AI! Prompting The Image challenges prompt engineers and visual artists to harness AI models in real time, translating abstract themes and vivid imaginations into breath-taking visual masterpieces.",
    posterImage: "/images/events/prompting-the-image.jpg",
    teamSize: 2,
    entryFee: "Limited & Free Entry (Only 10 Teams)",
    date: "20th Nov",
    venue: "NIE North Campus, Mysuru",
    category: "Artificial Intelligence",
    stages: [
      {
        number: "01",
        title: "PROMPT WARM-UP",
        description: "A simple theme to get you started and test your prompt calibration.",
        iconName: "FileText",
      },
      {
        number: "02",
        title: "MYSTERY THEME",
        description: "A surprise creative theme to test your ingenuity under time constraints.",
        iconName: "HelpCircle",
      },
      {
        number: "03",
        title: "CREATIVE MASTERPIECE",
        description: "Create your best work with an advanced, multi-layered visual concept.",
        iconName: "Palette",
      },
    ],
    rules: [
      "Exactly 2 participants per team.",
      "Devices will be provided by the organizers.",
      "Use only one designated AI tool.",
      "No copied or pre-generated images allowed.",
      "Follow the given theme and time limit strictly.",
      "Judges' decisions are final.",
    ],
    faqs: [
      {
        question: "Do we need to bring our own laptops?",
        answer: "No, systems with designated AI tools will be provided by the department.",
      },
      {
        question: "How many teams can register?",
        answer: "This is a high-demand event strictly limited to the first 10 confirmed teams.",
      },
      {
        question: "How will prompt generation be evaluated?",
        answer: "Scoring is based on prompt engineering elegance, adherence to the surprise theme, visual detail, and storytelling depth.",
      },
    ],
    // Contact phone numbers printed explicitly on Prompting The Image poster:
    contacts: [
      { name: "Sanjay", phone: "6361779381" },
      { name: "Rajath", phone: "89046 95721" },
      { name: "Abraham", phone: "7483307037" },
    ],
  },
  {
    slug: "treasure-hunt",
    name: "TREASURE HUNT",
    tagline: "Unlock the Campus. Crack the Clues. Find the Prize.",
    theme: "It's not just a hunt... It's a journey! Clues. Quests. Teamwork. Victory.",
    description: "An adventure filled with riddles, teamwork, observation, technical challenges, and exciting campus discoveries.",
    detailedDescription: "Navigate the secrets of Shankaracharya Bhavan and NIE North Campus! The Treasure Hunt tests your mind, technical wits, collaboration, and observation across six high-intensity obstacle rounds to claim the ultimate glory.",
    posterImage: "/images/events/treasure-hunt.jpg",
    teamSize: 4,
    genderRule: "4 Members (2 Girls + 2 Boys)",
    entryFee: "Exciting Prizes Await!",
    date: "20th Nov",
    time: "To Be Announced",
    venue: "Shankaracharya Bhavan, NIE North Campus",
    category: "Adventure & Mystery",
    stages: [
      {
        number: "01",
        title: "MIND RUSH",
        description: "Think fast, think smart! Answer 20 questions in just 10 minutes.",
        iconName: "Brain",
      },
      {
        number: "02",
        title: "BUG BUSTERS",
        description: "Spot the errors, fix the code! Debug the given program and make it run.",
        iconName: "Code",
      },
      {
        number: "03",
        title: "TRUST THE TRAIL",
        description: "Close your eyes, follow the clues! Navigate with your team's guidance to reach the next spot.",
        iconName: "Compass",
      },
      {
        number: "04",
        title: "PUZZLE POP",
        description: "Pieces, logic, and teamwork! Solve the puzzle and unlock the next clue.",
        iconName: "Puzzle",
      },
      {
        number: "05",
        title: "CRIME SCENE",
        description: "Look, remember, recall! Observe the scene meticulously and answer from memory.",
        iconName: "Search",
      },
      {
        number: "06",
        title: "THE GRAND DASH",
        description: "Run, balance, solve, repeat! Overcome three obstacles to reach the key and unlock the prize.",
        iconName: "Trophy",
      },
    ],
    rules: [
      "Team must have exactly 4 members (2 girls + 2 boys as specified on the poster).",
      "Follow the given sequence of rounds without skipping.",
      "Use only the provided resources; unauthorized devices result in penalties.",
      "Maintain decorum and safety on campus grounds.",
      "Any form of malpractice will lead to immediate disqualification.",
      "Judges' decision will be final.",
    ],
    faqs: [
      {
        question: "Why is the team composition 2 girls and 2 boys?",
        answer: "This is the official fest rule designed to promote equal collaboration across diverse team cohorts.",
      },
      {
        question: "What is the reporting venue?",
        answer: "Shankaracharya Bhavan at NIE North Campus, Mysuru.",
      },
      {
        question: "Are mobile phones allowed during the hunt?",
        answer: "Round-specific instructions will indicate when devices are locked or used for clue scanning.",
      },
    ],
    // Contact phone numbers printed explicitly on Treasure Hunt poster:
    contacts: [
      { name: "Coordinator", phone: "72043 74002" },
      { name: "Coordinator", phone: "7411751633" },
    ],
  },
  {
    slug: "kairos",
    name: "KAIROS",
    tagline: "Think Fast. Solve Smart. Claim Victory.",
    theme: "Where technology meets logic, knowledge meets creativity, and every challenge tests your skills.",
    description: "Where technology meets logic, knowledge meets creativity, and every challenge tests your skills. Are you ready to rise to the challenge, outsmart your rivals, and claim your victory?",
    detailedDescription: "KAIROS represents the pinnacle of multi-disciplinary technical gaming. From high-speed trivia and deep cryptographic code breaking to mystery shadow protocols and the ultimate boss face-off, only the sharpest duos survive.",
    posterImage: "/images/events/kairos.jpg",
    teamSize: 2,
    entryFee: "Free Registration",
    date: "20th Nov",
    venue: "NIE North Campus, Mysuru",
    category: "Technical Gaming & Logic",
    stages: [
      {
        number: "01",
        title: "THE AWAKENING — TECH TRIVIA",
        description: "Format: MCQs (25 Questions). Fast-paced technical acumen and general computer science trivia.",
        iconName: "Zap",
      },
      {
        number: "02",
        title: "THE TRAINING ARC — CODE BREAKER",
        description: "Format: MCQs (25 Questions). Debugging tricky code, predicting program outputs, and solving logical puzzles.",
        iconName: "Terminal",
      },
      {
        number: "03",
        title: "THE SHADOW PROTOCOL — TECH DETECTIVE",
        description: "Mystery-solving and answer-identification. 100 questions pool, only 25 valid answers. Identify as many as possible.",
        iconName: "Eye",
      },
      {
        number: "04",
        title: "THE FINAL BOSS — ULTIMATE SHOWDOWN",
        description: "Surprise round. The nature of the ultimate challenge is revealed exclusively to the qualified finalists.",
        iconName: "Flame",
      },
    ],
    keyHighlights: [
      "4 Exciting Rounds",
      "50 MCQs across Rounds 1 & 2",
      "Code Debugging & Output Prediction",
      "Logical Puzzles",
      "100-Question Mystery Challenge (only 25 valid answers)",
      "Exclusive Surprise Final Round",
      "Ultimate Surprise Awaits Qualifiers",
    ],
    rules: [
      "Team must have exactly 2 members.",
      "Round 1 and 2 scores decide qualification for The Shadow Protocol.",
      "No external assistance or unauthorized electronic communication.",
      "Fair play and intellectual integrity are compulsory.",
      "Judges' decisions are binding and final.",
    ],
    faqs: [
      {
        question: "What programming languages are tested in Code Breaker?",
        answer: "Core algorithms, Python, C/C++, Java logic, and fundamental problem-solving paradigms.",
      },
      {
        question: "How does the entry fee work?",
        answer: "Registration for KAIROS is completely free! No entry fee is required.",
      },
      {
        question: "Can individual participants register?",
        answer: "No, KAIROS is strictly a 2-member team event.",
      },
    ],
    // Kairos poster does NOT have contact phone numbers.
    contacts: [],
  },
];

export function getEventBySlug(slug: string): FestEvent | undefined {
  return FEST_EVENTS.find((e) => e.slug === slug);
}
