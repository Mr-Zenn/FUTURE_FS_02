import { useState, useEffect } from "react";
import { RiAddLine, RiEditLine } from "react-icons/ri";
import API from "../api";
import InputField from "./ui/InputField";
import Button from "./ui/Button";
import { useToast } from "../context/ToastContext";

const EMPTY = { name: "", email: "", phone: "", notes: "" };
const STATUS_OPTIONS = ["new", "contacted", "converted"];

export default function LeadForm({ onLeadAdded, editLead, onCancel }) {
  const isEdit = Boolean(editLead);
  const toast  = useToast();

  const [form, setForm]       = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(editLead
      ? { name: editLead.name || "", email: editLead.email || "",
          phone: editLead.phone || "", notes: editLead.notes || "",
          status: editLead.status || "new" }
      : EMPTY
    );
  }, [editLead]);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await API.put(`/leads/${editLead._id}`, form);
        toast("Lead updated successfully!", "success");
        onCancel();
      } else {
        await API.post("/leads", form);
        setForm(EMPTY);
        toast("Lead added successfully!", "success");
      }
      onLeadAdded();
    } catch (err) {
      toast(err.response?.data?.message || (isEdit ? "Failed to update lead" : "Failed to add lead"), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`card ${isEdit ? "card-edit-mode" : ""}`}>
      <h3 className="card-title">
        {isEdit ? <RiEditLine size={16} /> : <RiAddLine size={16} />}
        {isEdit ? `Editing: ${editLead.name}` : "Add Lead"}
        {isEdit && (
          <button className="btn btn-cancel card-cancel-btn" onClick={onCancel} type="button">
            ✕ Cancel
          </button>
        )}
      </h3>

      <form className="lead-form" onSubmit={handleSubmit}>
        <InputField placeholder="Full Name"     value={form.name}  onChange={set("name")}  required />
        <InputField placeholder="Email Address" type="email" value={form.email} onChange={set("email")} />
        <InputField placeholder="Phone Number"  value={form.phone} onChange={set("phone")} />
        <InputField placeholder="Notes"         value={form.notes} onChange={set("notes")} />
        {isEdit && (
          <div className="input-group">
            <label className="input-label">Status</label>
            <select className="select-input" value={form.status} onChange={set("status")}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
        )}
        <Button type="submit" loading={loading} variant={isEdit ? "edit" : "primary"}>
          {isEdit ? "Save Changes" : "Add Lead"}
        </Button>
      </form>
    </div>
  );
}
