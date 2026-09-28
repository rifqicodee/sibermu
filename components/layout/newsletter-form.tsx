'use client'

import { useState } from 'react'
import { Loader2, MailCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from 'cn'
import type { Dictionary } from '@/lib/i18n/messages'

type Status = 'idle' | 'loading' | 'success' | 'error'

type NewsletterFormProps = {
  dict: Dictionary
  className?: string
}

export function NewsletterForm({ dict, className }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('subscribe failed')
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={onSubmit} className={cn('flex w-full max-w-md flex-col gap-2', className)}>
      <div className="flex gap-2">
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') setStatus('idle')
          }}
          placeholder={dict.footer.newsletterPlaceholder}
          aria-label={dict.footer.newsletterPlaceholder}
          className="rounded-full border-white/10 bg-white/6 text-foreground placeholder:text-muted-foreground"
        />
        <Button type="submit" variant="blue" size="default" className="shrink-0 rounded-full px-5">
          {status === 'loading' ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          {status === 'loading' ? dict.footer.newsletterLoading : dict.footer.newsletterCta}
        </Button>
      </div>
      <p
        role="status"
        aria-live="polite"
        className={cn(
          'flex items-center gap-1.5 text-xs',
          status === 'success' && 'text-success',
          status === 'error' && 'text-destructive',
          status !== 'success' && status !== 'error' && 'text-muted-foreground',
        )}
      >
        {status === 'success' ? (
          <>
            <MailCheck className="size-3.5" aria-hidden="true" />
            {dict.footer.newsletterSuccess}
          </>
        ) : status === 'error' ? (
          dict.footer.newsletterError
        ) : (
          dict.footer.newsletterDesc
        )}
      </p>
    </form>
  )
}
