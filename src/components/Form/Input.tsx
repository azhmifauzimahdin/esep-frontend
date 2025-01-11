import {
  ChangeEvent,
  FC,
  FocusEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoIosEye, IoIosEyeOff, IoIosMic, IoIosMicOff } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface InputProps {
  label?: string;
  id: string;
  type: "text" | "number" | "password" | "search" | "email" | "date";
  placeholder?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  errorMessage?: string;
  width?: string;
  loadingRender?: boolean;
  voiceHide?: boolean;
}

const Input: FC<InputProps> = (props) => {
  const {
    label,
    id,
    type,
    placeholder,
    value,
    onChange,
    onBlur,
    disabled,
    errorMessage,
    width,
    loadingRender,
    voiceHide,
  } = props;
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const [voice, setVoice] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    if (voice && !listening && transcript != "") {
      handleChange({
        target: { value: transcript, id: id, name: id },
      } as React.ChangeEvent<HTMLInputElement>);
      setVoice(false);
      if (inputRef.current) inputRef.current.focus();

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.blur();
        }
      }, 1500);
    }
    if (!listening) setVoice(false);
  }, [listening]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
  };

  return (
    <>
      {loadingRender ? (
        <div className={`${width ?? "w-full"}`}>
          {label ? (
            <Skeleton
              height={20}
              width={100}
              borderRadius={8}
              className="mb-2"
            />
          ) : null}
          <Skeleton borderRadius={8} height={36} />
        </div>
      ) : (
        <div className={`relative mb-3 ${width}`}>
          {label ? (
            <label
              htmlFor={id}
              className="block mb-2 font-semibold text-slate-800"
            >
              {label}
            </label>
          ) : null}
          <input
            ref={inputRef}
            type={
              type === "password"
                ? togglePassword
                  ? "text"
                  : "password"
                : type
            }
            id={id}
            name={id}
            autoFocus={voice}
            onBlur={onBlur}
            className={`bg-gray-50 disabled:bg-slate-100 disabled:text-slate-500 border shadow-sm border-slate-400 rounded-lg block w-full py-2.5 ${
              !voiceHide && browserSupportsSpeechRecognition
                ? "ps-10"
                : "ps-2.5"
            } ${type === "password" ? "pe-10" : "pe-2.5"}`}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
          />
          {type === "password" ? (
            <div
              onClick={() => setTogglePassword(!togglePassword)}
              className={`absolute ${
                label ? "top-9" : "top-2.5"
              } pt-0.5 right-2 cursor-pointer text-slate-500 text-xl`}
            >
              {togglePassword ? <IoIosEye /> : <IoIosEyeOff />}
            </div>
          ) : null}
          {!voiceHide && browserSupportsSpeechRecognition ? (
            <div
              className={`absolute ${
                label ? "top-9" : "top-2.5"
              } left-2 text-2xl`}
            >
              {disabled ? (
                <IoIosMicOff className="p-1 text-slate-500" />
              ) : !listening ? (
                <IoIosMic
                  onClick={() => {
                    setVoice(true);
                    SpeechRecognition.startListening({ language: "id" });
                  }}
                  className="cursor-pointer p-1 text-slate-500 hover:text-greenx"
                />
              ) : voice ? (
                <IoIosMic
                  onClick={() => SpeechRecognition.stopListening()}
                  className="cursor-pointer p-1 text-white bg-greenx rounded-full"
                />
              ) : (
                <IoIosMicOff className="p-1 text-slate-500" />
              )}
            </div>
          ) : null}
          {errorMessage ? (
            <div className="text-red-600 text-xs ml-3 mt-1">{errorMessage}</div>
          ) : null}
        </div>
      )}
    </>
  );
};
export default Input;
