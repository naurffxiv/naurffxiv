import { useEffect } from "react";

// This component's purpose is to highlight whichever heading is currently scrolled to/visible in MDX pages

export default function Scroll() {
    var allHTags;
    function didThisIntersectionHappenAtTop(i) {
        return i.rootBounds.bottom - i.boundingClientRect.bottom > i.rootBounds.bottom / 2 ? true
     : false }
    
    function getPriorHeading(i) {
        if (allHTags == null) return -1;

        let index = 0;
        allHTags.forEach(e => {
            if (e === i.target) {return index;}
            index++;
        }); 
        
        return -1;
    }

    // Function that runs when the Intersection Observer fires
    function setCurrent(e) {
        var allSectionLinks = document.querySelectorAll(".toc-links");
        e.map(i => {
            let top = didThisIntersectionHappenAtTop(i);
            // Page just loaded ... probably and a heading is in view
            if (i.time < 250 && i.isIntersecting) {
                document.querySelector(`a[href="#${i.target.id}"]`).classList.add("toc-current");
                return
            } else if (i.time < 250) {
                // In this case page just loaded and no heading in view
                return;
            } else if (!top && i.isIntersecting === false) {
                // This section deals with scrolling up the page. First we find if the heading being scrolled off the bottom is the first H tag in source order.
                let indexOfThisHeading = getPriorHeading(i);
                if (indexOfThisHeading === -1) {
                    return
                }
                if (indexOfThisHeading === 0) {
                    // The first H tag just scrolled off the bottom of the viewport and it is the first H tag in source order
                    allSectionLinks.forEach(link => link.classList.remove("toc-current"));
                } else {
                    // An H tag scrolled off the bottom. It isn't the first so make the previous heading current
                    allSectionLinks.forEach(link => link.classList.remove("toc-current"));
                    document.querySelector(`a[href="#${allHtags[indexOfThisHeading - 1].id}"]`).classList.add("toc-current");
                }
            } else if (i.isIntersecting) {
                // For all other instances we want to make this one current and the others not current
                allSectionLinks.forEach(link => link.classList.remove("toc-current"));
                document.querySelector(`a[href="#${i.target.id}"]`).classList.add("toc-current");
            }
            
        })
    }
    
    var options = {
        root: null,
        rootMargin: "0px",
        threshold: [1],
    };
    
    useEffect(() => {
        var observeHtags = new IntersectionObserver(setCurrent,options);
        var headerTags = document.querySelectorAll("article h2,h3");
        headerTags.forEach(tag => {
            observeHtags.observe(tag);
        });
        
        window.document.addEventListener("beforeunload", () => {
            observer.disconnect();
        });
    }, []);
    
    return
}

