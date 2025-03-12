import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";

export default function ProfilePage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FFC3A0, #FFAFBD)",
        padding: "2rem",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
          padding: "2rem",
          borderRadius: "20px",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
          background: "white",
        }}
      >
        {/* Profile Avatar */}
        <Avatar
          src="https://source.unsplash.com/150x150/?woman,beauty"
          sx={{
            width: 120,
            height: 120,
            margin: "0 auto",
            border: "4px solid #FF8E53",
          }}
        />

        <CardContent>
          {/* User Information */}
          <Typography variant="h5" fontWeight="bold" color="primary">
            Jane Doe
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            janedoe@example.com
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, fontStyle: "italic" }}
          >
            "Beauty is not in the face; beauty is a light in the heart."
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              sx={{
                textTransform: "none",
                background: "black",
                color: "white",
                borderRadius: "30px",
                px: 3,
                ":hover": { background: "#FF8E53" },
              }}
            >
              Edit Profile
            </Button>

            <Button
              variant="outlined"
              startIcon={<LockIcon />}
              sx={{
                textTransform: "none",
                borderColor: "black",
                color: "black",
                borderRadius: "30px",
                px: 3,
                ":hover": { borderColor: "#FF8E53", color: "#FF8E53" },
              }}
            >
              Change Password
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
