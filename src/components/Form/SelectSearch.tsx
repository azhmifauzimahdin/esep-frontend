import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { IoIosMic, IoIosMicOff } from "react-icons/io";
import Select, { SingleValue } from "react-select";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface option {
  value: string;
  label: string;
}
interface InputProps {
  id: string;
  label?: string;
  options: any[];
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
  voiceHide?: boolean;
}

const SelectSearch: FC<InputProps> = (props) => {
  const {
    id,
    label,
    options,
    onChange,
    placeholder = "",
    errorMessage,
    disabled,
    value,
    className,
    voiceHide,
  } = props;
  const [inputValue, setInputValue] = useState<string>("");
  const [voice, setVoice] = useState<boolean>(false);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>("");
  const [dataOptions, setDataOptions] = useState<option[]>([]);
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<option>>(null);
  const inputRef = useRef<any>(null);

  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    const optionsResult = options.map((item: any) => ({
      value: item.id,
      label: item.name,
    }));
    setDataOptions(optionsResult);
  }, [options]);

  useEffect(() => {
    const result = dataOptions.find((item: option) => item.value === value);
    setSelectedOption(result ?? null);
  }, [dataOptions]);

  useEffect(() => {
    if (voice && !listening && transcript != "") {
      setInputValue(transcript);
      setVoice(false);
      if (inputRef.current) inputRef.current.focus();
      setMenuIsOpen(true);
      setDebouncedInputValue(transcript);
    }
    if (!listening) setVoice(false);
  }, [listening]);

  useEffect(() => {
    const result = dataOptions.filter(
      (item: option) => item.label.toLowerCase() === debouncedInputValue
    );
    if (result.length > 0) {
      setSelectedOption(result[0]);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.blur();
        setDebouncedInputValue("");
        handleChange(result[0] as unknown as ChangeEvent<HTMLInputElement>);
      }, 1500);
    }
  }, [debouncedInputValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMenuIsOpen(false);
    if (onChange) onChange(e);
  };

  return (
    <div className={`relative mb-3 ${className}`}>
      {label ? (
        <label htmlFor={id} className="block font-medium mb-2">
          {label}
        </label>
      ) : null}
      <Select
        id={id}
        ref={inputRef}
        name={id}
        value={selectedOption}
        onChange={(selected: SingleValue<option>) => {
          setSelectedOption(selected);
          handleChange({
            target: { value: selected?.value, id: id, name: id },
          } as unknown as ChangeEvent<HTMLInputElement>);
        }}
        options={dataOptions}
        onInputChange={(value: string) => {
          if (value != "") setMenuIsOpen(true);
          setInputValue(value);
        }}
        onMenuOpen={() => setMenuIsOpen(true)}
        inputValue={inputValue}
        placeholder={placeholder}
        isClearable
        isDisabled={disabled}
        menuIsOpen={menuIsOpen}
        onFocus={() => setMenuIsOpen(true)}
        onBlur={() => setMenuIsOpen(false)}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: "#94a3b8",
            borderRadius: "0.5rem",
            paddingLeft:
              !voiceHide && browserSupportsSpeechRecognition
                ? "1.9rem"
                : "0.1rem",
            backgroundColor: state.isDisabled ? "#f1f5f9" : "",
          }),
        }}
      />
      {!voiceHide && browserSupportsSpeechRecognition ? (
        <div
          className={`absolute ${label ? "top-9" : "top-2"} left-2 text-2xl`}
        >
          {!listening ? (
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
  );
};

export default SelectSearch;
