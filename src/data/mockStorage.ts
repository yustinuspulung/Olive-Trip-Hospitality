import { ServiceRequest, Quote, ConciergeRequest, AuditLog, RequestStatus } from '../types';

const INITIAL_REQUESTS: ServiceRequest[] = [
  {
    id: 'req-202609-001',
    requestNumber: 'REQ/OTH/202609/0042',
    client: {
      organization: 'Kementerian Keuangan RI',
      delegationType: 'B2G_GOVERNMENT',
      picName: 'Bambang Prasetyo, S.E., M.M.',
      picTitle: 'Kepala Subbagian Rumah Tangga & Protokol',
      picPhone: '+62 812-8880-5482',
      picEmail: 'bambang.prasetyo@kemenkeu.go.id',
      referenceName: 'Konsinyasi Harmonisasi Standar Biaya Masukan (SBU) TA 2027',
      notes: 'Delegasi terdiri dari pejabat Eselon II dan tim perumus. Mohon disiapkan kamar bebas rokok (non-smoking) serta armada standby di Terminal 3 Bandara Soekarno-Hatta (CGK).'
    },
    accommodation: {
      hotelId: 'h-1',
      hotelName: 'JS Luwansa Hotel Jakarta',
      checkInDate: '2026-10-12',
      checkOutDate: '2026-10-15',
      nights: 3,
      roomType: 'Deluxe Room (Twin Bed)',
      roomQuantity: 6,
      guestQuantity: 12,
      specialNotes: 'Dekat dengan ruang rapat komisi; butuh meja kerja di kamar untuk telaah dokumen dinas.'
    },
    transfer: {
      direction: 'ROUND_TRIP',
      airport: 'CGK',
      travelDate: '2026-10-12',
      pickupTime: '10:30 WIB',
      pickupLocation: 'Terminal 3 Kedatangan Domestik Bandara CGK',
      dropoffLocation: 'JS Luwansa Hotel Jakarta, Jl. HR Rasuna Said',
      flightNumber: 'GA-412 (Garuda Indonesia)',
      passengerCount: 12,
      luggageCount: 14,
      selectedVehicles: [
        {
          vehicleId: 'v-3',
          vehicleName: 'Toyota Hiace Premio',
          quantity: 1,
          capacityPax: 15
        },
        {
          vehicleId: 'v-1',
          vehicleName: 'Sedan Executive',
          quantity: 1,
          capacityPax: 4
        }
      ],
      specialNotes: 'Driver mengenakan seragam batik rapi dengan paging board "DELEGASI KEMENKEU RI".'
    },
    status: 'QUOTED',
    createdAt: '2026-09-17T14:20:00Z',
    updatedAt: '2026-09-18T08:15:00Z',
    quoteId: 'quo-202609-001',
    operationalNotes: 'Koordinasi penjemputan CGK telah diteruskan ke dispatcher armada lapangan. Reservasi kamar di JS Luwansa siap konfirmasi setelah PIC menyetujui proposal layanan.',
    history: [
      { timestamp: '2026-09-17T14:20:00Z', actor: 'Bambang Prasetyo (PIC)', action: 'SUBMITTED', notes: 'Pengajuan kebutuhan kunker kementerian.' },
      { timestamp: '2026-09-17T15:05:00Z', actor: 'Olive Sales Team', action: 'IN_REVIEW', notes: 'Validasi ketersediaan kamar & alokasi armada bandara.' },
      { timestamp: '2026-09-18T08:15:00Z', actor: 'Olive Operations', action: 'QUOTED', notes: 'Surat Penawaran Layanan (Proposal Koordinasi v1.0) resmi diterbitkan.' }
    ]
  },
  {
    id: 'req-202609-002',
    requestNumber: 'REQ/OTH/202609/0043',
    client: {
      organization: 'PT Adhi Karya (Persero) Tbk',
      delegationType: 'B2B_CORPORATE',
      picName: 'Rian Hidayat',
      picTitle: 'Corporate Travel Coordinator & Secretary',
      picPhone: '+62 813-9921-7700',
      picEmail: 'rian.hidayat@adhikarya.co.id',
      referenceName: 'Executive Board Meeting & Site Inspection Tol Jakarta-Cikampek',
      notes: 'Kunjungan direksi operasional dan konsultan infrastruktur. Memerlukan penjemputan cepat dari Bandara Halim Perdanakusuma (HLP).'
    },
    accommodation: {
      hotelId: 'h-6',
      hotelName: 'PARK HOTEL Cawang - Jakarta',
      checkInDate: '2026-10-18',
      checkOutDate: '2026-10-20',
      nights: 2,
      roomType: 'Business Room & Suite',
      roomQuantity: 4,
      guestQuantity: 6,
      specialNotes: 'Late check-out jika memungkinkan; akses internet high-speed di kamar.'
    },
    transfer: {
      direction: 'AIRPORT_TO_HOTEL',
      airport: 'HLP',
      travelDate: '2026-10-18',
      pickupTime: '14:15 WIB',
      pickupLocation: 'VIP Arrival Lounge Bandara Halim Perdanakusuma (HLP)',
      dropoffLocation: 'PARK HOTEL Cawang, Jl. DI Panjaitan',
      flightNumber: 'Batik Air ID-7014',
      passengerCount: 6,
      luggageCount: 6,
      selectedVehicles: [
        {
          vehicleId: 'v-2',
          vehicleName: 'Premium SUV (Fortuner)',
          quantity: 2,
          capacityPax: 6
        }
      ],
      specialNotes: 'All-in armada penjemputan langsung di lobi VIP Halim.'
    },
    status: 'APPROVED',
    createdAt: '2026-09-16T10:00:00Z',
    updatedAt: '2026-09-17T16:30:00Z',
    quoteId: 'quo-202609-002',
    operationalNotes: 'Proposal telah disetujui oleh PIC Perusahaan. Siap diterbitkan konfirmasi voucher koordinasi.',
    history: [
      { timestamp: '2026-09-16T10:00:00Z', actor: 'Rian Hidayat (PIC)', action: 'SUBMITTED' },
      { timestamp: '2026-09-16T11:30:00Z', actor: 'Olive Operations', action: 'QUOTED' },
      { timestamp: '2026-09-17T16:30:00Z', actor: 'Rian Hidayat (PIC)', action: 'APPROVED', notes: 'Proposal disetujui sesuai spesifikasi armada dan kamar dinas.' }
    ]
  }
];

