import React from "react";
import { Box, List, ListItem, ListItemText, Typography, Divider } from "@mui/material";

const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const SKILL_LABELS = {
  smithing: "Smithing",
  crafting: "Crafting",
  cooking: "Cooking",
  spellbinding: "Spellbinding",
  alchemy: "Alchemy",
  mining: "Mining",
  woodcutting: "Woodcutting",
  fishing: "Fishing",
  combat: "Combat",
};

const Totals = ({ priceTotals }) => {
  const skillsWithPrices = Object.keys(priceTotals).filter(
    (skill) => priceTotals[skill] && priceTotals[skill].length > 0
  );

  const grandTotal = skillsWithPrices.reduce((sum, skill) => {
    const skillTotal = priceTotals[skill].reduce((s, item) => s + item.total, 0);
    return sum + skillTotal;
  }, 0);

  if (skillsWithPrices.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Enter prices on any skill tab to see totals here.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {skillsWithPrices.map((skill) => {
        const items = priceTotals[skill];
        const skillTotal = items.reduce((s, item) => s + item.total, 0);
        return (
          <Box key={skill} sx={{ width: "100%", maxWidth: 500, marginBottom: 2 }}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              {SKILL_LABELS[skill] || skill}
            </Typography>
            <List dense={true}>
              {items.map((item) => (
                <ListItem key={item.name}>
                  <ListItemText
                    primary={`${item.name}: ${addCommas(item.quantity)} x ${addCommas(item.price)} = ${addCommas(item.total)}`}
                  />
                </ListItem>
              ))}
              <ListItem>
                <ListItemText primary={`Subtotal: ${addCommas(skillTotal)}`} />
              </ListItem>
            </List>
            <Divider />
          </Box>
        );
      })}

      <Box sx={{ marginTop: 2, marginBottom: 4 }}>
        <Typography variant="h5">Grand total: {addCommas(grandTotal)}</Typography>
      </Box>
    </Box>
  );
};

export default Totals;
