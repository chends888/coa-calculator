import React, { useState } from "react";
import { Box, List, ListItem, ListItemText, Typography, Divider } from "@mui/material";
import Attribute from "../components/Attribute";
import LoadingIndicator from "../components/LoadingIndicator";
import useSkillData from "../hooks/useSkillData";
import { formatNumber as addCommas } from "../utils/formatNumber";

const GoldKey = () => {
  const { data: goldChestData, isLoading: goldChestLoading } = useSkillData("gold-chest");

  const [keysOwned, setKeysOwned] = useState(0);
  const [keyPrice, setKeyPrice] = useState(0);
  const [itemPrices, setItemPrices] = useState({});

  const updateItemPrice = (name, value) => {
    setItemPrices((prev) => ({ ...prev, [name]: value }));
  };

  if (goldChestLoading || !goldChestData) {
    return <LoadingIndicator text="Loading Gold Chest data..." />;
  }

  const rows = goldChestData.map((item) => {
    const expectedDrops = keysOwned * (item.probability / 100);
    const expectedQuantity = expectedDrops * item.amount;
    const price = itemPrices[item.name] || 0;
    const subtotal = Math.ceil(expectedQuantity * price);
    return { ...item, expectedQuantity, price, subtotal };
  });

  const grandTotal = rows.reduce((sum, row) => sum + row.subtotal, 0);
  const keyCost = keysOwned * (keyPrice || 0);
  const netProfit = grandTotal - keyCost;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginBottom: 2 }}>
        <Attribute
          maxValue={9999999999}
          attributeName="Gold Keys owned"
          value={keysOwned}
          updateAttribute={setKeysOwned}
          sx={{ justifyContent: "center", alignItems: "center" }}
        />
        <Attribute
          maxValue={9999999999}
          attributeName="Gold Key price"
          value={keyPrice}
          updateAttribute={setKeyPrice}
          sx={{ justifyContent: "center", alignItems: "center" }}
        />
      </Box>

      <Box sx={{ width: "100%", maxWidth: 500 }}>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Gold Chest contents
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginBottom: 1 }}>
          {goldChestData.map((item) => (
            <Attribute
              key={item.name}
              maxValue={9999999999}
              attributeName={`${item.name} price`}
              value={itemPrices[item.name] || 0}
              updateAttribute={(value) => updateItemPrice(item.name, value)}
              sx={{ justifyContent: "center", alignItems: "center" }}
            />
          ))}
        </Box>

        <List dense={true}>
          {rows.map((row) => (
            <ListItem key={row.name}>
              <ListItemText
                primary={`${row.name}: ${addCommas(Math.round(row.expectedQuantity))} expected x ${addCommas(row.price)} = ${addCommas(row.subtotal)}`}
                secondary={`${row.probability}% chance${row.amount > 1 ? `, ~${row.amount} per drop` : ""}`}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ marginY: 1 }} />

        <List dense={true}>
          <ListItem>
            <ListItemText primary={`Grand total: ${addCommas(grandTotal)}`} />
          </ListItem>
          {keyPrice > 0 && (
            <>
              <ListItem>
                <ListItemText primary={`Cost of ${addCommas(keysOwned)} keys: ${addCommas(keyCost)}`} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Net ${netProfit >= 0 ? "profit" : "loss"}: ${addCommas(Math.abs(netProfit))}`}
                />
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default GoldKey;
