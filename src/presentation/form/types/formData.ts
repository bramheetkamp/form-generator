// Type definitions for client and intake form data
import type {
  Location,
  Salutation,
  Side,
} from '@/presentation/form/constants/formConstants';
export interface ClientData {
  // Practitioner and date
  practitionerId?: string;
  date: string;

  // OSA/VLOS selection
  osaVlos?: 'OSA' | 'VLOS';

  // Location
  location?: Location;

  // Personal information
  salutation?: Salutation;
  initials: string;
  clientName: string;
  birthDate: string;

  // Address information
  postalCode: string;
  houseNumber: string;
  city: string;
  address: string;

  // Contact information
  phoneOne: string;
  phoneTwo?: string;
  email: string;

  // Medical information
  insurance: string;
  bsn?: string;
  specialist?: string;
  familyDoctor?: string;
}

export interface IntakeVLOSData {
  // Side selection (both/left/right)
  side: Side;

  // Shaft height in cm
  schachthoogteLinks?: string;
  schachthoogteRechts?: string;

  // Enclosure/padding
  omsluitingLinks: string[]; // Array of enclosure types
  omsluitingRechts: string[];
  omsluitingLinksMm: Record<string, string>; // Thickness in mm per type
  omsluitingRechtsMm: Record<string, string>;

  // Supplement shoring/support
  supplementschoringLinksEnabled: 'ja' | 'nee';
  supplementschoringRechtsEnabled: 'ja' | 'nee';
  supplementschoringLinksType?: string; // Lateral/Medial/Both
  supplementschoringRechtsType?: string;

  // Sole stiffening
  zoolverstijvingEnabled: 'ja' | 'nee';
  zoolverstijvingLinks?: boolean;
  zoolverstijvingRechts?: boolean;

  // Closure type
  sluitingType?: string; // hooks/rings or velcro

  // Entry point in cm
  inschotpunt?: string;

  // Shaft opening width
  openstandSchacht?: string;

  // Tongue padding
  tongpolsterEnabled: 'ja' | 'nee';

  // Fixed tongue
  tongVaststikkenEnabled: 'ja' | 'nee';

  // Heel type
  haksoortLinks?: string;
  haksoortRechts?: string;

  // Heel height in cm
  hakhoogteLinks?: string;
  hakhoogteRechts?: string;

  // Heel shoring/wedge
  hakschoringLinksEnabled: 'ja' | 'nee';
  hakschoringRechtsEnabled: 'ja' | 'nee';
  hakschoringLinksType?: string; // Medial/Lateral
  hakschoringRechtsType?: string;

  // Heel rounding
  hakafrondingLinksEnabled: 'ja' | 'nee';
  hakafrondingRechtsEnabled: 'ja' | 'nee';
  hakafrondingLinksHoogte?: string; // Height in mm
  hakafrondingLinksLengte?: string; // Length in mm
  hakafrondingRechtsHoogte?: string;
  hakafrondingRechtsLengte?: string;

  // Walking sole type
  loopzoolType?: string;

  // Special notes
  bijzonderheden?: string;
}

export interface IntakePulmanData {
  // Side selection
  side: Side;

  // Medical indication
  medischeIndicatie?: string;

  // Bandaged foot
  gezwachteld?: 'ja' | 'nee';

  // Pulman type (New Harlem, Harlem Extra)
  typePulman?: string;

  // Shoe size (client's size)
  schoenmaat?: string; // 37-48

  // Provided size (actual size given)
  afgegevenMaat?: string; // 37-48

  // Special notes
  bijzonderheden?: string;
}

export interface IntakeRebacareData {
  // Side selection
  side: Side;

  // Medical indication
  medischeIndicatie?: string;

  // Bandaged foot
  gezwachteld?: 'ja' | 'nee';

  // Shoe size (client's size)
  schoenmaat?: string; // 37-48

  // Provided size (actual size given)
  afgegevenMaat?: string; // 37-48

  // Special notes
  bijzonderheden?: string;
}

export interface IntakeOSBData {
  // Order information
  ordernummer?: string; // Order number
  omschrijving?: string[]; // Description/pair type options

  // Medical indication
  medischeIndicatie?: string;

  // Goals/objectives (no left/right)
  doel?: string[]; // Array of goal options

  // Walking function
  loopfunctie?: string[]; // Array of walking function options

  // Supplier and order date
  leverancier?: string[]; // Array of supplier options
  bestelDatum?: string;

  // Product specifications
  productSpecificaties?: {
    artCode?: string; // Article code
    lengteMaat?: string; // Length measurement
    wijdte?: string; // Width
    kleur?: string; // Color
    sluiting?: string; // Closure type
  };

