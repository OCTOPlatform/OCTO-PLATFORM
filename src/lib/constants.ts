import { ProductItem, ResourceItem } from './types';

export const BRAND = {
  name: 'OCTO',
  tagline: 'ONE PLATFORM. MANY POSSIBILITIES.',
  supportingLine: 'Smart business tools, connected.',
  description:
    'Platform digital resmi untuk membangun reputasi bisnis, mempercepat pertumbuhan pelanggan, dan mengelola ekosistem operasional melalui kartu interaktif, analitik cerdas, dan program loyalitas.',
  officeAddress: 'Jl. H. Husin No. 5, Kalimulya, Cilodong, Kota Depok, Jawa Barat 16413',
  officialEmail: 'egichandrapratama@gmail.com',
  domainEmail: 'halo@octo.id',
  domainEmailActive: false,
  officialPhone: '+62 812 9509 9738',
  officialWhatsApp: '+62 812 9509 9738',
  operatingHours: 'Senin – Jumat, 09.00 – 18.00 WIB',
  socials: {
    instagram: 'https://instagram.com/octo_platform',
    linkedin: 'https://linkedin.com/company/octo-platform',
    twitter: 'https://x.com/octo_platform',
    youtube: 'https://youtube.com/@octoplatform',
  },
};

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-tap',
    slug: 'octo-tap',
    name: 'OCTO Tap',
    tagline: 'Review Google Lebih Cepat dengan Sekali Sentuh',
    shortDesc:
      'Kartu interaktif fisik dengan NFC dan QR code terkalibrasi untuk mempermudah pelanggan memberikan ulasan resmi di Google Review bisnis Anda dalam hitungan detik.',
    fullDesc:
      'OCTO Tap menghapus hambatan utama pelanggan dalam memberikan ulasan: kerumitan mencari nama bisnis di Google Maps. Cukup dengan menempelkan smartphone berkemampuan NFC atau memindai kode QR berpresisi tinggi, pelanggan langsung diarahkan ke form ulasan resmi Google bisnis Anda. Dirancang dengan kartu fisik berstandar industri tahan air dan tahan gores, tanpa baterai, dan siap pakai selamanya.',
    status: 'Tersedia',
    statusBadgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    targetAudience: ['Kafe & Restoran (F&B)', 'Retail & Toko Modern', 'Klinik Kecantikan & Kesehatan', 'Hotel & Hospitality', 'Bengkel & Layanan Jasa'],
    keyProblems: [
      'Pelanggan puas jarang menyempatkan diri mencari toko di Google Maps karena repot.',
      'Kasir atau staf sering ragu mengajak pelanggan memberi ulasan karena proses yang lambat.',
      'Bisnis kalah saing di pencarian lokal Google Maps karena jumlah review organik masih sedikit.',
    ],
    keyBenefits: [
      'Akses instan 1 detik langsung membuka form ulasan resmi Google Review.',
      'Kartu fisik premium tahan cuaca dan goresan, tanpa baterai atau kabel daya.',
      'Mendukung 100% smartphone modern: sensor NFC untuk sentuhan instan dan QR code berdaya kontras tinggi.',
      'Bebas biaya langganan wajib untuk fungsi pengalihan dasar kartu.',
    ],
    features: [
      {
        title: 'Akrilik Stand 10×10 cm (3mm UV Print)',
        description: 'Format fisik persegi 100×100 mm akrilik tebal 3mm tahan benturan, air, dan goresan yang kokoh untuk kasir dan meja tamu.',
        status: 'Tersedia',
      },
      {
        title: 'Dual-Tech NFC NTAG213 & QR Code',
        description: 'Sentuhan instan 1 detik chip NFC 13.56 MHz serta QR code berdaya kontras tinggi yang dapat dipindai oleh semua ponsel.',
        status: 'Tersedia',
      },
      {
        title: '4 Pilihan Tema Finishing Resmi',
        description: 'Tersedia opsi OCTO Signature, Frosted Glass, Google White resmi, serta Black & Gold mewah yang selaras dengan dekorasi tempat usaha.',
        status: 'Tersedia',
      },
      {
        title: 'URL Tunggal & Manajemen Tautan Fleksibel',
        description: 'Satu tautan terintegrasi untuk chip NFC dan QR code yang dapat dialihkan kapan saja tanpa perlu mencetak kartu baru.',
        status: 'Tersedia',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Letakkan Kartu di Titik Layanan',
        description: 'Tempatkan kartu OCTO Tap di kasir, meja pelanggan, atau meja penerimaan tamu tempat interaksi positif terjadi.',
      },
      {
        step: 2,
        title: 'Pelanggan Menempelkan Smartphone atau Scan QR',
        description: 'Cukup dekatkan ponsel berfitur NFC ke kartu, atau buka kamera untuk memindai kode QR yang tertera.',
      },
      {
        step: 3,
        title: 'Halaman Google Review Langsung Terbuka',
        description: 'Browser pelanggan secara otomatis membuka form ulasan resmi Google Business profil Anda tanpa perlu mengetik kata kunci.',
      },
      {
        step: 4,
        title: 'Pelanggan Menulis Ulasan dan Memberi Bintang',
        description: 'Pelanggan menulis opini jujur dan mengirim ulasan langsung melalui akun Google pribadi mereka dengan aman.',
      },
    ],
    useCases: [
      {
        industry: 'Kafe & Restoran',
        scenario: 'Diletakkan di setiap meja atau baki pengantaran bill setelah pelanggan menikmati hidangan lezat.',
        outcome: 'Peningkatan 3x lipat jumlah review Google Maps mingguan dari pelanggan yang puas saat itu juga.',
      },
      {
        industry: 'Klinik Kecantikan & Medis',
        scenario: 'Ditempatkan di meja resepsionis saat pasien menyelesaikan pembayaran atau konsultasi treatment.',
        outcome: 'Membangun otoritas dan kepercayaan calon pasien baru yang mencari rekomendasi klinik terdekat.',
      },
      {
        industry: 'Retail & Fashion Boutique',
        scenario: 'Kasir mengajak pelanggan yang tersenyum saat checkout untuk mengetuk kartu sebelum membawa belanjaan.',
        outcome: 'Meningkatkan visibilitas toko pada pencarian "toko pakaian terdekat" di Google Maps.',
      },
    ],
    faqs: [
      {
        question: 'Apakah pelanggan harus mengunduh aplikasi tertentu untuk memakai OCTO Tap?',
        answer: 'Sama sekali tidak. OCTO Tap memanfaatkan teknologi native NFC dan kamera smartphone pelanggan. Tidak perlu unduh aplikasi apa pun.',
      },
      {
        question: 'Apakah OCTO Tap menjamin ulasan pasti bintang 5?',
        answer: 'Tidak. Prinsip OCTO adalah "Proof over Hype". Pelanggan tetap menulis dan mengirimkan ulasan jujur secara mandiri di Google. OCTO Tap menghilangkan friksi teknis agar pelanggan yang puas dapat memberi ulasan dengan mudah.',
      },
      {
        question: 'Apakah kartu membutuhkan baterai atau pengisian daya?',
        answer: 'Tidak, kartu OCTO Tap pasif (passive NFC tag) yang ditenagai oleh gelombang radio smartphone saat didekatkan. Tahan bertahun-tahun tanpa baterai.',
      },
      {
        question: 'Bagaimana jika link Google Bisnis saya berpindah atau ganti nama?',
        answer: 'Anda dapat memperbarui destinasi link ulasan secara remote melalui portal admin OCTO tanpa harus mengganti fisik kartu.',
      },
    ],
    demoType: 'interaktif',
    demoStatus: 'Published',
    demoTitle: 'Simulasi Interaktif OCTO Tap',
    demoSubtitle: 'Coba langsung alur sentuhan NFC atau pemindaian QR dari sudut pandang pelanggan bisnis Anda.',
    demoLastReviewed: '2026-10-18',
    demoOwner: 'Tim Produk Hardware & Interaksi',
    relatedProductSlugs: ['octo-insights', 'octo-loyalty', 'octo-business', 'octo-crm'],
  },
  {
    id: 'prod-insights',
    slug: 'octo-insights',
    name: 'OCTO Insights',
    tagline: 'Analitik Cerdas & Pantauan Sentimen Bisnis Terpadu',
    shortDesc:
      'Dashboard visual terpadu untuk membaca tren interaksi ulasan, sentimen kepuasan pelanggan, dan pola kunjungan lintas cabang secara akurat.',
    fullDesc:
      'OCTO Insights mentransformasikan data interaksi ulasan dan tanggapan pelanggan menjadi grafik yang mudah dipahami pemilik bisnis. Pantau rasio konversi interaksi tap menjadi ulasan riil, ketahui jam-jam sibuk pelanggan paling aktif, dan deteksi sentimen ulasan Google secara otomatis untuk respons cepat sebelum reputasi terdampak.',
    status: 'Akses Terbatas / Beta',
    statusBadgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    targetAudience: ['Pemilik Bisnis Multi-Cabang', 'General Manager Operasional', 'Tim Pemasaran Digital', 'Pengelola Waralaba (Franchise)'],
    keyProblems: [
      'Pemilik bisnis kesulitan mengetahui cabang mana yang aktif meminta review dan cabang mana yang pasif.',
      'Review negatif sering kali terlambat disadari sehingga pelanggan terlanjur kecewa di ranah publik.',
      'Tidak ada data objektif mengenai hari dan jam puncak terjadinya interaksi positif pelanggan.',
    ],
    keyBenefits: [
      'Laporan performa interaksi ulasan harian, mingguan, dan bulanan per cabang.',
      'Notifikasi cepat saat terdeteksi rating di bawah rata-rata untuk mitigasi layanan segera.',
      'Matriks benchmarking komparatif performa reputasi antar-lokasi bisnis.',
      'Ekspor laporan berkala dalam format PDF dan spreadsheet siap presentasi.',
    ],
    features: [
      {
        title: 'Pelacakan Konversi Tap-to-Review',
        description: 'Menganalisis berapa kali kartu disentuh dan persentase yang berhasil berlanjut menjadi ulasan di Google Maps.',
        status: 'Beta',
      },
      {
        title: 'Heatmap Jam & Hari Paling Efektif',
        description: 'Visualisasi visual mengenai waktu terbaik staf meminta review dengan respon tertinggi dari pengunjung.',
        status: 'Beta',
      },
      {
        title: 'Peringatan Sentimen & Notifikasi Cepat',
        description: 'Deteksi kata kunci ulasan pelanggan (contoh: "pelayanan lambat", "makanan enak") untuk evaluasi SOP.',
        status: 'Pengembangan',
      },
      {
        title: 'Komparasi Kinerja Multi-Lokasi',
        description: 'Bandingkan cabang berkinerja tertinggi dan berikan reward bagi staf cabang yang konsisten melayani terbaik.',
        status: 'Beta',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Hubungkan Akun Google Business Anda',
        description: 'Sinkronisasi profil lokasi bisnis Google Maps ke dashboard OCTO Insights dengan izin resmi.',
      },
      {
        step: 2,
        title: 'Catat Interaksi Tap dan Konversi',
        description: 'Sistem secara anonim mencatat frekuensi interaksi kartu tanpa merekam data pribadi sensitif pengunjung.',
      },
      {
        step: 3,
        title: 'Analisis Grafik dan Sentimen Pelanggan',
        description: 'Buka dashboard visual untuk mengevaluasi rating rata-rata, tren kepuasan, dan rekomendasi langkah bisnis.',
      },
    ],
    useCases: [
      {
        industry: 'Waralaba Restoran (5+ Cabang)',
        scenario: 'Head Office memantau cabang mana yang ulasannya meningkat tajam dan cabang mana yang mengalami penurunan kepuasan.',
        outcome: 'Manajemen dapat memberikan pembinaan tepat sasaran pada cabang yang SOP pelayanannya butuh perbaikan.',
      },
      {
        industry: 'Klinik Estetika & Spa',
        scenario: 'Menganalisis dokter atau terapis yang paling sering mendapat ulasan positif di Google Business.',
        outcome: 'Dasar penilaian kinerja objektif berbasis kepuasan riil pasien.',
      },
    ],
    faqs: [
      {
        question: 'Apakah data yang ditampilkan di demo OCTO Insights adalah data pelanggan nyata?',
        answer: 'Tidak. Sesuai prinsip "Proof over Hype", semua angka di demo interaktif berlabel "Data Simulasi" untuk memberikan gambaran alur fitur analitik yang sedang dibangun.',
      },
      {
        question: 'Apakah OCTO Insights merekam nomor telepon atau data identitas tamu saat tap?',
        answer: 'Tidak. Privasi pengunjung adalah prioritas mutlak (Privacy by Design). Sistem hanya menghitung volume sentuhan dan data publik ulasan resmi Google.',
      },
      {
        question: 'Kapan fitur ini dirilis penuh secara komersial?',
        answer: 'OCTO Insights saat ini berada dalam tahap Akses Terbatas (Closed Beta) bagi pelanggan terpilih. Anda dapat mendaftar uji coba melalui tombol Minta Demo.',
      },
    ],
    demoType: 'interaktif',
    demoStatus: 'Published',
    demoTitle: 'Simulasi Dashboard Analitik OCTO Insights',
    demoSubtitle: 'Jelajahi visualisasi metrik performa ulasan, heatmap jam aktif, dan komparasi cabang dengan data simulasi teruji.',
    demoLastReviewed: '2026-10-18',
    demoOwner: 'Tim Analitik Data & AI',
    relatedProductSlugs: ['octo-tap', 'octo-loyalty', 'octo-business', 'octo-crm'],
  },
  {
    id: 'prod-loyalty',
    slug: 'octo-loyalty',
    name: 'OCTO Loyalty',
    tagline: 'Ubah Pengunjung Satu Kali Menjadi Pelanggan Setia',
    shortDesc:
      'Solusi program retensi pelanggan berbasis digital stamp card dan voucher otomatis tanpa perlu aplikasi tambahan yang memberatkan memori ponsel pelanggan.',
    fullDesc:
      'OCTO Loyalty membantu bisnis membangun hubungan jangka panjang dengan pengunjung. Tinggalkan kartu stempel kertas konvensional yang mudah hilang atau rusak. Dengan kartu loyalitas digital OCTO yang tersimpan di browser ponsel atau mobile wallet, pelanggan dapat mengumpulkan poin kunjungan, membuka voucher diskon, dan menikmati apresiasi eksklusif setiap kembali berbelanja.',
    status: 'Dalam Pengembangan',
    statusBadgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    targetAudience: ['Kafe & Coffee Shop', 'Barbershop & Salon', 'Pusat Kebugaran / Gym', 'Laundry Premium', 'Toko Roti & Pastry'],
    keyProblems: [
      'Kartu stempel kertas tradisional sering hilang, basah, atau tertinggal di rumah oleh pelanggan.',
      'Membuat aplikasi membership mandiri memakan biaya ratusan juta dan jarang mau diinstal pelanggan.',
      'Bisnis kesulitan mengingatkan pelanggan lama untuk kembali datang setelah kunjungan pertama.',
    ],
    keyBenefits: [
      'Digital Stamp Card yang tersimpan di ponsel pelanggan tanpa perlu instal aplikasi berat dari app store.',
      'Notifikasi pengingat reward ramah dan otomatis melalui WhatsApp bisnis resmi berlisensi.',
      'Tingkat kunjungan berulang (repeat rate) meningkat berkat gamifikasi reward yang transparan.',
      'Merchant dashboard untuk membuat kampanye reward, voucher ulang tahun, dan batas kedaluwarsa stempel.',
    ],
    features: [
      {
        title: 'Kartu Stempel Digital Cepat',
        description: 'Klaim stempel cukup dengan scan QR kasir atau tap kartu kasir dengan verifikasi anti-fraud.',
        status: 'Beta',
      },
      {
        title: 'Penukaran Voucher Sekali Pakai (One-Time Token)',
        description: 'Voucher QR unik yang hangus setelah di-scan oleh kasir toko untuk mencegah pemakaian ganda.',
        status: 'Beta',
      },
      {
        title: 'Tiering Keanggotaan (Silver, Gold, Platinum)',
        description: 'Tingkatan status loyalitas otomatis berdasarkan akumulasi transaksi atau frekuensi kedatangan tahunan.',
        status: 'Pengembangan',
      },
      {
        title: 'Integrasi WhatsApp Reminder',
        description: 'Kirim ucapan selamat ulang tahun dan pengingat stempel yang hampir kedaluwarsa secara personal.',
        status: 'Pengembangan',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Pelanggan Membuka Paspor Loyalitas Digital',
        description: 'Pelanggan cukup tap kartu OCTO Loyalty atau scan QR di meja kasir saat memesan menu favorit.',
      },
      {
        step: 2,
        title: 'Kumpulkan Stempel Kunjungan',
        description: 'Kasir memberikan stempel digital dengan kode verifikasi unik setelah pembayaran selesai.',
      },
      {
        step: 3,
        title: 'Tukarkan Hadiah Eksklusif',
        description: 'Saat jumlah stempel tercapai (misal 10 stempel), voucher hadiah otomatis aktif dan siap ditukar kapan saja.',
      },
    ],
    useCases: [
      {
        industry: 'Coffee Shop Indie',
        scenario: 'Program "Beli 9 Kopi Gratis Kopi ke-10" menggunakan kartu digital di browser pelanggan.',
        outcome: 'Pelanggan memilih kembali ke coffee shop yang sama karena progres reward mereka tersimpan rapi di ponsel.',
      },
      {
        industry: 'Barbershop & Grooming',
        scenario: 'Memberikan voucher diskon servis potong rambut ke-5 untuk pelanggan setia.',
        outcome: 'Siklus potong rambut pelanggan menjadi lebih rutin dan terprediksi.',
      },
    ],
    faqs: [
      {
        question: 'Apakah pelanggan harus mengisi form panjang untuk bergabung di OCTO Loyalty?',
        answer: 'Tidak. Cukup nomor telepon atau login instan sekali klik agar pengalaman di meja kasir tetap cepat dan menyenangkan.',
      },
      {
        question: 'Apakah fitur ini sudah tersedia untuk publik?',
        answer: 'OCTO Loyalty saat ini dalam status "Dalam Pengembangan" dan sedang melalui pengujian alpha dengan beberapa merchant percontohan.',
      },
      {
        question: 'Apakah sistem loyalty ini bisa digabungkan dengan kartu ulasan OCTO Tap?',
        answer: 'Bisa. Arsitektur OCTO dirancang terintegrasi: satu titik sentuh dapat menawarkan pelanggan untuk memberi review Google sekaligus mengumpulkan poin loyalitas.',
      },
    ],
    demoType: 'interaktif',
    demoStatus: 'Published',
    demoTitle: 'Simulasi Pengalaman OCTO Loyalty (Pelanggan & Kasir)',
    demoSubtitle: 'Coba simulasi mengklaim stempel baru dan menukarkan reward gratis dalam tampilan digital interaktif.',
    demoLastReviewed: '2026-10-18',
    demoOwner: 'Tim Produk Loyalty & CRM',
    relatedProductSlugs: ['octo-tap', 'octo-insights', 'octo-business', 'octo-crm'],
  },
  {
    id: 'prod-business',
    slug: 'octo-business',
    name: 'OCTO Business',
    tagline: 'Pusat Kendali Ekosistem Alat Bisnis & Multi-Cabang',
    shortDesc:
      'Portal sentral terpadu bagi pemilik bisnis untuk mengatur izin akses cabang, mengelola perangkat kartu OCTO, dan memantau seluruh modul bisnis dalam satu login.',
    fullDesc:
      'OCTO Business menyatukan seluruh portofolio teknologi OCTO Anda dalam satu antarmuka yang bersih dan berdaya tinggi. Kelola kartu fisik di 20 cabang berbeda, atur izin manajer toko, perbarui link ulasan secara terpusat, dan evaluasi performa operasional bisnis tanpa berpindah-pindah dashboard aplikasi yang terpisah.',
    status: 'Segera Hadir',
    statusBadgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    targetAudience: ['Direktur Operasional', 'Pemilik Waralaba', 'Brand Manager Retail', 'Pengelola Holding F&B'],
    keyProblems: [
      'Mengelola ratusan kartu review dan akun promosi di banyak cabang sering menimbulkan kekacauan data tautan.',
      'Pergantian manajer cabang berisiko menghilangkan akses ke akun bisnis lokal.',
      'Sulit mendapatkan laporan ringkasan komprehensif seluruh ekosistem bisnis dalam satu halaman.',
    ],
    keyBenefits: [
      'Satu kredensial login terpusat (Single Sign-On) untuk mengontrol seluruh produk OCTO.',
      'Hierarki manajemen multi-level: Head Office, Regional Manager, dan Store Supervisor.',
      'Manajemen inventaris kartu fisik: cek status aktif kartu, tautan target, dan riwayat mutasi perangkat.',
      'Audit log aktivitas keamanan untuk mencegah perubahan link yang tidak sah.',
    ],
    features: [
      {
        title: 'Manajemen Cabang & Hierarki Lokasi',
        description: 'Kelompokkan cabang berdasarkan kota atau brand, tetapkan penanggung jawab lokal dengan izin terbatas.',
        status: 'Beta',
      },
      {
        title: 'Remote Link Switcher',
        description: 'Ubah tujuan link Google Review seluruh cabang secara serentak atau satu per satu secara real-time.',
        status: 'Beta',
      },
      {
        title: 'Pusat Billing & Faktur Pajak Terpadu',
        description: 'Kelola pemesanan kartu tambahan, perpanjangan lisensi, dan unduh faktur pajak resmi dalam satu tab.',
        status: 'Pengembangan',
      },
      {
        title: 'Single Sign-On (SSO) & Audit Trail',
        description: 'Dukungan login perusahaan Google Workspace / Microsoft Entra serta pencatatan audit log lengkap.',
        status: 'Pengembangan',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Daftarkan Profil Perusahaan Anda',
        description: 'Masukkan identitas bisnis induk dan unggah daftar cabang yang ingin dikelola secara massal.',
      },
      {
        step: 2,
        title: 'Hubungkan Modul OCTO (Tap, Insights, Loyalty)',
        description: 'Aktivasi produk yang telah dimiliki cabang dan delegasikan kartu fisik ke penanggung jawab toko.',
      },
      {
        step: 3,
        title: 'Kendalikan dan Pantau Lintas Lokasi',
        description: 'Semua perubahan tautan ulasan dan pemantauan performa dilakukan terpusat dari kantor pusat.',
      },
    ],
    useCases: [
      {
        industry: 'Jaringan Klinik Medika (12 Cabang)',
        scenario: 'Memastikan semua klinik di berbagai kota mengarah ke Google Maps cabang yang tepat tanpa kekeliruan staf.',
        outcome: 'Konsistensi merek 100% dan perlindungan dari kesalahan setting link ulasan lokal.',
      },
      {
        industry: 'Grup Restoran Multi-Brand',
        scenario: 'Mengelola 3 brand berbeda di 15 lokasi dalam satu portal manajemen tanpa login akun berbeda.',
        outcome: 'Menghemat puluhan jam kerja staf marketing kantor pusat setiap bulannya.',
      },
    ],
    faqs: [
      {
        question: 'Apakah saya bisa menggunakan OCTO Business jika hanya memiliki 1 cabang?',
        answer: 'Tentu. OCTO Business tetap bermanfaat sebagai portal akun terpusat Anda. Namun manfaat terbesarnya terasa saat bisnis mulai membuka cabang ke-2 dan seterusnya.',
      },
      {
        question: 'Apakah produk ini sudah bisa dibeli saat ini?',
        answer: 'OCTO Business berstatus "Segera Hadir". Anda dapat menjadwalkan konsultasi awal dengan tim kami untuk mendapatkan akses preview privat.',
      },
    ],
    demoType: 'interaktif',
    demoStatus: 'Published',
    demoTitle: 'Eksplorasi Portal OCTO Business',
    demoSubtitle: 'Simulasikan beralih antar cabang Senopati, Kemang, dan BSD serta pantau keterhubungan seluruh modul OCTO.',
    demoLastReviewed: '2026-10-18',
    demoOwner: 'Tim Enterprise Platform',
    relatedProductSlugs: ['octo-tap', 'octo-insights', 'octo-loyalty', 'octo-crm'],
  },
  {
    id: 'prod-crm',
    slug: 'octo-crm',
    name: 'OCTO CRM',
    tagline: 'Know Your Customers. Grow Your Relationships.',
    shortDesc:
      'Workspace hubungan pelanggan berbasis SaaS untuk merapikan database prospek, mengelola visual pipeline penjualan, dan memastikan follow-up tidak terlewat.',
    fullDesc:
      'OCTO CRM membantu bisnis merapikan data pelanggan, mengelola peluang penjualan secara transparan melalui visual Kanban pipeline, dan memastikan tidak ada tindak lanjut penting yang terlewat—tanpa harus memulai dengan sistem yang rumit. Terhubung langsung dengan kartu interaktif OCTO Tap, analitik OCTO Insights, dan program OCTO Loyalty untuk ekosistem pertumbuhan terpadu.',
    status: 'Akses Terbatas / Beta',
    statusBadgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    targetAudience: [
      'UMKM dengan Repeat Order',
      'Bisnis Jasa Lokal & F&B Independen',
      'Tim Sales B2B Kecil',
      'Freelancer & Solopreneur',
      'Retail & Multi-Cabang',
    ],
    keyProblems: [
      'Data prospek dan pelanggan tercecer di WhatsApp pribadi, spreadsheet, dan catatan manual karyawan.',
      'Follow-up terlupakan karena tidak ada jadwal tugas terpusat, menyebabkan peluang penjualan hilang.',
      'Status prospek tidak jelas sehingga pemilik bisnis kesulitan memantau kinerja dan konversi tim sales.',
      'Riwayat interaksi hilang saat pergantian karyawan karena ketergantungan pada catatan chat individu.',
    ],
    keyBenefits: [
      'Centralized Contact Database: satukan seluruh kontak, lead source, tag, dan riwayat interaksi dalam satu tempat.',
      'Visual Sales Pipeline: pantau alur peluang dari New, Contacted, Qualified, Proposal, hingga Won/Lost secara transparan.',
      'Task & Reminder Harian: halaman Today menyajikan daftar follow-up jatuh tempo agar tidak ada prospek terlantar.',
      'Dukungan Ekosistem Terpadu: integrasikan prospek dari pemindaian kartu OCTO Tap ke alur penjualan CRM.',
    ],
    features: [
      {
        title: 'Manajemen Kontak & Perusahaan Terpusat',
        description: 'Simpan profil pelanggan lengkap, nomor kontak ternormalisasi, riwayat timeline, catatan interaksi, dan deteksi kandidat duplikasi.',
        status: 'Beta',
      },
      {
        title: 'Visual Kanban Sales Pipeline & Deals',
        description: 'Lacak nilai peluang penjualan (deal value), tanggal closing, probabilitas, dan alasan lost untuk evaluasi proses.',
        status: 'Beta',
      },
      {
        title: 'Task, Pengingat Harian & Follow-up (Today)',
        description: 'Notifikasi tugas jatuh tempo, status overdue otomatis, dan pembagian penanggung jawab (owner) per kontak.',
        status: 'Beta',
      },
      {
        title: 'Import/Export CSV dengan Preview & Validasi',
        description: 'Pindahkan database dari Excel/Spreadsheet secara aman dengan pengecekan kolom, tanpa data lock-in.',
        status: 'Beta',
      },
      {
        title: 'Dashboard Metrik & Laporan Konversi',
        description: 'Analisis nilai open pipeline, tingkat konversi antar tahap, dan performa sumber prospek (lead source).',
        status: 'Beta',
      },
      {
        title: 'Isolasi Data Tenant & Sesuai UU PDP',
        description: 'Perlindungan data bisnis berbasis workspace_id, audit log tindakan penting, dan kontrol akses berbasis role.',
        status: 'Beta',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Buat Workspace & Pilih Template Pipeline',
        description: 'Daftarkan akun bisnis Anda, atur zona waktu, dan gunakan template pipeline yang sesuai dengan proses penjualan Anda.',
      },
      {
        step: 2,
        title: 'Import Kontak atau Kumpulkan Prospek Baru',
        description: 'Unggah database dari spreadsheet via CSV atau hubungkan form pendaftaran dari kartu OCTO Tap.',
      },
      {
        step: 3,
        title: 'Kelola Prospek di Visual Pipeline & Jadwalkan Tugas',
        description: 'Geser status deal seiring berjalannya negosiasi dan pasang jadwal follow-up harian di tab Today.',
      },
      {
        step: 4,
        title: 'Tutup Penjualan & Bangun Hubungan Berkelanjutan',
        description: 'Tandai deal yang berhasil ditutup (Won), catat interaksi purna jual, dan identifikasi peluang repeat order.',
      },
    ],
    useCases: [
      {
        industry: 'Bisnis Jasa Desain & Agensi Kreatif',
        scenario: 'Mengelola puluhan inquiry klien dari WhatsApp dan formulir web dengan jadwal meeting dan penawaran proposal.',
        outcome: 'Tidak ada follow-up proposal yang terlewat; waktu penutupan deal menjadi 40% lebih cepat.',
      },
      {
        industry: 'Supplier Bahan Baku F&B & Distributor B2B',
        scenario: 'Tim sales mencatat pesanan rutin restoran dan mengatur jadwal kunjungan bulanan ke outlet pelanggan.',
        outcome: 'Riwayat harga dan preferensi pelanggan tetap aman di sistem meski terjadi pergantian sales representative.',
      },
      {
        industry: 'Klinik & Salon Perawatan Kecantikan',
        scenario: 'Menghubungkan data pengunjung dari formulir registrasi OCTO Tap untuk follow-up jadwal treatment lanjutan.',
        outcome: 'Peningkatan repeat treatment dari pelanggan baru sebesar 35% dalam 60 hari.',
      },
    ],
    faqs: [
      {
        question: 'Apakah OCTO CRM membaca chat WhatsApp pribadi karyawan secara otomatis?',
        answer: 'Tidak. Sesuai prinsip "Privacy by Design" dan batas etika privasi, OCTO CRM tidak menyadap atau membaca WhatsApp pribadi secara ilegal. Staf mencatat ringkasan interaksi secara sadar, atau menggunakan integrasi WhatsApp Business API resmi.',
      },
      {
        question: 'Apakah data kontak saya bisa dikunci sehingga tidak bisa dipindahkan?',
        answer: 'Sama sekali tidak. Prinsip "Data Ownership" OCTO menjamin Anda dapat mengekspor seluruh database kontak dan deal ke format CSV kapan saja tanpa dipersulit.',
      },
      {
        question: 'Bagaimana OCTO CRM terhubung dengan kartu review OCTO Tap?',
        answer: 'Pengunjung yang memindai kartu OCTO Tap dapat diarahkan ke halaman pendaftaran loyalitas atau form konsultasi. Data yang diberikan secara sukarela oleh pengunjung dapat langsung masuk sebagai prospek baru di OCTO CRM.',
      },
      {
        question: 'Berapa batas kontak yang bisa disimpan di OCTO CRM?',
        answer: 'Paket Free menyediakan kapasitas yang cukup untuk pemula, sedangkan paket Starter dan Growth memberikan batas kontak yang sangat leluasa tanpa biaya tersembunyi.',
      },
      {
        question: 'Apakah OCTO CRM cocok untuk bisnis dengan satu orang (solopreneur)?',
        answer: 'Sangat cocok. OCTO CRM dirancang dengan prinsip "Simple to start, scalable to grow". Anda dapat menggunakannya sendiri tanpa beban konfigurasi yang rumit, lalu mengundang tim saat bisnis berkembang.',
      },
    ],
    demoType: 'interaktif',
    demoStatus: 'Published',
    demoTitle: 'Simulasi Interaktif Workspace OCTO CRM',
    demoSubtitle: 'Eksplorasi visual Kanban pipeline, profil timeline pelanggan, daftar tugas harian (Today), dan dashboard konversi penjualan dengan data sintetis.',
    demoLastReviewed: '2026-10-18',
    demoOwner: 'Tim Produk CRM & Pertumbuhan Hubungan',
    relatedProductSlugs: ['octo-tap', 'octo-insights', 'octo-loyalty', 'octo-business'],
  },
];

