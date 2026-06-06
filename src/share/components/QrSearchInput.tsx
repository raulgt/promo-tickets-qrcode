import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function QrSearchInput() {
  const [qrNumber, setQrNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const cleanValue = qrNumber.trim();

    if (!cleanValue) return;

    navigate(`/qr/${cleanValue}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <input
        type="text"
        inputMode="numeric"
        placeholder="Escribe el número del ticket"
        value={qrNumber}
        onChange={(e) => {
          const onlyNumbers = e.target.value.replace(/\D/g, "");
          setQrNumber(onlyNumbers);
        }}
        style={{
          padding: "12px 16px",
          fontSize: "18px",
          borderRadius: "12px",
          border: "1px solid #ccc",
          outline: "none",
          width: "240px",
          textAlign: "center",
        }}
      />
    </form>
  );
}

export default QrSearchInput;