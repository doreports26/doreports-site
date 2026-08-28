export interface Article {
  id?: number | string;
  slug: string;
  title: string;
  date: string;
  image: string;
  tag?: string;
  author?: string;
  snippet?: string;
  content?: string;
  highlight?: boolean;
}

const mockContent = `
  ही बातमीची सविस्तर माहिती आहे. या भागात बातमीचा सारांश किंवा महत्त्वाचे मुद्दे दिले जातील जे वाचकांना संपूर्ण बातमी वाचण्यासाठी प्रवृत्त करतील.

  नवीन माहितीनुसार, यावर लवकरच योग्य ती कारवाई केली जाईल अशी अपेक्षा आहे. संबंधित अधिकाऱ्यांनी याबद्दल माहिती दिली असून पुढील काही दिवसांत याबाबत अधिकृत घोषणा होण्याची शक्यता आहे. नागरिकांनी अफवांवर विश्वास ठेवू नये आणि अधिकृत माहितीची वाट पाहावी.
  
  या विषयावर अधिक माहिती मिळवण्यासाठी आमच्या वेबसाइटला भेट देत राहा. आम्ही तुम्हाला वेळोवेळी अपडेट देत राहू.
`;

export const mainStory: Article = {
  slug: "gold-rate-drop-today",
  title: "सोन्याच्या दरात घसरण! जाणून घ्या आजचे दर",
  date: "August 26, 2026",
  image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1470&auto=format&fit=crop",
  tag: "Do Reports",
  author: "Sonal.K",
  snippet: "Gold Rate | गेल्या काही दिवसांपासून सोने आणि चांदीच्या किमतीत वाढीचा कल पाहायला मिळत होता. मात्र, 26 ऑगस्ट रोजी जळगावच्या...",
  content: mockContent
};

export const topStories: Article[] = [
  {
    slug: "rakshabandhan-ladki-bahin-yojana-update",
    title: "रक्षाबंधनाला लाडक्या बहिणींना लागली लॉटरी! खात्यात जमा होणार रक्कम; जाणून घ्या नवी अपडेट",
    date: "August 26, 2026",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1469&auto=format&fit=crop",
    content: mockContent,
    author: "Sonal.K"
  },
  {
    slug: "mhada-pune-lottery-4462-houses",
    title: "पुण्यात घर खरेदीची सर्वात मोठी संधी! म्हाडाची 4,462 घरांची सोडत जाहीर",
    date: "August 25, 2026",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1373&auto=format&fit=crop",
    tag: "म्हाडा",
    content: mockContent,
    author: "Sonal.K"
  },
  {
    slug: "maharashtra-rain-yellow-alert-11-districts",
    title: "आज राज्यात पाऊस हजेरी लावणार; 'या' 11 जिल्ह्यांना यलो अलर्ट जारी",
    date: "August 25, 2026",
    image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1287&auto=format&fit=crop",
    tag: "हवामान",
    content: mockContent,
    author: "Sonal.K"
  },
  {
    slug: "hyundai-cars-price-hike-september",
    title: "गाडी घेणाऱ्यांसाठी मोठा झटका! 1 सप्टेंबरपासून Hyundai कारच्या किमती वाढणार",
    date: "August 24, 2026",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1470&auto=format&fit=crop",
    content: mockContent,
    author: "Sonal.K"
  }
];

export const politicsStories: Article[] = [
  {
    slug: "rahul-gandhi-police-protest",
    title: "राहुल गांधींचा पोलिसांवर गंभीर आरोप; थेट पोलीस स्टेशनबाहेरच मांडला ठिय्या!",
    date: "August 21, 2026",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1459&auto=format&fit=crop",
    content: mockContent,
    author: "Sonal.K"
  },
  {
    slug: "shweta-tiwari-raj-thackeray-issue",
    title: "मराठी माणसाच्या 'त्या' वर्तनावर श्वेता तिवारी भडकली! थेट राज ठाकरेंना केला सवाल",
    date: "August 21, 2026",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1470&auto=format&fit=crop",
    content: mockContent,
    author: "Sonal.K"
  }
];

