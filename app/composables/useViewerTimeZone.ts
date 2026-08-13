// The viewer's IANA timezone, made available during SSR via a cookie the browser writes.
// The value is deliberately taken from the cookie for the client's first render too, so
// it matches what the server used byte for byte.
const COOKIE_NAME = 'tz'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

const isValidTimeZone = (value: string | null | undefined): value is string => {
  if (!value) return false

  try {
    new Intl.DateTimeFormat('en-US', { timeZone: value })
    return true
  } catch {
    return false
  }
}

export const useViewerTimeZone = () => {
  const cookie = useCookie(COOKIE_NAME, {
    maxAge: COOKIE_MAX_AGE,
    sameSite: 'lax',
  })

  const timeZone = ref(isValidTimeZone(cookie.value) ? cookie.value : null)

  if (import.meta.server) {
    const vary = useResponseHeader('Vary')
    const existing = vary.value
      ?.toString()
      .split(',')
      .map((part: string) => part.trim())
      .filter(Boolean) ?? []

    if (!existing.some((part: string) => part.toLowerCase() === 'cookie')) {
      vary.value = [...existing, 'Cookie'].join(', ')
    }
  }

  onMounted(() => {
    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    if (!isValidTimeZone(browserTimeZone)) return

    // Assigning an unchanged value is a no-op for both, so a returning viewer whose zone
    // still matches the cookie neither re-renders nor rewrites the cookie.
    cookie.value = browserTimeZone
    timeZone.value = browserTimeZone
  })

  return timeZone
}
