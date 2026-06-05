import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { servicesData, type Service } from "@/data/servicesData";

interface ServicesState {
  services: Service[];
  searchQuery: string;
  categoryFilter: string;
  locationFilter: string;
  statusFilter: string;
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

const initialState: ServicesState = {
  services: servicesData,
  searchQuery: "",
  categoryFilter: "all",
  locationFilter: "all",
  statusFilter: "all",
  currentPage: 1,
  totalPages: 37,
  totalCount: 256,
};

const slice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setSearch: (s, a: PayloadAction<string>) => { s.searchQuery = a.payload; },
    setCategory: (s, a: PayloadAction<string>) => { s.categoryFilter = a.payload; },
    setLocation: (s, a: PayloadAction<string>) => { s.locationFilter = a.payload; },
    setStatus: (s, a: PayloadAction<string>) => { s.statusFilter = a.payload; },
    setPage: (s, a: PayloadAction<number>) => { s.currentPage = a.payload; },
    toggleFeatured: (s, a: PayloadAction<string>) => {
      const svc = s.services.find((x) => x.id === a.payload);
      if (svc) svc.featured = !svc.featured;
    },
    addService: (s, a: PayloadAction<Omit<Service, "id" | "dateAdded" | "featured" | "vendor" | "finance" | "status"> & { imageFile?: string }>) => {
      const id = `#${Math.floor(1000 + Math.random() * 9000)}`;
      const newService: Service = {
        id,
        title: a.payload.title,
        subtitle: a.payload.subtitle || "Custom service",
        image: a.payload.image || "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=80&h=80&fit=crop",
        vendor: { name: "Admin Vendor", initials: "ADM", avatarColor: "#7C3AED", verified: true },
        finance: { amount: "PKR 0", label: "Earnings" },
        category: a.payload.category || "Other Services",
        location: a.payload.location || "Lahore, Pakistan",
        detailedAddress: a.payload.detailedAddress,
        price: a.payload.price.startsWith("PKR") ? a.payload.price : `PKR ${a.payload.price}`,
        status: "Published",
        featured: false,
        dateAdded: new Date().toISOString(),
      };
      s.services.unshift(newService);
      s.totalCount += 1;
    },
    editService: (s, a: PayloadAction<{ id: string; title: string; subtitle?: string; image?: string; price: string; location: string; detailedAddress?: string; category?: any }>) => {
      const svc = s.services.find((x) => x.id === a.payload.id);
      if (svc) {
        svc.title = a.payload.title;
        if (a.payload.subtitle) svc.subtitle = a.payload.subtitle;
        if (a.payload.image) svc.image = a.payload.image;
        svc.price = a.payload.price.startsWith("PKR") ? a.payload.price : `PKR ${a.payload.price}`;
        svc.location = a.payload.location;
        if (a.payload.detailedAddress) svc.detailedAddress = a.payload.detailedAddress;
        if (a.payload.category) svc.category = a.payload.category;
      }
    },
    deleteService: (s, a: PayloadAction<string>) => {
      s.services = s.services.filter((x) => x.id !== a.payload);
      s.totalCount = Math.max(0, s.totalCount - 1);
    },
  },
});

export const { setSearch, setCategory, setLocation, setStatus, setPage, toggleFeatured, addService, editService, deleteService } = slice.actions;
export default slice.reducer;
