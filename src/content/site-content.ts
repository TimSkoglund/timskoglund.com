export type NavItem = { label: string; href: string };
export type SocialLink = { label: string; href: string };
export type WorkItem = {
  id: string;
  title: string;
  category: string;
  videoSrc: string;
  accent: string;
};
export type ValueCard = {
  title: string;
  subtitle: string;
  copy: string;
};
export type FaqItem = {
  question: string;
  answer: string;
  actionLabel?: string;
  resources?: readonly {
    label: string;
    href: string;
    pdfSrc?: string;
    downloadName?: string;
  }[];
};
export type CareGuideContent = {
  title: string;
  intro: string;
  paragraphs: readonly string[];
};
export type ContactContent = {
  eyebrow: string;
  title: string;
  intro: string;
  email: string;
  phone: string;
  address: string;
  instagram: string;
  mapsHref: string;
  mapLabel: string;
};

export const siteContent = {
  hero: {
    title: 'Tim Skoglund',
    subtitle: 'Black and grey tattoo artist',
    lead:
      'Tatuerare i Sundsvall med studio på Björneborgsgatan 20, med fokus på black and grey, stark kontrast samt noggrant design och detaljarbete.',
    imageSrc: '/media/hero-tim-skoglund.png',
    cta: { label: 'Boka tid', href: '#contact' },
    nav: [
      { label: 'Arbeten', href: '#selected-works' },
      { label: 'Stil', href: '#style' },
      { label: 'Frågor', href: '#faq' },
      { label: 'Kontakt', href: '#contact' },
    ] satisfies NavItem[],
  },
  socialLinks: [
    { label: 'Instagram', href: 'https://www.instagram.com/timskoglund' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@timskoglund' },
  ] satisfies SocialLink[],
  works: [
    {
      id: '17963967452763340',
      title: 'Portrait Study',
      category: 'Black & grey realism',
      videoSrc: '/media/videos/17963967452763340.mp4',
      accent: 'Smoked sepia',
    },
    {
      id: '17983159844121661',
      title: 'Dark Romance',
      category: 'Fine line contrast',
      videoSrc: '/media/videos/17983159844121661.mp4',
      accent: 'Vintage steel',
    },
    {
      id: '17950348364595482',
      title: 'Sculpted Shadow',
      category: 'Black & grey contrast',
      videoSrc: '/media/videos/17950348364595482.mp4',
      accent: 'Ember sepia',
    },
    {
      id: '17962284395418103',
      title: 'Nordic Atmosphere',
      category: 'Custom composition',
      videoSrc: '/media/videos/17962284395418103.mp4',
      accent: 'Antique smoke',
    },
    {
      id: '18073093735894735',
      title: 'Dark Elegance',
      category: 'Fine line flow',
      videoSrc: '/media/videos/18073093735894735.mp4',
      accent: 'Shadow gold',
    },
    {
      id: '18029820439574946',
      title: 'Quiet Intensity',
      category: 'Portrait energy',
      videoSrc: '/media/videos/18029820439574946.mp4',
      accent: 'Soft bronze',
    },
    {
      id: '17979742172220683',
      title: 'Soft Contrast',
      category: 'Fine line shading',
      videoSrc: '/media/videos/17979742172220683.mp4',
      accent: 'Muted sepia',
    },
    {
      id: '18002578109069168',
      title: 'Elegant Flow',
      category: 'Custom composition',
      videoSrc: '/media/videos/18002578109069168.mp4',
      accent: 'Warm steel',
    },
    {
      id: '18045362146875825',
      title: 'Dark Detail',
      category: 'Precision blackwork',
      videoSrc: '/media/videos/18045362146875825.mp4',
      accent: 'Ink bronze',
    },
    {
      id: '18065251993448063',
      title: 'Layered Depth',
      category: 'Black & grey contrast',
      videoSrc: '/media/videos/18065251993448063.mp4',
      accent: 'Smoked graphite',
    },
    {
      id: '18101856142517920',
      title: 'Quiet Shadow',
      category: 'Fine line realism',
      videoSrc: '/media/videos/18101856142517920.mp4',
      accent: 'Soft ash',
    },
    {
      id: '18121595254347527',
      title: 'Sculpted Form',
      category: 'Custom black & grey',
      videoSrc: '/media/videos/18121595254347527.mp4',
      accent: 'Antique smoke',
    },
  ] satisfies WorkItem[],
  signatureValues: [
    {
      title: 'Black & Grey',
      subtitle: 'Kontrast som håller',
      copy: 'Djup, kontrast och mättade toner som ger tatueringen ett starkt uttryck, både när den är ny och efter att den har läkt.',
    },
    {
      title: 'Detaljarbete',
      subtitle: 'Precision i varje detalj',
      copy: 'Tydliga former, rena övergångar och genomarbetade detaljer som skapar balans, djup och ett motiv som håller ihop.',
    },
    {
      title: 'Design',
      subtitle: 'Utformat för dig',
      copy: 'Varje design tas fram i dialog med dig, med fokus på motiv, placering och känsla för att skapa något personligt och genomtänkt.',
    },
  ] satisfies ValueCard[],
  faq: [
  {
    question: 'Vilka skötselråd är viktigast efteråt?',
    answer:
      'Du får detaljerade eftervårdsråd på plats. Generellt gäller att hålla tatueringen ren, använda rekommenderad salva och undvika bad, bastu, sol och friktion under läkningstiden.',
    actionLabel: 'Läs fullständiga skötselråd',
  },
  {
    question: 'Vilka färger används?',
    answer:
      'Här hittar du säkerhetsinformation för de färger och produkter som används.',
    resources: [
      {
        label: 'Panthera Black Gold',
        href: '/docs/panthera-black-gold.pdf',
        pdfSrc: '/docs/panthera-black-gold.pdf',
        downloadName: 'panthera-black-gold.pdf',
      },
      {
        label: 'Panthera Dark Sumy',
        href: '/docs/panthera-dark-sumy.pdf',
        pdfSrc: '/docs/panthera-dark-sumy.pdf',
        downloadName: 'panthera-dark-sumy.pdf',
      },
      {
        label: 'Övriga produkter',
        href: 'https://supply.eaststreet.se/en/safety-data-sheet.html',
      },
    ],
  },
  {
    question: 'Vilken ålder gäller för tatuering?',
    answer:
      'Du måste ha fyllt 18 år – inga undantag. Giltig legitimation ska alltid tas med till din bokade tid.',
  },
  {
    question: 'Hur bokar jag en tid?',
    answer:
      'För snabbast svar – kontakta mig via sociala medier. Det går även bra att skicka en bokningsförfrågan via formuläret. Beskriv motiv, placering och ungefärlig storlek, och bifoga gärna referensbilder. Du får sedan återkoppling med upplägg, prisbild och nästa steg.',
  },
  {
    question: 'Hur bokar jag på bästa sätt?',
    answer:
      'Var så tydlig som möjligt i din förfrågan. Bifoga referensbilder och beskriv motiv, placering och storlek. Avsluta gärna med namn och kontaktuppgifter – det gör det enklare att ge ett träffsäkert svar direkt.',
  },
  {
    question: 'Vilken stil jobbar Tim mest med?',
    answer:
      'Fokus ligger på black and grey, realism och custommotiv – ofta i större projekt där komposition, flöde och helhet är viktigt.',
  },
  {
    question: 'Hur fungerar pris och tidsupplägg?',
    answer:
      'Mindre motiv prissätts utifrån omfattning och placering. Större projekt planeras oftast som heldag. Exakt pris ges när motiv och upplägg är tydligt definierade.',
  },
  {
    question: 'Hur förbereder jag mig inför min tid?',
    answer:
      'Se till att sova ordentligt och äta bra innan ditt besök. Ta gärna med något lätt att äta eller dricka. Känner du dig nervös eller obekväm – säg till, det är helt naturligt.',
  },
  {
    question: 'Vad bör jag tänka på innan min session?',
    answer:
      'Kom utvilad, nykter och mätt. Ta gärna med något att äta. Bekväma kläder rekommenderas.',
  },
  {
    question: 'Kan jag tatuera mig om jag är sjuk?',
    answer:
      'Nej, det rekommenderas inte. Tatuering innebär en påfrestning för kroppen, så det är bättre att boka om och komma när du är helt frisk.',
  },
  {
    question: 'Hur fungerar om- eller avbokning?',
    answer:
      'Vid förhinder, meddela så tidigt som möjligt. Sena avbokningar kan innebära att bokningsavgiften inte återbetalas.',
  },
] satisfies FaqItem[],
  careGuide: {
    title: 'Skötselråd',
    intro: 'Här hittar du kompletta eftervårdsråd för din tatuering. Du kan öppna dem här på sidan, skriva ut dem eller ladda ner dem för att ha kvar.',
    paragraphs: [
      'Behåll plasten på tatueringen tills du kommer hem och kan tvätta den. Att ta av plasten i duschen är oftast smidigast, eftersom det kan samlas sårvätska och färgrester under plasten.',
      'Tvätta tatueringen med ljummet vatten och en mild tvål. Badda den försiktigt torr med en ren handduk och låt lufttorka några minuter. Applicera därefter ett tunt lager Bepanthen-salva. Använd endast rekommenderad salva under läkningsperioden.',
      'Tvätta tatueringen morgon och kväll, eller vid behov. Smörj med ett tunt lager salva två till tre gånger per dag, eller när huden känns torr. Undvik att ta för mycket, det är bättre att smörja för lite än för mycket.',
      'Efter några dagar bildas en tunn sårskorpa som börjar torka och flagna. Det kan se ovant ut, men är helt normalt. Fortsätt smörja tills all skorpa har släppt, vilket vanligtvis tar 7-14 dagar.',
      'Klia inte på tatueringen och pilla inte bort skorpor. Det kan leda till infektioner, färgbortfall och ärrbildning.',
      'Undvik solarium, bad, bastu och träning som innebär att tatueringen kommer i kontakt med andra eller utsätts för mycket friktion. Var även försiktig med rörelser som stramar i huden samt kläder eller smycken som kan skava.',
      'När skorpan har lossnat täcks tatueringen av en tunn, känslig hud. Den ersätts successivt av normal hud under de kommande tre till fyra veckorna. Under denna period bör du undvika stark sol.',
      'När huden är helt återställd, vanligtvis efter cirka en månad, kan du se det färdiga resultatet. Då går det också bra att använda vanlig hudkräm.',
    ],
  } satisfies CareGuideContent,
  contact: {
    eyebrow: 'Kontakt',
    title: 'Din nästa tatuering',
    intro:
      'Beskriv motiv, placering, storlek och referenser, så blir första svaret mer träffsäkert. Du hittar studion i Sundsvall på Björneborgsgatan 20A.',
    email: 'TimSkoglund@hotmail.com',
    phone: '070-261 38 53',
    address: 'Björneborgsgatan 20A, 854 60 Sundsvall',
    instagram: '@timskoglund',
    mapsHref: 'https://www.google.com/maps/search/?api=1&query=Bj%C3%B6rneborgsgatan%2020A%2C%20854%2060%20Sundsvall',
    mapLabel: 'Tim Skoglund Tattoo Studio',
  } satisfies ContactContent,
} as const;
