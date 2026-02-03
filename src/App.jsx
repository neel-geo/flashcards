import { useState, useCallback, useRef } from "react";

// ─── SENTENCE BANK ───────────────────────────────────────────────────────────
// All sentences are hand-composed for correct grammar:
//   English: natural SVO / S+adj
//   Hindi / Bengali: correct SOV word order, proper conjugation
// Each sentence has tags for anti-repeat logic.

const SENTENCES = [
  // ── PRESENT TENSE ────────────────────────────────────────────────────────
  {
    en: "I drink tea every morning.",
    hi: "मैं हर सुबह चाय पीता हूँ।",
    hiR: "main har subah chaay peeta hoon.",
    bn: "আমি প্রতি সকালে চা খাই।",
    bnR: "ami prob sokale chaa khai.",
    tags: ["present", "food", "I", "routine"],
  },
  {
    en: "She reads a book before bed.",
    hi: "वह सोने से पहले किताब पढ़ती है।",
    hiR: "vah sone se pehle kitaab padhti hai.",
    bn: "সে ঘুমানোর আগে বই পড়ে।",
    bnR: "she ghumano-r age boi pore.",
    tags: ["present", "activity", "she", "routine"],
  },
  {
    en: "They walk to the market.",
    hi: "वे बाज़ार को पैदल जाते हैं।",
    hiR: "ve bazaar ko paidel jaate hain.",
    bn: "তারা বাজারে পায়ে হেঁটে যায়।",
    bnR: "tara baajare paaye heṇte yaay.",
    tags: ["present", "movement", "they", "errand"],
  },
  {
    en: "We eat lunch together.",
    hi: "हम सब मिलकर दोपहर का खाना खाते हैं।",
    hiR: "ham sab milkar dopahr ka khaana khaate hain.",
    bn: "আমরা সবাই মিলে দুপুরের খাবার খাই।",
    bnR: "amra sabai mile dupurer khaabor khai.",
    tags: ["present", "food", "we", "social"],
  },
  {
    en: "He writes letters to his grandmother.",
    hi: "वह अपनी दादी को चिट्ठी लिखता है।",
    hiR: "vah apni daadi ko chitthi likhta hai.",
    bn: "সে তার দাদীমাকে চিঠি লেখে।",
    bnR: "she tahar daadimake chithi likhe.",
    tags: ["present", "communication", "he", "family"],
  },
  {
    en: "My sister cooks dinner.",
    hi: "मेरी बहन रात का खाना बनाती है।",
    hiR: "meri baahan raat ka khaana banaati hai.",
    bn: "আমার বোন রাতের খাবার রান্না করে।",
    bnR: "amar bon rater khaabor raanna kore.",
    tags: ["present", "food", "family", "she"],
  },
  {
    en: "The children play in the garden.",
    hi: "बच्चे बाग में खेलते हैं।",
    hiR: "bachche baag mein khelte hain.",
    bn: "বাচ্চারা বাগানে খেলে।",
    bnR: "baachara baagane khele.",
    tags: ["present", "activity", "they", "outdoors"],
  },
  {
    en: "I listen to music on the train.",
    hi: "मैं ट्रेन में गाने सुनता हूँ।",
    hiR: "main train mein gaane sunta hoon.",
    bn: "আমি ট্রেনে গান শুনি।",
    bnR: "ami trene gaan shuni.",
    tags: ["present", "travel", "I", "leisure"],
  },
  {
    en: "She takes her dog for a walk.",
    hi: "वह अपने कुत्ते को टहलने लेकर जाती है।",
    hiR: "vah apne kutte ko tahalne lekar jaati hai.",
    bn: "সে তার কুকুরকে হাঁটাতে নিয়ে যায়।",
    bnR: "she tahar kukurke haanta-te niye yaay.",
    tags: ["present", "activity", "she", "pets", "outdoors"],
  },
  {
    en: "He buys vegetables at the market.",
    hi: "वह बाज़ार में सब्ज़ियाँ खरीदता है।",
    hiR: "vah bazaar mein sabziyaan khareedhta hai.",
    bn: "সে বাজারে সবজি কেনে।",
    bnR: "she baajare sobji kene.",
    tags: ["present", "errand", "he", "food"],
  },
  {
    en: "We study Hindi together.",
    hi: "हम मिलकर हिन्दी पढ़ते हैं।",
    hiR: "ham milkar hindi padhte hain.",
    bn: "আমরা মিলে হিন্দি পড়ি।",
    bnR: "amra mile hindi pori.",
    tags: ["present", "learning", "we", "language"],
  },
  {
    en: "The teacher explains the lesson.",
    hi: "शिक्षक पाठ समझाता है।",
    hiR: "shikshak paath samajhaata hai.",
    bn: "শিক্ষক পাঠ বোঝান।",
    bnR: "shikkhok paath bozhan.",
    tags: ["present", "learning", "activity"],
  },

  // ── PAST TENSE ───────────────────────────────────────────────────────────
  {
    en: "I ate rice for lunch yesterday.",
    hi: "मैंने कल दोपहर में चावल खाया।",
    hiR: "maine kal dopahr mein chaawal khaaya.",
    bn: "আমি গতকাল দুপুরে ভাত খেয়েছি।",
    bnR: "ami gotakal dupure bhaat kheyechi.",
    tags: ["past", "food", "I", "routine"],
  },
  {
    en: "She found her keys under the table.",
    hi: "उसने मेज़ के नीचे अपनी चाबियाँ मिलीं।",
    hiR: "usne mez ke neeche apni chaabiyaan milin.",
    bn: "সে টেবিলের নিচে তার চাবি পেয়েছে।",
    bnR: "she tebiler niche tahar chaabi peyechi.",
    tags: ["past", "errand", "she", "home"],
  },
  {
    en: "They watched a movie last night.",
    hi: "कल रात उन्होंने एक फिल्म देखी।",
    hiR: "kal raat unhonne ek film dekhi.",
    bn: "গত রাতে তারা একটি সিনেমা দেখেছে।",
    bnR: "got raate tara ekti cinema dekheche.",
    tags: ["past", "leisure", "they", "evening"],
  },
  {
    en: "We visited the temple last week.",
    hi: "पिछले हफ़्ते हमने मन्दिर देखा।",
    hiR: "picchle hafte hamne mandir dekha.",
    bn: "গত সপ্তাহে আমরা মন্দির গিয়েছিলাম।",
    bnR: "got soptahe amra mondir giyechilaama.",
    tags: ["past", "travel", "we", "culture"],
  },
  {
    en: "He remembered his childhood home.",
    hi: "उसे बचपन का घर याद आया।",
    hiR: "use bachpan ka ghar yaad aaya.",
    bn: "তার শৈশবের বাড়ির কথা মনে হয়েছে।",
    bnR: "tahar shoishober baari-r kotha mone hoyeche.",
    tags: ["past", "emotion", "he", "memory"],
  },
  {
    en: "My mother made a special curry.",
    hi: "मेरी मा ने एक खास करी बनाई।",
    hiR: "meri maa ne ek khaas curry banaai.",
    bn: "আমার মা একটি বিশেষ তরকারি করেছেন।",
    bnR: "amar maa ekti bishesh torkari korechen.",
    tags: ["past", "food", "family", "home"],
  },
  {
    en: "She wrote a letter to her friend.",
    hi: "उसने अपने दोस्त को एक चिट्ठी लिखी।",
    hiR: "usne apne dost ko ek chitthi likhi.",
    bn: "সে তার বন্ধুকে একটি চিঠি লিখেছে।",
    bnR: "she tahar bondhu-ke ekti chithi likheche.",
    tags: ["past", "communication", "she", "social"],
  },
  {
    en: "The train arrived ten minutes late.",
    hi: "ट्रेन दस मिनट देर से आई।",
    hiR: "train das minat der se aai.",
    bn: "ট্রেন দশ মিনিট দেরি করে এসেছে।",
    bnR: "train dosh minitl deri kore eche.",
    tags: ["past", "travel", "routine"],
  },
  {
    en: "I forgot my umbrella at home.",
    hi: "मैं छाता घर पर भूल गया।",
    hiR: "main chhaata ghar par bhool gaya.",
    bn: "আমি ছাতা বাড়িতে ভুলে গেছি।",
    bnR: "ami chhaata baari-te bhule gechi.",
    tags: ["past", "routine", "I", "home"],
  },
  {
    en: "They enjoyed the sunset at the beach.",
    hi: "उन्होंने समुद्र तट पर सूर्यास्त का आनंद लिया।",
    hiR: "unhonne samudra tat par suryaast ka aanand liya.",
    bn: "তারা সমুদ্র সৈকতে সূর্যাস্ত উপভোগ করেছে।",
    bnR: "tara samudro soikat-e surjaast upbhog koreche.",
    tags: ["past", "leisure", "they", "travel", "outdoors"],
  },
  {
    en: "He learned to cook from his mother.",
    hi: "उसने अपनी मा से खाना बनाना सीखा।",
    hiR: "usne apni maa se khaana banaana seekha.",
    bn: "সে তার মায়ের কাছ থেকে রান্না শিখেছে।",
    bnR: "she tahar maayer kaach tok-e raanna shikeche.",
    tags: ["past", "learning", "he", "family", "food"],
  },

  // ── FUTURE TENSE ─────────────────────────────────────────────────────────
  {
    en: "I will call my brother tonight.",
    hi: "मैं आज रात अपने भाई को फ़ोन करूँगा।",
    hiR: "main aaj raat apne bhai ko phone karunga.",
    bn: "আমি আজ রাতে আমার ভাইকে ফোন করব।",
    bnR: "ami aaj raate amar bhai-ke phone korbo.",
    tags: ["future", "family", "I", "communication"],
  },
  {
    en: "She will finish her homework after dinner.",
    hi: "वह खाने के बाद अपना काम पूरा करेगी।",
    hiR: "vah khane ke baad apna kaam poora caregi.",
    bn: "সে খাওয়ার পর তার কাজ শেষ করবে।",
    bnR: "she khaao-r por tahar kaaj shesh korbe.",
    tags: ["future", "routine", "she", "study"],
  },
  {
    en: "They will travel to the mountains next month.",
    hi: "वे अगले महीने पहाड़ों पर जाएँगे।",
    hiR: "ve agle mahine pahaadon par jaayenge.",
    bn: "তারা আগামী মাসে পাহাড়ে যাবে।",
    bnR: "tara aagami maase paahare yaabe.",
    tags: ["future", "travel", "they", "outdoors"],
  },
  {
    en: "We will plant flowers in the garden.",
    hi: "हम बाग में फूल लगाएँगे।",
    hiR: "ham baag mein phool lagaayenge.",
    bn: "আমরা বাগানে ফুল লাগাব।",
    bnR: "amra baagane phul lagaabo.",
    tags: ["future", "activity", "we", "outdoors", "home"],
  },
  {
    en: "He will buy a new bicycle tomorrow.",
    hi: "वह कल एक नया साइकिल खरीदेगा।",
    hiR: "vah kal ek naya cycle kharidega.",
    bn: "সে আগামীকাল একটি নতুন সাইকেল কিনবে।",
    bnR: "she aagomikaal ekti notun saikkel kinbe.",
    tags: ["future", "errand", "he", "shopping"],
  },
  {
    en: "My friend will visit us next week.",
    hi: "मेरा दोस्त अगले हफ़्ते हमसे मिलेगा।",
    hiR: "mera dost agle hafte hamse milega.",
    bn: "আমার বন্ধু আগামী সপ্তাহে আমাদের দেখতে আসবে।",
    bnR: "amar bondhu aagami soptahe amader dekh-te asbe.",
    tags: ["future", "social", "I", "family"],
  },
  {
    en: "She will start learning Bengali soon.",
    hi: "वह जल्द बाংला सीखना शुरू करेगी।",
    hiR: "vah jald bangla seekhna shuru caregi.",
    bn: "সে শীঘ্রই বাংলা শেখা শুরু করবে।",
    bnR: "she sheeghroi bangla shekha shuru korbe.",
    tags: ["future", "learning", "she", "language"],
  },
  {
    en: "I will cook breakfast in the morning.",
    hi: "मैं सुबह नाश्ता बनाऊँगा।",
    hiR: "main subah naashta banaaunga.",
    bn: "আমি সকালে নাস্তা তৈরি করব।",
    bnR: "ami sokale naashta toyori korbo.",
    tags: ["future", "food", "I", "routine", "morning"],
  },
  {
    en: "The children will play outside after school.",
    hi: "बच्चे स्कूल के बाद बाहर खेलेंगे।",
    hiR: "bachche school ke baad baahar khelenge.",
    bn: "বাচ্চারা স্কুলের পর বাইরে খেলবে।",
    bnR: "baachara skoler por baire khelbe.",
    tags: ["future", "activity", "they", "school", "outdoors"],
  },
  {
    en: "We will meet at the café at three.",
    hi: "हम तीन बजे कैफ़े में मिलेंगे।",
    hiR: "ham teen baje cafe mein milenge.",
    bn: "আমরা তিনটায় ক্যাফেতে দেখা করব।",
    bnR: "amra tinti-ay cafe-te dekha korbo.",
    tags: ["future", "social", "we", "leisure"],
  },

  // ── ADJECTIVE / STATE SENTENCES ─────────────────────────────────────────
  {
    en: "I am feeling tired today.",
    hi: "मैं आज बहुत थका हुआ हूँ।",
    hiR: "main aaj bahut thaka hua hoon.",
    bn: "আমি আজ অনেক ক্লান্ত।",
    bnR: "ami aaj oneko klanto.",
    tags: ["state", "emotion", "I", "tired"],
  },
  {
    en: "She is very happy today.",
    hi: "वह आज बहुत खुश है।",
    hiR: "vah aaj bahut khush hai.",
    bn: "সে আজ অনেক খুশি।",
    bnR: "she aaj oneko khushi.",
    tags: ["state", "emotion", "she", "happy"],
  },
  {
    en: "They are excited about the trip.",
    hi: "वे यात्रा के बारे में बहुत उत्तेजित हैं।",
    hiR: "ve yatra ke baare mein bahut uttejit hain.",
    bn: "তারা ভ্রমণ নিয়ে অনেক উৎসাহিত।",
    bnR: "tara bhromon niye oneko utsahito.",
    tags: ["state", "emotion", "they", "travel"],
  },
  {
    en: "We are grateful for your help.",
    hi: "हम आपकी मदद के लिए बहुत धन्यवादी हैं।",
    hiR: "ham aapki madd ke liye bahut dhanyavaadi hain.",
    bn: "আমরা আপনার সাহায্যের জন্য অনেক কৃতজ্ঞ।",
    bnR: "amra aapnar saahojjer jonyo oneko kritagnya.",
    tags: ["state", "emotion", "we", "grateful"],
  },
  {
    en: "He is nervous before the exam.",
    hi: "वह परीक्षा से पहले बहुत घबराया हुआ है।",
    hiR: "vah pareeksha se pehle bahut ghbraaya hua hai.",
    bn: "সে পরীক্ষার আগে অনেক চিন্তিত।",
    bnR: "she pori-kshaar age oneko chinto.",
    tags: ["state", "emotion", "he", "study"],
  },
  {
    en: "I am proud of my family.",
    hi: "मुझे अपने परिवार पर बहुत गर्व है।",
    hiR: "mujhe apne parivar par bahut garv hai.",
    bn: "আমি আমার পরিবারকে নিয়ে অনেক গর্বিত।",
    bnR: "ami amar poriborke niye oneko gorbito.",
    tags: ["state", "emotion", "I", "family"],
  },
  {
    en: "She is curious about everything.",
    hi: "वह हर चीज़ के बारे में बहुत जिज्ञासु है।",
    hiR: "vah har cheez ke baare mein bahut jignyaasu hai.",
    bn: "সে প্রতিটি কিছু নিয়ে অনেক কৌতূহলী।",
    bnR: "she prottii kichhu niye oneko koutoholi.",
    tags: ["state", "emotion", "she", "curious"],
  },
  {
    en: "They are calm and relaxed.",
    hi: "वे बहुत शांत और आरामदेह हैं।",
    hiR: "ve bahut shaant aur aaraamdeh hain.",
    bn: "তারা অনেক শান্ত এবং আরামদায়ক।",
    bnR: "tara oneko shaanto ebong aaramdoyok.",
    tags: ["state", "emotion", "they", "calm"],
  },
  {
    en: "We are lonely without him.",
    hi: "उनके बिना हम बहुत अकेले हैं।",
    hiR: "unke bina ham bahut akele hain.",
    bn: "তাকে ছাড়া আমরা অনেক একা।",
    bnR: "taake chhaada amra oneko eka.",
    tags: ["state", "emotion", "we", "lonely"],
  },
  {
    en: "He is generous with his time.",
    hi: "वह अपने समय के बारे में बहुत उदार है।",
    hiR: "vah apne samay ke baare mein bahut udaar hai.",
    bn: "সে তার সময়ের ব্যাপারে অনেক উদার।",
    bnR: "she tahar samoy-er byapare oneko udaar.",
    tags: ["state", "emotion", "he", "generous"],
  },
];

