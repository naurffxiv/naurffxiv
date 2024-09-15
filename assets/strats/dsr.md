# __Strats by Phase__
All strats found here are often referred to as APD (Aether PUG Discord) strats, the server before NAUR.
## P1: Vault Knights
### [Vault Knights Toolbox](https://ff14.toolboxgaming.space/?id=802461081524561&preview=1#1)
### Knockback lineup:
```
D △   T X   T □
D O         D O
D □   H X   H △
```
### Charibert:
H > M > R > T, alternate sides to drop puddles, starting with east
## P2: Thordan
### [Trio 1: Strength Toolbox](https://ff14.toolboxgaming.space/?id=226768720878561&preview=1) 
### [Trio 2: Brainsmort/Daylights/DRK relative Toolbox](https://ff14.toolboxgaming.space/?id=404791683683271&preview=1)
### [Trio 3 Meteors/Fire and Ice Toolbox](https://ff14.toolboxgaming.space/?id=226768720878561&preview=1#20)
## P3: Nidstinien
### [Nidstinien Toolbox](https://ff14.toolboxgaming.space/?id=267799249146271&preview=1)
- Westhogg (Arrows always face West)
- Tanks and melees adjust enumerations
## P4: The Eyes
### [The Eyes Toolbox](https://ff14.toolboxgaming.space/?id=613699253336171&preview=1)
- G1 NW/CCW, G2 NE/CW (3rd dive swaps use prio from their dive, so clockwise-most first dive takes clockwise-most third dive)
### [Intermission Toolbox](https://ff14.toolboxgaming.space/?id=999851866521561&preview=1)

Slide 16 (same as P1)

H > M > R > T