export const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    slug: 'mengapa-rating-google-bintang-5-menjadi-penentu-pertumbuhan-bisnis-lokal',
    title: 'Mengapa Rating Google Bintang 5 Menjadi Penentu Utama Pertumbuhan Bisnis Lokal di 2026',
    summary:
      'Analisis mendalam mengenai algoritma pencarian lokal Google Maps dan bagaimana volume ulasan terverifikasi secara langsung meningkatkan kunjungan toko fisik.',
    content: `
Di era ketika 93% konsumen membaca ulasan online sebelum memutuskan mengunjungi toko fisik atau restoran, rating Google Business Profile bukan lagi sekadar pajangan kosmetik. Ini adalah mesin akuisisi pelanggan utama.

### Algoritma Google Maps Mengutamakan Tiga Faktor:
1. **Relevansi (Relevance):** Seberapa cocok profil bisnis dengan kata kunci yang diketik pencari.
2. **Jarak (Distance):** Kedekatan lokasi bisnis dengan pengguna smartphone saat melakukan pencarian.
3. **Otoritas & Prominensi (Prominence):** Faktor yang paling dipengaruhi oleh **jumlah ulasan, nilai rating rata-rata, dan kesegaran ulasan baru**.

### Masalah Terbesar: Silent Satisfied Customers
Secara psikologis, pelanggan yang kecewa memiliki kecenderungan 4x lebih tinggi untuk menulis ulasan negatif secara mandiri dibandingkan pelanggan yang puas. Pelanggan yang puas cenderung pulang begitu saja sambil tersenyum tanpa membuka Google Maps.

Inilah mengapa kehadiran alat bantu seperti **OCTO Tap** sangat krusial. Dengan mengurangi hambatan teknis dari "harus mencari nama toko, mengeja dengan benar, lalu mencari tab ulasan" menjadi hanya "sentuh ponsel 1 detik", bisnis Anda membuka keran ulasan positif organik dari mayoritas pelanggan yang puas.

### Etika Reputasi: Proof over Hype
Jangan pernah tergoda membeli ulasan palsu (fake reviews) atau memanipulasi algoritma dengan bot. Google semakin pintar mendeteksi anomali IP, pola akun, dan histori lokasi. Reputasi terbaik selalu dibangun dari ulasan asli pelanggan nyata yang menikmati layanan prima Anda.
    `,
    category: 'Artikel',
    tags: ['Google Maps', 'SEO Lokal', 'Reputasi Bisnis', 'Pertumbuhan UMKM'],
    author: {
      name: 'Dimas Wicaksono',
      role: 'Head of Growth OCTO',
    },
    readTime: '4 menit baca',
    status: 'Published',
    publishedAt: '2026-10-10',
    updatedAt: '2026-10-15',
    relatedSlugs: ['sop-kasir-cara-santun-mengajak-pelanggan-memberikan-review-google', 'studi-kasus-kopi-rasa-bahagia'],
    metaTitle: 'Pentingnya Rating Google Bintang 5 untuk Bisnis Lokal 2026 | OCTO',
    metaDescription: 'Pelajari bagaimana jumlah dan kesegaran ulasan Google Maps memengaruhi peringkat toko di Google Lokal dan strategi mendapatkannya secara etis.',
  },
  {
    id: 'res-2',
    slug: 'sop-kasir-cara-santun-mengajak-pelanggan-memberikan-review-google',
    title: 'SOP Kasir: Cara Santun dan Elegan Mengajak Pelanggan Memberikan Review Google',
    summary:
      'Panduan taktis dan skrip percakapan sopan bagi staf garis depan untuk meminta review tanpa membuat pelanggan merasa terpaksa atau tidak nyaman.',
    content: `
Meminta ulasan kepada pelanggan sering kali menjadi momok bagi staf kasir atau pramusaji. Rasa canggung, takut ditolak, atau terburu-buru antrean sering membuat momen emas ini terlewat.

Berikut panduan SOP sederhana 3 langkah yang terbukti meningkatkan partisipasi ulasan hingga 45%:

### 1. Validasi Kepuasan Pelanggan Dahulu (The Positive Trigger)
Jangan pernah langsung menodong review sebelum memastikan pengalaman pelanggan memuaskan.
* **Skrip Contoh:** *"Terima kasih sudah berkunjung hari ini, Kak! Apakah hidangannya sesuai selera Kakak?"*
* Jika pelanggan menjawab positif: *"Wah, syukurlah, terima kasih banyak Kak!"*

### 2. Jelaskan Makna Dukungan Mereka bagi Tim
Pelanggan senang membantu manusia nyata, bukan sekadar brand korporat.
* **Skrip Contoh:** *"Boleh minta tolong waktu 15 detik Kak? Dukungan review dari Kakak sangat berarti bagi tim barista kami hari ini."*

### 3. Fasilitasi dengan Kemudahan 1 Detik
Inilah peran kartu OCTO Tap. Tunjukkan kartu yang sudah ada di dekat mesin EDC atau kasir.
* **Skrip Contoh:** *"Cukup tempelkan ponsel Kakak ke kartu OCTO ini, nanti langsung terbuka halaman ulasannya tanpa perlu cari-cari lagi."*

### Hal yang Wajib Dihindari:
* Jangan memaksa pelanggan yang tampak terburu-buru atau sedang menerima panggilan telepon.
* Jangan mendikte kata-kata ulasan. Biarkan pelanggan menuliskan pengalaman mereka sendiri secara tulus.
* Jangan menawarkan imbalan uang tunai langsung demi ulasan bintang 5 karena melanggar pedoman Google Business Profile.
    `,
    category: 'Panduan',
    tags: ['SOP', 'Pelayanan Pelanggan', 'Kasir', 'Pelatihan Staf'],
    author: {
      name: 'Rian Pratama',
      role: 'Customer Experience Lead',
    },
    readTime: '5 menit baca',
    status: 'Published',
    publishedAt: '2026-10-05',
    updatedAt: '2026-10-12',
    downloadUrl: '/downloads/template-sop-kasir-review-google.pdf',
    downloadSize: '1.2 MB',
    relatedSlugs: ['mengapa-rating-google-bintang-5-menjadi-penentu-pertumbuhan-bisnis-lokal', 'checklist-audit-profil-google-bisnis-2026'],
    metaTitle: 'SOP Kasir Mengajak Pelanggan Memberikan Review Google | Panduan OCTO',
    metaDescription: 'Download template skrip dan alur SOP kasir ramah untuk mengajak pengunjung memberikan ulasan Google Maps dengan kartu OCTO Tap.',
  },
  {
    id: 'res-3',
    slug: 'studi-kasus-kopi-rasa-bahagia',
    title: 'Studi Kasus Kopi Rasa Bahagia: Pertumbuhan Ulasan Organik 3.2x Lipat dalam 60 Hari',
    summary:
      'Bagaimana coffee shop independen di Jakarta Selatan melipatgandakan ulasan bintang 5 dan naik ke peringkat 3 besar pencarian lokal Google Maps.',
    content: `
### Profil Bisnis
* **Nama Bisnis:** Kopi Rasa Bahagia (Simulasi Studi Kasus Terverifikasi)
* **Lokasi:** Senopati, Jakarta Selatan
* **Kategori:** Kafe & Specialty Coffee
* **Periode Uji Coba:** Agustus – Oktober 2026

### Tantangan Awal
Meskipun memiliki rasa kopi yang diakui lezat dan pengunjung ramai setiap sore, Kopi Rasa Bahagia hanya memiliki **47 ulasan di Google Maps** selama 1 tahun berdiri dengan rating 4.5. Di sisi lain, kompetitor baru di sekitarnya memiliki lebih dari 300 ulasan karena agresif meminta review.

### Solusi yang Diterapkan
1. Penempatan **2 unit kartu OCTO Tap Akrilik** di meja kasir dan meja pick-up pesanan.
2. Pelatihan SOP santun kasir selama 15 menit menggunakan panduan resmi OCTO.
3. Menghubungkan kartu langsung ke form ulasan resmi Google Business Kopi Rasa Bahagia.

### Hasil Setelah 60 Hari
* Total ulasan Google bertambah dari 47 ulasan menjadi **152 ulasan organik**.
* Rating Google Maps meningkat dari **4.5★ menjadi 4.8★**.
* Kenaikan impresi pencarian Google Maps untuk kata kunci "Coffee shop senopati enak" sebesar **68%**.
* Pelanggan mengapresiasi kemudahan tap NFC tanpa harus mengetik manual nama toko.

### Testimoni Pemilik Bisnis
*"OCTO Tap menyelesaikan masalah terbesar kami: staf kami tidak lagi merasa canggung mengajak tamu memberi ulasan karena prosesnya terasa modern, cepat, dan menyenangkan bagi pelanggan."*
    `,
    category: 'Studi Kasus',
    tags: ['F&B', 'Coffee Shop', 'Studi Kasus', 'Pertumbuhan Ulasan'],
    author: {
      name: 'Nadia Safitri',
      role: 'Content Strategist',
    },
    readTime: '6 menit baca',
    status: 'Published',
    publishedAt: '2026-10-01',
    updatedAt: '2026-10-14',
    relatedSlugs: ['mengapa-rating-google-bintang-5-menjadi-penentu-pertumbuhan-bisnis-lokal', 'checklist-audit-profil-google-bisnis-2026'],
    metaTitle: 'Studi Kasus Kopi Rasa Bahagia: Ulasan Tumbuh 3.2x Lipat | OCTO',
    metaDescription: 'Pelajari bagaimana Kopi Rasa Bahagia meningkatkan ulasan Google Maps dari 47 menjadi 152 ulasan terverifikasi dengan kartu OCTO Tap.',
  },
  {
    id: 'res-4',
    slug: 'checklist-audit-profil-google-bisnis-2026',
    title: 'Checklist Komprehensif Audit Profil Google Bisnis (GBP) 2026',
    summary:
      'Dokumen checklist 15 poin penting untuk memastikan profil Google Maps bisnis Anda lengkap, terverifikasi, dan siap mendominasi pencarian lokal.',
    content: `
Banyak pemilik bisnis merasa sudah mendaftarkan toko di Google Maps, namun tidak menyadari bahwa informasi profil mereka usang atau kurang lengkap. Google memberikan penalti penurunan visibilitas untuk profil yang jarang diperbarui.

Gunakan checklist ini untuk mengaudit akun bisnis Anda:

### Bagian 1: Data Identitas Inti (NAP Consistency)
- [ ] **Nama Bisnis:** Sesuai nama plang fisik tanpa keyword stuffing yang dilarang Google.
- [ ] **Alamat Lengkap & Titik Pin:** Pastikan pin GPS akurat hingga ke pintu masuk toko.
- [ ] **Nomor Telepon Resmi:** Gunakan nomor aktif yang terhubung ke customer service atau WhatsApp bisnis.
- [ ] **Kategori Utama (Primary Category):** Pilih kategori paling spesifik (contoh: "Specialty Coffee Shop" bukan sekadar "Store").

### Bagian 2: Jam Operasional & Layanan
- [ ] Jam buka reguler terisi lengkap untuk 7 hari dalam seminggu.
- [ ] Fitur jam libur nasional diaktifkan menjelang hari raya.
- [ ] Atribut fasilitas lengkap (contoh: Wi-Fi gratis, Tempat Parkir, Kursi Roda Ramah, Toilet Bersih).

### Bagian 3: Visual & Portofolio
- [ ] Foto tampak depan toko siang hari dan malam hari dengan resolusi tinggi.
- [ ] Foto menu makanan / katalog produk terbaru beserta harga.
- [ ] Foto staf yang ramah sedang bertugas untuk membangun kehangatan.

### Bagian 4: Manajemen Reputasi Ulasan
- [ ] Membalas 100% ulasan yang masuk (baik bintang 5 maupun bintang 1-3) secara profesional.
- [ ] Menyediakan titik interaksi tap NFC di lokasi toko menggunakan kartu OCTO Tap.
- [ ] Menjadwalkan evaluasi sentimen review berkala setiap akhir bulan.
    `,
    category: 'Materi Unduhan',
    tags: ['Checklist', 'Audit', 'Google Business Profile', 'Free Download'],
    author: {
      name: 'Dimas Wicaksono',
      role: 'Head of Growth OCTO',
    },
    readTime: '3 menit baca',
    status: 'Published',
    publishedAt: '2026-09-28',
    updatedAt: '2026-10-08',
    downloadUrl: '/downloads/checklist-audit-google-bisnis-2026.pdf',
    downloadSize: '850 KB',
    relatedSlugs: ['mengapa-rating-google-bintang-5-menjadi-penentu-pertumbuhan-bisnis-lokal', 'sop-kasir-cara-santun-mengajak-pelanggan-memberikan-review-google'],
    metaTitle: 'Download Checklist Audit Google Business Profile 2026 | OCTO',
    metaDescription: 'Unduh checklist gratis 15 langkah audit profil Google Bisnis untuk memaksimalkan peringkat pencarian lokal dan mendatangkan pelanggan.',
  },
  {
    id: 'res-5',
    slug: 'faq-lengkap-ekosistem-dan-kartu-octo',
    title: 'FAQ Terpadu: Seputar Kartu Fisik, Kompatibilitas Smartphone, dan Kebijakan Google',
    summary:
      'Kumpulan jawaban terlengkap atas pertanyaan teknis dan operasional yang paling sering ditanyakan calon pengguna dan mitra bisnis OCTO.',
    content: `
Selamat datang di pusat tanya-jawab resmi OCTO. Berikut rangkuman komprehensif atas hal-hal teknis yang sering ditanyakan:

### 1. Bagaimana cara kerja kartu NFC OCTO Tap?
Kartu OCTO Tap memiliki microchip pasif yang memancarkan sinyal radio frekuensi pendek (13.56 MHz). Ketika smartphone berkemampuan NFC didekatkan dalam jarak 1–3 cm, antena ponsel mendeteksi sinyal tersebut dan membaca tautan URL terenkripsi yang secara otomatis membuka aplikasi browser menuju form ulasan bisnis Anda.

### 2. Apakah smartphone Android dan iPhone lama bisa memakainya?
* **iPhone:** Semua iPhone model iPhone XS, XR, iPhone 11 hingga iPhone 16 ke atas mendukung pembacaan NFC otomatis di latar belakang (background tag reading) tanpa aplikasi tambahan.
* **Android:** Mayoritas smartphone Android kelas menengah ke atas telah memiliki sensor NFC aktif.
* **Untuk ponsel tanpa NFC:** Kartu OCTO Tap selalu dilengkapi **kode QR beresolusi tinggi** di sisi kartu, sehingga pengguna ponsel apa pun cukup membuka kamera untuk memindai link yang sama. 100% pengunjung terlayani!

### 3. Apakah ini melanggar kebijakan ulasan Google?
Tidak sama sekali. Kebijakan ulasan Google melarang keras:
* Membeli ulasan palsu dari orang yang tidak pernah berkunjung.
* Menggunakan bot atau akun kloningan.
* Memfilter review (contoh: mengarahkan ulasan buruk ke form internal dan ulasan baik ke Google).

OCTO Tap **TIDAK** melakukan hal-hal di atas. Kartu kami murni merupakan jembatan pintas digital yang membuka form ulasan resmi Google bisnis Anda. Pelanggan tetap menilai secara independen dan sukarela.

### 4. Berapa lama masa berlaku kartu fisik?
Kartu fisik OCTO Tap dirancang dari bahan PVC Matte dan Akrilik premium tahan air. Kartu tidak memiliki komponen baterai yang bisa habis, sehingga dapat digunakan terus-menerus selama fisik chip tidak patah atau terbakar.
    `,
    category: 'FAQ',
    tags: ['FAQ', 'Teknis', 'NFC', 'Google Policy'],
    author: {
      name: 'Tim Produk & Legal OCTO',
      role: 'OCTO Support Team',
    },
    readTime: '5 menit baca',
    status: 'Published',
    publishedAt: '2026-09-20',
    updatedAt: '2026-10-18',
    relatedSlugs: ['mengapa-rating-google-bintang-5-menjadi-penentu-pertumbuhan-bisnis-lokal'],
    metaTitle: 'FAQ Seputar Kartu NFC dan Ekosistem OCTO | Tanya Jawab Resmi',
    metaDescription: 'Jawaban lengkap mengenai cara kerja kartu OCTO Tap, kompatibilitas iPhone/Android, legalitas Google Review, dan perawatan kartu fisik.',
  },
];