const INITIAL_QUOTES: Quote[] = [
  {
    id: 'quo-202609-001',
    quoteNumber: 'QUO/OTH/202609/0042',
    requestId: 'req-202609-001',
    requestNumber: 'REQ/OTH/202609/0042',
    client: INITIAL_REQUESTS[0].client,
    status: 'QUOTED',
    issueDate: '2026-09-18',
    validUntil: '2026-10-02',
    currentVersion: 1,
    createdAt: '2026-09-18T08:15:00Z',
    updatedAt: '2026-09-18T08:15:00Z',
    versions: [
      {
        versionNumber: 1,
        createdAt: '2026-09-18T08:15:00Z',
        createdBy: 'Olive Trip & Hospitality Operations Desk',
        accommodationSnapshot: INITIAL_REQUESTS[0].accommodation,
        transferSnapshot: INITIAL_REQUESTS[0].transfer,
        serviceNotes: [
          'Alokasi 6 unit Deluxe Room di JS Luwansa Hotel Jakarta (Kuningan) blok lantai non-smoking bersebelahan.',
          'Penyediaan 1 unit Toyota Hiace Premio (15 pax) dan 1 unit Sedan Executive (4 pax) siap jemput di CGK Terminal 3.',
          'Driver profesional berbusana batik dinas rapi dan membawa papan nama resmi "KEMENTERIAN KEUANGAN RI".',
          'Layanan transportasi bandara bersifat All-In mencakup Driver, Bahan Bakar Minyak (BBM), Tarif Tol Bandara & Dalam Kota, serta Parkir Resmi bandara.',
          'Dukungan koordinasi liaison officer (LO) Olive standby 24 jam selama periode kunjungan dinas berlangsung.'
        ],
        terms: [
          'Layanan akomodasi kamar hotel dan armada transportasi mengikat setelah verifikasi persetujuan resmi PIC.',
          'Perubahan jadwal penerbangan (reschedule) atau manifest nama delegasi harap disampaikan minimal 6 jam sebelum jam mendarat.',
          'Penyesuaian spesifikasi ruangan/kendaraan tambahan dapat dikoordinasikan langsung melalui menu revisi proposal atau Executive Concierge Desk.',
          'Dokumen penawaran ini sah dan resmi sebagai instrumen koordinasi perjalanan dinas B2G/B2B tanpa biaya tersembunyi.'
        ]
      }
    ]
  },
  {
    id: 'quo-202609-002',
    quoteNumber: 'QUO/OTH/202609/0043',
    requestId: 'req-202609-002',
    requestNumber: 'REQ/OTH/202609/0043',
    client: INITIAL_REQUESTS[1].client,
    status: 'APPROVED',
    issueDate: '2026-09-16',
    validUntil: '2026-09-30',
    currentVersion: 1,
    createdAt: '2026-09-16T11:30:00Z',
    updatedAt: '2026-09-17T16:30:00Z',
    versions: [
      {
        versionNumber: 1,
        createdAt: '2026-09-16T11:30:00Z',
        createdBy: 'Olive Trip & Hospitality Operations Desk',
        accommodationSnapshot: INITIAL_REQUESTS[1].accommodation,
        transferSnapshot: INITIAL_REQUESTS[1].transfer,
        clientApprovedAt: '2026-09-17T16:30:00Z',
        clientApprovedBy: 'Rian Hidayat (Corporate Travel Coordinator)',
        clientComment: 'Proposal disetujui sesuai kebutuhan direksi PT Adhi Karya.',
        serviceNotes: [
          '4 unit Business Room & Suite di PARK HOTEL Cawang dialokasikan di lantai eksekutif.',
          '2 unit Premium SUV (Fortuner) penjemputan VIP di Bandara Halim Perdanakusuma (HLP).',
          'Driver berjas rapi, AC sejuk, air mineral higienis, dan bagasi ditangani penuh.'
        ],
        terms: [
          'Konfirmasi reservasi final diproses setelah penandatanganan lembar persetujuan.',
          'Layanan all-in operasional jalan tol Becakayu/Jagorawi dan parkir bandara.'
        ]
      }
    ]
  }
];

