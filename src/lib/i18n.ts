export type Lang = "id" | "en";

export type Duration = { minutes: number; price: number };

export type Service = {
  slug: string;
  img: string;
  imgAlt: { id: string; en: string };
  durations: Duration[];
  popular?: boolean;
  name: Record<Lang, string>;
  tagline: Record<Lang, string>;
  desc: Record<Lang, string>;
  benefits: Record<Lang, string[]>;
  includes: Record<Lang, string[]>;
};

const COMMON_INCLUDES: Record<Lang, string[]> = {
  id: [
    "Meja pijat portable & linen bersih",
    "Minyak aromaterapi pilihan Anda",
    "Konsultasi kondisi tubuh singkat",
    "Dibawa lengkap ke lokasi Anda",
  ],
  en: [
    "Portable massage table & fresh linen",
    "Aromatherapy oil of your choice",
    "Brief body-condition consultation",
    "Full setup brought to your location",
  ],
};

export const services: Service[] = [
  {
    slug: "bali-traditional",
    img: "/images/svc-bali.jpg",
    imgAlt: {
      id: "Terapis memijat punggung klien dengan bunga kamboja di rambut",
      en: "Therapist massaging client's back with frangipani flower in hair",
    },
    durations: [
      { minutes: 60, price: 250000 },
      { minutes: 90, price: 350000 },
    ],
    popular: true,
    name: {
      id: "Pijat Bali Tradisional",
      en: "Traditional Balinese Massage",
    },
    tagline: {
      id: "Teknik warisan Bali dengan minyak kelapa hangat",
      en: "Balinese heritage technique with warm coconut oil",
    },
    desc: {
      id: "Pijat amanat khas Bali — tekanan mantap dengan gerakan poret panjang dari kaki ke punggung, dibalut minyak kelapa hangat. Teknik turun-temurun ini melepaskan otot yang kaku sekaligus menenangkan sistem saraf. Pijatan paling dicari untuk pertama kali mencoba home massage.",
      en: "The signature Balinese ritual — firm pressure with long stretching strokes from legs to back, wrapped in warm coconut oil. This generations-old technique releases stiff muscles while calming the nervous system. Our most loved choice for first-timers.",
    },
    benefits: {
      id: ["Melancarkan sirkulasi darah", "Meredakan nyeri otot & pegal", "Tidur lebih nyenyak malam ini"],
      en: ["Boosts blood circulation", "Relieves muscle aches & soreness", "Deeper sleep tonight"],
    },
    includes: COMMON_INCLUDES,
  },
  {
    slug: "aromatherapy",
    img: "/images/svc-aroma.jpg",
    imgAlt: {
      id: "Suasana aromaterapi tenang dengan tirai putih",
      en: "Calming aromatherapy ambience with sheer white curtains",
    },
    durations: [
      { minutes: 60, price: 275000 },
      { minutes: 90, price: 375000 },
    ],
    name: {
      id: "Aromaterapi Relaxing",
      en: "Relaxing Aromatherapy",
    },
    tagline: {
      id: "Pijatan lembut dengan minyak esensial pilihan",
      en: "Gentle flowing massage with your chosen essential oil",
    },
    desc: {
      id: "Pijatan lembut yang mengalir dengan ritme napas Anda, menggunakan minyak esensial murni pilihan: kamboja untuk menenangkan, serai untuk menyegarkan, atau cendana untuk mengembalikan fokus. Dirancang untuk Anda yang butuh pelan-pelan saja — tanpa tekanan berlebih, hanya pelepasan.",
      en: "A gentle flowing massage that follows the rhythm of your breath, using pure essential oils of your choice: frangipani to soothe, lemongrass to refresh, or sandalwood to restore focus. Designed for when you simply need to slow down — no excessive pressure, just release.",
    },
    benefits: {
      id: ["Menurunkan stres & kecemasan", "Meredakan sakit kepala ringan", "Mood lebih ringan & jernih"],
      en: ["Lowers stress & anxiety", "Eases mild headaches", "Lighter, clearer mood"],
    },
    includes: COMMON_INCLUDES,
  },
  {
    slug: "deep-tissue",
    img: "/images/svc-deep.jpg",
    imgAlt: {
      id: "Terapis memberikan tekanan kuat pada bahu dan punggung atas",
      en: "Therapist applying firm pressure on shoulders and upper back",
    },
    durations: [
      { minutes: 60, price: 300000 },
      { minutes: 90, price: 400000 },
    ],
    popular: true,
    name: {
      id: "Deep Tissue Therapy",
      en: "Deep Tissue Therapy",
    },
    tagline: {
      id: "Tekanan kuat untuk otot yang paling keras kepala",
      en: "Firm pressure for the most stubborn muscles",
    },
    desc: {
      id: "Tekanan kuat dan terarah menembus lapisan otot terdalam untuk melepaskan simpul (knot) yang berbulan-bulan menempel. Favorit para surfer, pekerja remote yang pegang laptop seharian, dan penjelajah yang sudah berjalan jauh. Terapis kami bekerja sesuai toleransi — kuat, tapi tetap aman.",
      en: "Strong, targeted pressure that reaches the deepest muscle layers to release knots that have been stuck for months. A favorite among surfers, remote workers on laptops all day, and travelers who have walked far. Our therapists work within your tolerance — firm, but always safe.",
    },
    benefits: {
      id: ["Melepaskan knot otot kronis", "Pulihkan mobilitas & postur", "Cepat pulih setelah olahraga"],
      en: ["Releases chronic muscle knots", "Restores mobility & posture", "Speeds up sports recovery"],
    },
    includes: COMMON_INCLUDES,
  },
  {
    slug: "hot-stone",
    img: "/images/svc-stone.jpg",
    imgAlt: {
      id: "Batu vulkanik panas diletakkan di punggung dengan lilin hangat",
      en: "Warm volcanic stones placed on the back with candles glowing",
    },
    durations: [{ minutes: 90, price: 450000 }],
    name: {
      id: "Batu Panas Vulkanik",
      en: "Volcanic Hot Stone",
    },
    tagline: {
      id: "Panas alami batu Bali yang melelehkan ketegangan",
      en: "Natural stone heat that melts tension away",
    },
    desc: {
      id: "Batu vulkanik dari perut pulau Bali dipanaskan pada suhu presisi, lalu diletakkan di titik-titik energi tubuh sambil dipijat perlahan. Panasnya meresap melelehkan ketegangan di punggung dan bahu jauh lebih dalam dari pijatan biasa. Sesi 90 menit paling pampered di katalog kami.",
      en: "Volcanic stones from the belly of Bali, heated to precise temperature, placed on the body's energy points while massaged slowly. The penetrating warmth melts deep back and shoulder tension far beyond ordinary massage. Our most pampering 90-minute session.",
    },
    benefits: {
      id: ["Meredakan nyeri punggung kronis", "Melancarkan aliran energi", "Relaksasi maksimal dalam-dalam"],
      en: ["Relieves chronic back pain", "Improves energy flow", "Deepest level of relaxation"],
    },
    includes: COMMON_INCLUDES,
  },
  {
    slug: "reflexology",
    img: "/images/svc-foot.jpg",
    imgAlt: {
      id: "Pijat refleksi pada kaki dengan handuk putih bersih",
      en: "Reflexology foot massage with clean white towels",
    },
    durations: [
      { minutes: 45, price: 175000 },
      { minutes: 60, price: 225000 },
    ],
    name: {
      id: "Refleksi Kaki",
      en: "Foot Reflexology",
    },
    tagline: {
      id: "Titik refleksi kaki untuk mengembalikan energi",
      en: "Foot reflex points to restore your energy",
    },
    desc: {
      id: "Seluruh tubuh punya alamatnya di telapak kaki. Terapis kami menekan titik-titik refleksi kaki, telapak, dan betis untuk membangunkan organ yang lelah dan mengembalikan energi setelah hari penuh aktivitas — surfing, berjalan jalan, atau meeting tanpa henti. Sesi singkat, efeknya panjang.",
      en: "Your whole body has an address on the soles of your feet. Our therapists press reflex points on the feet, soles, and calves to wake up tired organs and restore energy after a full day — surfing, exploring, or back-to-back meetings. Short session, long-lasting effect.",
    },
    benefits: {
      id: ["Kaki terasa ringan kembali", "Membantu kualitas tidur", "Cocok untuk program harian"],
      en: ["Feet feel light again", "Supports better sleep", "Perfect as a daily ritual"],
    },
    includes: COMMON_INCLUDES,
  },
  {
    slug: "couple-ritual",
    img: "/images/svc-couple.jpg",
    imgAlt: {
      id: "Pasangan menikmati pijatan berdampingan di vila",
      en: "Couple enjoying side-by-side massage at a villa",
    },
    durations: [
      { minutes: 60, price: 550000 },
      { minutes: 90, price: 750000 },
    ],
    name: {
      id: "Ritual Pasangan",
      en: "Couple's Ritual",
    },
    tagline: {
      id: "Dua meja, dua terapis, satu pengalaman bersama",
      en: "Two tables, two therapists, one shared experience",
    },
    desc: {
      id: "Ubah ruangan mana pun menjadi spa privat untuk dua orang. Dua terapis senior datang bersamaan dan bekerja sinkron, lengkap dengan lilin, musik lembut, dan minyak aromaterapi khusus. Hadiah yang tidak pernah salah untuk bulan madu, anniversary, atau sekadar waktu berkualitas bersama. Harga per pasangan.",
      en: "Turn any room into a private spa for two. Two senior therapists arrive together and work in sync, complete with candles, soft music, and a special aromatherapy blend. The gift that never misses — honeymoons, anniversaries, or simply quality time together. Price per couple.",
    },
    benefits: {
      id: ["Pengalaman romantis tanpa keluar vila", "Dua terapis senior sinkron", "Free setup lilin & musik lembut"],
      en: ["A romantic escape without leaving the villa", "Two senior therapists in sync", "Free candle & soft-music setup"],
    },
    includes: COMMON_INCLUDES,
  },
];

