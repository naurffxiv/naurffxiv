import react from "react";
import { Container } from "@mui/material";
import NavBar from "./navigation.js";
import DisplayUWU from "./uwu.js";


export default function Home() {
  return (
	<>
	<Container sx={{ maxHeight: "10vh"}}>
		<NavBar />
	</Container>
	<Container sx={{ maxWidth: "10vh"}}>
		<DisplayUWU />
	</Container>
	</>
  );
}
