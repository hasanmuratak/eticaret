
import Button from "@mui/material/Button";
import "../products.css";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  return (
    <div className="kart-container">
      <h1 className="baslik">{product.title}</h1>

      <img className="img" src={product.image} />

      <p className="detaylar">{product.description}</p>

      <div className="butonlar .MuiButton-contained">
        <Button variant="contained">Tıkla</Button>
        <Button  variant="outlined">Tıkla</Button>
      </div>
    </div>
  );
}