
import { useParams } from "react-router-dom";


// Importa todas las imágenes de la carpeta qrcodes
const qrImages = import.meta.glob("/src/assets/qrcodes/*.png", { eager: true });

function QrViewer() {
  const { id } = useParams(); // lee el parámetro de la URL

    
  const imageKey = `/src/assets/qrcodes/qr_${id}.png`;
  const imageSrc = (qrImages[imageKey] as { default: string })?.default;



  if (!imageSrc) {
    return (
      <div className="app-container-glow">
        <h2 style={{ color: "white", textAlign: "center" }}>QR no encontrado</h2>
      </div>
    );
  }

  return (
    <div className="app-container-glow" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <img 
      src={imageSrc} alt={`QR ${id}`} 
      style={{ 
        maxWidth: "255px", 
        width: "100%",
        height: "auto" 
      }} 
      />
      <h3 style={{ textAlign: "center", marginTop: '10px', color: "black", fontSize: "33px"}}>N# {id}</h3>
    </div>
  );
}

export default QrViewer;


