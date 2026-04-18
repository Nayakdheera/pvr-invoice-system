import { useEffect, useState } from "react";

export default function InvoicesList() {
  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/invoices`);
    const data = await res.json();
    setInvoices(data);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

 
  return (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Invoices</h2>

    <table className="w-full bg-white rounded-xl shadow">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-3 text-left">S NO</th>
          <th className="p-3">Invoice No</th>
          <th className="p-3">Product</th>
          <th className="p-3">Date</th>
          <th className="p-3">Vehicle NO</th>
          <th className="p-3">Material</th>
          <th className="p-3">Supplier Name</th>
          <th className="p-3">Material Name</th>
          <th className="p-3">No of Plates</th>
        </tr>
      </thead>

      <tbody>
        {invoices.map((inv) => (
          <tr key={inv._id} className="border-t text-center">
            <td className="p-3">{inv.sno}</td>
            <td>{inv.invoiceNo}</td>
            <td>{inv.product}</td>
            <td>{inv.date}</td>
            <td>{inv.vehicleNumber}</td>
            <td>{inv.material}</td>
            <td>{inv.supplierName}</td>
            <td>{inv.materialName}</td>
            <td>{inv.noOfPlates}</td>
        
            <td className="space-x-2">
              <button
                onClick={() => window.location.href = `/invoice/${inv._id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                View
              </button>

              <button
                onClick={() => window.location.href = `/edit/${inv._id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(inv._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

  async function handleDelete(id) {
    await fetch(`${import.meta.env.VITE_API_URL}/api/invoices/${id}`, {
      method: "DELETE",
    });

    fetchInvoices(); // refresh
  }
}