import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  InputBase,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled, alpha } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.2),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.4),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "25ch",
      "&:focus": {
        width: "40ch",
      },
    },
  },
}));

export default function SearchBar() {
  return (
    <Box>
      <Box sx={{ "& > :not(style)": { m: 2 } }}>
        <Typography align="right"></Typography>
      </Box>
      <AppBar
        position="static"
        sx={{ backgroundColor: "transparent", boxShadow: "none", marginTop: 2 }}
      >
        <Toolbar sx={{}}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Stack direction="row" spacing={2} marginLeft={3}>
            <Button
              variant="contained"
              sx={{
                borderRadius: 2,

                backgroundColor: "black",
                "&:hover": {
                  background: "linear-gradient(135deg, #ff8e53, #ff6b6b)",
                },
              }}
            >
              Search
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
