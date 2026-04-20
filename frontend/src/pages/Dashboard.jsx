
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
// import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../assets/pvr logo.png";
// import logo from "../assets/pvr logo.png";

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
  // const downloadPDF = async () => {
  //   const element = document.getElementById("invoice");

  //   const canvas = await html2canvas(element, { scale: 2 });
  //   const imgData = canvas.toDataURL("image/png");

  //   const pdf = new jsPDF("p", "mm", "a4");

  //   const imgWidth = 190;
  //   const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //   pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
  //   pdf.save("invoice.pdf");
  // };
  const downloadPDF = async () => {
  const element = document.getElementById("invoice");

  if (!element) {
    alert("Invoice not found!");
    return;
  }

  try {
    // 🔥 CLONE ELEMENT (clean copy)
    const clone = element.cloneNode(true);

    // 🔥 REMOVE ALL CLASSES (this removes Tailwind oklch issue)
    clone.querySelectorAll("*").forEach((el) => {
      el.className = "";
    });

    // 🔥 APPLY SAFE STYLES
    clone.style.background = "#ffffff";
    clone.style.color = "#000000";
    clone.style.padding = "20px";

    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
    });

    document.body.removeChild(clone);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("invoice.pdf");

  } catch (err) {
    console.error("PDF ERROR:", err);
    alert("PDF failed");
  }
};

  // print QR
const printQR = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const qrImg = new Image();
  const logoImg = new Image();

  qrImg.crossOrigin = "anonymous";
  logoImg.crossOrigin = "anonymous";

  qrImg.src = invoice.qr;
  logoImg.src = logo;

  qrImg.onload = () => {
    canvas.width = 400;
    canvas.height = 500;

    // background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    logoImg.onload = () => {
      // logo
      ctx.drawImage(logoImg, 150, 20, 100, 60);

      // title
      ctx.fillStyle = "black";
      ctx.font = "bold 18px Arial";
      ctx.textAlign = "center";
      ctx.fillText("PVR Projects Limited", 200, 100);

      // QR
      ctx.drawImage(qrImg, 100, 120, 200, 200);

      // invoice number
      ctx.font = "14px Arial";
      ctx.fillText(`S NO: ${invoice.sno}`, 200, 350);

      // 👉 PRINT
      const imgData = canvas.toDataURL("image/png");

      const win = window.open("", "_blank");

      win.document.write(`
        <html>
          <head>
            <title>Print QR</title>
            <style>
              body {
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
              }
              img {
                width: 300px;
              }
            </style>
          </head>
          <body>
            <img src="${imgData}" />
          </body>
        </html>
      `);

      win.document.close();
      win.focus();
      win.print();
    };

    // fallback if logo fails
    logoImg.onerror = () => {
      ctx.drawImage(qrImg, 100, 120, 200, 200);

      const imgData = canvas.toDataURL("image/png");

      const win = window.open("", "_blank");

      win.document.write(`<img src="${imgData}" style="width:300px;" />`);
      win.document.close();
      win.print();
    };
  };
};

// download qr
// const downloadQR = (qr) => {
//   const link = document.createElement("a");
//   link.href = qr;
//   link.download = "qr-code.png";
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };
const downloadQR = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const qrImg = new Image();
  const logoImg = new Image();

  // ✅ IMPORTANT
  qrImg.crossOrigin = "anonymous";
  logoImg.crossOrigin = "anonymous";

  qrImg.src = invoice.qr;
  logoImg.src = logo;

  qrImg.onload = () => {
    canvas.width = 400;
    canvas.height = 500;

    // background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    logoImg.onload = () => {
      // logo
      ctx.drawImage(logoImg, 150, 20, 100, 60);

      // company name
      ctx.fillStyle = "black";
      ctx.font = "bold 18px Arial";
      ctx.textAlign = "center";
      ctx.fillText("PVR Projects Limited", 200, 100);

      // QR
      ctx.drawImage(qrImg, 100, 120, 200, 200);

      // download
      const link = document.createElement("a");
      link.download = "invoice-qr.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    // ⚠️ fallback if logo fails
    logoImg.onerror = () => {
      ctx.drawImage(qrImg, 100, 120, 200, 200);

      const link = document.createElement("a");
      link.download = "invoice-qr.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  };
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
          {invoice && (
  <div className="mt-6 text-center border-t pt-6">

    <h3 className="text-lg font-semibold mb-3 text-green-600">
      ✅ Invoice Found
    </h3>

    {invoice.qr && (
      <img
        src={invoice.qr}
        alt="QR"
        className="w-40 mx-auto mb-4"
      />
    )}

    <div className="flex justify-center gap-4">
      
      <button
        onClick={printQR}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Print QR
      </button>

      <button
        onClick={() => downloadQR(invoice.qr)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Download QR 
      </button>
    </div>

  </div>
)}
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

            <div id="invoice" className="p-8"  style={{ background: "white", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>

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
              <p className="text-gray-500">Description</p>
              <p>{invoice.description}</p>
            </div>

            <div>
              <p className="text-gray-500">No of Plates</p>
              <p>{invoice.noOfPlates}</p>
            </div>

            <div>
              <p className="text-gray-500">Weight</p>
              <p>{invoice.weight}</p>
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

              {/* <button
                onClick={downloadPDF}
                className="bg-green-500 text-white px-5 py-2 rounded"
              >
                Download PDF
              </button> */}
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