import { format } from "date-fns";
import { motion } from "framer-motion";

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
  return (
    <motion.div
      layout
      className="bg-white rounded-2xl shadow-lg p-8 border border-certificate-border aspect-[1/1.4142] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-certificate-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-50" />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-between text-center">
        <div className="space-y-6 w-full">
          <div className="border-b-2 border-gray-100 pb-6">
            {data.companyLogo && (
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                src={data.companyLogo}
                alt="Company Logo"
                className="h-24 mx-auto object-contain mb-6"
              />
            )}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Certificate of Audit
            </h1>
            <p className="text-gray-600">This certifies that</p>
          </div>

          <div className="space-y-6 flex-grow">
            <motion.h2
              layout
              className="text-2xl font-bold text-gray-900"
            >
              {data.companyName || "Company Name"}
            </motion.h2>

            <motion.p layout className="text-gray-600">
              has successfully completed
            </motion.p>

            <motion.h3
              layout
              className="text-xl font-semibold text-gray-800"
            >
              {data.auditName || "Audit Name"}
            </motion.h3>

            {data.summary && (
              <motion.p
                layout
                className="text-sm text-gray-600 max-w-md mx-auto"
              >
                {data.summary}
              </motion.p>
            )}
          </div>
        </div>

        <div className="border-t-2 border-gray-100 pt-6 w-full">
          <p className="text-gray-600">
            Date Certified:{" "}
            <span className="font-semibold">
              {data.dateCertified
                ? format(new Date(data.dateCertified), "MMMM dd, yyyy")
                : format(new Date(), "MMMM dd, yyyy")}
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};