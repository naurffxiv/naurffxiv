import { Collapse } from "@mui/material"
import { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function QuickLinksCollapsible({ defaultState = false, children, title }) {
    const [open, setOpen] = useState(defaultState); 
  return (
    <>
        <button onClick={() => setOpen(!open)}>
            <h3 className="mt-4 mb-2 ml-4">
                {title}
                <span className="ml-1">
                    <ArrowDropDownIcon className={`transition-all${open ? "" : " -rotate-90"}`}/>
                </span>
            </h3>
        </button>
        <Collapse in={open} timeout={150} easing={"cubic-bezier(0.4, 0, 0.2, 1)"} unmountOnExit>
            {children}
        </Collapse>
    </>
  )
}

export default QuickLinksCollapsible