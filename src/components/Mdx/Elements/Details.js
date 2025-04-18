function Details({ children, title }) {
  return (
    <details className="my-4">
      <summary>{title}</summary>

      <div className="p-2">{children}</div>
    </details>
  );
}

export default Details;
