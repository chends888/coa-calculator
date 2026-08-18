import React from "react";
import { Box, List, ListItem, ListItemText, Typography, Divider, TextField } from "@mui/material";
import { formatNumber as addCommas } from "../utils/formatNumber";

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
  // Owned amounts keyed by "skill:materialName", since the same material
  // name (e.g. "Salt") can appear under more than one skill and should be
  // tracked separately per skill.
  const [ownedAmounts, setOwnedAmounts] = React.useState({});

  const updateOwned = (key, value) => {
    setOwnedAmounts((prev) => ({ ...prev, [key]: value }));
  };

  const skillsWithPrices = Object.keys(priceTotals).filter(
    (skill) => priceTotals[skill] && priceTotals[skill].length > 0
  );

  const computeRemainingTotal = (skill, item) => {
    const key = `${skill}:${item.name}`;
    const owned = ownedAmounts[key] || 0;
    const remaining = Math.max(item.quantity - owned, 0);
    return Math.ceil(remaining * item.price);
  };

  const grandTotal = skillsWithPrices.reduce((sum, skill) => {
    const skillTotal = priceTotals[skill].reduce(
      (s, item) => s + computeRemainingTotal(skill, item),
      0
    );
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
        const skillTotal = items.reduce((s, item) => s + computeRemainingTotal(skill, item), 0);
        return (
          <Box key={skill} sx={{ width: "100%", maxWidth: 500, marginBottom: 2 }}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              {SKILL_LABELS[skill] || skill}
            </Typography>
            <List dense={true}>
              {items.map((item) => {
                const key = `${skill}:${item.name}`;
                const owned = ownedAmounts[key] || 0;
                const remaining = Math.max(item.quantity - owned, 0);
                return (
                  <ListItem
                    key={item.name}
                    sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1 }}
                  >
                    <ListItemText
                      sx={{ flex: "1 1 auto" }}
                      primary={`${item.name}: ${addCommas(remaining)} needed x ${addCommas(item.price)} = ${addCommas(computeRemainingTotal(skill, item))}`}
                    />
                    <TextField
                      label="Already owned"
                      size="small"
                      value={owned || ""}
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const sanitized = event.target.value.replace(/[^0-9]/g, "");
                        updateOwned(key, sanitized === "" ? 0 : parseInt(sanitized, 10));
                      }}
                      inputProps={{ inputMode: "numeric" }}
                      sx={{ width: "16ch" }}
                    />
                  </ListItem>
                );
              })}
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
