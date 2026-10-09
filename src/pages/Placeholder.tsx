import { Card } from '@/components/ui/card'

export function Placeholder({ title }: { title: string }) {
  return (
    <Card className="px-4 py-12 text-center">
      <h2 className="mb-1 font-semibold">{title}</h2>
      <p className="text-muted-foreground">This section isn’t built yet.</p>
    </Card>
  )
}
