export default function InputField({ label, ...props }) {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input {...props} />
    </div>
  );
}
