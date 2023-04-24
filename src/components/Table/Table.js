import Button from "components/Button/Button";
import React from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGroupBy,
  useExpanded,
  useRowSelect,
} from "react-table";

// Create a default prop getter
const defaultPropGetter = () => ({});

// // Create an editable cell renderer
// const EditableCell = ({
//   value: initialValue,
//   row: { index },
//   column: { id },
//   updateMyData, // This is a custom function that we supplied to our table instance
//   editable,
// }) => {
//   // We need to keep and update the state of the cell normally
//   const [value, setValue] = React.useState(initialValue);

//   const onChange = (e) => {
//     setValue(e.target.value);
//   };

//   // We'll only update the external data when the input is blurred
//   const onBlur = () => {
//     updateMyData(index, id, value);
//   };

//   // If the initialValue is changed externall, sync it up with our state
//   React.useEffect(() => {
//     setValue(initialValue);
//   }, [initialValue]);

//   if (!editable) {
//     return `${initialValue}`;
//   }

//   return <input value={value} onChange={onChange} onBlur={onBlur} />;
// };

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
      style={{ borderBottom: "1px solid", backgroundColor: "#2d3542" }}
    />
  );
}

// // This is a custom filter UI for selecting
// // a unique option from a list
// function SelectColumnFilter({
//   column: { filterValue, setFilter, preFilteredRows, id },
// }) {
//   // Calculate the options for filtering
//   // using the preFilteredRows
//   const options = React.useMemo(() => {
//     const options = new Set();
//     preFilteredRows.forEach((row) => {
//       options.add(row.values[id]);
//     });
//     return [...options.values()];
//   }, [id, preFilteredRows]);

//   // Render a multi-select box
//   return (
//     <select
//       value={filterValue}
//       onChange={(e) => {
//         setFilter(e.target.value || undefined);
//       }}
//     >
//       <option value="">All</option>
//       {options.map((option, i) => (
//         <option key={i} value={option}>
//           {option}
//         </option>
//       ))}
//     </select>
//   );
// }

// // This is a custom filter UI that uses a
// // slider to set the filter value between a column's
// // min and max values
// function SliderColumnFilter({
//   column: { filterValue, setFilter, preFilteredRows, id },
// }) {
//   // Calculate the min and max
//   // using the preFilteredRows

//   const [min, max] = React.useMemo(() => {
//     let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
//     let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
//     preFilteredRows.forEach((row) => {
//       min = Math.min(row.values[id], min);
//       max = Math.max(row.values[id], max);
//     });
//     return [min, max];
//   }, [id, preFilteredRows]);

//   return (
//     <>
//       <input
//         type="range"
//         min={min}
//         max={max}
//         value={filterValue || min}
//         onChange={(e) => {
//           setFilter(parseInt(e.target.value, 10));
//         }}
//       />
//       <button onClick={() => setFilter(undefined)}>Off</button>
//     </>
//   );
// }

// // This is a custom UI for our 'between' or number range
// // filter. It uses two number boxes and filters rows to
// // ones that have values between the two
// function NumberRangeColumnFilter({
//   column: { filterValue = [], preFilteredRows, setFilter, id },
// }) {
//   const [min, max] = React.useMemo(() => {
//     let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
//     let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
//     preFilteredRows.forEach((row) => {
//       min = Math.min(row.values[id], min);
//       max = Math.max(row.values[id], max);
//     });
//     return [min, max];
//   }, [id, preFilteredRows]);

//   return (
//     <div
//       style={{
//         display: "flex",
//       }}
//     >
//       <input
//         value={filterValue[0] || ""}
//         type="number"
//         onChange={(e) => {
//           const val = e.target.value;
//           setFilter((old = []) => [
//             val ? parseInt(val, 10) : undefined,
//             old[1],
//           ]);
//         }}
//         placeholder={`Min (${min})`}
//         style={{
//           width: "70px",
//           marginRight: "0.5rem",
//         }}
//       />
//       to
//       <input
//         value={filterValue[1] || ""}
//         type="number"
//         onChange={(e) => {
//           const val = e.target.value;
//           setFilter((old = []) => [
//             old[0],
//             val ? parseInt(val, 10) : undefined,
//           ]);
//         }}
//         placeholder={`Max (${max})`}
//         style={{
//           width: "70px",
//           marginLeft: "0.5rem",
//         }}
//       />
//     </div>
//   );
// }

