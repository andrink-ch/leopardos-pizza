import type { Product } from "@/lib/products";

interface Props {
  products: Product[];
}

const TILTS = ["-2deg", "1.5deg", "-1deg", "2deg", "-1.5deg", "1deg"];

export default function Gallery({ products }: Props) {
  return (
    <section id="galerie" className="bg-parchment py-14 md:py-[90px]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="flex flex-wrap items-end gap-3 mb-10 md:mb-[50px]">
          <h2 className="font-heading font-bold text-[36px] md:text-[48px] tracking-[-0.02em] m-0">
            Frisch aus dem Ofen
          </h2>
          <span
            className="font-script text-[22px] md:text-[26px] text-ember pb-2 md:pb-[10px]"
            style={{ transform: "rotate(-2deg)" }}
          >
            unsere Lieblinge
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-[34px] justify-items-center">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="bg-white p-3 pb-2 w-full max-w-[362px]"
              style={{
                transform: `rotate(${TILTS[i % TILTS.length]})`,
                boxShadow: "0 14px 30px -16px rgba(27,23,20,.4)",
              }}
            >
              <div
                className="h-[220px] md:h-[300px] flex items-center justify-center font-mono text-[11px] tracking-[.1em]"
                style={{
                  background: "repeating-linear-gradient(45deg, #E7DECB, #E7DECB 9px, #EFE8D8 9px, #EFE8D8 18px)",
                  color: "#9a8f7c",
                }}
              >
                [ foto {product.name.toLowerCase()} ]
              </div>
              <div className="font-script text-[28px] md:text-[30px] text-center py-[10px] pb-[6px] text-charcoal">
                {product.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
