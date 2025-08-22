import { 
  useReactTable, 
  getCoreRowModel, 
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import type { WeatherHistory } from "../types/weather";
import usePrefStore from "../store/prefStore";

export default function HistoryTable() {
  const { weatherHistory, clearHistory } = usePrefStore();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<WeatherHistory>[]>(() => [
    {
      header: "Date",
      accessorKey: "date",
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      header: "City",
      accessorKey: "city",
    },
    {
      header: "Temperature",
      accessorKey: "temp",
      cell: ({ getValue }) => `${Math.round(getValue() as number)}${usePrefStore.getState().getTemperatureUnit()}`,
    },
    // {
    //   header: "Description",
    //   accessorKey: "description",
    //   cell: ({ getValue }) => (
    //     <span className="capitalize">{getValue() as string}</span>
    //   ),
    // },
    // {
    //   header: "Humidity",
    //   accessorKey: "humidity",
    //   cell: ({ getValue }) => `${getValue()}%`,
    // },
    {
      header: "Humidity",
      accessorKey: "humidity",
      cell: ({ getValue }) => {
        const humidity = getValue() as number | undefined;
        return humidity != null ? `${humidity}%` : "N/A";
      },
    },
    {
      header: "Wind Speed",
      accessorKey: "windSpeed",
      cell: ({ getValue }) => `${getValue()} ${usePrefStore.getState().getWindSpeedUnit()}`,
    },
  ], []);

  const table = useReactTable({
    data: weatherHistory,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });

  if (weatherHistory.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <h3 className="text-xl font-bold mb-2">Weather History</h3>
        <p className="text-gray-500">No weather data history available yet.</p>
        <p className="text-sm text-gray-400 mt-2">
          Weather searches will appear here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
        <h3 className="text-xl font-bold">Weather History</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search history..."
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={clearHistory}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-200">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left px-4 py-3 font-medium text-gray-700 hover:bg-gray-50 cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center space-x-1">
                      <span>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </span>
                      <span className="text-gray-500">
                        {{
                          asc: "↑",
                          desc: "↓",
                        }[header.column.getIsSorted() as string] ?? "↕"}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b border-gray-100 hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-25"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-sm text-gray-900">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {table.getRowModel().rows.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No results found for "{globalFilter}"
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500 text-center">
        Showing {table.getRowModel().rows.length} of {weatherHistory.length} entries
      </div>
    </div>
  );
}