import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Navbar from "./components/navbar"
import ProductsPage from './products/page';
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar />
      
      <Container maxWidth="lg">
        <ProductsPage/>
        <Box sx={{ bgcolor: '#858585', height: '100vh' }} />
        
        <Box/>

      </Container>
    </React.Fragment>
  );
}