export const INITIAL_LEADS: import('./types').Lead[] = [
  {
    id: 'lead-101',
    fullName: 'Budi Santoso',
    email: 'budi@kopinusantara.id',
    phone: '081298765432',
    companyName: 'Kopi Nusantara Group',
    companySize: '11-50 karyawan',
    productInterest: 'octo-tap',
    formType: 'request-demo',
    message: 'Kami ingin memesan 8 kartu kustom dengan logo kafe kami untuk 4 cabang di BSD dan Bintaro.',
    preferredDate: '2026-10-22',
    location: 'Tangerang Selatan',
    status: 'Demo Terjadwal',
    assignedTo: 'Sarah Widjaja (Senior Sales)',
    notes: [
      {
        id: 'n-1',
        author: 'Sarah Widjaja',
        text: 'Sudah dihubungi via WA. Klien berminat memesan paket custom akrilik 8 unit. Jadwal call demo Zoom Kamis jam 14.00.',
        createdAt: '2026-10-18T10:30:00Z',
      },
    ],
    utmSource: 'google_search',
    utmCampaign: 'local_seo_fnb',
    consentGiven: true,
    createdAt: '2026-10-18T09:15:00Z',
    updatedAt: '2026-10-18T10:30:00Z',
  },
  {
    id: 'lead-102',
    fullName: 'drg. Melani Hartono',
    email: 'drg.melani@dentalsmile.co.id',
    phone: '081122334455',
    companyName: 'Dental Smile Clinic',
    companySize: '1-10 karyawan',
    productInterest: 'octo-tap',
    formType: 'consultation',
    message: 'Ingin konsultasi penempatan kartu di meja kasir klinik gigi kami untuk meningkatkan review pasien.',
    preferredDate: '2026-10-24',
    location: 'Jakarta Barat',
    status: 'Terkualifikasi',
    assignedTo: 'Andi Saputra',
    notes: [
      {
        id: 'n-2',
        author: 'Andi Saputra',
        text: 'Klinik memiliki 2 dokter aktif. Sangat membutuhkan review untuk bersaing dengan klinik sekitar Puri Kembangan.',
        createdAt: '2026-10-17T15:20:00Z',
      },
    ],
    utmSource: 'instagram_ads',
    utmCampaign: 'medical_aesthetic',
    consentGiven: true,
    createdAt: '2026-10-17T14:00:00Z',
    updatedAt: '2026-10-17T15:20:00Z',
  },
  {
    id: 'lead-103',
    fullName: 'Hendra Gunawan',
    email: 'hendra@megaprinting.id',
    phone: '081399887766',
    companyName: 'PT Mega Sinergi Solusindo',
    companySize: '51-200 karyawan',
    productInterest: 'partner',
    formType: 'partner-apply',
    partnerType: 'Reseller Hardware & Agensi Digital',
    message: 'Kami agensi digital marketing yang mengelola 40+ klien resto dan klinik. Ingin menjadi authorized reseller resmi OCTO.',
    location: 'Surabaya',
    status: 'Baru',
    assignedTo: 'Belum Ditugaskan',
    notes: [],
    utmSource: 'direct',
    utmCampaign: 'partner_ecosystem',
    consentGiven: true,
    createdAt: '2026-10-18T11:45:00Z',
    updatedAt: '2026-10-18T11:45:00Z',
  },
  {
    id: 'lead-104',
    fullName: 'Hendro Kusuma',
    email: 'hendro@suryaabadi-retail.com',
    phone: '081377889900',
    companyName: 'PT Surya Abadi Retail',
    companySize: '11-50 karyawan',
    productInterest: 'octo-crm',
    formType: 'request-demo',
    message: 'Kami ingin merapikan pipeline sales B2B dan database pelanggan yang saat ini tercecer di spreadsheet dan chat WhatsApp staf sales.',
    preferredDate: '2026-10-25',
    location: 'Surabaya & Jakarta',
    status: 'Baru',
    assignedTo: 'Belum Ditugaskan',
    notes: [
      {
        id: 'n-crm-1',
        author: 'Sistem Intake',
        text: 'Inbound request demo untuk OCTO CRM dari halaman katalog produk. Klien ingin melihat visual pipeline Kanban dan fitur Today Tasks.',
        createdAt: '2026-10-18T14:40:00Z',
      },
    ],
    utmSource: 'direct_web',
    utmCampaign: 'octo_crm_launch',
    consentGiven: true,
    createdAt: '2026-10-18T14:40:00Z',
    updatedAt: '2026-10-18T14:40:00Z',
  },
];

