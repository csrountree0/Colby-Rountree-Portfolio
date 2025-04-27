import { useState } from 'react';

function CalculatorPage() {
    const [display, setDisplay] = useState('0');
    const [prevValue, setPrevValue] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const [history, setHistory] = useState('');

    const clearAll = () => {
        setDisplay('0');
        setPrevValue(null);
        setOperator(null);
        setWaitingForOperand(false);
        setHistory('');
    };

    const inputDigit = (digit) => {
        if (waitingForOperand) {
            setDisplay(digit);
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? digit : display + digit);
        }
        setHistory(prev => prev + digit);
    };

    const inputDecimal = () => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
        } else if (display.indexOf('.') === -1) {
            setDisplay(display + '.');
        }
        setHistory(prev => prev + '.');
    };

    const performOperation = (nextOperator) => {
        const inputValue = parseFloat(display);

        if (prevValue === null) {
            setPrevValue(inputValue);
        } else if (operator) {
            const currentValue = prevValue || 0;
            let newValue = 0;

            switch (operator) {
                case '+':
                    newValue = currentValue + inputValue;
                    break;
                case '-':
                    newValue = currentValue - inputValue;
                    break;
                case '×':
                    newValue = currentValue * inputValue;
                    break;
                case '÷':
                    newValue = currentValue / inputValue;
                    break;
                default:
                    break;
            }

            setPrevValue(newValue);
            setDisplay(String(newValue));
        }

        setWaitingForOperand(true);
        setOperator(nextOperator);
        setHistory(prev => prev + ' ' + nextOperator + ' ');
    };

    const handleEquals = () => {
        if (!operator || waitingForOperand) return;
        
        performOperation(null);
        setHistory('');
    };

    const handleBackspace = () => {
        if (waitingForOperand) return;
        
        const newDisplay = display.slice(0, -1);
        setDisplay(newDisplay === '' ? '0' : newDisplay);
        setHistory(prev => prev.slice(0, -1));
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full max-w-sm bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-2xl">
                {/* Display */}
                <div className="mb-6 bg-slate-700/50 rounded-xl p-4">
                    <div className="text-slate-400 text-right text-sm h-6 overflow-hidden font-mono">
                        {history}
                    </div>
                    <div className="text-white text-right text-5xl font-light overflow-hidden font-mono">
                        {display}
                    </div>
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-4 gap-3">
                    {/* Row 1 */}
                    <button 
                        onClick={clearAll}
                        className="col-span-2 bg-rose-600 hover:bg-rose-500 text-white p-3 rounded-xl text-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        AC
                    </button>
                    <button 
                        onClick={handleBackspace}
                        className="bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        ⌫
                    </button>
                    <button 
                        onClick={() => performOperation('÷')}
                        className="bg-amber-600 hover:bg-amber-500 text-white p-3 rounded-xl text-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        ÷
                    </button>

                    {/* Row 2 */}
                    <button 
                        onClick={() => inputDigit('7')}
                        className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-xl text-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        7
                    </button>
                    <button 
                        onClick={() => inputDigit('8')}
                        className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-xl text-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        8
                    </button>
                    <button 
                        onClick={() => inputDigit('9')}
                        className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-xl text-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        9
                    </button>
                    <button 
                        onClick={() => performOperation('×')}
                        className="bg-amber-600 hover:bg-amber-500 text-white p-3 rounded-xl text-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        ×
                    </button>

                    {/* Row 3 */}
                    <button 
                        onClick={() => inputDigit('4')}
                        className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-xl text-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        4
                    </button>
                    <button 
                        onClick={() => inputDigit('5')}
                        className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-xl text-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        5
                    </button>
                    <button 
                        onClick={() => inputDigit('6')}
                        className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-xl text-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        6
                    </button>
                    <button 
                        onClick={() => performOperation('-')}
                        className="bg-amber-600 hover:bg-amber-500 text-white p-3 rounded-xl text-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        -
                    </button>

                    {/* Row 4 */}
                    <button 
                        onClick={() => inputDigit('1')}
                        className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-xl text-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        1
                    </button>
                    <button 
                        onClick={() => inputDigit('2')}
                        className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-xl text-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        2
                    </button>
                    <button 
                        onClick={() => inputDigit('3')}
                        className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-xl text-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        3
                    </button>
                    <button 
                        onClick={() => performOperation('+')}
                        className="bg-amber-600 hover:bg-amber-500 text-white p-3 rounded-xl text-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        +
                    </button>

                    {/* Row 5 */}
                    <button 
                        onClick={() => inputDigit('0')}
                        className="col-span-2 bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-xl text-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        0
                    </button>
                    <button 
                        onClick={inputDecimal}
                        className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-xl text-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        .
                    </button>
                    <button 
                        onClick={handleEquals}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-xl text-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        =
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CalculatorPage;