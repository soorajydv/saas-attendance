export interface CardData {
    title: string
    value: string
    change?: string
  }
  
  export interface ChartData {
    month: string
    attendance: number
    performance: number
  }
  
  export interface ActivityData {
    description: string
    time: string
  }
  
  export interface DashboardData {
    cards: CardData[]
    chartData: ChartData[]
    activities: ActivityData[]
  }
  
  