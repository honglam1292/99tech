type Props = { from: string; to: string }

export default function TransferSteps({ from, to }: Props) {
  const steps = [
    { title: "Enter your amount", description: "Simply enter the amount you want to convert." },
    { title: "Choose your currencies", description: "Select From in the first dropdown as the currency you want to convert from, and To in the second dropdown as the currency you want to receive" },
    { title: "You're done", description: `Our currency converter will show you the current ${from} to ${to} exchange rate.` },
  ]

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold px-2 text-center mb-10">
        How to convert from {from} to {to}
      </h2>
      <section className="bg-white rounded-xl shadow p-10 w-full max-w-[90vw] md:!max-w-4xl mx-auto text-black">
        <div className="grid grid-rows-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="bg-[#f3f5f2] rounded-2xl p-6 text-gray-900 shadow-sm">
              <div className="text-3xl font-bold mb-2">{i + 1}</div>
              <div className="text-lg font-semibold mb-2">{s.title}</div>
              <p className="text-sm text-gray-700">{s.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
