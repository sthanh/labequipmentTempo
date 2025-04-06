import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ServiceRequest } from "../models/ServiceRequest";
import * as serviceRequestService from "../services/serviceRequestService";

interface ServiceRequestContextType {
  serviceRequests: ServiceRequest[];
  activeRequests: ServiceRequest[];
  resolvedRequests: ServiceRequest[];
  loading: boolean;
  error: string | null;
  refreshServiceRequests: () => Promise<void>;
  getRequestsByEquipment: (equipmentId: string) => Promise<ServiceRequest[]>;
  createRequest: (
    request: Omit<ServiceRequest, "id">,
  ) => Promise<ServiceRequest>;
  updateRequest: (
    id: string,
    updates: Partial<ServiceRequest>,
  ) => Promise<ServiceRequest | undefined>;
  addNote: (
    requestId: string,
    note: string,
    createdBy: string,
  ) => Promise<ServiceRequest | undefined>;
}

const ServiceRequestContext = createContext<
  ServiceRequestContextType | undefined
>(undefined);

export const useServiceRequests = () => {
  const context = useContext(ServiceRequestContext);
  if (context === undefined) {
    throw new Error(
      "useServiceRequests must be used within a ServiceRequestProvider",
    );
  }
  return context;
};

interface ServiceRequestProviderProps {
  children: ReactNode;
}

export const ServiceRequestProvider: React.FC<ServiceRequestProviderProps> = ({
  children,
}) => {
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [activeRequests, setActiveRequests] = useState<ServiceRequest[]>([]);
  const [resolvedRequests, setResolvedRequests] = useState<ServiceRequest[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshServiceRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      const allRequests = await serviceRequestService.getAllServiceRequests();
      const active = await serviceRequestService.getActiveServiceRequests();
      const resolved = await serviceRequestService.getResolvedServiceRequests();

      setServiceRequests(allRequests);
      setActiveRequests(active);
      setResolvedRequests(resolved);
    } catch (err) {
      setError("Failed to fetch service requests");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRequestsByEquipment = async (equipmentId: string) => {
    try {
      return await serviceRequestService.getServiceRequestsByEquipment(
        equipmentId,
      );
    } catch (err) {
      setError("Failed to fetch service requests for equipment");
      console.error(err);
      return [];
    }
  };

  const createRequest = async (request: Omit<ServiceRequest, "id">) => {
    try {
      const newRequest =
        await serviceRequestService.createServiceRequest(request);
      await refreshServiceRequests();
      return newRequest;
    } catch (err) {
      setError("Failed to create service request");
      console.error(err);
      throw err;
    }
  };

  const updateRequest = async (
    id: string,
    updates: Partial<ServiceRequest>,
  ) => {
    try {
      const updatedRequest = await serviceRequestService.updateServiceRequest(
        id,
        updates,
      );
      if (updatedRequest) {
        await refreshServiceRequests();
      }
      return updatedRequest;
    } catch (err) {
      setError("Failed to update service request");
      console.error(err);
      throw err;
    }
  };

  const addNote = async (
    requestId: string,
    note: string,
    createdBy: string,
  ) => {
    try {
      const updatedRequest = await serviceRequestService.addServiceRequestNote(
        requestId,
        note,
        createdBy,
      );
      if (updatedRequest) {
        await refreshServiceRequests();
      }
      return updatedRequest;
    } catch (err) {
      setError("Failed to add note to service request");
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    refreshServiceRequests();
  }, []);

  const value = {
    serviceRequests,
    activeRequests,
    resolvedRequests,
    loading,
    error,
    refreshServiceRequests,
    getRequestsByEquipment,
    createRequest,
    updateRequest,
    addNote,
  };

  return (
    <ServiceRequestContext.Provider value={value}>
      {children}
    </ServiceRequestContext.Provider>
  );
};
