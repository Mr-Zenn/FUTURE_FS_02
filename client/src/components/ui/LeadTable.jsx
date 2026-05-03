import { useState } from "react";
import { RiEditLine, RiDeleteBinLine, RiUserLine } from "react-icons/ri";

export default function LeadTable({ leads, onEdit, onDelete }) {
  const [confirmId, setConfirmId]   = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    setDeletingId(id);
    await onDelete(id);
    setConfirmId(null);
    setDeletingId(null);
  };

  if (!leads.length)
    return (
      <div className="empty-state">
        <RiUserLine size={40} className="empty-icon-svg" />
        <p>No leads yet. Add your first lead above.</p>
      </div>
    );

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Notes</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, i) => (
            <>
              <tr key={lead._id} className={i % 2 === 0 ? "row-even" : "row-odd"}>
                <td className="td-name">{lead.name}</td>
                <td>{lead.email || "—"}</td>
                <td>{lead.phone || "—"}</td>
                <td className="td-notes">{lead.notes || "—"}</td>
                <td>
                  <span className={`badge badge-${lead.status}`}>{lead.status}</span>
                </td>
                <td>
                  <div className="action-btns">
                    <button
                      className="btn-icon btn-icon-edit"
                      onClick={() => { onEdit(lead); setConfirmId(null); }}
                      title="Edit lead"
                    >
                      <RiEditLine size={15} />
                    </button>
                    <button
                      className="btn-icon btn-icon-delete"
                      onClick={() => setConfirmId(confirmId === lead._id ? null : lead._id)}
                      title="Delete lead"
                    >
                      <RiDeleteBinLine size={15} />
                    </button>
                  </div>
                </td>
              </tr>

              {confirmId === lead._id && (
                <tr key={`confirm-${lead._id}`} className="confirm-row">
                  <td colSpan={6}>
                    <div className="confirm-bar">
                      <span>Delete <strong>{lead.name}</strong>? This cannot be undone.</span>
                      <div className="confirm-actions">
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDelete(lead._id)}
                          disabled={deletingId === lead._id}
                        >
                          {deletingId === lead._id
                            ? <span className="btn-spinner btn-spinner-dark" />
                            : "Yes, Delete"}
                        </button>
                        <button className="btn btn-cancel" onClick={() => setConfirmId(null)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
