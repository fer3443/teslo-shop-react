import type { Product } from "@/interfaces/product.interface";
import { currencyFormatter } from "@/lib";
import { tableFeatures, type ColumnDef } from "@tanstack/react-table";
import { PencilIcon } from "lucide-react";
import { Link } from "react-router";

const features = tableFeatures({});

export const Columns: Array<ColumnDef<typeof features, Product>> = [
  {
    accessorKey: 'images', // accessorKey shorthand
    id: 'images',
    header: 'Imagen',
    cell: ({ row }) => {
      const image = row.original.images?.[0]
      return (
        <img
          src={(image || "/placeholder.svg") as string}
          alt="imagen producto"
          className="size-20 object-cover rounded-md"
        />
      )
    },
  },
  {
    accessorKey: 'title',
    header: 'Nombre',
    cell: ({ row }) => {
      return (<span className="w-48! truncate">{row?.original?.title || "-"}</span>)
    },
  },
  {
    accessorKey: 'price',
    header: 'Precio',
    cell: ({ row }) => {
      const price = currencyFormatter(row?.original?.price || 0)
      return (
        <span>{price}</span>
      )
    }
  },
  {
    accessorKey: 'gender',
    header: 'Categoria',
    cell: (row) => row.getValue()
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: (row) => row.getValue()
  },
  {
    accessorKey: 'sizes',
    header: 'Tallas',
    cell: ({row}) => row.original.sizes.join(',')
  },
  {
    accessorKey: 'id',
    header: 'Acciones',
    id: 'id',
    cell: ({row}) => {
      return (
        <div className="flex justify-center">
          <Link to={`/admin/products/${row?.original.id}`}>
            <PencilIcon className="size-4 text-blue-400" />
          </Link>
        </div>
      )
    }
  }
]