const INITIAL_CONCIERGE: ConciergeRequest[] = [
  {
    id: 'con-01',
    createdAt: '2026-09-18T06:00:00Z',
    picName: 'Dra. Sri Wahyuni',
    organization: 'Bappeda Jawa Timur',
    phone: '+62 811-345-8899',
    travelDate: '2026-10-14',
    pickupLocation: 'Hotel Mulia Senayan',
    destination: 'Gedung Bappenas RI & Restoran Plataran Menteng',
    passengerCount: 5,
    vehiclePreference: 'Premium SUV',
    purpose: 'Diplomatic / VIP Meeting',
    notes: 'Mohon pengemudi memahami rute jalan ganjil-genap Jakarta Pusat.',
    status: 'CONFIRMED'
  }
];

const INITIAL_LOGS: AuditLog[] = [
  {
    id: 'log-01',
    timestamp: '2026-09-17T14:20:00Z',
    actor: 'Bambang Prasetyo (PIC)',
    action: 'CREATE_REQUEST',
    targetEntity: 'ServiceRequest',
    entityId: 'req-202609-001',
    details: 'Membuat permohonan akomodasi JS Luwansa & transfer CGK (12 pax).'
  },
  {
    id: 'log-02',
    timestamp: '2026-09-18T08:15:00Z',
    actor: 'Olive Operations',
    action: 'GENERATE_QUOTE',
    targetEntity: 'Quote',
    entityId: 'quo-202609-001',
    details: 'Menerbitkan Proposal Koordinasi v1.0 resmi tanpa biaya/pricing.'
  }
];

