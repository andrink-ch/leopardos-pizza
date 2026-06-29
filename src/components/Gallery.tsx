const pizzas = [
  { name: "Margherita", tilt: "-2deg" },
  { name: "Diavola",    tilt: "1.5deg" },
  { name: "Pistacchio", tilt: "-1deg" },
  { name: "Marinara",   tilt: "2deg" },
  { name: "Funghi",     tilt: "-1.5deg" },
  { name: "Salsiccia",  tilt: "1deg" },
];

export default function Gallery() {
  return (
    <section id="galerie" className="bg-parchment py-[90px]">
      <div className="max-w-[1280px] mx-auto px-12">
        <div className="flex items-end gap-4 mb-[50px]">
          <h2 className="font-heading font-bold text-[48px] tracking-[-0.02em] m-0">
            Frisch aus dem Ofen
          </h2>
          <span
            className="font-script text-[26px] text-ember pb-[10px]"
            style={{ transform: "rotate(-2deg)" }}
          >
            unsere Lieblinge
          </span>
        </div>

        <div className="flex flex-wrap gap-[34px] justify-center">
          {pizzas.map((pizza) => (
            <div
              key={pizza.name}
              className="bg-white p-3 pb-2"
              style={{
                width: "362px",
                transform: `rotate(${pizza.tilt})`,
                boxShadow: "0 14px 30px -16px rgba(27,23,20,.4)",
              }}
            >
              <div
                className="h-[300px] flex items-center justify-center font-mono text-[11px] tracking-[.1em]"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, #E7DECB, #E7DECB 9px, #EFE8D8 9px, #EFE8D8 18px)",
                  color: "#9a8f7c",
                }}
              >
                [ foto {pizza.name.toLowerCase()} ]
              </div>
              <div className="font-script text-[30px] text-center py-[10px] pb-[6px] text-charcoal">
                {pizza.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