export const entertainmentStories: Article[] = [
  {
    slug: "kartik-aaryan-accident",
    title: "शूटिंगदरम्यान भीषण अपघात! कार्तिक आर्यन गंभीर जखमी; नेमकं काय घडलं?",
    date: "August 19, 2026",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1325&auto=format&fit=crop",
    content: mockContent,
    author: "Sonal.K"
  },
  {
    slug: "young-actress-engagement",
    title: "धुरंधर फेम अभिनेत्रीचा अवघ्या 23 व्या वर्षी साखरपुडा? पहा कोण आहे तिचा जोडीदार",
    date: "August 19, 2026",
    image: "https://images.unsplash.com/photo-1522856339183-5a70f0e0efc8?q=80&w=1374&auto=format&fit=crop",
    tag: "Exclusive",
    content: mockContent,
    author: "Sonal.K"
  }
];

export const webStories: Article[] = [
  {
    slug: "karishma-kapoor-revelation",
    title: "\"हनिमूनच्या रात्री नवऱ्याने मला मित्रासोबत झोपायला\"; करिश्मा कपूरचा गौप्यस्फोट!",
    date: "April 12, 2025",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop",
    content: mockContent,
    author: "Sonal.K"
  },
  {
    slug: "career-success-tips",
    title: "'या' 5 गोष्टी केल्यानंतर तुम्हाला करिअरमध्ये मिळेल यश!",
    date: "October 17, 2024",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1288&auto=format&fit=crop",
    content: mockContent,
    author: "Sonal.K"
  },
  {
    slug: "night-habits-for-couples",
    title: "रात्री झोपण्यापूर्वी नवरा-बायकोने कराव्यात 'या' गोष्टी, कधीच होणार नाही भांडण",
    date: "October 14, 2024",
    image: "https://images.unsplash.com/photo-1606902641753-2705f1df6dc9?q=80&w=1287&auto=format&fit=crop",
    content: mockContent,
    author: "Sonal.K"
  },
  {
    slug: "navratri-green-color-importance",
    title: "नवरात्रीतील हिरव्या रंगाचं महत्त्व तुम्हाला माहिती आहे का?",
    date: "October 4, 2024",
    image: "https://images.unsplash.com/photo-1596700676451-f7620a8c2789?q=80&w=1287&auto=format&fit=crop",
    content: mockContent,
    author: "Sonal.K"
  }
];

export const sportsStories: Article[] = [
  {
    slug: "kuldeep-yadav-prediction",
    title: "कुलदीप यादव तब्बल 'इतक्या' विकेट्स घेणार; 'या' पाकिस्तानी खेळाडूच भाकीत",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1467&auto=format&fit=crop",
    date: "August 20, 2026",
    content: mockContent,
    author: "Sonal.K"
  },
  {
    slug: "rohit-sharma-fans-news",
    title: "रोहित शर्माच्या चाहत्यांसाठी दिलासादायक बातमी!",
    image: "https://images.unsplash.com/photo-1593766827228-8737b4534aa6?q=80&w=1374&auto=format&fit=crop",
    date: "August 19, 2026",
    content: mockContent,
    author: "Sonal.K"
  },
  {
    slug: "delhi-capitals-player-arrested",
    title: "दिल्ली कॅपिटल्सच्या स्टार खेळाडूला अटक! जाणून घ्या नेमकं प्रकरण काय?",
    image: "https://images.unsplash.com/photo-1624526267942-ab0f0bcecb26?q=80&w=1470&auto=format&fit=crop",
    date: "August 18, 2026",
    content: mockContent,
    author: "Sonal.K"
  }
];

// Helper to get an article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  const allArticles = [
    mainStory,
    ...topStories,
    ...politicsStories,
    ...entertainmentStories,
    ...webStories,
    ...sportsStories
  ];
  return allArticles.find((a) => a.slug === slug);
}
