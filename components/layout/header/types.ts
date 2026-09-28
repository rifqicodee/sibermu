/** Tipe data ringan (serializable) yang dikirim dari server layout ke header client. */

export type HeaderFaculty = {
  id: string
  code?: string | null
  name: string
  accreditation?: string | null
  href: string
}

export type HeaderContact = {
  phone?: string | null
  whatsapp?: string | null
  email?: string | null
  address?: string | null
  mapsUrl?: string | null
}

export type HeaderStats = {
  employmentRate?: number | null
  partners?: number | null
  students?: number | null
}
