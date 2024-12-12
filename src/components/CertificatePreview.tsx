import { format } from "date-fns";
import { motion } from "framer-motion";
import * as htmlToImage from 'html-to-image';
import { toast } from "sonner";

interface CertificateData {
  auditName: string;
  companyName: string;
  companyLogo: string;
  dateCertified: string;
  summary: string;
}

interface CertificatePreviewProps {
  data: CertificateData;
  isDark?: boolean;
  onThemeChange: (isDark: boolean) => void;
}

export const CertificatePreview = ({ data, isDark = true, onThemeChange }: CertificatePreviewProps) => {
  const formatFileName = () => {
    const auditSlug = data.auditName.toLowerCase().replace(/\s+/g, '-');
    const companySlug = data.companyName.toLowerCase().replace(/\s+/g, '-');
    return `isp-${auditSlug}-certificate-${companySlug}.jpg`;
  };

  const handleDownload = async () => {
    try {
      const element = document.getElementById('certificate');
      if (!element) {
        toast.error('Certificate element not found');
        return;
      }

      const dataUrl = await htmlToImage.toJpeg(element, {
        quality: 0.95,
        backgroundColor: '#ffffff',
        fontEmbedCSS: '@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");'
      });
      
      const link = document.createElement('a');
      link.download = formatFileName();
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Certificate downloaded successfully');
    } catch (err) {
      console.error('Error downloading certificate:', err);
      toast.error('Failed to download certificate');
    }
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onThemeChange(e.target.value === "dark");
  };

  return (
    <div className="space-y-4 font-['Poppins']">
      <motion.div
        id="certificate"
        layout
        className="w-full aspect-[1/1.4142] relative overflow-hidden"
        style={{
          backgroundImage: isDark ? 'url(/isp-certified-background.jpg)' : 'url(/public/isp-certificage-bg-white.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          fontFamily: 'Poppins, sans-serif'
        }}
      >
        <div className="absolute inset-0 p-8">
          <div className="flex flex-col gap-4">
            {data.companyLogo && (
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                src={data.companyLogo}
                alt="Company Logo"
                className="h-24 object-contain mt-5 mb-8"
              />
            )}
            
            <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
              <motion.h1
                layout
                className={isDark ? "text-white text-4xl font-bold" : "text-[#0a0f12] text-4xl font-bold"}
              >
                {data.auditName || "Audit Name"}
              </motion.h1>

              <motion.h2
                layout
                className="text-[#FFD200] text-2xl font-bold"
              >
                {data.companyName || "Company Name"}
              </motion.h2>

              <motion.p
                layout
                className={isDark ? "text-white text-md" : "text-[#0a0f12] text-md"}
              >
                {data.dateCertified
                  ? format(new Date(data.dateCertified), "MMMM dd, yyyy")
                  : format(new Date(), "MMMM dd, yyyy")}
              </motion.p>

              {data.summary && (
                <motion.p
                  layout
                  className={isDark ? "text-white text-base" : "text-[#0a0f12] text-base"}
                >
                  {data.summary}
                </motion.p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col items-center gap-4">
        <select 
          value={isDark ? "dark" : "light"}
          onChange={handleThemeChange}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <option value="dark">Dark Theme</option>
          <option value="light">Light Theme</option>
        </select>

        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Download JPG
        </button>
      </div>
    </div>
  );
};