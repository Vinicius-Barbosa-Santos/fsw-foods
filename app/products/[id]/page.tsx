import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetails from "./_components/product-details";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-5 py-6">
      <div className="md:grid md:grid-cols-2 md:gap-6">
        {/* IMAGEM */}
        <ProductImage product={product} />

        {/* TITULO E PREÇO */}
        <ProductDetails product={product} complementaryProducts={juices} />
      </div>
    </div>
  );
};

export default ProductPage;
