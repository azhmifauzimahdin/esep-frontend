import { FC, useEffect, useState } from "react";
import DocumentTitle from "../../layouts/DocumentTitle";
import { Header, Table } from "../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { TableColumn } from "../../components/Table/Table";
import { Patient } from "../../types/patient";
import { format } from "date-fns";

const Patients: FC = () => {
  DocumentTitle("Daftar Pasien");
  const header = [
    {
      title: "Pasien Selesai",
      path: "",
    },
  ];

  const patients = useSelector((state: RootState) => state.patients.patients);
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [patientsFinished, setPatientsFinished] = useState<Patient[]>([]);

  useEffect(() => {
    const filterPatient = patients.filter((data: Patient) => data.status === 1);
    if (patientsFinished.length === 0) setPatientsFinished(filterPatient);
    if (patientsFinished.length != filterPatient.length)
      setPatientsFinished(filterPatient);
  }, [patients]);

  const columns: TableColumn[] = [
    {
      title: "RM",
      dataIndex: "rm",
      sort: "rm",
    },
    {
      title: "Episode",
      dataIndex: "episode",
      sort: "episode",
    },
    {
      title: "Nama",
      dataIndex: "name",
      sort: "name",
    },
    {
      title: "Kode Penjamin",
      dataIndex: "guarantor",
      dataIndex1: "code",
      sort: "guarantor",
      sort1: "code",
      render: (data: Patient) => (
        <span
          className={`px-3 py-0.5 whitespace-nowrap text-white text-xs mx-auto rounded-lg bg-gradient-to-r ${
            data.guarantor.code === "G0184"
              ? "from-greens to-greene "
              : "from-blues to-bluee "
          }`}
        >
          {data.guarantor.code}
        </span>
      ),
    },
    {
      title: "Nama Penjamin",
      dataIndex: "guarantor",
      dataIndex1: "name",
      sort: "guarantor",
      sort1: "name",
    },
    {
      title: "Tanggal Permintaan",
      dataIndex: "created_at",
      sort: "created_at",
      render: (data: Patient) => {
        const date = new Date(data.created_at);
        const formattedDate = format(date, "dd-MM-yyyy HH:mm:ss");
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Tanggal Selesai",
      dataIndex: "updated_at",
      sort: "updated_at",
      render: (data: Patient) => {
        const date = new Date(data.updated_at);
        const formattedDate = format(date, "dd-MM-yyyy HH:mm:ss");
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Keterangan",
      dataIndex: "notes",
      sort: "notes",
      render: (data: Patient) => (
        <span
          className={`px-3 py-0.5 whitespace-nowrap text-white text-xs mx-auto rounded-lg bg-gradient-to-r ${
            data.notes === "automatic status updates"
              ? "from-grays to-graye"
              : "from-greens to-greene"
          }`}
        >
          {data.notes === "automatic status updates" ? "Otomatis" : "Selesai"}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Header title="Pasien Selesai" data={header} />
      <div className="bg-white rounded-lg shadow p-3">
        <Table
          data={patientsFinished}
          columns={columns}
          loading={loading}
          search
        />
      </div>
    </div>
  );
};

export default Patients;
