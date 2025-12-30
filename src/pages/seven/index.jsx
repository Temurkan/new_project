import React, { useState } from "react";

export default function SevenPage() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const codeBlocks = [
    {
      title: "🔹 1. String",
      code: `// 1️⃣ Oson
const name: string = "Sizning Ismingiz";

// 2️⃣ Medium
const greet = (name: string): string => {
  return \`Hello, \${name}\`;
};

// 3️⃣ O‘rtacha qiyin
const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};`,
    },
    {
      title: "🔹 2. Number",
      code: `// 1️⃣ Oson
const age: number = 25;

// 2️⃣ Medium
const sum = (a: number, b: number): number => {
  return a + b;
};

// 3️⃣ O‘rtacha qiyin
const isEven = (n: number): boolean => {
  return n % 2 === 0;
};`,
    },
    {
      title: "🔹 3. Boolean",
      code: `// 1️⃣ Oson
const isOnline: boolean = true;

// 2️⃣ Medium
const isAdult = (age: number): boolean => {
  return age >= 18;
};

// 3️⃣ O‘rtacha qiyin
const canLogin = (isAdmin: boolean, isActive: boolean): boolean => {
  return isAdmin && isActive;
};`,
    },
    {
      title: "🔹 4. Array",
      code: `// 1️⃣ Oson
const numbers: number[] = [1, 2, 3, 4, 5];

// 2️⃣ Medium
const getFirst = (arr: string[]): string => {
  return arr[0];
};

// 3️⃣ O‘rtacha qiyin
const sumArray = (arr: number[]): number => {
  return arr.reduce((acc, curr) => acc + curr, 0);
};`,
    },
    {
      title: "🔹 5. Object",
      code: `// 1️⃣ Oson
const user: { name: string; age: number } = {
  name: "Ali",
  age: 20
};

// 2️⃣ Medium
const printUser = (user: { name: string; age: number }): void => {
  console.log(\`\${user.name} is \${user.age} years old.\`);
};

// 3️⃣ O‘rtacha qiyin
const isAdultUser = (user: { name: string; age: number }): boolean => {
  return user.age >= 18;
};`,
    },
    {
      title: "🔹 6. Any",
      code: `// 1️⃣ Oson
const data: any = "Istalgan qiymat";

// 2️⃣ Medium
const printData = (data: any): void => {
  console.log(data);
};

// 3️⃣ O‘rtacha qiyin
const anySafetyDemo = (): void => {
  let val: any = "Salom";
  val = 100;
  val = [1, 2, 3];
};`,
    },
    {
      title: "🔹 7. Unknown",
      code: `// 1️⃣ Oson
const value: unknown = "Noma'lum qiymat";

// 2️⃣ Medium
const printIfString = (val: unknown): void => {
  if (typeof val === "string") {
    console.log(val.length);
  }
};

// 3️⃣ O‘rtacha qiyin
const isNumber = (val: unknown): val is number => {
  return typeof val === "number";
};`,
    },
    {
      title: "🔹 8. Void",
      code: `// 1️⃣ Oson
const logMessage = (msg: string): void => {
  console.log(msg);
};

// 2️⃣ Medium
const printSum = (a: number, b: number): void => {
  console.log(a + b);
};

// 3️⃣ O‘rtacha qiyin
const voidAssignDemo = (): void => {
  const result: void = logMessage("Hello");
};`,
    },
    {
      title: "🔹 9. Never",
      code: `// 1️⃣ Oson
const throwError = (msg: string): never => {
  throw new Error(msg);
};

// 2️⃣ Medium
const infiniteLoop = (): never => {
  while (true) { console.log("Abadiy..."); }
};

// 3️⃣ O‘rtacha qiyin
type Status = "active" | "inactive";
const checkStatus = (s: Status): string => {
  switch (s) {
    case "active": return "Faol";
    case "inactive": return "Nofaol";
    default:
      const _exhaustiveCheck: never = s;
      return _exhaustiveCheck;
  }
};`,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            TS Masalalar Yechimi
          </h1>
          <p className="text-slate-500 mt-3 text-lg">
            Barcha topshiriqlar uchun optimal TypeScript kodlari
          </p>
        </header>

        <div className="grid gap-8">
          {codeBlocks.map((block, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between bg-slate-50 px-6 py-3 border-b border-slate-100">
                <h2 className="font-bold text-slate-700">{block.title}</h2>
                <button
                  onClick={() => handleCopy(block.code, index)}
                  className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-md bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all active:scale-95"
                >
                  {copiedIndex === index ? (
                    <>
                      <span className="text-green-600">Nusxa olindi!</span>
                    </>
                  ) : (
                    <>
                      <span>Nusxa olish</span>
                    </>
                  )}
                </button>
              </div>
              <div className="relative">
                <pre className="bg-[#1e1e1e] p-6 overflow-x-auto text-sm md:text-base">
                  <code className="font-mono text-blue-300 leading-relaxed block">
                    {block.code}
                  </code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
