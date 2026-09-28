import type { Access, FieldAccess } from 'payload'

export type Role = 'admin' | 'editor' | 'author'

export const getRole = (user: unknown): Role | null => {
  if (!user || typeof user !== 'object') return null
  const role = (user as { role?: unknown }).role
  return typeof role === 'string' ? (role as Role) : null
}

export const isStaff = (user: unknown): boolean => getRole(user) !== null
export const isAdmin = (user: unknown): boolean => getRole(user) === 'admin'
export const isAdminOrEditor = (user: unknown): boolean => {
  const role = getRole(user)
  return role === 'admin' || role === 'editor'
}

/** Public read, staff write */
export const anyone: Access = () => true
export const staffOnly: Access = ({ req }) => isStaff(req.user)
export const adminOnly: Access = ({ req }) => isAdmin(req.user)
export const adminOrEditor: Access = ({ req }) => isAdminOrEditor(req.user)

/** Owner or admin can read */
export const ownerOrAdmin: Access = ({ req, id }) => {
  if (isAdmin(req.user)) return true
  if (!req.user) return false
  if (id === undefined) return { or: [{ user: { equals: req.user.id } }] }
  return true
}

export const fieldAdminOnly: FieldAccess = ({ req }) => isAdmin(req.user)
export const fieldAdminOrEditor: FieldAccess = ({ req }) => isAdminOrEditor(req.user)
export const fieldStaffRead: FieldAccess = ({ req }) => isStaff(req.user)
