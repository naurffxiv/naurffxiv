import Banner from "../Elements/Banner";
import { Buff } from "../Elements/Buff/Buff";
import { BuffAppendix } from "../Elements/Buff/BuffAppendix";
import Callout from "../Elements/Callout";
import { CopyToClipboard } from "@/components/Mdx/Utils/CopyToClipboard";
import Details from "../Elements/Details";
import ImageModal from "../Utils/ImageModal";
import LastUpdated from "../Elements/LastUpdated";
import Streamable from "../Elements/Video/Streamable";
import TwitchClip from "../Elements/Video/TwitchClip";
import TwitchVoD from "../Elements/Video/TwitchVoD";
import UnderConstruction from "../Elements/UnderConstruction.js";
import YouTube from "../Elements/Video/YouTube";

export default function MDXComponents(mdxDir, lastUpdated) {
  // NB: We track the first H1 to ensure <LastUpdated /> only renders once,
  // right after the main page title (the first <h1> in the MDX file).
  // We don't want the "Last Updated" date showing up after every section title.
  let firstH1Rendered = false;

  return {
    a: (props) => {
      if (props.href.startsWith("http"))
        return <a target="_blank" {...props} />;
      return <a {...props} />;
    },
    h1: (props) => {
      const isFirst = !firstH1Rendered;
      if (isFirst) {
        firstH1Rendered = true;
      }
      return (
        <>
          <h1 className="scroll-mt-20" {...props} />
          {isFirst && <LastUpdated lastUpdated={lastUpdated} />}
        </>
      );
    },
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
    BuffAppendix: (props) => <BuffAppendix mdxDir={mdxDir} {...props} />,
    UnderConstruction,
    Callout,
    Details,
  };
}
