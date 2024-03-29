import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Footer = () => {
  return (
    <Box component="footer" sx={{ marginTop: 5, marginBottom: 2 }}>
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          component="p"
        >
          Made by:{" "}
          <Link
            color="inherit"
            href="https://discordapp.com/users/chends"
            rel="noopener"
            target="_blank"
          >
            chends
          </Link>
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          component="p"
        >
          Huge thanks to the contributor:{" "}
          <Link
            color="inherit"
            href="https://discordapp.com/users/kamal9365"
            rel="noopener"
            target="_blank"
          >
            kamal9365
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {"All data from "}
          <Link
            color="inherit"
            href="https://www.curseofaros.com/"
            rel="noopener"
            target="_blank"
          >
            Curse of Aros
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {"Feel free to donate here "}
          <Link
            color="inherit"
            href="https://www.patreon.com/CoACalculator"
            rel="noopener"
            target="_blank"
          >
            CoA Calculator Patreon
          </Link>{" "}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
