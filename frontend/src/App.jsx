import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Invoice from "./pages/Invoice";
import InvoiceDetail from "./pages/InvoiceDetail";
import InvoicesList from "./pages/InvoicesList";
import EditInvoice from "./pages/EditInvoice";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/invoice/:id" element={<InvoiceDetail />} />
        <Route path="/invoices" element={<InvoicesList />} />
        <Route path="/edit/:id" element={<EditInvoice />} />

      </Routes>
    </BrowserRouter>
  );
}