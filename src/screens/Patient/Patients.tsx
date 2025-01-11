import { FC, useEffect, useState } from "react";
import DocumentTitle from "../../layouts/DocumentTitle";
import { Header, Table } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { TableColumn } from "../../components/Table/Table";
import { Patient } from "../../types/patient";
import { format } from "date-fns";
import { PatientServices } from "../../services";
import { setErrorMessage } from "../../redux/actions/errorMessage";
import { setSuccessMessage } from "../../redux/actions/successMessage";
import { updateStatusPatient } from "../../redux/actions/patient";

const Patients: FC = () => {
  DocumentTitle("Daftar Pasien");
  const header = [
    {
      title: "Pasien Pending",
      path: "",
    },
  ];

  const patients = useSelector((state: RootState) => state.patients.patients);
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [patientsPending, setPatientsPending] = useState<Patient[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const filterPatient = patients.filter((data: Patient) => data.status === 0);
    setPatientsPending(filterPatient);
  }, [patients]);

  const updateStatusPatien = async (id: string) => {
    try {
      dispatch(updateStatusPatient(id));
      dispatch(setSuccessMessage("Nomor RM berhasil disalin."));
      await PatientServices.updateStatusPatient(id);
    } catch (error) {
      console.log(error);
      dispatch(setErrorMessage(["Gagal salin nomor RM."]));
    }
  };

  const copyToClipboard = async (text: string) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (error) {
        console.log(error);
        dispatch(setErrorMessage(["Gagal salin nomor RM"]));
      }
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  };

  const columns: TableColumn[] = [
    {
      title: "RM",
      dataIndex: "rm",
      sort: "rm",
      render: (data: Patient) => (
        <span
          className="text-greens hover:greene hover:underline font-medium cursor-pointer"
          onClick={() => {
            updateStatusPatien(data.id);
            copyToClipboard(data.rm);
          }}
        >
          {data.rm}
        </span>
      ),
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
              ? "from-greens to-greene"
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
      title: "Tanggal",
      dataIndex: "created_at",
      sort: "created_at",
      render: (data: Patient) => {
        const date = new Date(data.created_at);
        const formattedDate = format(date, "dd-MM-yyyy HH:mm:ss");
        return <span>{formattedDate}</span>;
      },
    },
  ];

  return (
    <div>
      <Header title="Pasien Pending" data={header} />
      <div className="bg-white rounded-lg shadow p-3">
        <Table
          data={patientsPending}
          columns={columns}
          loading={loading}
          defaultSort="created_at"
          search
        />
      </div>
    </div>
  );
};

export default Patients;
