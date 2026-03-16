import { SenderIdOverview } from './_components/SenderIdOverview'

export default async function SenderIdMain() {
  return (
    <div className="typo-app max-w-screen-lg mx-auto space-y-8">
      <h1>Sender ID</h1>
      <SenderIdOverview />
    </div>
  )
}