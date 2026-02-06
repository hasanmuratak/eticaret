import Box from "@mui/material/Box";
import { colors } from "@mui/material";
import "./products.css";
import { Colorize } from "@mui/icons-material";
import Typography from "@mui/material/Typography";

// https://fakestoreapi.com/products
import Rating from '@mui/material/Rating';
export default function ProductCard({ product }) {

  const rate = product.rating.rate;
  const count = product.rating.count;

  return (

    <Box
      sx={{
        width: 260,
        height: 360,
        backgroundColor: "#fff",
        borderRadius: 3,
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "all .25s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 28px rgba(0,0,0,0.14)"
        }
      }}
    >

      <Box
        sx={{
          width: 220,
          height: 220,
          backgroundColor: "#fff",
          borderRadius: 3,

          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "0 2px 8px rgb(244, 242, 242)",
          transition: "all .25s ease",

        }}
      >
        <img className="img" src={product.image} />

      </Box>
      <Box>
        <Box>


          <Box sx={{
            fontSize: "small", textAlign: "center", display: "flex", justifyContent: "center", gap: 0.5 ,
            alignItems: "center",
          }}>
            <Rating name="read-only" value={rate} readOnly size="small" />
            <Typography sx={{ fontSize: "small" }} > ({count}) </Typography>
          </Box>
        </Box>
        <Typography sx={{ fontSize: "small", textAlign: "center", marginBottom: "5px" }}>{product.title}</Typography>
        <p style={{ color: "orange", fontSize: "small" }}>{product.price} $</p>
      </Box>
    </Box>
  );



}