function Table({
  columns,
  data,
  updateMyData,
  skipReset,
  showSelectors = true,
  getCellProps = defaultPropGetter,
  getToggleRowSelectedProps = defaultPropGetter,
  getAllSelectedRowsProps = defaultPropGetter,
}) {
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
      // And also our default editable cell
      // Cell: EditableCell,
    }),
    [],
  );
  // Use the state and functions returned from useTable to build your UI

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {
      pageIndex,
      pageSize,
      // sortBy,
      // groupBy,
      // expanded,
      // filters,
      // selectedRowIds,
    },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // filterTypes,

      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
      // We also need to pass this so the page doesn't change
      // when we edit the data.
      autoResetPage: !skipReset,
      autoResetSelectedRows: !skipReset,
      disableMultiSort: true,
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    // Here we will use a plugin to add our selection column
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          showSelectors
            ? {
                id: "selection",
                // Make this column a groupByBoundary. This ensures that groupBy columns
                // are placed after it
                groupByBoundary: true,
                // The header can use the table's getToggleAllRowsSelectedProps method
                // to render a checkbox
                Header: ({ getToggleAllRowsSelectedProps }) => {
                  return (
                    <div>
                      <IndeterminateCheckbox
                        {...getToggleAllRowsSelectedProps([
                          getAllSelectedRowsProps(
                            getToggleAllRowsSelectedProps(),
                          ),
                        ])}
                      />
                    </div>
                  );
                },
                // The cell can use the individual row's getToggleRowSelectedProps method
                // to the render a checkbox
                Cell: ({ row }) => {
                  return (
                    <div>
                      <IndeterminateCheckbox
                        {...row.getToggleRowSelectedProps([
                          getToggleRowSelectedProps(row),
                        ])}
                      />
                    </div>
                  );
                },
              }
            : {},
          ...columns,
        ];
      });
    },
  );

  return (
    <div className="bg-white rounded-md w-full">
      <div className="tableWrap">
        {/* <div className=""> */}
        <table
          // className="manage-table resumes responsive-table"
          {...getTableProps()}
          className="table text-sm"
          style={{
            width: "-webkit-fill-available",
          }}
        >
          <thead className="bg-gray-800 text-gray-500">
            {headerGroups.map((headerGroup, i) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="align-middle bg-gray-800"
              >
                {headerGroup.headers.map((column) => {
                  // console.log(column);
                  return (
                    <th
                      // Return an array of prop objects and react-table will merge them appropriately
                      {...column.getHeaderProps([
                        {
                          className: column.className,
                          style: column.style,
                        },
                      ])}
                      // className="p-3 align-middle"
                      className="px-5 py-3 border-b-2 bg-gray-800 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                    >
                      <div>
                        {/* {column.canGroupBy ? (
                        // If the column can be grouped, let's add a toggle
                        <span {...column.getGroupByToggleProps()}>
                          {column.isGrouped ? "🛑 " : "👊 "}
                        </span>
                      ) : null} */}
                        <span {...column.getSortByToggleProps()}>
                          <div style={{ display: "flex" }}>
                            {column.render("Header")}
                            {/* Add a sort direction indicator */}
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                " 🔽"
                              ) : (
                                " 🔼"
                              )
                            ) : column.id === "btns" ||
                              column.id === "header" ||
                              column.id === "logo" ||
                              column.id === "selection" ||
                              column.id === "header_1" ||
                              column.id === "selection_placeholder_0" ? (
                              ""
                            ) : (
                              // : ""}
                              <svg
                                className="ml-1 h-5 w-5 fill-current"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M18 21l-4-4h3V7h-3l4-4 4 4h-3v10h3M2
                            19v-2h10v2M2 13v-2h7v2M2 7V5h4v2H2z"
                                ></path>
                              </svg>
                            )}
                          </div>
                        </span>
                      </div>
                      {/* Render the columns filter UI */}
                      <div>
                        {!column.hideFilter
                          ? column.canFilter
                            ? column.render("Filter")
                            : null
                          : null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, r) => {
              prepareRow(row);
              return (
                // Merge user row props in
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        // Return an array of prop objects and react-table will merge them appropriately
                        {...cell.getCellProps([
                          {
                            className: cell.column.className,
                            style: cell.column.style,
                          },
                          getCellProps(cell, row.cells),
                        ])}
                        className="p-1 align-middle text-gray-800"
                      >
                        {cell.isGrouped ? (
                          // If it's a grouped cell, add an expander and row count
                          <>
                            <span {...row.getToggleRowExpandedProps()}>
                              {row.isExpanded ? "👇" : "👉"}
                            </span>{" "}
                            {cell.render("Cell", { editable: false })} (
                            {row.subRows.length})
                          </>
                        ) : cell.isAggregated ? (
                          // If the cell is aggregated, use the Aggregated
                          // renderer for cell
                          cell.render("Aggregated")
                        ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                          // Otherwise, just render the regular cell
                          cell.render("Cell", { editable: true })
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        style={{
          margin: 0,
          padding: 10,
          display: "flex",
          lineHeight: "18px",
          alignItems: "center",
        }}
        className="pagination bg-gray-800 text-gray-500"
      >
        <Button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          title={`<<`}
          style={{
            padding: 1,
            margin: 2,
            height: "auto",
            background: "#575757",
          }}
        />
        <Button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          title={"<"}
          style={{
            padding: 1,
            margin: 2,
            height: "auto",
            background: "#575757",
          }}
        />
        <Button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          title={">"}
          style={{
            padding: 1,
            margin: 2,
            height: "auto",
            background: "#575757",
          }}
        />
        <Button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          title={">>"}
          style={{
            padding: 1,
            margin: 2,
            height: "auto",
            background: "#575757",
          }}
        />
        <span style={{ margin: 5 }} />
        <span>
          Page{" "}
          <strong style={{ color: "#fff" }}>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span style={{ margin: 5 }} />
        <span style={{ display: "flex" }}>
          | Go to page: <span style={{ margin: 5 }} />
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px", padding: " 0 10px" }}
          />
        </span>
        <span style={{ margin: 5 }} />
        <span>
          <select
            style={{
              display: "inherit",
              width: "auto",
            }}
            className={"bg-gray-800"}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </span>
      </div>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
              sortBy,
              groupBy,
              expanded: expanded,
              filters,
              selectedRowIds: selectedRowIds,
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </div>
  );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== "number";

// // This is a custom aggregator that
// // takes in an array of leaf values and
// // returns the rounded median
// function roundedMedian(leafValues) {
//   let min = leafValues[0] || 0;
//   let max = leafValues[0] || 0;

//   leafValues.forEach((value) => {
//     min = Math.min(min, value);
//     max = Math.max(max, value);
//   });

//   return Math.round((min + max) / 2);
// }

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  },
);
export default Table;
