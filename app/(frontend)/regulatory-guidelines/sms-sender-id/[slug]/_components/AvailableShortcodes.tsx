export default function AvailableShortcodes({ features }: { features: any }) {
    return (
        <div>
            <h2>Available Shortcodes</h2>
            <ul>
                <li>Dedicated Shortcodes: {features.dedicatedShortcodes ? 'Yes' : 'No'}</li>
                <li>Shared Shortcodes: {features.sharedShortcodes ? 'Yes' : 'No'}</li>
                <li>Longnumbers: {features.longnumbers ? 'Yes' : 'No'}</li>
            </ul>
        </div>
    )
}