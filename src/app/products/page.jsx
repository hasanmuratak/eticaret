
import ProductCard from "./ProductCard";
import "./products.css";
import Link from "next/link";
import { Grid } from "@mui/material";
// https://fakestoreapi.com/products

async function getProducts() {

    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    return products;

}




export default async function ProductsPage() {

    const products = await getProducts();


    return (
        <div className="sayfa">
            <h1 className="text-3xl font-semibold text-gray-900 mb-8 border-b pb-3">Ürünler</h1>
            <div className="urunler">
        
                {products.map(product => (
                    
                    <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <ProductCard product={product} />
                    </Link>
                    
                ))}

                
            </div>

        </div>
    );

}
