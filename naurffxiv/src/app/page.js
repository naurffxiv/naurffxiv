import react from "react";
import { Container } from "@mui/material";
import DisplayUWU from "./uwu.js";


export default function Home() {
  return (
	<Container sx={{ height: "100vh"}}>
		<DisplayUWU />
	</Container>
  );
}
