import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Img, Input, SelectSearch } from "../../components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaceRecognition } from "../../assets";
import { PatientServices } from "../../services";
import { PatientRequest } from "../../types/patient";
import axios from "axios";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Esep: FC = () => {
  const query = useQuery();
  const prompt0 = query.get("prompt0");
  const prompt1 = query.get("prompt1");
  const prompt2 = query.get("prompt2");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (prompt0 && prompt1 && prompt2) {
      formik.setValues({
        rm: prompt0,
        episode: prompt1,
        name: prompt2,
        guarantor_code: "",
      });
    }
  }, [prompt0, prompt1, prompt2]);

  const guarantorOptions = [
    {
      id: "G0184",
      name: "BPJS KESEHATAN",
    },
    {
      id: "1000000",
      name: "PRIBADI",
    },
  ];

  const validationSchema = Yup.object().shape({
    rm: Yup.string().required("No RM wajib diisi"),
    episode: Yup.string().required("Episode wajib diisi"),
    name: Yup.string().required("Nama wajib diisi"),
    guarantor_code: Yup.string().required("Penjamin wajib diisi"),
  });

  const handleSubmit = async (values: PatientRequest) => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await PatientServices.addPatient(values as PatientRequest);
      setTimeLeft(6);
      setSuccessMessage("Data berhasil Terkirim.");
      setLoading(false);
      setTimeout(() => {
        window.close();
      }, 6000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.data?.error);
      } else {
        setErrorMessage(
          "Terjadi kesalahan, harap tutup halaman dan ulangi kembali."
        );
      }
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      rm: "",
      episode: "",
      name: "",
      guarantor_code: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-3 bg-white rounded w-80">
        <Img src={FaceRecognition} alt="E-SEP" className="w-24 mx-auto" />
        <h1 className="text-greenx text-lg font-bold mb-3 text-center">
          E-SEP
        </h1>
        {successMessage ? (
          <div
            className="p-4 mb-3 text-sm text-center text-green-800 rounded-lg bg-green-50"
            role="alert"
          >
            {successMessage}
            <span className="ms-1">
              Halaman tertutup otomatis dalam hitungan{" "}
              <span className="font-bold">{timeLeft} detik</span>.
            </span>
          </div>
        ) : null}
        {errorMessage ? (
          <div
            className="p-4 mb-3 text-sm text-center text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            {errorMessage}
          </div>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <Input
              id="rm"
              type="text"
              label="No RM"
              disabled
              value={formik.values.rm}
              errorMessage={
                formik.touched.rm && formik.errors.rm ? formik.errors.rm : ""
              }
            />
            <Input
              id="episode"
              type="text"
              label="Episode"
              disabled
              value={formik.values.episode}
              errorMessage={
                formik.touched.episode && formik.errors.episode
                  ? formik.errors.episode
                  : ""
              }
            />
          </div>
          <Input
            id="name"
            type="text"
            label="Nama"
            disabled
            value={formik.values.name}
            errorMessage={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""
            }
          />
          <SelectSearch
            id="guarantor_code"
            label="Penjamin"
            options={guarantorOptions}
            disabled={loading}
            onChange={formik.handleChange}
            value={formik.values.guarantor_code}
            errorMessage={
              formik.touched.guarantor_code && formik.errors.guarantor_code
                ? formik.errors.guarantor_code
                : ""
            }
          />
          <Button
            type="submit"
            color="primary"
            width="full"
            loading={loading}
            className="mt-2"
          >
            KIRIM
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Esep;
