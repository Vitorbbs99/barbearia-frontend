import Header from "./Header";
import MenuLateral from "./MenuLateral";
import PageTransition from "../components/PageTransition";

export default function LayoutPainel({ children }) {
  return (
    <div className="container">
        {/*Header */}
        <Header />
        {/* Menu lateral */}
        <MenuLateral />
        <PageTransition>
         <main className="content">{children}</main>
        </PageTransition>
    </div>
  )
}
