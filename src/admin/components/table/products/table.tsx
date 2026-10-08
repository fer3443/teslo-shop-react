import { tableFeatures, useTable } from '@tanstack/react-table';
import type { Product } from '@/interfaces/product.interface';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Columns } from './column';

const features = tableFeatures({})

export const ProductsTable = ({ products }: { products: Product[] }) => {
  const table = useTable({
    features,
    columns: Columns,
    data: products,
  })

  return (
    <Table className='bg-white mb-5 shadow-md rounded-xl'>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} colSpan={header.colSpan}>
                <span className="text-sm font-medium">
                  <table.FlexRender header={header} />
                </span>
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={Columns.length}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        ) : (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getAllCells().map((cell) => (
                <TableCell key={cell.id}>
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
