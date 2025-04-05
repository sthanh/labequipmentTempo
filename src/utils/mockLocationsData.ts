export interface Location {
  id: string;
  name: string;
  type: string;
  building: string;
  floor: string;
  roomNumber: string;
  description?: string;
  status: string;
  statusText: string;
  capacity?: number;
  equipmentCount?: number;
  lastModified?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  accessRestrictions?: string;
  notes?: string;
}

export const mockLocationsData: Location[] = [
  {
    id: "LAB-001",
    name: "Main Laboratory",
    type: "Research Lab",
    building: "Science Building",
    floor: "2",
    roomNumber: "201",
    description: "Primary research laboratory for analytical chemistry",
    status: "active",
    statusText: "Active",
    capacity: 15,
    equipmentCount: 12,
    lastModified: "2023-09-15",
    contactPerson: "Dr. Jane Smith",
    contactEmail: "j.smith@example.com",
    contactPhone: "555-123-4567",
    accessRestrictions: "Keycard access only",
    notes: "Scheduled for renovation in Q1 2024",
  },
  {
    id: "LAB-002",
    name: "Imaging Suite",
    type: "Imaging Lab",
    building: "Science Building",
    floor: "1",
    roomNumber: "105",
    description: "Specialized lab for microscopy and imaging",
    status: "active",
    statusText: "Active",
    capacity: 8,
    equipmentCount: 6,
    lastModified: "2023-08-22",
    contactPerson: "Dr. Michael Chen",
    contactEmail: "m.chen@example.com",
    contactPhone: "555-123-8901",
  },
  {
    id: "LAB-003",
    name: "Molecular Lab",
    type: "PCR Lab",
    building: "Biotech Wing",
    floor: "3",
    roomNumber: "310",
    description: "Molecular biology and PCR procedures",
    status: "active",
    statusText: "Active",
    capacity: 10,
    equipmentCount: 8,
    lastModified: "2023-10-05",
  },
  {
    id: "LAB-004",
    name: "Genomics Lab",
    type: "Sequencing Lab",
    building: "Biotech Wing",
    floor: "3",
    roomNumber: "315",
    description: "DNA sequencing and genomics research",
    status: "active",
    statusText: "Active",
    capacity: 12,
    equipmentCount: 10,
    lastModified: "2023-09-28",
  },
  {
    id: "STOR-001",
    name: "Chemical Storage",
    type: "Storage",
    building: "Science Building",
    floor: "B",
    roomNumber: "B12",
    description: "Secure storage for chemicals and reagents",
    status: "restricted",
    statusText: "Restricted Access",
    lastModified: "2023-07-15",
    accessRestrictions: "Authorized personnel only",
  },
  {
    id: "CONF-001",
    name: "Conference Room A",
    type: "Meeting Room",
    building: "Admin Building",
    floor: "1",
    roomNumber: "120",
    description: "Main conference room for team meetings",
    status: "active",
    statusText: "Active",
    capacity: 20,
    lastModified: "2023-06-10",
  },
  {
    id: "OFF-001",
    name: "Lab Manager Office",
    type: "Office",
    building: "Admin Building",
    floor: "2",
    roomNumber: "210",
    description: "Office for laboratory management staff",
    status: "active",
    statusText: "Active",
    capacity: 3,
    lastModified: "2023-05-20",
  },
];
