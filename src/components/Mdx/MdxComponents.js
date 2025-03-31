import ImageModal from "./ImageModal";
import YouTube from "../Video/YouTube";
import TwitchClip from "../Video/TwitchClip";
import { CopyToClipboard } from './CopyToClipboard';
import TwitchVoD from "../Video/TwitchVoD";
import Streamable from "../Video/Streamable";
import Buff from "./Buff";
import UnderConstruction from "./UnderConstruction.js";
import Callout from "./Callout";
import Details from "./Details";
import GuidePhaseNavigation from "./GuidePhaseNavigation";

export default function MDXComponents(mdxDir) {
    // Hardcoded guide lists to avoid import problems
    // In a real app, you might want to move these to a separate file that's guaranteed to work with imports
    const dsrGuideList = [
      {
        "name": "Phase 1 - Adelphel, Grinnaux and Charibert",
        "link": "/ultimate/dsr/guide/p1",
      },
      {
        "name": "Phase 2 - King Thordan",
        "link": "/ultimate/dsr/guide/p2",
      },
      {
        "name": "Phase 3 - Nidhogg",
        "link": "/ultimate/dsr/guide/p3",
      },
      {
        "name": "Phase 4 - The Eyes & Intermission",
        "link": "/ultimate/dsr/guide/p4",
      },
      {
        "name": "Phase 5 - Dark King Thordan",
        "link": "/ultimate/dsr/guide/p5",
      },
      {
        "name": "Phase 6 - Nidhogg and Hraesvelgr",
        "link": "/ultimate/dsr/guide/p6",
      },
      {
        "name": "Phase 7 - Dragon-king Thordan",
        "link": "/ultimate/dsr/guide/p7",
      }
    ];

    return {
        a: (props) => {
            if (props.href.startsWith("http")) return <a target="_blank" {...props}/>
            return <a {...props}/>
        },
        h1: (props) => <h1 className="scroll-mt-20" {...props} />,
        img: (props) => <ImageModal {...props}/>,
        pre: (props) => <CopyToClipboard><pre {...props}></pre></CopyToClipboard>,
        ImageModal,
        YouTube,
        TwitchClip,
        TwitchVoD,
        Streamable,
        Buff: (props) => <Buff mdxDir={mdxDir} {...props}/>,
        UnderConstruction,
        Callout,
        Details,
        // Simple DSR Navigation component for MDX
        DSRNav: (props) => (
            <GuidePhaseNavigation
              phases={dsrGuideList}
              currentPath={props.currentPath || ''}
              title={props.title || "Dragonsong's Reprise - Guide Navigation"}
              defaultOpen={props.defaultOpen || false}
            />
        ),
        // Allow direct use of the navigation component
        GuidePhaseNavigation
    }
}