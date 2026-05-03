import { useEffect, useState } from "react";
import { RiBarChartLine, RiAddCircleLine, RiPhoneLine, RiCheckboxCircleLine } from "react-icons/ri";
import API from "../api";
import Navbar from "../components/Navbar";
import LeadForm from "../components/LeadForm";
import LeadList from "../components/LeadList";
import StatCard from "../components/ui/StatCard";
import { useToast } from "../context/ToastContext";

const STAT_CONFIG = [
  { key: "total",     label: "Total Leads", Icon: RiBarChartLine,       accent: "#4f46e5" },
  { key: "new",       label: "New",         Icon: RiAddCircleLine,      accent: "#0ea5e9" },
  { key: "contacted", label: "Contacted",   Icon: RiPhoneLine,          accent: "#f59e0b" },
  { key: "converted", label: "Converted",   Icon: RiCheckboxCircleLine, accent: "#10b981" },
];

export default function Dashboard() {
  const toast = useToast();

  const [leads, setLeads]       = useState([]);
  const [stats, setStats]       = useState({ total: 0, new: 0, contacted: 0, converted: 0 });
  const [loading, setLoading]   = useState(true);
  const [editLead, setEditLead] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, statsRes] = await Promise.all([
        API.get("/leads"),
        API.get("/leads/stats"),
      ]);
      setLeads(leadsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      toast("Failed to load data. Please refresh.", "error");
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/leads/${id}`);
      toast("Lead deleted.", "success");
      await fetchData();
    } catch (err) {
      toast("Failed to delete lead.", "error");
      console.error(err.message);
    }
  };

  const handleEdit = (lead) => {
    setEditLead(lead);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="stats">
          {STAT_CONFIG.map(({ key, label, Icon, accent }) => (
            <StatCard key={key} label={label} value={stats[key]} icon={<Icon size={22} />} accent={accent} />
          ))}
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading your leads…</p>
          </div>
        ) : (
          <>
            <LeadForm
              onLeadAdded={fetchData}
              editLead={editLead}
              onCancel={() => setEditLead(null)}
            />
            <LeadList
              leads={leads}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>
    </>
  );
}
