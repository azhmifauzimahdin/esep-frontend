import { FC, useEffect, useState } from "react";
import DocumentTitle from "../../layouts/DocumentTitle";
import { IoCheckmark, IoCloseOutline, IoPeopleSharp } from "react-icons/io5";
import { Patient } from "../../types/patient";
import { IPService, PatientServices } from "../../services";
import { CardDashboard, Header } from "../../components";
import { DataCardDashboard } from "../../components/Card/CardDashboard";

const Dasdhboard: FC = () => {
  DocumentTitle("Dashboard");
  const [ip, setIp] = useState<string>("");

  const header = [
    {
      title: `Dashboard ${ip}`,
      path: "",
    },
  ];

  const [patients, setPatients] = useState<Patient[]>([]);
  const [finishedPatient, setFinishedPatient] = useState<Patient[]>([]);
  const [pendingPatient, setpendingPatient] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchPatientsToday();
  }, []);

  const fetchPatientsToday = async () => {
    setLoading(true);
    try {
      const response = await PatientServices.fetchPatientsToday();
      setPatients(response.data.data.patients);
      setFinishedPatient(
        response.data.data.patients.filter((data: Patient) => data.status === 1)
      );
      setpendingPatient(
        response.data.data.patients.filter((data: Patient) => data.status === 0)
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const cardData: DataCardDashboard[] = [
    {
      icon: (
        <div className="p-3 bg-blue-300/25 rounded-full">
          <IoPeopleSharp className="text-3xl text-blue-600" />
        </div>
      ),
      content: (
        <>
          <h1 className="text-lg font-medium">{patients.length}</h1>
          <p className="text-slate-500">Total Transaksi</p>
        </>
      ),
    },
    {
      icon: (
        <div className="p-3 bg-green-300/25 rounded-full">
          <IoCheckmark className="text-3xl text-green-600" />
        </div>
      ),
      content: (
        <>
          <h1 className="text-lg font-medium">{finishedPatient.length}</h1>
          <p className="text-slate-500">Selesai</p>
        </>
      ),
    },
    {
      icon: (
        <div className="p-3 bg-orange-300/25 rounded-full">
          <IoCloseOutline className="text-3xl text-orange-600" />
        </div>
      ),
      content: (
        <>
          <h1 className="text-lg font-medium">{pendingPatient.length}</h1>
          <p className="text-slate-500">Pending</p>
        </>
      ),
    },
  ];

  useEffect(() => {
    const fetchIp = async () => {
      setLoading(true);
      try {
        const response = await IPService.fetchIp();
        setIp(response.data.data.IP_Address);
      } catch (error) {
        console.log("Failed to retrieve IP address : ", error);
      }
      setLoading(false);
    };
    fetchIp();
  }, []);

  return (
    <div>
      <Header title="Dashboard" data={header} />
      <h1 className="mt-3 text-slate-600">Jumlah Transaksi Hari Ini</h1>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
        <CardDashboard data={cardData} loading={loading} />
      </div>
    </div>
  );
};

export default Dasdhboard;
