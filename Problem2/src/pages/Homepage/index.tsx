import { useEffect, useMemo, useState } from "react"
import CurrencyInput from "../../components/CurrencyInput"
import ExchangeRateTable from "../../components/ExchangeRateTable"
import Header from "../../components/Header"
import TransferSteps from "../../components/TransferSteps"
import axiosInstance from "../../api/axiosInstance"
import axios from "axios"
import type { PriceItem } from "../../types/types"

export default function Homepage() {
  const [prices, setPrices] = useState<PriceItem[]>([])
  const [from, setFrom] = useState<string>("")
  const [to, setTo] = useState<string>("")
  const [amount, setAmount] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    let active = true
    const fetchData = async () => {
      setLoading(true)
      setError("")
      try {
        const res = await axiosInstance.get<PriceItem[]>("https://interview.switcheo.com/prices.json")
        const latest = new Map<string, PriceItem>()
        for (const item of res.data) {
          const ex = latest.get(item.currency)
          if (!ex || new Date(item.date).getTime() < new Date(item.date).getTime()) latest.set(item.currency, item)
        }
        const list = Array.from(latest.values()).filter(x => typeof x.price === "number" && isFinite(Number(x.price)))
        list.sort((a, b) => a.currency.localeCompare(b.currency))
        if (!active) return
        setPrices(list)
        if (list.length > 0) {
          const randomIndex = Math.floor(Math.random() * list.length)
          setFrom(list[randomIndex].currency)
          setTo(list[randomIndex]?.currency || list[0].currency)
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) setError(err.response?.data?.message || err.message || "Request failed")
        else setError("Unexpected error")
      } finally {
        if (active) setLoading(false)
      }
    }
    fetchData()
    return () => {
      active = false
    }
  }, [])

  const validAmount = useMemo(() => {
    const n = Number(amount)
    if (!isFinite(n) || n <= 0) return 0
    return n
  }, [amount])

  if (loading) {
    return (
      <div className="bg-[#0F2500] min-h-screen w-screen text-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center text-lg">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-[#0F2500] min-h-screen w-screen text-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center text-red-300">{error}</div>
      </div>
    )
  }

  return (
    <div className="bg-[#0F2500] min-h-screen w-screen text-white">
      <Header />
      <div className="h-28" />
      <CurrencyInput
        from={from}
        to={to}
        prices={prices}
        setFrom={setFrom}
        setTo={setTo}
        amount={validAmount}
        setAmount={setAmount}
      />
      <div className="h-28" />
      <ExchangeRateTable prices={prices} />
      <div className="h-32" />
      <TransferSteps from={from} to={to} />
      <div className="h-12" />
    </div>
  )
}
