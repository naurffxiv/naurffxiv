import Banner from "../Elements/Banner";
import Buff from "../Elements/Buff";
import Callout from "../Elements/Callout";
import { CopyToClipboard } from "@/components/Mdx/Utils/CopyToClipboard";
import Details from "../Elements/Details";
import ImageModal from "../Utils/ImageModal";
import Streamable from "../Elements/Video/Streamable";
import TwitchClip from "../Elements/Video/TwitchClip";
import TwitchVoD from "../Elements/Video/TwitchVoD";
import UnderConstruction from "../Elements/UnderConstruction.js";
import YouTube from "../Elements/Video/YouTube";

export default function MDXComponents(mdxDir) {
  return {
    a: (props) => {
      if (props.href.startsWith("http"))
        return <a target="_blank" {...props} />;
      return <a {...props} />;
    },
    h1: (props) => <h1 className="scroll-mt-20" {...props} />,
    img: (props) => <ImageModal {...props} />,
    pre: (props) => (
      <CopyToClipboard>
        <pre {...props}></pre>
      </CopyToClipboard>
    ),
    Banner,
    ImageModal,
    YouTube,
    TwitchClip,
    TwitchVoD,
    Streamable,
    Buff: (props) => <Buff mdxDir={mdxDir} {...props} />,
    UnderConstruction,
    Callout,
    Details,
  };
}
