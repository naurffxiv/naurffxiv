import react from "react";

export function UCOB() {

    return (
        <>
            <div className="ultimate-header">
                <h1>The Unending Coil of Bahamut (Ultimate)</h1>
            </div>

            <div className="table-of-contents">
                <h2>Strats by Phase</h2>
                <h3>Phase 1: Twintania</h3>
                <ul>
                    <li>
                        <a href="https://raidplan.io/plan/9WEG4AEGVdru3hyF">Twintania Raidplan</a>
                    </li>
                </ul>
                <p>Neurolink Placement - Normal triangle: N, SW, SE (CCW, on 123 markers)</p>
                <p>Both tanks and 1 healer (discuss) stay out of first stack for LB cheese.</p>
                <p>Phys. rage always baits liquid hells, caster takes hatch if phys range is first hatch (<a href="https://raidplan.io/plan/19yavfslOUU0l1Gp">raidplan</a>).</p>
                <h3>Phase 2: Nael</h3>
                <ul>
                    <li><a href="https://raidplan.io/plan/DpoJr4oE_kGz_gRU">Nael Raidplan</a></li>
                </ul>
                <p>Party rotates CW around boss by default.</p>
                <p>Fire order: In {'>'} Out {'>'} In (Second fire tethered player out) {'>'} In</p>
                <p>Divebombs - <a href="https://raidplan.io/plan/vi2rSC6mwW_d_QJF">raidplan</a></p>
                <h3>Phase 3: Bahamut Prime</h3>
                <ul>
                    <li><a href="https://raidplan.io/plan/3zSKK0DXeJgCLadx">Quickmarch Raidplan</a> (Uptime) </li>
                    <li><a href="https://raidplan.io/plan/BJPnHRQMEsmOyapB">Blackfire Raidplan</a> - DPS CCW, Support CW</li>
                    <li><a href="https://raidplan.io/plan/-83d6AilbZGqba3j">Fellruin Raidplan</a> - Party neuro opposite Bahamut</li>
                    <li><a href="https://raidplan.io/plan/NGpZ9S-3kiLsDzAY">Heavensfall Raidplan</a> - R1 tower under Nael</li>
                    <li><a href="https://raidplan.io/plan/2wu2LOy8wKhG29Tr">Tenstrike Raidplan</a> - Jump to indicate you're covering hatch, 1 always safe for earthshakers</li>
                    <li><a href="https://raidplan.io/plan/iunTUxGNwjAGF_7K">Grand Octent Raidplan</a> - Tank LB3, if no tank LB3 bait Twin CCW (left) and stack CW of Twin (Right)</li>
                    <li><a href="https://raidplan.io/plan/AMEhnLbUmlTb7ij3">Adds Raidplan</a></li>
                </ul>
                <p>Discuss which boss you're taking (Default: MT Twin, OT Nael)</p>
                <p>Bosses between 1/3 markers, somewhat NE</p>
                <p>All stacks done in the center of the arena</p>
                <h3>Golden Bahamut</h3>
                <ul>
                    <li><a href="https://raidplan.io/plan/Y4WRFLhdHSQ7oLN_"></a></li>
                </ul>
                <p>Akh Morn order - Share {'>'} MT invuln {'>'} OT invuln {'>'} Share</p>
                <p>Shared busters are kitchen sinked with all available mits</p>
                <p>60s/90s CD AoE mit - either Morn Afahs 1/3/5 or 2/4</p>
                <p>2m CD AoE mit - either Morn Afahs 1/4 or 2/5</p>
                <p>Discuss with co-tank/melee/caster which Morn Afahs to mit</p>
                <p>No tank LBs in default mit plan unless in emergency (e.g. less than 8 people in a stack or invuln not up)</p>
            </div>

            <div className="resources">
                <h2>General Resources</h2>
                <ul>
                    <li><a href="https://docs.google.com/spreadsheets/d/1t4gHDNxppxK1rdYIjZyAEabNUREq5lK-KQLwuV3W77A/edit?gid=0#gid=0">Recommended Mitigation Sheet</a></li>
                    <li><a href="https://youtu.be/9DDTla_pbL0">Baiting liquid hells properly in Twin/Adds</a></li>
                    <li><a href="https://youtu.be/ZbrTfoIxRdE">Golden middle dodges</a></li>
                    <li><a href="https://imgur.com/a/lb-gen-FNTZDGV">LB cheese cheatsheet</a></li>
                    <li><a href="https://drive.google.com/file/d/1eNgGqA4VAPT0f3wwt37n2UHqrOF4kfuI/view">Heavensfall Solo Sim</a></li>
                </ul>
                <h3>Markers</h3>
                <ul>
                    <li>
                        <code lang="json">{`{"Name":"good aether markers","MapID":280,"A":{"X":20.986,"Y":0.0,"Z":-11.02,"ID":0,"Active":true},"B":{"X":9.315,"Y":0.0,"Z":21.971,"ID":1,"Active":true},"C":{"X":-19.999,"Y":0.0,"Z":11.772,"ID":2,"Active":true},"D":{"X":0.0,"Y":0.0,"Z":9.0,"ID":3,"Active":true},"One":{"X":0.0,"Y":0.0,"Z":-8.0,"ID":4,"Active":true},"Two":{"X":-8.0,"Y":0.0,"Z":5.0,"ID":5,"Active":true},"Three":{"X":8.0,"Y":0.0,"Z":5.0,"ID":6,"Active":true},"Four":{"X":0.0,"Y":0.0,"Z":0.0,"ID":7,"Active":true}}`}</code>
                    </li>
                    <li>
                        <code lang="json">{`{"Name":"good aether markers","MapID":280,"A":{"X":20.986,"Y":0.0,"Z":-11.02,"ID":0,"Active":true},"B":{"X":9.315,"Y":0.0,"Z":21.971,"ID":1,"Active":true},"C":{"X":-19.999,"Y":0.0,"Z":11.772,"ID":2,"Active":true},"D":{"X":0.0,"Y":0.0,"Z":9.0,"ID":3,"Active":true},"One":{"X":0.0,"Y":0.0,"Z":-8.0,"ID":4,"Active":true},"Two":{"X":-8.0,"Y":0.0,"Z":5.0,"ID":5,"Active":true},"Three":{"X":8.0,"Y":0.0,"Z":5.0,"ID":6,"Active":true},"Four":{"X":0.0,"Y":0.0,"Z":0.0,"ID":7,"Active":true}}`}</code>
                    </li>
                </ul>
            </div>

            <div className="setup">
                <h2>Pre-pull Setup</h2>
                <p>Two light parties in a line, designated as left or right.</p>
                <table>
                    <tr>
                        <td>L1</td>
                        <td>R1</td>
                        <td>Tanks</td>
                    </tr>
                    <tr>
                        <td>L2</td>
                        <td>R2</td>
                        <td>Healers</td>
                    </tr>
                    <tr>
                        <td>L3</td>
                        <td>R3</td>
                        <td>Melee</td>
                    </tr>
                    <tr>
                        <td>L4</td>
                        <td>R4</td>
                        <td>Ranged</td>
                    </tr>
                </table>
            </div>

            <div className="visual-guides">
                <h2>Visual Guides and POVs</h2>

                <h3>Tank</h3>
                <h4>Main Tank</h4>
                <ul>
                    <li><a href="https://www.twitch.tv/videos/2149278406">WAR as MT</a></li>
                </ul>

                <h4>Off Tank</h4>
                <ul>
                    <li><a href="https://youtu.be/vItzlrnxWmk">DRK as OT</a></li>
                    <li><a href="https://www.twitch.tv/videos/2149285445">GNB as OT</a></li>
                    <li><a href="https://www.twitch.tv/videos/2149285444">PLD as OT</a></li>
                </ul>

                <h3>Healer</h3>
                <h4>Regen</h4>
                <ul>
                    <li><a href="https://youtu.be/AsPmtKceRK8">WHM as L2</a></li>
                    <li><a href="https://www.youtube.com/watch?v=Dp57n8JKR2g">AST as Standard Pure</a></li>
                </ul>
                <h4>Shield</h4>
                <ul>
                    <li><a href="https://youtu.be/g32wYmFLBdY">SGE as Standard Shield</a></li>
                    <li><a href="https://www.twitch.tv/videos/2149317774">SGE as Standard Shield</a></li>
                    <li><a href="https://www.twitch.tv/videos/2149316281">SCH as Double Shield with LB Cheese</a></li>
                    <li><a href="https://www.twitch.tv/videos/2149314421">SCH as Standard Shield</a></li>
                </ul>

                <h3>DPS</h3>
                <h4>Melee</h4>
                <ul>
                    <li><a href="https://www.twitch.tv/videos/2151969303">DRG as R3</a></li>
                    <li><a href="https://youtu.be/9xU6oZZ3FSc">RPR as L3</a></li>
                </ul>
                <h4>Physical Ranged</h4>
                <ul>
                    <li><a href="https://youtu.be/jLjT5N-zZEw">DNC as R4</a></li>
                    <li><a href="https://www.twitch.tv/videos/2156088309">MCH as R4</a></li>
                    <li><a href="https://www.twitch.tv/videos/2149287702">BRD as R4</a></li>
                </ul>
                <h4>Caster</h4>
                <ul>
                    <li><a href="https://www.twitch.tv/videos/2149551673">SMN as Fake Melee L3</a></li>
                    <li><a href="https://youtu.be/GuYzjaZsjFU">RDM as L4</a></li>
                </ul>
            </div>
        </>
    )
}