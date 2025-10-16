import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material"
import type { PriceItem } from "../../types/types"

type Props = { prices: PriceItem[] }

export default function ExchangeRateTable({ prices }: Props) {
  const sorted = [...prices].sort((a, b) => a.currency.localeCompare(b.currency))
  const symbols = sorted.map((p) => p.currency)
  const priceMap = Object.fromEntries(sorted.map((p) => [p.currency, p.price]))

  const getExchangeRate = (from: string, to: string) => {
    const a = priceMap[from]
    const b = priceMap[to]
    if (!a || !b) return "-"
    if (from === to) return "1.0000"
    return (b / a).toFixed(4)
  }

  return (
    <div className="mt-10 px-4 flex justify-center">
      <div>
        <h2 className="text-4xl font-bold text-center mb-8">Currency Exchange Table</h2>
        <div className="max-w-[90vw] md:max-w-[60vw] max-h-[500px] overflow-scroll">
          <TableContainer component={Paper} className="max-w-full overflow-x-auto">
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold bg-gray-100">From / To</TableCell>
                  {symbols.map((to) => (
                    <TableCell key={to} align="center" className="font-bold bg-gray-100 text-xs">
                      {to}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {symbols.map((from) => (
                  <TableRow key={from} hover>
                    <TableCell className="font-semibold bg-gray-50">{from}</TableCell>
                    {symbols.map((to) => (
                      <TableCell key={to} align="center" className="text-green-800">
                        {getExchangeRate(from, to)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  )
}
