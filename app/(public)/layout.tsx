import Footer from "../../components/footer"

export default function PublicLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="container-md">
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
  }