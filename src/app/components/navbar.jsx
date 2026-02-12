"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  InputBase,
  Drawer,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Button
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty } from "../cart/redux/cartSlice";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const cart = useSelector((state) => state.cart.items || []);
  const dispatch = useDispatch();
  const router = useRouter();

  const itemCount = cart.reduce((s, i) => s + (i.quantity || 0), 0);

  const toggleDrawer = (val) => () => setOpen(val);

  const handleGoToCart = () => {
    setOpen(false);
    router.push('/cart');
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#fff",
        color: "#000",
        borderBottom: "1px solid #eee"
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1300,
          width: "100%",
          mx: "auto",
          justifyContent: "space-between"
        }}
      >
        {/* LEFT LINKS */}
        <Box sx={{ display: "flex", gap: 4, fontSize: 15 }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            Kadın
          </Link>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            Erkek
          </Link>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            Yeni
          </Link>
        </Box>

        {/* LOGO */}
        <Typography
          sx={{
            fontWeight: 700,
            letterSpacing: 4,
            fontSize: 22
          }}
        >
          HASANSTORE
        </Typography>

        {/* RIGHT SIDE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          
          {/* SEARCH */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "none",
              px: 1,
              py: 0.5,
              borderRadius: 3
            }}
          >
            <SearchIcon sx={{ fontSize: 20 }} />
            <InputBase placeholder="Ara..." sx={{ ml: 1,fontSize: 15  }} />
          </Box>

          <IconButton>
            <AccountCircle />
          </IconButton>

          <IconButton onClick={toggleDrawer(true)} aria-label="Sepet">
            <Badge badgeContent={itemCount} color="error">
              {itemCount > 0 ? (
                <ShoppingCartCheckoutIcon sx={{ color: '#d32f2f' }} />
              ) : (
                <ShoppingCartIcon />
              )}
            </Badge>
          </IconButton>

          <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 360, p: 2 }} role="presentation">
              <Typography variant="h6" sx={{ mb: 1 }}>Sepetiniz</Typography>
              <Divider />

              {cart.length === 0 ? (
                <Box sx={{ mt: 4, textAlign: 'center', color: '#666' }}>Sepetiniz boş</Box>
              ) : (
                <List>
                  {cart.map((item) => (
                    <ListItem key={item.id} alignItems="flex-start" secondaryAction={
                      <IconButton edge="end" onClick={() => dispatch(removeFromCart(item.id))}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    }>
                      <ListItemAvatar>
                        <Avatar src={item.image} variant="rounded" sx={{ width: 56, height: 56 }} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                            <IconButton size="small" onClick={() => dispatch(decreaseQty(item.id))}><RemoveIcon fontSize="small"/></IconButton>
                            <Typography variant="body2">{item.quantity}</Typography>
                            <IconButton size="small" onClick={() => dispatch(increaseQty(item.id))}><AddIcon fontSize="small"/></IconButton>
                            <Typography variant="body2" sx={{ ml: 1, fontWeight: 600 }}>{(item.price * item.quantity).toFixed(2)} $</Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}

              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                <Typography variant="subtitle1">Toplam</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{cart.reduce((t, i) => t + i.price * i.quantity, 0).toFixed(2)} $</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <Button variant="outlined" fullWidth onClick={handleGoToCart}>Sepete Git</Button>
                <Button variant="contained" fullWidth color="primary">Ödeme</Button>
              </Box>
            </Box>
          </Drawer>

        </Box>
      </Toolbar>
    </AppBar>
  );
}