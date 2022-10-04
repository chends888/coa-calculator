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
          Bugs? Suggestions? DM me on Discord:{" "}
          <Link
            color="inherit"
            href="https://discordapp.com/users/chends#7176"
            rel="noopener"
            target="_blank"
          >
            chends#7176
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
            href="https://discordapp.com/users/KaMaL#9365"
            rel="noopener"
            target="_blank"
          >
            KaMaL#9365
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
      </Container>
    </Box>
  );
};

export default Footer;
