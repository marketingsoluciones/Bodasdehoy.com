/**
 * Origen del producto Chat (Copilot) para enlaces de login/registro.
 * Debe coincidir con el subdominio configurado en Vercel para el whitelabel.
 */
export function getChatOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_CHAT
  if (typeof raw !== "string" || !raw.trim()) {
    return ""
  }
  return raw.replace(/\/+$/, "")
}

export function getChatLoginUrl(redirect: string, query?: "register"): string | null {
  const base = getChatOrigin()
  if (!base) {
    return null
  }
  const q = query === "register" ? "&q=register" : ""
  return `${base}/login?redirect=${redirect}${q}`
}
