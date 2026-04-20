

import { useState, useRef } from "react";
import logo from "../assets/pvr logo.png";

export default function Invoice() {
  const [form, setForm] = useState({
    sno:"",
    invoiceNo: "",
    msPlateCode:"",
    date: "",
    vehicleNumber: "",
    material:"",
    supplierName: "",
    description: "",
    noOfPlates: "",
    weight: "",
    remarks: "",
  });

  const [qr, setQr] = useState("");
  const qrRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/invoices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setQr(data.qr);

    alert("Invoice Added ✅");
    console.log(data);
  };

  // ✅ DOWNLOAD QR
const downloadQR = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const qrImg = new Image();
  const logoImg = new Image();

  qrImg.src = qrRef.current.querySelector("img").src;
  logoImg.src = logo;

  qrImg.onload = () => {
    canvas.width = 400;
    canvas.height = 500;

    // background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // logo
    logoImg.onload = () => {
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
      link.href = canvas.toDataURL();
      link.click();
    };
  };
};

const printQR = () => {
  const imgSrc = qrRef.current.querySelector("img").src;

  const printWindow = window.open("", "_blank");

printWindow.document.write(`
  <html>
    <head>
      <title>Print QR</title>
      <style>
        body {
          text-align: center;
          font-family: Arial;
          padding: 5px; /* 🔥 reduced */
        }

        .logo {
          width: 70px; /* 🔥 smaller logo */
          display: block;
          margin: 0 auto 2px auto; /* 🔥 almost no gap */
        }

        h2 {
          margin: 0; /* 🔥 remove default margin */
          font-size: 18px;
        }

        .subtitle {
          margin: 2px 0 10px 0; /* 🔥 controlled spacing */
          font-size: 14px;
        }

        .qr {
          width: 200px;
          margin-top: 5px;
        }
      </style>
    </head>

    <body>
      <img src="${logo}" class="logo" />
      <h2>PVR Projects Limited</h2>
      <div class="subtitle">Invoice QR Code</div>
      <img src="${imgSrc}" class="qr" />
    </body>
  </html>
`);

  printWindow.document.close();
  printWindow.print();
};

return (
  <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4 print:text-base print:bg-white print:p-0 ">
    
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 print:max-w-full print:w-full print:p-6 
                print:shadow-none print:rounded-none print:text-base print:text-[16px] print:leading-relaxed print:text-black">
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center print:text-black">
        Add Invoice
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          name="sno"
          placeholder="S NO"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none print:text-black print:text-[15px]"
      
      />

        <input
          name="invoiceNo"
          placeholder="Invoice No"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none print:text-black print:text-[15px]"
        />

        <input
          name="msPlateCode"
          placeholder="MS Plate Code"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none print:text-black print:text-[15px]"
        />

        <input
          name="date"
          type="date"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none print:text-black print:text-[15px]"
        />

        <input
          name="vehicleNumber"
          placeholder="Vehicle Number"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none print:text-black print:text-[15px]"
        />

        <input
          name="material"
          placeholder="Material "
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none print:text-black print:text-[15px]"
        />

        <input
          name="supplierName"
          placeholder="Supplier Name"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none  print:text-black print:text-[15px]"
        />

        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none print:text-black print:text-[15px]"
        />

        <input
          name="noOfPlates"
          placeholder="No of Plates"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none  print:text-black print:text-[15px]"
        />

        <input
          name="weight"
          placeholder="Weight"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none  print:text-black print:text-[15px]"
        />

        <input
          name="remarks"
          placeholder="Remarks"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none print:text-black print:text-[15px]"
        />
        

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
        >
          Add Invoice
        </button>
      </form>

      {/* QR SECTION */}
      {qr && (
        <div className="mt-8 text-center">
          
          <div
            ref={qrRef}
            className="inline-block bg-white p-4 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              QR Code
            </h3>
            <img src={qr} alt="QR" className="w-48 mx-auto" />
            
          </div>

          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={downloadQR}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Download QR
            </button>

            <button
              onClick={printQR}
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Print QR
            </button>
          </div>
        </div>
      )}

    </div>
  </div>
);
}





