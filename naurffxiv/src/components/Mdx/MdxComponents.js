import YouTube from "../Video/YouTube";
import { CopyToClipboard } from '@/components/Mdx/CopyToClipboard';
import TwitchVoD from "../Video/TwitchVoD";

export const MDXComponents = { 
    h1: (props) => <h1 className="scroll-mt-20" {...props} />,
    h2: (props) => <section><h2 className="scroll-mt-20" {...props} /></section>,
    h3: (props) => <section><h3 className="scroll-mt-20" {...props} /></section>,
    pre: (props) => <CopyToClipboard><pre {...props}></pre></CopyToClipboard>,
    YouTube,
    TwitchVoD,
}
