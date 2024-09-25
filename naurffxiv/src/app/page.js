import react from "react";
import { Container } from "@mui/material";
import { UWU } from "./ultimates/uwu.js";
import {UCOB} from "./ultimates/ucob.js";


export default function Home() {
  return (
	<Container sx={{ height: "100vh"}}>
		<UCOB />
	</Container>
  );
}

