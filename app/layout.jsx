import "./globals.css";
import CartProviderShell from "@/components/CartProviderShell";
export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };
export const metadata = {
  title: "DUM & CO. | Awadhi comfort, delivered",
  description: "Slow-cooked biryani, smoky kebabs and timeless Awadhi comfort. Explore the DUM & CO. menu.",
  keywords: ["cloud kitchen", "biryani", "kebabs", "Lucknow food", "food delivery"],
  openGraph: { title: "DUM & CO. | Awadhi comfort, delivered", description: "A little dum. A lot of soul.", type: "website" }
};
export default function RootLayout({ children }) {
  return <html lang="en"><body><CartProviderShell>{children}</CartProviderShell></body></html>;
}