// ─── ANTI-REPEAT LOGIC ───────────────────────────────────────────────────────
// Score candidates; penalize any tag overlap with the last N cards shown.

function scoreSentence(sentence, recentTags) {
  let penalty = 0;
  for (const tag of sentence.tags) {
    if (recentTags.has(tag)) penalty += 1;
  }
  // random jitter so we don't always pick the exact same "best" one
  return penalty - Math.random() * 0.6;
}

function pickNext(history, recentWindow = 4) {
  // collect tags from the last N sentences
  const recentTags = new Set();
  const tail = history.slice(-recentWindow);
  for (const s of tail) {
    for (const t of s.tags) recentTags.add(t);
  }

  // find the sentence with the lowest penalty score
  let best = null;
  let bestScore = Infinity;
  for (const s of SENTENCES) {
    const score = scoreSentence(s, recentTags);
    if (score < bestScore) {
      bestScore = score;
      best = s;
    }
  }
  return best;
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function FlashcardApp() {
  const [history, setHistory] = useState(() => [SENTENCES[Math.floor(Math.random() * SENTENCES.length)]]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const current = history[index];

  const goNext = useCallback(() => {
    setFlipped(false);
    setTimeout(() => {
      setHistory((prev) => {
        const slice = prev.slice(0, index + 1);
        slice.push(pickNext(slice));
        return slice;
      });
      setIndex((i) => i + 1);
    }, 180);
  }, [index]);

  const goBack = useCallback(() => {
    if (index === 0) return;
    setFlipped(false);
    setTimeout(() => setIndex((i) => i - 1), 180);
  }, [index]);

  return (
    <div style={styles.root}>
      <div style={styles.grain} />

      <header style={styles.header}>
        <div style={styles.headerInner}>
          <span style={styles.logo}>📖</span>
          <div>
            <h1 style={styles.title}>Flashcards</h1>
            <p style={styles.subtitle}>Hindi & Bengali</p>
          </div>
        </div>
        <span style={styles.counter}>{index + 1}</span>
      </header>

      {/* ── CARD ── */}
      <div style={styles.cardContainer}>
        <div style={styles.scene} onClick={() => setFlipped((f) => !f)}>
          <div
            style={{
              ...styles.cardInner,
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* FRONT */}
            <div style={{ ...styles.face, ...styles.front }}>
              <span style={styles.tapHint}>tap to reveal</span>
              <p style={styles.englishSentence}>{current.en}</p>
            </div>

            {/* BACK */}
            <div style={{ ...styles.face, ...styles.back }}>
              <div style={styles.langBlock}>
                <span style={styles.langLabel}>हिन्दी · Hindi</span>
                <p style={styles.nativeScript}>{current.hi}</p>
                <p style={styles.romanized}>{current.hiR}</p>
              </div>
              <div style={styles.divider} />
              <div style={styles.langBlock}>
                <span style={styles.langLabel}>বাংলা · Bengali</span>
                <p style={styles.nativeScript}>{current.bn}</p>
                <p style={styles.romanized}>{current.bnR}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── NAV ── */}
      <div style={styles.nav}>
        <button
          onClick={goBack}
          disabled={index === 0}
          style={{ ...styles.navBtn, opacity: index === 0 ? 0.25 : 1, cursor: index === 0 ? "default" : "pointer" }}
          aria-label="Previous"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M17 6L9 14l8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button style={styles.flipBtn} onClick={() => setFlipped((f) => !f)}>
          {flipped ? "Show English" : "Show Translation"}
        </button>

        <button onClick={goNext} style={styles.navBtn} aria-label="Next">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M11 6l8 8-8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0f1117",
    color: "#e8e4df",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Georgia', serif",
    position: "relative",
    overflow: "hidden",
    padding: "0 16px",
  },
  grain: {
    position: "fixed",
    inset: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
    pointerEvents: "none",
    zIndex: 1,
  },
  header: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: 480,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "28px 8px 12px",
  },
  headerInner: { display: "flex", alignItems: "center", gap: 12 },
  logo: { fontSize: 28 },
  title: { margin: 0, fontSize: 20, fontWeight: 400, letterSpacing: "0.04em", color: "#e8e4df" },
  subtitle: { margin: "2px 0 0", fontSize: 13, color: "#7a756e", fontStyle: "italic" },
  counter: {
    fontSize: 13, color: "#7a756e", background: "rgba(255,255,255,0.06)",
    padding: "4px 12px", borderRadius: 20, letterSpacing: "0.05em",
  },
  cardContainer: { position: "relative", zIndex: 2, width: "100%", maxWidth: 480, marginTop: 24 },
  scene: { width: "100%", height: 280, cursor: "pointer", perspective: 1200 },
  cardInner: {
    width: "100%", height: "100%", position: "relative",
    transformStyle: "preserve-3d", transition: "transform 0.55s cubic-bezier(.4,0,.2,1)",
  },
  face: {
    position: "absolute", inset: 0, backfaceVisibility: "hidden", borderRadius: 20,
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    padding: 32, boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
  },
  front: { background: "linear-gradient(145deg, #1e2028 0%, #16171a 100%)", border: "1px solid rgba(255,255,255,0.07)" },
  back: {
    background: "linear-gradient(145deg, #1a1c24 0%, #141618 100%)",
    border: "1px solid rgba(255,255,255,0.07)", transform: "rotateY(180deg)", gap: 12,
  },
  tapHint: { fontSize: 12, color: "#7a756e", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "sans-serif" },
  englishSentence: { margin: "12px 0", fontSize: 26, fontWeight: 400, textAlign: "center", lineHeight: 1.35, color: "#ede8e1" },
  langBlock: { display: "flex", flexDirection: "column", alignItems: "center", width: "100%" },
  langLabel: { fontSize: 11, color: "#c4956a", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 6 },
  nativeScript: { margin: "0 0 4px", fontSize: 22, textAlign: "center", lineHeight: 1.4, color: "#ede8e1" },
  romanized: { margin: 0, fontSize: 14, color: "#9a9590", fontStyle: "italic", textAlign: "center", lineHeight: 1.3 },
  divider: { width: 48, height: 1, background: "rgba(255,255,255,0.1)", margin: "4px 0" },
  nav: { position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginTop: 36 },
  navBtn: {
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 14, width: 52, height: 52, display: "flex", alignItems: "center",
    justifyContent: "center", color: "#e8e4df", cursor: "pointer", transition: "background 0.2s",
  },
  flipBtn: {
    background: "linear-gradient(135deg, #c4956a, #a07248)", border: "none", borderRadius: 14,
    padding: "12px 24px", color: "#fff", fontSize: 14, fontFamily: "sans-serif",
    letterSpacing: "0.04em", cursor: "pointer", fontWeight: 500,
    boxShadow: "0 4px 18px rgba(192,149,106,0.3)", transition: "transform 0.15s",
  },
};
