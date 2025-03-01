import Link from "next/link"

import { cn } from "../../utils/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/calendar" className="text-sm font-medium transition-colors hover:text-primary">
        Calendar
      </Link>
      <Link
        href="/statistic"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Statistic
      </Link>
      <Link href="/employee" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Employee
      </Link>
      <Link href="/help" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Help
      </Link>
    </nav>
  )
}

