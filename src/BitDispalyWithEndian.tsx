import React, { useState } from "react";

const BitDisplay: React.FC = () => {
  const [bitCount, setBitCount] = useState<number>(16); // 默认显示 16 个比特
  const [bitsPerRow, setBitsPerRow] = useState<number>(16); // 默认每行显示 16 个方块
  const [bits, setBits] = useState<number[]>(Array(bitCount).fill(0));
  const [isLittleEndian, setIsLittleEndian] = useState<boolean>(false); // 默认大端
  const [isRowFirst, setIsRowFirst] = useState<boolean>(true); // 默认按行增长
  const [showBitIndexs, setShowBitIndexs] = useState<boolean>(true); // 默认显示比特位号
  const [showPortNumbers, setShowPortNumbers] = useState<boolean>(true); // 默认显示方块内数字

  // 处理比特数变化
  const handleBitCountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newBitCount = parseInt(event.target.value, 10);
    setBitCount(newBitCount);
    setBits(Array(newBitCount).fill(0)); // 重置比特数组
    setBitsPerRow(newBitCount); // 默认每行显示所有方块
  };

  // 处理每行方块数变化
  const handleBitsPerRowChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newBitsPerRow = parseInt(event.target.value, 10);
    setBitsPerRow(newBitsPerRow);
  };

  // 处理大小端变化
  const handleEndianChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLittleEndian(event.target.value === "little");
  };

  // 处理增长方向变化
  const handleGrowthDirectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsRowFirst(event.target.value === "row");
  };

  // 处理显示比特位号变化
  const handleShowBitIndexsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowBitIndexs(event.target.checked);
  };

  // 处理显示方块内数字变化
  const handleShowPortNumbersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowPortNumbers(event.target.checked);
  };

  // 获取当前比特数的约数
  const getDivisors = (num: number): number[] => {
    const divisors = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        divisors.push(i);
      }
    }
    return divisors;
  };

  // 翻转比特
  const toggleBit = (index: number) => {
    const newBits = [...bits];
    newBits[index] = newBits[index] === 0 ? 1 : 0;
    setBits(newBits);
  };

  // 计算二进制、十进制、十六进制
  const binaryString = isLittleEndian? bits.slice().reverse().join(""): bits.join("");
  const decimalValue = parseInt(binaryString, 2);
  const hexValue = decimalValue.toString(16).toUpperCase();

  // 获取比特位号
  const getBitIndex = (row: number, col: number): number => {
    if (isRowFirst) {
      return row * bitsPerRow + col;
    } else {
      return col * (bitCount / bitsPerRow) + row;
    }
  };

  // 分块显示比特
  const renderBitBlocks = () => {
    const blocks = [];
    const rows = bitCount / bitsPerRow;

    for (let row = 0; row < rows; row++) {
      blocks.push(
        <div key={row} style={{ marginBottom: "20px" }}>
          {/* 显示比特方块 */}
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            {Array.from({ length: bitsPerRow }, (_, col) => {
              const bitIndex = getBitIndex(row, col);
              const displayIndex = isLittleEndian ? bitIndex : bitCount - 1 - bitIndex;
              const bit = bits[bitIndex];
              return (
                <div key={col} style={{ textAlign: "center" }}>
                  {/* 显示比特位号 */}
                  {showBitIndexs && (
                    <div style={{ marginBottom: "5px", fontSize: "12px" }}>
                      {displayIndex}
                    </div>
                  )}
                  {/* 比特方块 */}
                  <div
                    onClick={() => toggleBit(bitIndex)}
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: bit === 1 ? "black" : "white",
                      border: "1px solid black",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: bit === 1 ? "white" : "black",
                      fontSize: "12px",
                    }}
                  >
                    {showPortNumbers && displayIndex + 1} {/* 显示比特位号加 1 */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return blocks;
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Bit Display</h1>
      {/* 配置选项 */}
      <div style={{ position: "absolute", top: "20px", right: "20px" }}>
        <div>
          <label htmlFor="bitCount">Bits: </label>
          <select id="bitCount" value={bitCount} onChange={handleBitCountChange}>
            <option value={8}>8</option>
            <option value={16}>16</option>
            <option value={32}>32</option>
            <option value={64}>64</option>
            <option value={128}>128</option>
          </select>
        </div>
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="bitsPerRow">Bits per Row: </label>
          <select id="bitsPerRow" value={bitsPerRow} onChange={handleBitsPerRowChange}>
            {getDivisors(bitCount).map((divisor) => (
              <option key={divisor} value={divisor}>
                {divisor}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="endian">Endianness: </label>
          <select id="endian" value={isLittleEndian ? "little" : "big"} onChange={handleEndianChange}>
            <option value="big">Big Endian</option>
            <option value="little">Little Endian</option>
          </select>
        </div>
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="growthDirection">Growth Direction: </label>
          <select id="growthDirection" value={isRowFirst ? "row" : "column"} onChange={handleGrowthDirectionChange}>
            <option value="row">Row First</option>
            <option value="column">Column First</option>
          </select>
        </div>
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="showBitIndexs">Show Bit Indexs: </label>
          <input
            id="showBitIndexs"
            type="checkbox"
            checked={showBitIndexs}
            onChange={handleShowBitIndexsChange}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="showPortNumbers">Show Port Numbers: </label>
          <input
            id="showPortNumbers"
            type="checkbox"
            checked={showPortNumbers}
            onChange={handleShowPortNumbersChange}
          />
        </div>
      </div>
      {/* 显示比特方块 */}
      {renderBitBlocks()}
      {/* 显示数值 */}
      <div style={{ marginTop: "20px" }}>
        <p>Binary: {binaryString}</p>
        <p>Decimal: {decimalValue}</p>
        <p>Hexadecimal: 0x{hexValue}</p>
      </div>
      {/* 作者名字 */}
      <div style={{ position: "absolute", bottom: "10px", right: "10px", fontSize: "12px", color: "gray" }}>
        By WangHaibo
      </div>
    </div>
  );
};

export default BitDisplay;
