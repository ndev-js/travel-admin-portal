import { useId, useState, type FormEvent } from 'react'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'

export interface LoginValues {
  email: string
  password: string
}

interface Props {
  onSubmit: (values: LoginValues) => void
}

type Errors = Partial<Record<keyof LoginValues, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate({ email, password }: LoginValues): Errors {
  const errors: Errors = {}
  if (!email) errors.email = 'Enter your email address.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email address.'
  if (!password) errors.password = 'Enter your password.'
  return errors
}

export function LoginForm({ onSubmit }: Props) {
  const id = useId()
  const [values, setValues] = useState<LoginValues>({ email: '', password: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [showPassword, setShowPassword] = useState(false)

  const setField = (field: keyof LoginValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    // Clear a field's error as soon as the user starts fixing it
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const submitted = { email: values.email.trim(), password: values.password }
    const nextErrors = validate(submitted)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    onSubmit(submitted)
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-email`} className="text-[13px] font-medium">
          Email
        </label>
        <InputGroup className="bg-card">
          <InputGroupAddon>
            <Mail />
          </InputGroupAddon>
          <InputGroupInput
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            autoFocus
            placeholder="admin@company.com"
            value={values.email}
            onChange={(e) => setField('email', e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
          />
        </InputGroup>
        {errors.email && (
          <p id={`${id}-email-error`} role="alert" className="text-[13px] text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-password`} className="text-[13px] font-medium">
          Password
        </label>
        <InputGroup className="bg-card">
          <InputGroupAddon>
            <Lock />
          </InputGroupAddon>
          <InputGroupInput
            id={`${id}-password`}
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter your password"
            value={values.password}
            onChange={(e) => setField('password', e.target.value)}
            aria-invalid={errors.password ? true : undefined}
            aria-describedby={errors.password ? `${id}-password-error` : undefined}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              className="rounded-md text-muted-foreground"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        {errors.password && (
          <p id={`${id}-password-error`} role="alert" className="text-[13px] text-destructive">
            {errors.password}
          </p>
        )}
      </div>

      <Button type="submit" className="mt-2 h-9 w-full">
        Sign in
      </Button>
    </form>
  )
}
