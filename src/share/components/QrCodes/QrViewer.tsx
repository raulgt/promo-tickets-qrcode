import { useMemo } from "react";
import { useParams } from "react-router-dom";

import ticketsData from "../../../data/ticketsData.json";
import QrSearchInput from "../QrSearchInput";

// Importa todas las imágenes de la carpeta qrcodes
const qrImages = import.meta.glob("/src/assets/qrcodes/*.png", { eager: true });

type TicketItem = {
  id_serie: number;
  id: string;
  buyer_name: string;
  buyer_identification: string;
};

function formatName(name?: string) {
  if (!name) return "Comprador no registrado";

  return name
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function QrViewer() {
  const { id } = useParams();

  // Convierte el array del JSON en un mapa:
  // {
  //   "20": {...},
  //   "21": {...}
  // }
  const ticketsMap = useMemo(() => {
    return (ticketsData as TicketItem[]).reduce<Record<string, TicketItem>>(
      (acc, item) => {
        acc[String(item.id_serie)] = item;
        return acc;
      },
      {},
    );
  }, []);

  const imageKey = `/src/assets/qrcodes/qr_${id}.png`;
  const imageSrc = (qrImages[imageKey] as { default: string } | undefined)
    ?.default;

  const ticketInfo = id ? ticketsMap[id] : undefined;

  const hasQrImage = Boolean(imageSrc);
  const hasTicketInfo = Boolean(ticketInfo);

  if (!hasQrImage && !hasTicketInfo) {
    return (
      <div className="app-container-glow">
        <h2 style={{ color: "white", textAlign: "center" }}>
          Ticket no encontrado
        </h2>
        <QrSearchInput />
      </div>
    );
  }

  return (
    <div
      className="app-container-glow"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {hasQrImage ? (
        <img
          src={imageSrc}
          alt={`QR ${id}`}
          style={{
            maxWidth: "255px",
            width: "100%",
            height: "auto",
          }}
        />
      ) : (
        <div
          style={{
            width: "255px",
            height: "255px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f3f3f3",
            borderRadius: "12px",
            color: "#333",
            textAlign: "center",
            padding: "10px",
          }}
        >
          Imagen QR no encontrada
        </div>
      )}

      <div style={{ background: "rgba(255, 255, 255, 0.8)", borderRadius: "12px", padding: "15px", marginTop: "20px", width: "100%", maxWidth: "400px" }}>
        <h3
          style={{
            textAlign: "center",
            marginTop: "10px",
            color: "black",
            fontSize: "33px",
          }}
        >
          N# {id}
        </h3>

        <h4
          style={{
            textAlign: "center",
            marginTop: "8px",
            marginBottom: "6px",
            color: "black",
            fontSize: "25px",
            fontWeight: "600",
          }}
        >
          {formatName(ticketInfo?.buyer_name)}
        </h4>

        <p
          style={{
            textAlign: "center",
            margin: 0,
            color: "black",
            fontSize: "25px",
            fontWeight: "500",
          }}
        >
          CI: {ticketInfo?.buyer_identification ?? "No registrada"}
        </p>
      </div>

      <QrSearchInput />
    </div>
  );
}

export default QrViewer;
