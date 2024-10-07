"use client";
import react, { useState } from "react";
import { Container } from "@mui/material";
import UWU from "./ultimates/uwu.js";
import UCOB from "./ultimates/ucob.js";
import TEA from "./ultimates/tea.js";
import DSR from "./ultimates/dsr.js";
import TOP from "./ultimates/top.js";


export default function Home() {
	const [fight, setFight] = useState('');

  return (
	<Container sx={{ height: "100vh"}}>
		{
			// todo: replace with actual homepage content
		}
		<div>
			<button onClick={() => setFight('UWU')}>UWU</button>
			<button onClick={() => setFight('UCOB')}>UCOB</button>
			<button onClick={() => setFight('TEA')}>TEA</button>
			<button onClick={() => setFight('DSR')}>DSR</button>
			<button onClick={() => setFight('TOP')}>TOP</button>
		</div>
		<div>
			{fight == "UWU" && <UWU/>}
			{fight == "UCOB" && <UCOB/> }
			{fight == "TEA" && <TEA/> }
			{fight == "DSR" && <DSR/> }
			{fight == "TOP" && <TOP/> }
		</div>
	</Container>
  );
}

