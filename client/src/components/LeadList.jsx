import LeadTable from "./ui/LeadTable";

export default function LeadList({ leads, onEdit, onDelete }) {
  return (
    <div className="card">
      <h3 className="card-title">
        <span className="card-title-icon">👥</span> Leads
        <span className="card-count">{leads.length}</span>
      </h3>
      <LeadTable leads={leads} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}
