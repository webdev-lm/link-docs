import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function OperatorTable({ localOperators }: { localOperators: any }) {
    return (
        <div>
            <h2>Local Operators</h2>
            <div className="border border-gray-200 rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Operator</TableHead>
                        <TableHead>MNC</TableHead>  
                        <TableHead>Numeric ID</TableHead>
                        <TableHead>Alpha ID</TableHead>
                        <TableHead>Short Code</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {localOperators.map((operator: any) => (
                        <TableRow key={operator.operator}>
                            <TableCell>{operator.operator}</TableCell>
                            <TableCell>{operator.mnc}</TableCell>
                            <TableCell>{operator.numericId ? 'Yes' : 'No'}</TableCell>
                            <TableCell>{operator.alphaId ? 'Yes' : 'No'}</TableCell>
                            <TableCell>{operator.shortCode ? 'Yes' : 'No'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>

        </div>
    )
}