  // Modules - Hallux valgus correction
  halluxValgusEnabled?: boolean;
  halluxValgusLinks?: boolean;
  halluxValgusRechts?: boolean;
  halluxValgusLinksMm?: string; // 3mm or 8mm
  halluxValgusRechtsMm?: string;

  // Modules - Forefoot deepenings
  verdiepingenVoorvoetLinks?: boolean;
  verdiepingenVoorvoetRechts?: boolean;
  verdiepingenVoorvoetLinksMm?: string; // 3mm or 5mm
  verdiepingenVoorvoetRechtsMm?: string;
  verdiepingenVoorvoetExtraLinks?: boolean; // Extra deepening
  verdiepingenVoorvoetExtraRechts?: boolean;

  // Basic SOS codes with left/right
  basiscodeSOS?: string[]; // Array of selected basic codes
  supplements?: Record<string, {links: boolean; rechts: boolean; code: number}>;

  // Insole component (left)
  steunzoolLinks?: {
    type?: string[]; // Array of insole types
    typeAnders?: string; // Other type (text input)
    correctieMiddenvoet?: string; // Midfoot correction
    correctieVoorvoet?: string; // Forefoot correction
    vvPellote?: string; // Forefoot pad
    hakVerhogingCm?: string; // Heel raise in cm
  };

  // Insole component (right)
  steunzoolRechts?: {
    type?: string[];
    typeAnders?: string;
    correctieMiddenvoet?: string;
    correctieVoorvoet?: string;
    vvPellote?: string;
    hakVerhogingCm?: string;
  };

  // Special notes
  bijzonderheden?: string;
}

export interface IntakeOVACData {
  // Trial shoe
  proefschoen?: 'ja' | 'nee';

  // Date
  datum?: string;

  // Thickness measurements
  diktes?: string;

  // Size distribution
  maatverdeling?: string;

  // Shoe sizes (24-32)
  schoenSizes?: Record<string, boolean>;

  // Procedures checklist
  procedures?: {
    vrijstaandSchoentje?: boolean; // Freestanding shoe
    voetAfdrukkleusKast?: boolean; // Foot impression in box
    bevolktenSchottel?: boolean; // Populated last
    proefschoeneenGecombineerd?: boolean; // Trial shoes combined
    bevolktenSchoen?: boolean; // Populated shoe
    enkelvolschoen?: boolean; // Ankle full shoe
    enkelvolkastel?: boolean; // Ankle full last
  };

  // Special notes
  bijzonderheden?: string;
}

export interface IntakeSteunzolenData {
  // Process selection
  processes?: string;

  // Shoe last measurements (orthopedic technical term)
  schoenteest?: {
    berekteKloonzool?: boolean; // Calculated clone sole
    berekteKustvlakte?: boolean; // Calculated coastal plane
    berekteVlakten?: boolean; // Calculated planes
    enkelvolZolen?: boolean; // Ankle-full soles
  };

  // Insole options
  steunzolen?: {
    ts15cm?: boolean; // TS 15cm type
    tussenlegd?: boolean; // Intermediate layer
    steunzolen?: boolean; // Support soles
    bislangTussen?: boolean; // Bislang intermediate
    bislang?: boolean; // Bislang type
  };

  // Orthopedic corrections
  corrections?: {
    vervolgC1Lang1UVlug?: boolean; // Follow-up C1 long 1U wing
    vervolgC1Kort?: boolean; // Follow-up C1 short
    uithollingC1Krag3Grote?: boolean; // Hollow C1 collar 3 large
    uithollingC1Krag3Kleine?: boolean; // Hollow C1 collar 3 small
    haktVerlengdC1Krag3?: boolean; // Heel extended C1 collar 3
  };

  // Padding materials
  pads?: {
    csm?: boolean; // CSM material
    e625?: boolean; // E625 material
    e425?: boolean; // E425 material
    cushlin?: boolean; // Cushlin material
  };

  // Correction notes
  corr?: string;

  // Assembly notes
  montage?: string;

  // Control/inspection notes
  controle?: string;

  // Load/pressure notes
  belasting?: string;

  // Preference notes
  pref?: string;

  // Special notes
  bijzonderheden?: string;
}

export interface FormSubmissionData {
  client: ClientData;
  intakeVLOS?: IntakeVLOSData;
  intakePulman?: IntakePulmanData;
  intakeRebacare?: IntakeRebacareData;
  intakeOSB?: IntakeOSBData;
  intakeOVAC?: IntakeOVACData;
  intakeSteunzolen?: IntakeSteunzolenData;
}
