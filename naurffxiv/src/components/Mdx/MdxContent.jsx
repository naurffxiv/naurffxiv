import "@/app/globals.css";
import MdxLayout from "./MdxLayout"
export default function MdxContent({ children }) {
  return (
    <MdxLayout>
        <div className="">
            <div className="">
                {children}
            </div>
        </div>
    </MdxLayout>
  );
}