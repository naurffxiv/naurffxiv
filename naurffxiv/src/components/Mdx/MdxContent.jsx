import MdxLayout from "./MdxLayout"
export default function MdxContent({ children }) {
  return (
    <MdxLayout>
      <div className="max-w-[100ch] m-auto prose prose-invert">
          {children}
      </div>
    </MdxLayout>
  );
}