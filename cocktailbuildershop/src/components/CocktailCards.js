import React, { useState, useEffect, useContext } from "react";
import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import { CardMedia, Grid, Typography } from "@material-ui/core";
import { makeStyles, Container } from "@material-ui/core";
import MainContext from "../context/MainContext";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Pages from "./Pages";
import PRICES from "../Prices";
import {
  writeAsync,
  readOnceGet,
  updateAsync,
} from "../firebase/crudoperations";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "95%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function CocktailCards() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const { currentUser } = useContext(MainContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const addItemToCart = (card, func) => {
    currentUser &&
      readOnceGet(`users/${currentUser.uid}/orders`, (items) => items).then(
        (value) => {
          const item =
            value &&
            Object.entries(value).find(
              (e) =>
                e[1].order.idDrink ===
                (func ? func(card).idDrink : card.idDrink)
            );
          !item
            ? writeAsync(`users/${currentUser.uid}/orders`, {
                order: func ? func(card) : card,
                quantity: 1,
              })
            : updateAsync(`users/${currentUser.uid}/orders/${item[0]}`, {
                quantity: ++item[1].quantity,
              });
        }
      );
  };

  const onDouble = (item) => {
    return {
      ...item,
      idDrink: item.idDrink + "double",
      strDrink: item.strDrink + " DOUBLE",
      price: item.price + PRICES[item.strIngredient1],
    };
  };

  useEffect(() => {
    let each = [];
    let letters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let urls = [];
    for (let letter of letters) {
      urls.push(
        "https://thecocktaildb.com/api/json/v1/1/search.php?f=" + letter
      );
    }
    let requests = urls.map((url) => fetch(url));
    Promise.all(requests)
      .then((responses) => Promise.all(responses.map((item) => item.json())))
      .then((items) => {
        items.forEach((item) => {
          if (item.drinks !== null) each = each.concat(item.drinks);
        });
        for (let cocktail of each) {
          let ingPrice1 = PRICES.hasOwnProperty(cocktail.strIngredient1)
            ? PRICES[cocktail.strIngredient1]
            : 3;
          let ingPrice2 = PRICES.hasOwnProperty(cocktail.strIngredient2)
            ? PRICES[cocktail.strIngredient2]
            : 3;
          let ingPrice3 = PRICES.hasOwnProperty(cocktail.strIngredient3)
            ? PRICES[cocktail.strIngredient3]
            : cocktail.strIngredient3 === null
            ? 0
            : 3;
          let ingPrice4 = PRICES.hasOwnProperty(cocktail.strIngredient4)
            ? PRICES[cocktail.strIngredient4]
            : cocktail.strIngredient4 === null
            ? 0
            : 3;
          cocktail.price = ingPrice1 + ingPrice2 + ingPrice3 + ingPrice4;
        }
        setData(each);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Cocktails
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              What is the best way to maintain a balanced diet? A cocktail in
              each hand. So if you are on a diet , just order two cocktails
              instead of one.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {currentItems.map((card) => (
              <Grid item key={card.idDrink} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.strDrinkThumb}
                    title={card.strDrink}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.strDrink}
                    </Typography>

                    <Typography>{card.strCategory}</Typography>
                  </CardContent>
                  {card.strAlcoholic === "Alcoholic" && (
                    <Button
                      onClick={() => addItemToCart(card, onDouble)}
                      color="primary"
                      variant="outlined"
                      style={{ marginLeft: "10px", marginRight: "10px" }}
                    >
                      {"Double <<" +
                        card.strIngredient1 +
                        ">>  /+$" +
                        PRICES[card.strIngredient1]}
                      .00
                    </Button>
                  )}
                  <CardActions>
                    <Button
                      onClick={() => addItemToCart(card)}
                      size="small"
                      color="primary"
                      variant="outlined"
                    >
                      ADD TO{" "}
                      <ShoppingCartIcon
                        style={{ paddingLeft: "10px", color: "#6be909" }}
                      />
                    </Button>
                    <Button variant="outlined" size="small" color="primary">
                      Order Now
                    </Button>
                    <Grid item>
                      <Typography variant="button">${card.price}.00</Typography>{" "}
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <br />
          <div>
            <Pages
              itemsPerPage={itemsPerPage}
              totalItems={data.length}
              paginate={paginate}
            />
          </div>
        </Container>
      </main>
    </>
  );
}
