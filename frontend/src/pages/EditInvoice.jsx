import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditInvoice() {
  const { id } = useParams();

  const [form, setForm] = useState({
    invoiceNo: "",
    supplierName: "",
    materialName: "",
    noOfPlates: "",
  });

  useEffect(() => {
    fetchInvoice();
  }, []);

  const fetchInvoice = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/invoices/${id}`);
    const data = await res.json();
    setForm(data);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await fetch(`${import.meta.env.VITE_API_URL}/api/invoices/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    alert("Updated successfully ✅");
    window.location.href = "/invoices";
  };
  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
    
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Edit Invoice
      </h2>

      <form onSubmit={handleUpdate} className="space-y-5">

        {/* S NO */}
        <div>
          <label className="block text-sm text-gray-600">S NO</label>
          <input
            value={form.sno}
            onChange={(e) => setForm({ ...form, sno: e.target.value })}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Invoice No */}
        <div>
          <label className="block text-sm text-gray-600">Invoice No</label>
          <input
            value={form.invoiceNo}
            onChange={(e) => setForm({ ...form, invoiceNo: e.target.value })}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Product */}
        <div>
          <label className="block text-sm text-gray-600">Product</label>
          <input
            value={form.product}
            onChange={(e) => setForm({ ...form, product: e.target.value })}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm text-gray-600">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Vehicle Number */}
        <div>
          <label className="block text-sm text-gray-600">Vehicle Number</label>
          <input
            value={form.vehicleNumber}
            onChange={(e) => setForm({ ...form, vehicleNumber: e.target.value })}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Material */}
        <div>
          <label className="block text-sm text-gray-600">Material</label>
          <input
            value={form.material}
            onChange={(e) => setForm({ ...form, material: e.target.value })}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Supplier Name */}
        <div>
          <label className="block text-sm text-gray-600">Supplier Name</label>
          <input
            value={form.supplierName}
            onChange={(e) => setForm({ ...form, supplierName: e.target.value })}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Material Name */}
        <div>
          <label className="block text-sm text-gray-600">Material Name</label>
          <input
            value={form.materialName}
            onChange={(e) => setForm({ ...form, materialName: e.target.value })}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* No of Plates */}
        <div>
          <label className="block text-sm text-gray-600">No of Plates</label>
          <input
            type="number"
            value={form.noOfPlates}
            onChange={(e) => setForm({ ...form, noOfPlates: e.target.value })}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Remarks */}
        <div>
          <label className="block text-sm text-gray-600">Remarks</label>
          <input
            value={form.remarks}
            onChange={(e) => setForm({ ...form, remarks: e.target.value })}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
        >
          Update Invoice
        </button>

      </form>
    </div>
  </div>
);
}