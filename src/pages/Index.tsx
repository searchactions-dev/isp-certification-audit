import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format } from "date-fns";
import { CertificatePreview } from "@/components/CertificatePreview";
import { motion } from "framer-motion";

interface CertificateData {
  auditName: string;
  companyName: string;
  companyLogo: string;
  dateCertified: string;
  summary: string;
}

const Index = () => {
  const [certificateData, setCertificateData] = useState<CertificateData>({
    auditName: "",
    companyName: "",
    companyLogo: "",
    dateCertified: format(new Date(), "yyyy-MM-dd"),
    summary: "",
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCertificateData((prev) => ({
          ...prev,
          companyLogo: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCertificateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!certificateData.auditName || !certificateData.companyName) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Certificate generated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="auditName">Name of Audit</Label>
                <Input
                  id="auditName"
                  name="auditName"
                  value={certificateData.auditName}
                  onChange={handleInputChange}
                  placeholder="Enter audit name"
                  className="transition-all duration-200 focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={certificateData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter company name"
                  className="transition-all duration-200 focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyLogo">Company Logo</Label>
                <Input
                  id="companyLogo"
                  name="companyLogo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="transition-all duration-200 focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateCertified">Date Certified</Label>
                <Input
                  id="dateCertified"
                  name="dateCertified"
                  type="date"
                  value={certificateData.dateCertified}
                  onChange={handleInputChange}
                  className="transition-all duration-200 focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  name="summary"
                  value={certificateData.summary}
                  onChange={handleInputChange}
                  placeholder="Enter certificate summary"
                  className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white transition-all duration-200"
              >
                Generate Certificate
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:sticky lg:top-8"
          >
            <CertificatePreview data={certificateData} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;