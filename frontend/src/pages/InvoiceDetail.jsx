import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/pvr logo.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function InvoiceDetail() {
  const { id } = useParams(); // get id from URL
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    fetchInvoice();
  }, []);

  const fetchInvoice = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/invoices/${id}`);
    const data = await res.json();
    setInvoice(data);
  };

   // 📄 DOWNLOAD PDF
    const downloadPDF = async () => {
      const element = document.getElementById("invoice");
  
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
  
      const pdf = new jsPDF("p", "mm", "a4");
  
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("invoice.pdf");
    };

  if (!invoice) return <h3>Loading...</h3>;

  return (
      <div id="invoice-section">
        <div className="max-w-4xl mx-auto mt-8">
  
              <div id="invoice" className="bg-white shadow-xl rounded-xl p-8">
  
                {/* HEADER */}
                <div className="flex items-center gap-4 mb-6 border-b pb-4">
                  <img src={logo} className="h-20" />
                  <div>
                    <h2 className="text-2xl font-bold">
                      PVR Projects Limited
                    </h2>
                    <p className="text-sm text-gray-500">
                      Invoice Details
                    </p>
                  </div>
                </div>
  
                 {/* BODY */}
          <div className="flex gap-10">
  
            {/* LEFT SIDE */}
            <div className="grid grid-cols-2 gap-6 w-2/3 text-gray-700">
  
              <div>
                <p className="text-gray-500">S NO</p>
                <p className="font-semibold">{invoice.sno || "-"}</p>
              </div>
  
              <div>
                <p className="text-gray-500">Project</p>
                <p className="font-semibold">Jawahar LIS Project</p>
              </div>
  
              <div>
                <p className="text-gray-500">Invoice No</p>
                <p className="font-semibold">{invoice.invoiceNo}</p>
              </div>
  
              <div>
                <p className="text-gray-500">MS Plate Code</p>
                <p>{invoice.msPlateCode || "-"}</p>
              </div>
  
              <div>
                <p className="text-gray-500">Date</p>
                <p>{invoice.date}</p>
              </div>
  
              <div>
                <p className="text-gray-500">Vehicle</p>
                <p>{invoice.vehicleNumber}</p>
              </div>
  
              <div>
                <p className="text-gray-500">Material</p>
                <p>{invoice.material}</p>
              </div>
  
              <div>
                <p className="text-gray-500">Supplier</p>
                <p>{invoice.supplierName}</p>
              </div>
  
              <div>
                <p className="text-gray-500">Material Name</p>
                <p>{invoice.materialName}</p>
              </div>
  
              <div>
                <p className="text-gray-500">No of Plates</p>
                <p>{invoice.noOfPlates}</p>
              </div>
  
              <div>
                <p className="text-gray-500">Remarks</p>
                <p>{invoice.remarks}</p>
              </div>
  
            </div>
  
            {/* RIGHT SIDE (QR) */}
            {invoice.qr && (
              <div className="w-1/3 border-l pl-6 flex flex-col items-center justify-center">
                <p className="font-semibold mb-2">QR Code</p>
                <img
                  src={invoice.qr}
                  alt="QR"
                  className="w-44"
                />
  
                <div>
                <p className="text-gray-500">
                S NO : <span className="font-semibold text-black">{invoice.sno || "-"}</span>
                </p>
                </div>
              </div>
  
  
            )}
  
          </div>
        </div>
  
             {/* BUTTONS */}
            <div className="mt-6 flex gap-4 print:hidden">
              <button
                onClick={() => window.print()}
                className="bg-green-500 text-white px-5 py-2 rounded"
              >
                Print
              </button>

              <button
                onClick={downloadPDF}
                // className="bg-blue-500 text-white px-5 py-2 rounded"
              >
                {/* Download PDF */}
              </button>
            </div>

          </div>
    </div>


  );
}

