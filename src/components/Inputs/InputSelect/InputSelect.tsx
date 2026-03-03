"use client";
import "./InputSelect.scss";
import { FC, ComponentProps, useState } from "react";
import { useFloating, flip, autoUpdate, offset } from "@floating-ui/react";
import useClickOutside from "@/hooks/useClickOutside";
import ImgDefault from "@/components/ImgDefault/ImgDefault";

type InputProp = ComponentProps<"input"> & {
  label: string;
  erroMsg: string;
  invalid?: boolean;
  options: string[];
  fullSize?: string;
};

const InputSelect: FC<InputProp> = ({
  id,
  name,
  value,
  label,
  erroMsg,
  invalid,
  options,
  onChange,
  fullSize = "w-100",
  placeholder = "Selecione uma opção",
  ...props
}) => {
  const [active, setActive, ref] = useClickOutside();
  const { refs, floatingStyles } = useFloating({
    placement: "bottom",
    middleware: [flip(), offset(10)],
    elements: { reference: ref.current },
    whileElementsMounted: autoUpdate
  });

  const getOptionKey = (val: any): string => {
    if (val === null || val === undefined) return String(val);
    if (typeof val === "object") return JSON.stringify(val);
    return String(val);
  };

  const initialSelectedKey = value !== undefined ? getOptionKey(value) : "";
  const [selectedKey, setSelectedKey] = useState<string>(initialSelectedKey);

  const handleChange = (itemValue: any) => {
    const key = getOptionKey(itemValue);
    onChange && onChange({ target: { value: itemValue } } as React.ChangeEvent<HTMLInputElement>);
    setSelectedKey(key);
    setActive(false);
  };

  const selectedOption = options.find((opt) => getOptionKey(opt) === selectedKey);

  return (
    <div className={`inputSelect ${invalid && "inputSelect--invalid"} ${fullSize}`}>
      <label htmlFor={id} className="inputSelect__label">
        {label}
      </label>

      <div
        ref={ref}
        className={`inputSelect__wrapper`}
        aria-disabled={props?.disabled}
        tabIndex={0}
        role="combobox"
        aria-expanded={active}
        aria-haspopup="listbox"
        aria-controls={id + "-listbox"}
        onClick={() => setActive((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            setActive((prev) => !prev);
          } else if (e.key === "Escape") {
            e.preventDefault();
            setActive(false);
          }
        }}
      >
        <span className={`inputSelect__option ${!selectedOption && "inputSelect__option--placeholder"}`}>
          {!!selectedOption ? selectedOption : placeholder}
        </span>
      </div>
      {active && (
        <ul
          className={`inputSelect__list ${active && "inputSelect__list--active"}`}
          style={floatingStyles}
          ref={refs.setFloating}
          id={id + "-listbox"}
          role="listbox"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              setActive(false);
            }
          }}
        >
          {options?.length > 0 &&
            options.map((item, i: number) => {
              const itemKey = getOptionKey(item);
              return (
                <li
                  key={i}
                  className="inputSelect__item"
                  tabIndex={0}
                  role="option"
                  aria-selected={selectedKey === itemKey}
                  onClick={() => handleChange(item)}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      handleChange(item);
                    } else if (e.key === "Escape") {
                      e.preventDefault();
                      setActive(false);
                    }
                  }}
                >
                  {item}
                </li>
              );
            })}
        </ul>
      )}
      {invalid && (
        <div className="inputSelect__helpContainer">
          <ImgDefault src="/icons/alert.svg" alt="Alerta" className="inputSelect__helpIcon" />
          <span className="inputSelect__helpText">{erroMsg}</span>
        </div>
      )}
    </div>
  );
};

export default InputSelect;
