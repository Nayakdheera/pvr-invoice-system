
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../assets/pvr logo.png";

export default function Dashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // 🔍 SEARCH
  const handleSearch = async () => {
    if (!search) return alert("Enter Invoice Number");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/invoices/search/${search}`
      );

      if (!res.ok) {
        setInvoice(null);
        setError("❌ Invoice not found");
        return;
      }

      const data = await res.json();

      if (!data || Object.keys(data).length === 0) {
        setInvoice(null);
        setError("❌ Invoice not found");
        return;
      }

      console.log("INVOICE DATA:", data); // 🔥 debug

      setInvoice(data);
      setError("");
    } catch (err) {
      console.error(err);
      setInvoice(null);
      setError("⚠️ Error fetching invoice");
    }
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

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-10">⚡ Admin</h2>

        <ul className="space-y-5">
          <li onClick={() => navigate("/dashboard")} className="cursor-pointer">Dashboard</li>
          <li onClick={() => navigate("/invoice")} className="cursor-pointer">Add Invoice</li>
          <li onClick={() => navigate("/invoices")} className="cursor-pointer">View Invoices</li>
          <li onClick={handleLogout} className="cursor-pointer text-red-400 mt-10">Logout</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="bg-white p-5 rounded-xl shadow mb-6 flex items-center gap-4">
          <img src={logo} alt="logo" className="h-20" />
          <h2 className="text-3xl font-bold">PVR Projects Limited</h2>
        </div>

        {/* SEARCH */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h3 className="mb-3 font-semibold">Search Invoice</h3>

          <div className="flex gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter Invoice Number"
              className="border p-2 rounded w-full"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Search
            </button>
          </div>

          {error && (
            <div className="mt-4 bg-red-100 text-red-600 p-3 rounded text-center font-semibold">
              {error}
            </div>
          )}
        </div>

        {/* ✅ INVOICE */}
        {invoice && (
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
        )}

      </div>

      {/* PRINT STYLE */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #invoice, #invoice * {
              visibility: visible;
            }
            #invoice {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}
      </style>

    </div>
  );
}