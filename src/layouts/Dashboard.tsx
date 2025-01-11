import { FC, useEffect, useState } from "react";
import { IoIosApps, IoMdList } from "react-icons/io";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AnnouncementRSI, LogoRSI, Medical } from "../assets";
import { Button, Img, Modal, NavLink, NavLinkDropdown } from "../components";
import { IoCardOutline, IoVolumeHigh, IoVolumeMute } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/actions/loading";
import { PatientServices } from "../services";
import { mergePatient, setPatient } from "../redux/actions/patient";
import { OptionNavlink } from "../components/Link/NavlinkDropdown";
import { Patient } from "../types/patient";
import { RootState } from "../redux/reducers";

const getTimePeriod = (): string => {
  const hours = new Date().getHours();

  if (hours >= 5 && hours < 11) {
    return "Pagi"; // 5 AM - 11 AM
  } else if (hours >= 11 && hours < 16) {
    return "Siang"; // 11 AM - 4 PM
  } else if (hours >= 16 && hours < 19) {
    return "Sore"; // 4 PM - 7 PM
  } else {
    return "Malam"; // 7 PM - 5 AM
  }
};

const Dashboard: FC = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const pathname = useLocation().pathname.split("/");
  const location = pathname[pathname.length - 1];

  const handleCloseSidebar = () => {
    if (toggleSidebar) setToggleSidebar(false);
  };

  const dispatch = useDispatch();
  const [audio] = useState(new Audio(AnnouncementRSI));
  const [timePeriod] = useState<string>(getTimePeriod());
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const patients = useSelector((state: RootState) => state.patients.patients);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (timeLeft === 0) {
      audio.currentTime = 0;
      audio.muted = false;
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    setTimeout(() => {
      setVisibleModal(true);
    }, 400);
    fetchPatients();
  }, []);

  useEffect(() => {
    // const hours = new Date().getHours();
    // let interval;
    const interval = setInterval(reFetchPatients, 10 * 1000);
    // if (hours < 7) {
    //   interval = setInterval(reFetchPatients, 1 * 60 * 60 * 1000);
    // } else if (hours > 21) {
    //   interval = setInterval(reFetchPatients, 10 * 60 * 1000);
    // } else {
    //   interval = setInterval(reFetchPatients, 10 * 1000);
    // }
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!patients.some((data: Patient) => data.status === 0)) {
      pauseAnnouncement();
    }
  }, [patients]);

  const fetchPatients = async () => {
    dispatch(setLoading(true));
    try {
      const response = await PatientServices.fetchPatients();
      dispatch(setPatient(response.data.data.patients));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  const reFetchPatients = async () => {
    try {
      const response = await PatientServices.fetchPatientsPending();
      dispatch(mergePatient(response.data.data.patients));
      if (
        response.data.data.patients.length > 0 &&
        response.data.data.patients.some((data: Patient) => data.status === 0)
      ) {
        playAnnouncement();
      } else {
        pauseAnnouncement();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const playAnnouncement = () => {
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  };

  const pauseAnnouncement = () => {
    audio.pause();
    audio.currentTime = 0;
  };

  const optionPatient: OptionNavlink[] = [
    {
      to: "/patients",
      label: "Pasien Pending",
      active: location === "patients",
    },
    {
      to: "/patients/finished",
      label: "Pasien Selesai",
      active: location === "finished",
    },
  ];

  return (
    <>
      <Modal visible={visibleModal}>
        <div className="w-80 text-center p-3">
          <Img src={Medical} alt="Medical" className="w-40 mx-auto mb-2" />
          <h2 className="text-2xl font-medium text-greenx mb-0.5">
            Selamat {timePeriod}!
          </h2>
          <p className="text-slate-600 text-xs mb-5">
            Tekan tombol di bawah untuk memulai aplikasi dan mengaktifkan
            notifikasi
          </p>
          <Button
            type="button"
            color="primary"
            onClick={() => setVisibleModal(false)}
          >
            Mulai
          </Button>
        </div>
      </Modal>
      <div className="bg-slate-100 min-h-screen relative">
        <nav className="fixed top-0 w-full bg-gradient-to-r from-greens to-greene shadow z-40">
          <div className="px-3 py-1.5 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start rtl:justify-end">
                <div
                  className="inline-flex items-center p-1.5 rounded-lg sm:hidden cursor-pointer hover:bg-white text-xl text-white hover:text-greens"
                  onClick={() => setToggleSidebar(!toggleSidebar)}
                >
                  <IoMdList />
                </div>
                <Link to="/" className="flex items-center gap-3 ms-2">
                  <Img src={LogoRSI} alt="logo RSI" className="h-7" />
                  <span className="text-lg font-medium text-white">
                    RSI Kota Magelang
                  </span>
                </Link>
              </div>
              <div className="text-white text-3xl flex items-center">
                {timeLeft === 0 ? (
                  <IoVolumeHigh
                    className="p-1 rounded-full cursor-pointer hover:text-greens hover:bg-white transition-all"
                    onClick={() => {
                      setTimeLeft(30);
                      audio.muted = true;
                      pauseAnnouncement();
                    }}
                  />
                ) : (
                  <>
                    <span className="text-xs">{timeLeft}</span>
                    <IoVolumeMute
                      className="p-1 rounded-full cursor-pointer hover:text-greens hover:bg-white transition-all"
                      onClick={() => setTimeLeft(0)}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        <aside
          id="logo-sidebar"
          className={`fixed top-10 pt-3 left-0 z-30 w-64 h-screen transition-transform duration-700 -translate-x-full bg-white sm:translate-x-0 shadow ${
            toggleSidebar ? "transform-none" : "-translate-x-full"
          }`}
          aria-label="Sidebar"
          aria-modal={toggleSidebar}
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
            <ul className="space-y-1 font-medium">
              <li>
                <NavLink
                  to="/"
                  active={location === ""}
                  onClick={() => setToggleSidebar(false)}
                >
                  <IoIosApps className="text-lg" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLinkDropdown
                  to="/patients/finished"
                  options={optionPatient}
                  onClick={() => {
                    setToggleSidebar(false);
                    setTimeLeft(0);
                  }}
                >
                  <IoCardOutline className="text-lg" />
                  Pasien
                </NavLinkDropdown>
              </li>
            </ul>
          </div>
        </aside>

        <div
          className="p-3 sm:ml-64 pt-12 min-h-screen "
          onClick={handleCloseSidebar}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
