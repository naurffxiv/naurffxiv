import ImageModal from "./ImageModal";
import YouTube from "../Video/YouTube";
import TwitchClip from "../Video/TwitchClip";
import { CopyToClipboard } from '@/components/Mdx/CopyToClipboard';
import TwitchVoD from "../Video/TwitchVoD";
import Streamable from "../Video/Streamable";

export const MDXComponents = { 
    h1: (props) => <h1 className="scroll-mt-20" {...props} />,
    img: (props) => <ImageModal {...props}/>,
    pre: (props) => <CopyToClipboard><pre {...props}></pre></CopyToClipboard>,
    ImageModal,
    YouTube,
    TwitchClip,
    TwitchVoD,
    Streamable,
}