Tank LB as soon as Haurchefant appears
## P5: Thordan Reprise
### [Wrath Toolbox](https://ff14.toolboxgaming.space/?id=514795714993271&preview=1)
### [DOTH Toolbox](https://ff14.toolboxgaming.space/?id=414790163993271&preview=1)
- WAR is relative North
- Inner Dooms nw/ne, outer dooms e/w
- Outer dooms stay out to bait O after dodging quakes.
- NW/NE dooms anchor SE/SW.
- □ and △ non-dooms adjust to their partner. X adjust on the fly.
- Caster LB true north
### [DOTH Quake Dodge Image](https://github.com/naurffxiv/assets/blob/main/Toolbox%20Resources/DSR/DOTHQuakeDodges.png?raw=true)
## P6: Double Dragon
### [Double Dragon Toolbox](https://ff14.toolboxgaming.space/?id=426762112878561&preview=1)
### [Static WB2 Positions Image](https://github.com/naurffxiv/assets/blob/main/Toolbox%20Resources/DSR/StaticWB2Positions.png?raw=true)
- G1 North/Nid, G2 South/Hrae
- Rot Passes: Random DPS > Tank 1 > Tank 2 > Melee > Caster
- Tank Rot Prio (or who takes first tank pass since rot applies healing debuff): WAR>GNB>>>>PLD>DRK
- If using AM for wroth, chains go to the wall and Red Ignores go closer to the middle (both under Hrae)
- WB2 in the toolbox is outdated as static WB2 is now used (see image below)
- Melee tethers in WB2 will not fully stretch, they will still live
## P7: Dragon-King Thordan
### [Dragon-King Thordan Toolbox](https://ff14.toolboxgaming.space/?id=448767858029561&preview=1)
-MRH trinities, G1 (Numbers) then G2 (Letters)
- 3-3-2 stacks: G1 NW, G2 NE, tanks south
- 6-1-1 stacks: G1 and G2 NW, Kitchen Sinking Tank NE, Invulning Tank south
- Ignore Slides 33/34 (Slide 34 shows party positioning for 611 AMs however)
# __General Resources__
## Mit Sheets
### [NAUR Mitigation Sheet](https://docs.google.com/spreadsheets/d/1YJX933Fe6MeNv06QVQfRUI3oJVfCvm4OqOyLCSjcAJk/edit?usp=sharing )
### [Double Shield Mitigation Sheet](https://docs.google.com/document/d/18i2ElKFtkO4c1MLIUP-hY-YXNLa4iTi8jIlrLF2dMb8/edit)
### [DPS Mitigation Sheet](https://docs.google.com/spreadsheets/d/1o3H2j46Q5ZVKB6OxhOO8__DV2zRues1etuOabxlJA_8/edit#gid=171570300)
## DSR Cheat Sheets / Images
### [Static WB2 Positions](https://raw.githubusercontent.com/naurffxiv/assets/main/Toolbox%20Resources/DSR/StaticWB2Positions.png)
### [DOTH Movement](https://raw.githubusercontent.com/naurffxiv/assets/main/Toolbox%20Resources/DSR/DOTHQuakeDodges.png)
### [Exaflare Dodges](https://raw.githubusercontent.com/naurffxiv/assets/main/Toolbox%20Resources/DSR/DSRExaflareMovement.png)
##  DSR Simulations
### [XIV Sim](https://www.xivsim.com/dru/)
### [Exaflare Helper](https://caffinate.itch.io/exaflares)
### [Solo sim for Phase 3, Wrath, Doth, Double Dragons, Exaflares](https://github.com/WCGH/Dragonsong-Sim/releases)
## Helpful Macros
### P1  Setup Macro
Discord breaks the macro. See this post to get it: [ Vault Knights PlayStation Macro](
https://na.finalfantasyxiv.com/lodestone/character/27408312/blog/5009018/)

This is also the orientation of markers you'll use in P5 PlayStation 2. It looks like this in-game:

```
D △   T X   T □
D O         D O
D □   H X   H △
```

### Meteor Dodge Macro
Spam this to perform the cursed four hour meteor dodge. 

```
/mlock
/merror off
/automove on <wait.1>
/automove off
/echo
/echo
/echo
/echo
/echo
/echo
/echo
/echo
/echo
/echo
/echo
```

### P5 Limit Break Macro
You can use this macro to limit break without facing your target; as a phys range with proper positioning, this will allow you to limit break four meteors instead of three.

```
/mlock
/macroicon "Limit Break"
/autofacetarget off
/ac "Limit Break"
/autofacetarget on
```
### P6 Wroth Flames Macros
The following spread/stack/no debuff macros are for use in Wroth Flames. These macros are not compatible with automarker, and rely on each player pressing the correct one when debuffs go out.

*Spread*
Click this if you receive a spread to indicate your spread order.
```
/mk attack <me> <wait.25>
/mk clear <me>
/micon attack enemysign
```

*Stack*
Click this if you receive a stack to indicate you need to be stacked with. Aim for the ignore marker with the same number as you (1 with 1, 2 with 2).
```
/mk bind <me> <wait.25>
/mk clear <me>
/micon bind enemysign
```

*No Debuff*
Click this if you receive no debuff. You should stand on the same number bind as you have (1 with 1, 2 with 2).
```
/mk ignore <me> <wait.25>
/mk clear <me>
/micon ignore enemysign
```
### [6-1-1 Mit Plan Macros](https://pastebin.com/2dHaS4dh)
**Transition, every Akh Morn, and every Gigaflare require Kerachole/Sacred Soil.** The correct timing for an Akh Morn kera/SS is immediately after the second trinity in exaflares; this will ensure it catches all of akh morn and will be up for the subsequent giggleflare.
### [3-3-2 Mit Plans Macros](https://pastebin.com/Dq01vvZ4)
**Transition, every Akh Morn, and every Gigaflare require Kerachole/Sacred Soil.** The correct timing for an Akh Morn kera/SS is immediately after the second trinity in exaflares; this will ensure it catches all of akh morn and will be up for the subsequent giggleflare.
# __Visual Guides and POVs__
## **Tank**
### Main Tank
[Warrior as MT](<https://www.twitch.tv/solarazyre/v/2154690801>)
[Paladin as MT](<https://www.twitch.tv/solarazyre/v/2154688818>)
### Off-Tank
[Dark Knight as OT](<https://youtu.be/zZ1z0_oPpYA>)
[Gunbreaker as OT](<https://www.twitch.tv/videos/2166633612##>)
## Healer
### Regen
[White Mage as Healer 1](<https://www.twitch.tv/videos/1885855482>)
[Astrologian as Healer 1](<https://www.twitch.tv/videos/2150374154>)
### Shield
[Sage as Healer 2](<https://www.twitch.tv/videos/2177826051>)
[Scholar as Healer 2](<https://www.youtube.com/watch?v=X0d9bbmT4Ao>)
## DPS
###  Melee
[Samurai as Melee 1](<https://youtu.be/4_gMRbzCGzw>)
[Monk as Melee 1](<https://www.youtube.com/watch?v=7MmGdQiRkv8>)
[Ninja as Melee 1](<https://www.youtube.com/watch?v=W779xZxFmmU>)
[Dragoon as Melee 2](<https://www.twitch.tv/videos/2167957260>)
### Phys Ranged
[Bard as Ranged 1](<https://www.youtube.com/watch?v=tCIw8Gq3Cq4>)
[Dancer as Ranged 1](<https://www.youtube.com/watch?v=GbjfNPtPzBg>)
[Machinist as Ranged 1](<https://www.youtube.com/watch?v=OiXDn8N-Qq0>)
### Caster
[Red Mage as Group 2](<https://www.twitch.tv/videos/2150363185>)
[Black Mage as Group 2](<https://www.twitch.tv/videos/2157013665>)
### Toolbox POV
[APD Toolbox POV](<https://youtu.be/xQlthZbjhXg>)
