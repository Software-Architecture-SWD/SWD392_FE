import { Typography, Box } from "@mui/material";

export default function CustomFooter() {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        padding: "16px",
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #ddd",
        marginTop: "auto",
      }}
    >
      <Typography variant="body2" color="textSecondary" sx={{fontFamily: "Lora"}}>
        Material-UI ©{new Date().getFullYear()} Created by Your Name
      </Typography>
    </Box>
  );
}
