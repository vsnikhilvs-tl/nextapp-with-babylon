import { ReactElement } from "react";

import Layout from "../../components/layout/layout";
import data from "./AllNfts.json";
import styles from "../../styles/Explore.module.scss";
import Image from 'next/image';

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Button, IconButton } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Explore() {
    const nftData = data.data;
  return (
    <div className={styles.allnftsMain}>
      <div className={styles.filterDiv}>asdasd</div>
      <div className={styles.cardsDiv}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
            {nftData.map((item) => (
              <Grid key={item.id} item xs="auto" md="auto" lg="auto">
                <Item>
                  <div className={styles.cardMain}>
                    <div className={styles.imageDiv}>
                      <Image
                        width="250"
                        height="250"
                        src={`${item.avatar}`}
                        alt={item.title}
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.details}>
                      <div className={styles.titles}>
                        <div>{item.title}</div>
                        <div>
                          <strong>{item.author}</strong>
                        </div>
                      </div>
                      <div className={styles.prices}>
                        <div style={{ fontSize: "12px" }}>Price</div>
                        <div style={{ fontSize: "14px", display: "flex", alignItems: "center" }}>
                            <DiamondIcon fontSize="small" style={{marginRight: "5px"}}/>
                          <strong>{item.price}</strong>
                        </div>
                        <div style={{ fontSize: "11px" }}>
                          {item.periodLeft} left
                        </div>
                      </div>
                    </div>
                    <div className={styles.buy}>
                      <div className={styles.buyBtn}>
                        <Button>Buy</Button>
                      </div>
                      <div className={styles.favBtn}>
                        <IconButton>
                          <FavoriteBorderIcon />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
}

Explore.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
