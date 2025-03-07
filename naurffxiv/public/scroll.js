const articleSections = document.querySelectorAll("article section");

const observer = new IntersectionObserver((entries) => {
  entries.map((entry) => {
    const heading = entry.target.querySelector("h2,h3,h4,h5");
    if (!heading) return;
    const id = heading.getAttribute("id");
    if (!id) return;
    const link = document.querySelector(`.toc-links a[href="#${id}"]`,);
    if (!link) return;

    const addRemove = entry.intersectionRatio > 0 ? "add" : "remove";
    console.log(addRemove)
    link.classList[addRemove]("text-blue-300", "dark:text-blue-400");
  });
});

for (const section of articleSections) {
  observer.observe(section);
}

window.document.addEventListener("beforeunload", () => {
  observer.disconnect();
});