import { Category } from "../models/Category";

export const mockCategoriesData: Category[] = [
  {
    id: "cat-001",
    name: "Laboratory Equipment",
    description:
      "Equipment used in laboratory settings for testing and analysis",
  },
  {
    id: "cat-002",
    name: "Production Machinery",
    description: "Heavy machinery used in production lines",
  },
  {
    id: "cat-003",
    name: "Office Equipment",
    description: "Standard office equipment and furniture",
  },
  {
    id: "cat-004",
    name: "IT Hardware",
    description: "Computers, servers, and networking equipment",
  },
  {
    id: "cat-005",
    name: "Safety Equipment",
    description: "Equipment used for safety and emergency purposes",
  },
  {
    id: "cat-006",
    name: "Analytical Instruments",
    description: "Specialized instruments for analytical testing",
    parentCategoryId: "cat-001",
  },
  {
    id: "cat-007",
    name: "Packaging Equipment",
    description: "Equipment used for product packaging",
    parentCategoryId: "cat-002",
  },
];
