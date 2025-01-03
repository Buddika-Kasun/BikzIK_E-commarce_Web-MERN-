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
        <div className="px-2 mt-2 max-h-[64vh] overflow-auto relative">
            <table className='w-full relative'>
                <thead className='bg-black text-white sticky top-[-1px]'>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        <th className='border'>Sr.No</th>
                    {headerGroup.headers.map(header => (
                        <th key={header.id} className='border'>
                        {/* whitespace-nowrap */}
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
                        {/* whitespace-nowrap */}
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