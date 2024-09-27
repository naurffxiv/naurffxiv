import react from "react";
import { Container } from "@mui/material";
import { UWU } from "./ultimates/uwu.js";
import {UCOB} from "./ultimates/ucob.js";
import { TEA } from "./ultimates/tea.js";
import { DSR } from "./ultimates/dsr.js";


export default function Home() {
  return (
	<Container sx={{ height: "100vh"}}>
		<DSR />
	</Container>
  );
}

