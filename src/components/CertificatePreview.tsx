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
  const formatFileName = (format: string) => {
    const auditSlug = data.auditName.toLowerCase().replace(/\s+/g, '-');
    const companySlug = data.companyName.toLowerCase().replace(/\s+/g, '-');
    return `isp-${auditSlug}-certificate-${companySlug}.${format}`;
  };

  const handleDownload = async (format: 'png' | 'jpg') => {
    try {
      const element = document.getElementById('certificate');
      if (!element) return;

      // Wait for background image to load
      const bgImg = new Image();
      bgImg.src = 'https://www.ispartnersllc.com/wp-content/uploads/isp-certified-bg.jpg';
      await new Promise((resolve) => {
        bgImg.onload = resolve;
      });

      const dataUrl = format === 'png' 
        ? await htmlToImage.toPng(element, {
            quality: 1.0,
            backgroundColor: '#ffffff',
            style: {
              backgroundImage: `url(${bgImg.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }
          })
        : await htmlToImage.toJpeg(element, {
            quality: 0.95,
            backgroundColor: '#ffffff',
            style: {
              backgroundImage: `url(${bgImg.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }
          });
      
      const link = document.createElement('a');
      link.download = formatFileName(format);
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
          backgroundImage: "url('https://www.ispartnersllc.com/wp-content/uploads/isp-certified-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
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
                className="text-white text-4xl font-bold"
              >
                {data.auditName || "Audit Name"}
              </motion.h1>

              <motion.h2
                layout
                className="text-[#FFD200] text-[28px] font-bold"
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