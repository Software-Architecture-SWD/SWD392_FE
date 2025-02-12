import { Typography, Box, Container, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function CustomFooter() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "black",
        color: "white",
        py: 3,
        mt: 4,
        textAlign: "center",
      }}
    >
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 1 }}>
          <IconButton color="inherit">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit">
            <TwitterIcon />
          </IconButton>
          <IconButton color="inherit">
            <InstagramIcon />
          </IconButton>
          <IconButton color="inherit">
            <LinkedInIcon />
          </IconButton>
        </Box>

        <Typography variant="body2">
          © {new Date().getFullYear()} MyWebsite. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}