export const INITIAL_AUDIT_LOGS: import('./types').AuditLog[] = [
  {
    id: 'audit-1',
    action: 'LOGIN_SUCCESS',
    actor: 'admin@octo.id',
    role: 'Super Admin',
    details: 'Login berhasil dengan verifikasi sesi aman.',
    timestamp: '2026-10-18T12:00:00Z',
    ipAddress: '182.253.14.88',
  },
  {
    id: 'audit-2',
    action: 'PRODUCT_STATUS_UPDATE',
    actor: 'admin@octo.id',
    role: 'Super Admin',
    details: 'Memperbarui status produk OCTO Insights menjadi "Akses Terbatas / Beta".',
    timestamp: '2026-10-18T12:15:00Z',
    ipAddress: '182.253.14.88',
  },
  {
    id: 'audit-3',
    action: 'RESOURCE_PUBLISHED',
    actor: 'editor@octo.id',
    role: 'Editor/Approver',
    details: 'Memublikasikan artikel "Mengapa Rating Google Bintang 5 Menjadi Penentu Pertumbuhan Bisnis Lokal".',
    timestamp: '2026-10-18T12:30:00Z',
    ipAddress: '103.111.20.12',
  },
];

export const INDUSTRIES = [
  {
    slug: 'retail',
    name: 'Retail & Toko Modern',
    tagline: 'Ubah Pengunjung Toko Menjadi Duta Merek Digital',
    description: 'Bantu pembeli offline yang puas memberikan ulasan positif instan di kasir sebelum melangkah keluar toko.',
    iconName: 'ShoppingBag',
    stats: 'Review naik hingga 3.4x di jam sibuk',
    challenges: 'Pembeli retail sering langsung pergi setelah membayar; sulit membangun relasi ulasan secara manual.',
    solutions: 'Kartu OCTO Tap di setiap meja kasir kasir dan stiker etalase kasir dengan instruksi tap ramah.',
    targetProducts: ['octo-tap', 'octo-loyalty'],
  },
  {
    slug: 'food-beverage',
    name: 'Kafe, Resto & F&B',
    tagline: 'Jadikan Setiap Hidangan Lezat Berbuah Ulasan Bintang 5',
    description: 'Sentuhan instan saat tamu menikmati kopi atau menunggu bill mengalirkan ulasan Google Maps setiap harinya.',
    iconName: 'UtensilsCrossed',
    stats: 'Dominasi peringkat 3 besar Google Maps lokal',
    challenges: 'Rating Google Maps menentukan apakah turis atau pelanggan baru akan mampir atau memilih kafe sebelah.',
    solutions: 'Stand akrilik kartu OCTO Tap di meja pelanggan atau diselipkan bersama nota tagihan pelanggan.',
    targetProducts: ['octo-tap', 'octo-insights', 'octo-loyalty'],
  },
  {
    slug: 'beauty-wellness',
    name: 'Klinik Kecantikan, Spa & Salon',
    tagline: 'Bangun Reputasi Layanan Prima yang Tak Terbantahkan',
    description: 'Calon pasien baru mencari bukti otentik sebelum mempercayakan perawatan wajah dan tubuh mereka.',
    iconName: 'Sparkles',
    stats: 'Konversi konsultasi baru naik hingga 50%',
    challenges: 'Pasien treatment memerlukan rasa percaya tinggi sebelum booking; ulasan bintang 5 adalah faktor nomor satu.',
    solutions: 'Kartu OCTO Tap di meja resepsionis saat pasien merasa puas pasca-treatment dan menyelesaikan administrasi.',
    targetProducts: ['octo-tap', 'octo-insights'],
  },
  {
    slug: 'healthcare',
    name: 'Klinik Medis, Faskes & Dokter',
    tagline: 'Ulasan Pasien yang Terpercaya, Transparan dan Sesuai Etika',
    description: 'Tingkatkan keterlihatan fasilitas kesehatan Anda dengan ulasan pasien nyata tanpa melanggar etika profesi.',
    iconName: 'HeartPulse',
    stats: 'Pasien baru menemukan faskes terdekat dengan mudah',
    challenges: 'Fasilitas kesehatan sering kekurangan ulasan publik karena staf medis fokus penuh pada penanganan klinis.',
    solutions: 'Kartu tap di meja informasi farmasi atau kasir setelah pasien selesai mengambil resep obat.',
    targetProducts: ['octo-tap', 'octo-business'],
  },
  {
    slug: 'multi-location',
    name: 'Bisnis Multi-Cabang & Waralaba',
    tagline: 'Standardisasi Reputasi dan Pantau Performa Lintas Lokasi',
    description: 'Kendalikan link Google Maps 10 hingga 100+ cabang Anda secara sentral dari satu dashboard kantor pusat.',
    iconName: 'Building2',
    stats: 'Efisiensi pengelolaan data cabang hingga 90%',
    challenges: 'Sulit memastikan kasir tiap cabang konsisten meminta review dan link ulasan cabang sering keliru.',
    solutions: 'Ekosistem OCTO Business menghubungkan kartu semua cabang dan memantau peringkat ulasannya secara serentak.',
    targetProducts: ['octo-business', 'octo-tap', 'octo-insights'],
  },
];
