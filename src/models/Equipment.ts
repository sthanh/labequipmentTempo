export interface Equipment {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  manufacturer: string;
  purchaseDate: string;
  lastServiceDate: string;
  status: "operational" | "maintenance" | "repair" | "retired";
  category: string;
  locationId: string;
  notes?: string;
  image?: string;
}

export interface EquipmentFormData {
  name: string;
  model: string;
  serialNumber: string;
  manufacturer: string;
  purchaseDate: string;
  lastServiceDate: string;
  status: "operational" | "maintenance" | "repair" | "retired";
  category: string;
  locationId: string;
  notes?: string;
  image?: string;
}
