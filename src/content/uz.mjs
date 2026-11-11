// O‘zbekcha matnlar. HTML emas — shablon xavfsiz tarzda joylaydi.
export default {
  lang: 'uz', locale: 'uz_UZ', path: '/', base: '',
  switch: { label: 'Til', current: 'UZ', other: 'RU', otherHref: 'ru/', otherLang: 'ru', otherName: 'Русский' },

  meta: {
    title: 'Dr. Xumoyunmirzo Yoqubjonov — bolalar va kattalar neyroxirurgi, Farg‘ona',
    description: 'Neyroxirurg Xumoyunmirzo Yoqubjonov: gidrotsefaliya, spina bifida, kraniosinostoz va boshqa bosh hamda orqa miya kasalliklarini jarrohlik davolash. Bolalar va pensionerlar uchun sug‘urta asosida bepul operatsiya. Compass Hospital, Farg‘ona.',
    ogTitle: 'Dr. Xumoyunmirzo Yoqubjonov — neyroxirurg',
    ogDescription: 'Bosh va orqa miya jarrohligi. 100+ muvaffaqiyatli operatsiya, IONM apparati. Bolalar va pensionerlar uchun bepul operatsiya imkoniyati.',
    ogImage: 'assets/og-uz.jpg?v=3'
  },

  ui: { skip: 'Asosiy ma’lumotga o‘tish', menuOpen: 'Menyuni ochish', menuClose: 'Menyuni yopish', close: 'Oynani yopish', home: 'bosh sahifa', more: 'Batafsil', logoAlt: 'Shifokor logotipi' },

  brand: { line1: 'DR. XUMOYUNMIRZO', line2: 'YOQUBJONOV', role: 'NEYROXIRURG' },
  doctor: { first: 'Xumoyunmirzo', last: 'Yoqubjonov', full: 'Yoqubjonov Xumoyunmirzo Rasuljon o‘g‘li', short: 'Dr. Xumoyunmirzo Yoqubjonov', role: 'Bolalar va kattalar neyroxirurgi' },

  nav: [['#haqida', 'Shifokor'], ['#kasalliklar', 'Kasalliklar'], ['#sugurta', 'Bepul operatsiya'], ['#videolar', 'Videolar'], ['#savollar', 'Savollar'], ['#boglanish', 'Bog‘lanish']],
  cta: 'Qabulga yozilish',
  call: 'Qo‘ng‘iroq qilish',

  hero: {
    eyebrow: 'BOLALAR VA KATTALAR NEYROXIRURGI · FARG‘ONA',
    h1a: 'Bosh va orqa miya jarrohligi —',
    h1b: 'ishonchli qo‘llarda.',
    sub: 'Gidrotsefaliya, spina bifida, kraniosinostoz kabi tug‘ma nuqsonlar hamda bosh va orqa miya kasalliklarini zamonaviy jarrohlik usullari bilan davolash.',
    badgeTitle: 'Bolalar va pensionerlar uchun bepul operatsiya',
    badgeText: '18 yoshgacha bolalar va pensionerlarga ayrim operatsiyalar sug‘urta asosida bepul',
    portraitAlt: 'Neyroxirurg Xumoyunmirzo Yoqubjonov oq xalatda',
    clinic: 'Compass Hospital',
    city: 'Farg‘ona, Qomus ko‘chasi, 40-uy'
  },

  stats: [
    { count: 100, suffix: '+', label: 'muvaffaqiyatli operatsiya' },
    { count: 99, suffix: '%*', label: 'muvaffaqiyatli natija' },
    { text: 'IONM', label: 'Farg‘ona vodiysida yagona neyromonitoring' },
    { count: 4, suffix: ' yil', label: 'neyroxirurgiya amaliyoti' }
  ],
  statsNote: '* Shifokor amaliyoti statistikasi. Har bir holatda natija individual va tibbiy ko‘rsatmalarga bog‘liq.',

  conditions: {
    eyebrow: 'QAYSI HOLATLARDA MUROJAAT QILINADI',
    h2a: 'Bolalardagi tug‘ma nuqsonlar —',
    h2b: 'asosiy yo‘nalish.',
    lead: 'Kasallikni tanlang va u haqida oddiy tilda o‘qing. Davolash usuli har bir bemor uchun ko‘rik va tekshiruvlar asosida tanlanadi.',
    modalEyebrow: 'KASALLIK HAQIDA',
    whatTitle: 'Bu nima?',
    signsTitle: 'Qanday belgilar bo‘lishi mumkin?',
    treatTitle: 'Qanday davolanadi?',
    sourcePrefix: 'Manba',
    modalCta: 'Konsultatsiyaga yozilish',
    footnote: 'Ma’lumotlar tanishish uchun berilgan. Tashxis va davolash rejasi faqat shifokor ko‘rigidan keyin belgilanadi.',
    items: {
      hydrocephalus: {
        name: 'Gidrotsefaliya',
        short: 'Miyada suyuqlik ortiqcha to‘planishi, bosh hajmining tez kattalashishi.',
        what: 'Bosh miya bo‘shliqlarida (qorinchalarida) miya-orqa miya suyuqligi — likvor ortiqcha to‘planib, miya to‘qimasiga bosim o‘tkazadigan holat. Tug‘ma bo‘lishi yoki infeksiya, qon quyilishi, o‘sma sababli keyinroq rivojlanishi mumkin.',
        signs: ['Bosh hajmining odatdagidan tez kattalashishi', 'Liqildoqning taranglashib, bo‘rtib turishi', 'Ko‘zlarning pastga qarab qolishi', 'Qusish, uyquchanlik, emishdan bosh tortish', 'Bezovtalik, ba’zan tutqanoq'],
        treat: 'Ko‘pincha jarrohlik yo‘li bilan davolanadi: ortiqcha suyuqlikni chiqaruvchi shunt tizimi o‘rnatiladi yoki endoskopik usul qo‘llanadi. Usul tekshiruv natijalariga qarab tanlanadi.',
        source: ['NHS', 'https://www.nhs.uk/conditions/hydrocephalus/']
      },
      spina: {
        name: 'Spina bifida',
        short: 'Umurtqa va orqa miyaning tug‘ma nuqsoni — beldagi «qopcha».',
        what: 'Homila rivojlanishida umurtqa pog‘onasi va orqa miya to‘liq yopilmay qolishi. Og‘ir shaklida (miyelomeningotsele) belda orqa miya va uning pardalari joylashgan qopcha ko‘rinadi.',
        signs: ['Bel yoki dumg‘aza sohasidagi qopcha yoki bo‘rtma', 'Oyoqlarda harakat va sezgining susayishi', 'Siydik va ichak faoliyati nazoratining buzilishi', 'Ko‘pincha gidrotsefaliya bilan birga kechadi'],
        treat: 'Ochiq shaklida nuqson odatda tug‘ilgandan keyingi dastlabki kunlarda jarrohlik yo‘li bilan yopiladi. Operatsiya davomida IONM apparati orqa miya va nervlar faoliyatini real vaqtda kuzatib boradi.',
        source: ['NHS', 'https://www.nhs.uk/conditions/spina-bifida/']
      },
      cranio: {
        name: 'Kraniosinostoz',
        short: 'Bosh suyagi choklarining erta bitishi va bosh shaklining o‘zgarishi.',
        what: 'Chaqaloq bosh suyagidagi bir yoki bir nechta chokning vaqtidan oldin bitib qolishi. Natijada bosh noto‘g‘ri shaklda o‘sadi, ayrim hollarda miyaning o‘sishi uchun joy yetishmaydi.',
        signs: ['Boshning cho‘zinchoq, uchburchak yoki qiyshiq shakli', 'Chok bo‘ylab seziladigan qattiq qirra', 'Liqildoqning erta yopilishi', 'Katta bolalarda — bosh og‘rig‘i, qusish'],
        treat: 'Yengil hollarda kuzatuv yetarli bo‘lishi mumkin. Ko‘p hollarda bosh suyagini qayta shakllantiruvchi operatsiya bajariladi — odatda erta yoshda, miya tez o‘sayotgan davrda.',
        source: ['NHS', 'https://www.nhs.uk/conditions/craniosynostosis/']
      },
      encephalocele: {
        name: 'Ensefalotsele',
        short: 'Bosh suyagidagi nuqson orqali miya pardalarining qopchasimon chiqishi.',
        what: 'Bosh suyagidagi tug‘ma teshik orqali miya pardalari va ba’zan miya to‘qimasining tashqariga qopchasimon bo‘rtib chiqishi. Ko‘pincha ensa (bosh orqasi), ba’zan peshona va burun sohasida uchraydi.',
        signs: ['Tug‘ilganda boshda ko‘rinadigan qopcha', 'Gidrotsefaliya (suyuqlik to‘planishi) qo‘shilishi mumkin', 'Rivojlanish kechikishi, ko‘rish muammolari yoki tutqanoq'],
        treat: 'Jarrohlik yo‘li bilan davolanadi: chiqib turgan to‘qima joyiga qaytariladi yoki olib tashlanadi va bosh suyagidagi nuqson yopiladi. Operatsiya vaqti bolaning holatiga qarab belgilanadi.',
        source: ['CDC', 'https://www.cdc.gov/birth-defects/about/encephalocele.html']
      },
      cephalohematoma: {
        name: 'Kefalogematoma',
        short: 'Tug‘ruqdan keyin chaqaloq bosh suyagi ustida qon to‘planishi.',
        what: 'Tug‘ruq vaqtida chaqaloqning bosh suyagi va uni qoplab turgan parda (periost) orasida qon to‘planishi. Bo‘rtma odatda bitta suyak chegarasida bo‘ladi va choklardan o‘tmaydi.',
        signs: ['Tug‘ilgandan keyingi soat va kunlarda paydo bo‘ladigan yumshoq bo‘rtma', 'Ko‘pincha tepa suyagi sohasida', 'Uzoq saqlansa, qattiqlashishi (suyaklashishi) mumkin'],
        treat: 'Ko‘pincha bir necha hafta ichida o‘z-o‘zidan so‘riladi. Bo‘rtma katta bo‘lsa, uzoq saqlansa, qattiqlashsa yoki yallig‘lansa, neyroxirurg ko‘rigi zarur — ba’zan punksiya yoki jarrohlik muolajasi talab qilinadi.',
        source: ['J Pediatr Neurosci (PMC)', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5437793/']
      },
      cp: {
        name: 'Bolalar serebral falaji (DTsP)',
        short: 'Harakat va mushak tonusining buzilishi; ayrim hollarda jarrohlik yordam beradi.',
        what: 'Homiladorlik, tug‘ruq yoki erta go‘daklik davrida rivojlanayotgan miyaning shikastlanishi natijasida harakat, muvozanat va mushak tonusining buzilishi. Kasallik avj olmaydi, lekin belgilari bola o‘sishi bilan o‘zgarishi mumkin.',
        signs: ['O‘tirish, emaklash, yurishning kechikishi', 'Mushaklarning haddan tashqari tarangligi yoki bo‘shligi', 'Oyoq uchida yurish, noaniq harakatlar', 'Ba’zan nutq, yutish yoki ko‘rish muammolari'],
        treat: 'Asosiy davolash — reabilitatsiya: fizioterapiya, mashg‘ulotlar, dori vositalari. Ayrim bolalarda harakat yoki o‘sish muammolarini kamaytirish uchun jarrohlik amaliyotlari qo‘llanadi — moslik neyroxirurg ko‘rigida aniqlanadi.',
        source: ['NHS', 'https://www.nhs.uk/conditions/cerebral-palsy/']
      },
      cranioplasty: {
        name: 'Kranioplastika (titan to‘r)',
        short: 'Bosh suyagidagi nuqsonni titan to‘r yordamida tiklash.',
        what: 'Jarohat, oldingi operatsiya yoki tug‘ma nuqson sababli bosh suyagida qolgan bo‘shliqni yopish operatsiyasi. Titan to‘r — mustahkam, yengil va organizm bilan yaxshi moslashadigan material.',
        signsTitle: 'Qachon kerak bo‘ladi?',
        signs: ['Bosh jarohatidan keyin suyak nuqsoni qolganda', 'Miyadagi bosimni kamaytirish operatsiyasidan keyin', 'Bosh suyagining tug‘ma nuqsonlarida'],
        treat: 'To‘r bemorning bosh suyagi shakliga moslab o‘rnatiladi: miyani tashqi ta’sirdan himoya qiladi va bosh shaklini tiklaydi. Operatsiya rejasi tomografiya (MSKT) natijalari asosida tuziladi.'
      },
      tumor: {
        name: 'Bosh miya o‘smalari',
        short: 'Bolalardagi bosh miya o‘smalarini aniqlash va jarrohlik davolash.',
        what: 'Bosh miya hujayralaridan o‘sib chiqadigan yaxshi yoki yomon sifatli hosilalar. Bolalarda uchraydigan qattiq o‘smalar orasida eng ko‘p tarqalganlaridan biri.',
        signs: ['Doimiy yoki ertalab kuchayadigan bosh og‘rig‘i', 'Sababsiz takrorlanuvchi qusish', 'Muvozanat va yurishning buzilishi', 'Ko‘rishning o‘zgarishi, tutqanoq, xulq-atvor o‘zgarishi'],
        treat: 'Davolash o‘smaning turi, joylashuvi va hajmiga bog‘liq. Ko‘pincha birinchi bosqich — jarrohlik yo‘li bilan olib tashlash, keyin zarur bo‘lsa onkolog bilan birgalikda qo‘shimcha davolash.',
        source: ['NHS', 'https://www.nhs.uk/conditions/brain-tumours/']
      }
    },
    adults: {
      tag: 'Pensionerlar uchun sug‘urta',
      name: 'Kattalar neyroxirurgiyasi',
      short: 'Bosh va orqa miyaning orttirilgan kasalliklari bo‘yicha konsultatsiya va jarrohlik davolash.',
      what: 'Kattalarda bosh va orqa miya kasalliklarida neyroxirurg ko‘rigi jarrohlik zarurati bor-yo‘qligini aniqlashga yordam beradi.',
      listTitle: 'Nimalar qilinadi?',
      list: ['Shikoyatlar, kasallik tarixi va MRT/MSKT natijalari asosida konsultatsiya', 'Bosh va orqa miya patologiyalarida jarrohlik zaruratini baholash', 'Uch shoxli nerv nevralgiyasi (yuzdagi kuchli og‘riq xurujlari) kabi holatlarda jarrohlik davolash', 'Zarur bo‘lsa, boshqa mutaxassisga yo‘naltirish'],
      note: 'Pensionerlarda ayrim operatsiyalar sug‘urta asosida bepul bajarilishi mumkin. Moslik konsultatsiyada aniqlanadi.'
    }
  },

  ionm: {
    eyebrow: 'XAVFSIZLIK TEXNOLOGIYASI',
    h2a: 'Operatsiya paytida nervlar',
    h2b: 'doimiy nazoratda.',
    text: 'Intraoperatsion neyromonitoring (IONM) — operatsiya davomida orqa miya va nervlar faoliyatini real vaqtda kuzatib boruvchi apparat. Jarroh nerv tuzilmalariga yaqinlashganda u darhol signal beradi — bu asab shikastlanishi xavfini kamaytirishga xizmat qiladi.',
    points: [
      ['Real vaqtda kuzatuv', 'Nerv signallari operatsiyaning har bir bosqichida tekshiriladi'],
      ['Spina bifida operatsiyalarida', 'Orqa miya va nerv ildizlarini himoya qilish uchun qo‘llanadi'],
      ['Farg‘ona vodiysida yagona', 'Shifokor jamoasidagi zamonaviy apparat']
    ],
    monitorTitle: 'IONM · jonli',
    legend: [
      ['Free-run EMG', 'Mushaklarning kutilmagan qisqarishi va asab ta’sirlanishini doimiy ko‘rsatadi'],
      ['Triggered EMG', 'Jarroh asabni maxsus zond bilan tekshirganda paydo bo‘ladigan javob signali'],
      ['MEP · SSEP', 'Ko‘p kanalli grafiklar: har biri ma’lum mushak yoki asab guruhiga javob beradi']
    ],
    monitorStatus: 'Signal barqaror',
    monitorAria: 'Neyromonitoring ekranining animatsion ko‘rinishi'
  },

  about: {
    eyebrow: 'SHIFOKOR HAQIDA',
    h2a: 'Bilim. E’tibor.',
    h2b: 'Mas’uliyat.',
    description: 'Bolalar va kattalarning bosh miya va orqa miya kasalliklari, tug‘ma rivojlanish nuqsonlari va orttirilgan patologiyalarini jarrohlik yo‘li bilan davolaydi. Asosiy yo‘nalish — bolalar neyroxirurgiyasi.',
    education: [['BAKALAVRIAT', 'Andijon davlat tibbiyot instituti'], ['MAGISTRATURA', 'Toshkent davlat tibbiyot universiteti'], ['MALAKA OSHIRISH', 'Respublika ixtisoslashtirilgan neyroxirurgiya ilmiy-amaliy tibbiyot markazi']],
    bioSummary: 'Tarjimai hol',
    bio: '1997-yil 14-iyunda Farg‘ona viloyati, Yozyovon tumani, Xonobod qishlog‘ida tug‘ilgan. Ingliz tili bo‘yicha sertifikatga ega.',
    approachA: 'Har bir bemor —',
    approachB: 'alohida e’tibor.',
    steps: [['Tinglash', 'Shikoyatlar va kasallik tarixi'], ['Baholash', 'Tekshiruvlar va tashxis'], ['Rejalashtirish', 'Individual davolash yo‘li']]
  },

  mentor: {
    eyebrow: 'USTOZ BILAN BIRGA',
    title: 'Operatsiyalar tajribali ustoz bilan birgalikda o‘tkaziladi',
    name: 'Ashrapov Jamshid Raupovich',
    degree: 'Tibbiyot fanlari doktori (DSc), neyroxirurg',
    text: 'Toshkentdagi neyroxirurgiya markazida faoliyat yuritadi. Xumoyunmirzo Yoqubjonov operatsiyalarni ustozi bilan birgalikda o‘tkazadi.',
    facts: [['35 yil', 'jarrohlik tajribasi'], ['10 000+', 'muvaffaqiyatli operatsiya'], ['5 davlat', 'Hindiston, Koreya, Yaponiya, Rossiya, Xitoyda tajriba']],
    photoAlt: 'Neyroxirurg Ashrapov Jamshid Raupovich',
    badge: 'Ustoz · DSc'
  },

  insurance: {
    eyebrow: 'SUG‘URTA ASOSIDA DAVOLASH',
    h2a: 'Bolalar va pensionerlar uchun —',
    h2b: 'bepul operatsiya imkoniyati.',
    text: 'Ayrim neyroxirurgik operatsiyalar sug‘urta hisobidan bepul amalga oshiriladi. Holatingiz bu imkoniyatga mos kelishini konsultatsiyada aniqlashtiring.',
    groups: [
      ['BOLALAR UCHUN', '18 yoshgacha', 'Bosh va orqa miyaning tug‘ma rivojlanish nuqsonlari bo‘yicha ayrim jarrohlik amaliyotlari.'],
      ['PENSIONERLAR UCHUN', 'Tegishli operatsiyalar', 'Ayrim neyroxirurgik amaliyotlar sug‘urta dasturi doirasida qoplanadi.']
    ],
    stepsTitle: 'Qanday foydalaniladi?',
    steps: [['Ariza qoldiring', 'Saytdagi forma, telefon yoki Telegram orqali'], ['Konsultatsiya', 'Shifokor holatni va sug‘urtaga moslikni aniqlaydi'], ['Operatsiya', 'Mos kelsa — operatsiya sug‘urta hisobidan']],
    note: 'Bepul davolash tibbiy ko‘rsatmalar va sug‘urta dasturi shartlariga bog‘liq. Yakuniy moslik individual aniqlanadi.',
    cta: 'Bepul operatsiya haqida so‘rash'
  },

  videos: {
    eyebrow: 'SHIFOKOR BILAN YAQINROQ',
    h2a: 'Amaliyotdan lavhalar.',
    h2b: 'Bemorlar hikoyasi.',
    channel: 'YouTube kanaliga o‘tish',
    watch: 'YouTube’da ko‘rish',
    play: 'Videoni ko‘rish',
    type: 'Shorts',
    fallback: 'Video ochilmasa, YouTube’da ko‘ring',
    closeVideo: 'Videoni yopish',
    items: {
      b4NDqg34Xdc: ['BOLALAR NEYROXIRURGIYASI', 'Compass Hospital: bolalar neyroxirurgiyasida uchta jarrohlik'],
      MYSYdHVn7wk: ['SPINA BIFIDA', 'Farzandingiz bel sohasida qopcha bilan tug‘ilganmi?'],
      CrxFZqLHZwU: ['BEMOR HIKOYASI', 'Qoraqalpog‘istondan Farg‘onaga — farzandining salomatligi uchun'],
      fctFDoADg00: ['SUG‘URTA ASOSIDA', 'Uch shoxli nerv nevralgiyasi bo‘yicha sug‘urta asosida jarrohlik']
    }
  },

  faq: {
    eyebrow: 'KO‘P BERILADIGAN SAVOLLAR',
    h2a: 'Savollaringizga',
    h2b: 'javoblar.',
    lead: 'Javobini topa olmadingizmi? Qo‘ng‘iroq qiling yoki Telegram’da yozing.',
    items: [
      ['Operatsiya haqiqatan ham bepulmi?', '18 yoshgacha bolalarda bosh va orqa miyaning tug‘ma nuqsonlari bo‘yicha hamda pensionerlarda ayrim neyroxirurgik operatsiyalar sug‘urta hisobidan bepul bajarilishi mumkin. Aniq moslik tashxis va dastur shartlariga bog‘liq — buni konsultatsiyada aniqlaymiz.'],
      ['Konsultatsiyaga nima olib kelish kerak?', 'Mavjud MRT yoki MSKT natijalari (disk, rasmlar va xulosa), avvalgi shifokor xulosalari va ko‘chirmalar. Tekshiruv hali qilinmagan bo‘lsa ham murojaat qilavering — kerakli tekshiruvlar konsultatsiyada belgilanadi.'],
      ['Necha yoshdan operatsiya qilinadi?', 'Ayrim tug‘ma nuqsonlar (masalan, ochiq spina bifida) tug‘ilgandan keyingi dastlabki kunlarda operatsiya qilinadi, boshqalari rejali tartibda. Shuning uchun tashxis qo‘yilgan yoki shubha tug‘ilgan zahoti murojaat qilish muhim.'],
      ['Boshqa viloyatdan kelsak bo‘ladimi?', 'Ha. Farg‘onaga O‘zbekistonning turli hududlaridan, jumladan Qoraqalpog‘istondan ham bemorlar keladi. Yo‘lga chiqishdan oldin qo‘ng‘iroq qilib, qabul kunini kelishib oling.'],
      ['IONM nima uchun muhim?', 'Neyromonitoring operatsiya davomida orqa miya va nervlar faoliyatini doimiy kuzatadi. Jarroh nervga xavfli yaqinlashganini darhol biladi — bu nerv shikastlanishi xavfini kamaytirishga xizmat qiladi.'],
      ['Konsultatsiya narxi qancha?', 'Narx murojaat turi va holatga bog‘liq. Aniq ma’lumot uchun qo‘ng‘iroq qiling yoki ariza qoldiring — siz bilan bog‘lanib, barchasini tushuntiramiz.'],
      ['Qabul qachon va qayerda?', 'Compass Hospital, Farg‘ona sh., Qomus ko‘chasi, 40-uy. Qabul vaqti 09:00–18:00, kunini oldindan kelishib olish kerak.']
    ]
  },

  contact: {
    eyebrow: 'BOG‘LANISH VA QABUL',
    h2a: 'Sizni tinglashga',
    h2b: 'va yordam berishga tayyormiz.',
    callLabel: 'QO‘NG‘IROQ QILING', callHint: 'Qabul vaqtini kelishing',
    addrLabel: 'COMPASS HOSPITAL', addr: 'Farg‘ona sh., Qomus ko‘chasi, 40-uy', addrHint: 'Xaritada ochish',
    hoursLabel: 'QABUL VAQTI', hoursHint: 'Kunini oldindan kelishing',
    social: 'Ijtimoiy tarmoqlarda'
  },

  footer: {
    tagline: 'Bolalar va kattalar neyroxirurgi. Har bir bemorga mas’uliyat bilan.',
    disclaimer: 'Saytdagi ma’lumotlar tanishish uchun berilgan va shifokor ko‘rigi o‘rnini bosmaydi.',
    top: 'Yuqoriga',
    agency: 'Sayt: Ganiev Production'
  },

  mobile: { call: 'Qo‘ng‘iroq', book: 'Qabulga yozilish', telegram: 'Telegram', aria: 'Tezkor aloqa' },

  form: {
    eyebrow: 'QABUL UCHUN MUROJAAT',
    titleA: 'Qulay vaqtni', titleB: 'birga kelishamiz.',
    intro: 'Ismingiz va telefoningizni qoldiring — siz bilan bog‘lanib, qabul kuni va vaqtini kelishamiz.',
    name: 'Ismingiz', namePh: 'Ism va familiya',
    phone: 'Telefon raqamingiz', phonePh: '+998 90 123 45 67',
    group: 'Bemor', groups: [['', 'Tanlang'], ['child', 'Bola (18 yoshgacha)'], ['adult', 'Katta yoshli'], ['pensioner', 'Pensioner']],
    topic: 'Murojaat maqsadi', topics: [['consultation', 'Konsultatsiya'], ['insurance', 'Sug‘urta asosida bepul operatsiya'], ['followup', 'Takroriy ko‘rik']],
    date: 'Qulay sana', optional: 'ixtiyoriy',
    consent: 'Ismim va telefonim qabulni kelishish uchun yuborilishiga roziman.',
    submit: 'Arizani yuborish',
    note: 'Ariza qabulni avtomatik tasdiqlamaydi — siz bilan bog‘lanamiz.',
    successTitle: 'Arizangiz yuborildi.',
    successText: 'Tez orada siz bilan bog‘lanamiz. Qabul vaqti alohida tasdiqlanadi.',
    close: 'Yopish',
    footer: 'Compass Hospital · Farg‘ona, Qomus ko‘chasi, 40-uy · 09:00–18:00',
    messages: {
      preparing: 'Forma tayyorlanmoqda…',
      connect: 'Ulanish amalga oshmadi. Oynani qayta oching yoki telefon orqali bog‘laning.',
      notReady: 'Onlayn ariza qabul qilish hozir sozlanmoqda. Telefon yoki Telegram orqali bog‘laning.',
      sending: 'Yuborilmoqda…',
      sendingStatus: 'Arizangiz yuborilmoqda. Iltimos, kuting.',
      check: 'Belgilangan maydonlarni tekshiring.',
      receipt: 'Ariza raqami:',
      network: 'Ulanish uzildi. Ariza holatini tasdiqlay olmadik. Takroran yuborishdan oldin telefon orqali tekshiring.',
      refreshed: 'Forma yangilandi. Ma’lumotlaringiz saqlandi — yana yuborishingiz mumkin.',
      failed: 'Ariza yuborilmadi. Telefon orqali bog‘laning.',
      name: 'Ismingizni to‘g‘ri kiriting.',
      phone: 'Telefonni +998 XX XXX XX XX shaklida kiriting.',
      group: 'Bemorni tanlang.',
      consent: 'Ma’lumotlaringizni yuborishga rozilik bering.',
      date: 'Bugundan boshlab 90 kun ichidagi sanani tanlang.'
    }
  },
  event: {
    path: 'konsultatsiya/',
    meta: {
      title: 'Bepul konsultatsiya 15-noyabr — neyroxirurg Ashrapov J.R., Farg‘ona',
      description: '15-noyabr kuni Farg‘onada tibbiyot fanlari doktori, neyroxirurg Ashrapov Jamshid Raupovich bepul konsultatsiya o‘tkazadi. DTsP, gidrotsefaliya, ensefalotsele, kraniosinostoz va spina bifida tashxisli bolalar uchun. Onlayn ro‘yxatdan o‘ting.',
      ogTitle: '15-noyabr: Farg‘onada bepul neyroxirurg konsultatsiyasi',
      ogDescription: 'Ustoz Ashrapov J.R. (DSc, 10 000+ operatsiya) bolalarni bepul ko‘rikdan o‘tkazadi. Vaqtni onlayn band qiling.',
      ogImage: 'assets/og-event-uz.jpg?v=20261115-uz'
    },
    home: 'Asosiy sahifa',
    pill: 'YANGILIK · 15-NOYABR, YAKSHANBA',
    h1a: 'Farg‘onada bepul konsultatsiya —',
    h1b: 'ustoz Ashrapov J.R. qabul qiladi.',
    sub: 'Hindiston, Koreya, Yaponiya, Rossiya va Xitoyda malaka oshirgan, 10 000 dan ortiq jarrohlik amaliyotini muvaffaqiyatli bajargan neyroxirurg — tibbiyot fanlari doktori Ashrapov Jamshid Raupovich bolalarni bepul ko‘rikdan o‘tkazadi.',
    facts: [['i-clock', 'Sana va vaqt', '15-noyabr, yakshanba · 09:00–17:00'], ['i-pin', 'Joy', 'Compass Hospital, Farg‘ona sh., Qomus ko‘chasi, 40-uy'], ['i-shield', 'Narx', 'Bepul']],
    cta: 'Vaqtni band qilish',
    countdown: { before: 'Konsultatsiyagacha qoldi', during: 'Konsultatsiya hozir davom etmoqda', after: 'Konsultatsiya yakunlandi', d: 'kun', h: 'soat', m: 'daqiqa', s: 'soniya' },
    photoAlt: 'Neyroxirurg Ashrapov Jamshid Raupovich ish kabinetida',
    photoBadge: 'DSc · 10 000+ operatsiya',
    quote: 'Men Xumoyunmirzo, bolalar neyroxirurgiman. Ustozimiz Ashrapov Jamshid Raupovich Hindiston, Koreya, Yaponiya, Rossiya va Xitoy davlatlarida malaka oshirgan, 10 mingdan ortiq jarrohlik amaliyotini muvaffaqiyatli bajargan faxrli neyroxirurg. 15-noyabr kuni ustozimiz Farg‘ona shahrida bepul konsultatsiya o‘tkazadilar.',
    quoteAlt: 'Neyroxirurg Xumoyunmirzo Yoqubjonov',
    whoEyebrow: 'KONSULTATSIYA KIMLAR UCHUN',
    whoH2a: 'Farzandiga shu tashxislardan biri',
    whoH2b: 'qo‘yilgan oilalar uchun.',
    who: [['cp', 'DTsP', 'Bolalar serebral falaji'], ['hydrocephalus', 'Gidrotsefaliya', 'Miyada suyuqlik ortiqcha to‘planishi'], ['encephalocele', 'Ensefalotsele', 'Bosh suyagidagi nuqson orqali chiqish'], ['cranio', 'Kraniosinostoz', 'Bosh suyagi choklarining erta bitishi'], ['spina', 'Spina bifida', 'Umurtqa va orqa miyaning tug‘ma nuqsoni']],
    whoNote: 'Qabul vaqtlari soni cheklangan — 14 ta. Vaqtni oldindan band qiling.',
    mentorEyebrow: 'USTOZ HAQIDA',
    mentorFacts: [['10 000+', 'muvaffaqiyatli jarrohlik amaliyoti'], ['35 yil', 'neyroxirurgiya tajribasi'], ['5 davlat', 'Hindiston, Koreya, Yaponiya, Rossiya, Xitoyda malaka oshirgan'], ['DSc', 'tibbiyot fanlari doktori']],
    formEyebrow: 'RO‘YXATDAN O‘TISH',
    formH2a: 'Qulay vaqtni tanlang',
    formH2b: 'va ro‘yxatdan o‘ting.',
    formIntro: 'Arizangiz shifokor jamoasiga yuboriladi. Siz bilan bog‘lanib, vaqtni tasdiqlashadi.',
    bringTitle: 'O‘zingiz bilan oling',
    bring: ['Mavjud MRT yoki MSKT natijalari (disk va xulosa)', 'Shifokorlar xulosalari va ko‘chirmalar', 'Qabulga 10–15 daqiqa oldin keling'],
    name: 'Ota-ona ismi', namePh: 'Ism va familiya',
    phone: 'Telefon raqami', phonePh: '+998 90 123 45 67',
    age: 'Bolaning yoshi', ages: [['', 'Tanlang'], ['0-1', '1 yoshgacha'], ['1-3', '1–3 yosh'], ['3-7', '3–7 yosh'], ['7-18', '7–18 yosh']],
    diagnosis: 'Tashxis', diagnoses: [['', 'Tanlang'], ['cp', 'DTsP'], ['hydrocephalus', 'Gidrotsefaliya'], ['encephalocele', 'Ensefalotsele'], ['cranio', 'Kraniosinostoz'], ['spina', 'Spina bifida'], ['other', 'Boshqa / aniq emas']],
    slot: 'Qabul vaqti — 15-noyabr', slotHint: 'Tushlik: 13:00–14:00',
    consent: 'Ma’lumotlarim konsultatsiyaga yozilish uchun yuborilishiga roziman.',
    submit: 'Ro‘yxatdan o‘tish',
    note: 'Tanlangan vaqt band bo‘lib qolsa, siz bilan bog‘lanib boshqa vaqt taklif qilamiz.',
    successTitle: 'Siz ro‘yxatdan o‘tdingiz!',
    successText: 'Tez orada siz bilan bog‘lanib, vaqtni tasdiqlaymiz.',
    successWhen: '15-noyabr, {slot} · Compass Hospital, Farg‘ona sh., Qomus ko‘chasi, 40-uy',
    map: 'Xaritada ochish',
    closed: 'Bu konsultatsiyaga ro‘yxatga olish yakunlandi. Savollar bo‘lsa, qo‘ng‘iroq qiling.',
    messages: { slot: 'Qabul vaqtini tanlang.', age: 'Bolaning yoshini tanlang.' },
    banner: { tag: 'YANGILIK', title: '15-noyabr — ustoz Ashrapov J.R. bilan bepul konsultatsiya', text: 'Farg‘ona, Compass Hospital · DTsP, gidrotsefaliya, ensefalotsele, kraniosinostoz, spina bifida', cta: 'Vaqtni tanlash' },
    navLabel: 'Yangilik: bepul konsultatsiya'
  }
};
