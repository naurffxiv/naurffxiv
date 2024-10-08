import react from "react";

export default function TOP(props) {

    return(
        <>
            <div className="ultimate-header">
                <h1>The Omega Protocol (Ultimate)</h1>
                <p>
                    All strats found here are a part of the <a href="https://pastebin.com/PyBmi5N4" target="_blank">TOP Segz Bin</a>,
                    a pasting of a collection of strats which was organized by <a href="https://link.space/@sausoftheroll" target="_blank">@sausoftheroll</a>
                </p>
            </div>

            <div className="table-of-contents">
                <h2>Strats by Phase</h2>
                <h3>Phase 1: Omega (Beetle) - Evansith</h3>
                <ul>
                    <li><a href="https://ff14.toolboxgaming.space/?id=758088204654761&preview=1" target="_blank">Toolbox</a></li>
                    <li>Program Loop: Group 1 CCW from 4 Marker, Group 2 CW from 4 Marker, Flex Prio: T - M - R - H</li>
                    <li>Pantokrator: Group 1 SW, Group 2 NE, Flex Prio: T - M - R - H</li>
                </ul>
                <h3>Phase 2: Omega M & Omega F - Dylan</h3>
                <ul>
                    <li><a href="" target="_blank">Toolbox</a></li>
                    <li>Pre-position: M side: MT H1 M1 R1 | F side: OT H2 M2 R2</li>
                    <li>Mid Glitch positions: <pre>{`X | X
□ | □
O | O
△ | △`}</pre></li>
                    <li>Far Glitch Positions: <pre>{`X | △ 
□ | □
O | O
△ | X`}</pre></li>
                <li>Flex Priorities: Northernmost stack flexes if same side. East group flexes South if mid glitch</li>
                </ul>
                <h3>Phase 3: Final Omega - Dylan</h3>
                <ul>
                    <li><a href="https://ff14.toolboxgaming.space/?id=243183080764761&preview=1" target="_blank">Toolbox</a></li>
                    <li>For intermission: Healers Shield before spreading</li>
                    <li>For P3: Tank takes heavy auto-attacks, so tanks mit properly and healer take care of your MT</li>
                </ul>
                <h3>Phase 4: Reboot - Dylan</h3>
                <ul>
                    <li><a href="https://ff14.toolboxgaming.space/?id=243183080764761&preview=1" target="_blank">Toolbox</a></li>
                    <li>Flex Priorities: If stacks are same side, melee flexes</li>
                </ul>
                <h3>Phase 5: Dynamis Omega M & Dynamis Omega F - Saus</h3>
                <ul>
                    <li><a href="https://ff14.toolboxgaming.space/?id=732288275415761&preview=1" target="_blank">Delta Toolbox</a></li>
                    <li><a href="https://ff14.toolboxgaming.space/?id=107380954136761&preview=1" target="_blank">Sigma Toolbox</a></li>
                    <li>Close glitch: Stand in the middle of the tower</li>
                    <li>Far glitch: Stand on the outer edge of the tower as far as possible</li>
                    <li><a href="https://ff14.toolboxgaming.space/?id=107380954136761&preview=1" target="_blank">Omega Toolbox</a></li>
                </ul>
                <h3>Phase 6: Alpha Omega - Saus</h3>
                <ul>
                    <li><a href="https://ff14.toolboxgaming.space/?id=829484027197761&preview=1" target="_blank">Toolbox</a></li>
                </ul>
            </div>

            <div className="resources">
                <h2>General Resources</h2>
                <h3>Mitigation Sheets</h3>
                <ul>
                    <li><a href="https://docs.google.com/spreadsheets/d/1ROErvG1BhTuNvXqPGcR6ZyyhJ7uNTZdf2WzKyVj9hh4/edit?usp=sharing" target="_blank">Standard TOP Mitigation</a></li>
                    <li><a href="https://docs.google.com/document/d/18qXjlpCGSGlC3wV7J9kMXj6KhDK5hnxkHhLQd6WUdbI/edit?usp=sharing" target="_blank">Double Shield TOP Mitigation</a></li>
                </ul>
                <h3>Cheat Sheets & Images</h3>
                <ul>
                    <li><a href="https://raw.githubusercontent.com/naurffxiv/assets/main/Toolbox%20Resources/TOP/TOPCheatSheet.png" target="_blank">General TOP Cheat Sheet</a></li>
                    <li><a href="https://raw.githubusercontent.com/naurffxiv/assets/main/Toolbox%20Resources/TOP/SigmaTowers.png" target="_blank">Sigma Towers</a></li>
                </ul>
                <h3>Simulations</h3>
                <ul>
                    <li><a href="https://www.xivsim.com/top/" target="_blank">XIV Sim</a></li>
                    <li><a href="https://www.roblox.com/games/12341874643/TOP-P5-Trio-1-Delta-Simulator" target="_blank">Roblox TOP P5 Trio 1 (Delta) Simulator</a></li>
                    <li><a href="https://palmmy.itch.io/the-omega-protocol-solo-sim" target="_blank">TOP Solo Sim by Palmmy Palmmy</a></li>
                </ul>
                <h3>Waymarks</h3>
                <code lang="json">{`{"Name":"3rdRing-NE","MapID":908,"A":{"X":100.0,"Y":0.0,"Z":86.37,"ID":0,"Active":true},"B":{"X":113.63,"Y":0.0,"Z":100.0,"ID":1,"Active":true},"C":{"X":100.0,"Y":0.0,"Z":113.63,"ID":2,"Active":true},"D":{"X":86.37,"Y":0.0,"Z":100.0,"ID":3,"Active":true},"One":{"X":109.58,"Y":0.0,"Z":90.42,"ID":4,"Active":true},"Two":{"X":109.58,"Y":0.0,"Z":109.58,"ID":5,"Active":true},"Three":{"X":90.42,"Y":0.0,"Z":109.58,"ID":6,"Active":true},"Four":{"X":90.42,"Y":0.0,"Z":90.42,"ID":7,"Active":true}}`}</code>
                <h3>Helpful Macros</h3>

                <ul>
                    <li><a href="https://na.finalfantasyxiv.com/lodestone/character/32395309/blog/5397145/" target="_blank">P2 Party Synergy</a></li>
                    <li><a href="https://pastebin.com/4JgXYRUy" target="_blank">P5 Sigma Towers</a></li>
                </ul>
            </div>

            <div className="visual-guides">
                <h2>Visual Guides & POVs</h2>

                <h3>Tank</h3>
                <h4>Main Tank</h4>
                <h4>Off Tank</h4>
                <ul>
                    <li><a href="https://youtu.be/GMYBt4gwAS8" target="_blank">DRK as OT</a></li>
                    <li><a href="https://youtu.be/RRwEan9E8tI" target="_blank">PLD as OT</a></li>
                </ul>

                <h3>Healer</h3>
                <h4>Regen</h4>
                <ul>
                    <li><a href="https://www.twitch.tv/videos/2150367082" target="_blank">AST as Group 1</a></li>
                </ul>
                <h4>Shield</h4>
                <ul>
                    <li><a href="https://www.twitch.tv/videos/2150365092" target="_blank">SGE as Group 1</a></li>
                    <li><a href="https://www.twitch.tv/videos/2150371247" target="_blank">SCH as Group 2</a></li>
                </ul>

                <h3>DPS</h3>
                <h4>Melee</h4>
                <ul>
                    <li><a href="https://youtu.be/EB2WRAOAph0" target="_blank">DRG as M2</a></li>
                </ul>

                <h3>Hope Productions TOP Video Guides</h3>
                <ul>
                    <li><a href="https://youtube.com/playlist?list=PLixgV1VoA2xr87_QcWDMyzAzR88SwVtIK&si=nYM1QCQZ8EyXqcqA" target="_blank">The Omega Protocol Guides by Phase - Hope Production Playlist</a></li>
                    <li>
                        Warning: These strats differe slightly from the Segz Bun strats found in TOP strats.
                        Please read over the toolboxes and make note of the differences mentioned in this post.
                    </li>
                    <li>Phase 2 key differences: Conga Playstation and Positions / North flexes / East group South knockback</li>
                    <li>Phase 6 key differences: stack South for Wave Cannon</li>
                </ul>
            </div>
        </>
    )
}