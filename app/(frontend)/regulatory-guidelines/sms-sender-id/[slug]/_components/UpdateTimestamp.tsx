interface UpdateTimestampProps {
  updatedAt: string
}

function formatDateDDMMYYYY(isoDate: string): string {
  const date = new Date(isoDate)
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()
  return `${day}.${month}.${year}`
}

export default function UpdateTimestamp({ updatedAt }: UpdateTimestampProps) {
  const formatted = formatDateDDMMYYYY(updatedAt)
  return (
    <p className="text-muted-foreground text-sm italic">
      Last updated on: {formatted}
    </p>
  )
}
