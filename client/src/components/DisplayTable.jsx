import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';

const DisplayTable = ({data, columns}) => {

    if (!data || data.length === 0) {
        return;
    }

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="md:px-2 mt-2 relative">
            <div className='bg-blue-50 w-full h-7 fixed top-40 lg:top-32 z-10'/>
            <table className='w-full relative'>
                <thead className='bg-black text-white sticky top-[175px] lg:top-[142px] z-20'>
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
                        <td className='border border-gray-300 px-2 text-center'>{index + 1}</td>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className='border border-gray-300 px-2'>
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