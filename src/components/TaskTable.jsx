import { Box } from "@chakra-ui/react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import DATA from "../data";
import { useState } from "react";
import EditableCell from "./EditableCell";

const columns = [
  {
    accessorKey:'task',
    header:'Task',
    size: 225,
    cell: EditableCell
  },
  {
    accessorKey:'status',
    header:'Status',
    cell: (props) => <p>{props.getValue()?.name}</p>
  },
  {
    accessorKey:'due',
    header:'Due',
    cell: (props) => <p>{props.getValue()?.toLocaleTimeString()}</p>
  },
  {
    accessorKey:'notes',
    header:'Notes',
    cell: (props) => <p>{props.getValue()}</p>
  },
]

const TaskTable = () => {
  const [data, setdata] = useState(DATA)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel:getCoreRowModel(),
    columnResizeMode:"onChange",
  });
  console.log(table.getHeaderGroups())
  return (
    <Box>
      <Box className="table" w={table.getTotalSize()}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box className="th" key={header.id} w={header.getSize()}>
                {header.column.columnDef.header}
                <Box 
                  onMouseDown={
                    header.getResizeHandler()
                  }
                  onTouchStart={header.getResizeHandler()}
                  className={
                  `resizer ${
                    header.column.getIsResizing() ? 'isResizing' : ""
                  }`}
                />
              </Box>
            ))}
          </Box>
        ))}
        {table.getRowModel().rows.map(row => (
            <Box className="tr" key={row.id}>
              {row.getVisibleCells().map(cell => (
                <Box className="td" key={cell.id} w={cell.column.getSize()}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Box>
              ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default TaskTable;
