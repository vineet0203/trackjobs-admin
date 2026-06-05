import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { MainLayout } from "@/components/layout/MainLayout";
import { ServicesPage } from "@/pages/Services";

const servicesSearchSchema = z.object({
  action: z.string().optional(),
});

export const Route = createFileRoute("/services")({
  validateSearch: (search) => servicesSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Services — TrakJobs Admin" },
      { name: "description", content: "Manage all marketplace services on TrakJobs admin." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <MainLayout>
      <ServicesPage />
    </MainLayout>
  );
}
