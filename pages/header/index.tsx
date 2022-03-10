import Link from "next/link";
import Image from 'next/image'
import { useRouter } from "next/router";
import { ReactElement } from "react";

import { Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LogoutIcon from "@mui/icons-material/Logout";

import Layout from "../../components/layout/layout";
import styles from "../../styles/Header.module.scss";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
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
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
  },
}));

export default function Header() {
  const router = useRouter();

  const handleSignout = () => {
    router.push("/login");
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button>
              <Link href="/home">
                <a id="anchor">
                  {" "}
                  <Image
                    src="/icon.png"
                    width="65"
                    height="40"
                    alt="LogoImage"
                  />{" "}
                </a>
              </Link>
            </Button>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Link href="/home">
                <a id="anchor">NFT Market</a>
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button className={styles.navBtn}>
                <Link href="/explore">All NFTs</Link>
              </Button>
              <Button className={styles.navBtn}>
                <Link href="/create">Create</Link>
              </Button>
            </Box>
            <Box
              style={{
                cursor: "pointer",
                marginLeft: "5px",
                marginRight: "7px",
              }}
            >
              <Link href="/wallet">
                <AccountBalanceWalletIcon />
              </Link>
            </Box>
            <Box
              style={{
                cursor: "pointer",
                marginLeft: "7px",
              }}
              onClick={handleSignout}
            >
              <LogoutIcon />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

Header.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
