export type DelegationType = 'B2G_GOVERNMENT' | 'B2B_CORPORATE';

export type RequestStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'IN_REVIEW'
  | 'QUOTED'
  | 'REVISION_REQUESTED'
  | 'APPROVED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED';

export type AccessibilityCategory =
  | 'shopping_mall'
  | 'restaurant'
  | 'tourist_attraction'
  | 'transit_station'
  | 'hospital'
  | 'bar_nightclub';

export interface NearbyPlace {
  id: string;
  name: string;
  category: AccessibilityCategory;
  categoryLabel: string;
  distanceKm: number;
  walkingOrDriving: string;
  address: string;
  lat: number;
  lng: number;
}

export interface HotelAsset {
  hotel_id: string;
  asset_type: 'cover' | 'lobby' | 'room' | 'ballroom' | 'dining';
  source_url: string;
  image_url: string;
  retrieved_at: string;
  approval_status: 'approved' | 'pending';
  alt_text: string;
}

export interface Hotel {
  id: string;
  slug: string;
  name: string;
  logoUrl?: string;
  area: string;
  cityZone: 'Central Jakarta' | 'South Jakarta' | 'West Jakarta' | 'East Jakarta' | 'Bekasi' | 'BSD Serpong';
  address: string;
  stars: number;
  starCategory?: string;
  verified: boolean;
  officialUrl: string;
  sourceUrl: string;
  coverImage: string;
  gallery: string[];
  pitchTagline: string;
  description: string;
  facilities: string[];
  lat: number;
  lng: number;
  placeId: string;
  roomsAndSuites: string[];
  diningAndLounge: {
    name: string;
    description: string;
  }[];
  meetingsAndMice: {
    name: string;
    capacity: string;
    description: string;
  }[];
  wellnessAndLogistics: {
    wellness: string;
    logistics: string;
  };
  nearbyPlaces: NearbyPlace[];
}

export interface HotelPartner {
  id: number;
  name: string;
  website: string;
  logoUrl: string;
  slug: string;
  stars?: number;
  cityZone?: string;
}

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  categoryName: string;
  capacityPax: number;
  capacityLuggage: number;
  useCase: string;
  description: string;
  imageUrl: string;
  features: string[];
  sla: string[];
}

export interface ClientInfo {
  organization: string;
  delegationType: DelegationType;
  picName: string;
  picTitle: string;
  picPhone: string;
  picEmail: string;
  referenceName: string;
  notes?: string;
}

export interface AccommodationRequirement {
  hotelId: string;
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  roomType: string;
  roomQuantity: number;
  guestQuantity: number;
  specialNotes?: string;
}

export type TransferDirection = 'AIRPORT_TO_HOTEL' | 'HOTEL_TO_AIRPORT' | 'ROUND_TRIP';

export interface TransferRequirement {
  direction: TransferDirection;
  airport: 'CGK' | 'HLP' | 'BOTH';
  travelDate: string;
  pickupTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  flightNumber: string;
  passengerCount: number;
  luggageCount: number;
  selectedVehicles: {
    vehicleId: string;
    vehicleName: string;
    quantity: number;
    capacityPax: number;
  }[];
  specialNotes?: string;
}

export interface ServiceRequest {
  id: string;
  requestNumber: string;
  client: ClientInfo;
  accommodation?: AccommodationRequirement;
  transfer?: TransferRequirement;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  quoteId?: string;
  operationalNotes?: string;
  history: {
    timestamp: string;
    actor: string;
    action: string;
    notes?: string;
  }[];
  // Convenient direct properties
  organization?: string;
  delegationType?: DelegationType;
  picName?: string;
  picTitle?: string;
  picPhone?: string;
  picEmail?: string;
  eventReference?: string;
  hotelId?: string;
  hotelName?: string;
  checkInDate?: string;
  checkOutDate?: string;
  nightsCount?: number;
  roomType?: string;
  roomQuantity?: number;
  guestCount?: number;
  specialRequests?: string;
  transportIncluded?: boolean;
  transferDirection?: TransferDirection;
  airport?: string;
  flightNumber?: string;
  pickupDateTime?: string;
  selectedVehicles?: any[];
  luggageEstimate?: number;
  notes?: string;
}

export interface QuoteVersion {
  versionNumber: number;
  createdAt: string;
  createdBy: string;
  accommodationSnapshot?: AccommodationRequirement;
  transferSnapshot?: TransferRequirement;
  serviceNotes: string[];
  terms: string[];
  clientApprovedAt?: string;
  clientApprovedBy?: string;
  clientComment?: string;
  revisions?: {
    requestedAt: string;
    requestedBy: string;
    comment: string;
  }[];
}

export interface Quote {
  id: string;
  quoteNumber: string;
  proposalNumber?: string;
  requestId: string;
  requestNumber: string;
  client: ClientInfo;
  status: RequestStatus;
  issueDate: string;
  validUntil: string;
  currentVersion: number;
  version?: number;
  versions: QuoteVersion[];
  createdAt: string;
  updatedAt: string;
  hotelSpec?: {
    hotelName: string;
    roomType: string;
    roomQuantity: number;
    nightsCount: number;
    guestCount: number;
    notes?: string;
  };
  transportSpec?: {
    direction: string;
    airport: string;
    flightNumber?: string;
    pickupDateTime?: string;
    vehicles: {
      vehicleId: string;
      vehicleName: string;
      quantity: number;
    }[];
    luggageCount?: number;
    slaCommitment: string[];
  };
  termsAndConditions?: string[];
  revisionHistory?: {
    version: number;
    timestamp: string;
    changeSummary: string;
  }[];
}


export interface ConciergeRequest {
  id: string;
  createdAt: string;
  picName: string;
  organization: string;
  phone: string;
  travelDate: string;
  pickupLocation: string;
  destination: string;
  passengerCount: number;
  vehiclePreference: string;
  purpose: 'Shopping' | 'Restaurant & Dining' | 'Sightseeing / Cultural' | 'Diplomatic / VIP Meeting' | 'Other';
  notes: string;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  targetEntity: string;
  entityId: string;
  details: string;
}
