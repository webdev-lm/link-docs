export default function SenderIdRegulations({ regulatoryRequirements }: { regulatoryRequirements: any }) {
    const regStrings = {
        noReg: 'No registration is required or possible towards this destination.',
        optReg: 'Optional registration is possible towards this destination.',
        mandReg: 'Mandatory registration is required towards this destination.'
    }

    const regClass = {
        noReg: 'border-gray-200 bg-gray-100',
        optReg: 'border-yellow-200 bg-yellow-100',
        mandReg: 'border-red-200 bg-red-100',
    }
    return (
        <div>
            <h2>Sender Id Requirements</h2>
            <p className={`p-4 border border-gray-200 rounded-md ${regClass[regulatoryRequirements.requirementsSelection as keyof typeof regClass]}`}>{regulatoryRequirements.requirementsSelection ? regStrings[regulatoryRequirements.requirementsSelection as keyof typeof regStrings] : 'No registration requirement selection'}</p>
        </div>
    )
}