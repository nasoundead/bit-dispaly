import React, { useState } from "react";

const BitDisplayWithNumIn: React.FC = () => {
  const [bitCount, setBitCount] = useState<number>(16); // 默认显示 16 个比特
  const [bitsPerRow, setBitsPerRow] = useState<number>(16); // 默认每行显示 16 个方块
  const [bits, setBits] = useState<number[]>(Array(bitCount).fill(0));

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
  const binaryString = bits.join("");
  const decimalValue = parseInt(binaryString, 2);
  const hexValue = decimalValue.toString(16).toUpperCase();

  // 分块显示比特
  const renderBitBlocks = () => {
    const blocks = [];
    for (let i = 0; i < bitCount; i += bitsPerRow) {
      blocks.push(
        <div key={i} style={{ marginBottom: "20px" }}>
          {/* 显示比特方块 */}
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            {bits.slice(i, i + bitsPerRow).map((bit, index) => (
              <div key={i + index} style={{ textAlign: "center" }}>
                {/* 显示比特号 */}
                <div style={{ marginBottom: "5px", fontSize: "12px" }}>
                  {bitCount - 1 - (i + index)}
                </div>
                {/* 比特方块 */}
                <div
                  onClick={() => toggleBit(i + index)}
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
                  {bitCount - (i + index)} {/* 显示比特位号加 1 */}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return blocks;
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Bit Display</h1>
      {/* 滚动旋钮 */}
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
      </div>
      {/* 显示比特方块 */}
      {renderBitBlocks()}
      {/* 显示数值 */}
      <div style={{ marginTop: "20px" }}>
        <p>Binary: {binaryString}</p>
        <p>Decimal: {decimalValue}</p>
        <p>Hexadecimal: 0x{hexValue}</p>
      </div>
    </div>
  );
};

export default BitDisplayWithNumIn;
