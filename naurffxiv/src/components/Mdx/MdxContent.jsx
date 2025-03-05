import "@/app/globals.css";
import MdxLayout from "./MdxLayout"
export default function MdxContent({ children }) {
  return (
    <MdxLayout>
        <div className="mt-10">
            <div className="max-w-[100ch] m-auto prose prose-invert">
                {children}
            </div>
        </div>
    </MdxLayout>
  );
}