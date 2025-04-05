import type { LucideIcon } from 'lucide-react';
interface Equipment {
  id: string;
  name: string;
  type: string;
  model: string;
  icon: string;
  status: string;
  statusText: string;
  location: string;
  lastRun: string;
  serialNumber?: string;
  manufacturer?: string;
  installDate?: string;
  lastCalibration?: string;
  statusNote?: string;
  locationDetail?: string;
  lastOperator?: string;
  usageStats?: Array<{
    label: string;
    value: number;
  }>;
  maintenanceSchedule?: Array<{
    title: string;
    date: string;
    status: string;
    note?: string;
  }>;
  qcData?: any;
  qcLog?: Array<any>;
  previousRuns?: Array<any>;
  documents?: Array<any>;
}
export const mockEquipmentData: Equipment[] = [{
  id: "SPEC-001",
  name: "Mass Spectrometer",
  type: "Analytical",
  model: "Thermo Fisher Q Exactive",
  serialNumber: "TF20210428-001",
  manufacturer: "Thermo Fisher Scientific",
  installDate: "2021-04-28",
  lastCalibration: "2023-08-15",
  icon: "flask-conical",
  status: "operational",
  statusText: "Operational",
  statusNote: "Regular maintenance scheduled for next month",
  location: "Main Lab",
  locationDetail: "Room 101, Analytical Wing",
  lastRun: "2023-10-15",
  lastOperator: "Jane Smith",
  usageStats: [{
    label: "Mon",
    value: 5
  }, {
    label: "Tue",
    value: 8
  }, {
    label: "Wed",
    value: 6
  }, {
    label: "Thu",
    value: 9
  }, {
    label: "Fri",
    value: 4
  }, {
    label: "Sat",
    value: 2
  }, {
    label: "Sun",
    value: 0
  }],
  maintenanceSchedule: [{
    title: "Quarterly Calibration",
    date: "2023-08-15",
    status: "completed",
    note: "All parameters within acceptable ranges"
  }, {
    title: "Source Cleaning",
    date: "2023-11-15",
    status: "upcoming"
  }, {
    title: "Annual Maintenance",
    date: "2024-01-10",
    status: "upcoming"
  }],
  qcData: {
    labels: ["Oct 1", "Oct 3", "Oct 5", "Oct 7", "Oct 9", "Oct 11", "Oct 13", "Oct 15"],
    datasets: [{
      label: "Mass Accuracy (ppm)",
      data: [1.2, 1.4, 1.0, 1.8, 1.6, 1.5, 1.3, 1.1]
    }],
    upperLimit: 2.0,
    lowerLimit: 0.5,
    maxValue: 3.0,
    unit: "ppm"
  },
  qcLog: [{
    date: "2023-10-15",
    parameter: "Mass Accuracy",
    value: "1.1 ppm",
    status: "pass",
    operator: "Jane Smith"
  }, {
    date: "2023-10-13",
    parameter: "Mass Accuracy",
    value: "1.3 ppm",
    status: "pass",
    operator: "John Doe"
  }, {
    date: "2023-10-11",
    parameter: "Mass Accuracy",
    value: "1.5 ppm",
    status: "pass",
    operator: "Jane Smith"
  }, {
    date: "2023-10-09",
    parameter: "Mass Accuracy",
    value: "1.6 ppm",
    status: "pass",
    operator: "Sarah Johnson"
  }, {
    date: "2023-10-07",
    parameter: "Mass Accuracy",
    value: "1.8 ppm",
    status: "warning",
    operator: "John Doe"
  }],
  previousRuns: [{
    id: "RUN-2023-10-15-001",
    protocol: "Protein Identification",
    date: "2023-10-15 14:30",
    status: "completed",
    operator: "Jane Smith"
  }, {
    id: "RUN-2023-10-14-003",
    protocol: "Metabolomics Screening",
    date: "2023-10-14 16:45",
    status: "completed",
    operator: "John Doe"
  }, {
    id: "RUN-2023-10-13-002",
    protocol: "Peptide Analysis",
    date: "2023-10-13 11:20",
    status: "failed",
    operator: "Jane Smith",
    failureReason: "Sample contamination"
  }, {
    id: "RUN-2023-10-12-001",
    protocol: "Protein Quantification",
    date: "2023-10-12 09:15",
    status: "completed",
    operator: "Sarah Johnson"
  }, {
    id: "RUN-2023-10-10-002",
    protocol: "Metabolomics Screening",
    date: "2023-10-10 13:50",
    status: "aborted",
    operator: "John Doe",
    abortReason: "Power fluctuation"
  }],
  documents: [{
    name: "Operating Manual",
    type: "PDF",
    date: "2021-04-28",
    addedBy: "System Admin"
  }, {
    name: "Calibration Procedure",
    type: "PDF",
    date: "2021-04-28",
    addedBy: "System Admin"
  }, {
    name: "Maintenance Log 2022",
    type: "Excel",
    date: "2022-01-15",
    addedBy: "Jane Smith"
  }, {
    name: "Maintenance Log 2023",
    type: "Excel",
    date: "2023-01-10",
    addedBy: "Jane Smith"
  }, {
    name: "Method Development Guide",
    type: "Word",
    date: "2021-05-15",
    addedBy: "John Doe"
  }]
}, {
  id: "HPLC-002",
  name: "HPLC System",
  type: "Analytical",
  model: "Agilent 1260 Infinity II",
  icon: "droplet",
  status: "maintenance",
  statusText: "Under Maintenance",
  location: "Main Lab",
  lastRun: "2023-10-10"
}, {
  id: "MICR-003",
  name: "Confocal Microscope",
  type: "Imaging",
  model: "Zeiss LSM 980",
  icon: "microscope",
  status: "operational",
  statusText: "Operational",
  location: "Imaging Suite",
  lastRun: "2023-10-14"
}, {
  id: "THER-004",
  name: "Thermal Cycler",
  type: "PCR",
  model: "Bio-Rad T100",
  icon: "thermometer",
  status: "attention",
  statusText: "Needs Attention",
  location: "Molecular Lab",
  lastRun: "2023-10-12"
}, {
  id: "SEQU-005",
  name: "DNA Sequencer",
  type: "Genomics",
  model: "Illumina NextSeq 550",
  icon: "cpu",
  status: "operational",
  statusText: "Operational",
  location: "Genomics Lab",
  lastRun: "2023-10-13"
}, {
  id: "CENT-006",
  name: "Ultracentrifuge",
  type: "Sample Prep",
  model: "Beckman Optima XPN",
  icon: "pipette",
  status: "out-of-service",
  statusText: "Out of Service",
  location: "Prep Room",
  lastRun: "2023-09-28"
}, {
  id: "CRYO-007",
  name: "Cryostat",
  type: "Histology",
  model: "Leica CM1950",
  icon: "scissors",
  status: "operational",
  statusText: "Operational",
  location: "Histology Suite",
  lastRun: "2023-10-15"
}];