// TODO Consolidate with PlotRender.
export default function deferRender(node, render) {
  let observer;
  let idling;

  function disconnect() {
    if (observer) observer.disconnect();
    if (idling) idling = void cancelIdleCallback(idling);
  }

  const rect = node.getBoundingClientRect();
  if (rect.bottom > 0 && rect.top < window.innerHeight) {
    render();
  } else {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          disconnect();
          render();
        }
      },
      {rootMargin: "100px"}
    );
    observer.observe(node);
    if (typeof requestIdleCallback === "function") {
      idling = requestIdleCallback(() => {
        disconnect();
        render();
      });
    }
  }

  return disconnect;
}
