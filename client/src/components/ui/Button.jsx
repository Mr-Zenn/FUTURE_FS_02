export default function Button({ children, loading, variant = "primary", ...props }) {
  const isLight = variant === "edit" || variant === "delete" || variant === "cancel";
  return (
    <button className={`btn btn-${variant}`} disabled={loading || props.disabled} {...props}>
      {loading
        ? <span className={isLight ? "btn-spinner btn-spinner-dark" : "btn-spinner"} />
        : children}
    </button>
  );
}
