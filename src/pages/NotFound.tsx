import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DEFAULT_AUTHENTICATED_PATH } from '../routes/paths'

export function NotFound() {
  return (
    <Card className="px-4 py-12 text-center">
      <h2 className="mb-1 font-semibold">Page not found</h2>
      <p className="mb-4 text-muted-foreground">The page you’re looking for doesn’t exist.</p>
      <div>
        <Button asChild variant="outline">
          <Link to={DEFAULT_AUTHENTICATED_PATH}>Back to overview</Link>
        </Button>
      </div>
    </Card>
  )
}
