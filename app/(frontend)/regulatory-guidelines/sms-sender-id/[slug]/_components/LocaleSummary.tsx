import { Label } from "@/components/ui/label";

const Item = ({ label, value }: { label: string, value: string }) => {
    return (
        <li className=' items-center'>
            <Label className=''>{label}</Label>
            <p className="text-lg font-medium">{value}</p>
        </li>
    )
}

export default function LocaleSummary({ localeSummary }: { localeSummary: any }) {
    return (
        <div>
            <h2>Locale Summary</h2>
            <ul className='flex flex-wrap gap-8'>
                <Item label='Locale Name' value={localeSummary.locale} />
                <Item label='Country ISO' value={localeSummary.countryISO} />
                <Item label='Dialing Code' value={`+${localeSummary.dialingCode}`} />
                <Item label='MobileCountry Code' value={localeSummary.countryCode} />
            </ul>
        </div>
    )

}