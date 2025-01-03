import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';

const DisplayTable = ({data, columns}) => {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="p-2">
            <table className='w-full'>
                <thead className='bg-black text-white'>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        <th>Sr.No</th>
                    {headerGroup.headers.map(header => (
                        <th key={header.id} className='border'>
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </th>
                    ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map((row, index) => (
                    <tr key={row.id}>
                        <td className='border px-2 text-center'>{index + 1}</td>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className='border px-2'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="h-4" />
        </div>
    );
}

export default DisplayTable;