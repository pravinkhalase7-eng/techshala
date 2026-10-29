export function Dialog({
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="modal-back" role="presentation" onClick={onCancel}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="dialog-title" onClick={(event) => event.stopPropagation()}>
        <h2 id="dialog-title">{title}</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn ghost" type="button" onClick={onCancel}>{cancelLabel}</button>
          <button className="btn" type="button" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
