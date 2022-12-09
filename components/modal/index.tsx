/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import { useTodoStore } from "../../store/todoStore";

export const ModalLogin = () => {
  // states
  const [opened, setOpened] = useState(true);
  // name
  const [inputName, setInputName] = useState<string>("");
  const [nameDeb, setNameDeb] = useState("");
  const [, cancel] = useDebounce(
    () => {
      setNameDeb(inputName);
    },
    2000,
    [inputName]
  );

  // store
  const { name, addName } = useTodoStore<any>((states: any) => states);

  // input fN
  function inputNameHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInputName(e.target.value);
  }

  //   modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  //   modal Fn
  const modalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    setTimeout(() => {
      addName(nameDeb);
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameDeb]);

  // !todo add persistance storage
  // !todo add modal animation
  // !todo add category dropdown in the todo input
  // !todo add draggable input [todo, category]

  return (
    <>
      <div
        className={`absolute inset-0 bg-black/50 ${
          isModalOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center justify-center h-full ">
          <div className="w-screen h-screen  md:w-[31.25rem] md:h-[31.25rem] flex flex-col p-10 custom-gradient shadow-xl">
            <div className="h-[30.125rem] flex justify-center items-center drop-shadow-xl">
              <img src="./logo.png" alt="logo" className="" />
            </div>

            <div className="flex flex-col justify-between w-full h-full gap-2">
              <div className="w-full">
                <h1 className="text-2xl font-bold md:text-xl">
                  Welcome to Dona Clone
                </h1>
                <p className="text-base md:text-sm text-[#808080] md:w-[65%]">
                  Dona is a back to-do list focused on fast and delightful user
                  experience.
                </p>
              </div>

              <div className="flex flex-col w-full">
                <h1 className="text-base">What&apos;s your name?</h1>
                <input
                  autoComplete="off"
                  value={inputName}
                  onChange={inputNameHandler}
                  type="text"
                  placeholder="Type it here"
                  className="outline-none focus:border-b-2 w-[40%] text-[#195786] text-sm h-7"
                />
                <div className="mt-10 ">
                  <button
                    onClick={modalHandler}
                    className="w-[34%] text-center bg-[#008FFD] hover:bg-[#0276cf] p-2 text-white rounded-[0.625rem] text-base shadow-custom"
                  >
                    <div>Continue</div>
                  </button>
                  <button className="w-[34%] text-center p-2 text-[#008FFD] rounded-[0.625rem] text-base shadow-custom ml-3 ">
                    Gmail
                  </button>
                </div>
                <div className="w-full md:hidden h-36"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
