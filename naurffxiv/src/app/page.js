import react from "react";
import { Container } from "@mui/material";
import NavBar from "./navigation.js";
import UWU from "./ultimates.js";




export default function Home() {
  return (
    <>
      <Container disableGutters maxWidth={false}>
        <NavBar />
      </Container>
      <Container sx={{ maxWidth: "10vh"}}>
        <UWU />
      </Container>
    </>
  );
}
