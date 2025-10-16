// Moved getPriority() and constants outside to make them stable.

// Combined filter/sort/map inside one memoized block.

// Introduced Intl.NumberFormat for better locale-aware formatting.

// Simplified prop types (React.ComponentProps<'div'>).

// Cleaned JSX by preparing data ahead of time.

// Added proper fallbacks for missing price values.

// Removed redundant useMemo layers and ensured dependency correctness.

type WalletBalance = {
  currency: string
  amount: number
  blockchain: string
}

type PricesMap = Record<string, number>

type WalletRowProps = {
  className?: string
  amount: number
  usdValue: number
  formattedAmount: string
}

function WalletRow(props: WalletRowProps) {
  const { className, amount, usdValue, formattedAmount } = props
  return (
    <div className={className}>
      <div>{formattedAmount}</div>
      <div>{usdValue}</div>
      <div>{amount}</div>
    </div>
  )
}

// use div props instead of BoxProps since we render <div>
type WalletPageProps = React.ComponentProps<'div'>

// centralized blockchain priority map for better readability
const PRIORITY: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
}
const MIN_PRIORITY = -99

function getPriority(blockchain: string) {
  return PRIORITY[blockchain] ?? MIN_PRIORITY
}

// stubbed hooks for example completeness
function useWalletBalances(): WalletBalance[] {
  return []
}

function usePrices(): PricesMap {
  return {}
}

export default function WalletPage(props: WalletPageProps) {
  const { ...rest } = props
  const balances = useWalletBalances()
  const prices = usePrices()

  // memoize formatters once; avoid re-creating Intl instances per render
  const numberFormatter = useMemo(
    () =>
      new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    []
  )

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
      }),
    []
  )

  // filter, sort and format all in one memoized block
  const rows = useMemo(() => {
    // pre-compute priority to avoid calling getPriority repeatedly
    const withPriority = balances
      .map(b => ({ ...b, priority: getPriority(b.blockchain) }))
      .filter(b => b.priority > MIN_PRIORITY && b.amount > 0)

    // sort by priority descending
    withPriority.sort((a, b) => b.priority - a.priority)

    return withPriority.map(b => {
      const price = prices[b.currency] ?? 0
      const usdValueRaw = price * b.amount
      const usdValue = Number.isFinite(usdValueRaw) ? usdValueRaw : 0
      const formattedAmount = numberFormatter.format(b.amount)

      // use stable key based on currency + blockchain pair
      return (
        <WalletRow
          className="wallet-row"
          key={`${b.currency}-${b.blockchain}`}
          amount={b.amount}
          usdValue={usdValue}
          formattedAmount={formattedAmount}
        />
      )
    })
  }, [balances, prices, numberFormatter])

  // clean return; no inline logic
  return <div {...rest}>{rows}</div>
}
