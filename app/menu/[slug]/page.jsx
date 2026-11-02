import Header from "@/components/Header";
import ProductConfigurator from "@/components/ProductConfigurator";
import { menuItems } from "@/data/menu";
import { notFound } from "next/navigation";
export function generateStaticParams() { return menuItems.map(item => ({ slug: item.id })); }
export default async function ProductPage({ params }) {
  const { slug } = await params;
  const item = menuItems.find(product => product.id === slug);
  if (!item) notFound();
  return <main><Header/><ProductConfigurator item={item}/></main>;
}
