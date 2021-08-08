export type Result<T, U = string> = { ok: true, data: T } | { ok: false, error: U }