class StorageServiceEngine {
  private requests: ServiceRequest[] = [];
  private quotes: Quote[] = [];
  private concierge: ConciergeRequest[] = [];
  private logs: AuditLog[] = [];

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window !== 'undefined') {
      const storedReq = localStorage.getItem('olive_requests');
      const storedQuo = localStorage.getItem('olive_quotes');
      const storedCon = localStorage.getItem('olive_concierge');
      const storedLogs = localStorage.getItem('olive_logs');

      this.requests = storedReq ? JSON.parse(storedReq) : [...INITIAL_REQUESTS];
      this.quotes = storedQuo ? JSON.parse(storedQuo) : [...INITIAL_QUOTES];
      this.concierge = storedCon ? JSON.parse(storedCon) : [...INITIAL_CONCIERGE];
      this.logs = storedLogs ? JSON.parse(storedLogs) : [...INITIAL_LOGS];
    } else {
      this.requests = [...INITIAL_REQUESTS];
      this.quotes = [...INITIAL_QUOTES];
      this.concierge = [...INITIAL_CONCIERGE];
      this.logs = [...INITIAL_LOGS];
    }
  }

  private save() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('olive_requests', JSON.stringify(this.requests));
      localStorage.setItem('olive_quotes', JSON.stringify(this.quotes));
      localStorage.setItem('olive_concierge', JSON.stringify(this.concierge));
      localStorage.setItem('olive_logs', JSON.stringify(this.logs));
    }
  }

  getRequests(): ServiceRequest[] {
    return [...this.requests];
  }

  getRequestById(id: string): ServiceRequest | undefined {
    return this.requests.find((r) => r.id === id || r.requestNumber === id);
  }

  createServiceRequest(data: any): ServiceRequest {
    const id = `req-${Date.now()}`;
    const reqNum = `REQ/OTH/${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}/${Math.floor(1000 + Math.random() * 9000)}`;

    const newReq: ServiceRequest = {
      id,
      requestNumber: reqNum,
      client: {
        organization: data.organization || '',
        delegationType: data.delegationType || 'B2G_GOVERNMENT',
        picName: data.picName || '',
        picTitle: data.picTitle || '',
        picPhone: data.picPhone || '',
        picEmail: data.picEmail || '',
        referenceName: data.eventReference || '',
        notes: data.notes || ''
      },
      accommodation: data.hotelName ? {
        hotelId: data.hotelId || 'h-1',
        hotelName: data.hotelName || '',
        checkInDate: data.checkInDate || '',
        checkOutDate: data.checkOutDate || '',
        nights: data.nightsCount || 1,
        roomType: data.roomType || '',
        roomQuantity: data.roomQuantity || 1,
        guestQuantity: data.guestCount || 1,
        specialNotes: data.specialRequests || ''
      } : undefined,
      transfer: data.transportIncluded ? {
        direction: data.transferDirection || 'AIRPORT_TO_HOTEL',
        airport: data.airport || 'CGK',
        travelDate: data.checkInDate || '',
        pickupTime: data.pickupDateTime ? data.pickupDateTime.split('T')[1] || '10:00 WIB' : '10:00 WIB',
        pickupLocation: `Terminal Bandara ${data.airport || 'CGK'}`,
        dropoffLocation: data.hotelName || '',
        flightNumber: data.flightNumber || 'GA-TBD',
        passengerCount: data.guestCount || 1,
        luggageCount: data.luggageEstimate || 1,
        selectedVehicles: data.selectedVehicles || [],
        specialNotes: 'Paging board delegasi resmi'
      } : undefined,
      status: 'SUBMITTED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [
        {
          timestamp: new Date().toISOString(),
          actor: data.picName || 'PIC Delegasi',
          action: 'SUBMITTED',
          notes: 'Permohonan dibuat melalui portal Olive Trip & Hospitality'
        }
      ],
      // direct convenience fields
      organization: data.organization,
      delegationType: data.delegationType,
      picName: data.picName,
      picTitle: data.picTitle,
      picPhone: data.picPhone,
      picEmail: data.picEmail,
      eventReference: data.eventReference,
      hotelId: data.hotelId,
      hotelName: data.hotelName,
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate,
      nightsCount: data.nightsCount,
      roomType: data.roomType,
      roomQuantity: data.roomQuantity,
      guestCount: data.guestCount,
      specialRequests: data.specialRequests,
      transportIncluded: data.transportIncluded,
      transferDirection: data.transferDirection,
      airport: data.airport,
      flightNumber: data.flightNumber,
      pickupDateTime: data.pickupDateTime,
      selectedVehicles: data.selectedVehicles,
      luggageEstimate: data.luggageEstimate,
      notes: data.notes
    };

    this.requests.unshift(newReq);
    this.addLog(data.picName || 'PIC', 'CREATE_REQUEST', 'ServiceRequest', newReq.id, `Permohonan baru untuk ${data.organization}`);
    this.save();
    return newReq;
  }

  createQuote(requestId: string, spec: any): Quote {
    const req = this.getRequestById(requestId);
    const id = `quo-${Date.now()}`;
    const quoNum = `QUO/OTH/${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}/${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const validUntil = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const newQuote: Quote = {
      id,
      quoteNumber: quoNum,
      proposalNumber: quoNum,
      requestId,
      requestNumber: req?.requestNumber || quoNum,
      client: req?.client || {
        organization: 'Instansi',
        delegationType: 'B2G_GOVERNMENT',
        picName: 'PIC',
        picTitle: '',
        picPhone: '',
        picEmail: '',
        referenceName: ''
      },
      status: 'QUOTED',
      issueDate: now.toISOString().split('T')[0],
      validUntil,
      currentVersion: 1,
      version: 1.0,
      hotelSpec: spec.hotelSpec,
      transportSpec: spec.transportSpec,
      termsAndConditions: spec.termsAndConditions || [
        'Proposal koordinasi resmi diterbitkan untuk perencanaan delegasi pemerintah & korporasi.',
        'Seluruh armada telah memenuhi SOP keamanan dan keprotokolan dinas Jabodetabek.',
        'Fasilitas hotel mengikuti ketersediaan konfirmasi alokasi kamar saat approval dilakukan.',
        'Bebas biaya pembatalan atau perubahan tanggal hingga H-2 jadwal kunjungan dinas.'
      ],
      revisionHistory: [],
      versions: [
        {
          versionNumber: 1,
          createdAt: now.toISOString(),
          createdBy: 'Olive Trip & Hospitality Operations Desk',
          serviceNotes: spec.termsAndConditions || [],
          terms: spec.termsAndConditions || []
        }
      ],
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };

    if (req) {
      req.status = 'QUOTED';
      req.quoteId = newQuote.id;
    }

    this.quotes.unshift(newQuote);
    this.addLog('Olive Operations', 'GENERATE_QUOTE', 'Quote', newQuote.id, `Proposal terbit: ${quoNum}`);
    this.save();
    return newQuote;
  }

  saveRequest(req: ServiceRequest): ServiceRequest {
    const idx = this.requests.findIndex((r) => r.id === req.id);
    if (idx >= 0) {
      this.requests[idx] = { ...req, updatedAt: new Date().toISOString() };
    } else {
      this.requests.unshift(req);
    }
    this.addLog('System / PIC', 'SAVE_REQUEST', 'ServiceRequest', req.id, `Simpan request ${req.requestNumber}`);
    this.save();
    return req;
  }

  getQuotes(): Quote[] {
    return [...this.quotes];
  }

  getQuoteById(id: string): Quote | undefined {
    return this.quotes.find((q) => q.id === id || q.quoteNumber === id || q.proposalNumber === id);
  }

  getQuoteByRequestId(requestId: string): Quote | undefined {
    return this.quotes.find((q) => q.requestId === requestId || q.requestNumber === requestId);
  }

  getQuotesByRequestId(requestId: string): Quote[] {
    return this.quotes.filter((q) => q.requestId === requestId || q.requestNumber === requestId);
  }

  saveQuote(quote: Quote): Quote {
    const idx = this.quotes.findIndex((q) => q.id === quote.id);
    if (idx >= 0) {
      this.quotes[idx] = { ...quote, updatedAt: new Date().toISOString() };
    } else {
      this.quotes.unshift(quote);
    }
    this.addLog('Olive Operations', 'SAVE_QUOTE', 'Quote', quote.id, `Simpan quote proposal ${quote.quoteNumber}`);
    this.save();
    return quote;
  }

  requestQuoteRevision(quoteId: string, param2: string, param3?: string): Quote | null {
    const quote = this.quotes.find((q) => q.id === quoteId);
    if (!quote) return null;

    const requestedBy = param3 ? param2 : 'PIC Delegasi';
    const comment = param3 ? param3 : param2;

    quote.status = 'REVISION_REQUESTED';
    quote.updatedAt = new Date().toISOString();
    const newVer = (quote.version || quote.currentVersion || 1) + 0.1;
    quote.version = Number(newVer.toFixed(1));
    quote.currentVersion = Math.floor(newVer);

    if (!quote.revisionHistory) quote.revisionHistory = [];
    quote.revisionHistory.push({
      version: quote.version,
      timestamp: new Date().toISOString(),
      changeSummary: comment
    });

    const currentVer = quote.versions.find((v) => v.versionNumber === quote.currentVersion);
    if (currentVer) {
      if (!currentVer.revisions) currentVer.revisions = [];
      currentVer.revisions.push({
        requestedAt: new Date().toISOString(),
        requestedBy,
        comment
      });
    }

    // Also update matching request
    const req = this.requests.find((r) => r.id === quote.requestId);
    if (req) {
      req.status = 'REVISION_REQUESTED';
      req.history.push({
        timestamp: new Date().toISOString(),
        actor: requestedBy,
        action: 'REVISION_REQUESTED',
        notes: comment
      });
    }

    this.addLog(requestedBy, 'REQUEST_REVISION', 'Quote', quote.id, `Revisi diajukan: ${comment}`);
    this.save();
    return quote;
  }


  approveQuote(quoteId: string, approvedBy: string, comment?: string): Quote | null {
    const quote = this.quotes.find((q) => q.id === quoteId);
    if (!quote) return null;

    quote.status = 'APPROVED';
    quote.updatedAt = new Date().toISOString();

    const currentVer = quote.versions.find((v) => v.versionNumber === quote.currentVersion);
    if (currentVer) {
      currentVer.clientApprovedAt = new Date().toISOString();
      currentVer.clientApprovedBy = approvedBy;
      currentVer.clientComment = comment || 'Disetujui tanpa catatan tambahan.';
    }

    const req = this.requests.find((r) => r.id === quote.requestId);
    if (req) {
      req.status = 'APPROVED';
      req.history.push({
        timestamp: new Date().toISOString(),
        actor: approvedBy,
        action: 'APPROVED',
        notes: comment || 'Persetujuan resmi proposal layanan.'
      });
    }

    this.addLog(approvedBy, 'APPROVE_QUOTE', 'Quote', quote.id, `Proposal disetujui secara resmi.`);
    this.save();
    return quote;
  }

  confirmQuoteByOlive(quoteId: string, staffName: string): Quote | null {
    const quote = this.quotes.find((q) => q.id === quoteId);
    if (!quote) return null;

    quote.status = 'CONFIRMED';
    quote.updatedAt = new Date().toISOString();

    const req = this.requests.find((r) => r.id === quote.requestId);
    if (req) {
      req.status = 'CONFIRMED';
      req.history.push({
        timestamp: new Date().toISOString(),
        actor: staffName,
        action: 'CONFIRMED',
        notes: 'Koordinasi hotel dan armada telah dikonfirmasi final oleh tim operasional Olive.'
      });
    }

    this.addLog(staffName, 'CONFIRM_SERVICE', 'Quote', quote.id, `Layanan dikonfirmasi oleh operasional.`);
    this.save();
    return quote;
  }

  getConciergeRequests(): ConciergeRequest[] {
    return [...this.concierge];
  }

  createConciergeRequest(data: Omit<ConciergeRequest, 'id' | 'createdAt' | 'status'>): ConciergeRequest {
    const item: ConciergeRequest = {
      ...data,
      id: `con-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'PENDING'
    };
    this.concierge.unshift(item);
    this.addLog(item.picName, 'CREATE_CONCIERGE', 'ConciergeRequest', item.id, `Permintaan concierge khusus: ${item.purpose}`);
    this.save();
    return item;
  }

  updateRequestStatus(id: string, status: RequestStatus): ServiceRequest | null {
    const req = this.requests.find((r) => r.id === id);
    if (!req) return null;
    req.status = status;
    req.updatedAt = new Date().toISOString();
    req.history.push({
      timestamp: new Date().toISOString(),
      actor: 'Olive Operations Desk',
      action: status,
      notes: `Status diperbarui menjadi ${status}`
    });
    this.addLog('Olive Operations Desk', 'UPDATE_STATUS', 'ServiceRequest', req.id, `Status request diubah ke ${status}`);
    this.save();
    return req;
  }

  updateQuoteStatus(id: string, status: RequestStatus): Quote | null {
    const quote = this.quotes.find((q) => q.id === id);
    if (!quote) return null;
    quote.status = status;
    quote.updatedAt = new Date().toISOString();
    this.addLog('Olive Operations Desk', 'UPDATE_QUOTE_STATUS', 'Quote', quote.id, `Status quote diubah ke ${status}`);
    this.save();
    return quote;
  }

  getAuditLogs(): AuditLog[] {
    return [...this.logs];
  }

  private addLog(actor: string, action: string, targetEntity: string, entityId: string, details: string) {
    this.logs.unshift({
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      actor,
      action,
      targetEntity,
      entityId,
      details
    });
  }
}

export const storageService = new StorageServiceEngine();
export const StorageServiceInstance = storageService;
export const StorageService = storageService;
