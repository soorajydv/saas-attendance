import { useState } from "react";
import api, { BACKEND_URL } from "@/api/api";
import toast from "react-hot-toast";

export default function QRGenerator() {
  const [loading, setLoading] = useState(false);
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null); // Renamed for clarity

  const generateQR = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${BACKEND_URL}/qr/generate`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setQrCodeImage(response.data.data); // Data URL from backend
      }
    } catch (error) {
      toast.error("Failed to generate QR code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">QR Code Generator</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={generateQR}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate QR code"}
        </button>
        {qrCodeImage && (
          <div style={{ marginTop: "20px" }}>
            <img
              src={qrCodeImage}
              alt="QR Code"
              style={{ height: "5rem", width: "5rem" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}