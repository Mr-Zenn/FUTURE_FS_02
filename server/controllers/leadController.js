import Lead from "../models/Lead.js";

export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create({ ...req.body, user: req.user.id });
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLeads = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { user: req.user.id };
    const leads = await Lead.find(filter).populate("user", "name email");
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateLead = async (req, res) => {
  try {
    const query = req.user.role === "admin"
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user.id };

    const lead = await Lead.findOne(query);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    Object.assign(lead, req.body);
    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { user: req.user.id };
    const [total, newLeads, contacted, converted] = await Promise.all([
      Lead.countDocuments(filter),
      Lead.countDocuments({ ...filter, status: "new" }),
      Lead.countDocuments({ ...filter, status: "contacted" }),
      Lead.countDocuments({ ...filter, status: "converted" }),
    ]);

    res.json({ total, new: newLeads, contacted, converted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteLead = async (req, res) => {
  try {
    const query = req.user.role === "admin"
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user.id };

    const lead = await Lead.findOneAndDelete(query);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    res.json({ message: "Lead deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
