import ProductCard from "./ProductCard";
import "./products.css";
import Link from "next/link";
import { Grid, Container, Typography } from "@mui/material";

async function getProducts() {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    return products;
}

export default async function ProductsPage() {

    const products = await getProducts();

    return (
        <Container maxWidth="lg" sx={{ mt: 6, mb: 10 }}>
            
            <Typography
                variant="h4"
                fontWeight={600}
                mb={6}
                borderBottom="1px solid #eee"
                pb={2}
            >
                Ürünler
            </Typography>

            <Grid container spacing={6}>
                {products.map(product => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Link
                            href={`/products/${product.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <ProductCard product={product} />
                        </Link>
                    </Grid>
                ))}
            </Grid>

        </Container>
    );
}