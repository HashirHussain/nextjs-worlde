import { FiArrowLeft, FiCornerDownLeft } from "react-icons/fi";
import { ALPHABETS, blocksValueType } from "../lib";

const keyStyle = `flex grow shrink basis-px
items-center justify-center
px-3 py-1 sm:py-2
font-semibold text-gray-800
bg-gray-100 active:bg-gray-200
border border-gray-200 hover:border-gray-300 active:border-gray-400
rounded-md
uppercase
cursor-pointer
select-none`;

//dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500

const getKeyStyle = (
    submittedWords: blocksValueType,
    correctAnswer: string,
    key: string
) => {
    if (submittedWords.length) {
        const keyIndex = submittedWords.flat().indexOf(key);
        if (keyIndex === -1 && correctAnswer.indexOf(key) === -1) {
            //untouched key
            return keyStyle; //default style
        }

        if (keyIndex !== -1 && correctAnswer.indexOf(key) === -1) {
            // not a correct key
            return `${keyStyle} bg-gray-300`;
        }

        if (keyIndex !== -1 && correctAnswer.indexOf(key) !== -1) {
            const allPositionsOfKey = submittedWords
                .map((item: Array<string>) => {
                    return item.indexOf(key);
                })
                .filter((item: number) => item !== -1);
            if (allPositionsOfKey.indexOf(correctAnswer.indexOf(key)) !== -1) {
                //present at correct place
                return `${keyStyle} bg-lime-300`;
            }
            // present at different place
            return `${keyStyle} bg-yellow-300`;
        }
    }

    return keyStyle; //default style
};

export default function Keyboard({
    onKeyboardClick,
    correctAnswer,
    submittedWords,
}: {
    onKeyboardClick: (arg0: string) => void;
    correctAnswer: string;
    submittedWords: blocksValueType;
}) {
    return (
        <div className="flex flex-col justify-center items-center gap-1">
            <div className="flex flex-row justify-stretch gap-x-1">
                {ALPHABETS[0].map((key: string, index: number) => {
                    return (
                        <button
                            type="button"
                            key={`key-${key}-${index}`}
                            className={getKeyStyle(submittedWords, correctAnswer, key)}
                            onClick={() => onKeyboardClick(key)}
                        >
                            {key}
                        </button>
                    );
                })}
            </div>
            <div className="flex flex-row justify-stretch gap-x-1">
                {ALPHABETS[1].map((key: string, index: number) => {
                    return (
                        <div
                            key={`key-${key}-${index}`}
                            className={getKeyStyle(submittedWords, correctAnswer, key)}
                            onClick={() => onKeyboardClick(key)}
                        >
                            {key}
                        </div>
                    );
                })}
            </div>
            <div className="flex flex-row justify-stretch gap-x-1">
                <div className={keyStyle} onClick={() => onKeyboardClick("Backspace")}>
                    &nbsp;&nbsp;
                    <FiArrowLeft />
                    &nbsp;&nbsp;
                </div>
                {ALPHABETS[2].map((key: string, index: number) => {
                    return (
                        <div
                            key={`key-${key}-${index}`}
                            className={getKeyStyle(submittedWords, correctAnswer, key)}
                            onClick={() => onKeyboardClick(key)}
                        >
                            {key}
                        </div>
                    );
                })}
                <div className={keyStyle} onClick={() => onKeyboardClick("Enter")}>
                    &nbsp;&nbsp;
                    <FiCornerDownLeft />
                    &nbsp;&nbsp;
                </div>
            </div>
        </div>
    );
}
