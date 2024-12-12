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
}

export const CertificatePreview = ({ data }: CertificatePreviewProps) => {
  const handleDownload = async (format: 'png' | 'jpg') => {
    try {
      const element = document.getElementById('certificate');
      if (!element) return;

      const dataUrl = format === 'png' 
        ? await htmlToImage.toPng(element)
        : await htmlToImage.toJpeg(element);
      
      const link = document.createElement('a');
      link.download = `certificate.${format}`;
      link.href = dataUrl;
      link.click();
      
      toast.success(`Certificate downloaded as ${format.toUpperCase()}`);
    } catch (err) {
      console.error('Error downloading certificate:', err);
      toast.error('Failed to download certificate');
    }
  };

  return (
    <div className="space-y-4">
      <motion.div
        id="certificate"
        layout
        className="w-full aspect-[1/1.4142] relative overflow-hidden rounded-2xl shadow-lg"
        style={{
          backgroundImage: "url('https://www.ispartnersllc.com/wp-content/uploads/isp-certified-bg.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center p-8">
          {data.companyLogo && (
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              src={data.companyLogo}
              alt="Company Logo"
              className="h-24 object-contain mt-5"
            />
          )}
          
          <div className="flex-grow flex flex-col items-center justify-center gap-6 text-center max-w-2xl mx-auto">
            <motion.h1
              layout
              className="text-white text-4xl font-bold"
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
              className="text-white text-lg font-bold"
            >
              {data.dateCertified
                ? format(new Date(data.dateCertified), "MMMM dd, yyyy")
                : format(new Date(), "MMMM dd, yyyy")}
            </motion.p>

            {data.summary && (
              <motion.p
                layout
                className="text-white text-base"
              >
                {data.summary}
              </motion.p>
            )}
          </div>
        </div>
      </motion.div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => handleDownload('png')}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Download PNG
        </button>
        <button
          onClick={() => handleDownload('jpg')}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Download JPG
        </button>
      </div>
    </div>
  );
};