type Pair = { id: string; en: string };
type PairArr = { id: string[]; en: string[] };

export const copy = {
  nav: {
    services: { id: "Layanan", en: "Services" },
    about: { id: "Tentang", en: "About" },
    how: { id: "Cara Pesan", en: "How It Works" },
    testimonials: { id: "Testimoni", en: "Reviews" },
    faq: { id: "FAQ", en: "FAQ" },
    book: { id: "Pesan Sekarang", en: "Book Now" },
  },
  hero: {
    kicker: { id: "Jasa Home Massage · Canggu — Seminyak", en: "Home Massage Service · Canggu — Seminyak" },
    titleA: { id: "Pijat penyembuhan Bali,", en: "Bali's healing touch," },
    titleB: { id: "datang ke vila Anda.", en: "delivered to your villa." },
    sub: {
      id: "Terapis bersertifikat Amerta membawa meja pijat, minyak aromaterapi murni, dan ketenangan khas Bali — ke ruang mana pun Anda berada. Tanpa antre. Tanpa keluar rumah.",
      en: "Amerta's certified therapists bring the massage table, pure aromatherapy oils, and Bali's signature calm — wherever you are. No queues. No leaving home.",
    },
    ctaPrimary: { id: "Pesan via WhatsApp", en: "Book via WhatsApp" },
    ctaSecondary: { id: "Jelajahi Layanan", en: "Explore Services" },
    trustRating: { id: "dari 312 ulasan klien", en: "from 312 client reviews" },
    trustCertified: { id: "Terapis bersertifikat", en: "Certified therapists" },
    trustFast: { id: "Respon < 5 menit", en: "Replies in < 5 min" },
    floatArrive: { id: "Terapis tiba ±60 menit", en: "Therapist arrives in ±60 min" },
  },
  marquee: {
    items: {
      id: [
        "Terapis bersertifikat & terlatih",
        "Minyak aromaterapi murni",
        "Linen bersih untuk setiap klien",
        "Datang ke vila, hotel & rumah",
        "Bisa dijadwalkan hari ini",
        "Buka setiap hari 08.00–22.00 WITA",
      ],
      en: [
        "Certified & trained therapists",
        "Pure aromatherapy oils",
        "Fresh linen for every client",
        "We come to villas, hotels & homes",
        "Same-day bookings available",
        "Open daily 08.00–22.00 WITA",
      ],
    } as PairArr,
  },
  servicesSection: {
    index: "01",
    kicker: { id: "Layanan Kami", en: "Our Services" },
    title: { id: "Pijatan pilihan untuk setiap kebutuhan", en: "A treatment for every need" },
    sub: {
      id: "Enam pijatan paling dicari di Canggu & Seminyak — semua tersedia di lokasi Anda. Klik untuk melihat detail, durasi, dan harga.",
      en: "The six most-loved treatments in Canggu & Seminyak — all available at your location. Tap for details, durations, and prices.",
    },
    from: { id: "mulai", en: "from" },
    perMin: { id: "menit", en: "min" },
    viewDetail: { id: "Lihat Detail", en: "View Details" },
    popular: { id: "Terpopuler", en: "Most Popular" },
  },
  modal: {
    book: { id: "Pesan Layanan Ini", en: "Book This Treatment" },
    duration: { id: "Pilih durasi", en: "Choose duration" },
    benefits: { id: "Manfaat untuk Anda", en: "Benefits for you" },
    includes: { id: "Sudah termasuk", en: "What's included" },
    note: {
      id: "Klik pesan — WhatsApp terbuka dengan pesanan otomatis. Konfirmasi ketersediaan < 5 menit.",
      en: "Tap book — WhatsApp opens with your order pre-filled. Confirmation within 5 minutes.",
    },
    msgIntro: {
      id: "Halo Amerta Massage! Saya ingin memesan:",
      en: "Hi Amerta Massage! I'd like to book:",
    },
    ask: { id: "Mohon info ketersediaannya. Terima kasih!", en: "Please share availability. Thank you!" },
  },
  about: {
    index: "02",
    kicker: { id: "Tentang Amerta", en: "About Amerta" },
    title: { id: "Air kehidupan, dibawa ke rumah Anda", en: "The water of life, brought to your home" },
    p1: {
      id: "Dalam mitologi Bali, tirta amerta adalah ramuan keabadian — sumber pemulihan yang dicari para dewa. Kami memercayai filosofi yang lebih sederhana: pemulihan sejati tidak butuh pekerjaan dewa, hanya sentuhan yang benar, di tempat yang membuat Anda nyaman.",
      en: "In Balinese mythology, tirta amerta is the elixir of immortality — the healing source the gods themselves sought. We believe in a simpler philosophy: true recovery needs no divine labor, only the right touch, in a place where you feel at ease.",
    },
    p2: {
      id: "Amerta Massage lahir di Canggu dari sebuah keyakinan: sesi pijat terbaik terjadi ketika Anda tidak perlu berpindah tempat. Setelah sesi, tubuh yang ringan bertemu kamar mandi sendiri, kasur sendiri, dan teh hangat buatan sendiri. Tidak ada yang lebih pulih dari itu.",
      en: "Amerta Massage was born in Canggu from one belief: the best massage happens when you don't have to go anywhere. Afterwards, a light body meets your own shower, your own bed, your own warm tea. Nothing recovers quite like that.",
    },
    values: {
      id: [
        ["Terapis senior bersertifikat", "Rata-rata 6 tahun pengalaman, tersertifikasi lembaga pijat terakreditasi, dilatih ulang setiap kuartal."],
        ["Higienis tanpa kompromi", "Linen dicuci & disetrika baru untuk setiap klien. Alat disterilkan. Minyak esensial murni, tanpa campuran."],
        ["Otentik, bukan sekadar nyaman", "Teknik pijat Bali asli yang diwariskan turun-temurun, dipadukan ilmu terapi modern."],
      ],
      en: [
        ["Senior certified therapists", "Averaging 6 years of experience, certified by accredited institutions, re-trained quarterly."],
        ["Hygiene without compromise", "Freshly laundered & pressed linen per client. Sterilized tools. Pure essential oils, never diluted."],
        ["Authentic, not just comfortable", "Original Balinese technique passed down generations, combined with modern therapy science."],
      ],
    } as { id: [string, string][]; en: [string, string][] },
    stats: {
      id: [["3.200+", "sesi selesai"], ["4,9/5", "rating klien"], ["8", "terapis senior"], ["±60'", "waktu tiba"]],
      en: [["3,200+", "sessions completed"], ["4.9/5", "client rating"], ["8", "senior therapists"], ["±60'", "arrival time"]],
    } as { id: [string, string][]; en: [string, string][] },
    imgAlt: { id: "Mandi bunga di vila tropis Bali", en: "Flower bath in a tropical Balinese villa" },
  },
  how: {
    index: "03",
    kicker: { id: "Cara Pesan", en: "How It Works" },
    title: { id: "Empat langkah menuju tubuh yang ringan", en: "Four steps to a lighter body" },
    steps: {
      id: [
        ["Pilih pijatan Anda", "Jelajahi layanan, tentukan durasi — lalu klik Pesan."],
        ["Konfirmasi via WhatsApp", "Isi formulir pemesanan atau langsung chat. Kami balas < 5 menit."],
        ["Terapis tiba di lokasi", "Meja pijat, linen bersih, dan minyak pilihan Anda — dibawa lengkap. Cukup siapkan ruang yang tenang."],
        ["Nikmati & pulih", "Selesai sesi? Bayar di tempat: tunai, transfer, atau QRIS. Tanpa DP."],
      ],
      en: [
        ["Choose your treatment", "Browse the services, pick a duration — then tap Book."],
        ["Confirm via WhatsApp", "Fill the booking form or just chat. We reply within 5 minutes."],
        ["Therapist arrives at your place", "Massage table, fresh linen, and your chosen oil — all brought. Just prepare a quiet room."],
        ["Enjoy & recover", "Session done? Pay on the spot: cash, transfer, or QRIS. No deposit."],
      ],
    } as PairArr,
    note: { id: "Respon rata-rata 4 menit · Buka setiap hari 08.00–22.00 WITA", en: "Average reply 4 minutes · Open daily 08.00–22.00 WITA" },
  },
  booking: {
    index: "04",
    kicker: { id: "Pemesanan", en: "Booking" },
    title: { id: "Amankan slot Anda lewat WhatsApp", en: "Secure your slot via WhatsApp" },
    sub: {
      id: "Isi formulir — pesanan otomatis tersusun rapi di WhatsApp. Tanpa akun, tanpa aplikasi tambahan.",
      en: "Fill the form — your order composes itself neatly in WhatsApp. No account, no extra apps.",
    },
    sideTitle: { id: "Lebih suka langsung chat?", en: "Prefer to chat directly?" },
    sideSub: {
      id: "Tim kami online setiap hari pada jam operasional. Kirim saja pesan — kami bantu pilih layanan yang cocok.",
      en: "Our team is online daily during operating hours. Just say hi — we'll help you pick the right treatment.",
    },
    name: { id: "Nama lengkap", en: "Full name" },
    namePh: { id: "Siapa yang akan dipijat?", en: "Who is getting the massage?" },
    phone: { id: "Nomor WhatsApp", en: "WhatsApp number" },
    phonePh: { id: "08xxxxxxxxxx", en: "08xxxxxxxxxx" },
    service: { id: "Pilih layanan", en: "Choose a treatment" },
    servicePh: { id: "Pilih layanan pijat", en: "Select a treatment" },
    duration: { id: "Durasi", en: "Duration" },
    date: { id: "Tanggal sesi", en: "Session date" },
    time: { id: "Waktu", en: "Time" },
    location: { id: "Lokasi sesi", en: "Session location" },
    locationPh: { id: "Nama vila/hotel & alamat, mis. Villa Saya, Jl. Batu Bolong, Canggu", en: "Villa/hotel name & address, e.g. My Villa, Jl. Batu Bolong, Canggu" },
    pref: { id: "Preferensi terapis", en: "Therapist preference" },
    prefF: { id: "Terapis wanita", en: "Female therapist" },
    prefM: { id: "Terapis pria", en: "Male therapist" },
    prefAny: { id: "Terapis mana pun", en: "Any therapist" },
    notes: { id: "Catatan tambahan (opsional)", en: "Additional notes (optional)" },
    notesPh: { id: "Kondisi khusus, area fokus, alergi minyak…", en: "Special conditions, focus areas, oil allergies…" },
    submit: { id: "Kirim Pesanan via WhatsApp", en: "Send Order via WhatsApp" },
    success: { id: "Membuka WhatsApp dengan pesanan Anda…", en: "Opening WhatsApp with your order…" },
    errorRequired: { id: "Mohon lengkapi kolom yang wajib diisi.", en: "Please complete the required fields." },
    errorPhone: { id: "Nomor WhatsApp tidak valid (9–15 digit).", en: "Invalid WhatsApp number (9–15 digits)." },
    msgHeader: { id: "Halo Amerta Massage! Saya ingin memesan sesi pijat:", en: "Hi Amerta Massage! I'd like to book a session:" },
    msgService: { id: "Layanan", en: "Treatment" },
    msgDate: { id: "Tanggal", en: "Date" },
    msgLocation: { id: "Lokasi", en: "Location" },
    msgPref: { id: "Preferensi terapis", en: "Therapist preference" },
    msgNotes: { id: "Catatan", en: "Notes" },
    msgClosing: { id: "Mohon konfirmasi ketersediaan. Terima kasih!", en: "Please confirm availability. Thank you!" },
    openHours: { id: "Jam operasional", en: "Operating hours" },
    reply: { id: "Respon < 5 menit pada jam operasional", en: "Replies within 5 min during operating hours" },
  },
  testimonials: {
    index: "05",
    kicker: { id: "Testimoni", en: "Reviews" },
    title: { id: "Kata mereka setelah sesi Amerta", en: "What they say after an Amerta session" },
    summary: { id: "ulasan terverifikasi", en: "verified reviews" },
    items: {
      id: [
        ["Terapisnya tahu persis di mana punggung saya bermasalah. Bangun besoknya seperti diberi tubuh baru.", "Dewi A.", "Canggu"],
        ["Datang ke vila tepat waktu, perlengkapan lengkap, dan wanginya bikin langsung terlelap.", "Rizky P.", "Seminyak"],
        ["Sudah enam kali repeat order. Deep tissue-nya juara untuk yang pegang laptop seharian.", "Bagas W.", "Kerobokan"],
        ["The therapist arrived within 45 minutes — the Balinese massage was the best I've had on the island.", "Sarah M.", "Berawa"],
        ["Pesan Ritual Pasangan untuk anniversary. Vila kami langsung berubah jadi spa privat.", "Ayu & Fajar", "Umalas"],
        ["Refleksi kaki setelah hiking Mount Batur benar-benar penyelamat. Sangat direkomendasikan.", "Nanda K.", "Canggu"],
      ],
      en: [
        ["The therapist knew exactly where my back was struggling. Woke up the next day like a new body.", "Dewi A.", "Canggu"],
        ["Arrived at the villa right on time, complete setup, and the scent alone put me to sleep.", "Rizky P.", "Seminyak"],
        ["Six repeat orders and counting. Their deep tissue is unbeatable for laptop-ridden backs.", "Bagas W.", "Kerobokan"],
        ["The therapist arrived within 45 minutes — the Balinese massage was the best I've had on the island.", "Sarah M.", "Berawa"],
        ["Booked the Couple's Ritual for our anniversary. Our villa instantly became a private spa.", "Ayu & Fajar", "Umalas"],
        ["Foot reflexology after hiking Mount Batur was an absolute lifesaver. Highly recommended.", "Nanda K.", "Canggu"],
      ],
    } as { id: [string, string, string][]; en: [string, string, string][] },
  },
  coverage: {
    kicker: { id: "Area Layanan", en: "Service Area" },
    title: { id: "Kami datang ke wilayah Anda", en: "We come to your area" },
    note: {
      id: "Di luar area? Chat kami dulu — biasanya masih bisa diatur dengan tambahan biaya transport.",
      en: "Outside the area? Chat with us first — usually still possible with a small transport fee.",
    },
  },
  faq: {
    index: "06",
    kicker: { id: "FAQ", en: "FAQ" },
    title: { id: "Pertanyaan yang sering diajukan", en: "Frequently asked questions" },
    items: {
      id: [
        ["Bisakah memesan untuk hari ini?", "Bisa. Selama slot tersedia, terapis kami bisa tiba 60–90 menit setelah konfirmasi. Untuk jam sibuk (17.00–21.00), sebaiknya pesan 3–4 jam sebelumnya."],
        ["Bagaimana metode pembayarannya?", "Semua pembayaran dilakukan setelah sesi selesai: tunai, transfer bank, atau QRIS. Tanpa uang muka."],
        ["Apakah peralatan dibawa lengkap?", "Ya — meja pijat portable, linen bersih, minyak aromaterapi, dan handuk dibawa lengkap oleh terapis. Anda cukup menyiapkan ruang yang tenang."],
        ["Bisa meminta terapis wanita atau pria?", "Bisa. Sampaikan preferensi Anda saat memesan; kami akan konfirmasi ketersediaan terapis yang cocok."],
        ["Bagaimana kebijakan pembatalan?", "Gratis membatalkan hingga 2 jam sebelum sesi dimulai. Setelah terapis berangkat ke lokasi, berlaku biaya transport Rp 50.000."],
        ["Apakah aman untuk ibu hamil atau kondisi medis tertentu?", "Kami memiliki terapis terlatih untuk prenatal dan kondisi khusus. Mohon sebutkan kondisi Anda saat memesan agar teknik dan posisi yang aman dapat disiapkan."],
      ],
      en: [
        ["Can I book for today?", "Yes. As long as slots are available, our therapist can arrive 60–90 minutes after confirmation. For peak hours (17.00–21.00), booking 3–4 hours ahead is recommended."],
        ["What are the payment methods?", "All payments happen after the session: cash, bank transfer, or QRIS. No deposit required."],
        ["Is the equipment brought fully?", "Yes — portable massage table, fresh linen, aromatherapy oils, and towels are all brought by the therapist. You only need a quiet room."],
        ["Can I request a female or male therapist?", "Yes. Mention your preference when booking; we'll confirm the availability of a matching therapist."],
        ["What is the cancellation policy?", "Free cancellation up to 2 hours before the session. Once the therapist is on the way, a Rp 50,000 transport fee applies."],
        ["Is it safe for pregnancy or medical conditions?", "We have therapists trained for prenatal and special conditions. Please mention your condition when booking so safe techniques and positions can be prepared."],
      ],
    } as PairArr,
  },
  cta: {
    title: { id: "Tubuh Anda sudah bekerja keras hari ini.", en: "Your body has worked hard today." },
    sub: {
      id: "Beri ia amerta — pemulihan yang sebenarnya, di tempat Anda berada.",
      en: "Give it amerta — true recovery, right where you are.",
    },
    button: { id: "Pesan via WhatsApp", en: "Book via WhatsApp" },
    note: { id: "Buka 08.00–22.00 WITA · Respon < 5 menit", en: "Open 08.00–22.00 WITA · Replies in < 5 min" },
  },
  footer: {
    tagline: {
      id: "Home massage otentik Bali untuk vila, hotel & rumah Anda di wilayah Canggu–Seminyak.",
      en: "Authentic Balinese home massage for villas, hotels & homes across Canggu–Seminyak.",
    },
    nav: { id: "Navigasi", en: "Navigation" },
    contact: { id: "Kontak", en: "Contact" },
    hours: { id: "Jam operasional", en: "Operating hours" },
    daily: { id: "Setiap hari", en: "Every day" },
    rights: { id: "Hak cipta dilindungi.", en: "All rights reserved." },
    made: { id: "Dibuat dengan ketenangan di Bali.", en: "Crafted with calm in Bali." },
  },
  floating: {
    label: { id: "Pesan sekarang", en: "Book now" },
  },
} as const;

export type Copy = (typeof copy)[keyof typeof copy];
