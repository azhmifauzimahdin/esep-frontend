import { FC, ReactElement, useEffect, useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactPaginate from "react-paginate";
import { Button, Input, Select } from "..";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export interface TableColumn<T = any> {
  title: string;
  dataIndex?: keyof T;
  dataIndex1?: keyof T;
  render?: (data: T) => ReactElement;
  sort?: keyof T;
  sort1?: keyof T;
  wrap?: boolean;
  width?: string;
}

interface InputProps<T = any> {
  columns: TableColumn[];
  data: T[];
  loading?: boolean;
  pathAddData?: string;
  search?: boolean;
  defaultSort?: string;
}

const Table: FC<InputProps> = (props) => {
  const { columns, data, loading, pathAddData, search, defaultSort } = props;
  const [tableData, setTableData] = useState<any[][]>([]);
  const [tableCurrentPage, setTableCurrentPage] = useState<number>(0);
  const [tablePerPage, setTablePerPage] = useState<number>(10);
  const [sortDireaction, setSortDirection] = useState<"asc" | "desc" | "">("");
  const [sortColumn, setSortColumn] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    initiateTable([...data]);
    if (defaultSort) sort("desc", defaultSort, "");
  }, [data, tablePerPage]);

  const initiateTable = (data: any[]) => {
    const baseData = data;
    const result: any[][] = [];
    while (baseData.length > 0) {
      result.push(baseData.splice(0, tablePerPage));
    }
    setTableData(result);
  };

  const searchData = (seacrhText: string) => {
    const result = searching(data, seacrhText);
    initiateTable(result);
  };

  const searching = (data: any[], seacrhText: string) => {
    const newDatas = data.map((data) => JSON.stringify(data));
    const filteredDatas = newDatas.filter((data) =>
      data.toLowerCase().includes(seacrhText.toLowerCase())
    );
    const normalizeDatas = filteredDatas.map((data) => JSON.parse(data));

    return normalizeDatas;
  };

  const sort = (direction: "asc" | "desc", property: any, property1: any) => {
    setSortDirection(direction);
    setSortColumn(property);
    const baseDatas = [...data];
    const sortedDatas = baseDatas.sort((a, b) => {
      if (property1) {
        if (direction === "asc")
          return a[property][property1] > b[property][property1] ? 1 : -1;
        return a[property][property1] < b[property][property1] ? 1 : -1;
      } else {
        if (direction === "asc") return a[property] > b[property] ? 1 : -1;
        return a[property] < b[property] ? 1 : -1;
      }
    });

    initiateTable(sortedDatas);
  };

  const ammontPerpage: any[] = [
    { label: "10 / page", value: 10 },
    { label: "25 / page", value: 25 },
    { label: "50 / page", value: 50 },
    { label: "100 / page", value: 100 },
  ];

  return (
    <div id="table" className="w-full">
      <div
        className={`flex flex-col md:flex-row justify-between gap-3 ${
          loading ? "mb-4" : "mb-1"
        }`}
      >
        <div>
          {pathAddData ? (
            <Button
              type="button"
              color="primary"
              className="px-3"
              onClick={() => navigate(pathAddData)}
              loadingRender={loading}
            >
              Tambah Data
            </Button>
          ) : null}
        </div>
        {search ? (
          <Input
            id="search"
            type="search"
            width="w-48"
            onChange={(e) => {
              searchData(e.target.value);
              setSearchValue(e.target.value);
            }}
            value={searchValue}
            placeholder="Cari"
            loadingRender={loading}
          />
        ) : null}
      </div>
      <div className="relative overflow-x-auto hd-scroll shadow-sm">
        <table className="w-full text-left rtl:text-right text-gray-500 overflow-hidden">
          <thead className="text-xs text-gray-700 uppercase bg-slate-100">
            {loading ? (
              <>
                <tr>
                  {columns.map((_, index) => (
                    <th key={index}>
                      <Skeleton height={20} />
                    </th>
                  ))}
                  <th>
                    <Skeleton height={20} />
                  </th>
                </tr>
              </>
            ) : (
              <tr>
                <th className="w-6">
                  <span className="flex items-center mb-0.5">NO</span>
                </th>
                {columns.map((column, index) => {
                  return (
                    <th
                      key={index}
                      className={`border-s border-slate-200 ${column.width}`}
                    >
                      <span className="flex justify-between items-center my-0.5">
                        {column.title}
                        {column.sort ? (
                          <div>
                            <MdArrowDropUp
                              onClick={() =>
                                sort("asc", column.sort, column.sort1)
                              }
                              className={`-mb-2.5 ${
                                column.sort === sortColumn &&
                                sortDireaction === "asc"
                                  ? "text-green"
                                  : "text-slate-500"
                              } hover:text-green text-base`}
                              cursor="pointer"
                            />
                            <MdArrowDropDown
                              onClick={() =>
                                sort("desc", column.sort, column.sort1)
                              }
                              className={`${
                                column.sort === sortColumn &&
                                sortDireaction === "desc"
                                  ? "text-green"
                                  : "text-slate-500"
                              } hover:text-green text-base`}
                              cursor="pointer"
                            />
                          </div>
                        ) : null}
                      </span>
                    </th>
                  );
                })}
              </tr>
            )}
          </thead>
          <tbody className="relative">
            {loading ? (
              <>
                {[...Array(5)].map((_, index) => (
                  <tr key={index}>
                    {columns.map((column) => (
                      <td key={column.title}>
                        <Skeleton />
                      </td>
                    ))}
                    <td>
                      <Skeleton />
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <>
                {tableData.length > 0 ? (
                  tableData[tableCurrentPage].map((d, index) => {
                    return (
                      <tr
                        key={index}
                        className="odd:bg-white even:bg-slate-50 border-b border-slate-200"
                      >
                        <td>{index + 1}.</td>
                        {columns.map((column, index) => {
                          let renderedContent;
                          if (column.dataIndex1) {
                            renderedContent = column.dataIndex
                              ? d[column.dataIndex][column.dataIndex1 as any]
                              : null;
                          } else {
                            renderedContent = column.dataIndex
                              ? d[column.dataIndex]
                              : null;
                          }
                          if (column.render) {
                            renderedContent = column.render(d);
                          }
                          return (
                            <td
                              key={index}
                              className={`${
                                column.wrap ? "whitespace-nowrap" : ""
                              }`}
                            >
                              {renderedContent}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={columns.length + 1} className="text-center">
                      Data masih kosong
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex justify-between">
        <div>
          {loading ? (
            <Skeleton height={30} width={120} borderRadius={8} />
          ) : (
            <>
              {tableData.length > 0 ? (
                <Select
                  id="perpage"
                  name="perpage"
                  data={ammontPerpage}
                  onChange={(e: any) => {
                    setTableCurrentPage(0);
                    setTablePerPage(e.target.value);
                  }}
                />
              ) : null}
            </>
          )}
        </div>
        {loading ? (
          <Skeleton height={30} width={120} borderRadius={8} />
        ) : (
          <>
            {data.length > 0 ? (
              <ReactPaginate
                breakLabel="..."
                nextLabel={<IoIosArrowForward />}
                onPageChange={(e) => {
                  setTableCurrentPage(e.selected);
                }}
                marginPagesDisplayed={1}
                forcePage={tableCurrentPage}
                pageRangeDisplayed={2}
                pageCount={tableData.length > 0 ? tableData.length : 1}
                previousLabel={<IoIosArrowBack />}
                renderOnZeroPageCount={null}
                containerClassName="flex"
                activeClassName="bg-orange text-white bg-gradient-to-r from-greens to-greene hover:text-white border-none"
                pageClassName="border border-slate-300 ml-[-0.5px] hover:bg-slate-100 hover:text-slate-800 h-9"
                pageLinkClassName="flex items-center justify-center px-2.5 h-8"
                previousClassName="border border-slate-300 rounded-tl-lg rounded-bl-lg hover:bg-slate-100 hover:text-slate-800 h-9"
                previousLinkClassName="flex items-center justify-center px-2 h-8"
                nextClassName="border border-slate-300 rounded-tr-lg rounded-br-lg hover:bg-slate-100 hover:text-slate-800 h-9 ml-[-0.5px]"
                nextLinkClassName="flex items-center justify-center px-2 h-8"
                breakClassName="border border-slate-300 ml-[-0.5px]"
                breakLinkClassName="flex items-center justify-center px-3 h-8"
              />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default Table;
